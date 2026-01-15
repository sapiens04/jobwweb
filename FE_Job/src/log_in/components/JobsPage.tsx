// // import { useState, useEffect } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { Button } from "./ui/button";
// // import { Badge } from "./ui/badge";
// // import { Briefcase, MapPin, DollarSign, LogOut, Plus, Search, Clock } from "lucide-react";
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// // import { Input } from "./ui/input";
// // import { Label } from "./ui/label";
// // import { Textarea } from "./ui/textarea";
// // import { toast } from "sonner";

// // import { SearchBar } from './SearchBar';
// // import { FilterSidebar } from './FilterSidebar';
// // import logo from "./image.png";

// // // Khớp interface với JobEntity backend
// // interface Job {
// //   id: number;
// //   title: string;
// //   companyName: string; // Đổi từ company -> companyName
// //   salary: string;      // Đổi từ salaryRange -> salary
// //   address: string;     // Đổi từ location -> address
// //   typeOfJob: string;   // Đổi từ type -> typeOfJob
// //   description: string;
// //   benefit: string;     // Thêm trường benefit
// //   requirement: string; // Thêm trường requirement
// //   deadlineApply: string;
// //   status: string;
// // }

// // export default function JobsPage() {
// //   const navigate = useNavigate();
// //   const [currentUser, setCurrentUser] = useState<any>(null);
// //   const [jobs, setJobs] = useState<Job[]>([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [isAddJobOpen, setIsAddJobOpen] = useState(false);
// //   const [loading, setLoading] = useState(true);
  
// //   const [filters, setFilters] = useState({
// //     location: '', // filter này vẫn giữ để map với address
// //     jobType: '',
// //     salaryRange: '',
// //     experience: ''
// //   });

// //   const [newJob, setNewJob] = useState({
// //     title: "",
// //     companyName: "",
// //     address: "",
// //     salary: "",
// //     description: "",
// //     benefit: "",
// //     requirement: "",
// //     typeOfJob: "FULL_TIME" // Mặc định khớp Enum
// //   });

// //   useEffect(() => {
// //     // 1. Kiểm tra đăng nhập
// //     const userData = localStorage.getItem("currentUser");
// //     if (!userData) {
// //       navigate("/login");
// //       return;
// //     }
// //     setCurrentUser(JSON.parse(userData));

// //     // 2. Lấy dữ liệu công việc từ API Backend
// //     fetchJobs();
// //   }, [navigate]);

// //   const fetchJobs = async () => {
// //     setLoading(true);
// //     try {
// //       // Lấy token hoặc authData từ localStorage (tùy cách bạn làm Login)
// //       const authData = localStorage.getItem("authData"); 
      
// //       const response = await fetch("http://localhost:8080/api/jobs", {
// //         headers: {
// //           "Authorization": `Basic ${authData}`
// //         }
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         setJobs(data);
// //       } else {
// //         toast.error("Không thể lấy danh sách công việc");
// //       }
// //     } catch (error) {
// //       console.error("Lỗi:", error);
// //       toast.error("Không thể kết nối đến máy chủ");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddJob = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const authData = localStorage.getItem("authData");
// //       const response = await fetch("http://localhost:8080/api/jobs", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "Authorization": `Basic ${authData}`
// //         },
// //         body: JSON.stringify({
// //           ...newJob,
// //           status: "OPEN" // Trạng thái mặc định khi tạo
// //         })
// //       });

// //       if (response.ok) {
// //         toast.success("Đăng tin thành công!");
// //         setIsAddJobOpen(false);
// //         fetchJobs(); // Load lại danh sách
// //       } else {
// //         toast.error("Lỗi khi đăng tin");
// //       }
// //     } catch (error) {
// //       toast.error("Máy chủ không phản hồi");
// //     }
// //   };

// //   const filteredJobs = jobs.filter(job => {
// //     const matchesSearch =
// //       job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

// //     const matchesLocation = !filters.location || job.address === filters.location;
// //     const matchesJobType = !filters.jobType || job.typeOfJob === filters.jobType;

// //     return matchesSearch && matchesLocation && matchesJobType;
// //   });

// //   const handleLogout = () => {
// //     localStorage.removeItem("currentUser");
// //     localStorage.removeItem("authData");
// //     navigate("/login");
// //   };

// //   if (!currentUser) return null;

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col">
// //       <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <img src={logo} alt="JobFinder" className="h-10 w-10 object-contain" />
// //             <div>
// //               <Link to="/" className="text-2xl font-bold text-blue-600 block">JobFinder</Link>
// //               <div className="flex items-center gap-2 text-xs text-gray-500">
// //                 <span>{currentUser.username}</span>
// //                 <Badge className="bg-blue-100 text-blue-700 shadow-none text-[10px] h-4">
// //                   {currentUser.role === "recruiter" ? "NHÀ TUYỂN DỤNG" : "ỨNG VIÊN"}
// //                 </Badge>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             {currentUser.role === "recruiter" && (
// //               <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
// //                 <DialogTrigger asChild>
// //                   <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
// //                     <Plus className="mr-2 h-4 w-4" /> Đăng tin mới
// //                   </Button>
// //                 </DialogTrigger>
// //                 <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
// //                   <DialogHeader>
// //                     <DialogTitle>Tạo tin tuyển dụng</DialogTitle>
// //                     <DialogDescription>Dữ liệu này sẽ được lưu vào JobEntity Backend.</DialogDescription>
// //                   </DialogHeader>
// //                   <form onSubmit={handleAddJob} className="space-y-4 pt-4">
// //                     <div className="grid gap-4">
// //                       <div className="space-y-2">
// //                         <Label>Vị trí tuyển dụng (Title)</Label>
// //                         <Input placeholder="VD: Senior React Developer" onChange={e => setNewJob({...newJob, title: e.target.value})} required />
// //                       </div>
// //                       <div className="space-y-2">
// //                         <Label>Tên công ty (Company Name)</Label>
// //                         <Input placeholder="Tên công ty" onChange={e => setNewJob({...newJob, companyName: e.target.value})} required />
// //                       </div>
// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div className="space-y-2">
// //                           <Label>Địa điểm (Address)</Label>
// //                           <Input placeholder="Hà Nội, TP.HCM..." onChange={e => setNewJob({...newJob, address: e.target.value})} required />
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label>Mức lương (Salary)</Label>
// //                           <Input placeholder="15-20 triệu" onChange={e => setNewJob({...newJob, salary: e.target.value})} required />
// //                         </div>
// //                       </div>
// //                       <div className="space-y-2">
// //                         <Label>Mô tả (Description)</Label>
// //                         <Textarea rows={3} onChange={e => setNewJob({...newJob, description: e.target.value})} required />
// //                       </div>
// //                       <div className="space-y-2">
// //                         <Label>Yêu cầu (Requirement)</Label>
// //                         <Textarea rows={3} onChange={e => setNewJob({...newJob, requirement: e.target.value})} required />
// //                       </div>
// //                     </div>
// //                     <Button type="submit" className="w-full bg-blue-600 py-6 text-lg">Xác nhận lưu vào DB</Button>
// //                   </form>
// //                 </DialogContent>
// //               </Dialog>
// //             )}
// //             <Button variant="ghost" onClick={handleLogout} className="text-gray-500 hover:text-red-600">
// //               <LogOut className="h-5 w-5" />
// //             </Button>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
// //         <div className="mb-10">
// //           <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //           <aside className="lg:col-span-1 space-y-6">
// //              <div className="sticky top-28">
// //                 <FilterSidebar filters={filters} setFilters={setFilters} />
// //              </div>
// //           </aside>

// //           <div className="lg:col-span-3 space-y-4">
// //             {loading ? (
// //                <div className="text-center py-10">Đang tải dữ liệu từ Backend...</div>
// //             ) : (
// //               filteredJobs.map((job) => (
// //                 <Link key={job.id} to={`/jobs/${job.id}`} className="group block bg-white border rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-all">
// //                   <div className="flex items-start gap-5">
// //                     <div className="flex-1 min-w-0">
// //                       <div className="flex justify-between items-start mb-1">
// //                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 truncate">
// //                           {job.title}
// //                         </h3>
// //                         <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg text-sm">
// //                           {job.salary}
// //                         </span>
// //                       </div>
                      
// //                       <p className="text-gray-600 font-medium mb-4">{job.companyName}</p>

// //                       <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
// //                         <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.address}</span>
// //                         <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.typeOfJob}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { Briefcase, MapPin, DollarSign, LogOut, Plus, Search, Clock, Building2, ChevronRight } from "lucide-react";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import { toast } from "sonner";

// import { SearchBar } from './SearchBar';
// import { FilterSidebar } from './FilterSidebar';
// import logo from "./image.png";

// // Khớp interface với JobEntity backend
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
//   deadlineApply: string;
//   status: string;
//   logoUrl?: string; // Thêm trường logo nếu backend có trả về
// }

// export default function JobsPage() {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isAddJobOpen, setIsAddJobOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
  
//   const [filters, setFilters] = useState({
//     location: '', 
//     jobType: '',
//     salaryRange: '',
//     experience: ''
//   });

//   const [newJob, setNewJob] = useState({
//     title: "",
//     companyName: "",
//     address: "",
//     salary: "",
//     description: "",
//     benefit: "",
//     requirement: "",
//     typeOfJob: "FULL_TIME" 
//   });

//   useEffect(() => {
//     const userData = localStorage.getItem("currentUser");
//     if (!userData) {
//       navigate("/login");
//       return;
//     }
//     setCurrentUser(JSON.parse(userData));
//     fetchJobs();
//   }, [navigate]);

//   const fetchJobs = async () => {
//     setLoading(true);
//     try {
//       const authData = localStorage.getItem("authData"); 
//       const response = await fetch("http://localhost:8080/api/jobs", {
//         headers: {
//           "Authorization": `Basic ${authData}`
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setJobs(data);
//       } else {
//         toast.error("Không thể lấy danh sách công việc");
//       }
//     } catch (error) {
//       console.error("Lỗi:", error);
//       toast.error("Không thể kết nối đến máy chủ");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddJob = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const authData = localStorage.getItem("authData");
//       const response = await fetch("http://localhost:8080/api/jobs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Basic ${authData}`
//         },
//         body: JSON.stringify({
//           ...newJob,
//           status: "OPEN" 
//         })
//       });

//       if (response.ok) {
//         toast.success("Đăng tin thành công!");
//         setIsAddJobOpen(false);
//         fetchJobs(); 
//       } else {
//         toast.error("Lỗi khi đăng tin");
//       }
//     } catch (error) {
//       toast.error("Máy chủ không phản hồi");
//     }
//   };

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch =
//       job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesLocation = !filters.location || job.address === filters.location;
//     const matchesJobType = !filters.jobType || job.typeOfJob === filters.jobType;

//     return matchesSearch && matchesLocation && matchesJobType;
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("authData");
//     navigate("/login");
//   };

//   if (!currentUser) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
//       <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
//         {/* Nới rộng Header lên 1440px */}
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <img src={logo} alt="JobFinder" className="h-10 w-10 object-contain" />
//             <div>
//               <Link to="/" className="text-2xl font-bold text-blue-600 block">JobFinder</Link>
//               <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
//                 <span>{currentUser.username}</span>
//                 <Badge className="bg-blue-100 text-blue-700 shadow-none text-[10px] h-4 font-bold border-none px-2 uppercase tracking-tight">
//                   {currentUser.role === "recruiter" ? "Recruiter" : "Candidate"}
//                 </Badge>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             {currentUser.role === "recruiter" && (
//               <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
//                 <DialogTrigger asChild>
//                   <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 font-semibold transition-all active:scale-95 shadow-lg shadow-blue-100">
//                     <Plus className="mr-2 h-4 w-4" /> Đăng tin mới
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl p-8">
//                   <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold">Tạo tin tuyển dụng</DialogTitle>
//                     <DialogDescription>Dữ liệu này sẽ được lưu trực tiếp vào JobEntity Backend.</DialogDescription>
//                   </DialogHeader>
//                   <form onSubmit={handleAddJob} className="space-y-5 pt-4">
//                     <div className="grid gap-5">
//                       <div className="space-y-2">
//                         <Label className="font-semibold text-gray-700">Vị trí tuyển dụng</Label>
//                         <Input className="rounded-xl h-11" placeholder="VD: Senior React Developer" onChange={e => setNewJob({...newJob, title: e.target.value})} required />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="font-semibold text-gray-700">Tên công ty</Label>
//                         <Input className="rounded-xl h-11" placeholder="Tên công ty" onChange={e => setNewJob({...newJob, companyName: e.target.value})} required />
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label className="font-semibold text-gray-700">Địa điểm</Label>
//                           <Input className="rounded-xl h-11" placeholder="Hà Nội..." onChange={e => setNewJob({...newJob, address: e.target.value})} required />
//                         </div>
//                         <div className="space-y-2">
//                           <Label className="font-semibold text-gray-700">Mức lương</Label>
//                           <Input className="rounded-xl h-11" placeholder="15-20 triệu" onChange={e => setNewJob({...newJob, salary: e.target.value})} required />
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="font-semibold text-gray-700">Mô tả</Label>
//                         <Textarea className="rounded-xl" rows={3} onChange={e => setNewJob({...newJob, description: e.target.value})} required />
//                       </div>
//                     </div>
//                     <Button type="submit" className="w-full bg-blue-600 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700">Xác nhận đăng tin</Button>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             )}
//             <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full h-11 w-11">
//               <LogOut className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Nới rộng Main Content lên 1440px */}
//       <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full">
//         <div className="mb-12">
//           <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
//           <aside className="lg:col-span-1">
//              <div className="sticky top-28">
//                 <FilterSidebar filters={filters} setFilters={setFilters} />
//              </div>
//           </aside>

//           {/* Danh sách Job nới rộng Padding p-8 và khoảng cách space-y-6 */}
//           <div className="lg:col-span-3 space-y-6">
//             {loading ? (
//                 <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   <p className="font-medium italic">Đang tải dữ liệu từ Backend...</p>
//                 </div>
//             ) : (
//               filteredJobs.map((job) => (
//                 <Link 
//                   key={job.id} 
//                   to={`/jobs/${job.id}`} 
//                   className="group block bg-white border border-gray-100 rounded-[28px] p-8 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:border-blue-200 transition-all duration-300"
//                 >
//                   <div className="flex items-center gap-8">
//                     {/* KHUNG BIỂU TƯỢNG CÔNG TY */}
//                     <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-100 group-hover:bg-blue-50 transition-colors shrink-0">
//                       {job.logoUrl ? (
//                         <img src={job.logoUrl} alt={job.companyName} className="w-full h-full object-contain" />
//                       ) : (
//                         <Building2 className="w-10 h-10 text-blue-500" />
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
//                           {job.title}
//                         </h3>
//                         <span className="text-blue-600 font-extrabold bg-blue-50 px-4 py-1.5 rounded-xl text-sm whitespace-nowrap">
//                           {job.salary}
//                         </span>
//                       </div>
                      
//                       <p className="text-gray-600 font-semibold mb-6 flex items-center gap-2">
//                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
//                          {job.companyName}
//                       </p>

//                       <div className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-50">
//                         <div className="flex flex-wrap gap-8 text-sm text-gray-500 font-medium">
//                           <span className="flex items-center gap-2">
//                             <MapPin className="w-4.5 h-4.5 text-gray-400" /> 
//                             {job.address}
//                           </span>
//                           <span className="flex items-center gap-2">
//                             <Briefcase className="w-4.5 h-4.5 text-gray-400" /> 
//                             {job.typeOfJob}
//                           </span>
//                         </div>
                        
//                         <div className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
//                           Chi tiết <ChevronRight className="w-5 h-5" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             )}
            
//             {!loading && filteredJobs.length === 0 && (
//               <div className="bg-white rounded-[32px] p-24 text-center border-2 border-dashed border-gray-100">
//                 <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
//                 <p className="text-gray-400 font-medium">Không tìm thấy công việc nào phù hợp với yêu cầu của bạn.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Briefcase, MapPin, DollarSign, LogOut, Plus, Search, Clock, Building2, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

import { SearchBar } from './SearchBar';
import { FilterSidebar } from './FilterSidebar';
import logo from "./image.png";

// Khớp interface với JobEntity backend
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
  deadlineApply: string;
  status: string;
  logoUrl?: string; // Thêm trường logo nếu backend có trả về
}

export default function JobsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    location: '', 
    jobType: '',
    salaryRange: '',
    experience: ''
  });

  const [newJob, setNewJob] = useState({
    title: "",
    companyName: "",
    address: "",
    salary: "",
    description: "",
    benefit: "",
    requirement: "",
    typeOfJob: "FULL_TIME" 
  });

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (!userData) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(userData));
    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const authData = localStorage.getItem("authData"); 
      const response = await fetch("http://localhost:8080/api/jobs", {
        headers: {
          "Authorization": `Basic ${authData}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        toast.error("Không thể lấy danh sách công việc");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authData = localStorage.getItem("authData");
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${authData}`
        },
        body: JSON.stringify({
          ...newJob,
          status: "OPEN" 
        })
      });

      if (response.ok) {
        toast.success("Đăng tin thành công!");
        setIsAddJobOpen(false);
        fetchJobs(); 
      } else {
        toast.error("Lỗi khi đăng tin");
      }
    } catch (error) {
      toast.error("Máy chủ không phản hồi");
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !filters.location || job.address === filters.location;
    const matchesJobType = !filters.jobType || job.typeOfJob === filters.jobType;

    return matchesSearch && matchesLocation && matchesJobType;
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authData");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
        {/* Nới rộng Header lên 1440px */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="JobFinder" className="h-10 w-10 object-contain" />
            <div>
              <Link to="/" className="text-2xl font-bold text-blue-600 block">JobFinder</Link>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <span>{currentUser.username}</span>
                <Badge className="bg-blue-100 text-blue-700 shadow-none text-[10px] h-4 font-bold border-none px-2 uppercase tracking-tight">
                  {currentUser.role === "recruiter" ? "Recruiter" : "Candidate"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === "recruiter" && (
              <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 font-semibold transition-all active:scale-95 shadow-lg shadow-blue-100">
                    <Plus className="mr-2 h-4 w-4" /> Đăng tin mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Tạo tin tuyển dụng</DialogTitle>
                    <DialogDescription>Dữ liệu này sẽ được lưu trực tiếp vào JobEntity Backend.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddJob} className="space-y-5 pt-4">
                    <div className="grid gap-5">
                      <div className="space-y-2">
                        <Label className="font-semibold text-gray-700">Vị trí tuyển dụng</Label>
                        <Input className="rounded-xl h-11" placeholder="VD: Senior React Developer" onChange={e => setNewJob({...newJob, title: e.target.value})} required />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold text-gray-700">Tên công ty</Label>
                        <Input className="rounded-xl h-11" placeholder="Tên công ty" onChange={e => setNewJob({...newJob, companyName: e.target.value})} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-semibold text-gray-700">Địa điểm</Label>
                          <Input className="rounded-xl h-11" placeholder="Hà Nội..." onChange={e => setNewJob({...newJob, address: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold text-gray-700">Mức lương</Label>
                          <Input className="rounded-xl h-11" placeholder="15-20 triệu" onChange={e => setNewJob({...newJob, salary: e.target.value})} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold text-gray-700">Mô tả</Label>
                        <Textarea className="rounded-xl" rows={3} onChange={e => setNewJob({...newJob, description: e.target.value})} required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 py-6 text-lg font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700">Xác nhận đăng tin</Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full h-11 w-11">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Nới rộng Main Content lên 1440px */}
      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full">
        <div className="mb-12">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-[32%] shrink-0">
             <div className="sticky top-28">
                <FilterSidebar filters={filters} setFilters={setFilters} />
             </div>
          </aside>

          {/* Danh sách Job với kích thước cân đối hơn */}
          <div className="flex-1 space-y-5">
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="font-medium italic">Đang tải dữ liệu từ Backend...</p>
                </div>
            ) : (
              filteredJobs.map((job) => (
                <Link 
                  key={job.id} 
                  to={`/jobs/${job.id}`} 
                  className="group block bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.08)] hover:border-blue-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    {/* KHUNG BIỂU TƯỢNG CÔNG TY */}
                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-3 border border-gray-100 group-hover:bg-blue-50 transition-colors shrink-0">
                      {job.logoUrl ? (
                        <img src={job.logoUrl} alt={job.companyName} className="w-full h-full object-contain" />
                      ) : (
                        <Building2 className="w-8 h-8 text-blue-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1.5">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {job.title}
                        </h3>
                        <span className="text-blue-600 font-extrabold bg-blue-50 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                          {job.salary}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 font-semibold mb-4 flex items-center gap-2 text-sm">
                         <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                         {job.companyName}
                      </p>

                      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" /> 
                            {job.address}
                          </span>
                          <span className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-400" /> 
                            {job.typeOfJob}
                          </span>
                        </div>
                        
                        <div className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Chi tiết <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
            
            {!loading && filteredJobs.length === 0 && (
              <div className="bg-white rounded-[40px] p-24 text-center border-2 border-dashed border-gray-100">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Không tìm thấy công việc nào phù hợp với yêu cầu của bạn.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}