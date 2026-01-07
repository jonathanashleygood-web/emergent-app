import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import InquiryForm from "./pages/InquiryForm";
import ThankYou from "./pages/ThankYou";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import InquiryDetail from "./pages/InquiryDetail";

function App() {
  return (
    <div className="App">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#2D2D2D',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inquiry" element={<InquiryForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/inquiry/:id" element={<InquiryDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
