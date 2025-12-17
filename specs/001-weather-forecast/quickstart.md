# Quickstart: Weather Forecast App

**Branch**: `001-weather-forecast` | **Date**: 2025-12-17

## Prerequisites

- Git
- Node.js 18+ and npm
- Java 21+ and Gradle
- Docker (optional, for devcontainer)

## Setup

1. Ensure you're on the feature branch:
   ```bash
   git checkout 001-weather-forecast
   ```

2. Enable git hooks (if not already done):
   ```bash
   ./setup-hooks.sh
   ```

## Running Locally

### Start Backend

```bash
cd backend
./gradlew bootRun
```

Backend API available at http://localhost:8080

Verify weather endpoint:
```bash
curl http://localhost:8080/api/weather
```

### Generate Frontend API Types

With backend running:
```bash
cd frontend
npm run generate-api
```

### Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Application available at http://localhost:5173

## Testing

### Backend Tests

```bash
cd backend
./gradlew test
```

Key test files:
- `src/test/kotlin/de/codecentric/heather/weather/WeatherControllerTest.kt` - Contract tests

### Frontend Tests

```bash
cd frontend
npm test
```

Key test files:
- `src/__tests__/WeatherDisplay.test.tsx` - Integration test

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/weather` | Returns current weather and 5-day forecast |
| GET | `/api/age?birthdate=YYYY-MM-DD` | Calculates age from birthdate (existing) |

## Verification Checklist

- [ ] Backend starts without errors
- [ ] `GET /api/weather` returns valid JSON with current weather and 5-day forecast
- [ ] Frontend displays current temperature in Celsius
- [ ] Frontend displays current weather condition
- [ ] Frontend displays 5-day forecast with high/low temperatures
- [ ] Age calculator remains accessible and functional
- [ ] Error message displays when backend is unavailable
