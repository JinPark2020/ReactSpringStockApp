package com.example.demo.util;

import org.springframework.stereotype.Component;

@Component
public class LoggedInUserUtil {

    // Replace this with your actual logic to fetch the logged-in user ID
    public static String getCurrentUserId() {
        // Example: fetch user ID from session or security context
        return "123"; // Replace with actual user ID retrieval logic
    }
}
