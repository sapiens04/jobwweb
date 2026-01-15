package com.apiweb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apiweb.enums.Role;
import com.apiweb.model.RegisterDTO;
import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.UserEntity;
// import com.apiweb.repository.CVRepository; // 1. ẨN IMPORT
// import com.apiweb.repository.entity.CVEntity; // 2. ẨN IMPORT
import com.apiweb.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private CVRepository cvRepository; // 3. ẨN INJECT

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserEntity register(RegisterDTO request) {
        // 1. Check trùng username
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username này đã được sử dụng!");
        }

        // 2. Tạo User
        UserEntity newUser = new UserEntity();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        try {
            newUser.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } catch (Exception e) {
            newUser.setRole(Role.USER);
        }

        UserEntity savedUser = userRepository.save(newUser);

        // 3. TẠO CV RỖNG - ĐÃ ẨN
        /* if (savedUser.getRole() == Role.USER) {
            CVEntity emptyProfile = new CVEntity();
            emptyProfile.setUser(savedUser);
            emptyProfile.setIsDefault(true);
            cvRepository.save(emptyProfile);
        }
        */

        return savedUser;
    }

    @Override
    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng: " + username));
    }
}