package com.apiweb.model;


import java.time.LocalDate;
import java.util.List;

public class JobDTO {

    private Long id;
    private String title;
    private String companyName;     // Mới thêm
    private String salary;
    private String location;
    private String typeOfJob;       // FULL_TIME, PART_TIME... (Gửi dạng String)
    private String description;

    // --- THAY ĐỔI QUAN TRỌNG ---
    // Frontend gửi lên mảng ["Yêu cầu 1", "Yêu cầu 2"]
    // -> Backend hứng bằng List<String>
    private List<String> requirements;

    private List<String> benefits;
    // ---------------------------

    private LocalDate deadlineApply; // Hạn nộp hồ sơ
    private String status;           // DRAFT, PUBLISHED...

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public List<String> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<String> requirements) {
        this.requirements = requirements;
    }

    public List<String> getBenefits() {
        return benefits;
    }

    public void setBenefits(List<String> benefits) {
        this.benefits = benefits;
    }

    public LocalDate getDeadlineApply() {
        return deadlineApply;
    }

    public void setDeadlineApply(LocalDate deadlineApply) {
        this.deadlineApply = deadlineApply;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
