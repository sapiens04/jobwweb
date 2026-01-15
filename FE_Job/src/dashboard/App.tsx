import { useState } from 'react';
import { DashboardStats } from './components/DashboardStats';
import { JobPostings } from './components/JobPostings';
import { RecentApplications } from './components/RecentApplications';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InterviewCalendar } from './components/InterviewCalendar';
import { CandidatesFilter, type FilterState } from './components/CandidatesFilter';
import { CreateJobModal } from './components/CreateJobModal';
import { DataProvider } from './contexts/DataContext';
import { ChatBot } from './components/ChatBot';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    position: 'all',
    status: 'all',
    experience: 'all',
    location: 'all',
  });
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <DataProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-gray-900 mb-2">Dashboard Tuyển Dụng</h1>
                  <p className="text-gray-600">Chào mừng trở lại! Đây là tổng quan về hoạt động tuyển dụng của bạn.</p>
                </div>
                
                <DashboardStats />
                
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <AnalyticsCharts />
                  </div>
                  <div>
                    <RecentApplications />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-gray-900 mb-2">Tin Tuyển Dụng</h1>
                    <p className="text-gray-600">Quản lý tất cả các tin tuyển dụng của bạn</p>
                  </div>
                </div>
                <JobPostings />
              </div>
            )}
            
            {activeTab === 'candidates' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-gray-900 mb-2">Ứng Viên</h1>
                  <p className="text-gray-600">Quản lý và đánh giá ứng viên</p>
                </div>
                <CandidatesFilter onFilterChange={handleFilterChange} />
                <RecentApplications showAll={true} filters={filters} />
              </div>
            )}
            
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-gray-900 mb-2">Lịch Phỏng Vấn</h1>
                  <p className="text-gray-600">Quản lý và theo dõi lịch phỏng vấn của bạn</p>
                </div>
                <InterviewCalendar />
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-gray-900 mb-2">Phân Tích & Báo Cáo</h1>
                  <p className="text-gray-600">Thống kê chi tiết về hiệu quả tuyển dụng</p>
                </div>
                <DashboardStats />
                <AnalyticsCharts />
              </div>
            )}
          </main>
        </div>
        
        <CreateJobModal isOpen={showCreateJobModal} onClose={() => setShowCreateJobModal(false)} />
        <ChatBot />
      </div>
    </DataProvider>
  );
}