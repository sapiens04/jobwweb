// import { Mail, Phone, FileText, CheckCircle, XCircle, Clock, Building2, ExternalLink } from 'lucide-react';
// import { useState } from 'react';
// import { EmailModal } from './EmailModal';
// import type { FilterState } from './CandidatesFilter';
// import { useData } from '../contexts/DataContext';

// interface RecentApplicationsProps {
//   showAll?: boolean;
//   filters?: FilterState;
// }

// // export function RecentApplications({ showAll = false, filters }: RecentApplicationsProps) {
// //   const { candidates } = useData();
// //   const [emailModal, setEmailModal] = useState<{ isOpen: boolean; candidate: any; type: 'email' | 'interview' }>({
// //     isOpen: false,
// //     candidate: null,
// //     type: 'email',
// //   });

// export function RecentApplications({ showAll = false, filters }: RecentApplicationsProps) {
//   const { candidates } = useData();
//   const [emailModal, setEmailModal] = useState<{ isOpen: boolean; candidate: any; type: 'email' | 'interview' }>({
//     isOpen: false,
//     candidate: null,
//     type: 'email',
//   });

//   // Logic lọc dữ liệu dựa trên danh sách đã có đầy đủ thông tin Job từ api.ts
//   let filteredApplications = [...(candidates || [])];
  
//   if (filters) {
//     filteredApplications = filteredApplications.filter(app => {
//       const searchLower = (filters.search || '').toLowerCase();
//       const matchesSearch = 
//         (app.name || '').toLowerCase().includes(searchLower) ||
//         (app.jobTitle || '').toLowerCase().includes(searchLower);
      
//       const matchesStatus = filters.status === 'all' || app.status === filters.status;
//       return matchesSearch && matchesStatus;
//     });
//   }

//   const displayApplications = showAll ? filteredApplications : filteredApplications.slice(0, 5);

// // RecentApplications.tsx

// const getStatusConfig = (status: string) => {
//   const s = status?.toUpperCase(); 

//   switch (s) {
//     case 'PENDING': 
//       return { label: 'Mới', color: 'bg-blue-100 text-blue-700', icon: Clock };
      
//     case 'REVIEWING': 
//       return { label: 'Đang xét/Thêm thông tin', color: 'bg-yellow-100 text-yellow-700', icon: Clock };
      
//     case 'ACCEPTED':
//       // ACCEPTED giờ đây đại diện cho việc Đã mời phỏng vấn
//       return { label: 'Đã mời phỏng vấn', color: 'bg-indigo-100 text-indigo-700', icon: Calendar };

//     case 'REJECTED': 
//       return { label: 'Từ chối', color: 'bg-red-100 text-red-700', icon: XCircle };
      
//     default: 
//       return { label: 'Mới', color: 'bg-gray-100 text-gray-700', icon: Clock };
//   }
// };

//   const openEmailModal = (candidate: any, type: 'email' | 'interview') => {
//     setEmailModal({
//       isOpen: true,
//       candidate: {
//         id: candidate.id,
//         name: candidate.name || 'N/A',
//         email: candidate.email || '',
//         position: candidate.jobTitle,
//       },
//       type,
//     });
//   };

//   // --- GIAO DIỆN TRANG CHI TIẾT (Full Page) ---
//   if (showAll) {
//     return (
//       <div className="grid gap-6">
//         {displayApplications.length === 0 ? (
//           <div className="bg-white p-12 text-center rounded-xl border border-dashed text-gray-400">
//             Không có ứng viên nào phù hợp.
//           </div>
//         ) : (
//           displayApplications.map((app) => {
//             const statusConfig = getStatusConfig(app.status);
//             const StatusIcon = statusConfig.icon;
            
//             return (
//               <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
//                 <div className="flex items-start gap-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
//                     <span>{app.name ? app.name.charAt(0).toUpperCase() : '?'}</span>
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-2">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-1">{app.name}</h3>
//                         <div className="space-y-1">
//                           <p className="text-blue-600 font-semibold flex items-center gap-1.5 text-sm">
//                             <FileText className="w-4 h-4" /> {app.jobTitle}
//                           </p>
//                           <p className="text-gray-500 text-sm flex items-center gap-1.5">
//                             <Building2 className="w-4 h-4" /> {app.companyName}
//                           </p>
//                         </div>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${statusConfig.color}`}>
//                         <StatusIcon className="w-4 h-4" /> {statusConfig.label}
//                       </span>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4 mt-4 mb-4 bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
//                       <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {app.email}</div>
//                       <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {app.phone}</div>
//                     </div>
                    
//                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                       <span className="text-gray-400 text-xs italic">Ngày nộp: {app.appliedDate}</span>
//                       <div className="flex gap-2">
//                         {/* MỞ CV Ở TAB MỚI: Dùng target="_blank" và bỏ thuộc tính download */}
//                         <a 
//                           href={`http://localhost:8080/uploads/cvs/${app.cvUrl}`} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-100 flex items-center gap-2 transition-colors"
//                         >
//                           <ExternalLink className="w-4 h-4" /> Xem CV
//                         </a>
//                         <button 
//                           onClick={() => openEmailModal(app, 'email')} 
//                           className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
//                         >
//                           Liên hệ
//                         </button>
//                         <button 
//                           onClick={() => openEmailModal(app, 'interview')} 
//                           className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm"
//                         >
//                           Phỏng vấn
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })
//         )}
//         <EmailModal
//           isOpen={emailModal.isOpen}
//           onClose={() => setEmailModal({ ...emailModal, isOpen: false })}
//           candidate={emailModal.candidate}
//           type={emailModal.type}
//         />
//       </div>
//     );
//   }

//   // --- GIAO DIỆN WIDGET (Dashboard) ---
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-gray-900 font-bold">Ứng Viên Mới Nhất</h2>
//       </div>
//       <div className="divide-y divide-gray-100">
//         {displayApplications.length > 0 ? (
//           displayApplications.map((app) => {
//             const statusConfig = getStatusConfig(app.status);
//             return (
//               <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
//                     <span>{app.name ? app.name.charAt(0).toUpperCase() : '?'}</span>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="text-gray-900 font-bold text-sm truncate">{app.name || 'Ẩn danh'}</div>
//                     <div className="text-blue-600 text-[11px] font-bold truncate">{app.jobTitle}</div>
//                     <div className="text-gray-400 text-[10px] truncate">{app.companyName}</div>
//                   </div>
//                   <span className={`px-2 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${statusConfig.color}`}>
//                     {statusConfig.label}
//                   </span>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="p-8 text-center text-gray-400 text-sm">Chưa có ứng viên mới.</div>
//         )}
//       </div>
//     </div>
//   );
// }

import { Mail, Phone, FileText, CheckCircle, XCircle, Clock, Building2, ExternalLink, Calendar } from 'lucide-react';
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

  // 1. Logic lọc dữ liệu
  let filteredApplications = [...(candidates || [])];
  
  if (filters) {
    filteredApplications = filteredApplications.filter(app => {
      const searchLower = (filters.search || '').toLowerCase();
      const matchesSearch = 
        (app.name || '').toLowerCase().includes(searchLower) ||
        (app.jobTitle || '').toLowerCase().includes(searchLower);
      
      const matchesStatus = filters.status === 'all' || app.status === filters.status;
      return matchesSearch && matchesStatus;
    });
  }

  const displayApplications = showAll ? filteredApplications : filteredApplications.slice(0, 5);

  // 2. Hàm định dạng trạng thái (Đã sửa logic trỏ đúng 4 cái bạn cần)
  const getStatusConfig = (status: string) => {
    const s = status?.toUpperCase(); 

    switch (s) {
      case 'PENDING': 
      case 'NEW': 
        return { label: 'Mới', color: 'bg-gray-100 text-gray-700', icon: Clock };
        
      case 'REVIEWING': 
        return { label: 'Đang xét/Thêm thông tin', color: 'bg-yellow-100 text-yellow-700', icon: Clock };
        
      case 'INTERVIEW':
        // Khi gửi mẫu Mời phỏng vấn -> DB lưu ACCEPTED -> Hiện màu Indigo (Tím xanh)
        return { label: 'Đã mời phỏng vấn', color: 'bg-green-100 text-green-700', icon: Calendar };

      case 'REJECTED': 
        return { label: 'Từ chối', color: 'bg-red-100 text-red-700', icon: XCircle };
        
      case 'HIRED':
        return { label: 'Đã tuyển', color: 'bg-green-100 text-green-700', icon: CheckCircle };

      default: 
        return { label: 'Mới', color: 'bg-gray-100 text-gray-600', icon: Clock };
    }
  };

  const openEmailModal = (candidate: any, type: 'email' | 'interview') => {
    setEmailModal({
      isOpen: true,
      candidate: {
        id: candidate.id,
        name: candidate.name || 'N/A',
        email: candidate.email || '',
        position: candidate.jobTitle,
      },
      type,
    });
  };

  // --- GIAO DIỆN TRANG CHI TIẾT ---
  if (showAll) {
    return (
      <div className="grid gap-6">
        {displayApplications.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-dashed text-gray-400">
            Không có ứng viên nào phù hợp.
          </div>
        ) : (
          displayApplications.map((app) => {
            const statusConfig = getStatusConfig(app.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    <span>{app.name ? app.name.charAt(0).toUpperCase() : '?'}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{app.name}</h3>
                        <div className="space-y-1">
                          <p className="text-blue-600 font-semibold flex items-center gap-1.5 text-sm">
                            <FileText className="w-4 h-4" /> {app.jobTitle}
                          </p>
                          <p className="text-gray-500 text-sm flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" /> {app.companyName}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${statusConfig.color}`}>
                        <StatusIcon className="w-4 h-4" /> {statusConfig.label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4 bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {app.email}</div>
                      <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {app.phone}</div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-gray-400 text-xs italic">Ngày nộp: {app.appliedDate}</span>
                      <div className="flex gap-2">
                        <a 
                          href={`http://localhost:8080/uploads/cvs/${app.cvUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-bold hover:bg-gray-100 flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" /> Xem CV
                        </a>
                        <button onClick={() => openEmailModal(app, 'email')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">
                          Liên hệ
                        </button>
                        <button onClick={() => openEmailModal(app, 'interview')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700">
                          Phỏng vấn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <EmailModal
          isOpen={emailModal.isOpen}
          onClose={() => setEmailModal({ ...emailModal, isOpen: false })}
          candidate={emailModal.candidate}
          type={emailModal.type}
        />
      </div>
    );
  }

  // --- GIAO DIỆN WIDGET (Dashboard) ---
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-gray-900 font-bold">Ứng Viên Mới Nhất</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {displayApplications.length > 0 ? (
          displayApplications.map((app) => {
            const statusConfig = getStatusConfig(app.status);
            return (
              <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    <span>{app.name ? app.name.charAt(0).toUpperCase() : '?'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 font-bold text-sm truncate">{app.name || 'Ẩn danh'}</div>
                    <div className="text-blue-600 text-[11px] font-bold truncate">{app.jobTitle}</div>
                    <div className="text-gray-400 text-[10px] truncate">{app.companyName}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">Chưa có ứng viên mới.</div>
        )}
      </div>
    </div>
  );
}