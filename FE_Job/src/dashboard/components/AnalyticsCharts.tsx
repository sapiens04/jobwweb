import { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export function AnalyticsCharts() {
  const [lineData, setLineData] = useState([]); // Lượt ứng tuyển theo ngày
  const [barData, setBarData] = useState([]);  // Ứng viên theo vị trí
  const [pieData, setPieData] = useState([]);  // Trạng thái ứng viên
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const authData = localStorage.getItem("authData");
      const headers = { "Authorization": `Basic ${authData}` };
      const baseUrl = "http://localhost:8080/api/stats";

      try {
        // Gọi đồng thời cả 3 API để tối ưu tốc độ
        const [resLine, resBar, resPie] = await Promise.all([
          fetch(`${baseUrl}/applications-by-day`, { headers }),
          fetch(`${baseUrl}/applications-by-job`, { headers }),
          fetch(`${baseUrl}/applications-by-status`, { headers })
        ]);

        if (resLine.ok) setLineData(await resLine.json());
        if (resBar.ok) setBarData(await resBar.json());
        if (resPie.ok) setPieData(await resPie.json());
        
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phân tích:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500 italic">Đang tải dữ liệu phân tích...</div>;

  return (
    <div className="space-y-6">
      {/* 1. Biểu đồ đường: Lượt ứng tuyển theo ngày */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-gray-900 font-bold mb-4">Lượt Ứng Tuyển Trong Tuần</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
            <Line 
              type="monotone" 
              dataKey="applications" 
              stroke="#3B82F6" 
              strokeWidth={3} 
              dot={{ fill: '#3B82F6', r: 5 }} 
              name="Số lượng"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Biểu đồ cột: Ứng viên theo vị trí (Job) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-gray-900 font-bold mb-4">Ứng Viên Theo Vị Trí</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Ứng viên" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Biểu đồ tròn: Trạng thái ứng viên (Pie Chart) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-gray-900 font-bold mb-4">Trạng Thái Hồ Sơ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#8B5CF6'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}