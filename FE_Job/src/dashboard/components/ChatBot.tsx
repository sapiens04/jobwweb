  // import { MessageCircle, X, Send, Sparkles, FileText, Users, DollarSign, MapPin } from 'lucide-react';
  // import { useState, useRef, useEffect } from 'react';

  // interface Message {
  //   id: number;
  //   text: string;
  //   sender: 'user' | 'bot';
  //   timestamp: Date;
  //   suggestions?: string[];
  // }

  // export function ChatBot() {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [messages, setMessages] = useState<Message[]>([
  //     {
  //       id: 1,
  //       text: 'Xin chào! Tôi là trợ lý tuyển dụng AI. Tôi có thể giúp bạn:\n\n• Viết mô tả công việc hấp dẫn\n• Gợi ý yêu cầu ứng viên phù hợp\n• Tư vấn mức lương cạnh tranh\n• Soạn thảo quyền lợi thu hút\n\nBạn cần tư vấn về vấn đề gì?',
  //       sender: 'bot',
  //       timestamp: new Date(),
  //       suggestions: [
  //         'Viết mô tả công việc',
  //         'Yêu cầu ứng viên',
  //         'Mức lương phù hợp',
  //         'Quyền lợi hấp dẫn',
  //       ],
  //     },
  //   ]);
  //   const [inputValue, setInputValue] = useState('');
  //   const [isTyping, setIsTyping] = useState(false);
  //   const messagesEndRef = useRef<HTMLDivElement>(null);

  //   const scrollToBottom = () => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  //   };

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [messages]);

  //   const quickTopics = [
  //     {
  //       icon: FileText,
  //       label: 'Mô tả công việc',
  //       color: 'blue',
  //       prompt: 'Tôi cần giúp viết mô tả công việc cho vị trí Frontend Developer',
  //     },
  //     {
  //       icon: Users,
  //       label: 'Yêu cầu ứng viên',
  //       color: 'purple',
  //       prompt: 'Gợi ý cho tôi các yêu cầu cần thiết cho vị trí Product Manager',
  //     },
  //     {
  //       icon: DollarSign,
  //       label: 'Mức lương',
  //       color: 'green',
  //       prompt: 'Mức lương thị trường cho Senior Backend Developer ở Hà Nội là bao nhiêu?',
  //     },
  //     {
  //       icon: MapPin,
  //       label: 'Địa điểm & Remote',
  //       color: 'orange',
  //       prompt: 'Nên đăng tin tuyển dụng với chính sách remote như thế nào?',
  //     },
  //   ];

  //   const getBotResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
  //     const lowerMessage = userMessage.toLowerCase();

  //     // Mô tả công việc
  //     if (lowerMessage.includes('mô tả') || lowerMessage.includes('frontend') || lowerMessage.includes('backend') || lowerMessage.includes('developer')) {
  //       return {
  //         text: `Để viết mô tả công việc hấp dẫn, bạn nên bao gồm:

  // **1. Giới thiệu công ty (2-3 câu)**
  // - Lĩnh vực hoạt động
  // - Quy mô và văn hóa làm việc

  // **2. Trách nhiệm công việc (5-7 điểm)**
  // Ví dụ cho Frontend Developer:
  // • Phát triển giao diện web responsive với React/Vue
  // • Tối ưu hiệu suất và trải nghiệm người dùng
  // • Làm việc với team backend để tích hợp API
  // • Code review và mentor junior developers

  // **3. Mô tả dự án**
  // Ứng viên muốn biết họ sẽ làm việc trên sản phẩm gì

  // **4. Công nghệ sử dụng**
  // React, TypeScript, Next.js, Tailwind CSS...

  // Bạn muốn tôi giúp chi tiết hơn phần nào?`,
  //         suggestions: ['Yêu cầu ứng viên', 'Quyền lợi', 'Mức lương'],
  //       };
  //     }

  //     // Yêu cầu ứng viên
  //     if (lowerMessage.includes('yêu cầu') || lowerMessage.includes('kỹ năng') || lowerMessage.includes('product manager')) {
  //       return {
  //         text: `Dưới đây là gợi ý yêu cầu ứng viên cho vị trí Product Manager:

  // **Yêu cầu bắt buộc:**
  // • 5+ năm kinh nghiệm làm Product Manager
  // • Kinh nghiệm quản lý full product lifecycle
  // • Kỹ năng phân tích data và đưa ra insight
  // • Thành thạo công cụ: Jira, Figma, Analytics tools
  // • Kỹ năng giao tiếp và làm việc nhóm tốt

  // **Yêu cầu ưu tiên:**
  // • Kinh nghiệm với sản phẩm SaaS/B2B
  // • Hiểu biết về UX/UI design
  // • Kinh nghiệm làm việc với team kỹ thuật
  // • Background về công nghệ hoặc MBA

  // **Lưu ý:** Không nên đặt quá nhiều yêu cầu (tối đa 5-7 điểm) để không làm nản lòng ứng viên tiềm năng!`,
  //         suggestions: ['Mô tả công việc', 'Quyền lợi', 'Mức lương'],
  //       };
  //     }

  //     // Mức lương
  //     if (lowerMessage.includes('lương') || lowerMessage.includes('salary') || lowerMessage.includes('senior')) {
  //       return {
  //         text: `**Mức lương tham khảo thị trường Việt Nam (2024):**

  // **Junior (0-2 năm):**
  // • Frontend/Backend: 8-15 triệu
  // • Designer: 7-12 triệu

  // **Middle (2-5 năm):**
  // • Frontend/Backend: 15-25 triệu
  // • Product Manager: 20-30 triệu
  // • Designer: 12-20 triệu

  // **Senior (5+ năm):**
  // • Frontend/Backend: 25-45 triệu
  // • Product Manager: 30-60 triệu
  // • Designer: 20-35 triệu

  // **Lead/Manager:**
  // • Technical Lead: 40-70 triệu
  // • Engineering Manager: 50-80 triệu

  // **Lưu ý:** 
  // - Mức lương ở TP.HCM thường cao hơn Hà Nội 10-20%
  // - Nên ghi mức lương để thu hút ứng viên
  // - Có thể ghi "Thỏa thuận" nếu linh hoạt theo năng lực`,
  //         suggestions: ['Quyền lợi', 'Địa điểm làm việc', 'Yêu cầu ứng viên'],
  //       };
  //     }

  //     // Quyền lợi
  //     if (lowerMessage.includes('quyền lợi') || lowerMessage.includes('benefit') || lowerMessage.includes('phúc lợi')) {
  //       return {
  //         text: `**Gợi ý các quyền lợi hấp dẫn ứng viên:**

  // **💰 Lương thưởng:**
  // • Lương tháng 13, thưởng theo KPI/dự án
  // • Review lương 2 lần/năm
  // • Thưởng các dịp lễ, Tết

  // **🏥 Bảo hiểm & Sức khỏe:**
  // • Bảo hiểm xã hội, y tế đầy đủ
  // • Bảo hiểm sức khỏe cao cấp cho nhân viên
  // • Khám sức khỏe định kỳ hàng năm

  // **⏰ Làm việc linh hoạt:**
  // • Hybrid/Remote 2-3 ngày/tuần
  // • Giờ giấc linh hoạt (flexible hours)
  // • 15-20 ngày phép/năm

  // **📚 Đào tạo & Phát triển:**
  // • Budget học online courses
  // • Tham gia hội thảo, conference
  // • Mentor 1-1 với senior

  // **🎉 Khác:**
  // • Team building, du lịch hàng quý
  // • Đồ ăn, snacks, coffee miễn phí
  // • Môi trường trẻ trung, năng động

  // Bạn muốn tôi chi tiết hơn mục nào?`,
  //         suggestions: ['Mô tả công việc', 'Mức lương', 'Chính sách remote'],
  //       };
  //     }

  //     // Remote/Địa điểm
  //     if (lowerMessage.includes('remote') || lowerMessage.includes('địa điểm') || lowerMessage.includes('nơi làm việc')) {
  //       return {
  //         text: `**Hướng dẫn về chính sách làm việc:**

  // **📍 Các mô hình phổ biến:**

  // **1. Onsite (100% văn phòng)**
  // - Phù hợp: Junior cần mentoring nhiều
  // - Ưu điểm: Giao tiếp trực tiếp, team bonding tốt
  // - Nên ghi rõ: "Làm việc tại văn phòng [Địa chỉ]"

  // **2. Hybrid (Kết hợp)**
  // - Xu hướng phổ biến nhất hiện nay
  // - Ghi: "Hybrid - 3 ngày office, 2 ngày remote"
  // - Thu hút nhiều ứng viên có kinh nghiệm

  // **3. Remote (100% từ xa)**
  // - Phù hợp: Senior, freelance
  // - Ghi rõ: "Fully Remote - Làm việc từ mọi nơi"
  // - Cần quy định về múi giờ làm việc

  // **💡 Tips:**
  // • Nếu remote, nhấn mạnh tools collaboration (Slack, Zoom...)
  // • Ghi rõ địa điểm văn phòng nếu onsite
  // • "Remote-friendly" là điểm cộng lớn!`,
  //         suggestions: ['Quyền lợi khác', 'Yêu cầu ứng viên', 'Mức lương'],
  //       };
  //     }

  //     // Default response
  //     return {
  //       text: `Tôi có thể tư vấn cho bạn về:

  // • **Viết mô tả công việc** - Chi tiết, hấp dẫn ứng viên
  // • **Yêu cầu ứng viên** - Hợp lý, không quá khó
  // • **Mức lương thị trường** - Cạnh tranh, công bằng
  // • **Quyền lợi thu hút** - Đầy đủ, nổi bật
  // • **Chính sách remote** - Linh hoạt, hiện đại

  // Bạn muốn tư vấn về vấn đề nào?`,
  //       suggestions: ['Mô tả công việc', 'Yêu cầu ứng viên', 'Mức lương', 'Quyền lợi'],
  //     };
  //   };

  //   // ChatBot.tsx

  //   const handleSendMessage = async (text: string) => {
  //     // ... (giữ nguyên phần UI thêm tin nhắn người dùng)
      
  //     try {
  //       const authData = localStorage.getItem("authData");
        
  //       const response = await fetch('http://localhost:8080/api/chat', { // Đã đổi về 8080
  //         method: 'POST',
  //         headers: { 
  //           'Content-Type': 'application/json',
  //           'Authorization': authData ? `Basic ${authData}` : '' // Gửi quyền truy cập
  //         },
  //         body: JSON.stringify({ message: text }),
  //       });
    
  //       if (!response.ok) {
  //         // Nếu lỗi 401 hoặc 500, lấy text báo lỗi thay vì parse JSON ngay
  //         const errorMsg = await response.text();
  //         throw new Error(errorMsg || `Lỗi server: ${response.status}`);
  //       }
    
  //       const data = await response.json();
        
  //       // Thêm tin nhắn bot vào UI
  //       setMessages((prev) => [...prev, {
  //         id: Date.now() + 1,
  //         text: data.reply,
  //         sender: 'bot',
  //         timestamp: new Date(),
  //         suggestions: data.suggestions
  //       }]);
    
  //     } catch (error) {
  //       console.error('Chat error:', error);
  //       setMessages((prev) => [...prev, {
  //         id: Date.now() + 1,
  //         text: "Hiện tại tôi không thể kết nối với máy chủ AI. Vui lòng thử lại sau.",
  //         sender: 'bot',
  //         timestamp: new Date(),
  //       }]);
  //     } finally {
  //       setIsTyping(false);
  //     }
  //   };

  //   const handleSuggestionClick = (suggestion: string) => {
  //     handleSendMessage(suggestion);
  //   };

  //   return (
  //     <>
  //       {/* Floating Button */}
  //       {!isOpen && (
  //         <button
  //           onClick={() => setIsOpen(true)}
  //           className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-50 group"
  //         >
  //           <MessageCircle className="w-6 h-6" />
  //           <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            
  //           {/* Tooltip */}
  //           <div className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
  //             Cần tư vấn? Chat với AI
  //             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
  //               <div className="border-8 border-transparent border-l-gray-900"></div>
  //             </div>
  //           </div>
  //         </button>
  //       )}

  //       {/* Chat Window */}
  //       {isOpen && (
  //         <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
  //           {/* Header */}
  //           <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
  //             <div className="flex items-center gap-3">
  //               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
  //                 <Sparkles className="w-5 h-5" />
  //               </div>
  //               <div>
  //                 <div className="font-medium">Trợ lý AI Tuyển dụng</div>
  //                 <div className="text-xs text-white/80">Luôn sẵn sàng hỗ trợ</div>
  //               </div>
  //             </div>
  //             <button
  //               onClick={() => setIsOpen(false)}
  //               className="p-2 hover:bg-white/20 rounded-lg transition-colors"
  //             >
  //               <X className="w-5 h-5" />
  //             </button>
  //           </div>

  //           {/* Quick Topics */}
  //           {messages.length <= 1 && (
  //             <div className="p-4 border-b border-gray-200 bg-gray-50">
  //               <div className="text-sm text-gray-600 mb-3">Chủ đề phổ biến:</div>
  //               <div className="grid grid-cols-2 gap-2">
  //                 {quickTopics.map((topic, index) => {
  //                   const Icon = topic.icon;
  //                   return (
  //                     <button
  //                       key={index}
  //                       onClick={() => handleSendMessage(topic.prompt)}
  //                       className={`p-3 bg-white border border-gray-200 rounded-lg hover:border-${topic.color}-300 hover:bg-${topic.color}-50 transition-all text-left group`}
  //                     >
  //                       <Icon className={`w-5 h-5 text-${topic.color}-600 mb-2`} />
  //                       <div className="text-sm text-gray-700 group-hover:text-gray-900">
  //                         {topic.label}
  //                       </div>
  //                     </button>
  //                   );
  //                 })}
  //               </div>
  //             </div>
  //           )}

  //           {/* Messages */}
  //           <div className="flex-1 overflow-y-auto p-4 space-y-4">
  //             {messages.map((message) => (
  //               <div key={message.id} className="space-y-2">
  //                 <div
  //                   className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
  //                 >
  //                   <div
  //                     className={`max-w-[85%] rounded-2xl px-4 py-3 ${
  //                       message.sender === 'user'
  //                         ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
  //                         : 'bg-gray-100 text-gray-900'
  //                     }`}
  //                   >
  //                     <div className="whitespace-pre-wrap text-sm">{message.text}</div>
  //                   </div>
  //                 </div>

  //                 {/* Suggestions */}
  //                 {message.suggestions && message.sender === 'bot' && (
  //                   <div className="flex flex-wrap gap-2 ml-2">
  //                     {message.suggestions.map((suggestion, index) => (
  //                       <button
  //                         key={index}
  //                         onClick={() => handleSuggestionClick(suggestion)}
  //                         className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors"
  //                       >
  //                         {suggestion}
  //                       </button>
  //                     ))}
  //                   </div>
  //                 )}
  //               </div>
  //             ))}

  //             {isTyping && (
  //               <div className="flex justify-start">
  //                 <div className="bg-gray-100 rounded-2xl px-4 py-3">
  //                   <div className="flex gap-1">
  //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
  //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}

  //             <div ref={messagesEndRef} />
  //           </div>

  //           {/* Input */}
  //           <div className="p-4 border-t border-gray-200">
  //             <form
  //               onSubmit={(e) => {
  //                 e.preventDefault();
  //                 handleSendMessage(inputValue);
  //               }}
  //               className="flex gap-2"
  //             >
  //               <input
  //                 type="text"
  //                 value={inputValue}
  //                 onChange={(e) => setInputValue(e.target.value)}
  //                 placeholder="Nhập câu hỏi của bạn..."
  //                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //               />
  //               <button
  //                 type="submit"
  //                 disabled={!inputValue.trim() || isTyping}
  //                 className="px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
  //               >
  //                 <Send className="w-5 h-5" />
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // }


  import { MessageCircle, X, Send, Sparkles, FileText, Users, DollarSign, MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là trợ lý tuyển dụng AI. Tôi có thể giúp bạn:\n\n• Viết mô tả công việc hấp dẫn\n• Gợi ý yêu cầu ứng viên phù hợp\n• Tư vấn mức lương cạnh tranh\n• Soạn thảo quyền lợi thu hút\n\nBạn cần tư vấn về vấn đề gì?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'Viết mô tả công việc',
        'Yêu cầu ứng viên',
        'Mức lương phù hợp',
        'Quyền lợi hấp dẫn',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]); // Cuộn xuống cả khi đang hiện hiệu ứng typing

  const quickTopics = [
    {
      icon: FileText,
      label: 'Mô tả công việc',
      color: 'blue',
      prompt: 'Tôi cần giúp viết mô tả công việc cho vị trí Frontend Developer',
    },
    {
      icon: Users,
      label: 'Yêu cầu ứng viên',
      color: 'purple',
      prompt: 'Gợi ý cho tôi các yêu cầu cần thiết cho vị trí Product Manager',
    },
    {
      icon: DollarSign,
      label: 'Mức lương',
      color: 'green',
      prompt: 'Mức lương thị trường cho Senior Backend Developer ở Hà Nội là bao nhiêu?',
    },
    {
      icon: MapPin,
      label: 'Địa điểm & Remote',
      color: 'orange',
      prompt: 'Nên đăng tin tuyển dụng với chính sách remote như thế nào?',
    },
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Thêm tin nhắn của người dùng
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    // 2. Bật hiệu ứng soạn tin ngay lập tức
    setIsTyping(true);

    try {
      const authData = localStorage.getItem("authData");
      
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': authData ? `Basic ${authData}` : '' 
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
         const errorMsg = await response.text();
         throw new Error(errorMsg || `Lỗi server: ${response.status}`);
      }

      const data = await response.json();
      
      // 3. Tắt hiệu ứng typing trước khi hiện tin nhắn bot
      setIsTyping(false);

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: data.reply,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: data.suggestions
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false); // Đảm bảo tắt typing nếu lỗi
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Hiện tại tôi không thể kết nối với máy chủ AI. Vui lòng thử lại sau.",
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-50 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <div className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Cần tư vấn? Chat với AI
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="border-8 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ring-2 ring-white/10">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="font-bold text-sm">Trợ lý AI Tuyển dụng</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-[10px] text-white/80 font-medium">Đang hoạt động</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Topics */}
          {messages.length <= 1 && (
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Gợi ý nhanh</div>
              <div className="grid grid-cols-2 gap-2">
                {quickTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(topic.prompt)}
                      className="p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-left group"
                    >
                      <Icon className="w-4 h-4 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-bold text-gray-700 leading-tight">{topic.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message) => (
              <div key={message.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</div>
                  </div>
                </div>

                {message.suggestions && message.sender === 'bot' && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 text-xs font-bold bg-white border border-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Hiệu ứng soạn tin mượt mà */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-1 duration-300">
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 border border-gray-100 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 ml-1">AI đang soạn tin...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isTyping}
                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-400 transition-all shadow-md shadow-blue-100 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}