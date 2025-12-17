import './App.css'
import { WeatherDisplay } from './components/WeatherDisplay'
import { ForecastList } from './components/ForecastList'
import { AgeCalculator } from './components/AgeCalculator'
import { useWeather } from './hooks/useWeather'

function App() {
  const { data: weatherData, isLoading, error } = useWeather()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>

        <WeatherDisplay
          weather={weatherData?.current}
          isLoading={isLoading}
          error={error}
        />

        {!isLoading && !error && <ForecastList forecast={weatherData?.forecast} />}

        <div className="section-divider" />

        <AgeCalculator />
      </header>
    </div>
  )
}

export default App
