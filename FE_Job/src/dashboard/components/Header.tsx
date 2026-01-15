// import { Bell, Search } from 'lucide-react';

// export function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 max-w-xl">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Tìm kiếm ứng viên, tin tuyển dụng..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>
        
//         <div className="flex items-center gap-4 ml-6">
//           <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//             <Bell className="w-6 h-6" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>
          
//           <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
//               <span>NTD</span>
//             </div>
//             <div>
//               <div className="text-gray-900">Nguyễn Văn A</div>
//               <div className="text-gray-500 text-sm">Nhà tuyển dụng</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { useState, useEffect } from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu user đã lưu khi đăng nhập thành công
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm ứng viên, tin tuyển dụng..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 ml-6">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            {/* Hiển thị Avatar dựa trên chữ cái đầu của tên */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              <span>{currentUser?.username?.charAt(0).toUpperCase() || "U"}</span>
            </div>
            
            <div className="mr-4">
              {/* Hiển thị Username từ Database */}
              <div className="font-semibold text-gray-900">
                {currentUser?.username || "Guest"}
              </div>
              {/* Hiển thị Vai trò từ Database */}
              <div className="text-gray-500 text-sm italic">
                {currentUser?.role === "EMPLOYER" ? "Nhà tuyển dụng" : "Thành viên"}
              </div>
            </div>

            {/* Nút đăng xuất nhanh */}
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}