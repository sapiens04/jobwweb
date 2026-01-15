// import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
// interface JobCardProps {
//   job: Job;
//   onClick: () => void;
// }

// export function JobCard({ job, onClick }: JobCardProps) {
//   return (
//     <div 
//       onClick={onClick}
//       className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6"
//     >
//       <div className="flex items-start gap-4">
//         <img 
//           src={job.logo} 
//           alt={job.company}
//           className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
//         />
        
//         <div className="flex-1 min-w-0">
//           <h3 className="text-gray-900 mb-1">
//             {job.title}
//           </h3>
//           <p className="text-gray-600 mb-3">
//             {job.company}
//           </p>
          
//           <div className="flex flex-wrap gap-4 text-gray-500 mb-3">
//             <div className="flex items-center gap-1">
//               <MapPin className="w-4 h-4" />
//               <span>{job.location}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Briefcase className="w-4 h-4" />
//               <span>{job.type}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <DollarSign className="w-4 h-4" />
//               <span>{job.salaryRange}</span>
//             </div>
//           </div>
          
//           <p className="text-gray-600 line-clamp-2 mb-3">
//             {job.description}
//           </p>
          
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                 {job.experience}
//               </span>
//             </div>
//             <div className="flex items-center gap-1 text-gray-400 text-sm">
//               <Clock className="w-4 h-4" />
//               <span>{job.postedDate}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
