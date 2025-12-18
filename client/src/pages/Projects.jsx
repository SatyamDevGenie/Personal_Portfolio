import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProjects, createProject, updateProject, deleteProject } from "../slices/projectsSlice.js";
import { toast } from "react-toastify";

const staticProjects = [
  {
    _id: "static_p1",
    name: "AI-Powered CRM Dashboard",
    description: "A custom MERN stack CRM solution integrating OpenAI APIs for automated lead scoring and personalized email generation. Features real-time charting and role-based access control.",
    stack: "MERN Stack, Python, OpenAI API, Redux Toolkit",
    url: "#",
    repo: "#"
  },
  {
    _id: "static_p2",
    name: "Task Automation Bot",
    description: "Developed a Node.js script using Puppeteer and Python to automate repetitive data entry tasks across multiple third-party SaaS platforms, significantly reducing operational time.",
    stack: "Node.js, Puppeteer, Python, MongoDB",
    url: "#",
    repo: "#"
  },
];

export default function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedProjects = useSelector((s) => s.projects.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  const projectsToDisplay = [...fetchedProjects, ...staticProjects];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // --- CRUD Handlers ---
  function handleAddProject(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createProject({ 
      name: fd.get("name"), 
      description: fd.get("description"), 
      url: fd.get("url"), 
      repo: fd.get("repo"), 
      stack: fd.get("stack") 
    })).then((r) => {
      if (r.type.endsWith("/fulfilled")) { 
        toast.success("Project added"); 
        navigate("/projects"); 
      } else toast.error("Failed to add project");
    });
    e.target.reset();
  }

  function handleUpdateProject(id, e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(updateProject({ 
      id, 
      data: { 
        name: fd.get("name"), 
        description: fd.get("description"), 
        url: fd.get("url"), 
        repo: fd.get("repo"), 
        stack: fd.get("stack") 
      } 
    })).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Project updated");
      else toast.error("Failed to update");
    });
    setEditing(null);
  }

  function handleDeleteProject(id) {
    dispatch(deleteProject(id)).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Project deleted");
      else toast.error("Failed to delete");
    });
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-20">
      
      {/* HERO HEADER */}
      <section className="text-center space-y-4 motion-safe:animate-fade-in">
        <h2 className="text-5xl sm:text-5xl font-black text-white tracking-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Projects</span>
        </h2>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          A collection of full-stack applications and automated solutions.
        </p>
        <div className="flex justify-center pt-4">
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
        </div>
      </section>

      {/* ADMIN PANEL */}
      {auth.user && auth.user.username === "satyam" && (
        <div className="max-w-3xl mx-auto motion-safe:animate-slide-up">
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-slate-800 via-emerald-500/50 to-slate-800 shadow-2xl">
            <div className="rounded-[23px] p-6 sm:p-10 bg-slate-950/90 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <span className="p-2 bg-emerald-500/10 rounded-lg">➕</span> Add New Project
              </h3>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="name" placeholder="Project Name" required className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <input name="stack" placeholder="Stack (comma-separated)" className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <textarea name="description" rows={3} placeholder="Project description..." required className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="url" placeholder="Live Demo URL" className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <input name="repo" placeholder="GitHub Repo URL" className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 py-4 font-bold text-white transition hover:brightness-110 active:scale-[0.98]">
                  Publish Project
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projectsToDisplay.map((project, idx) => (
          <div
            key={project._id}
            className="group relative motion-safe:animate-fade-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative h-full border border-slate-800/50 rounded-3xl p-8 bg-slate-900/40 backdrop-blur-sm hover:border-slate-700 transition duration-500 flex flex-col">
              
              {editing === project._id ? (
                <form onSubmit={(e) => handleUpdateProject(project._id, e)} className="space-y-4">
                  <input name="name" defaultValue={project.name} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  <input name="stack" defaultValue={project.stack} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  <textarea name="description" rows={4} defaultValue={project.description} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white resize-none" />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-bold">Save</button>
                    <button type="button" onClick={() => setEditing(null)} className="flex-1 bg-slate-800 text-white py-2 rounded-lg font-bold">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex-grow space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition">
                      {project.name}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* FIXED: Added null check for .split() */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(project.stack?.split(',') || []).map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-[10px] font-bold bg-slate-800 text-cyan-400 rounded-full border border-cyan-500/20 uppercase">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800/50">
                    <div className="flex gap-5">
                      {project.url && project.url !== '#' && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                          Demo <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                      )}
                      {project.repo && project.repo !== '#' && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                          Code <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .319.2.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        </a>
                      )}
                    </div>

                    {auth.user?.username === "satyam" && !project._id.startsWith("static_") && (
                      <div className="flex gap-3">
                        <button onClick={() => setEditing(project._id)} className="text-[10px] font-black text-yellow-500 hover:text-yellow-400 uppercase tracking-tighter">Edit</button>
                        <button onClick={() => handleDeleteProject(project._id)} className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-tighter">Delete</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}


