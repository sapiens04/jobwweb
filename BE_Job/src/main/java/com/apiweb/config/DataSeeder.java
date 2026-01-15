package com.apiweb.config;

import com.apiweb.enums.Role;
// import com.apiweb.repository.CVRepository; // ĐÃ ẨN
import com.apiweb.repository.UserRepository;
// import com.apiweb.repository.entity.CVEntity; // ĐÃ ẨN
import com.apiweb.repository.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private CVRepository cvRepository; // ĐÃ ẨN

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Kiểm tra xem đã có admin chưa
        if (!userRepository.existsByUsername("admin@gmail.com")) {

            // BƯỚC 1: TẠO TÀI KHOẢN LOGIN (Bảng users)
            UserEntity admin = new UserEntity();
            admin.setUsername("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setRole(Role.ADMIN);

            UserEntity savedAdmin = userRepository.save(admin);

            /* --- BƯỚC 2: TẠO PROFILE (Bảng cvs) - ĐÃ ẨN TOÀN BỘ VÌ KHÔNG DÙNG CVEntity ---
            CVEntity adminProfile = new CVEntity();
            adminProfile.setUser(savedAdmin);
            adminProfile.setFullName("Super Admin");
            adminProfile.setPhoneNumber("0999999999");
            adminProfile.setIsDefault(true);
            adminProfile.setFileName(null);
            adminProfile.setFileUrl(null);

            cvRepository.save(adminProfile);
            -------------------------------------------------------------------------- */

            System.out.println("✅ Đã tạo tài khoản ADMIN mẫu: admin@gmail.com / 123456 (Không kèm Profile CV)");
        }
    }
}