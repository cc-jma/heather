# Heather Backend

Spring Boot REST API template with Kotlin.

## Technology Stack

- **Language**: Kotlin
- **Framework**: Spring Boot
- **Build Tool**: Gradle with Kotlin DSL
- **JVM**: Java 21
- **Static Analysis**: Detekt
- **Containerization**: Jib (buildpack-free Docker image generation)

## Project Structure

```
src/
├── main/
│   ├── kotlin/de/codecentric/heather/
│   │   ├── HeatherApplication.kt          # Spring Boot entry point
│   │   ├── config/                      # Configuration classes
│   │   └── properties/                  # Property bindings
│   └── resources/
│       └── application.yaml              # Application configuration
└── test/
    └── kotlin/                           # Test files
```

## Running Locally

```bash
# Start the application
./gradlew bootRun

# Run tests
./gradlew test

# Run Detekt with auto-fix
./gradlew detektTwice
```

## Building

```bash
# Build JAR
./gradlew build

# Build Docker image (via Jib)
./gradlew jib
```

## Configuration

Key settings in `application.yaml`:
- Server port: 8080
- Application name: heather
- CORS configuration for frontend origins

### Environment Variables
- `SPRING_PROFILES_ACTIVE`: Set to `cloud` for production

## Development Guidelines

### Code Style
- Kotlin code conventions enforced via Detekt
- Pre-commit hooks automatically run `detektTwice`

### Testing
- JUnit 5 with Kotest assertions
- MockK for mocking
- Spring Boot Test for integration testing

## Deployment

Deployed to Google Cloud Run via GitLab CI/CD:
1. Container image built with Jib
2. Pushed to GCP Artifact Registry
3. Deployed to Cloud Run with auto-scaling

## Dependencies

### Core
- Spring Boot Web Starter
- Jackson Kotlin Module
- Kotlin Reflect & StdLib

### Testing
- Spring Boot Test
- JUnit, Kotest, MockK

### Logging
- Kotlin Logging
- Logstash Logback Encoder

## Troubleshooting

- **Port conflicts**: Change port in application.yaml or use `SERVER_PORT` env variable
- **CORS errors**: Check frontend origin in CorsConfig.kt
- **Build issues**: `./gradlew clean build --refresh-dependencies`