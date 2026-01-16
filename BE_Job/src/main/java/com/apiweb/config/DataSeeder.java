package com.apiweb.config;

// import com.apiweb.repository.CVRepository; // ĐÃ ẨN
import com.apiweb.repository.UserRepository;
// import com.apiweb.repository.entity.CVEntity; // ĐÃ ẨN
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
        
    }
}