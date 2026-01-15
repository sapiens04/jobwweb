import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import logo from "./image.png"; 

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Map giá trị từ giao diện sang Role Enum của Backend
    const backendRole = role === "recruiter" ? "EMPLOYER" : "USER";

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          role: backendRole, 
        }),
      });

      if (response.ok) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Đăng ký thất bại.");
      }
    } catch (err) {
      setError("Không thể kết nối tới Backend. Hãy chắc chắn BE_Job đang chạy (Run)!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Card className="w-full max-w-md border-blue-200 shadow-xl relative z-10 backdrop-blur-sm bg-white/90">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="JobFinder" className="h-12" />
          </div>
          <CardTitle className="text-3xl text-blue-600">Đăng ký</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Vai trò</Label>
              <RadioGroup value={role} onValueChange={setRole}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter">Nhà tuyển dụng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="candidate" id="candidate" />
                  <Label htmlFor="candidate">Ứng viên</Label>
                </div>
              </RadioGroup>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Đăng ký</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}