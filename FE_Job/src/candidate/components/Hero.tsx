import { Briefcase } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="w-12 h-12" />
          </div>
          <h1 className="mb-4">
            Tìm Công Việc Mơ Ước Của Bạn
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu. 
            Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay.
          </p>
        </div>
      </div>
    </div>
  );
}
