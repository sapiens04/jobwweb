package com.apiweb.controller;

import com.apiweb.model.JobDTO;
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.repository.JobRepository;
import com.apiweb.repository.UserRepository;
import com.apiweb.service.JobService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired private JobService jobService;
    @Autowired private UserRepository userRepository;
    
    @Autowired
    private JobRepository jobRepository;
    @GetMapping("/{id}")
    public ResponseEntity<JobEntity> getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(job -> ResponseEntity.ok().body(job))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/my-jobs")
public ResponseEntity<?> getMyJobs(
        @RequestParam(defaultValue = "") String title,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
    try {
        // Lấy thông tin xác thực từ Header Authorization (Basic Auth)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        
        // Tìm User trong DB (Nếu login account có ID=3, biến user này sẽ chứa ID=3)
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Truy vấn MySQL lọc theo user_id = 3
        Page<JobDTO> result = jobService.searchEmployerJobs(title, page, size, user);
        return ResponseEntity.ok(result);
    } catch (Exception e) {
        e.printStackTrace(); // In lỗi đỏ ra Console IntelliJ để xem chi tiết
        return ResponseEntity.status(500).body("Lỗi SQL/Mapping: " + e.getMessage());
    }
}
@GetMapping("/featured")
public ResponseEntity<List<JobEntity>> getFeaturedJobs() {
    try {
        // Lấy 6 công việc mới nhất hiển thị ở trang chủ
        List<JobEntity> jobs = jobRepository.findTop6ByOrderByIdDesc();
        
        if (jobs == null) {
            return ResponseEntity.ok(new ArrayList<>());
        }
        
        return ResponseEntity.ok(jobs); 
    } catch (Exception e) {
        // In lỗi ra console để debug nếu có lỗi SQL
        e.printStackTrace();
        return ResponseEntity.status(500).build();
    }
}
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteJob(@PathVariable Long id) {
    // Logic: Tìm job, kiểm tra xem có phải của User đang đăng nhập không, nếu đúng thì xóa
    jobService.deleteById(id);
    return ResponseEntity.ok().build();
}

@PostMapping("/create")
public ResponseEntity<?> createJob(@RequestBody JobDTO jobDTO) {
    try {
        // Lấy username từ hệ thống Auth (Basic Auth)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        
        jobService.createJob(jobDTO, username);
        
        return ResponseEntity.ok().body("{\"message\": \"Thêm tin tuyển dụng thành công!\"}");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Lỗi: " + e.getMessage());
    }
}
@GetMapping
    public ResponseEntity<List<JobEntity>> getAllJobs() {
        // Lấy toàn bộ công việc từ DB, sắp xếp theo ngày mới nhất
        List<JobEntity> jobs = jobRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(jobs);
    }
}