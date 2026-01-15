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
import java.util.Map;
import java.util.HashMap;

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
            return ResponseEntity.ok("Đăng ký thành công tài khoản: " + registeredUser.getUsername());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API ĐĂNG NHẬP
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
    try {
        // 1. Tạo đối tượng xác thực từ Username/Pass gửi lên
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);


        UserEntity user = authService.findByUsername(loginDTO.getUsername());
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("username", user.getUsername());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }
    catch (AuthenticationException e) {
    // Trả về lỗi định dạng JSON đồng nhất
    Map<String, String> error = new HashMap<>();
    error.put("status", "error");
    error.put("message", "Sai tên đăng nhập hoặc mật khẩu!");
    return ResponseEntity.badRequest().body(error);
}
}
}