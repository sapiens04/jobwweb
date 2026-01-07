package com.apiweb.repository.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cvs")
public class CVEntity extends BaseEntity {

    // --- CÁC TRƯỜNG CHUYỂN TỪ USER SANG ---
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address; // Địa chỉ / Nơi làm việc mong muốn

    private String avatar;
    // ---------------------------------------

    // Các trường cũ của CV
    @Column(name = "file_name")
    private String fileName; // Tên file PDF (có thể null nếu mới tạo profile chưa up file)

    @Column(name = "file_url")
    private String fileUrl;  // Link file

    @Column(name = "is_default")
    private Boolean isDefault = true; // Mặc định cái đầu tiên là true

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // Getter & Setter đầy đủ...
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public Boolean getIsDefault() { return isDefault; }
    public void setIsDefault(Boolean isDefault) { this.isDefault = isDefault; }
    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }
}