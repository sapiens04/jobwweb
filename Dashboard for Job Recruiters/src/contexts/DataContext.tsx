import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, type JobPosting, type Candidate, type Interview } from '../lib/api';

interface DataContextType {
  jobs: JobPosting[];
  candidates: Candidate[];
  interviews: Interview[];
  loading: boolean;
  refreshJobs: () => Promise<void>;
  refreshCandidates: () => Promise<void>;
  refreshInterviews: () => Promise<void>;
  addJob: (job: Omit<JobPosting, 'id' | 'applications' | 'posted' | 'createdAt'>) => Promise<JobPosting>;
  updateJob: (id: number, updates: Partial<JobPosting>) => Promise<JobPosting>;
  deleteJob: (id: number) => Promise<void>;
  updateCandidateStatus: (id: number, status: Candidate['status']) => Promise<void>;
  sendEmail: (to: string, subject: string, body: string) => Promise<void>;
  scheduleInterview: (candidateId: number, details: Omit<Interview, 'id' | 'candidateId' | 'candidateName' | 'position' | 'status'>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshJobs = async () => {
    try {
      const data = await api.getJobs();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const refreshCandidates = async () => {
    try {
      const data = await api.getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };

  const refreshInterviews = async () => {
    try {
      const data = await api.getInterviews();
      setInterviews(data);
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([refreshJobs(), refreshCandidates(), refreshInterviews()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const addJob = async (job: Omit<JobPosting, 'id' | 'applications' | 'posted' | 'createdAt'>) => {
    const newJob = await api.createJob(job);
    await refreshJobs();
    return newJob;
  };

  const updateJob = async (id: number, updates: Partial<JobPosting>) => {
    const updatedJob = await api.updateJob(id, updates);
    await refreshJobs();
    return updatedJob;
  };

  const deleteJob = async (id: number) => {
    await api.deleteJob(id);
    await refreshJobs();
  };

  const updateCandidateStatus = async (id: number, status: Candidate['status']) => {
    await api.updateCandidateStatus(id, status);
    await refreshCandidates();
  };

  const sendEmail = async (to: string, subject: string, body: string) => {
    await api.sendEmail(to, subject, body);
  };

  const scheduleInterview = async (
    candidateId: number,
    details: Omit<Interview, 'id' | 'candidateId' | 'candidateName' | 'position' | 'status'>
  ) => {
    await api.sendInterviewInvitation(candidateId, details);
    await refreshCandidates();
    await refreshInterviews();
  };

  return (
    <DataContext.Provider
      value={{
        jobs,
        candidates,
        interviews,
        loading,
        refreshJobs,
        refreshCandidates,
        refreshInterviews,
        addJob,
        updateJob,
        deleteJob,
        updateCandidateStatus,
        sendEmail,
        scheduleInterview,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
