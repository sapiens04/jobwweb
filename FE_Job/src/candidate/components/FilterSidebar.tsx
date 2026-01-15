import { MapPin, Briefcase, DollarSign, TrendingUp, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    location: string;
    jobType: string;
    salaryRange: string;
    experience: string;
  };
  setFilters: (filters: any) => void;
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const locations = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'];
  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Contract'];
  const salaryRanges = ['10-15 triệu', '15-20 triệu', '20-30 triệu', '30-40 triệu'];
  const experiences = ['0-1 năm', '1-3 năm', '3-5 năm', '5+ năm'];

  const clearFilters = () => {
    setFilters({
      location: '',
      jobType: '',
      salaryRange: '',
      experience: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Bộ lọc</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Xóa
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <h3>Địa điểm</h3>
          </div>
          <div className="space-y-2">
            {locations.map(location => (
              <label key={location} className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  checked={filters.location === location}
                  onChange={() => setFilters({ ...filters, location: filters.location === location ? '' : location })}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <h3>Loại công việc</h3>
          </div>
          <div className="space-y-2">
            {jobTypes.map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="jobType"
                  checked={filters.jobType === type}
                  onChange={() => setFilters({ ...filters, jobType: filters.jobType === type ? '' : type })}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <h3>Mức lương</h3>
          </div>
          <div className="space-y-2">
            {salaryRanges.map(range => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  name="salaryRange"
                  checked={filters.salaryRange === range}
                  onChange={() => setFilters({ ...filters, salaryRange: filters.salaryRange === range ? '' : range })}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <h3>Kinh nghiệm</h3>
          </div>
          <div className="space-y-2">
            {experiences.map(exp => (
              <label key={exp} className="flex items-center">
                <input
                  type="radio"
                  name="experience"
                  checked={filters.experience === exp}
                  onChange={() => setFilters({ ...filters, experience: filters.experience === exp ? '' : exp })}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{exp}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
