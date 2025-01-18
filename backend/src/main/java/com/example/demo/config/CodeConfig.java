package com.example.demo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.Map;

/**
 * Configuration class for loading and managing code mappings from a JSON file.
 */
@Configuration
public class CodeConfig {

    /**
     * Loads the JSON file (codes.json) from the classpath and parses it into a Map structure.
     * 
     * @return A Map containing the parsed data from the JSON file.
     * @throws Exception If the JSON file is not found or fails to parse.
     */
    @Bean(name = "codeMap")
    public Map<String, Object> loadCodeMap() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper(); // Jackson object for JSON parsing

        // Load the JSON file from the resources folder
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("codes.json");
        if (inputStream == null) {
            // Throw an error if the file is not found in the classpath
            throw new IllegalStateException("codes.json not found in resources!");
        }

        // Parse the JSON file into a Map and return
        return objectMapper.readValue(inputStream, Map.class);
    }
}
