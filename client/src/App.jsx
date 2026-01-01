import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer, toast } from "react-toastify"; // Added toast import
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./slices/authSlice.js";

const AboutPage = React.lazy(() => import("./pages/About.jsx"));
const ServicesPage = React.lazy(() => import("./pages/Services.jsx"));
const SkillsPage = React.lazy(() => import("./pages/Skills.jsx"));
const ProjectsPage = React.lazy(() => import("./pages/Projects.jsx"));
const ContactPage = React.lazy(() => import("./pages/Contact.jsx"));
const AdminPage = React.lazy(() => import("./pages/Admin.jsx"));

function App() {
  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  return (
    <div className="min-h-screen bg-black text-white animate-fade-in">
      <Header onLogin={() => { setShowAuthModal(true); setAuthTab("login"); }} />

      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPage /></ProtectedRoute>} />
          <Route path="/login" element={<div className="max-w-md mx-auto p-6">Please use the Login button in the header.</div>} />
          <Route path="*" element={<div className="py-20 text-center">Page not found</div>} />
        </Routes>
      </Suspense>


      <ToastContainer position="top-right" theme="dark" />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 sm:pt-12">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAuthModal(false)} />

          <div className="relative w-full max-w-lg bg-gradient-to-b from-dark-850/95 via-dark-900/95 to-dark-850/95 border border-primary-500/30 rounded-2xl p-1 shadow-2xl shadow-primary-500/20 animate-slide-up">
            <div className="relative overflow-hidden rounded-2xl bg-dark-950/90 backdrop-blur-xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
              <div className="absolute -right-16 -top-20 w-56 h-56 bg-gradient-to-br from-primary-500/20 to-secondary-400/12 rounded-full blur-3xl opacity-60 blob pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg shimmer bg-gradient-to-r from-primary-500/20 via-primary-400/30 to-primary-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7" /></svg>
                  </div>
                  <div>
                    <div className="font-heading text-lg text-white">Welcome</div>
                    <div className="text-xs text-dark-400">Sign in to manage your portfolio</div>
                  </div>
                </div>

                <button onClick={() => setShowAuthModal(false)} className="text-dark-400 hover:text-white rounded-md p-2 hover:bg-primary-500/10 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4 flex gap-2">
                <button onClick={() => setAuthTab("login")} className={`flex-1 text-sm py-3 rounded-lg font-semibold transition-all duration-200 ${authTab === "login" ? 'bg-gradient-primary text-white shadow-glow' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'}`}>Login</button>
                <button onClick={() => setAuthTab("register")} className={`flex-1 text-sm py-3 rounded-lg font-semibold transition-all duration-200 ${authTab === "register" ? 'bg-gradient-primary text-white shadow-glow' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'}`}>Register</button>
              </div>

              {authTab === "login" ? (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setLoginError("");
                  const fd = new FormData(e.target);
                  const username = fd.get("username");
                  const password = fd.get("password");
                  const result = await dispatch(login({ username, password }));
                  if (result.type === login.fulfilled.type) {
                    toast.success(`Welcome Back`); // Success Toast
                    setShowAuthModal(false);
                  } else {
                    const errMsg = result.payload || result.error?.message || "Login failed";
                    setLoginError(errMsg);
                    toast.error(errMsg); // Error Toast
                  }
                }} className="space-y-4">
                  {loginError && <div className="p-3 bg-red-900/40 border border-red-500/30 text-red-300 rounded-lg text-sm">{loginError}</div>}
                  <input name="username" placeholder="Username" className="w-full rounded-lg px-4 py-3 bg-dark-900 border border-primary-500/30 text-white text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all" />
                  <input name="password" type="password" placeholder="Password" className="w-full rounded-lg px-4 py-3 bg-dark-900 border border-primary-500/30 text-white text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all" />
                  <button className="w-full rounded-lg cta py-3 font-semibold text-sm bg-gradient-primary text-white hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">Sign in</button>
                </form>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setRegisterError("");
                  const fd = new FormData(e.target);
                  const username = fd.get("reg-username");
                  const password = fd.get("reg-password");
                  try {
                    const res = await axios.post("https://personal-portfolio-4-6sjn.onrender.com/api/auth/register", { username, password });
                    toast.success(`Account created for ${res.data.user.username}`); // Success Toast
                    setAuthTab("login");
                  } catch (err) {
                    const errMsg = err.response?.data?.message || err.message;
                    setRegisterError(errMsg);
                    toast.error(errMsg); // Error Toast
                  }
                }} className="space-y-4">
                  {registerError && <div className="p-3 bg-red-900/40 border border-red-500/30 text-red-300 rounded-lg text-sm">{registerError}</div>}
                  <input name="reg-username" placeholder="Username" className="w-full rounded-lg px-4 py-3 bg-dark-900 border border-primary-500/30 text-white text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all" />
                  <input name="reg-password" type="password" placeholder="Password" className="w-full rounded-lg px-4 py-3 bg-dark-900 border border-primary-500/30 text-white text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all" />
                  <button className="w-full rounded-lg cta py-3 font-semibold text-sm bg-gradient-primary text-white hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">Register</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;










