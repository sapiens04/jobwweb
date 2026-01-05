import { MapPin, Clock, Users, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';

export function JobPostings() {
  const { jobs, deleteJob, updateJob } = useData();
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
      try {
        await deleteJob(id);
        alert('Xóa tin tuyển dụng thành công!');
      } catch (error) {
        console.error('Failed to delete job:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    try {
      await updateJob(id, { status: newStatus as 'active' | 'paused' });
    } catch (error) {
      console.error('Failed to update job status:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 text-gray-700">Vị Trí Tuyển Dụng</th>
              <th className="text-left p-4 text-gray-700">Địa Điểm</th>
              <th className="text-left p-4 text-gray-700">Loại Hình</th>
              <th className="text-left p-4 text-gray-700">Lương</th>
              <th className="text-left p-4 text-gray-700">Ứng Viên</th>
              <th className="text-left p-4 text-gray-700">Trạng Thái</th>
              <th className="text-left p-4 text-gray-700">Hạn Nộp</th>
              <th className="text-left p-4 text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <div className="text-gray-900">{job.title}</div>
                  <div className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    {job.posted}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.location}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {job.type}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{job.salary}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{job.applications}</span>
                  </div>
                </td>
                <td className="p-4">
                  {job.status === 'active' ? (
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      Đang tuyển
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                      Tạm dừng
                    </span>
                  )}
                </td>
                <td className="p-4 text-gray-700">{job.deadline}</td>
                <td className="p-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(showMenu === job.id ? null : job.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    {showMenu === job.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                          <Eye className="w-4 h-4" />
                          Xem chi tiết
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(job.id, job.status)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                          <Edit className="w-4 h-4" />
                          {job.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
                        </button>
                        <button 
                          onClick={() => handleDelete(job.id)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          Xóa tin
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}