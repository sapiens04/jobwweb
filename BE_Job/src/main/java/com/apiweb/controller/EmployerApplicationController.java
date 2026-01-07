package com.apiweb.controller;

import com.apiweb.enums.ApplyStatus;
import com.apiweb.repository.UserRepository; // 1. Import thêm UserRepository
import com.apiweb.repository.entity.ApplyJobEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.ApplyJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails; // 2. Import UserDetails
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employer/applications")
public class EmployerApplicationController {

    @Autowired
    private ApplyJobService applyJobService;

    @Autowired
    private UserRepository userRepository; // 3. Inject Repository để tìm User

    // 1. EMPLOYER XEM DANH SÁCH ỨNG VIÊN
    @GetMapping
    public ResponseEntity<List<ApplyJobEntity>> getApplications(
            // 4. SỬA QUAN TRỌNG: Nhận UserDetails thay vì UserEntity
            @AuthenticationPrincipal UserDetails userDetails) {

        // 5. Tìm Employer trong DB dựa vào email từ UserDetails
        UserEntity employer = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        List<ApplyJobEntity> applications = applyJobService.getApplyByEmployer(employer.getId());
        return ResponseEntity.ok(applications);
    }

    // 2. EMPLOYER DUYỆT/TỪ CHỐI HỒ SƠ
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplyStatus status) {

        // (Lưu ý: Tạm thời giữ nguyên logic đơn giản này.
        // Sau này nên thêm logic check xem Employer này có sở hữu Job đó không)

        applyJobService.updateStatus(id, status);

        return ResponseEntity.ok("Cập nhật trạng thái hồ sơ thành công!");
    }
}