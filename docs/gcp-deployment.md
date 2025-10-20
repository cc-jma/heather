# GCP Deployment Setup

This document describes the one-time setup steps required for deploying the application to Google Cloud Platform.

## Prerequisites

- GCP Project: `myproj`
- GitLab repository with CI/CD enabled
- gcloud CLI installed and authenticated locally (for one-time setup)

## One-Time Setup

### 1. GCP Project Configuration

```bash
# Set up gcloud configuration
gcloud config set project myproj
gcloud config set compute/region europe-west1
gcloud config set run/region europe-west1

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
gcloud services enable storage.googleapis.com
```

### 2. Create Artifact Registry Repository (Backend)

```bash
# Create repository for backend Docker images
gcloud artifacts repositories create heather \
  --repository-format=docker \
  --location=europe-west1
```

### 3. Create Frontend Storage Bucket

```bash
# Create the bucket
gsutil mb -p myproj gs://heather-frontend

# Configure bucket for static website hosting
gsutil web set -m index.html -e index.html gs://heather-frontend

# Disable public access prevention
gcloud storage buckets update gs://heather-frontend --no-public-access-prevention
```

### 4. Configure Public Access Tags

Both the backend Cloud Run service and frontend Storage bucket require organization policy tags for public access.

#### Backend Cloud Run Service

```bash
# Add required tag for public access (organization policy requirement)
gcloud resource-manager tags bindings create \
  --tag-value=tagValues/281480996055775 \
  --parent=//run.googleapis.com/projects/myproj/locations/europe-west1/services/heather-backend \
  --location=europe-west1

# Allow public access
gcloud run services add-iam-policy-binding heather-backend \
  --member=allUsers \
  --role=roles/run.invoker \
  --region=europe-west1
```

#### Frontend Storage Bucket

```bash
# Add required tag for public access (organization policy requirement)
gcloud resource-manager tags bindings create \
  --tag-value=tagValues/281480996055775 \
  --parent=//storage.googleapis.com/projects/_/buckets/heather-frontend \
  --location=europe-west1

# Make the bucket publicly readable
gsutil iam ch allUsers:objectViewer gs://heather-frontend
```

### 5. Create CI/CD Service Account

```bash
# Create service account
gcloud iam service-accounts create heather-ci \
  --description="Service account for heather CI/CD" \
  --display-name="Heather CI"

# Grant required permissions for Artifact Registry
gcloud projects add-iam-policy-binding myproj \
  --member="serviceAccount:heather-ci@myproj.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

# Grant permissions for Cloud Run deployment
gcloud projects add-iam-policy-binding myproj \
  --member="serviceAccount:heather-ci@myproj.iam.gserviceaccount.com" \
  --role="roles/run.developer"

# Grant permissions for Cloud Storage (frontend deployment)
gcloud projects add-iam-policy-binding myproj \
  --member="serviceAccount:heather-ci@myproj.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# Grant permission to use the default Compute Engine service account
gcloud iam service-accounts add-iam-policy-binding \
  577018713848-compute@developer.gserviceaccount.com \
  --member="serviceAccount:heather-ci@myproj.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### 6. Generate Service Account Key

```bash
# Generate and encode key
gcloud iam service-accounts keys create heather-ci-key.json \
  --iam-account=heather-ci@myproj.iam.gserviceaccount.com

# Encode for GitLab (copy the output)
base64 -i heather-ci-key.json

# IMPORTANT: Clean up the key file for security
rm heather-ci-key.json
```

### 7. GitLab CI Variables

1. Go to your GitLab project → Settings → CI/CD → Variables
2. Add the following variable:
    - **Name**: `GCP_SERVICE_KEY`
    - **Value**: Base64-encoded key from step 6
    - **Type**: Variable
    - **Flags**: ✅ Protected, ✅ Masked

## Deployment Process

### Automated Deployment

The CI/CD pipeline automatically triggers when code is pushed to the `main` branch:

1. **Backend Build Stage**:
   - Runs tests with Gradle and detekt
   - Builds Docker image using Jib (no Docker daemon required)
   - Pushes image to Artifact Registry

2. **Frontend Deploy Stage**:
   - Installs dependencies with npm
   - Builds production bundle with Vite
   - Configures API base URL to point to backend service
   - Uploads static files to Cloud Storage bucket with rsync
   - Sets appropriate cache headers for assets and HTML

3. **Backend Deploy Stage**:
   - Deploys backend Docker image to Cloud Run
   - Configures memory, CPU, and scaling settings
   - Sets environment variables

## Access URLs

### Backend API

The backend is accessible at:
- **Base URL**: `https://heather-backend-<commit-sha>-ew.a.run.app`
- **API Documentation**: `/v3/api-docs` (OpenAPI spec)
- **Health Check**: `/actuator/health`

### Frontend

The frontend is accessible at:
- **Public URL**: `https://storage.googleapis.com/heather-frontend/index.html`

## Architecture

### Backend
- **Language**: Kotlin
- **Framework**: Spring Boot
- **Runtime**: Java 21 (LTS)
- **Build Tool**: Gradle
- **Deployment**: Cloud Run (serverless containers)

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Hosting**: Google Cloud Storage (static website)
- **State Management**: Zustand
- **API Client**: Axios with React Query

### Infrastructure
- **Backend Platform**: Google Cloud Run
- **Frontend Platform**: Google Cloud Storage
- **Container Registry**: Google Artifact Registry
- **CI/CD**: GitLab CI/CD
- **Region**: europe-west1

## Monitoring and Debugging

### View Backend Logs

```bash
# View recent logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=heather-backend" \
  --limit=50 \
  --format=json

# Stream logs in real-time
gcloud alpha logging tail "resource.type=cloud_run_revision AND resource.labels.service_name=heather-backend"
```

### Check Service Status

```bash
# Backend service details
gcloud run services describe heather-backend --region=europe-west1

# List all Cloud Run services
gcloud run services list --region=europe-west1

# Check bucket contents
gsutil ls gs://heather-frontend/

# Check bucket configuration
gcloud storage buckets describe gs://heather-frontend
```

### Performance Monitoring

```bash
# View Cloud Run metrics
gcloud monitoring metrics-descriptors list --filter="metric.type:run.googleapis.com"

# Check bucket size and object count
gsutil du -s gs://heather-frontend/
```

## Troubleshooting

### Common Issues

1. **Public Access Denied**
   - Ensure the organization policy tag is correctly applied
   - Verify IAM bindings are set for allUsers
   - Check that public access prevention is disabled

2. **Build Failures**
   - Check GitLab CI logs for detailed error messages
   - Ensure all dependencies are correctly specified
   - Verify service account permissions

3. **CORS Issues**
   - Backend should be configured to accept requests from the frontend domain
   - Check Spring Boot CORS configuration

4. **404 Errors on Frontend Routes**
   - Verify the bucket is configured for static website hosting
   - Check that index.html is set as both main and error page

### Manual Deployment (Emergency)

If CI/CD fails, you can deploy manually:

#### Backend
```bash
cd backend
./gradlew jib --image=europe-west1-docker.pkg.dev/myproj/heather/heather-backend:manual
gcloud run deploy heather-backend \
  --image=europe-west1-docker.pkg.dev/myproj/heather/heather-backend:manual \
  --region=europe-west1
```

#### Frontend
```bash
cd frontend
npm ci
npm run build
gsutil -m rsync -r -d dist/ gs://heather-frontend/
```

## Security Considerations

1. **Service Account Keys**: Never commit service account keys to the repository
2. **Environment Variables**: Use GitLab's masked variables for sensitive data
3. **Public Access**: Only enable after proper authentication is implemented
4. **CORS**: Configure appropriately to prevent unauthorized access
5. **API Keys**: Store in Cloud Secret Manager if needed

## Cost Optimization

- Cloud Run scales to zero when not in use (no charges when idle)
- Cloud Storage charges for storage and bandwidth
- Consider enabling Cloud CDN for the Storage bucket if traffic increases
- Monitor usage with GCP Billing reports