import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { jobsData } from '../data/jobsData';

export function HomePage() {
  const featuredJobs = jobsData.slice(0, 6);
  const stats = [
    { label: 'Công việc đang tuyển', value: '1,000+', icon: Briefcase },
    { label: 'Công ty đối tác', value: '200+', icon: MapPin },
    { label: 'Ứng viên thành công', value: '5,000+', icon: TrendingUp },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6">
              Tìm Công Việc Mơ Ước Của Bạn
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu. 
              Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5" />
              Khám phá việc làm
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900 mb-2">
                Việc làm nổi bật
              </h2>
              <p className="text-gray-600">
                Các cơ hội việc làm hot nhất hiện nay
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              Xem tất cả
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={job.logo} 
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-blue-600">
                    {job.salaryRange}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {job.experience}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gray-100 mb-4">
            Sẵn sàng tìm việc?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Đăng ký ngay để nhận thông báo về các cơ hội việc làm phù hợp với bạn
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Bắt đầu ngay
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
