import { X, MapPin, Briefcase, DollarSign, Clock, CheckCircle, Award } from 'lucide-react';
import { useState } from 'react';
import { Job } from '../data/jobsData';
import { ApplicationModal } from './ApplicationModal';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

export function JobModal({ job, onClose }: JobModalProps) {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-gray-900">
              Chi tiết công việc
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img 
                src={job.logo} 
                alt={job.company}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h1 className="text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-gray-600 mb-3">
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
            
            <div className="mb-6">
              <button 
                onClick={handleApply}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ứng tuyển ngay
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-3">
                  Mô tả công việc
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">
                    Yêu cầu công việc
                  </h3>
                </div>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900">
                    Quyền lợi
                  </h3>
                </div>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Kinh nghiệm yêu cầu:</span>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm inline-block">
                  {job.experience}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <button 
                onClick={handleApply}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ứng tuyển ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      {showApplicationModal && (
        <ApplicationModal
          job={job}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </>
  );
}