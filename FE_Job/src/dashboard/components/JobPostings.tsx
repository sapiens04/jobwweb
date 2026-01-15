// import { MapPin, Clock, MoreVertical, Eye, Edit, Trash2, Plus } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { CreateJobModal } from './CreateJobModal';

// interface Job {
//   id: number;
//   title: string;
//   address: string;
//   typeOfJob: string;
//   salary: string;
//   status: 'PUBLISHED' | 'CLOSED' | 'DRAFT' | 'EXPIRED';
//   deadlineApply: string;
//   createdAt: string;
// }

// export function JobPostings() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [showMenu, setShowMenu] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const fetchJobs = async () => {
//     const authData = localStorage.getItem("authData");
//     if (!authData) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/jobs/my-jobs", {
//         method: 'GET',
//         headers: {
//           "Authorization": `Basic ${authData}`,
//           "Content-Type": "application/json"
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setJobs(data.content || []);
//       }
//     } catch (error) {
//       console.error("Lỗi khi tải danh sách:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId: number) => {
//     const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn tin tuyển dụng này?");
//     if (!confirmDelete) return;

//     const authData = localStorage.getItem("authData");
//     try {
//       const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
//         method: 'DELETE',
//         headers: { "Authorization": `Basic ${authData}` }
//       });

//       if (response.ok) {
//         setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
//         alert("Đã xóa tin tuyển dụng thành công!");
//         setShowMenu(null);
//       } else {
//         alert("Không thể xóa tin này.");
//       }
//     } catch (error) {
//       console.error("Lỗi xóa:", error);
//     }
//   };

//   if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

//   return (
//     <div className="space-y-4 p-6">
//       {/* HEADER: Giữ nguyên tiêu đề và nút Đăng tin mới */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold text-gray-800">Tin Tuyển Dụng Của Tôi</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
//         >
//           <Plus className="w-4 h-4" /> Đăng tin mới
//         </button>
//       </div>

//       {/* BẢNG DỮ LIỆU: Thêm bọc Div để tạo thanh cuộn và max-height */}
//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//         {/* max-h-[450px] tương đương độ cao của khoảng 5-6 dòng */}
//         <div className="overflow-y-auto max-h-[450px] relative">
//           <table className="w-full border-collapse">
//             <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
//               <tr className="border-b border-gray-200">
//                 <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Vị Trí</th>
//                 <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Địa Điểm</th>
//                 <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Loại Hình</th>
//                 <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Lương</th>
//                 <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Trạng Thái</th>
//                 <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Hạn Nộp</th>
//                 <th className="text-left p-4"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {jobs.length > 0 ? jobs.map((job) => (
//                 <tr key={job.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="p-4">
//                     <div className="text-gray-900 font-medium">{job.title}</div>
//                     <div className="text-gray-400 text-[10px] flex items-center gap-1 mt-1">
//                       <Clock className="w-3 h-3" />
//                       {job.createdAt ? new Date(job.createdAt).toLocaleDateString('vi-VN') : 'Vừa xong'}
//                     </div>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <MapPin className="w-4 h-4 text-gray-400" />
//                       {job.address || 'Chưa cập nhật'}
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
//                       {job.typeOfJob}
//                     </span>
//                   </td>
//                   <td className="p-4 text-sm font-semibold text-gray-700">{job.salary}</td>
//                   <td className="p-4">
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                       job.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
//                     }`}>
//                       {job.status === 'PUBLISHED' ? 'Đang tuyển' : 'Đã đóng'}
//                     </span>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">
//                     {job.deadlineApply ? new Date(job.deadlineApply).toLocaleDateString('vi-VN') : 'Vô thời hạn'}
//                   </td>
//                   <td className="p-4 text-right">
//                     <div className="relative">
//                       <button onClick={() => setShowMenu(showMenu === job.id ? null : job.id)}>
//                         <MoreVertical className="w-5 h-5 text-gray-400" />
//                       </button>
//                       {showMenu === job.id && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50 py-2">
//                           <button onClick={() => handleDelete(job.id)} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600">
//                             <Trash2 className="w-4 h-4" /> Xóa tin
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan={7} className="p-12 text-center text-gray-400 italic">Chưa có tin nào.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <CreateJobModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={fetchJobs}
//       />
//     </div>
//   );
// }
import { MapPin, Clock, MoreVertical, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CreateJobModal } from './CreateJobModal';

interface Job {
  id: number;
  title: string;
  address: string;
  typeOfJob: string;
  salary: string;
  status: 'PUBLISHED' | 'CLOSED' | 'DRAFT' | 'EXPIRED';
  deadlineApply: string;
  createdAt: string;
}

export function JobPostings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchJobs = async () => {
    const authData = localStorage.getItem("authData");
    if (!authData) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/jobs/my-jobs", {
        method: 'GET',
        headers: {
          "Authorization": `Basic ${authData}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.content || []);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId: number) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn tin tuyển dụng này?");
    if (!confirmDelete) return;

    const authData = localStorage.getItem("authData");
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { "Authorization": `Basic ${authData}` }
      });

      if (response.ok) {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        alert("Đã xóa tin tuyển dụng thành công!");
        setShowMenu(null);
      } else {
        alert("Không thể xóa tin này.");
      }
    } catch (error) {
      console.error("Lỗi xóa:", error);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Tin Tuyển Dụng Của Tôi</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Đăng tin mới
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Thanh cuộn giới hạn 5-6 dòng */}
        <div className="overflow-y-auto max-h-[450px] relative">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Vị Trí</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Địa Điểm</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Loại Hình</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Lương</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Trạng Thái</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase">Hạn Nộp</th>
                <th className="text-left p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.length > 0 ? jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="text-gray-900 font-medium">{job.title}</div>
                    <div className="text-gray-400 text-[10px] flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {job.createdAt ? new Date(job.createdAt).toLocaleDateString('vi-VN') : 'Vừa xong'}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {job.address || 'Chưa cập nhật'}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {job.typeOfJob}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-700">{job.salary}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      job.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {job.status === 'PUBLISHED' ? 'Đang tuyển' : 'Đã đóng'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {job.deadlineApply ? new Date(job.deadlineApply).toLocaleDateString('vi-VN') : 'Vô thời hạn'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="relative">
                      <button 
                        onClick={() => setShowMenu(showMenu === job.id ? null : job.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      {showMenu === job.id && (
                        /* Menu hiển thị lên trên nhờ 'bottom-full mb-2' */
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-[100] py-2">
                          <div className="border-t border-gray-100 my-1"></div>
                          <button 
                            onClick={() => handleDelete(job.id)} 
                            className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" /> Xóa tin
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} className="p-12 text-center text-gray-400 italic">Chưa có tin nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchJobs}
      />
    </div>
  );
}