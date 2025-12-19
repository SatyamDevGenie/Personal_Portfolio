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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAuthModal(false)} />

          <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900/80 via-slate-950/80 to-slate-900/80 border border-slate-800 rounded-2xl p-1 shadow-2xl">
            <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-5 sm:p-6 max-h-[88vh] overflow-y-auto">
              <div className="absolute -right-16 -top-20 w-56 h-56 bg-gradient-to-br from-emerald-500/20 to-sky-400/12 rounded-full blur-3xl opacity-60 blob pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg shimmer bg-gradient-to-r from-white/6 via-white/12 to-white/6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7" /></svg>
                  </div>
                  <div>
                    <div className="font-heading text-lg">Welcome</div>
                    <div className="text-xs text-slate-400">Sign in to manage your portfolio</div>
                  </div>
                </div>

                <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-slate-200 rounded-md p-1">✕</button>
              </div>

              <div className="mb-4 flex gap-2">
                <button onClick={() => setAuthTab("login")} className={`flex-1 text-sm py-2 rounded-lg ${authTab === "login" ? 'bg-emerald-600 text-slate-900 font-semibold' : 'bg-slate-800 text-slate-300'}`}>Login</button>
                <button onClick={() => setAuthTab("register")} className={`flex-1 text-sm py-2 rounded-lg ${authTab === "register" ? 'bg-emerald-600 text-slate-900 font-semibold' : 'bg-slate-800 text-slate-300'}`}>Register</button>
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
                  {loginError && <div className="p-2 bg-red-900/40 text-red-300 rounded text-sm">{loginError}</div>}
                  <input name="username" placeholder="username" className="w-full rounded-md px-3 py-2 bg-slate-900 border border-slate-800 text-sm" />
                  <input name="password" type="password" placeholder="password" className="w-full rounded-md px-3 py-2 bg-slate-900 border border-slate-800 text-sm" />
                  <button className="w-full rounded-full cta py-2 font-semibold text-sm">Sign in</button>
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
                  {registerError && <div className="p-2 bg-red-900/40 text-red-300 rounded text-sm">{registerError}</div>}
                  <input name="reg-username" placeholder="username" className="w-full rounded-md px-3 py-2 bg-slate-900 border border-slate-800 text-sm" />
                  <input name="reg-password" type="password" placeholder="password" className="w-full rounded-md px-3 py-2 bg-slate-900 border border-slate-800 text-sm" />
                  <button className="w-full rounded-full cta py-2 font-semibold text-sm">Register</button>
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










