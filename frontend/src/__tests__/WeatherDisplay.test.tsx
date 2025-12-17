import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WeatherDisplay } from '../components/WeatherDisplay'
import type { CurrentWeather } from '../hooks/useWeather'

describe('WeatherDisplay', () => {
  const mockWeather: CurrentWeather = {
    temperature: 18,
    condition: 'SUNNY',
    description: 'Sunny',
  }

  it('displays loading state when isLoading is true', () => {
    render(<WeatherDisplay weather={undefined} isLoading={true} error={null} />)

    expect(screen.getByTestId('weather-loading')).toBeInTheDocument()
    expect(screen.getByText('Loading weather data...')).toBeInTheDocument()
  })

  it('displays error state when error is present', () => {
    const error = new Error('Network error')
    render(<WeatherDisplay weather={undefined} isLoading={false} error={error} />)

    expect(screen.getByTestId('weather-error')).toBeInTheDocument()
    expect(screen.getByText('Weather data is temporarily unavailable.')).toBeInTheDocument()
  })

  it('displays current weather data correctly', () => {
    render(<WeatherDisplay weather={mockWeather} isLoading={false} error={null} />)

    expect(screen.getByTestId('weather-display')).toBeInTheDocument()
    expect(screen.getByTestId('current-temperature')).toHaveTextContent('18°C')
    expect(screen.getByTestId('current-condition')).toHaveTextContent('Sunny')
  })

  it('displays weather emoji for sunny condition', () => {
    render(<WeatherDisplay weather={mockWeather} isLoading={false} error={null} />)

    const emoji = screen.getByRole('img', { name: 'Sunny' })
    expect(emoji).toBeInTheDocument()
  })

  it('returns null when no weather data and not loading', () => {
    const { container } = render(
      <WeatherDisplay weather={undefined} isLoading={false} error={null} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('displays cloudy weather correctly', () => {
    const cloudyWeather: CurrentWeather = {
      temperature: 12,
      condition: 'CLOUDY',
      description: 'Cloudy',
    }
    render(<WeatherDisplay weather={cloudyWeather} isLoading={false} error={null} />)

    expect(screen.getByTestId('current-temperature')).toHaveTextContent('12°C')
    expect(screen.getByTestId('current-condition')).toHaveTextContent('Cloudy')
  })

  it('displays negative temperature correctly', () => {
    const coldWeather: CurrentWeather = {
      temperature: -5,
      condition: 'SNOWY',
      description: 'Snowy',
    }
    render(<WeatherDisplay weather={coldWeather} isLoading={false} error={null} />)

    expect(screen.getByTestId('current-temperature')).toHaveTextContent('-5°C')
  })
})
