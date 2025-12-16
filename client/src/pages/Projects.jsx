import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProjects, createProject, updateProject, deleteProject } from "../slices/projectsSlice.js";
import { toast } from "react-toastify";

// Define static projects that must always be displayed
const staticProjects = [
  {
    _id: "static_p1",
    name: "AI-Powered CRM Dashboard - Upcoming",
    description: "A custom MERN stack CRM solution integrating OpenAI APIs for automated lead scoring and personalized email generation. Features real-time charting and role-based access control.",
    stack: "MERN Stack, Python, OpenAI API, Redux Toolkit",
    url: "#", // Placeholder for live URL
    repo: "#"  // Placeholder for GitHub URL
  },
 
  {
    _id: "static_p2",
    name: "Task Automation Bot - Upcoming",
    description: "Developed a Node.js script using Puppeteer and Python to automate repetitive data entry tasks across multiple third-party SaaS platforms, significantly reducing operational time.",
    stack: "Node.js, Puppeteer, Python, MongoDB",
    url: "#",
    repo: "#"
  },
];

export default function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetched projects from Redux store
  const fetchedProjects = useSelector((s) => s.projects.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  // Combine fetched projects and static projects. 
  const projectsToDisplay = [...fetchedProjects, ...staticProjects];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // --- CRUD Handlers (Updated Navigation) ---

  function handleAddProject(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createProject({ name: fd.get("name"), description: fd.get("description"), url: fd.get("url"), repo: fd.get("repo"), stack: fd.get("stack") })).then((r) => {
      // Changed navigation from "/" to "/projects" to stay on the projects page
      if (r.type.endsWith("/fulfilled")) { toast.success("Project added"); navigate("/projects"); }
      else toast.error("Failed to add project");
    });
    e.target.reset();
  }

  function handleUpdateProject(id, e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(updateProject({ id, data: { name: fd.get("name"), description: fd.get("description"), url: fd.get("url"), repo: fd.get("repo"), stack: fd.get("stack") } })).then((r) => {
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

  // --- Component Render ---

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <h2 className="text-4xl font-extrabold text-white border-b border-slate-800 pb-2">Featured Projects</h2>

      {/* ADMIN: Add New Project Form (Only visible to 'satyam') */}
      {auth.user && auth.user.username === "satyam" && (
        <div className="max-w-2xl border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow">
          <h3 className="font-heading font-bold text-base sm:text-lg mb-4 text-emerald-400">➕ Admin Panel: Add New Project</h3>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Project Name *</label>
              <input name="name" placeholder="e.g. Portfolio 2026" required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Tech Stack</label>
              <input name="stack" placeholder="e.g. MERN, Next.js, React + Node" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Description *</label>
              <textarea name="description" rows={3} placeholder="Describe your project..." required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition resize-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Live URL</label>
                <input name="url" placeholder="https://example.com" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Repository URL</label>
                <input name="repo" placeholder="https://github.com/user/repo" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
              </div>
            </div>
            <button type="submit" className="w-full rounded-lg cta py-2.5 font-semibold text-sm sm:text-base">Add Project</button>
          </form>
        </div>
      )}

      {/* PROJECTS LIST (Visible to ALL Users - Combines Static and Dynamic) */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsToDisplay.map((project) => (
            <div
              key={project._id}
              className="border border-slate-800 rounded-xl p-6 space-y-4 bg-slate-900 hover:border-cyan-500/50 transition duration-300"
            >

              {/* Check if service is dynamic (can be edited/deleted) or static */}
              {project._id.startsWith("static_") || editing !== project._id || auth.user?.username !== "satyam" ? (
                // --- Display Project Card ---
                <>
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <p className="text-slate-400 text-base leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 text-xs text-cyan-400">
                    {project.stack.split(',').map((tech, index) => (
                      <span key={index} className="px-2 py-0.5 rounded bg-cyan-900/30 font-medium">{tech.trim()}</span>
                    ))}
                  </div>

                  <div className="pt-2 flex gap-4 text-sm font-semibold">
                    {project.url && project.url !== '#' && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        Live Demo
                      </a>
                    )}
                    {project.repo && project.repo !== '#' && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.254.793-.564 0-.279-.01-1.026-.015-2.016-3.338.723-4.04-1.608-4.04-1.608-.546-1.387-1.334-1.756-1.334-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.996.108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.236-3.221-.124-.304-.536-1.523.116-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.398 3.003-.404 1.02.006 2.046.138 3.003.404 2.292-1.552 3.297-1.23 3.297-1.23.652 1.653.24 2.872.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.805 5.62-5.478 5.922.43.37.823 1.102.823 2.222 0 1.606-.015 2.894-.015 3.284 0 .315.187.676.8.563C20.562 21.387 24 16.88 24 12c0-6.627-5.374-12-12-12z" /></svg>
                        Repository
                      </a>
                    )}
                  </div>

                  {/* Admin Controls for Dynamic Projects Only */}
                  {auth.user && auth.user.username === "satyam" && !project._id.startsWith("static_") && (
                    <div className="pt-3 flex gap-2 border-t border-slate-800 mt-4">
                      <button onClick={() => setEditing(project._id)} className="text-xs text-yellow-400 hover:text-yellow-300 transition">Edit</button>
                      <span className="text-slate-700">|</span>
                      <button onClick={() => handleDeleteProject(project._id)} className="text-xs text-red-500 hover:text-red-400 transition">Delete</button>
                    </div>
                  )}
                </>
              ) : (
                // --- Edit Project Form (Only for 'satyam' and Dynamic Projects) ---
                <form onSubmit={(e) => handleUpdateProject(project._id, e)} className="space-y-4">
                  <h3 className="font-heading font-bold text-base text-cyan-400">Editing: {project.name}</h3>

                  <input name="name" defaultValue={project.name} required placeholder="Project Name" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                  <input name="stack" defaultValue={project.stack} placeholder="Tech Stack (comma-separated)" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                  <textarea name="description" rows={3} defaultValue={project.description} required placeholder="Description" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition resize-none" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="url" defaultValue={project.url} placeholder="Live URL" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                    <input name="repo" defaultValue={project.repo} placeholder="Repository URL" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                  </div>

                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 rounded-lg bg-emerald-600 py-2 text-white font-semibold text-sm hover:bg-emerald-500 transition">Save Changes</button>
                    <button type="button" onClick={() => setEditing(null)} className="rounded-lg bg-slate-700 py-2 px-4 text-white font-semibold text-sm hover:bg-slate-600 transition">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Fallback Message */}
      {projectsToDisplay.length === 0 && (
        <p className="text-center text-slate-500 mt-10">No projects currently listed. Check back soon!</p>
      )}

    </main>
  );
}