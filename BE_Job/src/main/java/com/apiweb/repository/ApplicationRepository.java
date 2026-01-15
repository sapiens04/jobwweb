// // Trong file ApplicationRepository.java
// package com.apiweb.repository;

// import com.apiweb.enums.ApplyStatus;
// import com.apiweb.repository.entity.ApplyJobEntity; // Check lại tên Entity của bạn

// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface ApplicationRepository extends JpaRepository<ApplyJobEntity, Long> {
//     // Đếm tổng số ứng viên nộp vào các job của Employer này
//     long countByJob_UserId(Long userId);

//     // Đếm số ứng viên đã được tuyển (ví dụ status là 'HIRED' hoặc 'ACCEPTED')
//     long countByJob_UserIdAndStatus(Long userId, ApplyStatus status);
//     @Query(value = "SELECT DAYNAME(aj.created_at) as day, COUNT(*) as count " +
//                "FROM apply_jobs aj " +
//                "JOIN jobs j ON aj.job_id = j.job_id " +
//                "WHERE j.user_id = :userId " +
//                "AND aj.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) " +
//                "GROUP BY DAYNAME(aj.created_at)", nativeQuery = true)
//     List<Object[]> countApplicationsByDayOfWeek(Long userId);
//     @Query(value = "SELECT aj.status, COUNT(*) as count " +
//                "FROM apply_jobs aj " +
//                "JOIN jobs j ON aj.job_id = j.job_id " +
//                "WHERE j.user_id = :userId " +
//                "GROUP BY aj.status", nativeQuery = true)
// List<Object[]> countApplicationsByStatus(Long userId);    
// }


package com.apiweb.repository;

import com.apiweb.enums.ApplyStatus;
import com.apiweb.repository.entity.ApplyJobEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; // Nên thêm cái này để mapping tham số tốt hơn
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplyJobEntity, Long> {
    
    // 1. Đếm tổng số ứng viên của một Employer
    long countByJob_UserId(Long userId);

    // 2. Đếm số ứng viên theo trạng thái cụ thể (ví dụ: ACCEPTED)
    long countByJob_UserIdAndStatus(Long userId, ApplyStatus status);

    // 3. Query cho biểu đồ Line Chart: Ứng tuyển theo ngày trong tuần
    @Query(value = "SELECT DAYNAME(aj.created_at) as day, COUNT(*) as count " +
                   "FROM apply_jobs aj " +
                   "JOIN jobs j ON aj.job_id = j.job_id " +
                   "WHERE j.user_id = :userId " +
                   "AND aj.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) " +
                   "GROUP BY day " +
                   "ORDER BY DAYOFWEEK(aj.created_at) ASC", nativeQuery = true)
    List<Object[]> countApplicationsByDayOfWeek(@Param("userId") Long userId);

    // 4. Query cho biểu đồ Pie Chart: Thống kê theo trạng thái (PENDING, ACCEPTED...)
    @Query(value = "SELECT aj.status, COUNT(*) as count " +
                   "FROM apply_jobs aj " +
                   "JOIN jobs j ON aj.job_id = j.job_id " +
                   "WHERE j.user_id = :userId " +
                   "GROUP BY aj.status", nativeQuery = true)
    List<Object[]> countApplicationsByStatus(@Param("userId") Long userId);

    // 5. PHẦN CÒN THIẾU - Query cho biểu đồ Bar Chart: Ứng viên theo tiêu đề công việc
    @Query(value = "SELECT j.title, COUNT(aj.apply_id) as count " +
                   "FROM apply_jobs aj " +
                   "JOIN jobs j ON aj.job_id = j.job_id " +
                   "WHERE j.user_id = :userId " +
                   "GROUP BY j.job_id", nativeQuery = true)
    List<Object[]> countApplicationsByJob(@Param("userId") Long userId);
}