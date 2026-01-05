import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, CheckCircle, Award, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { jobsData } from '../data/jobsData';
import { ApplicationModal } from '../components/ApplicationModal';

export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobsData.find(j => j.id === jobId);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-gray-900 mb-4">Không tìm thấy công việc</h2>
        <Link to="/jobs" className="text-blue-600 hover:text-blue-700">
          Quay lại danh sách công việc
        </Link>
      </div>
    );
  }

  const relatedJobs = jobsData
    .filter(j => j.id !== job.id && (j.location === job.location || j.type === job.type))
    .slice(0, 3);

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  return (
    <>
      <div className="bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={job.logo} 
                    alt={job.company}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h1 className="text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <p className="text-gray-600 mb-4">
                      {job.company}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-gray-500">
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
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleApply}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ứng tuyển ngay
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-gray-900 mb-4">
                  Mô tả công việc
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h2 className="text-gray-900">
                    Yêu cầu công việc
                  </h2>
                </div>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h2 className="text-gray-900">
                    Quyền lợi
                  </h2>
                </div>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Job Overview */}
              <div className="bg-white rounded-lg shadow p-6 sticky top-24 self-start">
                <h3 className="text-gray-900 mb-4">
                  Thông tin chung
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-500 mb-1">Kinh nghiệm</div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm inline-block">
                      {job.experience}
                    </span>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Mức lương</div>
                    <div className="text-gray-900">{job.salaryRange}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Loại công việc</div>
                    <div className="text-gray-900">{job.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Địa điểm</div>
                    <div className="text-gray-900">{job.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Ngày đăng</div>
                    <div className="text-gray-900">{job.postedDate}</div>
                  </div>
                </div>

                <button
                  onClick={handleApply}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ứng tuyển ngay
                </button>
              </div>
            </div>
          </div>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-gray-900 mb-6">
                Công việc liên quan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedJobs.map(relatedJob => (
                  <Link
                    key={relatedJob.id}
                    to={`/jobs/${relatedJob.id}`}
                    className="block bg-white rounded-lg shadow hover:shadow-lg transition-all p-6"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <img 
                        src={relatedJob.logo} 
                        alt={relatedJob.company}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 mb-1 line-clamp-2">
                          {relatedJob.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-1">
                          {relatedJob.company}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{relatedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{relatedJob.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-blue-600">
                        {relatedJob.salaryRange}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {relatedJob.experience}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <ApplicationModal
          job={job}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </>
  );
}