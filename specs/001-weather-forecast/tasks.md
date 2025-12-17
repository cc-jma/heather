# Tasks: Weather Forecast App

**Input**: Design documents from `/specs/001-weather-forecast/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included for this feature as contract tests (backend) and integration tests (frontend) as defined in plan.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and backend weather package structure

- [X] T001 Create weather package directory structure at backend/src/main/kotlin/de/codecentric/heather/weather/
- [X] T002 [P] Create WeatherCondition enum in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt
- [X] T003 [P] Create CurrentWeather data class in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt
- [X] T004 [P] Create DailyForecast data class in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt
- [X] T005 [P] Create WeatherResponse data class in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Backend API endpoint and mock data generation that MUST be complete before frontend user stories

**CRITICAL**: No frontend work can begin until this phase is complete

- [X] T006 Implement WeatherService with deterministic mock data generation in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherService.kt
- [X] T007 Implement WeatherController with GET /api/weather endpoint in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherController.kt
- [X] T008 Create WeatherControllerTest contract tests in backend/src/test/kotlin/de/codecentric/heather/weather/WeatherControllerTest.kt
- [X] T009 Verify backend starts and /api/weather returns valid JSON response

**Checkpoint**: Backend API ready - frontend implementation can now begin

---

## Phase 3: User Story 1 - View Current Weather Forecast (Priority: P1) MVP

**Goal**: Display current weather conditions (temperature in Celsius and weather condition) when user opens the app

**Independent Test**: Open the app and verify current weather data (temperature and condition) is displayed within 2 seconds

### Implementation for User Story 1

- [X] T010 [US1] Create useWeather hook with TanStack Query in frontend/src/hooks/useWeather.ts
- [X] T011 [US1] Generate frontend API types from OpenAPI spec using npm run generate-api in frontend/
- [X] T012 [US1] Create WeatherDisplay component for current weather in frontend/src/components/WeatherDisplay.tsx
- [X] T013 [US1] Update App.tsx to display WeatherDisplay as primary content in frontend/src/App.tsx
- [X] T014 [US1] Add weather styling to App.css in frontend/src/App.css
- [X] T015 [US1] Implement error state display when weather data unavailable in frontend/src/components/WeatherDisplay.tsx
- [X] T016 [US1] Implement loading state display while fetching weather data in frontend/src/components/WeatherDisplay.tsx
- [X] T017 [US1] Create WeatherDisplay integration test in frontend/src/__tests__/WeatherDisplay.test.tsx

**Checkpoint**: User Story 1 complete - app shows current weather on page load

---

## Phase 4: User Story 2 - View Multi-Day Forecast (Priority: P2)

**Goal**: Display 5-day weather forecast with date, high/low temperatures, and conditions for each day

**Independent Test**: View the forecast section and verify 5 days of weather predictions are shown with dates and temperatures

### Implementation for User Story 2

- [X] T018 [US2] Create ForecastList component for 5-day forecast in frontend/src/components/ForecastList.tsx
- [X] T019 [US2] Add ForecastList to App.tsx below WeatherDisplay in frontend/src/App.tsx
- [X] T020 [US2] Add forecast list styling to App.css in frontend/src/App.css
- [X] T021 [US2] Format forecast dates using date-fns in frontend/src/components/ForecastList.tsx

**Checkpoint**: User Stories 1 AND 2 complete - app shows current weather and 5-day forecast

---

## Phase 5: User Story 3 - Calculate Age (Priority: P3)

**Goal**: Retain age calculator as secondary feature accessible from the app

**Independent Test**: Navigate to age calculator section, enter a birth date, and verify calculated age is displayed

### Implementation for User Story 3

- [X] T022 [US3] Extract existing age calculator logic to AgeCalculator component in frontend/src/components/AgeCalculator.tsx
- [X] T023 [US3] Update App.tsx to render AgeCalculator as secondary section in frontend/src/App.tsx
- [X] T024 [US3] Add visual separator and styling for age calculator section in frontend/src/App.css

**Checkpoint**: All user stories complete - weather forecast as primary feature, age calculator retained as secondary

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and improvements

- [X] T025 [P] Run all backend tests with ./gradlew test in backend/
- [X] T026 [P] Run all frontend tests with npm test in frontend/
- [X] T027 Run quickstart.md verification checklist
- [X] T028 Verify performance: weather data displayed within 2 seconds (SC-001)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all frontend work
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 -> P2 -> P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Uses same useWeather hook from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent (existing functionality extraction)

### Within Each User Story

- Models/types before components
- Components before integration into App.tsx
- Core implementation before error/loading states
- Integration tests after component implementation

### Parallel Opportunities

- T002-T005 (all model DTOs) can run in parallel
- T025-T026 (backend and frontend tests) can run in parallel
- Within Phase 1, all [P] tasks are independent

---

## Parallel Example: Phase 1 Setup

```bash
# Launch all model classes together:
Task: "Create WeatherCondition enum in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt"
Task: "Create CurrentWeather data class in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt"
Task: "Create DailyForecast data class in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt"
Task: "Create WeatherResponse data class in backend/src/main/kotlin/de/codecentric/heather/weather/WeatherModels.kt"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (backend models)
2. Complete Phase 2: Foundational (backend API)
3. Complete Phase 3: User Story 1 (current weather display)
4. **STOP and VALIDATE**: Test that current weather displays on page load
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational -> Backend API ready
2. Add User Story 1 -> Test independently -> Deploy/Demo (MVP!)
3. Add User Story 2 -> Test independently -> Deploy/Demo (adds 5-day forecast)
4. Add User Story 3 -> Test independently -> Deploy/Demo (adds age calculator)
5. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Backend uses deterministic mock data based on current date (per research.md decision)
- Frontend uses TanStack Query for data fetching with built-in caching and error handling
