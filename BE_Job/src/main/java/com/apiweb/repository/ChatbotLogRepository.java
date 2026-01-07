package com.apiweb.repository;

import com.apiweb.repository.entity.ChatbotLogEntity; // <-- Kiểm tra dòng import này
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatbotLogRepository extends JpaRepository<ChatbotLogEntity, Long> {
}