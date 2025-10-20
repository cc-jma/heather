# Heather - Technical Walking Skeleton

A minimal full-stack application template with Spring Boot backend and React frontend.

## Project Structure

```
.
├── backend/          # Spring Boot Kotlin API
├── frontend/         # React TypeScript application
├── docs/             # Project documentation
├── .devcontainer/    # Development container configuration
├── .githooks/        # Git hooks for code quality
└── .gitlab-ci.yml    # CI/CD pipeline configuration
```

## Quick Start

### Prerequisites

- Git
- Node.js and npm
- Java 21+ and Gradle
- Docker (optional, for devcontainer)

### Initial Setup

1. Clone the repository
2. Enable git hooks:
   ```bash
   ./setup-hooks.sh
   ```

### Running Locally

#### Backend
```bash
cd backend
./gradlew bootRun
```
API available at http://localhost:8080

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Application available at http://localhost:5173

## Development Workflow

### Backend
- Language: Kotlin
- Framework: Spring Boot
- Build: Gradle
- Linting: Detekt
- See [backend/README.md](backend/README.md) for details

### Frontend  
- Language: TypeScript
- Framework: React with Vite
- Testing: Vitest
- Linting: ESLint + Prettier
- See [frontend/README.md](frontend/README.md) for details

## Deployment

Automated deployment to Google Cloud Platform via GitLab CI/CD:

- **Backend**: Cloud Run (containerized with Jib)
- **Frontend**: Cloud Storage (static hosting)

Deployments trigger automatically on push to `main` branch.

## Testing

```bash
# Backend tests
cd backend && ./gradlew test

# Frontend tests  
cd frontend && npm test
```

## Project Features

- **Git Hooks**: Automated code quality checks
- **CI/CD**: GitLab pipeline for testing and deployment
- **OpenAPI**: API documentation and client generation ready
- **CORS**: Pre-configured for local development and production

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a merge request