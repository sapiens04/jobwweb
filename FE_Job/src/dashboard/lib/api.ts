export interface JobPosting {
  job_id: number;
  user_id: number;
  title: string;
  department: string;
  address: string;
  type_of_job: string;
  salary: string;
  description: string;
  requirement: string;
  benefit: string;
  company_name: string;
  status: 'CLOSED' | 'DRAFT' | 'EXPIRED' | 'PUBLISHED';
  deadline_apply: string;
  created_at: string;
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
  jobId: number;
  jobTitle: string;
  companyName: string;
  cvUrl: string;
  appliedDate: string;
}

const BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private getAuthHeader() {
    const authData = localStorage.getItem("authData");
    return authData ? { "Authorization": `Basic ${authData}` } : {};
  }

  // --- JOBS API ---
  async getJobs(): Promise<JobPosting[]> {
    const response = await fetch(`${BASE_URL}/jobs`, { headers: this.getAuthHeader() });
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  }
  // api.ts

async getInterviews(): Promise<Interview[]> {
  const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const username = savedUser.username;

  const response = await fetch(`${BASE_URL}/applications?username=${username}`, { 
    headers: this.getAuthHeader() 
  });
  
  if (!response.ok) throw new Error('Failed to fetch interviews');
  const data = await response.json();

  // Chỉ lấy những đơn ứng tuyển đã được điền thông tin phỏng vấn
  return data
    .filter((app: any) => app.interviewTime !== null)
    .map((app: any) => {
      const dateTime = new Date(app.interviewTime);
      return {
        id: app.id,
        candidateName: app.fullName || 'N/A',
        position: app.job?.title || 'Vị trí ẩn',
        // Tách ngày và giờ để phù hợp với giao diện Calendar
        date: dateTime.toISOString().split('T')[0], 
        time: dateTime.toTimeString().split(' ')[0].substring(0, 5),
        location: app.interviewLocation || 'Chưa xác định',
        type: (app.interviewLink || app.interviewLocation?.includes('http')) ? 'online' : 'offline',
        status: app.status === 'ACCEPTED' ? 'scheduled' : 'completed'
      };
    });
}
  // --- CANDIDATES API ---
  async getCandidates(): Promise<Candidate[]> {
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const username = savedUser.username;
  
    const response = await fetch(`${BASE_URL}/applications?username=${username}`, { 
      headers: this.getAuthHeader() 
    });
    
    if (!response.ok) throw new Error('Failed to fetch candidates');
    const data = await response.json();
  
    return data.map((app: any) => ({
      id: app.id,
      name: app.fullName || 'N/A',
      email: app.email,
      phone: app.phoneNumber,
      status: this.mapStatus(app.status),
      jobId: app.job?.job_id || app.job?.id,
      jobTitle: app.job?.title || 'Vị trí ẩn',
      companyName: app.job?.companyName || app.job?.company_name || 'Công ty ẩn',
      cvUrl: app.cvFile,
      appliedDate: app.createdAt || 'Mới đây'
    }));
  }

  // --- STATUS & EMAIL API ---

  // Hàm cập nhật trạng thái ứng viên (Dùng để chuyển sang ACCEPTED khi mời PV)
  async updateCandidateStatus(applicationId: number, status: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/applications/${applicationId}/status`, {
      method: 'PUT',
      headers: { 
        ...this.getAuthHeader(), 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ status: status }),
    });
    if (!response.ok) throw new Error('Failed to update status');
  }

  // Hàm gửi Email (Đã sửa lỗi "not a function")
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Nếu bạn chưa có Backend xử lý gửi mail, hàm này sẽ trả về success giả lập 
    // hoặc bạn trỏ tới endpoint gửi mail thật của bạn ở đây
    console.log(`Sending email to ${to}...`);
    
    // Giả sử endpoint là /notifications/send
    const response = await fetch(`${BASE_URL}/notifications/send`, {
      method: 'POST',
      headers: { ...this.getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body }),
    });
    
    if (!response.ok) {
        console.warn("Backend chưa hỗ trợ gửi mail thực tế, bỏ qua bước này.");
    }
  }

  // Hàm đặt lịch phỏng vấn
  // api.ts
  async sendInterviewInvitation(appId: number, details: any): Promise<void> {
    const response = await fetch(`${BASE_URL}/applications/${appId}/interview`, {
      method: 'POST',
      headers: { 
        ...this.getAuthHeader(), 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        // Chuyển đổi ngày và giờ thành định dạng LocalDateTime cho Java
        interviewTime: `${details.date}T${details.time}:00`, 
        location: details.location,
        link: details.location.includes('http') ? details.location : ''
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Không thể lưu lịch phỏng vấn');
    }
  }

  // Đảm bảo hàm cập nhật trạng thái cũng tồn tại
  // async updateCandidateStatus(applicationId: number, status: string): Promise<void> {
  //   const response = await fetch(`${BASE_URL}/applications/${applicationId}/status`, {
  //     method: 'PUT',
  //     headers: { ...this.getAuthHeader(), 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status }),
  //   });
  //   if (!response.ok) throw new Error('Cập nhật trạng thái thất bại');
  // }

  
async scheduleInterview(appId: number, details: any): Promise<void> {
  const response = await fetch(`${BASE_URL}/applications/${appId}/interview`, {
    method: 'POST',
    headers: { ...this.getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      interviewTime: `${details.date}T${details.time}:00`, // Format ISO cho LocalDateTime
      location: details.location,
      link: details.location.includes('http') ? details.location : ''
    }),
  });
  
  if (!response.ok) throw new Error('Không thể lưu lịch phỏng vấn');
}
  // --- HELPER ---
  // api.ts

private mapStatus(status: string): Candidate['status'] {
  switch (status) {
    case 'PENDING': return 'new';
    case 'REVIEWING': return 'reviewing';
    case 'ACCEPTED': return 'interview';    // ACCEPTED ở DB hiện là "hired" (màu xanh) ở giao diện
    case 'REJECTED': return 'rejected'; // REJECTED ở DB hiện là "rejected" (màu đỏ) ở giao diện
    default: return 'new';  
  }
}
}

export const api = new ApiService();