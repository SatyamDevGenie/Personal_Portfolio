import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../slices/skillsSlice.js";
import { toast } from "react-toastify";

// Define static skills that must always be displayed
const staticSkills = [
  // Core MERN Stack
  { _id: "static_s1", name: "React / Redux", category: "Frontend", level: 90 },
  { _id: "static_s2", name: "Node.js / Express", category: "Backend", level: 85 },
  { _id: "static_s3", name: "MongoDB", category: "Database", level: 80 },
  
  // Languages & Tools
  { _id: "static_s4", name: "JavaScript (ES6+)", category: "Language", level: 95 },
  { _id: "static_s5", name: "Tailwind CSS", category: "Styling", level: 90 },
  { _id: "static_s6", name: "Python", category: "AI/Automation", level: 75 },
  
  // DevOps & Other
  { _id: "static_s7", name: "Git & GitHub", category: "Tools & DevOps", level: 85 },
  { _id: "static_s8", name: "REST APIs", category: "Backend", level: 90 },
];

export default function Skills() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Fetched skills from Redux store
  const fetchedSkills = useSelector((s) => s.skills.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  // Combine fetched skills and static skills
  const skillsToDisplay = [...fetchedSkills, ...staticSkills];

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  // --- Utility to group skills by category ---
  const groupedSkills = skillsToDisplay.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});


  // --- CRUD Handlers (Unchanged Logic) ---

  function handleAddSkill(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createSkill({ name: fd.get("name"), category: fd.get("category"), level: Number(fd.get("level") || 0) })).then((r) => {
      // Changed navigation from "/" to "/skills" to stay on the skills page
      if (r.type.endsWith("/fulfilled")) { toast.success("Skill added"); navigate("/skills"); } 
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

  // --- Component Render ---

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <h2 className="text-4xl font-extrabold text-white border-b border-slate-800 pb-2">Technical Skills & Expertise</h2>

      {/* ADMIN: Add New Skill Form (Only visible to 'satyam') */}
      {auth.user && auth.user.username === "satyam" && (
        <div className="max-w-2xl border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow">
          <h3 className="font-heading font-bold text-base sm:text-lg mb-4 text-emerald-400">🛠️ Admin Panel: Add New Skill</h3>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Skill Name *</label>
              <input name="name" placeholder="e.g. Docker, TypeScript" required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
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

      {/* SKILLS LIST (Visible to ALL Users - Grouped by Category) */}
      <section className="space-y-8">
        {Object.keys(groupedSkills).map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mb-4">{category}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {groupedSkills[category].map((skill) => (
                <div key={skill._id} className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  
                  {/* Skill Card / Edit Form Conditional */}
                  {skill._id.startsWith("static_") || editing !== skill._id || auth.user?.username !== "satyam" ? (
                    // --- Display Skill (For all users & static skills) ---
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-base font-semibold text-white">{skill.name}</span>
                        <span className="text-xs text-slate-400">{skill.level}%</span>
                      </div>
                      
                      {/* Proficiency Bar */}
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden relative">
                        <div 
                          className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-1000 ease-out" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      
                      {/* Admin Controls for Dynamic Skills Only */}
                      {auth.user && auth.user.username === "satyam" && !skill._id.startsWith("static_") && (
                        <div className="pt-2 flex gap-2">
                          <button onClick={() => setEditing(skill._id)} className="text-xs text-yellow-400 hover:text-yellow-300 transition">Edit</button>
                          <span className="text-slate-700">|</span>
                          <button onClick={() => handleDeleteSkill(skill._id)} className="text-xs text-red-500 hover:text-red-400 transition">Delete</button>
                        </div>
                      )}
                    </>
                  ) : (
                    // --- Edit Skill Form (Only for 'satyam' and Dynamic Skills) ---
                    <form onSubmit={(e) => handleUpdateSkill(skill._id, e)} className="space-y-2">
                      <h4 className="text-sm font-semibold text-cyan-400">Editing: {skill.name}</h4>
                      <input name="name" defaultValue={skill.name} required className="w-full rounded-lg px-3 py-1 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                      <input name="category" defaultValue={skill.category} placeholder="Category" className="w-full rounded-lg px-3 py-1 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                      <input name="level" type="number" min="0" max="100" defaultValue={skill.level} required className="w-full rounded-lg px-3 py-1 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                      <div className="flex gap-2 pt-1">
                        <button type="submit" className="flex-1 rounded-lg bg-emerald-600 py-1 text-white font-semibold text-xs hover:bg-emerald-500 transition">Save</button>
                        <button type="button" onClick={() => setEditing(null)} className="rounded-lg bg-slate-700 py-1 px-3 text-white font-semibold text-xs hover:bg-slate-600 transition">Cancel</button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Fallback Message only if BOTH dynamic and static lists are completely empty */}
        {skillsToDisplay.length === 0 && (
          <p className="text-center text-slate-500 mt-10">No skills currently listed.</p>
        )}
      </section>
    </main>
  );
}



