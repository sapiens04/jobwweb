// package com.apiweb.service.impl;

// import java.time.LocalDate;
// import java.util.Arrays;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import com.apiweb.enums.JobStatus;
// import com.apiweb.enums.JobType;
// import com.apiweb.model.JobDTO;
// import com.apiweb.repository.JobRepository;
// import com.apiweb.repository.UserRepository;
// import com.apiweb.repository.entity.JobEntity;
// import com.apiweb.repository.entity.UserEntity;
// import com.apiweb.service.JobService;

// // @Service
// // public class JobServiceImpl implements JobService {

// //     @Autowired
// //     private JobRepository jobRepository;

// //     @Autowired
// //     private UserRepository userRepository;

// //     @Override
// //     public Page<JobDTO> searchEmployerJobs(String title, int page, int size, UserEntity user) {
// //         Pageable pageable = PageRequest.of(page, size);
// //         return jobRepository.findByUserIdAndTitleContaining(user.getId(), title, pageable)
// //                 .map(this::toDTO);
// //     }

// //     @Override
// //     public Page<JobDTO> searchPublicJobs(String title, int page, int size) {
// //         Pageable pageable = PageRequest.of(page, size);
// //         return jobRepository.findByStatusAndTitleContaining(JobStatus.PUBLISHED, title, pageable)
// //                 .map(this::toDTO);
// //     }

// //     @Override
// //     @Transactional
// //     public void createJob(JobDTO dto, String username) {
// //         // 1. Tìm người dùng đang đăng nhập
// //         UserEntity employer = userRepository.findByUsername(username)
// //             .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

// //         // 2. Map dữ liệu từ DTO sang Entity
// //         JobEntity entity = new JobEntity();
// //         entity.setTitle(dto.getTitle());
// //         entity.setCompanyName(dto.getCompanyName());
// //         entity.setSalary(dto.getSalary());
// //         entity.setAddress(dto.getAddress());
// //         entity.setDepartment(dto.getDepartment());
// //         entity.setDescription(dto.getDescription());
        
// //         // Vì DTO.requirement và DTO.benefit đã là String nên gán trực tiếp
// //         entity.setRequirement(dto.getRequirement());
// //         entity.setBenefit(dto.getBenefit());
        
// //         // Chuyển đổi String từ React sang LocalDate cho Database
// //         if (dto.getDeadlineApply() != null && !dto.getDeadlineApply().trim().isEmpty()) {
// //             entity.setDeadlineApply(LocalDate.parse(dto.getDeadlineApply()));
// //         }

// //         // Xử lý Enum Type
// //         try {
// //             if (dto.getTypeOfJob() != null) {
// //                 entity.setTypeOfJob(JobType.valueOf(dto.getTypeOfJob()));
// //             }
// //         } catch (Exception e) {
// //             entity.setTypeOfJob(JobType.FULL_TIME);
// //         }
        
// //         entity.setStatus(JobStatus.PUBLISHED);
// //         entity.setUser(employer);

// //         jobRepository.save(entity);
// //     }

// //     @Override
// //     @Transactional
// //     public void deleteById(Long id) {
// //         if (jobRepository.existsById(id)) {
// //             jobRepository.deleteById(id);
// //         } else {
// //             throw new RuntimeException("Không tìm thấy công việc với ID: " + id);
// //         }
// //     }

// //     @Override
// //     @Transactional
// //     public void delete(Long jobId, UserEntity user) {
// //         JobEntity job = jobRepository.findById(jobId)
// //                 .orElseThrow(() -> new RuntimeException("Không tìm thấy tin!"));

// //         if (!job.getUser().getId().equals(user.getId())) {
// //             throw new RuntimeException("Bạn không có quyền xóa tin này");
// //         }
// //         jobRepository.delete(job);
// //     }

// //     @Override
// //     @Transactional
// //     public JobEntity publish(Long id, UserEntity employer) {
// //         JobEntity job = jobRepository.findById(id)
// //                 .orElseThrow(() -> new RuntimeException("Không tìm thấy tin!"));

// //         if (!job.getUser().getId().equals(employer.getId())) {
// //             throw new RuntimeException("Bạn không có quyền sửa tin này");
// //         }

// //         if (job.getStatus() == JobStatus.PUBLISHED) {
// //             job.setStatus(JobStatus.CLOSED);
// //         } else {
// //             job.setStatus(JobStatus.PUBLISHED);
// //         }
// //         return jobRepository.save(job);
// //     }

// //     // Helper: Map Entity -> DTO 
// //     private JobDTO toDTO(JobEntity entity) {
// //         JobDTO dto = new JobDTO();
// //         dto.setId(entity.getId());
// //         dto.setTitle(entity.getTitle());
// //         dto.setCompanyName(entity.getCompanyName());
// //         dto.setSalary(entity.getSalary());
// //         dto.setAddress(entity.getAddress());
        
// //         // Chuyển LocalDate sang String để trả về Frontend
// //         if (entity.getDeadlineApply() != null) {
// //             dto.setDeadlineApply(entity.getDeadlineApply().toString());
// //         }

// //         if (entity.getStatus() != null) dto.setStatus(entity.getStatus().name());
// //         if (entity.getTypeOfJob() != null) dto.setTypeOfJob(entity.getTypeOfJob().name());
        
// //         // Gán String trực tiếp (vì JobDTO đã đổi sang String)
// //         dto.setRequirement(entity.getRequirement());
// //         dto.setBenefit(entity.getBenefit());
        
// //         return dto;
// //     }
// // }

// @Service
// public class JobServiceImpl implements JobService {

//     @Autowired
//     private JobRepository jobRepository;

//     @Autowired // CỰC KỲ QUAN TRỌNG: Phải có dòng này
//     private UserRepository userRepository;

//     @Override
//     @Transactional
//     public void createJob(JobDTO dto, String username) {
//         // 1. Tìm người dùng đang đăng nhập
//         UserEntity employer = userRepository.findByUsername(username)
//             .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

//         // 2. Map dữ liệu từ DTO sang Entity
//         JobEntity entity = new JobEntity();
//         entity.setTitle(dto.getTitle());
//         entity.setCompanyName(dto.getCompanyName());
//         entity.setSalary(dto.getSalary());
//         entity.setAddress(dto.getAddress());
//         entity.setDepartment(dto.getDepartment());
//         entity.setDescription(dto.getDescription());
        
//         // Gán trực tiếp vì cả hai đều là String (Không cần ép kiểu Iterable)
//         entity.setRequirement(dto.getRequirement());
//         entity.setBenefit(dto.getBenefit());
        
//         // Chuyển đổi String yyyy-MM-dd sang LocalDate
//         if (dto.getDeadlineApply() != null && !dto.getDeadlineApply().trim().isEmpty()) {
//             entity.setDeadlineApply(LocalDate.parse(dto.getDeadlineApply()));
//         }

//         // Xử lý Enum Type an toàn
//         try {
//             if (dto.getTypeOfJob() != null) {
//                 entity.setTypeOfJob(JobType.valueOf(dto.getTypeOfJob()));
//             }
//         } catch (Exception e) {
//             entity.setTypeOfJob(JobType.FULL_TIME);
//         }
        
//         entity.setStatus(JobStatus.PUBLISHED);
//         entity.setUser(employer); // Thiết lập mối quan hệ với User

//         // 3. LƯU VÀO DATABASE
//         jobRepository.save(entity);
        
//         // In log ra Console để bạn kiểm tra chắc chắn nó đã chạy qua đây
//         System.out.println(">>> Đã lưu thành công Job: " + entity.getTitle());
//     }

//     // Các hàm khác giữ nguyên...
    
//     private JobDTO toDTO(JobEntity entity) {
//         JobDTO dto = new JobDTO();
//         dto.setId(entity.getId());
//         dto.setTitle(entity.getTitle());
//         dto.setCompanyName(entity.getCompanyName());
//         dto.setSalary(entity.getSalary());
//         dto.setAddress(entity.getAddress());
        
//         if (entity.getDeadlineApply() != null) {
//             dto.setDeadlineApply(entity.getDeadlineApply().toString());
//         }

//         if (entity.getStatus() != null) dto.setStatus(entity.getStatus().name());
//         if (entity.getTypeOfJob() != null) dto.setTypeOfJob(entity.getTypeOfJob().name());
        
//         dto.setRequirement(entity.getRequirement());
//         dto.setBenefit(entity.getBenefit());
        
//         return dto;
//     }
// }

package com.apiweb.service.impl;

import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apiweb.enums.JobStatus;
import com.apiweb.enums.JobType;
import com.apiweb.model.JobDTO;
import com.apiweb.repository.JobRepository;
import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.JobService;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    // --- 1. LẤY DANH SÁCH TIN CỦA NHÀ TUYỂN DỤNG ĐANG ĐĂNG NHẬP ---
    @Override
    public Page<JobDTO> searchEmployerJobs(String title, int page, int size, UserEntity user) {
        Pageable pageable = PageRequest.of(page, size);
        // Giả sử repository của bạn có hàm findByUserId...
        return jobRepository.findByUserIdAndTitleContaining(user.getId(), title, pageable)
                .map(this::toDTO);
    }

    // --- 2. LẤY DANH SÁCH TIN CÔNG KHAI (DÀNH CHO ỨNG VIÊN) ---
    @Override
    public Page<JobDTO> searchPublicJobs(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobRepository.findByStatusAndTitleContaining(JobStatus.PUBLISHED, title, pageable)
                .map(this::toDTO);
    }

    // --- 3. TẠO TIN TUYỂN DỤNG MỚI ---
    @Override
@Transactional
public void createJob(JobDTO dto, String username) {
    UserEntity employer = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

    JobEntity entity = new JobEntity();
    entity.setTitle(dto.getTitle());
    entity.setCompanyName(dto.getCompanyName());
    entity.setSalary(dto.getSalary());
    entity.setAddress(dto.getAddress());
    entity.setDepartment(dto.getDepartment());
    entity.setDescription(dto.getDescription());
    entity.setRequirement(dto.getRequirement());
    entity.setBenefit(dto.getBenefit());
    
    // 1. Xử lý ngày tháng: Đảm bảo không bị lỗi format
    if (dto.getDeadlineApply() != null && !dto.getDeadlineApply().trim().isEmpty()) {
        try {
            entity.setDeadlineApply(LocalDate.parse(dto.getDeadlineApply()));
        } catch (Exception e) {
            System.out.println("Lỗi định dạng ngày: " + dto.getDeadlineApply());
            // Có thể gán mặc định hoặc để null
        }
    }

    // 2. Xử lý Enum Type: Rất hay lỗi ở đây
    try {
        if (dto.getTypeOfJob() != null) {
            // Chuyển đổi format nếu FE gửi kiểu "Full Time" thành "FULL_TIME"
            String type = dto.getTypeOfJob().toUpperCase().replace(" ", "_");
            entity.setTypeOfJob(JobType.valueOf(type));
        }
    } catch (Exception e) {
        System.out.println("Không khớp Enum JobType, dùng mặc định FULL_TIME");
        entity.setTypeOfJob(JobType.FULL_TIME);
    }
    
    entity.setStatus(JobStatus.PUBLISHED);
    entity.setUser(employer);

    // 3. LƯU VÀO DATABASE
    jobRepository.save(entity);
    System.out.println(">>> Backend: Đã lưu thành công Job vào DB: " + entity.getTitle());
}

    // --- 4. XÓA TIN THEO ID ---
    @Override
    @Transactional
    public void deleteById(Long id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
        } else {
            throw new RuntimeException("Không tìm thấy công việc với ID: " + id);
        }
    }

    // --- 5. ĐỔI TRẠNG THÁI (PUBLISH/CLOSE) ---
    @Override
    @Transactional
    public JobEntity publish(Long id, UserEntity employer) {
        JobEntity job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tin!"));

        if (!job.getUser().getId().equals(employer.getId())) {
            throw new RuntimeException("Bạn không có quyền sửa tin này");
        }

        if (job.getStatus() == JobStatus.PUBLISHED) {
            job.setStatus(JobStatus.CLOSED);
        } else {
            job.setStatus(JobStatus.PUBLISHED);
        }
        return jobRepository.save(job);
    }

    // --- HELPER: CHUYỂN ENTITY SANG DTO ĐỂ TRẢ VỀ FRONTEND ---
    private JobDTO toDTO(JobEntity entity) {
        JobDTO dto = new JobDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setCompanyName(entity.getCompanyName());
        dto.setSalary(entity.getSalary());
        dto.setAddress(entity.getAddress());
        
        if (entity.getDeadlineApply() != null) {
            dto.setDeadlineApply(entity.getDeadlineApply().toString());
        }

        if (entity.getStatus() != null) dto.setStatus(entity.getStatus().name());
        if (entity.getTypeOfJob() != null) dto.setTypeOfJob(entity.getTypeOfJob().name());
        
        dto.setRequirement(entity.getRequirement());
        dto.setBenefit(entity.getBenefit());
        
        return dto;
    }
}