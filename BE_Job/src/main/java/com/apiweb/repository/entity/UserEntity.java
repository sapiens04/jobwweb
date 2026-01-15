package com.apiweb.repository.entity;

import com.apiweb.enums.Role;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user") // Đã khớp với tên bảng bạn nói
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class UserEntity extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
  
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}