package com.apiweb.service.impl;

import com.apiweb.enums.JobStatus;
import com.apiweb.enums.JobType;
import com.apiweb.model.JobDTO;
import com.apiweb.repository.JobRepository;
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    // 1. Tìm kiếm Public (Dùng Enum JobStatus)
    @Override
    public Page<JobDTO> searchPublicJobs(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobRepository
                .findByStatusAndTitleContaining(JobStatus.PUBLISHED, title, pageable)
                .map(this::toDTO);
    }

    // 2. Tìm kiếm của Employer (Dùng ID cho tối ưu)
    @Override
    public Page<JobDTO> searchEmployerJobs(String title, int page, int size, UserEntity employer) {
        Pageable pageable = PageRequest.of(page, size);
        // Lưu ý: Repository đã sửa thành findByEmployerId
        return jobRepository
                .findByEmployerIdAndTitleContaining(employer.getId(), title, pageable)
                .map(this::toDTO);
    }

    // 3. Tạo mới Job (Nhận DTO để xử lý List -> String)
    @Override
    public JobEntity create(JobDTO jobDTO, UserEntity employer) {
        JobEntity job = new JobEntity();

        // Map dữ liệu từ DTO sang Entity
        job.setTitle(jobDTO.getTitle());
        job.setSalary(jobDTO.getSalary());
        job.setAddress(jobDTO.getLocation());
        job.setDescription(jobDTO.getDescription());
        job.setCompanyName(jobDTO.getCompanyName());
        job.setDeadlineApply(jobDTO.getDeadlineApply());

        // Xử lý Enum Type
        if (jobDTO.getTypeOfJob() != null) {
            job.setTypeOfJob(JobType.valueOf(jobDTO.getTypeOfJob()));
        }

        // ❗ Xử lý gộp dòng: List<String> -> String (ngăn cách bởi xuống dòng)
        if (jobDTO.getRequirements() != null) {
            job.setRequirement(String.join("\n", jobDTO.getRequirements()));
        }
        if (jobDTO.getBenefits() != null) {
            job.setBenefit(String.join("\n", jobDTO.getBenefits()));
        }

        job.setEmployer(employer);
        job.setStatus(JobStatus.DRAFT); // Mặc định là bản nháp

        return jobRepository.save(job);
    }

    // 4. Update Job
    @Override
    public JobEntity update(Long jobId, JobDTO jobDTO, UserEntity employer) {
        JobEntity old = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Check quyền sở hữu
        if (!old.getEmployer().getId().equals(employer.getId())) {
            throw new RuntimeException("Bạn không có quyền sửa job này");
        }

        // Update thông tin
        old.setTitle(jobDTO.getTitle());
        old.setSalary(jobDTO.getSalary());
        old.setAddress(jobDTO.getLocation());
        old.setDescription(jobDTO.getDescription());
        old.setCompanyName(jobDTO.getCompanyName());
        old.setDeadlineApply(jobDTO.getDeadlineApply());

        if (jobDTO.getTypeOfJob() != null) {
            old.setTypeOfJob(JobType.valueOf(jobDTO.getTypeOfJob()));
        }

        // Update Requirements & Benefits (Gộp dòng lại)
        if (jobDTO.getRequirements() != null) {
            old.setRequirement(String.join("\n", jobDTO.getRequirements()));
        }
        if (jobDTO.getBenefits() != null) {
            old.setBenefit(String.join("\n", jobDTO.getBenefits()));
        }

        return jobRepository.save(old);
    }

    // 5. Publish Job (Đổi trạng thái)
    @Override
    public JobEntity publish(Long id, UserEntity employer) {
        JobEntity job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployer().getId().equals(employer.getId())) {
            throw new RuntimeException("Not owner");
        }

        job.setStatus(JobStatus.PUBLISHED); // Dùng Enum
        return jobRepository.save(job);
    }

    // 6. Xóa Job
    @Override
    public void delete(Long jobId, UserEntity employer) {
        JobEntity job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployer().getId().equals(employer.getId())) {
            throw new RuntimeException("No permission");
        }
        jobRepository.delete(job);
    }

    // --- HELPER: Chuyển Entity -> DTO ---
    private JobDTO toDTO(JobEntity entity) {
        JobDTO dto = new JobDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setCompanyName(entity.getCompanyName());
        dto.setSalary(entity.getSalary());
        dto.setLocation(entity.getAddress());
        dto.setDescription(entity.getDescription());
        dto.setDeadlineApply(entity.getDeadlineApply());

        // Convert Enum sang String để trả về FE
        if (entity.getStatus() != null) dto.setStatus(entity.getStatus().name());
        if (entity.getTypeOfJob() != null) dto.setTypeOfJob(entity.getTypeOfJob().name());

        // ❗ Tách dòng: String -> List<String>
        if (entity.getRequirement() != null && !entity.getRequirement().isEmpty()) {
            dto.setRequirements(Arrays.asList(entity.getRequirement().split("\n")));
        } else {
            dto.setRequirements(new ArrayList<>());
        }

        if (entity.getBenefit() != null && !entity.getBenefit().isEmpty()) {
            dto.setBenefits(Arrays.asList(entity.getBenefit().split("\n")));
        } else {
            dto.setBenefits(new ArrayList<>());
        }

        return dto;
    }
}