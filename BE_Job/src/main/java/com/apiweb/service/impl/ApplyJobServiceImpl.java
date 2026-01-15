package com.apiweb.service.impl;

import com.apiweb.enums.ApplyStatus;
import com.apiweb.repository.ApplyJobRepository;
// import com.apiweb.repository.CVRepository; // 1. ẨN IMPORT
import com.apiweb.repository.JobRepository;
import com.apiweb.repository.entity.ApplyJobEntity;
// import com.apiweb.repository.entity.CVEntity; // 2. ẨN IMPORT
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.ApplyJobService;
import com.apiweb.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ApplyJobServiceImpl implements ApplyJobService {

    @Autowired
    private ApplyJobRepository repo;

    @Autowired
    private JobRepository jobRepo;

    // @Autowired
    // private CVRepository cvRepo; // 3. ẨN INJECT

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public ApplyJobEntity apply(Long jobId, MultipartFile file, String fullName, String phoneNumber, String note, UserEntity user) {

        // 1.1 Check Login
        if (user == null) throw new RuntimeException("UNAUTHORIZED");

        // 1.2 Check Job tồn tại
        JobEntity job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("JOB_NOT_FOUND"));

        // 1.3 Check đã nộp chưa
        if (repo.existsByJobIdAndUserId(jobId, user.getId())) {
            throw new RuntimeException("ALREADY_APPLIED");
        }

        // 1.4 Check File
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("CV_REQUIRED");
        }

        // ==================================================================
        // ĐÃ ẨN LOGIC CV (BƯỚC 2, 4, 5)
        // ==================================================================
        
        /* Ẩn logic Master Profile và Snapshot CV
        CVEntity masterProfile = cvRepo.findByUserIdAndIsDefaultTrue(user.getId()).orElse(null);
        ... (toàn bộ logic CVEntity đã được bỏ qua)
        */

        // Lưu file vẫn giữ lại để không lỗi logic storage
        String fileUrl = fileStorageService.storeFile(file);
        // String fileName = file.getOriginalFilename();

        // ==================================================================
        // BƯỚC 6: TẠO ĐƠN APPLY (Bỏ phần set CV)
        // ==================================================================

        ApplyJobEntity apply = new ApplyJobEntity();
        apply.setJob(job);
        apply.setUser(user);
        // apply.setCv(savedSnapshot); // 4. ẨN DÒNG NÀY (Vì đã ẩn cv trong Entity)
        apply.setNote(note);
        apply.setStatus(ApplyStatus.PENDING);
        apply.setCreatedAt(LocalDateTime.now());

        return repo.save(apply);
    }


    @Override
    public void updateStatus(Long applyId, ApplyStatus status) {
        ApplyJobEntity apply = repo.findById(applyId)
                .orElseThrow(() -> new RuntimeException("APPLY_NOT_FOUND"));
        apply.setStatus(status);
        repo.save(apply);
    }
}