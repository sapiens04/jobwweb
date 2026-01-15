// package com.apiweb.service.impl;

// import com.apiweb.repository.CVRepository;
// import com.apiweb.repository.entity.CVEntity;
// import com.apiweb.repository.entity.UserEntity;
// import com.apiweb.service.CVService;
// import com.apiweb.utils.FileStorageService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.util.List;

// @Service
// public class CVServiceImpl implements CVService {

//     @Autowired
//     private FileStorageService fileService;

//     @Autowired
//     private CVRepository cvRepository;

//     @Override
//     public CVEntity upload(MultipartFile file, UserEntity user) {
//         String name = fileService.store(file);

//         CVEntity cv = new CVEntity();
//         cv.setFileName(name);
//         cv.setFileUrl("/files/" + name);
//         cv.setUser(user);

//         return cvRepository.save(cv);
//     }

//     // 🔥 BẮT BUỘC PHẢI CÓ
//     @Override
//     public List<CVEntity> getByUser(Long userId) {
//         return cvRepository.findByUserId(userId);
//     }

//     @Override
//     public CVEntity updateProfile(Long userId, CVEntity updatedInfo) {

//         // 1. Tìm hồ sơ mặc định của User

//         // Nếu chưa có (trường hợp hy hữu lỗi data), có thể tự tạo mới hoặc báo lỗi
//         // Dùng .orElseThrow() để tự động ném lỗi nếu không tìm thấy (thay thế luôn đoạn if null bên dưới)
//         CVEntity myCV = cvRepository.findByUserIdAndIsDefaultTrue(userId)
//                 .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ cá nhân của bạn! Hãy liên hệ Admin."));

//         // 2. Chỉ cập nhật các trường thông tin cá nhân
//         // (Không đụng đến các trường file_url hay file_name)
//         if (updatedInfo.getFullName() != null) {
//             myCV.setFullName(updatedInfo.getFullName());
//         }

//         if (updatedInfo.getPhoneNumber() != null) {
//             myCV.setPhoneNumber(updatedInfo.getPhoneNumber());
//         }

//         if (updatedInfo.getAddress() != null) {
//             myCV.setAddress(updatedInfo.getAddress());
//         }

//         // 3. Lưu xuống DB
//         return cvRepository.save(myCV);
//     }
// }
