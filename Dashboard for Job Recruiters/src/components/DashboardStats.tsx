import { Briefcase, Users, UserCheck, TrendingUp } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export function DashboardStats() {
  const { jobs, candidates } = useData();

  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const totalCandidates = candidates.length;
  const hiredCandidates = candidates.filter(c => c.status === 'hired').length;
  const conversionRate = totalCandidates > 0 ? ((hiredCandidates / totalCandidates) * 100).toFixed(1) : '0.0';

  const stats = [
    {
      label: 'Tin Đang Tuyển',
      value: activeJobs.toString(),
      change: '+3 tuần này',
      trend: 'up',
      icon: Briefcase,
      color: 'blue',
    },
    {
      label: 'Tổng Ứng Viên',
      value: totalCandidates.toString(),
      change: '+127 tuần này',
      trend: 'up',
      icon: Users,
      color: 'green',
    },
    {
      label: 'Đã Tuyển Dụng',
      value: hiredCandidates.toString(),
      change: '+12 tháng này',
      trend: 'up',
      icon: UserCheck,
      color: 'purple',
    },
    {
      label: 'Tỷ Lệ Chuyển Đổi',
      value: `${conversionRate}%`,
      change: '+0.8% so với tháng trước',
      trend: 'up',
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
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
            <div className="text-gray-900 mb-2">{stat.value}</div>
            <div className="text-green-600 text-sm flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {stat.change}
            </div>
          </div>
        );
      })}
    </div>
  );
}