package com.apiweb.controller;

import com.apiweb.enums.ApplyStatus;
import com.apiweb.repository.ApplyJobRepository;
import com.apiweb.repository.JobRepository;
import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.ApplyJobEntity;
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplyJobController {

    @Autowired
    private ApplyJobRepository applyJobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // 1. Lấy danh sách ứng viên cho nhà tuyển dụng
    @GetMapping
    public ResponseEntity<?> getMyApplications(@RequestParam("username") String username) {
        try {
            UserEntity currentUser = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Tìm tất cả ứng viên của các Job thuộc về User này
            List<ApplyJobEntity> applications = applyJobRepository.findByJob_User_Id(currentUser.getId());
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 2. Đặt lịch phỏng vấn
    @PostMapping("/{id}/interview")
    public ResponseEntity<?> setInterview(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return applyJobRepository.findById(id).map(app -> {
            try {
                app.setInterviewTime(LocalDateTime.parse((String) body.get("interviewTime")));
                app.setInterviewLocation((String) body.get("location"));
                app.setInterviewLink((String) body.get("link"));
                app.setStatus(ApplyStatus.ACCEPTED);
                applyJobRepository.save(app);
                return ResponseEntity.ok("Success");
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Invalid date format");
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    // 3. Cập nhật trạng thái ứng viên
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return applyJobRepository.findById(id).map(application -> {
            try {
                String newStatus = request.get("status");
                application.setStatus(ApplyStatus.valueOf(newStatus.toUpperCase()));                applyJobRepository.save(application);
                return ResponseEntity.ok().body("Status updated to " + newStatus);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Invalid status");
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. Nộp đơn ứng tuyển và upload CV
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createApplication(
            @RequestPart("fullName") String fullName,
            @RequestPart("email") String email,
            @RequestPart("phoneNumber") String phoneNumber,
            @RequestPart("jobId") String jobId,
            @RequestPart("username") String username,
            @RequestPart("file") MultipartFile file) {
        try {
            UserEntity user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            JobEntity job = jobRepository.findById(Long.parseLong(jobId))
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            // --- CHIẾN THUẬT DÒ ĐƯỜNG DẪN CHUẨN ---
            // Lấy thư mục mà VS Code đang đứng (Có thể là ProjectI hoặc BE_Job)
            String currentDir = System.getProperty("user.dir");
            Path path = Paths.get(currentDir);
            
            // Vòng lặp tìm thư mục 'jobwweb' đi ngược lên trên hoặc đứng im
            // Chúng ta ép nó phải tìm thấy thư mục chứa project 
            while (path != null && !path.getFileName().toString().equals("jobwweb")) {
                if (path.resolve("jobwweb").toFile().exists()) {
                    path = path.resolve("jobwweb");
                    break;
                }
                path = path.getParent();
            }

            // Nếu không tìm thấy jobwweb thì dùng đường dẫn cứng để cứu vãn
            if (path == null) {
                path = Paths.get("D:/Study/ProjectI/jobwweb");
            }

            // Bây giờ ta đã ở jobwweb, đi vào uploads/cvs
            Path uploadPath = path.resolve("uploads").resolve("cvs");
            
            // In ra console để bạn kiểm tra ngay lập tức
            System.out.println(">>> ĐỊA CHỈ LƯU FILE CUỐI CÙNG: " + uploadPath.toAbsolutePath());

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFileName = file.getOriginalFilename();
            String extension = (originalFileName != null && originalFileName.contains(".")) 
                ? originalFileName.substring(originalFileName.lastIndexOf(".")) : ".pdf";

            String fileName = user.getId() + "_" + job.getId() + "_" + System.currentTimeMillis() + extension;
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            ApplyJobEntity application = new ApplyJobEntity();
            application.setFullName(fullName);
            application.setEmail(email);
            application.setPhoneNumber(phoneNumber);
            application.setUser(user);
            application.setJob(job);
            application.setCvFile(fileName); 
            application.setStatus(ApplyStatus.PENDING); 

            applyJobRepository.save(application);
            return ResponseEntity.ok("Success");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi: " + e.getMessage());
        }
    }
}