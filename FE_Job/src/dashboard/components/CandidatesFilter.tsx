import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface CandidatesFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  position: string;
  status: string;
  experience: string;
  location: string;
}

export function CandidatesFilter({ onFilterChange }: CandidatesFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    position: 'all',
    status: 'all',
    experience: 'all',
    location: 'all',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      position: 'all',
      status: 'all',
      experience: 'all',
      location: 'all',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = 
    filters.search || 
    filters.position !== 'all' || 
    filters.status !== 'all' || 
    filters.experience !== 'all' || 
    filters.location !== 'all';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, vị trí..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
            showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-5 h-5" />
          Bộ lọc
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Vị trí</label>
            <select
              value={filters.position}
              onChange={(e) => handleFilterChange('position', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả vị trí</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="designer">UX/UI Designer</option>
              <option value="product">Product Manager</option>
              <option value="marketing">Marketing Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">Trạng thái</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="new">Mới</option>
              <option value="reviewing">Đang xem xét</option>
              <option value="shortlisted">Đạt vòng 1</option>
              <option value="interview">Đã hẹn phỏng vấn</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">Kinh nghiệm</label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="0-2">0-2 năm</option>
              <option value="2-5">2-5 năm</option>
              <option value="5-10">5-10 năm</option>
              <option value="10+">Trên 10 năm</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">Địa điểm</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả địa điểm</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
