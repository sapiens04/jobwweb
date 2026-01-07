package com.apiweb.controller;

import com.apiweb.model.ApplyJobDTO;
import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.ApplyJobEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.ApplyJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/apply")
public class ApplyJobController {

    @Autowired
    private ApplyJobService applyJobService;

    @Autowired
    private UserRepository userRepository;

    /**
     * APPLY JOB – BẮT BUỘC UPLOAD CV
     */
    @PostMapping
    public ResponseEntity<ApplyJobDTO> applyJob(
            @RequestParam("jobId") Long jobId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "fullName", required = false) String fullName,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "note", required = false) String note,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        // 1️⃣ Lấy user đang đăng nhập
        UserEntity currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"));

        // 2️⃣ Gọi service apply
        ApplyJobEntity entity =
                applyJobService.apply(jobId, file, fullName, phoneNumber, note, currentUser);

        // 3️⃣ MAP ENTITY → DTO (FIX LỖI 500 LAZY PROXY)
        ApplyJobDTO dto = new ApplyJobDTO();
        dto.setId(entity.getId());
        dto.setJobId(entity.getJob().getId());
        dto.setStatus(entity.getStatus().name());
        dto.setNote(entity.getNote());
        dto.setCreatedAt(entity.getCreatedAt());

        // 4️⃣ Trả response
        return ResponseEntity.ok(dto);
    }
}
