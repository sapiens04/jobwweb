package com.apiweb.repository.entity;

import com.apiweb.enums.ApplyStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "apply_jobs")
public class ApplyJobEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private JobEntity job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_id")
    private CVEntity cv;

    @Enumerated(EnumType.STRING)
    private ApplyStatus status;

    @Column(columnDefinition = "TEXT")
    private String note;
    @Column(name = "interview_time")
    private LocalDateTime interviewTime; // Thời gian phỏng vấn

    @Column(name = "interview_location", length = 500)
    private String interviewLocation; // Địa điểm (Phòng họp / Tòa nhà)

    @Column(name = "interview_link", length = 500)
    private String interviewLink; // Link họp Online (Google Meet/Zoom)

    public JobEntity getJob() {
        return job;
    }

    public void setJob(JobEntity job) {
        this.job = job;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public CVEntity getCv() {
        return cv;
    }

    public void setCv(CVEntity cv) {
        this.cv = cv;
    }

    public ApplyStatus getStatus() {
        return status;
    }

    public void setStatus(ApplyStatus status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDateTime getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(LocalDateTime interviewTime) {
        this.interviewTime = interviewTime;
    }

    public String getInterviewLocation() {
        return interviewLocation;
    }

    public void setInterviewLocation(String interviewLocation) {
        this.interviewLocation = interviewLocation;
    }

    public String getInterviewLink() {
        return interviewLink;
    }

    public void setInterviewLink(String interviewLink) {
        this.interviewLink = interviewLink;
    }
}