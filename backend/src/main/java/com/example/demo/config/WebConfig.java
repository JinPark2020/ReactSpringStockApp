package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures CORS settings for the application.
     * This allows the frontend (React) to communicate with the backend (Spring Boot)
     * while running on different ports during development.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        /**
         * Allows cross-origin requests from the specified frontend URL.
         * Adjust the allowedOrigins value for production environments.
         */
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // React development server
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // HTTP methods allowed
    }
}
