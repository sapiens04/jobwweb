package com.apiweb.service;

import com.apiweb.model.JobDTO;
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface JobService {
    Page<JobDTO> searchPublicJobs(String title, int page, int size);
    Page<JobDTO> searchEmployerJobs(String title, int page, int size, UserEntity employer);

    // Đổi tham số từ JobEntity -> JobDTO
    JobEntity create(JobDTO jobDTO, UserEntity employer);
    JobEntity update(Long jobId, JobDTO jobDTO, UserEntity employer);

    JobEntity publish(Long id, UserEntity employer);
    void delete(Long jobId, UserEntity employer);
}

