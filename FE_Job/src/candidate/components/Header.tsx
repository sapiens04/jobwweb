// import { Link, useLocation } from 'react-router-dom';
// import { Briefcase, Home, Search, LogIn } from 'lucide-react';

// export function Header() {
//   const location = useLocation();
  
//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="flex items-center gap-2">
//             <Briefcase className="w-8 h-8 text-blue-600" />
//             <span className="text-gray-900">JobFinder</span>
//           </Link>
          
//           <nav className="flex items-center gap-6">
//             <Link
//               to="/"
//               className={`flex items-center gap-2 transition-colors ${
//                 isActive('/') 
//                   ? 'text-blue-600' 
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               <Home className="w-5 h-5" />
//               <span>Trang chủ</span>
//             </Link>
//             <Link
//               to="/jobs"
//               className={`flex items-center gap-2 transition-colors ${
//                 isActive('/jobs') 
//                   ? 'text-blue-600'  
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               <LogIn className="w-5 h-5" />
//               <span>Đăng nhập</span>
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }


// import { Link, useLocation } from 'react-router-dom';
// import { Briefcase, Home, LogIn } from 'lucide-react';

// export function Header() {
//   const location = useLocation();
  
//   const isActive = (path: string) => location.pathname === path;

//   return (
//     // Thêm backdrop-blur để tạo hiệu ứng kính mờ hiện đại
//     <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo với hiệu ứng Hover */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
//               <Briefcase className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
//               JobFinder
//             </span>
//           </Link>
          
//           <nav className="flex items-center gap-2">
//             {/* Trang chủ */}
//             <Link
//               to="/"
//               className={`relative px-4 py-2 flex items-center gap-2 font-medium transition-all rounded-lg ${
//                 isActive('/') 
//                   ? 'text-blue-600 bg-blue-50' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//             >
//               <Home className="w-4 h-4" />
//               <span>Trang chủ</span>
//               {isActive('/') && (
//                 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 rounded-full" />
//               )}
//             </Link>

//             {/* Phân tách nhẹ giữa các menu */}
//             <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block" />

//             {/* Nút Đăng nhập kiểu Call to Action */}
//             <Link
//               to="/login"
//               className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
//             >
//               <LogIn className="w-4 h-4" />
//               <span>Đăng nhập</span>
//             </Link>
//           </nav>

//         </div>
//       </div>
//     </header>
//   );
// }

import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Home, LogIn } from 'lucide-react';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    // Sử dụng nền trong suốt kết hợp Blur để không bị bóp nghẹt không gian
    <header className="bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - shrink-0 đảm bảo ảnh/icon không bị ép kích thước */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform duration-300 shrink-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Job<span className="text-blue-600">Finder</span>
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-3">
            {/* Link Trang chủ */}
            <Link
              to="/"
              className={`group relative px-4 py-2 flex items-center gap-2 font-semibold transition-all duration-200 rounded-xl ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50/50' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home className={`w-5 h-5 shrink-0 ${isActive('/') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
              <span className="hidden sm:block">Trang chủ</span>
              
              {/* Indicator mượt mà phía dưới */}
              {isActive('/') && (
                <div className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.4)]" />
              )}
            </Link>

            {/* Vạch phân cách mảnh */}
            <div className="w-px h-5 bg-gray-200 mx-1 hidden sm:block" />

            {/* Nút Đăng nhập - Thiết kế kiểu Capsule chuyên nghiệp */}
            <Link
              to="/login"
              className="ml-2 flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all duration-300 active:scale-95 shrink-0"
            >
              <LogIn className="w-4 h-4 shrink-0" />
              <span>Đăng nhập</span>
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}