package com.apiweb.controller;

import com.apiweb.repository.UserRepository; // Import thêm cái này
import com.apiweb.repository.entity.CVEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails; // Import UserDetails
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cv")
public class CVController {

    @Autowired
    private CVService cvService;

    @Autowired
    private UserRepository userRepository; // Cần thêm Repository để tìm User từ Email

    @PutMapping("/profile/update")
    public ResponseEntity<?> updateMyProfile(
            @RequestBody CVEntity updatedInfo,
            // SỬA 1: Nhận UserDetails thay vì UserEntity để tránh lỗi Type Mismatch
            @AuthenticationPrincipal UserDetails userDetails) {

        // SỬA 2: Kiểm tra nếu chưa đăng nhập (userDetails bị null)
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Bạn chưa đăng nhập!");
        }

        try {
            // SỬA 3: Tìm UserEntity thật trong Database dựa vào email (username) lấy từ token/session
            UserEntity currentUser = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user!"));

            // Gọi Service xử lý
            CVEntity updatedCV = cvService.updateProfile(currentUser.getId(), updatedInfo);

            return ResponseEntity.ok(updatedCV);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}