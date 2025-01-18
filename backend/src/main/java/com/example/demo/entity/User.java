package com.example.demo.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

import com.example.demo.util.LoggedInUserUtil;

@Entity
@Table(name = "users") 
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @Column(nullable = false, unique = true)
    private String email; // Unique email (used as user ID)

    @Column(nullable = false)
    private String name; // User name

    @Column(nullable = false)
    private String role = "CDE0000.01"; // Default role (Basic User)

    @Column(nullable = false, updatable = false)
    private Timestamp createdDate; // Registration date

    @Column(nullable = false)
    private Timestamp updatedDate; // Last updated date

    @Column(nullable = false, updatable = false)
    private String createdBy; // Creator (user ID or default text)

    @Column(nullable = false)
    private String updatedBy; // Updater (user ID or default text)

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    public Timestamp getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Timestamp updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        this.createdDate = new Timestamp(System.currentTimeMillis());
        this.updatedDate = new Timestamp(System.currentTimeMillis());
        this.createdBy = getCurrentUserIdOrDefault(); // Set creator as the current user or default
        this.updatedBy = getCurrentUserIdOrDefault(); // Initially, updater is also the creator
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedDate = new Timestamp(System.currentTimeMillis());
        this.updatedBy = getCurrentUserIdOrDefault(); // Set updater as the current user or default
    }

    // Utility method to get the current logged-in user's ID or default value
    private String getCurrentUserIdOrDefault() {
        try {
            // Replace with actual logic to fetch the logged-in user's ID
            String currentUserId = LoggedInUserUtil.getCurrentUserId(); // Example utility method
            return (currentUserId != null && !currentUserId.isEmpty()) ? currentUserId : "SYSTEM";
        } catch (Exception e) {
            // Handle cases where no user is logged in
            return "SYSTEM";
        }
    }
}
