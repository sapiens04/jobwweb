package com.apiweb.service.impl;

import com.apiweb.service.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    // Tên thư mục chứa file upload
    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

    // Constructor: Tạo thư mục uploads nếu chưa có
    public FileStorageServiceImpl() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Không thể tạo thư mục upload file.", ex);
        }
    }

    @Override
    public String storeFile(MultipartFile file) {
        try {
            // Lấy tên file gốc
            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null) {
                throw new RuntimeException("Tên file không hợp lệ");
            }

            // Tạo tên file mới duy nhất (tránh trùng tên)
            // Ví dụ: cv.pdf -> 550e8400-e29b-cv.pdf
            String newFileName = UUID.randomUUID().toString() + "-" + originalFileName;

            // Đường dẫn đích để lưu file
            Path targetLocation = this.fileStorageLocation.resolve(newFileName);

            // Copy file vào thư mục đích (ghi đè nếu có)
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Trả về tên file (hoặc đường dẫn đầy đủ nếu muốn)
            return newFileName;

        } catch (IOException ex) {
            throw new RuntimeException("Không thể lưu file " + file.getOriginalFilename() + ". Vui lòng thử lại!", ex);
        }
    }
}