import { LayoutDashboard, Briefcase, Users, BarChart3, Settings, Calendar } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'jobs', label: 'Tin Tuyển Dụng', icon: Briefcase },
    { id: 'candidates', label: 'Ứng Viên', icon: Users },
    { id: 'calendar', label: 'Lịch Phỏng Vấn', icon: Calendar },
    { id: 'analytics', label: 'Phân Tích', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-blue-600">RecruiterPro</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span>Cài Đặt</span>
        </button>
      </div>
    </div>
  );
}