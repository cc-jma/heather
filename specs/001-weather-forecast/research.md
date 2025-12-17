# Research: Weather Forecast App

**Branch**: `001-weather-forecast` | **Date**: 2025-12-17

## Overview

No unknowns or NEEDS CLARIFICATION items were identified during planning. The existing project stack is well-defined and the feature requirements are clear. This document records the key decisions.

## Decisions

### 1. Weather Data Structure

**Decision**: Use a single API endpoint returning both current weather and 5-day forecast.

**Rationale**: Simplifies frontend data fetching (single request). Reduces API surface area. Matches the "Simplicity First" constitution principle.

**Alternatives Considered**:
- Separate endpoints for current vs. forecast: Rejected as over-engineering for a demo app.
- GraphQL: Rejected as project uses REST/OpenAPI pattern.

### 2. Mock Data Generation Strategy

**Decision**: Generate deterministic mock data based on the current date. Weather conditions vary by day of week for demo variety.

**Rationale**: Consistent data for testing. Varied enough to demonstrate UI capabilities. No external dependencies.

**Alternatives Considered**:
- Random data per request: Rejected due to non-deterministic testing.
- Static hardcoded data: Rejected as it wouldn't demonstrate date-based forecasting properly.
- Seed-based randomization: Acceptable but unnecessary complexity.

### 3. Frontend Architecture

**Decision**: Extract age calculator to separate component. Add weather components. Use TanStack Query for data fetching (already in project dependencies).

**Rationale**: Existing dependency. Provides caching, error handling, and loading states out of the box.

**Alternatives Considered**:
- Raw fetch (as in current App.tsx): Works but lacks caching and retry logic.
- SWR: Would add new dependency; TanStack Query already available.

### 4. API Endpoint Path

**Decision**: `GET /api/weather` returns full weather response (current + forecast).

**Rationale**: RESTful convention. Mirrors existing `/api/age` pattern. Clear and predictable.

**Alternatives Considered**:
- `/api/weather/current` and `/api/weather/forecast`: Over-engineering for mock data use case.
- `/api/forecast`: Less intuitive than `/api/weather`.

### 5. Temperature Values

**Decision**: Mock temperatures in realistic Celsius ranges based on season (month-aware).

**Rationale**: Demo data should look plausible. Metric system per spec clarification.

**Alternatives Considered**:
- Fixed temperatures: Too artificial.
- Random ranges: Could produce implausible values (40°C in winter).

## Dependencies

No new dependencies required. All needed libraries are already in the project:

**Backend**:
- Spring Boot Web (existing)
- Jackson for JSON serialization (existing)
- springdoc-openapi for API documentation (existing)

**Frontend**:
- React 19 (existing)
- TanStack Query (existing)
- axios (existing)
- date-fns for date formatting (existing)

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Mock data doesn't reflect real weather API structure | Design mock structure to match common weather API patterns (OpenWeatherMap-like) |
| Frontend styling may not fit weather display | Use simple, functional styling; can be enhanced later |
| Age calculator UX change may confuse existing users | Keep age calculator visually distinct and accessible |

## Next Steps

Proceed to Phase 1: Generate data-model.md, API contracts, and quickstart.md.
