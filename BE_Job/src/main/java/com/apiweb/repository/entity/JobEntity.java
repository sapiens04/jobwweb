package com.apiweb.repository.entity;

import com.apiweb.enums.JobStatus;
import com.apiweb.enums.JobType;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "jobs")
public class JobEntity extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(name = "company_name")
    private String companyName;

    private String salary;
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_job")
    private JobType typeOfJob;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String benefit;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String requirement;

    private String department;

    @Column(name = "deadline_apply")
    private LocalDate deadlineApply;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id")
    private UserEntity employer;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private List<ApplyJobEntity> applications;

    // Getters and Setters...
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

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

    public JobType getTypeOfJob() {
        return typeOfJob;
    }

    public void setTypeOfJob(JobType typeOfJob) {
        this.typeOfJob = typeOfJob;
    }

    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String benefit) {
        this.benefit = benefit;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getDeadlineApply() {
        return deadlineApply;
    }

    public void setDeadlineApply(LocalDate deadlineApply) {
        this.deadlineApply = deadlineApply;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public UserEntity getEmployer() {
        return employer;
    }

    public void setEmployer(UserEntity employer) {
        this.employer = employer;
    }

    public List<ApplyJobEntity> getApplications() {
        return applications;
    }

    public void setApplications(List<ApplyJobEntity> applications) {
        this.applications = applications;
    }
}