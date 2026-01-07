package com.apiweb.controller;

import com.apiweb.model.JobDTO;
import com.apiweb.repository.UserRepository; // Import thêm
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employer/jobs")
public class EmployerJobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private UserRepository userRepository; // Cần Inject để tìm User từ Email

    // Helper: Hàm tìm UserEntity từ UserDetails (Tránh lặp code)
    private UserEntity getCurrentEmployer(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Employer này trong hệ thống!"));
    }

    // 1. TẠO JOB MỚI
    @PostMapping
    public ResponseEntity<JobEntity> createJob(
            @RequestBody JobDTO jobDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        UserEntity employer = getCurrentEmployer(userDetails); // Lấy thông tin người đăng
        JobEntity newJob = jobService.create(jobDTO, employer);
        return ResponseEntity.ok(newJob);
    }

    // 2. XEM DANH SÁCH JOB CỦA MÌNH
    @GetMapping
    public ResponseEntity<Page<JobDTO>> getMyJobs(
            @RequestParam(required = false, defaultValue = "") String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @AuthenticationPrincipal UserDetails userDetails) { // Sửa thành UserDetails

        UserEntity employer = getCurrentEmployer(userDetails);
        Page<JobDTO> jobs = jobService.searchEmployerJobs(title, page, size, employer);
        return ResponseEntity.ok(jobs);
    }

    // 3. CẬP NHẬT JOB
    @PutMapping("/{id}")
    public ResponseEntity<JobEntity> updateJob(
            @PathVariable Long id,
            @RequestBody JobDTO jobDTO,
            @AuthenticationPrincipal UserDetails userDetails) { // Sửa thành UserDetails

        UserEntity employer = getCurrentEmployer(userDetails);
        JobEntity updatedJob = jobService.update(id, jobDTO, employer);
        return ResponseEntity.ok(updatedJob);
    }

    // 4. ĐĂNG TIN (PUBLISH)
    @PostMapping("/{id}/publish")
    public ResponseEntity<JobEntity> publishJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) { // Sửa thành UserDetails

        UserEntity employer = getCurrentEmployer(userDetails);
        JobEntity publishedJob = jobService.publish(id, employer);
        return ResponseEntity.ok(publishedJob);
    }

    // 5. XÓA JOB
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) { // Sửa thành UserDetails

        UserEntity employer = getCurrentEmployer(userDetails);
        jobService.delete(id, employer);
        return ResponseEntity.ok("Xóa công việc thành công");
    }
}