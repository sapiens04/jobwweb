package com.apiweb.service;

import com.apiweb.repository.entity.CVEntity;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CVService {

    CVEntity upload(MultipartFile file, UserEntity user);

    List<CVEntity> getByUser(Long userId);
    CVEntity updateProfile(Long userId, CVEntity updatedInfo);
}
