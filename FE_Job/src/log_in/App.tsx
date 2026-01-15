import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import  JobsPage  from "./components/JobsPage.tsx";
import { JobDetailPage } from "../candidate/pages/JobDetailPage.tsx"; 
import RecruiterUI from "../dashboard/App.tsx";
import CandidateUI from "../candidate/App.tsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/candidate" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruiter/*" element={<RecruiterUI />} />
        <Route path="/candidate/*" element={<CandidateUI />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
