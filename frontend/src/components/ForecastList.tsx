import { format } from 'date-fns'
import type { DailyForecast, WeatherCondition } from '../hooks/useWeather'

interface ForecastListProps {
  forecast: DailyForecast[] | undefined
}

const conditionEmojis: Record<WeatherCondition, string> = {
  SUNNY: '\u2600\uFE0F',
  PARTLY_CLOUDY: '\u26C5',
  CLOUDY: '\u2601\uFE0F',
  RAINY: '\uD83C\uDF27\uFE0F',
  STORMY: '\u26C8\uFE0F',
  SNOWY: '\u2744\uFE0F',
}

export function ForecastList({ forecast }: ForecastListProps) {
  if (!forecast || forecast.length === 0) {
    return null
  }

  return (
    <div className="forecast-list" data-testid="forecast-list">
      <h2>5-Day Forecast</h2>
      <div className="forecast-items">
        {forecast.map((day) => {
          const emoji = conditionEmojis[day.condition] || ''
          return (
            <div key={day.date} className="forecast-item" data-testid="forecast-item">
              <span className="forecast-date">{format(new Date(day.date), 'EEE, MMM d')}</span>
              <span className="forecast-emoji" role="img" aria-label={day.description}>
                {emoji}
              </span>
              <span className="forecast-temps">
                <span className="temp-high" data-testid="forecast-high">
                  {day.temperatureHigh}°
                </span>
                <span className="temp-low" data-testid="forecast-low">
                  {day.temperatureLow}°
                </span>
              </span>
              <span className="forecast-condition">{day.description}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
