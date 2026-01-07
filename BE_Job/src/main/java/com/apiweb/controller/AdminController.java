package com.apiweb.controller;

import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
// @PreAuthorize("hasRole('ADMIN')") // Nếu cấu hình Security tốt thì dùng dòng này, không thì config ở SecurityConfig
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // API 1: Xem danh sách tất cả người dùng (Chỉ Admin xem được)
    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // API 2: Xóa người dùng bất kỳ
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa User thành công!");
    }
}