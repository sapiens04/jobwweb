import { X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateJobModal({ isOpen, onClose, onSuccess }: CreateJobModalProps) {
  const [loading, setLoading] = useState(false);
  
  // Khởi tạo state với các trường khớp chính xác với DTO và Database
  const [formData, setFormData] = useState({
    title: '',
    address: '',        // Đổi từ location
    typeOfJob: 'FULL_TIME',
    salary: '',
    deadlineApply: '',  // Đổi từ deadline
    description: '',
    department: '',
    level: 'Junior',
    companyName: '',
  });

  const [requirements, setRequirements] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const authData = localStorage.getItem("authData");
    
    // Gộp mảng thành chuỗi String ngăn cách bởi dấu xuống dòng
    const payload = {
      ...formData,
      requirement: requirements.filter(r => r.trim()).join('\n'),
      benefit: benefits.filter(b => b.trim()).join('\n'),
    };

    try {
      const response = await fetch("http://localhost:8080/api/jobs/create", {
        method: 'POST',
        headers: {
          "Authorization": `Basic ${authData}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Đăng tin tuyển dụng thành công vào Database!');
        
        // Gọi hàm refresh danh sách ở trang JobPostings
        if (typeof onSuccess === 'function') {
            onSuccess(); 
        }
        
        onClose();
      } else {
        const errorText = await response.text();
        alert('Lỗi từ hệ thống: ' + errorText);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      alert('Không thể kết nối tới máy chủ Backend.');
    } finally {
      setLoading(false);
    }
  };

  // Các hàm xử lý Dynamic Input cho Yêu cầu & Quyền lợi
  const addRequirement = () => setRequirements([...requirements, '']);
  const removeRequirement = (index: number) => setRequirements(requirements.filter((_, i) => i !== index));
  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...requirements];
    newReqs[index] = value;
    setRequirements(newReqs);
  };

  const addBenefit = () => setBenefits([...benefits, '']);
  const removeBenefit = (index: number) => setBenefits(benefits.filter((_, i) => i !== index));
  const updateBenefit = (index: number, value: string) => {
    const newBens = [...benefits];
    newBens[index] = value;
    setBenefits(newBens);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Đăng Tin Tuyển Dụng Mới</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-sm">
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Tên công ty *</label>
                <input required className="w-full px-4 py-2 border rounded-lg" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Vị trí tuyển dụng *</label>
                <input required className="w-full px-4 py-2 border rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Địa điểm *</label>
                <input required className="w-full px-4 py-2 border rounded-lg" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Loại hình *</label>
                <select className="w-full px-4 py-2 border rounded-lg" value={formData.typeOfJob} onChange={e => setFormData({...formData, typeOfJob: e.target.value})}>
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="REMOTE">Remote</option>
                  <option value="FREELANCE">Freelance</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mức lương *</label>
                <input required className="w-full px-4 py-2 border rounded-lg" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Hạn nộp hồ sơ *</label>
                <input type="date" required className="w-full px-4 py-2 border rounded-lg" value={formData.deadlineApply} onChange={e => setFormData({...formData, deadlineApply: e.target.value})} />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phòng ban *</label>
                <input required className="w-full px-4 py-2 border rounded-lg" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Cấp bậc *</label>
                <select className="w-full px-4 py-2 border rounded-lg" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}>
                  <option value="Intern">Intern</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-bold">Mô tả công việc *</label>
            <textarea required rows={5} className="w-full px-4 py-2 border rounded-lg resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-gray-700">Yêu cầu công việc</label>
              <button type="button" onClick={addRequirement} className="text-blue-600 flex items-center gap-1 text-xs"><Plus className="w-4 h-4"/> Thêm yêu cầu</button>
            </div>
            {requirements.map((req, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className="flex-1 px-4 py-2 border rounded-lg" value={req} onChange={e => updateRequirement(i, e.target.value)} />
                {requirements.length > 1 && <button type="button" onClick={() => removeRequirement(i)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>}
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-gray-700">Quyền lợi</label>
              <button type="button" onClick={addBenefit} className="text-blue-600 flex items-center gap-1 text-xs"><Plus className="w-4 h-4"/> Thêm quyền lợi</button>
            </div>
            {benefits.map((ben, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className="flex-1 px-4 py-2 border rounded-lg" value={ben} onChange={e => updateBenefit(i, e.target.value)} />
                {benefits.length > 1 && <button type="button" onClick={() => removeBenefit(i)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="px-8 py-2 border rounded-lg hover:bg-gray-50">Hủy</button>
            <button type="submit" disabled={loading} className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
              {loading ? 'Đang xử lý...' : 'Đăng tin ngay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}