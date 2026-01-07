package com.apiweb.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    // Hàm nhận file upload và trả về đường dẫn file đã lưu
    String storeFile(MultipartFile file);
}