package com.apiweb.controller;

import com.apiweb.model.LoginDTO;
import com.apiweb.model.RegisterDTO;
import com.apiweb.repository.entity.UserEntity;
import com.apiweb.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Inject thêm AuthenticationManager (đã tạo Bean bên SecurityConfig)
    @Autowired
    private AuthenticationManager authenticationManager;

    // API ĐĂNG KÝ
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
        try {
            UserEntity registeredUser = authService.register(registerDTO);
            return ResponseEntity.ok("Đăng ký thành công tài khoản: " + registeredUser.getEmail());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API ĐĂNG NHẬP (MỚI THÊM)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            // 1. Tạo đối tượng xác thực từ Email/Pass gửi lên
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());

            // 2. Nhờ AuthenticationManager kiểm tra (nó sẽ gọi UserDetailsService và so khớp Pass)
            Authentication authentication = authenticationManager.authenticate(token);

            // 3. Nếu đúng, lưu thông tin vào SecurityContext (Tạo session đăng nhập)
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok("Đăng nhập thành công! Chào mừng " + authentication.getName());

        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("Sai email hoặc mật khẩu!");
        }
    }
}