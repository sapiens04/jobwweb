// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { SearchBar } from '../components/SearchBar';
// // import { FilterSidebar } from '../components/FilterSidebar';
// // import { MapPin, Briefcase, DollarSign, Clock, ChevronRight } from 'lucide-react';

// // export function JobsPage() {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [filters, setFilters] = useState({
// //     location: '', jobType: '', salaryRange: '', experience: ''
// //   });

// //   // Mảng dữ liệu mẫu để bạn thấy độ rộng thực tế
// //   const filteredJobs = []; 

// //   return (
// //     <div className="bg-[#f8f9fa] min-h-screen w-full font-sans overflow-x-hidden">
// //       {/* Page Header - Full Width Background */}
// //       <div className="bg-white border-b border-gray-200 py-20">
// //         <div className="max-w-[1600px] mx-auto px-8">
// //           <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">
// //             Cơ hội nghề nghiệp
// //           </h1>
// //           <p className="text-3xl text-gray-400 font-light max-w-4xl">
// //             Khám phá <span className="text-blue-600 font-semibold">{filteredJobs.length || 0}</span> vị trí đang tuyển dụng từ các tập đoàn hàng đầu.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Tận dụng tối đa chiều rộng màn hình với max-w-[1600px] */}
// //       <div className="max-w-[1600px] mx-auto px-8 py-16">
        
// //         {/* SearchBar - Làm cực to */}
// //         <div className="mb-16 transform scale-100">
// //           <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
// //         </div>
        
// //         <div className="flex flex-col lg:flex-row gap-16">
// //           {/* Sidebar - Cố định độ rộng vừa phải để nhường chỗ cho Main */}
// //           <aside className="w-full lg:w-72 flex-shrink-0">
// //             <div className="sticky top-28 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
// //               <FilterSidebar filters={filters} setFilters={setFilters} />
// //             </div>
// //           </aside>
          
// //           {/* Main Content - RỘNG HƠN NỮA */}
// //           <main className="flex-1 space-y-10">
// //             {filteredJobs.length > 0 ? (
// //               filteredJobs.map(job => (
// //                 <Link
// //                   key={job.id}
// //                   to={`/jobs/${job.id}`}
// //                   className="group block bg-white rounded-3xl border border-gray-100 p-12 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 no-underline"
// //                 >
// //                   <div className="flex items-center gap-12">
// //                     {/* Logo - To và không bị bóp méo */}
// //                     <div className="w-32 h-32 bg-gray-50 rounded-3xl flex items-center justify-center p-4 border border-gray-50 shrink-0 group-hover:bg-blue-50 transition-colors">
// //                       <img 
// //                         src={job.logo} 
// //                         alt={job.company}
// //                         className="w-full h-full object-contain"
// //                       />
// //                     </div>
                    
// //                     <div className="flex-1">
// //                       <div className="flex justify-between items-center mb-6">
// //                         <h3 className="text-4xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors leading-none tracking-tight">
// //                           {job.title}
// //                         </h3>
// //                         <div className="text-3xl font-black text-blue-600 bg-blue-50 px-6 py-2 rounded-2xl">
// //                           {job.salaryRange}
// //                         </div>
// //                       </div>

// //                       <p className="text-2xl font-bold text-gray-500 mb-8 flex items-center gap-3">
// //                         <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
// //                         {job.company}
// //                       </p>
                      
// //                       {/* Tags - Cách đều và to */}
// //                       <div className="flex flex-wrap gap-10 text-gray-500 mb-10">
// //                         <div className="flex items-center gap-3 text-xl font-medium">
// //                           <MapPin className="w-7 h-7 text-red-400" />
// //                           <span>{job.location}</span>
// //                         </div>
// //                         <div className="flex items-center gap-3 text-xl font-medium">
// //                           <Briefcase className="w-7 h-7 text-blue-400" />
// //                           <span>{job.type}</span>
// //                         </div>
// //                         <div className="flex items-center gap-3 text-xl font-medium">
// //                           <DollarSign className="w-7 h-7 text-green-400" />
// //                           <span>{job.experience}</span>
// //                         </div>
// //                       </div>
                      
// //                       {/* Description - Cực kỳ thoáng */}
// //                       <p className="text-gray-400 text-2xl leading-relaxed mb-10 line-clamp-2 italic">
// //                         "{job.description}"
// //                       </p>
                      
// //                       <div className="flex items-center justify-between pt-8 border-t border-gray-50">
// //                         <div className="flex items-center gap-3 text-gray-400 font-semibold text-lg">
// //                           <Clock className="w-6 h-6" />
// //                           <span>Cập nhật {job.postedDate}</span>
// //                         </div>
// //                         <div className="flex items-center gap-3 text-blue-600 text-2xl font-black group-hover:translate-x-2 transition-transform">
// //                           Ứng tuyển ngay <ChevronRight className="w-8 h-8" />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))
// //             ) : (
// //               <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
// //                 <p className="text-3xl text-gray-400 font-medium">Hiện tại không có tin tuyển dụng nào được hiển thị.</p>
// //                 <p className="text-xl text-gray-300 mt-4">Vui lòng thử lại với các bộ lọc khác.</p>
// //               </div>
// //             )}
// //           </main>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { SearchBar } from '../components/SearchBar';
// import { FilterSidebar } from '../components/FilterSidebar';
// import { MapPin, Briefcase, DollarSign, Clock, ChevronRight } from 'lucide-react';

// export function JobsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     location: '', jobType: '', salaryRange: '', experience: ''
//   });

//   const filteredJobs = []; // Dữ liệu của bạn

//   return (
//     <div className="bg-[#f8f9fa] min-h-screen w-full font-sans overflow-x-hidden">
//       {/* Page Header */}
//       <div className="bg-white border-b border-gray-200 py-24">
//         {/* Tăng px-12 để đẩy chữ ra khỏi lề trái */}
//         <div className="max-w-[1400px] mx-auto px-12">
//           <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">
//             Thị trường việc làm
//           </h1>
//           <p className="text-3xl text-gray-400 font-light max-w-4xl">
//             Khám phá các cơ hội nghề nghiệp tốt nhất dành cho bạn.
//           </p>
//         </div>
//       </div>

//       {/* Main Content Container */}
//       <div className="max-w-[1400px] mx-auto px-12 py-16">
        
//         {/* SearchBar Section */}
//         <div className="mb-20">
//           <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//         </div>
        
//         <div className="flex flex-col lg:flex-row gap-16">
//           {/* Sidebar */}
//           <aside className="w-full lg:w-80 flex-shrink-0">
//             <div className="sticky top-28">
//               <FilterSidebar filters={filters} setFilters={setFilters} />
//             </div>
//           </aside>
          
//           {/* Job Listing Main */}
//           <main className="flex-1 space-y-12">
//             {filteredJobs.length > 0 ? (
//               filteredJobs.map(job => (
//                 <Link
//                   key={job.id}
//                   to={`/jobs/${job.id}`}
//                   className="group block bg-white rounded-[32px] border border-gray-100 p-12 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 no-underline"
//                 >
//                   <div className="flex items-center gap-12">
//                     {/* Logo Box */}
//                     <div className="w-32 h-32 bg-gray-50 rounded-3xl flex items-center justify-center p-6 shrink-0 group-hover:bg-blue-50 transition-colors">
//                       <img 
//                         src={job.logo} 
//                         alt={job.company}
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
                    
//                     <div className="flex-1">
//                       <div className="flex justify-between items-center mb-6">
//                         <h3 className="text-4xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
//                           {job.title}
//                         </h3>
//                         <div className="text-3xl font-black text-blue-600">
//                           {job.salaryRange}
//                         </div>
//                       </div>

//                       {/* Tên công ty có lề trái nhẹ bằng gap */}
//                       <p className="text-2xl font-bold text-gray-500 mb-8 flex items-center gap-3 italic">
//                         {job.company}
//                       </p>
                      
//                       <div className="flex flex-wrap gap-12 text-gray-500 mb-10">
//                         <div className="flex items-center gap-3 text-xl">
//                           <MapPin className="w-7 h-7 text-blue-500" />
//                           <span>{job.location}</span>
//                         </div>
//                         <div className="flex items-center gap-3 text-xl">
//                           <Briefcase className="w-7 h-7 text-blue-500" />
//                           <span>{job.type}</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center justify-between pt-8 border-t border-gray-50">
//                         <div className="flex items-center gap-3 text-gray-400 font-semibold text-lg">
//                           <Clock className="w-6 h-6" />
//                           <span>{job.postedDate}</span>
//                         </div>
//                         <div className="flex items-center gap-3 text-blue-600 text-2xl font-black group-hover:translate-x-3 transition-transform">
//                           Xem chi tiết <ChevronRight className="w-8 h-8" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               /* Trường hợp trống */
//               <div className="bg-white rounded-[40px] p-24 text-center border-2 border-dashed border-gray-100">
//                 <p className="text-3xl text-gray-300 font-medium">Đang tải danh sách công việc...</p>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { FilterSidebar } from '../components/FilterSidebar';
import { MapPin, Briefcase, DollarSign, Clock, ChevronRight, Building2 } from 'lucide-react';

export function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '', jobType: '', salaryRange: '', experience: ''
  });

  // Giả sử đây là dữ liệu từ API của bạn
  const filteredJobs = []; 

  return (
    <div className="bg-[#f8f9fa] min-h-screen w-full font-sans overflow-x-hidden">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-20">
        <div className="max-w-[1400px] mx-auto px-12">
          <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">
            Thị trường việc làm
          </h1>
          <p className="text-2xl text-gray-400 font-light">
            Tìm thấy <span className="text-blue-600 font-bold">{filteredJobs.length}</span> cơ hội đang chờ bạn
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-12 py-12">
        {/* SearchBar */}
        <div className="mb-16">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </aside>
          
          {/* Main Content - Danh sách các Job */}
          <main className="flex-1 space-y-8">
            {filteredJobs.map(job => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group block bg-white rounded-[32px] border border-gray-100 p-10 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 no-underline"
              >
                <div className="flex items-start gap-10">
                  
                  {/* BIỂU TƯỢNG CÔNG TY - Giống hệt bên JobDetail */}
                  <div className="w-28 h-28 bg-white rounded-[24px] flex items-center justify-center border-2 border-gray-50 shadow-sm shrink-0 overflow-hidden group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
                    {job.logo ? (
                      <img 
                        src={job.logo} 
                        alt={job.company}
                        className="w-full h-full object-contain p-4" 
                      />
                    ) : (
                      <Building2 className="w-14 h-14 text-blue-500" />
                    )}
                  </div>
                  
                  {/* Nội dung bên phải */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                        {job.title}
                      </h3>
                      <div className="text-2xl font-black text-blue-600 whitespace-nowrap ml-4">
                        {job.salaryRange}
                      </div>
                    </div>

                    <p className="text-xl font-bold text-gray-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      {job.company}
                    </p>
                    
                    {/* Tags thông tin */}
                    <div className="flex flex-wrap gap-8 text-gray-500 mb-8">
                      <div className="flex items-center gap-2 text-lg font-medium">
                        <MapPin className="w-6 h-6 text-red-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-medium">
                        <Briefcase className="w-6 h-6 text-blue-400" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-medium">
                        <DollarSign className="w-6 h-6 text-green-500" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    
                    {/* Phần chân thẻ Job */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-gray-400 font-semibold">
                        <Clock className="w-5 h-5" />
                        <span>Đăng {job.postedDate}</span>
                      </div>
                      <span className="flex items-center gap-2 text-blue-600 text-xl font-black group-hover:translate-x-2 transition-transform">
                        Chi tiết <ChevronRight className="w-7 h-7" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
                <p className="text-2xl text-gray-300 font-bold">Không tìm thấy công việc phù hợp</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}