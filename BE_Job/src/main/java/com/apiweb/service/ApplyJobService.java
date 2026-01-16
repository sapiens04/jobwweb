package com.apiweb.service;

import com.apiweb.enums.ApplyStatus;
import com.apiweb.repository.entity.ApplyJobEntity;
import com.apiweb.repository.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApplyJobService {

    ApplyJobEntity apply(Long jobId, MultipartFile file,String fullName, String phoneNumber, String note, UserEntity user);

    void updateStatus(Long applyId, ApplyStatus status);
}
