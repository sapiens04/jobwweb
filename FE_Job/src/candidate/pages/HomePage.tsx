// // import { Link, useNavigate } from 'react-router-dom';
// // import { Search, Briefcase, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
// // export function HomePage() {
// //   const navigate = useNavigate();
// //   const featuredJobs = jobsData.slice(0, 6);
  
// //   const stats = [
// //     { label: 'Công việc đang tuyển', value: '1,000+', icon: Briefcase },
// //     { label: 'Công ty đối tác', value: '200+', icon: MapPin },
// //     { label: 'Ứng viên thành công', value: '5,000+', icon: TrendingUp },
// //   ];

// //   // Hàm xử lý ép buộc điều hướng về login
// //   const handleProtectedAction = (e: React.MouseEvent) => {
// //     e.preventDefault(); // Chặn mọi hành vi mặc định
// //     e.stopPropagation(); // Chặn sự kiện nổi bọt
// //     navigate('/login'); 
// //   };

// //   return (
// //     <div className="select-none"> {/* Chặn bôi đen để tránh click nhầm */}
// //       {/* Hero Section */}
// //       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //             <h1 className="mb-6 text-4xl font-bold">Tìm Công Việc Mơ Ước Của Bạn</h1>
// //             <p className="text-blue-100 max-w-2xl mx-auto mb-8">
// //               Khám phá hàng nghìn cơ hội việc làm. Bắt đầu ngay hôm nay.
// //             </p>
// //             <button
// //               onClick={handleProtectedAction}
// //               className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold"
// //             >
// //               <Search className="w-5 h-5" />
// //               Khám phá việc làm
// //               <ArrowRight className="w-5 h-5" />
// //             </button>
// //         </div>
// //       </div>

// //       {/* Featured Jobs */}
// //       <div className="py-16 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between mb-8">
// //             <h2 className="text-3xl font-bold text-gray-900">Việc làm nổi bật</h2>
// //             <button onClick={handleProtectedAction} className="text-blue-600 font-medium hover:underline flex items-center gap-1">
// //               Xem tất cả <ArrowRight className="w-4 h-4" />
// //             </button>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {featuredJobs.map(job => (
// //               /* QUAN TRỌNG: Dùng div hoàn toàn, không bọc trong Link hay thẻ a nào khác */
// //               <div
// //                 key={job.id}
// //                 onClick={handleProtectedAction}
// //                 className="cursor-pointer bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all group"
// //               >
// //                 <div className="flex items-start gap-4 mb-4">
// //                   <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
// //                   <div>
// //                     <h3 className="font-bold text-gray-900 group-hover:text-blue-600">{job.title}</h3>
// //                     <p className="text-gray-500 text-sm">{job.company}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
// //                   <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
// //                   <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
// //                 </div>

// //                 <div className="flex justify-between items-center pt-4 border-t">
// //                   <span className="text-blue-600 font-bold">{job.salaryRange}</span>
// //                   <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">{job.experience}</span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { Link, useNavigate } from 'react-router-dom';
// import { Search, Briefcase, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
// import { useState, useEffect } from 'react'; // 1. Import thêm hooks

// // Định nghĩa kiểu dữ liệu Job từ DB
// interface Job {
//   id: number;
//   title: string;
//   companyName: string;
//   address: string;
//   type: string;
//   salary: string;
// }

// export function HomePage() {
//   const navigate = useNavigate();
  
//   // 2. Tạo state để lưu danh sách Jobs
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 3. Gọi API lấy dữ liệu từ DB
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/jobs/featured');
//         const data = await response.json();
//         setJobs(data);
//       } catch (error) {
//         console.error("Lỗi lấy dữ liệu job:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleProtectedAction = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/login'); 
//   };

//   return (
//     <div className="select-none">
//       {/* Hero Section giữ nguyên */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
//          {/* ... (phần code UI của bạn) */}
//       </div>

//       {/* Featured Jobs Section */}
//       <div className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Việc làm nổi bật</h2>
//             <button onClick={handleProtectedAction} className="text-blue-600 flex items-center gap-1">
//               Xem tất cả <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>

//           {/* 4. Hiển thị trạng thái Loading hoặc danh sách từ DB */}
//           {isLoading ? (
//             <div className="text-center py-10">Đang tải việc làm...</div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {jobs.map(job => (
//                 <div
//                   key={job.id}
//                   onClick={handleProtectedAction}
//                   className="cursor-pointer bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
//                 >
//                   <div className="flex items-start gap-4 mb-4">
                    
//                     <div>
//                       <h3 className="font-bold text-gray-900">{job.title}</h3>
//                       <p className="text-gray-500 text-sm">{job.company}</p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
//                     <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.address}</span>
//                     <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
//                   </div>

//                   <div className="flex justify-between items-center pt-4 border-t">
//                     <span className="text-blue-600 font-bold">{job.salary}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { Link, useNavigate } from 'react-router-dom';
import { Search, Briefcase, MapPin, TrendingUp, ArrowRight, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu Job khớp 100% với JobEntity (Java)
interface Job {
  id: number;
  title: string;
  companyName: string; // Khớp với private String companyName
  address: string;     // Khớp với private String address
  salary: string;      // Khớp với private String salary
  typeOfJob: string;   // Khớp với JobType typeOfJob
  department: string;  // Khớp với private String department
}

export function HomePage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jobs/featured');
        
        // Kiểm tra nếu phản hồi không thành công (lỗi 500 hoặc 404)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Đảm bảo data là mảng trước khi set
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu job:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleProtectedAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/login'); 
  };

  return (
    <div className="select-none">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="mb-6 text-4xl font-bold">Tìm Công Việc Mơ Ước Của Bạn</h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Khám phá hàng nghìn cơ hội việc làm. Bắt đầu ngay hôm nay.
          </p>
          <button
            onClick={handleProtectedAction}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold"
          >
            <Search className="w-5 h-5" />
            Khám phá việc làm
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Việc làm nổi bật</h2>
            <button onClick={handleProtectedAction} className="text-blue-600 font-medium hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Đang tải việc làm...</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Hiện chưa có công việc nào được đăng tải.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <div
                  key={job.id}
                  onClick={handleProtectedAction}
                  className="cursor-pointer bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.companyName}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> {job.address || 'Địa điểm: Thỏa thuận'}
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" /> {job.typeOfJob || 'Loại hình: Full-time'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-bold">{job.salary || 'Lương: Thỏa thuận'}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium uppercase tracking-wider">
                      {job.department || 'Phòng ban'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}