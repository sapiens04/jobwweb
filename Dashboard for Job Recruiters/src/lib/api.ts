// Mock API service - Simulates backend API calls

export interface JobPosting {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  applications: number;
  status: 'active' | 'paused' | 'closed';
  posted: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  department: string;
  level: string;
  createdAt: string;
}

export interface Candidate {
  id: number;
  name: string;
  position: string;
  avatar: string;
  email: string;
  phone: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
  appliedDate: string;
  experience: string;
  education: string;
  location: string;
  jobId?: number;
  cvUrl?: string;
  coverLetter?: string;
}

export interface Interview {
  id: number;
  candidateId: number;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  private storageKey = 'recruitment_dashboard_data';

  private getStorageData() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data);
    }
    return {
      jobs: this.getDefaultJobs(),
      candidates: this.getDefaultCandidates(),
      interviews: this.getDefaultInterviews(),
    };
  }

  private saveStorageData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private getDefaultJobs(): JobPosting[] {
    return [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        location: 'Hà Nội',
        type: 'Full-time',
        salary: '25-35 triệu VNĐ',
        applications: 45,
        status: 'active',
        posted: '2 ngày trước',
        deadline: '15 ngày',
        description: 'Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm...',
        requirements: ['5+ năm kinh nghiệm React', 'Thành thạo TypeScript', 'Kinh nghiệm với Next.js'],
        benefits: ['Lương thưởng hấp dẫn', 'Bảo hiểm đầy đủ', 'Làm việc linh hoạt'],
        department: 'Engineering',
        level: 'Senior',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        title: 'Product Manager',
        location: 'TP. Hồ Chí Minh',
        type: 'Full-time',
        salary: '30-45 triệu VNĐ',
        applications: 67,
        status: 'active',
        posted: '5 ngày trước',
        deadline: '12 ngày',
        description: 'Vị trí Product Manager quản lý các sản phẩm công nghệ...',
        requirements: ['7+ năm kinh nghiệm', 'Kỹ năng phân tích tốt', 'Kỹ năng lãnh đạo'],
        benefits: ['Thưởng theo KPI', 'Du lịch hàng năm', 'Đào tạo nâng cao'],
        department: 'Product',
        level: 'Manager',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }

  private getDefaultCandidates(): Candidate[] {
    return [
      {
        id: 1,
        name: 'Trần Minh Khoa',
        position: 'Senior Frontend Developer',
        avatar: 'TMK',
        email: 'khoa.tran@email.com',
        phone: '0901234567',
        status: 'new',
        appliedDate: '2 giờ trước',
        experience: '5 năm',
        education: 'Đại học Bách Khoa',
        location: 'Hà Nội',
        jobId: 1,
      },
    ];
  }

  private getDefaultInterviews(): Interview[] {
    return [
      {
        id: 1,
        candidateId: 1,
        candidateName: 'Trần Minh Khoa',
        position: 'Senior Frontend Developer',
        date: '2024-12-18',
        time: '09:00',
        location: 'Phòng họp A - Tầng 5',
        type: 'offline',
        status: 'scheduled',
      },
    ];
  }

  // Jobs API
  async getJobs(): Promise<JobPosting[]> {
    await delay(300);
    const data = this.getStorageData();
    return data.jobs;
  }

  async getJobById(id: number): Promise<JobPosting | null> {
    await delay(200);
    const data = this.getStorageData();
    return data.jobs.find((job: JobPosting) => job.id === id) || null;
  }

  async createJob(job: Omit<JobPosting, 'id' | 'applications' | 'posted' | 'createdAt'>): Promise<JobPosting> {
    await delay(500);
    const data = this.getStorageData();
    const newJob: JobPosting = {
      ...job,
      id: Date.now(),
      applications: 0,
      posted: 'Vừa xong',
      createdAt: new Date().toISOString(),
    };
    data.jobs.unshift(newJob);
    this.saveStorageData(data);
    return newJob;
  }

  async updateJob(id: number, updates: Partial<JobPosting>): Promise<JobPosting> {
    await delay(400);
    const data = this.getStorageData();
    const index = data.jobs.findIndex((job: JobPosting) => job.id === id);
    if (index !== -1) {
      data.jobs[index] = { ...data.jobs[index], ...updates };
      this.saveStorageData(data);
      return data.jobs[index];
    }
    throw new Error('Job not found');
  }

  async deleteJob(id: number): Promise<void> {
    await delay(300);
    const data = this.getStorageData();
    data.jobs = data.jobs.filter((job: JobPosting) => job.id !== id);
    this.saveStorageData(data);
  }

  // Candidates API
  async getCandidates(): Promise<Candidate[]> {
    await delay(300);
    const data = this.getStorageData();
    return data.candidates;
  }

  async getCandidateById(id: number): Promise<Candidate | null> {
    await delay(200);
    const data = this.getStorageData();
    return data.candidates.find((c: Candidate) => c.id === id) || null;
  }

  async updateCandidateStatus(id: number, status: Candidate['status']): Promise<Candidate> {
    await delay(400);
    const data = this.getStorageData();
    const index = data.candidates.findIndex((c: Candidate) => c.id === id);
    if (index !== -1) {
      data.candidates[index].status = status;
      this.saveStorageData(data);
      return data.candidates[index];
    }
    throw new Error('Candidate not found');
  }

  // Interviews API
  async getInterviews(): Promise<Interview[]> {
    await delay(300);
    const data = this.getStorageData();
    return data.interviews;
  }

  async createInterview(interview: Omit<Interview, 'id'>): Promise<Interview> {
    await delay(500);
    const data = this.getStorageData();
    const newInterview: Interview = {
      ...interview,
      id: Date.now(),
    };
    data.interviews.push(newInterview);
    this.saveStorageData(data);
    return newInterview;
  }

  async updateInterview(id: number, updates: Partial<Interview>): Promise<Interview> {
    await delay(400);
    const data = this.getStorageData();
    const index = data.interviews.findIndex((i: Interview) => i.id === id);
    if (index !== -1) {
      data.interviews[index] = { ...data.interviews[index], ...updates };
      this.saveStorageData(data);
      return data.interviews[index];
    }
    throw new Error('Interview not found');
  }

  // Email/Notification API
  async sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean; message: string }> {
    await delay(800);
    console.log('Sending email:', { to, subject, body });
    return {
      success: true,
      message: 'Email sent successfully',
    };
  }

  async sendInterviewInvitation(
    candidateId: number,
    interviewDetails: Omit<Interview, 'id' | 'candidateId' | 'candidateName' | 'position' | 'status'>
  ): Promise<{ success: boolean; interview: Interview }> {
    await delay(800);
    const candidate = await this.getCandidateById(candidateId);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    const interview = await this.createInterview({
      candidateId,
      candidateName: candidate.name,
      position: candidate.position,
      status: 'scheduled',
      ...interviewDetails,
    });

    // Update candidate status
    await this.updateCandidateStatus(candidateId, 'interview');

    return {
      success: true,
      interview,
    };
  }
}

export const api = new ApiService();
