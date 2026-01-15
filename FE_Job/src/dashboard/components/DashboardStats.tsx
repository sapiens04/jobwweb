// import { Briefcase, Users, UserCheck, TrendingUp } from 'lucide-react';
// import { useData } from '../contexts/DataContext';

// export function DashboardStats() {
//   const { jobs, candidates } = useData();

//   const activeJobs = jobs.filter(job => job.status === 'active').length;
//   const totalCandidates = candidates.length;
//   const hiredCandidates = candidates.filter(c => c.status === 'hired').length;
//   const conversionRate = totalCandidates > 0 ? ((hiredCandidates / totalCandidates) * 100).toFixed(1) : '0.0';

//   const stats = [
//     {
//       label: 'Tin Đang Tuyển',
//       value: activeJobs.toString(),
//       change: '+3 tuần này',
//       trend: 'up',
//       icon: Briefcase,
//       color: 'blue',
//     },
//     {
//       label: 'Tổng Ứng Viên',
//       value: totalCandidates.toString(),
//       change: '+127 tuần này',
//       trend: 'up',
//       icon: Users,
//       color: 'green',
//     },
//     {
//       label: 'Đã Tuyển Dụng',
//       value: hiredCandidates.toString(),
//       change: '+12 tháng này',
//       trend: 'up',
//       icon: UserCheck,
//       color: 'purple',
//     },
//     {
//       label: 'Tỷ Lệ Chuyển Đổi',
//       value: `${conversionRate}%`,
//       change: '+0.8% so với tháng trước',
//       trend: 'up',
//       icon: TrendingUp,
//       color: 'orange',
//     },
//   ];

//   const colorClasses = {
//     blue: 'bg-blue-100 text-blue-600',
//     green: 'bg-green-100 text-green-600',
//     purple: 'bg-purple-100 text-purple-600',
//     orange: 'bg-orange-100 text-orange-600',
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {stats.map((stat, index) => {
//         const Icon = stat.icon;
//         return (
//           <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
//             <div className="flex items-start justify-between mb-4">
//               <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
//                 <Icon className="w-6 h-6" />
//               </div>
//             </div>
//             <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
//             <div className="text-gray-900 mb-2">{stat.value}</div>
//             <div className="text-green-600 text-sm flex items-center gap-1">
//               <TrendingUp className="w-4 h-4" />
//               {stat.change}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { Briefcase, Users, UserCheck, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu trả về từ API
interface EmployerStats {
  activeJobs: number;
  totalCandidates: number;
  hiredCandidates: number;
  conversionRate: number;
}

export function DashboardStats() {
  const [statsData, setStatsData] = useState<EmployerStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    const authData = localStorage.getItem("authData");
    try {
      // Gọi API thống kê dành cho Nhà tuyển dụng
      const response = await fetch("http://localhost:8080/api/stats/employer", {
        headers: {
          "Authorization": `Basic ${authData}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStatsData(data);
      }
    } catch (error) {
      console.error("Lỗi lấy thống kê:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="grid grid-cols-4 gap-6">Loading...</div>;

  // Cấu hình các thẻ hiển thị
  const stats = [
    {
      label: 'Tin Đang Tuyển',
      value: statsData?.activeJobs.toString() || '0',
      icon: Briefcase,
      color: 'blue',
    },
    {
      label: 'Tổng Ứng Viên',
      value: statsData?.totalCandidates.toString() || '0',
      icon: Users,
      color: 'green',
    },
    {
      label: 'Đã Gửi Thư Mời',
      value: statsData?.hiredCandidates.toString() || '0',
      icon: UserCheck,
      color: 'purple',
    },
    {
      label: 'Tỷ Lệ Chuyển Đổi',
      value: `${statsData?.conversionRate || 0}%`,
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-gray-600 text-sm mb-1 font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-green-600 text-sm flex items-center gap-1">
              <span className="font-medium">{stat.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
