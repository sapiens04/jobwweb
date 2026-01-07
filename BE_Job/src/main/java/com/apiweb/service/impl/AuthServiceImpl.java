package com.apiweb.service.impl;

import com.apiweb.enums.Role;
import com.apiweb.model.RegisterDTO;
import com.apiweb.repository.CVRepository;
import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.CVEntity;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CVRepository cvRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserEntity register(RegisterDTO request) {
        // 1. Check trùng Email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email này đã được sử dụng!");
        }

        // 2. Tạo User
        UserEntity newUser = new UserEntity();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        try {
            newUser.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } catch (Exception e) {
            newUser.setRole(Role.USER);
        }

        UserEntity savedUser = userRepository.save(newUser);

        // 3. TẠO CV RỖNG (Quan trọng)
        // Nếu là Ứng viên, tạo sẵn 1 dòng trong bảng CVs nhưng để null các trường thông tin
        if (savedUser.getRole() == Role.USER) {
            CVEntity emptyProfile = new CVEntity();
            emptyProfile.setUser(savedUser);
            emptyProfile.setIsDefault(true);

            // Các trường fullName, phone, address... tự động là null
            // Sau này User vào trang "Hồ sơ" cập nhật sau

            cvRepository.save(emptyProfile);
        }

        return savedUser;
    }
}