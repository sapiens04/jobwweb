// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { MapPin, Briefcase, DollarSign, Clock, CheckCircle, Award, ArrowLeft, Share2, Bookmark } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { ApplicationModal } from '../components/ApplicationModal';
// import { toast } from 'sonner';

// interface Job {
//   id: number;
//   title: string;
//   companyName: string; 
//   salary: string;      
//   address: string;     
//   typeOfJob: string;   
//   description: string;
//   benefit: string;     
//   requirement: string; 
//   department: string;
//   deadlineApply: string;
//   status: string;
// }

// export function JobDetailPage() {
//   const { jobId } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState<Job | null>(null);
//   const [relatedJobs, setRelatedJobs] = useState<Job[]>([]); // Thêm state cho công việc liên quan
//   const [loading, setLoading] = useState(true);
//   const [showApplicationModal, setShowApplicationModal] = useState(false);

//   useEffect(() => {
//     const fetchJobDetail = async () => {
//       setLoading(true);
//       try {
//         const authData = localStorage.getItem("authData");
        
//         // 1. Lấy chi tiết công việc hiện tại
//         const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
//           headers: { "Authorization": `Basic ${authData}` }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setJob(data);

//           // 2. Lấy danh sách công việc liên quan (Gợi ý: lấy toàn bộ rồi lọc)
//           const relResponse = await fetch(`http://localhost:8080/api/jobs`, {
//             headers: { "Authorization": `Basic ${authData}` }
//           });
//           if (relResponse.ok) {
//             const allJobs: Job[] = await relResponse.json();
//             const filtered = allJobs
//               .filter(j => j.id !== data.id && (j.address === data.address || j.typeOfJob === data.typeOfJob))
//               .slice(0, 3);
//             setRelatedJobs(filtered);
//           }
//         } else {
//           toast.error("Không tìm thấy thông tin công việc");
//         }
//       } catch (error) {
//         toast.error("Lỗi kết nối server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (jobId) fetchJobDetail();
//   }, [jobId]);

//   if (loading) return <div className="text-center py-20">Đang tải chi tiết công việc...</div>;

//   if (!job) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h2 className="text-gray-900 mb-4">Không tìm thấy công việc</h2>
//         <Link to="/jobs" className="text-blue-600 hover:text-blue-700">Quay lại danh sách</Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-gray-50 min-h-screen">
//         {/* Breadcrumb */}
//         <div className="bg-white border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
//               <ArrowLeft className="w-5 h-5" /> Quay lại
//             </button>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <div className="flex items-start gap-4 mb-6">
//                   {/* Avatar/Logo Công ty */}
//                   <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl flex-shrink-0">
//                     {job.companyName.charAt(0)}
//                   </div>
//                   <div className="flex-1">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
//                     <p className="text-gray-600 mb-4">{job.companyName}</p>
                    
//                     <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
//                       <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.address}</div>
//                       <div className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.typeOfJob}</div>
//                       <div className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</div>
//                       <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> Hạn: {job.deadlineApply}</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <button onClick={() => setShowApplicationModal(true)} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold">
//                     Ứng tuyển ngay
//                   </button>
//                   <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                     <Bookmark className="w-5 h-5 text-gray-600" />
//                   </button>
//                   <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                     <Share2 className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Mô tả công việc */}
//               <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả công việc</h2>
//                 <div className="text-gray-600 leading-relaxed whitespace-pre-line">
//                   {job.description}
//                 </div>
//               </div>

//               {/* Yêu cầu công việc */}
//               <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <CheckCircle className="w-5 h-5 text-blue-600" />
//                   <h2 className="text-xl font-bold text-gray-900">Yêu cầu công việc</h2>
//                 </div>
//                 <div className="text-gray-600 whitespace-pre-line">
//                   {job.requirement}
//                 </div>
//               </div>

//               {/* Quyền lợi */}
//               <div className="bg-white rounded-lg shadow p-6 mb-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Award className="w-5 h-5 text-blue-600" />
//                   <h2 className="text-xl font-bold text-gray-900">Quyền lợi</h2>
//                 </div>
//                 <div className="text-gray-600 whitespace-pre-line">
//                   {job.benefit}
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-lg shadow p-6 sticky top-24 self-start">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin chung</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <div className="text-gray-500 mb-1 text-sm">Phòng ban</div>
//                     <div className="text-gray-900 font-medium">{job.department || "Chưa xác định"}</div>
//                   </div>
//                   <div>
//                     <div className="text-gray-500 mb-1 text-sm">Mức lương</div>
//                     <div className="text-blue-600 font-bold">{job.salary}</div>
//                   </div>
//                   <div>
//                     <div className="text-gray-500 mb-1 text-sm">Loại công việc</div>
//                     <div className="text-gray-900">{job.typeOfJob}</div>
//                   </div>
//                   <div>
//                     <div className="text-gray-500 mb-1 text-sm">Địa điểm</div>
//                     <div className="text-gray-900">{job.address}</div>
//                   </div>
//                 </div>

//                 <button onClick={() => setShowApplicationModal(true)} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold">
//                   Ứng tuyển ngay
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Related Jobs Section */}
//           {relatedJobs.length > 0 && (
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Công việc liên quan</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {relatedJobs.map(rJob => (
//                   <Link key={rJob.id} to={`/jobs/${rJob.id}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition-all p-6">
//                     <div className="flex items-start gap-3 mb-4">
//                       <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold">
//                         {rJob.companyName.charAt(0)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-gray-900 font-bold mb-1 line-clamp-1">{rJob.title}</h3>
//                         <p className="text-gray-600 text-sm line-clamp-1">{rJob.companyName}</p>
//                       </div>
//                     </div>
//                     <div className="space-y-2 text-gray-500 text-sm mb-4">
//                       <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {rJob.address}</div>
//                       <div className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {rJob.typeOfJob}</div>
//                     </div>
//                     <div className="flex items-center justify-between pt-4 border-t">
//                       <span className="text-blue-600 font-bold">{rJob.salary}</span>
//                       <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">Chi tiết</span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {showApplicationModal && (
//         <ApplicationModal
//           job={job}
//           onClose={() => setShowApplicationModal(false)}
//         />
//       )}
//     </>
//   );
// }

import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, CheckCircle, Award, ArrowLeft, Share2, Bookmark, Building2, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ApplicationModal } from '../components/ApplicationModal';
import { toast } from 'sonner';

// Định nghĩa Interface khớp 100% với JobEntity Backend
interface Job {
  id: number;
  title: string;
  companyName: string; 
  salary: string;      
  address: string;     
  typeOfJob: string;   
  description: string;
  benefit: string;     
  requirement: string; 
  department: string;
  deadlineApply: string;
  status: string;
}

export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    const fetchJobDetail = async () => {
      window.scrollTo(0, 0); // Cuộn lên đầu trang khi đổi jobId
      setLoading(true);
      try {
        const authData = localStorage.getItem("authData");
        
        // 1. Lấy chi tiết công việc hiện tại
        const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
          headers: { "Authorization": `Basic ${authData}` }
        });

        if (response.ok) {
          const data = await response.json();
          setJob(data);

          // 2. Lấy danh sách công việc liên quan (lọc theo địa điểm hoặc loại hình)
          const relResponse = await fetch(`http://localhost:8080/api/jobs`, {
            headers: { "Authorization": `Basic ${authData}` }
          });
          if (relResponse.ok) {
            const allJobs: Job[] = await relResponse.json();
            const filtered = allJobs
              .filter(j => j.id !== data.id && (j.address === data.address || j.typeOfJob === data.typeOfJob))
              .slice(0, 3);
            setRelatedJobs(filtered);
          }
        } else {
          toast.error("Không tìm thấy thông tin công việc");
        }
      } catch (error) {
        console.error("Lỗi:", error);
        toast.error("Lỗi kết nối máy chủ");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJobDetail();
  }, [jobId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 animate-pulse">Đang tải thông tin chi tiết...</p>
    </div>
  );

  if (!job) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm inline-block">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Không tìm thấy công việc</h2>
        <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:underline font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-16">
        {/* Header điều hướng */}
        <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Quay lại
            </button>
            <div className="flex gap-2">
               <Badge text={job.status} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Nội dung chính bên trái */}
            <div className="lg:col-span-2 space-y-6">
              {/* Thẻ Header Công việc */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                  <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 flex-shrink-0 shadow-inner">
                    <Building2 className="w-12 h-12" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{job.title}</h1>
                    <p className="text-lg text-blue-600 font-semibold mb-6 flex items-center gap-2">
                      {job.companyName}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-600">
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                         <MapPin className="w-5 h-5 text-red-400" /> 
                         <span className="text-sm font-medium">{job.address}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                         <Briefcase className="w-5 h-5 text-blue-400" /> 
                         <span className="text-sm font-medium">{job.typeOfJob}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                         <DollarSign className="w-5 h-5 text-green-500" /> 
                         <span className="text-sm font-bold text-gray-900">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                         <Clock className="w-5 h-5 text-orange-400" /> 
                         <span className="text-sm font-medium">Hạn: {job.deadlineApply}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-50">
                  <button onClick={() => setShowApplicationModal(true)} className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all font-bold text-lg">
                    Ứng tuyển ngay
                  </button>
                  <div className="flex gap-2">
                    <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all text-gray-600">
                      <Bookmark className="w-6 h-6" />
                    </button>
                    <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all text-gray-600">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chi tiết nội dung */}
              <div className="space-y-6">
                <Section title="Mô tả công việc" icon={<Briefcase className="w-5 h-5" />}>
                  {job.description}
                </Section>

                <Section title="Yêu cầu ứng viên" icon={<CheckCircle className="w-5 h-5" />}>
                  {job.requirement}
                </Section>

                <Section title="Quyền lợi" icon={<Award className="w-5 h-5" />}>
                  {job.benefit}
                </Section>
              </div>
            </div>

            {/* Sidebar bên phải */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  Tóm tắt công việc
                </h3>
                <div className="space-y-5">
                  <SidebarItem label="Phòng ban" value={job.department || "Kỹ thuật / Sản xuất"} />
                  <SidebarItem label="Mức lương" value={job.salary} highlight />
                  <SidebarItem label="Hình thức làm việc" value={job.typeOfJob} />
                  <SidebarItem label="Địa điểm" value={job.address} />
                  <SidebarItem label="Trạng thái" value={job.status} isStatus />
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800 leading-relaxed font-medium text-center">
                    Hãy chuẩn bị một CV thật ấn tượng để tăng khả năng trúng tuyển bạn nhé!
                  </p>
                </div>
                
                <button onClick={() => setShowApplicationModal(true)} className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-md shadow-blue-100">
                  Nộp đơn ứng tuyển
                </button>
              </div>
            </div>
          </div>

          {/* Công việc liên quan Section */}
          {relatedJobs.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Công việc bạn có thể quan tâm</h2>
                <Link to="/jobs" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                   Xem thêm <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedJobs.map(rJob => (
                  <Link key={rJob.id} to={`/jobs/${rJob.id}`} className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors truncate">{rJob.title}</h3>
                        <p className="text-gray-500 text-sm truncate">{rJob.companyName}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm"><MapPin className="w-4 h-4" /> {rJob.address}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm"><Briefcase className="w-4 h-4" /> {rJob.typeOfJob}</div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-blue-600 font-extrabold">{rJob.salary}</span>
                      <div className="text-blue-600 font-bold text-sm flex items-center">
                        Xem ngay <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showApplicationModal && (
        <ApplicationModal
          job={job}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </>
  );
}

// Các thành phần phụ trợ (Sub-components) để code sạch hơn
function Section({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
        {children}
      </div>
    </div>
  );
}

function SidebarItem({ label, value, highlight, isStatus }: { label: string, value: string, highlight?: boolean, isStatus?: boolean }) {
  return (
    <div className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
      <div className="text-gray-400 mb-1 text-xs uppercase tracking-wider font-semibold">{label}</div>
      <div className={`font-bold ${highlight ? 'text-blue-600 text-lg' : 'text-gray-800'} ${isStatus ? 'inline-block px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm' : ''}`}>
        {value}
      </div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest border border-green-200">
      {text || 'Đang tuyển'}
    </span>
  );
}
