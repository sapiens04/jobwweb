package com.apiweb.repository; // Nhớ check đúng package của bạn

import com.apiweb.enums.JobStatus;
import com.apiweb.repository.entity.JobEntity;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Long> {
    // Truy vấn jobs dựa trên ID của đối tượng employer
    Page<JobEntity> findByUserIdAndTitleContaining(Long userId, String title, Pageable pageable);
    long countByUserIdAndStatus(Long userId, JobStatus status);
    List<JobEntity> findAllByOrderByCreatedAtDesc();
    List<JobEntity> findTop6ByOrderByIdDesc();
}   