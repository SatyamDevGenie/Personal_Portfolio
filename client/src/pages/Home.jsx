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
    <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-10 space-y-8 sm:space-y-12 lg:space-y-16">
      {/* Hero */}
      <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div className="space-y-3 sm:space-y-4 motion-safe:animate-slide-up">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Full-Stack MERN • 2026</p>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight neon">Building production-ready MERN applications with clean, modern UIs.</h1>
          <p className="text-sm sm:text-base text-slate-300">I'm a full-stack MERN developer focused on scalable APIs, pixel-perfect React frontends, and smooth developer experience.</p>
        </div>
        <div className="border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-slate-900/60 space-y-3 sm:space-y-4 motion-safe:animate-pop glow">
          <h2 className="font-semibold text-base sm:text-lg">Profile snapshot</h2>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
            <li>MERN Stack • React, Redux, Node, Express, MongoDB</li>
            <li>UI Engineering • Tailwind CSS, responsive design</li>
            <li>Backend • REST APIs, auth, data modeling</li>
          </ul>
        </div>
      </section>

      {/* About */}
      <section id="about" className="space-y-2 sm:space-y-3 motion-safe:animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold">About</h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl">I'm a MERN stack developer who enjoys taking products from idea to deployment. I care about clean architecture, reusable components, and performance—while keeping a strong focus on user experience and business outcomes.</p>
      </section>

      {/* Services */}
      <section id="services" className="space-y-3 sm:space-y-4 motion-safe:animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Services</h2>
          <span className="text-xs text-slate-400">Manage from admin</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((s) => (
            <article key={s._id} className="border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-slate-900/60 motion-safe:animate-slide-up">
              {editing.service === s._id ? (
                <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); dispatch(updateService({ id: s._id, data: { title: fd.get("title"), category: fd.get("category"), description: fd.get("description") } })).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Service updated"); else toast.error("Failed to update"); }); setEditing((p) => ({ ...p, service: null })); }} className="space-y-2">
                  <input name="title" defaultValue={s.title} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <input name="category" defaultValue={s.category} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <textarea name="description" defaultValue={s.description} rows={3} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <div className="flex gap-2">
                    <button className="rounded-full bg-emerald-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold">Save</button>
                    <button type="button" onClick={() => setEditing((p) => ({ ...p, service: null }))} className="rounded-full bg-slate-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-xs text-emerald-300 uppercase">{s.category || "Service"}</p>
                  <h3 className="font-semibold mt-1 text-sm">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2">{s.description}</p>
                  {auth.user && auth.user.username === "satyam" && (
                    <div className="mt-3 flex gap-3">
                      <button onClick={() => dispatch(deleteService(s._id)).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Service deleted"); else toast.error("Failed to delete"); })} className="text-xs text-red-300 underline">Delete</button>
                      <button onClick={() => setEditing((p) => ({ ...p, service: s._id }))} className="text-xs text-emerald-300 underline">Edit</button>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="space-y-3 sm:space-y-4 motion-safe:animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {skills.map((sk) => (
            <div key={sk._id} className="border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-slate-900/60 motion-safe:animate-pop">
              {editing.skill === sk._id ? (
                <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); dispatch(updateSkill({ id: sk._id, data: { name: fd.get("name"), category: fd.get("category"), level: Number(fd.get("level") || 0) } })).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Skill updated"); else toast.error("Failed to update"); }); setEditing((p) => ({ ...p, skill: null })); }} className="space-y-2">
                  <input name="name" defaultValue={sk.name} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <input name="category" defaultValue={sk.category} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <input name="level" type="number" defaultValue={sk.level} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <div className="flex gap-2">
                    <button className="rounded-full bg-emerald-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold">Save</button>
                    <button type="button" onClick={() => setEditing((p) => ({ ...p, skill: null }))} className="rounded-full bg-slate-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-emerald-300">{sk.category}</p>
                      <h3 className="font-semibold text-sm">{sk.name}</h3>
                    </div>
                    <span className="text-xs sm:text-sm text-emerald-300 whitespace-nowrap">{sk.level}%</span>
                  </div>
                  <div className="h-2 mt-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-500" style={{ width: `${sk.level}%` }} />
                  </div>
                  {auth.user && auth.user.username === "satyam" && (
                    <div className="mt-3 flex gap-3">
                      <button onClick={() => dispatch(deleteSkill(sk._id)).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Skill deleted"); else toast.error("Failed to delete"); })} className="text-xs text-red-300 underline">Delete</button>
                      <button onClick={() => setEditing((p) => ({ ...p, skill: sk._id }))} className="text-xs text-emerald-300 underline">Edit</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="space-y-3 sm:space-y-4 motion-safe:animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {projects.map((p) => (
            <article key={p._id} className="border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-slate-900/60 motion-safe:animate-slide-up">
              {editing.project === p._id ? (
                <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); dispatch(updateProject({ id: p._id, data: { name: fd.get("name"), description: fd.get("description"), url: fd.get("url"), repo: fd.get("repo"), stack: fd.get("stack") } })).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Project updated"); else toast.error("Failed to update"); }); setEditing((q) => ({ ...q, project: null })); }} className="space-y-2">
                  <input name="name" defaultValue={p.name} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <input name="stack" defaultValue={p.stack} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <textarea name="description" defaultValue={p.description} rows={3} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <input name="url" defaultValue={p.url} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <input name="repo" defaultValue={p.repo} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                  <div className="flex gap-2">
                    <button className="rounded-full bg-emerald-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold">Save</button>
                    <button type="button" onClick={() => setEditing((q) => ({ ...q, project: null }))} className="rounded-full bg-slate-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-xs text-emerald-300">{p.stack}</p>
                  <h3 className="font-semibold mt-1 text-sm">{p.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2">{p.description}</p>
                  <div className="flex gap-3 text-xs text-emerald-300 mt-3">
                    {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="underline">Live</a>}
                    {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="underline">Repo</a>}
                  </div>
                  {auth.user && auth.user.username === "satyam" && (
                    <div className="mt-3 flex gap-3">
                      <button onClick={() => dispatch(deleteProject(p._id)).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Project deleted"); else toast.error("Failed to delete"); })} className="text-xs text-red-300 underline">Delete</button>
                      <button onClick={() => setEditing((q) => ({ ...q, project: p._id }))} className="text-xs text-emerald-300 underline">Edit</button>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>


    </main>
  );
}
