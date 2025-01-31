package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RoleController {

    @Autowired
    @Qualifier("codeMap") // Specify the correct Bean to inject
    private Map<String, Object> codeMap; // Inject loaded JSON data

    // Test API to return the loaded JSON data
    @GetMapping("/api/getcodes")
    public Map<String, Object> getCodes() {
        return codeMap;
    }
}