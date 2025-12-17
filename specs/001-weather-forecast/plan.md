# Implementation Plan: Weather Forecast App

**Branch**: `001-weather-forecast` | **Date**: 2025-12-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-weather-forecast/spec.md`

## Summary

Transform the existing age calculator application into a weather forecast app. The main page will display current weather conditions (temperature in Celsius, weather condition) and a 5-day forecast, all retrieved from a backend API serving mocked data. The age calculator functionality is retained as a secondary feature.

## Technical Context

**Language/Version**: Kotlin 2.2.x (backend), TypeScript 5.9.x (frontend)
**Primary Dependencies**: Spring Boot 4.0, React 19, Vite 7, TanStack Query
**Storage**: N/A (mock data only, no persistence)
**Testing**: JUnit 5 + Kotest (backend), Vitest + React Testing Library (frontend)
**Target Platform**: Web (Linux server backend via Cloud Run, static frontend via Cloud Storage)
**Project Type**: Web application (frontend + backend)
**Performance Goals**: Weather data displayed within 2 seconds of page load (SC-001)
**Constraints**: Mock data only, no external weather API integration, metric units (Celsius)
**Scale/Scope**: Single-user demo app, minimal concurrent load

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | PASS | Mock data approach avoids external API complexity. Single endpoint for weather data. No location detection simplifies implementation. |
| II. Code Quality Over Coverage | PASS | Following existing project patterns (OpenAPI generation, TypeScript strict mode, Kotlin/Detekt). |
| III. 80% Solutions | PASS | Generic forecast without location covers the core use case. Age calculator preserved as-is. |
| IV. Maintainability-Driven Design | PASS | Using existing dependencies (TanStack Query, axios). No new dependencies required. |
| V. Balanced Testing | PASS | Contract tests for new API endpoint. Integration test for weather display. Unit tests only for complex logic (mock data generation if needed). |

**Gate Status**: PASS - No violations identified.

## Project Structure

### Documentation (this feature)

```text
specs/001-weather-forecast/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── openapi.yaml     # Weather API contract
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
backend/
├── src/main/kotlin/de/codecentric/heather/
│   ├── HeatherApplication.kt          # Existing
│   ├── config/CorsConfig.kt           # Existing
│   ├── properties/ApplicationProperties.kt  # Existing
│   ├── age/                            # Existing (retained)
│   │   ├── AgeCalculator.kt
│   │   └── AgeController.kt
│   └── weather/                        # NEW
│       ├── WeatherController.kt        # REST endpoint
│       ├── WeatherService.kt           # Mock data generation
│       └── WeatherModels.kt            # DTOs
└── src/test/kotlin/de/codecentric/heather/
    └── weather/
        └── WeatherControllerTest.kt    # Contract tests

frontend/
├── src/
│   ├── App.tsx                         # Modified: primary weather display
│   ├── App.css                         # Modified: weather styling
│   ├── components/                     # NEW
│   │   ├── WeatherDisplay.tsx          # Current weather component
│   │   ├── ForecastList.tsx            # 5-day forecast component
│   │   └── AgeCalculator.tsx           # Extracted from App.tsx
│   ├── api/
│   │   └── generated/                  # OpenAPI generated types
│   └── hooks/
│       └── useWeather.ts               # TanStack Query hook
└── src/__tests__/
    └── WeatherDisplay.test.tsx         # Integration test
```

**Structure Decision**: Web application structure (Option 2). Backend adds new `weather/` package alongside existing `age/` package. Frontend extracts age calculator to component and adds weather components.

## Complexity Tracking

No violations to justify - all gates passed.
