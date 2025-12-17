import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { components } from '../api/generated/types'

export type WeatherResponse = components['schemas']['WeatherResponse']
export type CurrentWeather = components['schemas']['CurrentWeather']
export type DailyForecast = components['schemas']['DailyForecast']
export type WeatherCondition = CurrentWeather['condition']

const fetchWeather = async (): Promise<WeatherResponse> => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
  const response = await axios.get<WeatherResponse>(`${apiBaseUrl}/api/weather`)
  return response.data
}

export function useWeather() {
  return useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}
