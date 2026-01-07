package com.apiweb.service.impl;

import com.apiweb.enums.ApplyStatus;
import com.apiweb.repository.ApplyJobRepository;
import com.apiweb.repository.CVRepository;
import com.apiweb.repository.JobRepository;
import com.apiweb.repository.entity.ApplyJobEntity;
import com.apiweb.repository.entity.CVEntity;
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

    @Autowired
    private CVRepository cvRepo;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public ApplyJobEntity apply(Long jobId, MultipartFile file, String fullName, String phoneNumber, String note, UserEntity user) {

        // ==================================================================
        // BƯỚC 1: VALIDATE DỮ LIỆU ĐẦU VÀO
        // ==================================================================

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
        // BƯỚC 2: LOGIC "SMART FILL" & CHUẨN BỊ DỮ LIỆU
        // ==================================================================

        // Tìm hồ sơ gốc hiện tại
        CVEntity masterProfile = cvRepo.findByUserIdAndIsDefaultTrue(user.getId())
                .orElse(null);

        String finalName = fullName;
        String finalPhone = phoneNumber;

        // Auto-fill nếu input rỗng
        if (finalName == null || finalName.trim().isEmpty()) {
            if (masterProfile != null) finalName = masterProfile.getFullName();
        }
        if (finalPhone == null || finalPhone.trim().isEmpty()) {
            if (masterProfile != null) finalPhone = masterProfile.getPhoneNumber();
        }

        // Chốt chặn validate cuối cùng
        if (finalName == null || finalName.trim().isEmpty()) {
            throw new RuntimeException("FULL_NAME_REQUIRED");
        }
        if (finalPhone == null || finalPhone.trim().isEmpty()) {
            throw new RuntimeException("PHONE_REQUIRED");
        }

        // ==================================================================
        // BƯỚC 3: LƯU FILE VẬT LÝ (Đẩy lên trước để lấy URL dùng cho cả 2 bước sau)
        // ==================================================================

        String fileUrl = fileStorageService.storeFile(file);
        String fileName = file.getOriginalFilename();

        // ==================================================================
        // BƯỚC 4: CẬP NHẬT HỒ SƠ GỐC (MASTER PROFILE - is_default=1)
        // (Bổ sung logic: Update luôn cả File mới vào hồ sơ gốc)
        // ==================================================================

        if (masterProfile == null) {
            // TẠO MỚI (Lần đầu tiên)
            masterProfile = new CVEntity();
            masterProfile.setUser(user);
            masterProfile.setIsDefault(true);

            // Set thông tin cá nhân
            masterProfile.setFullName(finalName);
            masterProfile.setPhoneNumber(finalPhone);

            // Set thông tin File (Để lần sau user vào profile thấy file này luôn)
            masterProfile.setFileUrl(fileUrl);
            masterProfile.setFileName(fileName);

            cvRepo.save(masterProfile);
        } else {
            // CẬP NHẬT (Người cũ)
            boolean needUpdate = false;

            // 1. Update Tên
            if (!finalName.equals(masterProfile.getFullName())) {
                masterProfile.setFullName(finalName);
                needUpdate = true;
            }
            // 2. Update SĐT
            if (!finalPhone.equals(masterProfile.getPhoneNumber())) {
                masterProfile.setPhoneNumber(finalPhone);
                needUpdate = true;
            }

            // 3. Update File (LUÔN LUÔN UPDATE vì user vừa upload file mới)
            // Logic: Hồ sơ gốc luôn chứa file CV mới nhất mà user từng nộp
            masterProfile.setFileUrl(fileUrl);
            masterProfile.setFileName(fileName);
            needUpdate = true;

            if (needUpdate) {
                cvRepo.save(masterProfile);
            }
        }

        // ==================================================================
        // BƯỚC 5: TẠO SNAPSHOT ỨNG TUYỂN (is_default=0)
        // ==================================================================

        CVEntity snapshotCV = new CVEntity();
        snapshotCV.setUser(user);
        snapshotCV.setIsDefault(false); // Bản sao lịch sử

        // Copy dữ liệu y chang như đã chốt
        snapshotCV.setFileName(fileName);
        snapshotCV.setFileUrl(fileUrl);
        snapshotCV.setFullName(finalName);
        snapshotCV.setPhoneNumber(finalPhone);

        CVEntity savedSnapshot = cvRepo.save(snapshotCV);

        // ==================================================================
        // BƯỚC 6: TẠO ĐƠN APPLY
        // ==================================================================

        ApplyJobEntity apply = new ApplyJobEntity();
        apply.setJob(job);
        apply.setUser(user);
        apply.setCv(savedSnapshot);
        apply.setNote(note);
        apply.setStatus(ApplyStatus.PENDING);
        apply.setCreatedAt(LocalDateTime.now());

        return repo.save(apply);
    }

    // --- Các hàm khác giữ nguyên ---
    @Override
    public List<ApplyJobEntity> getApplyByEmployer(Long employerId) {
        return repo.findByJobEmployerId(employerId);
    }

    @Override
    public void updateStatus(Long applyId, ApplyStatus status) {
        ApplyJobEntity apply = repo.findById(applyId)
                .orElseThrow(() -> new RuntimeException("APPLY_NOT_FOUND"));
        apply.setStatus(status);
        repo.save(apply);
    }
}