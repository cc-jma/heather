package de.codecentric.heather

import de.codecentric.heather.properties.ApplicationProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(ApplicationProperties::class)
class HeatherApplication

@Suppress("SpreadOperator")
fun main(args: Array<String>) {
    runApplication<HeatherApplication>(*args)
}
