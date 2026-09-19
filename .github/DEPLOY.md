# Deploying ibook to Cloud Run

`.github/workflows/deploy.yml` runs on every push to `main` and on demand from the
Actions tab. It will **fail until the one-time setup below is done** — none of it
exists on the project yet.

Values used throughout:

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| Project ID     | `ibook-509112`                                                       |
| Project number | `839259427392`                                                       |
| GitHub repo    | `samiNAT/ibook`                                                      |
| Region         | `europe-west1` (change in the workflow's `env:` if you want another) |

## 0. Confirm billing is active

This project was created specifically because the previous one
(`tactical-works-509112-h0`) had a closed billing account and could not enable a single
billable API. Cloud Run, Cloud Build and Artifact Registry are all billable, so confirm
before going further:

```bash
gcloud billing projects describe ibook-509112 \
  --format="value(billingAccountName,billingEnabled)"
```

`billingEnabled` must read `True`. If it does not, stop here — everything below will
fail, and it will fail with permission errors that do not mention billing.

Cloud Run scales to zero, so an idle service costs nothing, and this app sits well inside
the free tier. Google still requires an active billing account to enable the APIs at all.
Set a budget alert while you are in the console.

## 1. Enable the APIs

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iamcredentials.googleapis.com \
  --project ibook-509112
```

## 2. Create the deploy service account

```bash
gcloud iam service-accounts create github-deployer \
  --display-name "GitHub Actions deployer" \
  --project ibook-509112

SA="github-deployer@ibook-509112.iam.gserviceaccount.com"

for ROLE in \
  roles/run.admin \
  roles/cloudbuild.builds.editor \
  roles/artifactregistry.writer \
  roles/storage.admin \
  roles/iam.serviceAccountUser
do
  gcloud projects add-iam-policy-binding ibook-509112 \
    --member "serviceAccount:$SA" --role "$ROLE"
done
```

`roles/iam.serviceAccountUser` is the one people forget — Cloud Run needs it to run the
service as its runtime identity, and without it the deploy fails late with a permission
error that doesn't name the missing role clearly.

## 3. Create the Workload Identity pool and provider

This is what makes the deploy keyless: GitHub presents an OIDC token, GCP verifies it,
and no credential is ever stored in the repository.

```bash
gcloud iam workload-identity-pools create github \
  --location global --display-name "GitHub Actions" \
  --project ibook-509112

gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location global --workload-identity-pool github \
  --display-name "GitHub OIDC" \
  --issuer-uri "https://token.actions.githubusercontent.com" \
  --attribute-mapping "google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition "assertion.repository == 'samiNAT/ibook'" \
  --project ibook-509112
```

The `--attribute-condition` matters. Without it, **any** GitHub repository in the world
could present a token against this provider. It scopes trust to this repo alone.

## 4. Let that repo impersonate the service account

```bash
gcloud iam service-accounts add-iam-policy-binding \
  "github-deployer@ibook-509112.iam.gserviceaccount.com" \
  --role roles/iam.workloadIdentityUser \
  --member "principalSet://iam.googleapis.com/projects/839259427392/locations/global/workloadIdentityPools/github/attribute.repository/samiNAT/ibook" \
  --project ibook-509112
```

## 5. Add two GitHub secrets

In **Settings → Secrets and variables → Actions**:

| Secret                           | Value                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/839259427392/locations/global/workloadIdentityPools/github/providers/github-provider` |
| `GCP_DEPLOY_SERVICE_ACCOUNT`     | `github-deployer@ibook-509112.iam.gserviceaccount.com`                                          |

Neither is a credential — the first is a resource path, the second an email. The trust
lives in the IAM binding from step 4, not in these values.

## 6. Run it

Push to `main`, or use **Actions → Deploy to Cloud Run → Run workflow**.

## What the workflow does

1. **`verify`** — `npm ci`, then test, lint, typecheck, format check and build. The
   deploy job does not start unless all of these pass, so `main` cannot ship a build
   that fails its own suite.
2. **`deploy`** — authenticates via Workload Identity Federation, then
   `gcloud run deploy --source .`. Cloud Build compiles the app with buildpacks, so
   there is no Dockerfile to keep in step with the project. Next.js honours the `PORT`
   Cloud Run injects, so no extra configuration is needed.
3. **Health check** — polls `/api/health` on the live URL up to ten times and **fails
   the run** if it never returns 200. Deployed and working are not the same thing.

`concurrency` allows one deploy at a time and does not cancel one already in flight —
a superseded queued run is fine, a half-applied release is not.

## Note on the stack decision

`CLAUDE.md` documents AWS Amplify for hosting, and Jira KAN-15 is written as an Amplify
story. This workflow deploys to Cloud Run instead. Either update those, or record GCP
explicitly as running alongside the AWS plan, so the next person doesn't have to guess
which is current.
