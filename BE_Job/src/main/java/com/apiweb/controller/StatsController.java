package com.apiweb.controller;

import com.apiweb.model.StatsDTO;
import com.apiweb.repository.JobRepository;
import com.apiweb.repository.ApplicationRepository;
import com.apiweb.repository.UserRepository;
import com.apiweb.enums.JobStatus;
import com.apiweb.enums.ApplyStatus;
import com.apiweb.repository.entity.UserEntity;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private UserRepository userRepository;

    // 1. Biểu đồ đường: Ứng tuyển theo ngày
    @GetMapping("/applications-by-day")
    public ResponseEntity<List<Map<String, Object>>> getApplicationsByDay() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();

        List<Object[]> results = applicationRepository.countApplicationsByDayOfWeek(user.getId());

        Map<String, Integer> dayValues = new LinkedHashMap<>();
        dayValues.put("Monday", 0);
        dayValues.put("Tuesday", 0);
        dayValues.put("Wednesday", 0);
        dayValues.put("Thursday", 0);
        dayValues.put("Friday", 0);
        dayValues.put("Saturday", 0);
        dayValues.put("Sunday", 0);

        for (Object[] row : results) {
            if (row[0] != null) {
                dayValues.put(row[0].toString(), ((Number) row[1]).intValue());
            }
        }

        Map<String, String> translate = Map.of(
            "Monday", "T2", "Tuesday", "T3", "Wednesday", "T4",
            "Thursday", "T5", "Friday", "T6", "Saturday", "T7", "Sunday", "CN"
        );

        List<Map<String, Object>> finalData = new ArrayList<>();
        dayValues.forEach((day, count) -> {
            finalData.add(Map.of(
                "name", translate.get(day),
                "applications", count
            ));
        });

        return ResponseEntity.ok(finalData);
    }

    // 2. Biểu đồ cột: Ứng tuyển theo Job (Bổ sung để hết lỗi 404)
    @GetMapping("/applications-by-job")
    public ResponseEntity<?> getApplicationsByJob() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();
        
        List<Object[]> results = applicationRepository.countApplicationsByJob(user.getId());

        return ResponseEntity.ok(results.stream().map(r -> Map.of(
            "name", r[0].toString(), // Title của Job
            "count", r[1]           // Số lượng apply
        )).toList());
    }

    // 3. Biểu đồ tròn: Trạng thái ứng viên
    @GetMapping("/applications-by-status")
    public ResponseEntity<?> getStatusStats() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();

        List<Object[]> results = applicationRepository.countApplicationsByStatus(user.getId());
        
        Map<String, String> colors = Map.of(
            "PENDING", "#3B82F6",
            "REVIEWING", "#EAB308",
            "ACCEPTED", "#10B981",
            "REJECTED", "#EF4444"
        );

        return ResponseEntity.ok(results.stream().map(r -> Map.of(
            "name", r[0].toString(),
            "value", r[1],
            "color", colors.getOrDefault(r[0].toString(), "#8B5CF6")
        )).toList());
    }

    // 4. Các thẻ số tổng quát (Dashboard Cards)
    @GetMapping("/employer")
    public ResponseEntity<StatsDTO> getEmployerStats() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long activeJobs = jobRepository.countByUserIdAndStatus(user.getId(), JobStatus.PUBLISHED);
        long totalCandidates = applicationRepository.countByJob_UserId(user.getId());
        long hiredCandidates = applicationRepository.countByJob_UserIdAndStatus(user.getId(), ApplyStatus.ACCEPTED);

        double conversionRate = totalCandidates > 0 ? (double) hiredCandidates / totalCandidates * 100 : 0.0;
        double roundedRate = Math.round(conversionRate * 10.0) / 10.0;

        StatsDTO stats = new StatsDTO(activeJobs, totalCandidates, hiredCandidates, roundedRate);
        return ResponseEntity.ok(stats);
    }
}