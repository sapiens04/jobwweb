// package com.apiweb.service;

// import com.apiweb.model.JobDTO;
// import com.apiweb.repository.entity.JobEntity;
// import com.apiweb.repository.entity.UserEntity;
// import org.springframework.data.domain.Page;

// import java.util.List;

// public interface JobService {
//     Page<JobDTO> searchPublicJobs(String title, int page, int size);
//     Page<JobDTO> searchEmployerJobs(String title, int page, int size, UserEntity employer);

//     // Đổi tham số từ JobEntity -> JobDTO
//     JobEntity create(JobDTO jobDTO, UserEntity employer);
//     JobEntity update(Long jobId, JobDTO jobDTO, UserEntity employer);

//     JobEntity publish(Long id, UserEntity employer);
//     void delete(Long jobId, UserEntity employer);
// }

// JobService.java


package com.apiweb.service;

import com.apiweb.model.JobDTO;
import com.apiweb.repository.entity.JobEntity;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.data.domain.Page;

public interface JobService {
    Page<JobDTO> searchEmployerJobs(String title, int page, int size, UserEntity user);
    
    // Thêm mới Job vào MySQL
    void createJob(JobDTO jobDTO, String username);
    // Xóa Job khỏi MySQL
    void deleteById(Long id);    
    // Đổi trạng thái tin tuyển dụng
    JobEntity publish(Long id, UserEntity user);
    
    // Tìm kiếm cho trang công khai (nếu cần)
    Page<JobDTO> searchPublicJobs(String title, int page, int size);
    
}
