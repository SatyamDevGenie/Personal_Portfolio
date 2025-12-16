import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../slices/skillsSlice.js";
import { toast } from "react-toastify";

export default function Skills() {
  const dispatch = useDispatch();
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
      if (r.type.endsWith("/fulfilled")) toast.success("Skill added");
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
    <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-10 space-y-4 sm:space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>

      {auth.user && auth.user.username === "satyam" && (
        <div className="border border-slate-800 rounded-xl sm:rounded-2xl p-4 bg-slate-900/60">
          <h3 className="font-semibold mb-2 sm:mb-3 text-sm">Add New Skill</h3>
          <form onSubmit={handleAddSkill} className="space-y-2 text-xs sm:text-sm">
            <input name="name" placeholder="Skill name" required className="w-full rounded-lg sm:rounded-xl px-3 py-2 bg-slate-950 border border-slate-800" />
            <input name="category" placeholder="Category" className="w-full rounded-lg sm:rounded-xl px-3 py-2 bg-slate-950 border border-slate-800" />
            <input name="level" type="number" placeholder="Level (0-100)" required className="w-full rounded-lg sm:rounded-xl px-3 py-2 bg-slate-950 border border-slate-800" />
            <button type="submit" className="w-full rounded-full bg-emerald-500 text-slate-900 font-semibold py-2 text-sm hover:bg-emerald-400 transition">Add Skill</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {skills.map((sk) => (
          <div key={sk._id} className="border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-slate-900/60">
            {editing === sk._id ? (
              <form onSubmit={(e) => handleUpdateSkill(sk._id, e)} className="space-y-2">
                <input name="name" defaultValue={sk.name} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                <input name="category" defaultValue={sk.category} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                <input name="level" type="number" defaultValue={sk.level} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                <div className="flex gap-2">
                  <button className="rounded-full bg-emerald-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold">Save</button>
                  <button type="button" onClick={() => setEditing(null)} className="rounded-full bg-slate-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">Cancel</button>
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
                    <button onClick={() => handleDeleteSkill(sk._id)} className="text-xs text-red-300 underline">Delete</button>
                    <button onClick={() => setEditing(sk._id)} className="text-xs text-emerald-300 underline">Edit</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
