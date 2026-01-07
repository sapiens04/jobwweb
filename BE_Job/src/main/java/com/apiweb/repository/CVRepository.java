package com.apiweb.repository;

import com.apiweb.repository.entity.CVEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CVRepository extends JpaRepository<CVEntity, Long> {

    List<CVEntity> findByUserId(Long userId);
    boolean existsByPhoneNumber(String phoneNumber); // Để check trùng SĐT
    Optional<CVEntity> findByUserIdAndIsDefaultTrue(Long userId);
}

