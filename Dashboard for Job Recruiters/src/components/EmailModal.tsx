import { X, Send, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';

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

  if (!isOpen || !candidate) return null;

  const emailTemplates = [
    {
      name: 'Mời phỏng vấn',
      subject: `Mời phỏng vấn vị trí ${candidate.position}`,
      message: `Kính gửi ${candidate.name},\n\nChúng tôi rất ấn tượng với hồ sơ của bạn và muốn mời bạn tham gia phỏng vấn cho vị trí ${candidate.position}.\n\nVui lòng xác nhận thời gian phù hợp với bạn.\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
    },
    {
      name: 'Yêu cầu thông tin',
      subject: 'Yêu cầu bổ sung thông tin',
      message: `Kính gửi ${candidate.name},\n\nCảm ơn bạn đã ứng tuyển vị trí ${candidate.position}. Chúng tôi cần một số thông tin bổ sung để xem xét hồ sơ của bạn.\n\nVui lòng cung cấp:\n- Portfolio/Dự án đã thực hiện\n- Chứng chỉ liên quan\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
    },
    {
      name: 'Thông báo từ chối',
      subject: 'Kết quả ứng tuyển',
      message: `Kính gửi ${candidate.name},\n\nCảm ơn bạn đã dành thời gian ứng tuyển vị trí ${candidate.position} tại công ty chúng tôi.\n\nSau khi xem xét kỹ lưỡng, chúng tôi rất tiếc phải thông báo rằng hồ sơ của bạn chưa phù hợp với yêu cầu công việc hiện tại.\n\nChúng tôi sẽ lưu giữ hồ sơ của bạn cho các cơ hội trong tương lai.\n\nTrân trọng,\nĐội ngũ tuyển dụng`,
    },
  ];

  const handleSend = async () => {
    setLoading(true);
    try {
      if (type === 'email') {
        await sendEmail(candidate.email, subject, message);
        alert(`Email đã được gửi thành công đến ${candidate.name}!`);
      } else if (type === 'interview' && candidate.id) {
        await scheduleInterview(candidate.id, {
          date: interviewDate,
          time: interviewTime,
          location: interviewLocation,
          type: interviewLocation.toLowerCase().includes('meet') || interviewLocation.toLowerCase().includes('zoom') ? 'online' : 'offline',
        });
        alert(`Đã gửi lịch phỏng vấn đến ${candidate.name} thành công!`);
      }
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (template: typeof emailTemplates[0]) => {
    setSubject(template.subject);
    setMessage(template.message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 mb-1">
              {type === 'interview' ? 'Gửi lịch phỏng vấn' : 'Gửi email'}
            </h2>
            <p className="text-gray-600">Gửi đến: {candidate.name} ({candidate.email})</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Email Templates */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Mẫu email nhanh</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {emailTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition-colors"
                >
                  <FileText className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="text-gray-900 text-sm">{template.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tiêu đề</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Nhập tiêu đề email..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Interview Details */}
          {type === 'interview' && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-gray-900">Thông tin phỏng vấn</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Ngày phỏng vấn</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">Thời gian</label>
                  <input
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 mb-2 text-sm">Địa điểm/Link phỏng vấn</label>
                <input
                  type="text"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  placeholder="VD: Phòng họp A - Tầng 5 hoặc link Google Meet"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Message */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Nội dung</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập nội dung email..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSend}
              disabled={!subject || !message || loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 border-t-2 border-white rounded-full" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Gửi email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}