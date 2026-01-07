package com.apiweb.repository.entity;

import com.apiweb.enums.Role;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String email; // Đóng vai trò là Username

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Quan hệ 1-nhiều với CV (Một User có thể có nhiều CV/Hồ sơ)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CVEntity> cvs;

    // Quan hệ với Job (Nếu là Employer)
    @OneToMany(mappedBy = "employer", fetch = FetchType.LAZY)
    private List<JobEntity> postedJobs;

    // Getter & Setter
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}