package de.codecentric.heather.weather

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class WeatherController(
    private val weatherService: WeatherService,
) {

    @GetMapping("/api/weather")
    fun getWeather(): ResponseEntity<WeatherResponse> {
        val weather = weatherService.getWeather()
        return ResponseEntity.ok(weather)
    }
}
