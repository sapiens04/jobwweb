import { Mail, Phone, FileText, CheckCircle, XCircle, Clock, Send, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { EmailModal } from './EmailModal';
import type { FilterState } from './CandidatesFilter';
import { useData } from '../contexts/DataContext';

interface RecentApplicationsProps {
  showAll?: boolean;
  filters?: FilterState;
}

export function RecentApplications({ showAll = false, filters }: RecentApplicationsProps) {
  const { candidates } = useData();
  const [emailModal, setEmailModal] = useState<{ isOpen: boolean; candidate: any; type: 'email' | 'interview' }>({
    isOpen: false,
    candidate: null,
    type: 'email',
  });

  // Apply filters
  let filteredApplications = candidates;
  
  if (filters) {
    filteredApplications = candidates.filter(app => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          app.name.toLowerCase().includes(searchLower) ||
          app.email.toLowerCase().includes(searchLower) ||
          app.position.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status !== 'all' && app.status !== filters.status) {
        return false;
      }

      // Position filter
      if (filters.position !== 'all') {
        const positionMap: Record<string, string> = {
          'frontend': 'Frontend Developer',
          'backend': 'Backend Developer',
          'designer': 'Designer',
          'product': 'Product Manager',
          'marketing': 'Marketing Manager',
        };
        if (!app.position.includes(positionMap[filters.position] || '')) {
          return false;
        }
      }

      // Experience filter
      if (filters.experience !== 'all') {
        const years = parseInt(app.experience);
        switch (filters.experience) {
          case '0-2':
            if (years > 2) return false;
            break;
          case '2-5':
            if (years < 2 || years > 5) return false;
            break;
          case '5-10':
            if (years < 5 || years > 10) return false;
            break;
          case '10+':
            if (years < 10) return false;
            break;
        }
      }

      return true;
    });
  }

  const displayApplications = showAll ? filteredApplications : filteredApplications.slice(0, 5);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
        return { label: 'Mới', color: 'bg-blue-100 text-blue-700', icon: Clock };
      case 'reviewing':
        return { label: 'Đang xem xét', color: 'bg-yellow-100 text-yellow-700', icon: Clock };
      case 'shortlisted':
        return { label: 'Đạt vòng 1', color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'rejected':
        return { label: 'Từ chối', color: 'bg-red-100 text-red-700', icon: XCircle };
      default:
        return { label: 'Mới', color: 'bg-gray-100 text-gray-700', icon: Clock };
    }
  };

  const openEmailModal = (candidate: any, type: 'email' | 'interview') => {
    setEmailModal({
      isOpen: true,
      candidate: {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        position: candidate.position,
      },
      type,
    });
  };

  if (showAll) {
    return (
      <div className="grid gap-6">
        {displayApplications.map((app) => {
          const statusConfig = getStatusConfig(app.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <span>{app.avatar}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 mb-1">{app.name}</h3>
                      <p className="text-gray-600">{app.position}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{app.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{app.phone}</span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      <span className="text-gray-900">Kinh nghiệm:</span> {app.experience}
                    </div>
                    <div className="text-gray-600 text-sm">
                      <span className="text-gray-900">Học vấn:</span> {app.education}
                    </div>
                    <div className="text-gray-600 text-sm">
                      <span className="text-gray-900">Vị trí:</span> {app.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-gray-500 text-sm">Ứng tuyển {app.appliedDate}</span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Xem CV
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => openEmailModal(app, 'email')}>
                        Liên hệ
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={() => openEmailModal(app, 'interview')}>
                        Đặt lịch phỏng vấn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <EmailModal
          isOpen={emailModal.isOpen}
          onClose={() => setEmailModal({ ...emailModal, isOpen: false })}
          candidate={emailModal.candidate}
          type={emailModal.type}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-gray-900">Ứng Viên Mới Nhất</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {displayApplications.map((app) => {
          const statusConfig = getStatusConfig(app.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-sm">{app.avatar}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 mb-1">{app.name}</div>
                  <div className="text-gray-600 text-sm truncate">{app.position}</div>
                  <div className="text-gray-500 text-sm mt-1">{app.appliedDate}</div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 whitespace-nowrap ${statusConfig.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-center text-blue-600 hover:text-blue-700">
          Xem tất cả ứng viên
        </button>
      </div>

      <EmailModal
        isOpen={emailModal.isOpen}
        onClose={() => setEmailModal({ ...emailModal, isOpen: false })}
        candidate={emailModal.candidate}
        type={emailModal.type}
      />
    </div>
  );
}