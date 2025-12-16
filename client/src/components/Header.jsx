import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice.js";
import { NavLink } from "react-router-dom";

export default function Header({ onLogin }) {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="text-sm sm:text-base font-heading font-bold tracking-tight motion-safe:animate-pop">Satyam • MERN</span>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 lg:gap-3 text-xs lg:text-sm items-center">
          <NavLink to="/" className={({isActive})=>`px-2 lg:px-3 py-1 rounded-full hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Home</NavLink>
          <NavLink to="/about" className={({isActive})=>`px-2 lg:px-3 py-1 rounded-full hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>About</NavLink>
          <NavLink to="/services" className={({isActive})=>`px-2 lg:px-3 py-1 rounded-full hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Services</NavLink>
          <NavLink to="/skills" className={({isActive})=>`px-2 lg:px-3 py-1 rounded-full hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Skills</NavLink>
          <NavLink to="/projects" className={({isActive})=>`px-2 lg:px-3 py-1 rounded-full hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Projects</NavLink>
          <NavLink to="/contact" className={({isActive})=>`px-2 lg:px-3 py-1 rounded-full hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Contact</NavLink>
          <a href="/resume.pdf" download className="px-3 py-1 rounded-full cta text-slate-900 font-semibold text-xs hover:scale-[1.01] transition">CV</a>
          {!auth.user ? (
            <button onClick={() => onLogin && onLogin()} className="px-2 py-1 rounded-full hover:bg-white/10 transition text-xs">Login</button>
          ) : (
            <>
              {auth.user.username === "satyam" && (
                <NavLink to="/admin" className="px-2 py-1 rounded-full hover:bg-white/10 text-xs">Admin</NavLink>
              )}
              <button onClick={() => dispatch(logout())} className="px-2 py-1 rounded-full hover:bg-white/10 text-xs">Logout</button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-xl">☰</button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95">
          <nav className="flex flex-col gap-1 p-4 text-sm">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)} className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>About</NavLink>
            <NavLink to="/services" onClick={() => setMobileOpen(false)} className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Services</NavLink>
            <NavLink to="/skills" onClick={() => setMobileOpen(false)} className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Skills</NavLink>
            <NavLink to="/projects" onClick={() => setMobileOpen(false)} className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Projects</NavLink>
            <NavLink to="/contact" onClick={() => setMobileOpen(false)} className={({isActive})=>`px-3 py-2 rounded-lg hover:bg-white/10 transition ${isActive? 'bg-white/5':''}`}>Contact</NavLink>
            <a href="/resume.pdf" download className="px-3 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition text-center">Download CV</a>
            {!auth.user ? (
              <button onClick={() => { onLogin && onLogin(); setMobileOpen(false); }} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">Login</button>
            ) : (
              <>
                {auth.user.username === "satyam" && (
                  <NavLink to="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10">Admin</NavLink>
                )}
                <button onClick={() => { dispatch(logout()); setMobileOpen(false); }} className="px-3 py-2 rounded-lg hover:bg-white/10 transition">Logout</button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
