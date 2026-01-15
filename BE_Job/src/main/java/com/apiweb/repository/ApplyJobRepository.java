package com.apiweb.repository;

import com.apiweb.repository.entity.ApplyJobEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplyJobRepository extends JpaRepository<ApplyJobEntity, Long> {
    boolean existsByJobIdAndUserId(Long jobId, Long userId);
    List<ApplyJobEntity> findByJobUserId(Long userId);
    List<ApplyJobEntity> findByJob_User_Id(Long userId);
}

