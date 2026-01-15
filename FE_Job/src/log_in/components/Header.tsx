import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Home, Search } from 'lucide-react';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <span className="text-gray-900">JobFinder</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 transition-colors ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Trang chủ</span>
            </Link>
            <Link
              to="/jobs"
              className={`flex items-center gap-2 transition-colors ${
                isActive('/jobs') 
                  ? 'text-blue-600'  
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Tất cả công việc</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
