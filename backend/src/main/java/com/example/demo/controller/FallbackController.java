package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallbackController {

    @RequestMapping("/**")
    public ResponseEntity<String> handleInvalidRequests() {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Error 404: The requested URL was not found on this server.");
    }
}
