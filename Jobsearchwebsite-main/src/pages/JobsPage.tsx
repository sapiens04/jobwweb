import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { FilterSidebar } from '../components/FilterSidebar';
import { jobsData } from '../data/jobsData';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

export function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    salaryRange: '',
    experience: ''
  });

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesJobType = !filters.jobType || job.type === filters.jobType;
    const matchesSalary = !filters.salaryRange || job.salaryRange === filters.salaryRange;
    const matchesExperience = !filters.experience || job.experience === filters.experience;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary && matchesExperience;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-gray-900 mb-2">
            Tất cả công việc
          </h1>
          <p className="text-gray-600">
            Khám phá các cơ hội việc làm phù hợp với bạn
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          
          <main className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Tìm thấy <span className="text-blue-600">{filteredJobs.length}</span> công việc
              </p>
            </div>
            
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={job.logo} 
                      alt={job.company}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {job.company}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salaryRange}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {job.experience}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{job.postedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500">Không tìm thấy công việc phù hợp</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
