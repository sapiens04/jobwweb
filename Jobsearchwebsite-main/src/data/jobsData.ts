export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  logo: string;
}

export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Vietnam',
    location: 'Hà Nội',
    type: 'Full-time',
    salaryRange: '20-30 triệu',
    experience: '3-5 năm',
    description: 'Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React, TypeScript và các công nghệ web hiện đại. Bạn sẽ làm việc trong một team năng động và tham gia phát triển các sản phẩm công nghệ hàng đầu.',
    requirements: [
      'Có ít nhất 3 năm kinh nghiệm với React và TypeScript',
      'Thành thạo HTML, CSS, JavaScript',
      'Hiểu biết về UX/UI và responsive design',
      'Kinh nghiệm với Git và quy trình Agile',
      'Khả năng giao tiếp tốt tiếng Anh'
    ],
    benefits: [
      'Lương thưởng cạnh tranh',
      'Bảo hiểm sức khỏe cao cấp',
      'Làm việc hybrid (3 ngày văn phòng, 2 ngày remote)',
      'Du lịch công ty hàng năm',
      'Đào tạo và phát triển nghề nghiệp'
    ],
    postedDate: '2 ngày trước',
    logo: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    title: 'Backend Developer (Node.js)',
    company: 'Digital Innovations',
    location: 'Hồ Chí Minh',
    type: 'Full-time',
    salaryRange: '15-25 triệu',
    experience: '2-4 năm',
    description: 'Tham gia phát triển và bảo trì các hệ thống backend sử dụng Node.js, Express, và MongoDB. Làm việc với team quốc tế và các dự án thú vị.',
    requirements: [
      'Kinh nghiệm 2+ năm với Node.js',
      'Thành thạo Express.js và RESTful API',
      'Hiểu biết về database (MongoDB, PostgreSQL)',
      'Kiến thức về microservices architecture',
      'Kinh nghiệm với Docker là một lợi thế'
    ],
    benefits: [
      'Mức lương hấp dẫn và thưởng hiệu suất',
      'Làm việc trong môi trường quốc tế',
      'Cơ hội thăng tiến rõ ràng',
      'Flexible working hours',
      'Hỗ trợ học tập và chứng chỉ'
    ],
    postedDate: '1 tuần trước',
    logo: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Đà Nẵng',
    type: 'Full-time',
    salaryRange: '12-18 triệu',
    experience: '1-3 năm',
    description: 'Thiết kế giao diện người dùng đẹp mắt và trải nghiệm người dùng tối ưu cho các ứng dụng web và mobile. Làm việc chặt chẽ với team development.',
    requirements: [
      'Thành thạo Figma, Adobe XD, hoặc Sketch',
      'Hiểu biết về design thinking và user research',
      'Portfolio thể hiện các dự án đã thực hiện',
      'Kỹ năng giao tiếp và làm việc nhóm tốt',
      'Kiến thức về HTML/CSS là lợi thế'
    ],
    benefits: [
      'Môi trường sáng tạo và năng động',
      'Trang thiết bị làm việc hiện đại',
      'Work-life balance',
      'Team building thường xuyên',
      'Cơ hội học hỏi từ các senior designers'
    ],
    postedDate: '3 ngày trước',
    logo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'Startup Hub',
    location: 'Hà Nội',
    type: 'Full-time',
    salaryRange: '25-35 triệu',
    experience: '3-5 năm',
    description: 'Phát triển các tính năng mới cho nền tảng SaaS của chúng tôi. Làm việc với cả frontend (React) và backend (Python/Django).',
    requirements: [
      'Kinh nghiệm với React và Python/Django',
      'Hiểu biết về database design',
      'Kinh nghiệm với AWS hoặc cloud platforms khác',
      'Kỹ năng problem-solving tốt',
      'Passion for clean code'
    ],
    benefits: [
      'Stock options',
      'Lương cao và bonus hấp dẫn',
      'Remote-friendly',
      'Latest tech stack',
      'Startup environment với nhiều cơ hội'
    ],
    postedDate: '5 ngày trước',
    logo: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=100&h=100&fit=crop'
  },
  {
    id: '5',
    title: 'Mobile App Developer (React Native)',
    company: 'App Factory',
    location: 'Hồ Chí Minh',
    type: 'Full-time',
    salaryRange: '18-28 triệu',
    experience: '2-4 năm',
    description: 'Phát triển ứng dụng mobile đa nền tảng sử dụng React Native. Tham gia các dự án từ giai đoạn ý tưởng đến deployment.',
    requirements: [
      'Kinh nghiệm 2+ năm với React Native',
      'Hiểu biết về iOS và Android platforms',
      'Thành thạo JavaScript/TypeScript',
      'Kinh nghiệm với Redux hoặc state management',
      'Đã publish apps lên App Store/Play Store'
    ],
    benefits: [
      'Competitive salary',
      'MacBook Pro và thiết bị test',
      'Flexible hours',
      'Premium health insurance',
      'Annual company trip'
    ],
    postedDate: '1 ngày trước',
    logo: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=100&h=100&fit=crop'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Cloud Services Pro',
    location: 'Hà Nội',
    type: 'Full-time',
    salaryRange: '30-40 triệu',
    experience: '4-6 năm',
    description: 'Quản lý infrastructure, CI/CD pipelines và monitoring cho các hệ thống quy mô lớn. Làm việc với AWS, Kubernetes, và các công nghệ cloud-native.',
    requirements: [
      'Kinh nghiệm với AWS, Azure hoặc GCP',
      'Thành thạo Docker và Kubernetes',
      'Hiểu biết về CI/CD (Jenkins, GitLab CI)',
      'Scripting skills (Bash, Python)',
      'Kinh nghiệm với Infrastructure as Code'
    ],
    benefits: [
      'Top-tier salary package',
      'Certifications sponsorship',
      'Work from home options',
      'International projects',
      'Career growth opportunities'
    ],
    postedDate: '4 ngày trước',
    logo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop'
  },
  {
    id: '7',
    title: 'Data Analyst',
    company: 'Analytics Corp',
    location: 'Hồ Chí Minh',
    type: 'Full-time',
    salaryRange: '15-22 triệu',
    experience: '1-3 năm',
    description: 'Phân tích dữ liệu và tạo insights để hỗ trợ quyết định kinh doanh. Làm việc với SQL, Python và các công cụ visualization.',
    requirements: [
      'Thành thạo SQL và Excel',
      'Kinh nghiệm với Python (pandas, numpy)',
      'Hiểu biết về statistics và data visualization',
      'Kinh nghiệm với Tableau/Power BI là lợi thế',
      'Analytical mindset'
    ],
    benefits: [
      'Training programs',
      'Modern office space',
      'Health insurance',
      'Performance bonuses',
      'Career development path'
    ],
    postedDate: '1 tuần trước',
    logo: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=100&h=100&fit=crop'
  },
  {
    id: '8',
    title: 'Product Manager',
    company: 'Product Innovation',
    location: 'Hà Nội',
    type: 'Full-time',
    salaryRange: '25-35 triệu',
    experience: '3-5 năm',
    description: 'Quản lý product roadmap và làm việc với các stakeholders để deliver các tính năng mới. Cần có technical background và business acumen.',
    requirements: [
      'Kinh nghiệm 3+ năm trong product management',
      'Technical background (engineering/CS)',
      'Excellent communication skills',
      'Experience with Agile/Scrum',
      'Data-driven decision making'
    ],
    benefits: [
      'Attractive compensation',
      'Equity options',
      'Flexible working arrangement',
      'Learning budget',
      'Impact-driven culture'
    ],
    postedDate: '3 ngày trước',
    logo: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=100&h=100&fit=crop'
  },
  {
    id: '9',
    title: 'QA Engineer',
    company: 'Quality First',
    location: 'Đà Nẵng',
    type: 'Full-time',
    salaryRange: '12-18 triệu',
    experience: '1-3 năm',
    description: 'Đảm bảo chất lượng sản phẩm thông qua testing manual và automation. Làm việc với development team trong quy trình Agile.',
    requirements: [
      'Kinh nghiệm testing web/mobile apps',
      'Hiểu biết về test case design',
      'Kinh nghiệm với automation testing là lợi thế',
      'Detail-oriented và tỉ mỉ',
      'Good communication skills'
    ],
    benefits: [
      'Friendly work environment',
      'Training opportunities',
      'Health care benefits',
      'Team activities',
      'Growth opportunities'
    ],
    postedDate: '2 ngày trước',
    logo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop'
  },
  {
    id: '10',
    title: 'Marketing Manager',
    company: 'Growth Marketing',
    location: 'Hồ Chí Minh',
    type: 'Full-time',
    salaryRange: '20-30 triệu',
    experience: '3-5 năm',
    description: 'Lên chiến lược và thực hiện các campaigns marketing để tăng trưởng user base. Làm việc với digital marketing, content, và analytics.',
    requirements: [
      'Kinh nghiệm 3+ năm trong digital marketing',
      'Thành thạo Google Analytics, Facebook Ads',
      'Strong content creation skills',
      'Data analysis và reporting',
      'Creative và strategic thinking'
    ],
    benefits: [
      'Competitive package',
      'Creative freedom',
      'Marketing budget',
      'Modern tools and platforms',
      'Dynamic team'
    ],
    postedDate: '6 ngày trước',
    logo: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=100&h=100&fit=crop'
  }
];
