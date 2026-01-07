package com.apiweb.repository; // Nhớ check đúng package của bạn

import com.apiweb.enums.JobStatus;
import com.apiweb.repository.entity.JobEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Long> {

    // 1. Tìm job theo trạng thái và tên (Dành cho trang chủ/tìm kiếm)
    // SỬA: Đổi String status -> JobStatus status
    Page<JobEntity> findByStatusAndTitleContaining(
            JobStatus status,
            String title,
            Pageable pageable
    );

    // 2. Tìm job của một nhà tuyển dụng cụ thể (Dành cho trang quản lý của Employer)
    // SỬA: Đổi UserEntity employer -> Long employerId (Tiện hơn)
    Page<JobEntity> findByEmployerIdAndTitleContaining(
            Long employerId,
            String title,
            Pageable pageable
    );

    // 3. Tìm job chỉ theo trạng thái (Optional - nếu cần)
    Page<JobEntity> findByStatus(JobStatus status, Pageable pageable);
}