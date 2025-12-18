import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  createService,
  deleteService,
  updateService,
} from "../slices/servicesSlice.js";
import { fetchSkills, createSkill, deleteSkill, updateSkill } from "../slices/skillsSlice.js";
import { fetchProjects, createProject, deleteProject, updateProject } from "../slices/projectsSlice.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();
  const services = useSelector((s) => s.services.items);
  const skills = useSelector((s) => s.skills.items);
  const projects = useSelector((s) => s.projects.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState({ service: null, skill: null, project: null });

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchSkills());
    dispatch(fetchProjects());
  }, [dispatch]);

  async function handleContact(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await axios.post("/api/contacts", {
        name: fd.get("name"),
        email: fd.get("email"),
        message: fd.get("message"),
      });
      e.target.reset();
      toast.success("Message sent");
    } catch (err) {
      toast.error("Failed to send message");
    }
  }

  function handleAddService(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createService({ title: fd.get("title"), description: fd.get("description"), category: fd.get("category") })).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Service added");
      else toast.error("Failed to add service");
    });
    e.target.reset();
  }

  function handleAddSkill(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createSkill({ name: fd.get("name"), category: fd.get("category"), level: Number(fd.get("level") || 0) })).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Skill added");
      else toast.error("Failed to add skill");
    });
    e.target.reset();
  }

  function handleAddProject(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createProject({ name: fd.get("name"), description: fd.get("description"), url: fd.get("url"), repo: fd.get("repo"), stack: fd.get("stack") })).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Project added");
      else toast.error("Failed to add project");
    });
    e.target.reset();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-32">

      {/* --- HERO SECTION --- */}
      <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 motion-safe:animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400">Available for Hire • 2026</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital</span> Excellence.
          </h1>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            I'm a Satyam ( full-stack engineer specializing in the MERN stack ) I build scalable, production-ready applications with a focus on clean code and exceptional UI/UX.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20">View Projects</a>
            <a href="#services" className="px-6 py-3 rounded-xl bg-slate-800 font-bold text-white hover:bg-slate-700 transition">My Services</a>
          </div>
        </div>

        {/* Profile Snapshot Card */}
        <div className="relative motion-safe:animate-slide-up">
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl rounded-full"></div>
          <div className="relative border border-slate-800 rounded-[2.5rem] p-8 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Technical Focus
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                <h3 className="text-sm font-bold text-white">MERN Stack</h3>
                <p className="text-xs text-slate-500">React, Redux, Node, Express, MongoDB</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                <h3 className="text-sm font-bold text-white">Production Engineering</h3>
                <p className="text-xs text-slate-500">AWS, Docker, Cloud</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                <h3 className="text-sm font-bold text-white">Software Development / Artificial Intelligence</h3>
                <p className="text-xs text-slate-500">Web Apps, AI Agents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white">Services</h2>
          <p className="text-slate-500">Solutions tailored to your business needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <article key={s._id}
              className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 motion-safe:animate-fade-in"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {editing.service === s._id ? (
                <form onSubmit={(e) => { /* logic */ }} className="space-y-2">
                  {/* ... your existing inputs ... */}
                  <input name="title" defaultValue={s.title} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-sm" />
                  <textarea name="description" defaultValue={s.description} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-sm" />
                  <div className="flex gap-2">
                    <button className="bg-emerald-500 px-3 py-1 rounded-full text-xs font-bold">Save</button>
                    <button type="button" onClick={() => setEditing(p => ({ ...p, service: null }))} className="bg-slate-700 px-3 py-1 rounded-full text-xs">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 mb-2">{s.category || "Development"}</p>
                  <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
                  {auth.user?.username === "satyam" && (
                    <div className="mt-6 flex gap-4 pt-4 border-t border-slate-800/50">
                      <button onClick={() => setEditing(p => ({ ...p, service: s._id }))} className="text-xs text-emerald-400 underline">Edit</button>
                      <button className="text-xs text-red-400 underline">Delete</button>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* --- SKILLS SECTION (Visualized) --- */}
      <section id="skills" className="space-y-12">
        <h2 className="text-3xl font-bold text-white">Expertise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((sk) => (
            <div key={sk._id} className="space-y-3">
              <div className="flex justify-between items-end">
                <h3 className="font-bold text-white">{sk.name}</h3>
                <span className="text-xs text-emerald-400 font-mono">{sk.level}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                  style={{ width: `${sk.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="space-y-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-5xl font-black text-white">Recent Work</h2>
          <a href="/projects" className="text-emerald-400 font-bold hover:underline transition">View Gallery →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((p, idx) => (
            <div key={p._id}
              className="relative p-[1px] rounded-[2rem] bg-slate-800 hover:bg-gradient-to-br hover:from-emerald-500/50 hover:to-cyan-500/50 transition-all duration-500"
            >
              <div className="relative rounded-[1.95rem] p-8 bg-slate-950 h-full flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(p.stack?.split(',') || []).map((t, i) => (
                    <span key={i} className="text-[9px] font-black bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-800">{t.trim()}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{p.description}</p>
                <div className="flex gap-4">
                  {p.url && <a href={p.url} className="text-emerald-400 text-xs font-bold uppercase tracking-widest hover:text-white">Live Demo</a>}
                  {p.repo && <a href={p.repo} className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white">GitHub</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



    </main>
  );
}
