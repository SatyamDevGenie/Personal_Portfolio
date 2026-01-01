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
import { staticServices, staticSkills, staticProjects, staticTestimonials } from "../data/staticData.js";
import { dataManager } from "../utils/dataManager.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();
  // Use static data for homepage display, fallback to Redux store for admin functionality
  const reduxServices = useSelector((s) => s.services.items);
  const reduxSkills = useSelector((s) => s.skills.items);
  const reduxProjects = useSelector((s) => s.projects.items);
  const auth = useSelector((s) => s.auth);
  
  // Use static data for display, Redux data for admin editing
  const services = auth.user?.username === "satyam" && reduxServices.length > 0 ? reduxServices : staticServices;
  const skills = auth.user?.username === "satyam" && reduxSkills.length > 0 ? reduxSkills : staticSkills;
  const projects = auth.user?.username === "satyam" && reduxProjects.length > 0 ? reduxProjects : staticProjects;
  
  const [editing, setEditing] = useState({ service: null, skill: null, project: null });
  const [staticDataVersion, setStaticDataVersion] = useState(0); // Force re-render when static data changes

  useEffect(() => {
    // Only fetch data if user is authenticated admin
    if (auth.user?.username === "satyam") {
      dispatch(fetchServices());
      dispatch(fetchSkills());
      dispatch(fetchProjects());
    }
  }, [dispatch, auth.user]);

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
    const serviceData = { 
      title: fd.get("title"), 
      description: fd.get("description"), 
      category: fd.get("category") 
    };

    if (auth.user?.username === "satyam" && reduxServices.length > 0) {
      // Use Redux/API for admin with existing data
      dispatch(createService(serviceData)).then((r) => {
        if (r.type.endsWith("/fulfilled")) toast.success("Service added");
        else toast.error("Failed to add service");
      });
    } else {
      // Use static data manager
      try {
        dataManager.addService(serviceData);
        setStaticDataVersion(v => v + 1); // Force re-render
        toast.success("Service added to static data");
      } catch (err) {
        toast.error("Failed to add service");
      }
    }
    e.target.reset();
  }

  function handleAddSkill(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const skillData = { 
      name: fd.get("name"), 
      category: fd.get("category"), 
      level: Number(fd.get("level") || 0) 
    };

    if (auth.user?.username === "satyam" && reduxSkills.length > 0) {
      // Use Redux/API for admin with existing data
      dispatch(createSkill(skillData)).then((r) => {
        if (r.type.endsWith("/fulfilled")) toast.success("Skill added");
        else toast.error("Failed to add skill");
      });
    } else {
      // Use static data manager
      try {
        dataManager.addSkill(skillData);
        setStaticDataVersion(v => v + 1); // Force re-render
        toast.success("Skill added to static data");
      } catch (err) {
        toast.error("Failed to add skill");
      }
    }
    e.target.reset();
  }

  function handleAddProject(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const projectData = { 
      name: fd.get("name"), 
      description: fd.get("description"), 
      url: fd.get("url"), 
      repo: fd.get("repo"), 
      stack: fd.get("stack") 
    };

    if (auth.user?.username === "satyam" && reduxProjects.length > 0) {
      // Use Redux/API for admin with existing data
      dispatch(createProject(projectData)).then((r) => {
        if (r.type.endsWith("/fulfilled")) toast.success("Project added");
        else toast.error("Failed to add project");
      });
    } else {
      // Use static data manager
      try {
        dataManager.addProject(projectData);
        setStaticDataVersion(v => v + 1); // Force re-render
        toast.success("Project added to static data");
      } catch (err) {
        toast.error("Failed to add project");
      }
    }
    e.target.reset();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-32">

      {/* --- HERO SECTION --- */}
      <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 motion-safe:animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary-400">Available for Hire • 2026</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 neon">Digital</span> Excellence.
          </h1>
          <p className="text-lg text-dark-300 max-w-lg leading-relaxed">
            I'm a Satyam ( full-stack engineer specializing in the MERN stack ) I build scalable, production-ready applications with a focus on clean code and exceptional UI/UX.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-gradient-primary font-bold text-white hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">View Projects</a>
            <a href="#services" className="px-6 py-3 rounded-xl bg-dark-850 border border-primary-500/30 font-bold text-white hover:bg-dark-800 hover:border-primary-500/50 transition-all duration-300">My Services</a>
          </div>
        </div>

        {/* Profile Snapshot Card */}
        <div className="relative motion-safe:animate-slide-up">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 blur-3xl rounded-full animate-blob"></div>
          <div className="relative border border-primary-500/20 rounded-[2.5rem] p-8 bg-gradient-to-br from-dark-850/80 to-dark-900/80 backdrop-blur-xl shadow-glow space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Technical Focus
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-dark-900/50 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300">
                <h3 className="text-sm font-bold text-white">MERN Stack</h3>
                <p className="text-xs text-dark-400">React, Redux, Node, Express, MongoDB</p>
              </div>
              <div className="p-4 rounded-2xl bg-dark-900/50 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300">
                <h3 className="text-sm font-bold text-white">Production Engineering</h3>
                <p className="text-xs text-dark-400">AWS, Docker, Cloud</p>
              </div>
              <div className="p-4 rounded-2xl bg-dark-900/50 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300">
                <h3 className="text-sm font-bold text-white">Software Development / Artificial Intelligence</h3>
                <p className="text-xs text-dark-400">Web Apps, AI Agents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white">Services</h2>
          <p className="text-dark-400">Solutions tailored to your business needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <article key={s._id}
              className="group relative p-8 rounded-3xl bg-gradient-card border border-primary-500/20 hover:border-primary-500/50 transition-all duration-500 motion-safe:animate-fade-in glow"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {editing.service === s._id ? (
                <form onSubmit={(e) => { /* logic */ }} className="space-y-2">
                  {/* ... your existing inputs ... */}
                  <input name="title" defaultValue={s.title} className="w-full bg-dark-900 border border-primary-500/30 rounded-lg p-2 text-white text-sm focus:border-primary-500" />
                  <textarea name="description" defaultValue={s.description} className="w-full bg-dark-900 border border-primary-500/30 rounded-lg p-2 text-white text-sm focus:border-primary-500" />
                  <div className="flex gap-2">
                    <button className="bg-gradient-primary px-3 py-1 rounded-full text-xs font-bold text-white">Save</button>
                    <button type="button" onClick={() => setEditing(p => ({ ...p, service: null }))} className="bg-dark-700 px-3 py-1 rounded-full text-xs text-white">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-400/60 mb-2">{s.category || "Development"}</p>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors">{s.title}</h3>
                  <p className="text-sm text-dark-300 leading-relaxed">{s.description}</p>
                  {auth.user?.username === "satyam" && reduxServices.length > 0 && (
                    <div className="mt-6 flex gap-4 pt-4 border-t border-primary-500/20">
                      <button onClick={() => setEditing(p => ({ ...p, service: s._id }))} className="text-xs text-primary-400 hover:text-primary-300 underline transition-colors">Edit</button>
                      <button className="text-xs text-red-400 hover:text-red-300 underline transition-colors">Delete</button>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
        
        {/* Admin Add Service Form */}
        {auth.user?.username === "satyam" && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-card border border-primary-500/20 glow">
            <h3 className="text-lg font-bold text-white mb-4">Add New Service</h3>
            <form onSubmit={handleAddService} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Service Title" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" required />
                <input name="category" placeholder="Category" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" />
              </div>
              <textarea name="description" placeholder="Service Description" rows="3" className="w-full bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" required />
              <button type="submit" className="bg-gradient-primary hover:shadow-glow-lg px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:-translate-y-1">Add Service</button>
            </form>
          </div>
        )}
      </section>

      {/* --- SKILLS SECTION (Visualized) --- */}
      <section id="skills" className="space-y-12">
        <h2 className="text-3xl font-bold text-white">Expertise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((sk) => (
            <div key={sk._id} className="space-y-3">
              <div className="flex justify-between items-end">
                <h3 className="font-bold text-white">{sk.name}</h3>
                <span className="text-xs text-primary-400 font-mono">{sk.level}%</span>
              </div>
              <div className="h-2 w-full bg-dark-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-1000 rounded-full"
                  style={{ width: `${sk.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Admin Add Skill Form */}
        {auth.user?.username === "satyam" && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-card border border-primary-500/20 glow">
            <h3 className="text-lg font-bold text-white mb-4">Add New Skill</h3>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="name" placeholder="Skill Name" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" required />
                <input name="category" placeholder="Category" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" />
                <input name="level" type="number" min="0" max="100" placeholder="Level (0-100)" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" required />
              </div>
              <button type="submit" className="bg-gradient-primary hover:shadow-glow-lg px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:-translate-y-1">Add Skill</button>
            </form>
          </div>
        )}
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white">Featured <span className="text-transparent bg-clip-text bg-gradient-primary neon">Projects</span></h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto leading-relaxed">
            A collection of full-stack applications and automated solutions showcasing modern web development.
          </p>
          <div className="flex justify-center pt-4">
            <div className="h-1.5 w-24 bg-gradient-primary rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((p, idx) => (
            <div key={p._id}
              className="group relative motion-safe:animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative h-full border border-primary-500/20 rounded-3xl p-8 bg-gradient-card backdrop-blur-sm hover:border-primary-500/40 transition duration-500 flex flex-col glow">
                <div className="flex-grow space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition">
                    {p.name}
                  </h3>
                  <p className="text-dark-300 leading-relaxed text-sm">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {(p.stack?.split(',') || []).map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-[10px] font-bold bg-dark-800 text-primary-400 rounded-full border border-primary-500/20 uppercase">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-500/20">
                  <div className="flex gap-5">
                    {p.url && p.url !== '#' && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        Demo <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    )}
                    {p.repo && p.repo !== '#' && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-white transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                        Code <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .319.2.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                      </a>
                    )}
                  </div>

                  {auth.user?.username === "satyam" && (
                    <div className="flex gap-3">
                      <button onClick={() => setEditing(p => ({ ...p, project: p._id }))} className="text-[10px] font-black text-accent-500 hover:text-accent-400 uppercase tracking-tighter transition-colors">Edit</button>
                      <button onClick={() => {
                        if (auth.user?.username === "satyam" && reduxProjects.length > 0) {
                          dispatch(deleteProject(p._id)).then((r) => {
                            if (r.type.endsWith("/fulfilled")) toast.success("Project deleted");
                            else toast.error("Failed to delete");
                          });
                        }
                      }} className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-tighter transition-colors">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Admin Add Project Form */}
        {auth.user?.username === "satyam" && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-card border border-primary-500/20 glow">
            <h3 className="text-lg font-bold text-white mb-4">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" placeholder="Project Name" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" required />
                <input name="stack" placeholder="Tech Stack (comma separated)" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" />
              </div>
              <textarea name="description" placeholder="Project Description" rows="3" className="w-full bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="url" placeholder="Live Demo URL" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" />
                <input name="repo" placeholder="GitHub Repository URL" className="bg-dark-900 border border-primary-500/30 rounded-lg p-3 text-white focus:border-primary-500 transition-colors" />
              </div>
              <button type="submit" className="bg-gradient-primary hover:shadow-glow-lg px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:-translate-y-1">Add Project</button>
            </form>
          </div>
        )}
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white">Client <span className="text-transparent bg-clip-text bg-gradient-primary neon">Testimonials</span></h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto leading-relaxed">
            What my clients say about working with me and the solutions I deliver.
          </p>
          <div className="flex justify-center pt-4">
            <div className="h-1.5 w-24 bg-gradient-primary rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {staticTestimonials.map((testimonial, idx) => (
            <div key={testimonial._id}
              className="group relative motion-safe:animate-fade-in"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative h-full border border-primary-500/20 rounded-3xl p-8 bg-gradient-card backdrop-blur-sm hover:border-primary-500/40 transition duration-500 flex flex-col glow">
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-dark-200 leading-relaxed text-sm mb-6 flex-grow italic">
                  "{testimonial.review}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-primary-500/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/30 to-secondary-400/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-300 font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                    <p className="text-dark-400 text-xs">Satisfied Client</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



    </main>
  );
}
