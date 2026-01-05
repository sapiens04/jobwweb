import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Video } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';

interface Interview {
  id: number;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function InterviewCalendar() {
  const { interviews } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getInterviewsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-200">
          {/* Calendar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hôm nay
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day, index) => (
                <div key={index} className="text-center text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dayInterviews = getInterviewsForDate(day);
                const isToday = day.toDateString() === new Date().toDateString();
                const isSelected = selectedDate?.toDateString() === day.toDateString();

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square p-2 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : isToday
                        ? 'border-blue-300 bg-blue-50'
                        : dayInterviews.length > 0
                        ? 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`text-sm mb-1 ${
                      isToday ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {day.getDate()}
                    </div>
                    {dayInterviews.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {dayInterviews.slice(0, 2).map((interview) => (
                          <div
                            key={interview.id}
                            className="w-2 h-2 bg-blue-600 rounded-full"
                          />
                        ))}
                        {dayInterviews.length > 2 && (
                          <div className="text-xs text-gray-600">+{dayInterviews.length - 2}</div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interview List */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">
              {selectedDate 
                ? `Lịch ngày ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`
                : 'Lịch phỏng vấn sắp tới'
              }
            </h3>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {(selectedDate ? selectedDateInterviews : interviews.slice(0, 5)).map((interview) => (
              <div
                key={interview.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-gray-900 mb-1">{interview.candidateName}</div>
                    <div className="text-gray-600 text-sm">{interview.position}</div>
                  </div>
                  {interview.type === 'online' ? (
                    <Video className="w-5 h-5 text-blue-600" />
                  ) : (
                    <MapPin className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <div className="space-y-1 mt-3">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4" />
                    {interview.time}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    {interview.type === 'online' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    {interview.location}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                  <button className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    Chi tiết
                  </button>
                  <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Tham gia
                  </button>
                </div>
              </div>
            ))}

            {selectedDate && selectedDateInterviews.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không có lịch phỏng vấn nào
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="mb-4">Thống kê tuần này</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Tổng số buổi PV</span>
              <span className="text-2xl">{interviews.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Trực tuyến</span>
              <span>{interviews.filter(i => i.type === 'online').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Trực tiếp</span>
              <span>{interviews.filter(i => i.type === 'offline').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}