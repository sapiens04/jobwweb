import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là trợ lý tìm việc của bạn. Tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'Tìm việc Frontend Developer',
        'Việc làm tại Hà Nội',
        'Công việc lương cao',
        'Các công việc mới nhất'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // Tìm kiếm công việc theo từ khóa
    if (lowerMessage.includes('tìm') || lowerMessage.includes('việc') || lowerMessage.includes('job')) {
      const matchedJobs = jobsData.filter(job => {
        const searchText = `${job.title} ${job.company} ${job.description}`.toLowerCase();
        return lowerMessage.split(' ').some(word => 
          word.length > 3 && searchText.includes(word)
        );
      }).slice(0, 3);

      if (matchedJobs.length > 0) {
        const jobList = matchedJobs.map(job => 
          `• ${job.title} tại ${job.company} - ${job.location} (${job.salaryRange})`
        ).join('\n');
        
        return {
          text: `Tôi tìm thấy ${matchedJobs.length} công việc phù hợp:\n\n${jobList}\n\nBạn muốn xem chi tiết công việc nào?`,
          suggestions: [
            'Xem tất cả công việc',
            'Tìm việc khác',
            'Lọc theo địa điểm'
          ]
        };
      }
    }

    // Hỏi về địa điểm
    if (lowerMessage.includes('hà nội') || lowerMessage.includes('hồ chí minh') || lowerMessage.includes('đà nẵng')) {
      const location = lowerMessage.includes('hà nội') ? 'Hà Nội' : 
                       lowerMessage.includes('hồ chí minh') ? 'Hồ Chí Minh' : 'Đà Nẵng';
      const jobCount = jobsData.filter(job => job.location === location).length;
      
      return {
        text: `Hiện có ${jobCount} công việc tại ${location}. Bạn muốn xem danh sách không?`,
        suggestions: [
          `Xem việc tại ${location}`,
          'Tìm ở địa điểm khác',
          'Quay lại'
        ]
      };
    }

    // Hỏi về lương
    if (lowerMessage.includes('lương') || lowerMessage.includes('salary')) {
      return {
        text: 'Mức lương của các công việc dao động từ 10-40 triệu VNĐ tùy theo vị trí và kinh nghiệm. Bạn đang tìm mức lương trong khoảng nào?',
        suggestions: [
          'Dưới 20 triệu',
          '20-30 triệu',
          'Trên 30 triệu'
        ]
      };
    }

    // Hỏi về kinh nghiệm
    if (lowerMessage.includes('fresher') || lowerMessage.includes('mới') || lowerMessage.includes('junior')) {
      const juniorJobs = jobsData.filter(job => 
        job.experience.includes('0-1') || job.experience.includes('1-3')
      ).length;
      
      return {
        text: `Có ${juniorJobs} công việc phù hợp cho người mới bắt đầu và junior. Bạn có muốn xem không?`,
        suggestions: [
          'Xem việc cho fresher',
          'Tìm việc khác',
          'Tư vấn CV'
        ]
      };
    }

    // Hỏi về loại công việc
    if (lowerMessage.includes('remote') || lowerMessage.includes('fulltime') || lowerMessage.includes('parttime')) {
      return {
        text: 'Chúng tôi có các loại công việc: Full-time, Part-time, Remote và Contract. Bạn quan tâm đến loại nào?',
        suggestions: [
          'Full-time',
          'Remote',
          'Part-time'
        ]
      };
    }

    // Hỏi chung
    if (lowerMessage.includes('xem tất cả') || lowerMessage.includes('danh sách')) {
      return {
        text: 'Tôi sẽ đưa bạn đến trang danh sách tất cả công việc. Bạn có thể lọc theo địa điểm, lương, và kinh nghiệm ở đó.',
        suggestions: [
          'Đi đến trang việc làm',
          'Tìm việc khác',
          'Quay lại'
        ]
      };
    }

    // Câu hỏi về ứng tuyển
    if (lowerMessage.includes('ứng tuyển') || lowerMessage.includes('apply')) {
      return {
        text: 'Để ứng tuyển, bạn chỉ cần:\n1. Chọn công việc bạn quan tâm\n2. Nhấn "Ứng tuyển ngay"\n3. Điền thông tin và tải CV lên\n\nBạn đã tìm được công việc phù hợp chưa?',
        suggestions: [
          'Tìm việc ngay',
          'Tư vấn CV',
          'Câu hỏi khác'
        ]
      };
    }

    // Default response
    return {
      text: 'Tôi có thể giúp bạn:\n• Tìm kiếm công việc theo từ khóa\n• Lọc công việc theo địa điểm, lương, kinh nghiệm\n• Tư vấn về quy trình ứng tuyển\n\nBạn muốn tìm việc gì?',
      suggestions: [
        'Tìm việc Frontend',
        'Việc lương cao',
        'Việc tại Hà Nội',
        'Xem tất cả công việc'
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const response = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Handle special navigation suggestions
    if (suggestion.includes('Xem tất cả') || suggestion.includes('trang việc làm')) {
      navigate('/jobs');
      setIsOpen(false);
      return;
    }

    setInputText(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3>Trợ lý tìm việc</h3>
                <p className="text-blue-100 text-xs">Online - Sẵn sàng hỗ trợ</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map(message => (
              <div key={message.id}>
                <div
                  className={`flex gap-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="bg-blue-600 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <div className="bg-gray-300 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                {message.sender === 'bot' && message.suggestions && (
                  <div className="ml-10 mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs px-3 py-1.5 bg-white border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="bg-blue-600 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
