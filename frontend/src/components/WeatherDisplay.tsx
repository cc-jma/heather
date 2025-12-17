import type { CurrentWeather, WeatherCondition } from '../hooks/useWeather'

interface WeatherDisplayProps {
  weather: CurrentWeather | undefined
  isLoading: boolean
  error: Error | null
}

const conditionEmojis: Record<WeatherCondition, string> = {
  SUNNY: '\u2600\uFE0F',
  PARTLY_CLOUDY: '\u26C5',
  CLOUDY: '\u2601\uFE0F',
  RAINY: '\uD83C\uDF27\uFE0F',
  STORMY: '\u26C8\uFE0F',
  SNOWY: '\u2744\uFE0F',
}

export function WeatherDisplay({ weather, isLoading, error }: WeatherDisplayProps) {
  if (isLoading) {
    return (
      <div className="weather-display loading" data-testid="weather-loading">
        <p>Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-display error" data-testid="weather-error">
        <p>Weather data is temporarily unavailable.</p>
        <p className="error-detail">Please try again later.</p>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  const emoji = conditionEmojis[weather.condition] || ''

  return (
    <div className="weather-display" data-testid="weather-display">
      <h2>Current Weather</h2>
      <div className="weather-current">
        <span className="weather-emoji" role="img" aria-label={weather.description}>
          {emoji}
        </span>
        <div className="weather-info">
          <span className="temperature" data-testid="current-temperature">
            {weather.temperature}°C
          </span>
          <span className="condition" data-testid="current-condition">
            {weather.description}
          </span>
        </div>
      </div>
    </div>
  )
}
