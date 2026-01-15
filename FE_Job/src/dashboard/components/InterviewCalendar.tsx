// import { ChevronLeft, ChevronRight, Clock, MapPin, Video } from 'lucide-react';
// import { useState } from 'react';
// import { useData } from '../contexts/DataContext';
// export function InterviewCalendar() {
//   const { interviews } = useData();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Mặc định chọn hôm nay

//   const getDaysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days = [];
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(new Date(year, month, i));
//     }
//     return days;
//   };

//   // Hàm lấy chuỗi ngày YYYY-MM-DD chuẩn địa phương (không bị lệch múi giờ)
//   const getLocalDateString = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const getInterviewsForDate = (date: Date | null) => {
//     if (!date) return [];
//     const dateString = getLocalDateString(date);
//     return interviews.filter(interview => interview.date === dateString);
//   };

//   const previousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const nextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const monthNames = [
//     'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
//     'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
//   ];

//   const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
//   const days = getDaysInMonth(currentDate);
  
//   // LOGIC SỬA TẠI ĐÂY: Tách biệt danh sách ngày chọn và danh sách sắp tới
//   const selectedDateInterviews = getInterviewsForDate(selectedDate);
  
//   // Chỉ lấy lịch sắp tới khi chưa chọn ngày nào hoặc muốn hiển thị tổng quan
//   const upcomingInterviews = [...interviews]
//     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//     .slice(0, 5);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Calendar Grid */}
//       <div className="lg:col-span-2">
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//             <h2 className="text-lg font-bold text-gray-900">
//               {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//             </h2>
//             <div className="flex items-center gap-2">
//               <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200">
//                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <button onClick={() => {
//                 const today = new Date();
//                 setCurrentDate(today);
//                 setSelectedDate(today);
//               }} className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-lg">
//                 Hôm nay
//               </button>
//               <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200">
//                 <ChevronRight className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="grid grid-cols-7 gap-2 mb-2">
//               {dayNames.map((day, index) => (
//                 <div key={index} className="text-center text-xs font-bold text-gray-400 py-2 uppercase">
//                   {day}
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-2">
//               {days.map((day, index) => {
//                 if (!day) return <div key={`empty-${index}`} className="aspect-square" />;

//                 const dayInterviews = getInterviewsForDate(day);
//                 const isToday = day.toDateString() === new Date().toDateString();
//                 const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

//                 return (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedDate(day)}
//                     className={`aspect-square p-1 rounded-lg border flex flex-col items-center justify-between transition-all relative ${
//                       isSelected ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100 z-10' : 
//                       isToday ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 hover:bg-gray-50'
//                     }`}
//                   >
//                     <span className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
//                       {day.getDate()}
//                     </span>
//                     <div className="flex gap-0.5 mb-1">
//                       {dayInterviews.length > 0 && (
//                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
//                       )}
//                       {dayInterviews.length > 1 && (
//                         <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
//                       )}
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Side Bar: Interview List */}
//       <div className="space-y-4">
//         <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col min-h-[400px]">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="font-bold text-gray-900">
//               {selectedDate 
//                 ? `Lịch hẹn ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`
//                 : 'Lịch phỏng vấn sắp tới'
//               }
//             </h3>
//             {selectedDate && (
//                <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-bold">
//                 {selectedDateInterviews.length} buổi
//               </span>
//             )}
//           </div>

//           <div className="space-y-4 flex-1">
//             {selectedDateInterviews.length > 0 ? (
//               selectedDateInterviews.map((interview) => (
//                 <div key={interview.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all border-l-4 border-l-blue-500">
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="min-w-0">
//                       <div className="font-bold text-gray-900 truncate">{interview.candidateName}</div>
//                       <div className="text-blue-600 text-xs font-bold truncate uppercase">{interview.position}</div>
//                     </div>
//                     <div className={`p-2 rounded-lg ${interview.type === 'online' ? 'bg-blue-100' : 'bg-green-100'}`}>
//                       {interview.type === 'online' ? 
//                         <Video className="w-4 h-4 text-blue-600" /> : 
//                         <MapPin className="w-4 h-4 text-green-600" />
//                       }
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
//                       <Clock className="w-3.5 h-3.5" />
//                       {interview.time}
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600 text-xs font-medium truncate">
//                       <MapPin className="w-3.5 h-3.5" />
//                       {interview.location}
//                     </div>
//                   </div>

//                   <button className="w-full mt-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
//                     {interview.type === 'online' ? 'Vào phòng họp' : 'Xem đường đi'}
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full py-12 text-center">
//                 <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//                   <CalendarIcon className="w-8 h-8 text-gray-300" />
//                 </div>
//                 <p className="text-gray-400 text-sm font-medium">Trống lịch cho ngày này</p>
//                 {!selectedDate && upcomingInterviews.length > 0 && (
//                    <p className="text-xs text-gray-400 mt-2">Chọn một ngày để xem chi tiết</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Weekly Stats Card */}
//         <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-100">
//           <p className="text-indigo-100 text-xs font-bold mb-4 uppercase tracking-widest">Thống kê tổng quát</p>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="border-r border-indigo-500/50">
//               <p className="text-3xl font-bold">{interviews.length}</p>
//               <p className="text-[10px] text-indigo-100 uppercase mt-1">Tổng lịch hẹn</p>
//             </div>
//             <div className="pl-2">
//               <p className="text-3xl font-bold">{interviews.filter(i => i.type === 'online').length}</p>
//               <p className="text-[10px] text-indigo-100 uppercase mt-1">Buổi Online</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CalendarIcon({ className }: { className?: string }) {
//   return (
//     <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//     </svg>
//   );
// }

import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Video, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

export function InterviewCalendar() {
  const { interviews } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // --- LOGIC XỬ LÝ NGÀY THÁNG ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getInterviewsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = getLocalDateString(date);
    return interviews.filter(interview => interview.date === dateString);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const days = getDaysInMonth(currentDate);
  const selectedDateInterviews = getInterviewsForDate(selectedDate);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      
      {/* Calendar Grid (Chiếm 2/3 chiều ngang) */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Calendar Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={previousMonth} className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => {
                  const today = new Date();
                  setCurrentDate(today);
                  setSelectedDate(today);
                }} 
                className="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-xl transition-all"
              >
                Hôm nay
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Day Names Row */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day, index) => (
                <div key={index} className="text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-3">
              {days.map((day, index) => {
                if (!day) return <div key={`empty-${index}`} className="aspect-square" />;

                const dayInterviews = getInterviewsForDate(day);
                const isToday = day.toDateString() === new Date().toDateString();
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square p-2 rounded-2xl border flex flex-col items-center justify-center transition-all relative group ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200 z-10 scale-105' 
                        : isToday 
                          ? 'border-blue-200 bg-blue-50 text-blue-700' 
                          : 'border-gray-50 bg-gray-50/30 hover:border-blue-200 hover:bg-white'
                    }`}
                  >
                    <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                      {day.getDate()}
                    </span>

                    {/* DẤU CHẤM BÁO HIỆU LỊCH HẸN (Indicators) */}
                    <div className="flex mt-1.5 h-1.5 items-center justify-center">
  {dayInterviews.length > 0 && (
    <div 
      className="w-1.5 h-1.5 rounded-full !bg-[#ff9800] shadow-sm" 
      style={{ backgroundColor: '#ff9800' }} // Dùng style trực tiếp để đảm bảo 100% không bị đổi màu
    />
  )}
</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Side Bar: Details & Stats */}
      <div className="space-y-6">
        
        {/* Interview List Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col min-h-[420px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-lg">
              {selectedDate 
                ? `Lịch hẹn ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`
                : 'Lịch phỏng vấn'
              }
            </h3>
            {selectedDateInterviews.length > 0 && (
              <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase">
                {selectedDateInterviews.length} buổi
              </span>
            )}
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {selectedDateInterviews.length > 0 ? (
              selectedDateInterviews.map((interview) => (
                <div 
                  key={interview.id} 
                  className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all border-l-4 border-l-blue-600 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {interview.candidateName}
                      </div>
                      <div className="text-gray-400 text-[10px] font-black truncate uppercase tracking-tighter">
                        {interview.position}
                      </div>
                    </div>
                    <div className={`p-2 rounded-xl ${interview.type === 'online' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                      {interview.type === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {interview.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold truncate">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {interview.location}
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                    {interview.type === 'online' ? 'Vào phòng họp' : 'Xem vị trí'}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <CalendarIcon className="w-10 h-10 text-gray-200" />
                </div>
                <p className="text-gray-400 text-sm font-bold">Không có lịch hẹn</p>
                <p className="text-[10px] text-gray-300 mt-1 uppercase font-medium">Chọn ngày khác để kiểm tra</p>
              </div>
            )}
          </div>
        </div>

        {/* THỐNG KÊ TỔNG QUÁT - MÀU XANH DOANH NGHIỆP (Navy Slate) */}
        <div className="bg-[#0f172a] rounded-2xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
          {/* Hiệu ứng trang trí nền */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-blue-500 rounded-full" />
            <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Thống kê hệ thống</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 ">
            <div className="border-r border-blue/5">
              <p className="text-4xl font-extrabold text-blue-400">{interviews.length}</p>
              <p className="text-[9px] text-gray-400 uppercase mt-2 font-bold tracking-wider">Tổng lịch</p>
            </div>
            <div className="pl-4">
              <p className="text-4xl font-extrabold text-blue-400">
                {interviews.filter(i => i.type === 'online').length}
              </p>
              <p className="text-[9px] text-gray-400 uppercase mt-2 font-bold tracking-wider">Phòng Online</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-gray-500">
             <span>HIỆU SUẤT THÁNG</span>
             <span className="text-green-400">+12%</span>
          </div>
        </div>

      </div>
    </div>
  );
} 