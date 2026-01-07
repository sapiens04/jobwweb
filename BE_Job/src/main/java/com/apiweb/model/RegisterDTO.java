package com.apiweb.model;

public class RegisterDTO {
    private String email;
    private String password;
    private String role; // "EMPLOYER" hoặc "USER"

    // KHÔNG CẦN các trường fullName, phone, address ở đây nữa

    // Getters & Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}