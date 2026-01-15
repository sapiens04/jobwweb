// import { X, Send, Calendar, FileText } from 'lucide-react';
// import { useState } from 'react';
// import { useData } from '../contexts/DataContext';
// import { api } from '../lib/api'; // Đảm bảo import đúng đường dẫn file api.ts của bạn

// interface EmailModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   candidate: {
//     id?: number;
//     name: string;
//     email: string;
//     position: string;
//   } | null;
//   type?: 'email' | 'interview';
// }

// export function EmailModal({ isOpen, onClose, candidate, type = 'email' }: EmailModalProps) {
//   const { sendEmail, scheduleInterview } = useData();
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [interviewDate, setInterviewDate] = useState('');
//   const [interviewTime, setInterviewTime] = useState('');
//   const [interviewLocation, setInterviewLocation] = useState('');
//   const [loading, setLoading] = useState(false);

//   if (!isOpen || !candidate) return null;

//   const emailTemplates = [
//     {
//       name: 'Mời phỏng vấn',
//       subject: `Mời phỏng vấn vị trí ${candidate.position}`,
//       message: `Kính gửi ${candidate.name},\n\nChúng tôi rất ấn tượng với hồ sơ của bạn và muốn mời bạn tham gia phỏng vấn cho vị trí ${candidate.position}.\n\nVui lòng xác nhận thời gian phù hợp với bạn.\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
//     },
//     {
//       name: 'Yêu cầu thông tin',
//       subject: 'Yêu cầu bổ sung thông tin',
//       message: `Kính gửi ${candidate.name},\n\nCảm ơn bạn đã ứng tuyển vị trí ${candidate.position}. Chúng tôi cần một số thông tin bổ sung để xem xét hồ sơ của bạn.\n\nVui lòng cung cấp:\n- Portfolio/Dự án đã thực hiện\n- Chứng chỉ liên quan\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
//     },
//     {
//       name: 'Thông báo từ chối',
//       subject: 'Kết quả ứng tuyển',
//       message: `Kính gửi ${candidate.name},\n\nCảm ơn bạn đã dành thời gian ứng tuyển vị trí ${candidate.position} tại công ty chúng tôi.\n\nSau khi xem xét kỹ lưỡng, chúng tôi rất tiếc phải thông báo rằng hồ sơ của bạn chưa phù hợp với yêu cầu công việc hiện tại.\n\nChúng tôi sẽ lưu giữ hồ sơ của bạn cho các cơ hội trong tương lai.\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
//     },
//   ];

//   const handleSend = async () => {
//     setLoading(true);
//     try {
//       // BƯỚC 1: Luôn gửi Email thông báo (Dù là PV hay Email thường)
//       await sendEmail(candidate.email, subject, message);

//       // BƯỚC 2: Xử lý logic riêng cho Mời phỏng vấn
//       if (type === 'interview' && candidate.id) {
//         // Đẩy dữ liệu vào bảng apply_jobs và cập nhật trạng thái ACCEPTED qua backend
//         await scheduleInterview(candidate.id, {
//           date: interviewDate,
//           time: interviewTime,
//           location: interviewLocation,
//         });

//         // Tự động cập nhật trạng thái sang REJECTED nếu tiêu đề là từ chối (Bonus logic)
//       } else if (candidate.id && subject.toLowerCase().includes('từ chối')) {
//         await api.updateCandidateStatus(candidate.id, 'REJECTED');
//       }

//       alert(`Thao tác thành công với ứng viên ${candidate.name}!`);
//       onClose();
      
//       // Reload để Dashboard cập nhật màu sắc trạng thái (ACCEPTED = Xanh/Hired)
//       window.location.reload(); 
      
//     } catch (error) {
//       console.error('Error handling send:', error);
//       alert('Có lỗi xảy ra khi xử lý. Vui lòng kiểm tra Server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyTemplate = (template: typeof emailTemplates[0]) => {
//     setSubject(template.subject);
//     setMessage(template.message);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 mb-1">
//               {type === 'interview' ? '📅 Gửi lịch phỏng vấn' : '✉️ Gửi email liên hệ'}
//             </h2>
//             <p className="text-gray-600 text-sm font-medium">Gửi đến: {candidate.name} ({candidate.email})</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="mb-6">
//             <label className="block text-sm font-bold text-gray-700 mb-2">Mẫu email nhanh</label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               {emailTemplates.map((template, index) => (
//                 <button
//                   key={index}
//                   onClick={() => applyTemplate(template)}
//                   className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition-all group"
//                 >
//                   <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mb-2" />
//                   <div className="font-bold text-gray-900 text-xs">{template.name}</div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề email</label>
//             <input
//               type="text"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>

//           {type === 'interview' && (
//             <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-4">
//               <div className="flex items-center gap-2 border-b border-blue-100 pb-2">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//                 <span className="font-bold text-blue-800">Thông tin lịch hẹn phỏng vấn</span>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-bold text-blue-700 mb-1">Ngày phỏng vấn</label>
//                   <input
//                     type="date"
//                     value={interviewDate}
//                     onChange={(e) => setInterviewDate(e.target.value)}
//                     className="w-full px-3 py-2 border border-blue-200 rounded-lg outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-blue-700 mb-1">Giờ bắt đầu</label>
//                   <input
//                     type="time"
//                     value={interviewTime}
//                     onChange={(e) => setInterviewTime(e.target.value)}
//                     className="w-full px-3 py-2 border border-blue-200 rounded-lg outline-none"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-xs font-bold text-blue-700 mb-1">Địa điểm hoặc Link meeting</label>
//                 <input
//                   type="text"
//                   value={interviewLocation}
//                   onChange={(e) => setInterviewLocation(e.target.value)}
//                   placeholder="VD: Phòng họp 1 hoặc link Google Meet/Zoom"
//                   className="w-full px-3 py-2 border border-blue-200 rounded-lg outline-none"
//                 />
//               </div>
//             </div>
//           )}

//           <div className="mb-6">
//             <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung chi tiết</label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               rows={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//             <button
//               onClick={onClose}
//               className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
//             >
//               Hủy bỏ
//             </button>
//             <button
//               onClick={handleSend}
//               disabled={!subject || !message || loading || (type === 'interview' && (!interviewDate || !interviewTime))}
//               className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
//             >
//               {loading ? <div className="animate-spin w-5 h-5 border-t-2 border-white rounded-full" /> : <Send className="w-5 h-5" />}
//               Xác nhận và gửi
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { X, Send, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { api } from '../lib/api';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    id?: number;
    name: string;
    email: string;
    position: string;
  } | null;
  type?: 'email' | 'interview';
}

export function EmailModal({ isOpen, onClose, candidate, type = 'email' }: EmailModalProps) {
  const { sendEmail, scheduleInterview } = useData();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Thêm state để ghi nhớ trạng thái chờ cập nhật dựa trên mẫu đã chọn
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);

  if (!isOpen || !candidate) return null;

  const emailTemplates = [
    {
      name: 'Mời phỏng vấn',
      status: 'ACCEPTED',
      subject: `Mời phỏng vấn vị trí ${candidate.position}`,
      message: `Kính gửi ${candidate.name},\n\nChúng tôi rất ấn tượng với hồ sơ của bạn và muốn mời bạn tham gia phỏng vấn cho vị trí ${candidate.position}.\n\nVui lòng xác nhận thời gian phù hợp với bạn.\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
    },
    {
      name: 'Yêu cầu thông tin',
      status: 'REVIEWING',
      subject: 'Yêu cầu bổ sung thông tin',
      message: `Kính gửi ${candidate.name},\n\nCảm ơn bạn đã ứng tuyển vị trí ${candidate.position}. Chúng tôi cần một số thông tin bổ sung để xem xét hồ sơ của bạn.\n\nVui lòng cung cấp:\n- Portfolio/Dự án đã thực hiện\n- Chứng chỉ liên quan\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
    },
    {
      name: 'Thông báo từ chối',
      status: 'REJECTED',
      subject: 'Kết quả ứng tuyển',
      message: `Kính gửi ${candidate.name},\n\nCảm ơn bạn đã dành thời gian ứng tuyển vị trí ${candidate.position} tại công ty chúng tôi.\n\nSau khi xem xét kỹ lưỡng, chúng tôi rất tiếc phải thông báo rằng hồ sơ của bạn chưa phù hợp với yêu cầu công việc hiện tại.\n\nChúng tôi sẽ lưu giữ hồ sơ của bạn cho các cơ hội trong tương lai.\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
    },
  ];

  const applyTemplate = (template: typeof emailTemplates[0]) => {
    setSubject(template.subject);
    setMessage(template.message);
    setPendingStatus(template.status); // Chỉ ghi nhớ trạng thái vào state, chưa lưu DB
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      // 1. Thực hiện gửi Email
      await sendEmail(candidate.email, subject, message);

      // 2. Nếu có lịch phỏng vấn, thực hiện lưu lịch (Backend đã có logic đổi status sang ACCEPTED/REVIEWING)
      if (type === 'interview' && candidate.id) {
        await scheduleInterview(candidate.id, {
          date: interviewDate,
          time: interviewTime,
          location: interviewLocation,
        });
      } 
      
      // 3. CHỈ THAY ĐỔI DB TẠI ĐÂY: Nếu đã chọn mẫu hoặc tiêu đề chứa chữ "từ chối"
      if (candidate.id) {
        if (pendingStatus) {
          await api.updateCandidateStatus(candidate.id, pendingStatus);
        } else if (subject.toLowerCase().includes('từ chối')) {
          await api.updateCandidateStatus(candidate.id, 'REJECTED');
        }
      }

      alert(`Thao tác thành công với ứng viên ${candidate.name}!`);
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error handling send:', error);
      alert('Có lỗi xảy ra khi xử lý.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {type === 'interview' ? '📅 Gửi lịch phỏng vấn' : '✉️ Gửi email liên hệ'}
            </h2>
            <p className="text-gray-600 text-sm font-medium">Gửi đến: {candidate.name} ({candidate.email})</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Mẫu email nhanh</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {emailTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition-all group"
                >
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mb-2" />
                  <div className="font-bold text-gray-900 text-xs">{template.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề email</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {type === 'interview' && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-blue-100 pb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">Thông tin lịch hẹn phỏng vấn</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-blue-700 mb-1">Ngày phỏng vấn</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-700 mb-1">Giờ bắt đầu</label>
                  <input
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-blue-700 mb-1">Địa điểm hoặc Link meeting</label>
                <input
                  type="text"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  placeholder="VD: Phòng họp 1 hoặc link Google Meet/Zoom"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg outline-none"
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung chi tiết</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSend}
              disabled={!subject || !message || loading || (type === 'interview' && (!interviewDate || !interviewTime))}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              {loading ? <div className="animate-spin w-5 h-5 border-t-2 border-white rounded-full" /> : <Send className="w-5 h-5" />}
              Xác nhận và gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}