# Data Model: Weather Forecast App

**Branch**: `001-weather-forecast` | **Date**: 2025-12-17

## Entities

### WeatherResponse

Root entity returned by the weather API.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| current | CurrentWeather | Current weather conditions | Required |
| forecast | List<DailyForecast> | Future weather predictions | Required, exactly 5 items |

### CurrentWeather

Current weather conditions.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| temperature | Integer | Temperature in Celsius | Required, range -50 to 50 |
| condition | WeatherCondition | Weather condition type | Required |
| description | String | Human-readable condition text | Required, max 100 chars |

### DailyForecast

Weather forecast for a single day.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| date | LocalDate (ISO 8601) | Forecast date | Required, must be future |
| temperatureHigh | Integer | Highest expected temperature (Celsius) | Required, range -50 to 50 |
| temperatureLow | Integer | Lowest expected temperature (Celsius) | Required, range -50 to 50, <= temperatureHigh |
| condition | WeatherCondition | Expected weather condition | Required |
| description | String | Human-readable condition text | Required, max 100 chars |

### WeatherCondition (Enum)

Weather condition types.

| Value | Display Text |
|-------|-------------|
| SUNNY | Sunny |
| PARTLY_CLOUDY | Partly Cloudy |
| CLOUDY | Cloudy |
| RAINY | Rainy |
| STORMY | Stormy |
| SNOWY | Snowy |

## Relationships

```
WeatherResponse
├── current: CurrentWeather (1:1)
└── forecast: DailyForecast (1:N, exactly 5)
```

## Validation Rules

1. **Temperature range**: All temperature values must be between -50°C and 50°C (realistic weather range).
2. **High/Low consistency**: `temperatureLow` must be less than or equal to `temperatureHigh`.
3. **Forecast dates**: Must be consecutive days starting from tomorrow.
4. **Forecast count**: Exactly 5 days of forecast data.

## State Transitions

N/A - This is read-only data with no state management. Mock data is generated per request.

## Data Volume Assumptions

- Single weather response per request: ~500 bytes JSON
- No caching requirements (mock data, demo app)
- No persistence requirements (mock data regenerated each request)
