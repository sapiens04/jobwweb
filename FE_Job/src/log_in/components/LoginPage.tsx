import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import logo from "./image.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json(); // Nhận Object chứa role
            console.log("Dữ liệu Login trả về:", data);
            const authString = window.btoa(`${username}:${password}`);
            localStorage.setItem("authData", authString); 
            localStorage.setItem("username", username);
            // Lưu vào localStorage để các trang sau biết ai đang đăng nhập
            localStorage.setItem("token", data.token);
            localStorage.setItem("currentUser", JSON.stringify(data));

            // Điều hướng dựa trên vai trò
            if (data.role === "EMPLOYER") {
                window.location.href = "/recruiter"; 
            } else {
                window.location.href = "/jobs";
            }
        } else {
            const errorMsg = await response.text();
            setError(errorMsg);
        }
    } catch (err) {
        setError("Không thể kết nối tới Backend Spring Boot!");
    }
};
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgb(59 130 246 / 0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(59 130 246 / 0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <Card className="w-full max-w-md border-blue-200 shadow-xl relative z-10 backdrop-blur-sm bg-white/90">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="JobFinder" className="h-12" />
          </div>
          <CardTitle className="text-3xl text-blue-600">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập tên đăng nhập và mật khẩu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Đăng nhập
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}