package com.apiweb.config;

import com.apiweb.enums.Role;
import com.apiweb.repository.CVRepository; // 1. Nhớ import thêm Repository này
import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.CVEntity;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CVRepository cvRepository; // 2. Inject để lưu Profile cho Admin

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Kiểm tra xem đã có admin chưa
        if (!userRepository.existsByEmail("admin@gmail.com")) {

            // BƯỚC 1: TẠO TÀI KHOẢN LOGIN (Bảng users)
            UserEntity admin = new UserEntity();
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setRole(Role.ADMIN);
            // Lưu ý: Không set fullName, phoneNumber ở đây nữa vì đã xóa cột

            UserEntity savedAdmin = userRepository.save(admin);

            // BƯỚC 2: TẠO PROFILE (Bảng cvs) ĐỂ LƯU TÊN "Super Admin"
            CVEntity adminProfile = new CVEntity();
            adminProfile.setUser(savedAdmin);
            adminProfile.setFullName("Super Admin");
            adminProfile.setPhoneNumber("0999999999");
            adminProfile.setIsDefault(true);

            // Các trường khác để null
            adminProfile.setFileName(null);
            adminProfile.setFileUrl(null);

            cvRepository.save(adminProfile);

            System.out.println("✅ Đã tạo tài khoản ADMIN mẫu: admin@gmail.com / 123456");
        }
    }
}