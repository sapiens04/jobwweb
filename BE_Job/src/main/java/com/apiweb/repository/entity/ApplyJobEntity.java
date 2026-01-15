// // // package com.apiweb.repository.entity;

// // // import com.apiweb.enums.ApplyStatus;
// // // import jakarta.persistence.*;
// // // import java.time.LocalDateTime;

// // // @Entity
// // // @Table(name = "apply_jobs")
// // // public class ApplyJobEntity extends Base    \Entity {

// // //     @ManyToOne(fetch = FetchType.LAZY)
// // //     @JoinColumn(name = "job_id")
// // //     private JobEntity job;

// // //     @ManyToOne(fetch = FetchType.LAZY)
// // //     @JoinColumn(name = "candidate_id")
// // //     private UserEntity user;

// // //     // --- ẨN ĐOẠN NÀY ---
// // //     // @ManyToOne(fetch = FetchType.LAZY)
// // //     // @JoinColumn(name = "cv_id")
// // //     // private CVEntity cv; 
// // //     // ------------------

// // //     @Enumerated(EnumType.STRING)
// // //     private ApplyStatus status;

// // //     @Column(columnDefinition = "TEXT")
// // //     private String note;
    
// // //     @Column(name = "interview_time")
// // //     private LocalDateTime interviewTime;

// // //     @Column(name = "interview_location", length = 500)
// // //     private String interviewLocation;

// // //     @Column(name = "interview_link", length = 500)
// // //     private String interviewLink;

// // //     // Getters and Setters
// // //     public JobEntity getJob() { return job; }
// // //     public void setJob(JobEntity job) { this.job = job; }

// // //     public UserEntity getUser() { return user; }
// // //     public void setUser(UserEntity user) { this.user = user; }

// // //     // --- ẨN GETTER/SETTER CỦA CV ---
// // //     /*
// // //     public CVEntity getCv() {
// // //         return cv;
// // //     }

// // //     public void setCv(CVEntity cv) {
// // //         this.cv = cv;
// // //     }
// // //     */
// // //     // ------------------------------

// // //     public ApplyStatus getStatus() { return status; }
// // //     public void setStatus(ApplyStatus status) { this.status = status; }

// // //     public String getNote() { return note; }
// // //     public void setNote(String note) { this.note = note; }

// // //     public LocalDateTime getInterviewTime() { return interviewTime; }
// // //     public void setInterviewTime(LocalDateTime interviewTime) { this.interviewTime = interviewTime; }

// // //     public String getInterviewLocation() { return interviewLocation; }
// // //     public void setInterviewLocation(String interviewLocation) { this.interviewLocation = interviewLocation; }

// // //     public String getInterviewLink() { return interviewLink; }
// // //     public void setInterviewLink(String interviewLink) { this.interviewLink = interviewLink; }
// // // }


// // package com.apiweb.repository.entity;

// // import com.apiweb.enums.ApplyStatus;
// // import jakarta.persistence.*;
// // import java.time.LocalDateTime;

// // @Entity
// // @Table(name = "apply_jobs")
// // @AttributeOverride(name = "id", column = @Column(name = "apply_id"))
// // // Nếu BaseEntity của bạn có ID rồi thì giữ nguyên, 
// // // nhưng nếu nó báo "has no identifier" thì ta nên thêm ID trực tiếp ở đây.
// // public class ApplyJobEntity extends BaseEntity {

// //     @ManyToOne(fetch = FetchType.LAZY)
// //     @JoinColumn(name = "job_id", referencedColumnName = "job_id") 
// //     private JobEntity job;

// //     @ManyToOne(fetch = FetchType.LAZY)
// //     @JoinColumn(name = "candidate_id")
// //     private UserEntity user;

// //     @Enumerated(EnumType.STRING)
// //     private ApplyStatus status;

// //     @Column(columnDefinition = "TEXT")
// //     private String note;
    
// //     @Column(name = "interview_time")
// //     private LocalDateTime interviewTime;

// //     @Column(name = "interview_location", length = 500)
// //     private String interviewLocation;

// //     @Column(name = "interview_link", length = 500)
// //     private String interviewLink;

// //     // --- Getters and Setters ---
// //     public Long getId() { return id; }
// //     public void setId(Long id) { this.id = id; }

// //     public JobEntity getJob() { return job; }
// //     public void setJob(JobEntity job) { this.job = job; }

// //     public UserEntity getUser() { return user; }
// //     public void setUser(UserEntity user) { this.user = user; }

// //     public ApplyStatus getStatus() { return status; }
// //     public void setStatus(ApplyStatus status) { this.status = status; }

// //     public String getNote() { return note; }
// //     public void setNote(String note) { this.note = note; }

// //     public LocalDateTime getInterviewTime() { return interviewTime; }
// //     public void setInterviewTime(LocalDateTime interviewTime) { this.interviewTime = interviewTime; }

// //     public String getInterviewLocation() { return interviewLocation; }
// //     public void setInterviewLocation(String interviewLocation) { this.interviewLocation = interviewLocation; }

// //     public String getInterviewLink() { return interviewLink; }
// //     public void setInterviewLink(String interviewLink) { this.interviewLink = interviewLink; }
// // }

// package com.apiweb.repository.entity;

// import com.apiweb.enums.ApplyStatus;
// import com.fasterxml.jackson.annotation.JsonIgnore;
// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "apply_jobs")
// @AttributeOverride(name = "id", column = @Column(name = "apply_id"))
// public class ApplyJobEntity extends BaseEntity {

//     @JsonIgnore
//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "job_id", referencedColumnName = "job_id") 
//     private JobEntity job;

//     @JsonIgnore
//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "user_id") // Sử dụng cột user_id làm ID ứng viên như bạn yêu cầu
//     private UserEntity user;

//     @Enumerated(EnumType.STRING)
//     private ApplyStatus status;

//     @Column(columnDefinition = "TEXT")
//     private String note;
    
//     @Column(name = "interview_time")
//     private LocalDateTime interviewTime;

//     @Column(name = "interview_location", length = 500)
//     private String interviewLocation;

//     @Column(name = "interview_link", length = 500)
//     private String interviewLink;

//     // --- Getters and Setters Đầy Đủ ---

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public JobEntity getJob() {
//         return job;
//     }

//     public void setJob(JobEntity job) {
//         this.job = job;
//     }

//     public UserEntity getUser() {
//         return user;
//     }

//     public void setUser(UserEntity user) {
//         this.user = user;
//     }

//     public ApplyStatus getStatus() {
//         return status;
//     }

//     public void setStatus(ApplyStatus status) {
//         this.status = status;
//     }

//     public String getNote() {
//         return note;
//     }

//     public void setNote(String note) {
//         this.note = note;
//     }

//     public LocalDateTime getInterviewTime() {
//         return interviewTime;
//     }

//     public void setInterviewTime(LocalDateTime interviewTime) {
//         this.interviewTime = interviewTime;
//     }

//     public String getInterviewLocation() {
//         return interviewLocation;
//     }

//     public void setInterviewLocation(String interviewLocation) {
//         this.interviewLocation = interviewLocation;
//     }

//     public String getInterviewLink() {
//         return interviewLink;
//     }

//     public void setInterviewLink(String interviewLink) {
//         this.interviewLink = interviewLink;
//     }
// }


package com.apiweb.repository.entity;

import com.apiweb.enums.ApplyStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "apply_jobs") // Đổi tên bảng thành applications theo ý bạn
@AttributeOverride(name = "id", column = @Column(name = "apply_id"))
public class ApplyJobEntity extends BaseEntity {

    @JsonIgnoreProperties({"applications", "user"}) // Cho phép gửi thông tin Job nhưng bỏ qua các trường gây lặp
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id", referencedColumnName = "job_id") 
    private JobEntity job;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // ID ứng viên
    private UserEntity user;

    @Column(name = "full_name", length = 30) // Khớp với varchar(30) trong ảnh
    private String fullName;

    // Thêm vào ApplyJobEntity.java
    @Column(name = "cv_file")
    private String cvFile; 


    @Column(name = "email", length = 30) // Khớp với varchar(30) trong ảnh
    private String email;

    @Column(name = "phone_number", length = 10) // Khớp với varchar(10) trong ảnh
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private ApplyStatus status = ApplyStatus.PENDING; // Mặc định là PENDING

    @Column(columnDefinition = "TEXT")
    private String note;
    
    @Column(name = "interview_time")
    private LocalDateTime interviewTime;

    @Column(name = "interview_location", length = 500)
    private String interviewLocation;

    @Column(name = "interview_link", length = 500)
    private String interviewLink;

    // --- Getters and Setters ---

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public JobEntity getJob() { return job; }
    public void setJob(JobEntity job) { this.job = job; }

    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }

    public ApplyStatus getStatus() { return status; }
    public void setStatus(ApplyStatus status) { this.status = status; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDateTime getInterviewTime() { return interviewTime; }
    public void setInterviewTime(LocalDateTime interviewTime) { this.interviewTime = interviewTime; }

    public String getInterviewLocation() { return interviewLocation; }
    public void setInterviewLocation(String interviewLocation) { this.interviewLocation = interviewLocation; }

    public String getInterviewLink() { return interviewLink; }
    public void setInterviewLink(String interviewLink) { this.interviewLink = interviewLink; }

    public String getCvFile() { return cvFile; }
    public void setCvFile(String cvFile) { this.cvFile = cvFile; }
}