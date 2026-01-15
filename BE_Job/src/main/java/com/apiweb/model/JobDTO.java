package com.apiweb.model;


import java.time.LocalDate;
import java.util.List;

import lombok.Data;
@Data
public class JobDTO {

    // private Long id;
    // private String title;
    // private String companyName;     // Mới thêm
    // private String salary;
    // private String address ;
    // private String typeOfJob;       // FULL_TIME, PART_TIME... (Gửi dạng String)
    // private String description;

    // // --- THAY ĐỔI QUAN TRỌNG ---
    // // Frontend gửi lên mảng ["Yêu cầu 1", "Yêu cầu 2"]
    // // -> Backend hứng bằng String
    // private String requirements;

    // private String benefits;
    // // ---------------------------

    // private LocalDate deadlineApply; // Hạn nộp hồ sơ
    // private String status;           // DRAFT, PUBLISHED...
    private Long id;
    private String title;
    private String companyName;
    private String salary;
    private String address;
    private String typeOfJob;  // Để String để FE gửi lên (ví dụ: "FULL_TIME")
    private String status;     // "PUBLISHED", "CLOSED", v.v.
    private String deadlineApply; // Định dạng "yyyy-MM-dd"
    private String createdAt;
    
    // Các trường chi tiết để lưu tin mới
    private String description;
    private String requirement;
    private String benefit;
    private String department;

    // Giữ nguyên để không lỗi phần hiển thị cũ
    private List<ApplyJobDTO> applications;
    // --- GETTERS AND SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTypeOfJob() {
        return typeOfJob;
    }

    public void setTypeOfJob(String typeOfJob) {
        this.typeOfJob = typeOfJob;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String benefit) {
        this.benefit = benefit;
    }

    public String getDeadlineApply() {
        return deadlineApply;
    }

    public void setDeadlineApply(String deadlineApply) {
        this.deadlineApply = deadlineApply;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // public String getDepartment() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'getDepartment'");
    // }

    // public String getRequirement() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'getRequirement'");
    // }

    // public String getBenefit() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'getBenefit'");
    // }
}   
