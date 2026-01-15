// // package com.apiweb.config;

// // import com.apiweb.repository.UserRepository;
// // import com.apiweb.repository.entity.UserEntity;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.authentication.AuthenticationManager;
// // import org.springframework.security.authentication.ProviderManager;
// // import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// // import org.springframework.security.config.Customizer;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// // import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// // import org.springframework.security.core.userdetails.User;
// // import org.springframework.security.core.userdetails.UserDetailsService; // Dùng của Spring, không dùng cái tự tạo
// // import org.springframework.security.core.userdetails.UsernameNotFoundException;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.security.web.SecurityFilterChain;
// // import org.springframework.web.cors.CorsConfiguration;
// // import org.springframework.web.cors.CorsConfigurationSource;
// // import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// // import java.util.Arrays;


// // @Configuration
// // @EnableWebSecurity
// // public class SecurityConfig {

// //     @Autowired
// //     private UserRepository userRepository;
    
// //     @Bean
// //     public UserDetailsService userDetailsService() {
// //         // Sửa tham số truyền vào thành username để khớp với logic tìm kiếm
// //         return username -> { 
// //             UserEntity user = userRepository.findByUsername(username)
// //                     .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user: " + username));

// //             return User.withUsername(user.getUsername())
// //                     .password(user.getPassword())
// //                     .roles(user.getRole().name()) // Đảm bảo role trong DB không có tiền tố "ROLE_"
// //                     .build();
// //         };
// //     }
    
// //     // @Bean
// //     // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// //     //     http
// //     //         // 1. Kích hoạt cấu hình CORS
// //     //         .cors(Customizer.withDefaults()) 
// //     //         .csrf(AbstractHttpConfigurer::disable)
// //     //         .authorizeHttpRequests(auth -> auth
// //     //             .requestMatchers("/api/auth/**").permitAll()
// //     //             .requestMatchers("/api/jobs/**").permitAll()
// //     //             .anyRequest().authenticated()
// //     //         )
// //     //         .httpBasic(Customizer.withDefaults());
// //     //     return http.build();
// //     // }

// //     @Bean
// // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// //     http
// //         .cors(Customizer.withDefaults()) 
// //         .csrf(AbstractHttpConfigurer::disable)
// //         .authorizeHttpRequests(auth -> auth
// //             // 1. CÁC LINK CÔNG KHAI (Mọi người đều xem được)
// //             .requestMatchers("/api/auth/**").permitAll()
            
// //             // SỬA DÒNG NÀY: Cho phép tất cả các API liên quan đến jobs mà không bắt đầu bằng my-jobs hoặc create
// //             // Hoặc đơn giản là mở cho /api/jobs/** nhưng liệt kê các cái cấm ở dưới
// //             .requestMatchers("/api/jobs").permitAll() 
// //             .requestMatchers("/api/jobs/public/**").permitAll()
            
// //             // Mở khóa cho Chatbot và Uploads
// //             .requestMatchers("/api/chat/**").permitAll()
// //             .requestMatchers("/uploads/**").permitAll()
            
// //             // Mở khóa cho tài nguyên tĩnh của React (Fix lỗi trắng trang/mất CSS)
// //             .requestMatchers("/", "/index.html", "/assets/**", "/*.css", "/*.js", "/favicon.ico").permitAll()

// //             // 2. CÁC LINK RIÊNG TƯ (Bắt buộc phải có Authorization Header)
// //             .requestMatchers("/api/jobs/my-jobs").authenticated() 
// //             .requestMatchers("/api/jobs/create").authenticated()
// //             .requestMatchers("/api/jobs/delete/**").authenticated()
// //             .requestMatchers("/api/applications/**").authenticated() // Ứng tuyển và xem ứng viên cần login
            
// //             // 3. Chốt chặn cuối cùng
// //             .anyRequest().authenticated()
// //         )
// //         .httpBasic(Customizer.withDefaults()); 
// //     return http.build();
// // }
// //     // 2. Định nghĩa cấu hình CORS chi tiết
// //     @Bean
// //     public CorsConfigurationSource corsConfigurationSource() {
// //         CorsConfiguration configuration = new CorsConfiguration();
// //         configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // URL của React/Vite
// //         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
// //         configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
// //         configuration.setAllowCredentials(true);
        
// //         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// //         source.registerCorsConfiguration("/**", configuration);
// //         return source;
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }

// //     @Bean
// //     public AuthenticationManager authenticationManager(
// //             UserDetailsService userDetailsService,
// //             PasswordEncoder passwordEncoder) {
// //         DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
// //         authProvider.setUserDetailsService(userDetailsService);
// //         authProvider.setPasswordEncoder(passwordEncoder);
// //         return new ProviderManager(authProvider);
// //     }
// // }

// package com.apiweb.config;

// import com.apiweb.repository.UserRepository;
// import com.apiweb.repository.entity.UserEntity;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.ProviderManager;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Autowired
//     private UserRepository userRepository;
    
//     @Bean
//     public UserDetailsService userDetailsService() {
//         return username -> { 
//             UserEntity user = userRepository.findByUsername(username)
//                     .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user: " + username));

//             return User.withUsername(user.getUsername())
//                     .password(user.getPassword())
//                     .roles(user.getRole().name())
//                     .build();
//         };
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(Customizer.withDefaults()) 
//             .csrf(AbstractHttpConfigurer::disable)
//             .authorizeHttpRequests(auth -> auth
//                 // 1. CÁC LINK CÔNG KHAI (Mọi người đều xem được, KHÔNG CẦN LOGIN)
//                 .requestMatchers("/api/auth/**").permitAll()
                
//                 // --- PHẦN QUAN TRỌNG NHẤT ĐỂ HIỆN TOP 6 JOBS ---
//                 .requestMatchers("/api/jobs").permitAll()          // Lấy tất cả job
//                 .requestMatchers("/api/jobs/featured").permitAll() // Lấy top 6 job (FEATURED)
//                 .requestMatchers("/api/jobs/public/**").permitAll()
//                 // ----------------------------------------------

//                 .requestMatchers("/api/chat/**").permitAll()
//                 .requestMatchers("/uploads/**").permitAll()
                
//                 // Tài nguyên tĩnh cho giao diện
//                 .requestMatchers("/", "/index.html", "/assets/**", "/**/*.css", "/**/*.js", "/favicon.ico").permitAll()

//                 // 2. CÁC LINK RIÊNG TƯ (BẮT BUỘC PHẢI ĐĂNG NHẬP)
//                 .requestMatchers("/api/jobs/my-jobs").authenticated() 
//                 .requestMatchers("/api/jobs/create").authenticated()
//                 .requestMatchers("/api/jobs/delete/**").authenticated()
//                 .requestMatchers("/api/applications/**").authenticated() 
                
//                 // 3. Tất cả các yêu cầu còn lại
//                 .anyRequest().authenticated()
//             )
//             .httpBasic(Customizer.withDefaults()); 
//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
//         configuration.setAllowCredentials(true);
        
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             UserDetailsService userDetailsService,
//             PasswordEncoder passwordEncoder) {
//         DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//         authProvider.setUserDetailsService(userDetailsService);
//         authProvider.setPasswordEncoder(passwordEncoder);
//         return new ProviderManager(authProvider);
//     }
// }


package com.apiweb.config;

import com.apiweb.repository.UserRepository;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;
    
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> { 
            UserEntity user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user: " + username));

            return User.withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole().name())
                    .build();
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) 
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                // 1. CÁC LINK CÔNG KHAI (KHÔNG CẦN LOGIN)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/jobs", "/api/jobs/featured", "/api/jobs/public/**").permitAll()
                .requestMatchers("/api/chat/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                
                // --- SỬA LỖI PatternParseException TẠI ĐÂY ---
                // Thay vì "/**/*.css", ta liệt kê các thư mục tĩnh từ gốc
                .requestMatchers("/", "/index.html", "/favicon.ico", "/assets/**").permitAll()
                // --------------------------------------------

                // 2. CÁC LINK RIÊNG TƯ (PHẢI LOGIN)
                .requestMatchers("/api/jobs/my-jobs", "/api/jobs/create", "/api/jobs/delete/**").authenticated()
                .requestMatchers("/api/applications/**").authenticated() 
                .requestMatchers("/api/stats/**").authenticated() // Thống kê dashboard cần login
                
                // 3. Chốt chặn cuối cùng
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); 
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authProvider);
    }
}
