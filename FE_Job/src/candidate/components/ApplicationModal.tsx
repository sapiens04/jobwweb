// import { useState } from 'react';
// import { X, Upload, FileText, CheckCircle } from 'lucide-react';
// import { Job } from '../data/jobsData';

// interface ApplicationModalProps {
//   job: Job;
//   onClose: () => void;
// }

// export function ApplicationModal({ job, onClose }: ApplicationModalProps) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     location: '',
//     cvFile: null as File | null
//   });
//   const [isDragging, setIsDragging] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, cvFile: file }));
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
//       setFormData(prev => ({ ...prev, cvFile: file }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");
//       const authData = localStorage.getItem("authData");

//       const applicationData = {
//         job: { id: job.id },
//         user: { id: userData.id },
//         fullName: formData.fullName,
//         email: formData.email,
//         phoneNumber: formData.phone, // Frontend gửi phoneNumber khớp với Entity Java (phone_number)
//         status: "PENDING",
//         note: "Ứng tuyển qua website"
//       };

//       const response = await fetch("http://localhost:8080/api/applications", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Basic ${authData}`
//         },
//         body: JSON.stringify(applicationData)
//       });

//       if (response.ok) {
//         setIsSubmitted(true);
//         toast.success("Hồ sơ đã được nộp thành công!");
//         setTimeout(() => onClose(), 2000);
//       } else {
//         toast.error("Có lỗi xảy ra khi nộp hồ sơ");
//       }
//     } catch (error) {
//       toast.error("Không thể kết nối đến máy chủ");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isFormValid = formData.fullName && formData.email && formData.phone && formData.cvFile;

//   if (isSubmitted) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
//           <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-8 h-8 text-blue-600" />
//           </div>
//           <h2 className="text-gray-900 mb-2">Ứng tuyển thành công!</h2>
//           <p className="text-gray-600">
//             Hồ sơ của bạn đã được gửi đến nhà tuyển dụng. 
//             Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-gray-900 mb-1">
//               Ứng tuyển {job.title}
//             </h2>
//             <p className="text-gray-600">{job.company}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {/* CV Upload Section */}
//           <div className="mb-6">
//             <div className="flex items-center gap-2 mb-3">
//               <FileText className="w-5 h-5 text-blue-600" />
//               <h3 className="text-gray-900">Chọn CV để ứng tuyển</h3>
//             </div>

//             <div
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//               className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                 isDragging 
//                   ? 'border-blue-600 bg-blue-50' 
//                   : formData.cvFile 
//                   ? 'border-blue-600 bg-blue-50'
//                   : 'border-gray-300 hover:border-gray-400'
//               }`}
//             >
//               {formData.cvFile ? (
//                 <div>
//                   <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
//                   <p className="text-gray-900 mb-1">{formData.cvFile.name}</p>
//                   <p className="text-gray-500 text-sm mb-3">
//                     {(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                   <label className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
//                     Thay đổi file
//                     <input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               ) : (
//                 <div>
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                   <p className="text-gray-600 mb-2">
//                     Tải lên CV từ máy tính, chọn hoặc kéo thả
//                   </p>
//                   <p className="text-gray-400 text-sm mb-4">
//                     Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB
//                   </p>
//                   <label className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
//                     Chọn CV
//                     <input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Personal Information */}
//           <div className="mb-6">
//             <h3 className="text-gray-900 mb-1">
//               Vui lòng nhập đầy đủ thông tin chi tiết:
//             </h3>
//             <p className="text-red-500 text-sm mb-4">(*) Thông tin bắt buộc</p>

//             <div className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Họ và tên <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   placeholder="Họ tên hiển thị với NTD"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               {/* Email and Phone */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 mb-2">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Email hiện tại của NTD"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">
//                     Số điện thoại <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Số điện thoại hiện tại của NTD"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Location Preference */}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Hủy
//             </button>
//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Nộp hồ sơ ứng tuyển
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Định nghĩa Interface Job để đồng bộ dữ liệu với Backend
interface Job {
  id: number;
  title: string;
  companyName: string;
}

interface ApplicationModalProps {
  job: Job;
  onClose: () => void;
}

export function ApplicationModal({ job, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cvFile: null as File | null
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData(prev => ({ ...prev, cvFile: file }));
  };

  // Logic xử lý Drag & Drop
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFormData(prev => ({ ...prev, cvFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cvFile) return;

    setIsSubmitting(true);
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const authData = localStorage.getItem("authData");

    try {
      // Sử dụng FormData để gửi file
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phone);
      data.append("jobId", job.id.toString());
      data.append("username", savedUser.username); // Gửi username để BE tìm ID
      data.append("file", formData.cvFile); // File CV thật

      const response = await fetch("http://localhost:8080/api/applications", {
        method: "POST",
        headers: {
          // LƯU Ý: Không để Content-Type là application/json ở đây
          "Authorization": `Basic ${authData}`
        },
        body: data
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Hồ sơ và CV đã được nộp!");
        setTimeout(() => onClose(), 2000);
      } else {
        toast.error("Lỗi khi gửi hồ sơ");
      }
    } catch (error) {
      toast.error("Không thể kết nối server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.cvFile;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center shadow-xl">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-gray-900 font-bold text-xl mb-2">Ứng tuyển thành công!</h2>
          <p className="text-gray-600">
            Hồ sơ của bạn đã được gửi thành công. Nhà tuyển dụng sẽ sớm liên hệ với bạn.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ứng tuyển vị trí</h2>
            <p className="text-blue-600 font-medium">{job.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* CV Upload */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Chọn CV để ứng tuyển *</h3>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                formData.cvFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'
              }`}
            >
              {formData.cvFile ? (
                <div className="flex flex-col items-center">
                  <FileText className="w-12 h-12 text-blue-600 mb-2" />
                  <p className="text-blue-800 font-medium truncate max-w-xs">{formData.cvFile.name}</p>
                  <label className="mt-2 text-xs text-blue-600 cursor-pointer hover:underline">
                    Thay đổi file <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                  </label>
                </div>
              ) : (
                <div>
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Tải lên CV từ máy tính hoặc kéo thả</p>
                  <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX (Tối đa 5MB)</p>
                  <label className="mt-4 inline-block bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 cursor-pointer font-bold transition-colors">
                    Chọn file
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Form Thông tin cá nhân */}
          <div className="space-y-5 mb-8">
            <h3 className="font-semibold text-gray-800 border-l-4 border-blue-600 pl-3">Thông tin cá nhân</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
              <input
                type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nguyễn Văn A" required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="email@example.com" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="09xxx" required
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button" onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit" disabled={!isFormValid || isSubmitting}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang nộp hồ sơ..." : "Nộp hồ sơ ngay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
