import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProjects, createProject, updateProject, deleteProject } from "../slices/projectsSlice.js";
import { toast } from "react-toastify";

export default function Projects() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const projects = useSelector((s) => s.projects.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  function handleAddProject(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createProject({ name: fd.get("name"), description: fd.get("description"), url: fd.get("url"), repo: fd.get("repo"), stack: fd.get("stack") })).then((r) => {
      if (r.type.endsWith("/fulfilled")) { toast.success("Project added"); navigate("/"); }
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

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold">Projects</h2>

      {auth.user && auth.user.username === "satyam" && (
        <div className="max-w-2xl border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow">
          <h3 className="font-heading font-bold text-base sm:text-lg mb-4">Add New Project</h3>
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
    </main>
  );
}
