package com.apiweb.repository;

import com.apiweb.repository.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    boolean existsByUsername(String username);            // Để check trùng khi đăng ký
    java.util.Optional<UserEntity> findByUsername(String username);
}
