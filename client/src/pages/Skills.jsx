import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../slices/skillsSlice.js";
import { toast } from "react-toastify";

export default function Skills() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const skills = useSelector((s) => s.skills.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  function handleAddSkill(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createSkill({ name: fd.get("name"), category: fd.get("category"), level: Number(fd.get("level") || 0) })).then((r) => {
      if (r.type.endsWith("/fulfilled")) { toast.success("Skill added"); navigate("/"); }
      else toast.error("Failed to add skill");
    });
    e.target.reset();
  }

  function handleUpdateSkill(id, e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(updateSkill({ id, data: { name: fd.get("name"), category: fd.get("category"), level: Number(fd.get("level") || 0) } })).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Skill updated");
      else toast.error("Failed to update");
    });
    setEditing(null);
  }

  function handleDeleteSkill(id) {
    dispatch(deleteSkill(id)).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Skill deleted");
      else toast.error("Failed to delete");
    });
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold">Skills</h2>

      {auth.user && auth.user.username === "satyam" && (
        <div className="max-w-2xl border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow">
          <h3 className="font-heading font-bold text-base sm:text-lg mb-4">Add New Skill</h3>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Skill Name *</label>
              <input name="name" placeholder="e.g. React, Node.js, Python" required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Category</label>
              <input name="category" placeholder="e.g. Frontend, Backend, Language" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Proficiency Level (0-100) *</label>
              <input name="level" type="number" min="0" max="100" placeholder="85" required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <button type="submit" className="w-full rounded-lg cta py-2.5 font-semibold text-sm sm:text-base">Add Skill</button>
          </form>
        </div>
      )}
    </main>
  );
}
