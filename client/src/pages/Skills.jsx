import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../slices/skillsSlice.js";
import { toast } from "react-toastify";

const staticSkills = [
  { _id: "static_s1", name: "React / Redux", category: "Frontend", level: 90 },
  { _id: "static_s2", name: "Node.js / Express", category: "Backend", level: 85 },
  { _id: "static_s3", name: "MongoDB", category: "Database", level: 80 },
  { _id: "static_s4", name: "JavaScript (ES6+)", category: "Language", level: 95 },
  { _id: "static_s5", name: "Tailwind CSS", category: "Styling", level: 90 },
  { _id: "static_s6", name: "Python", category: "AI/Automation", level: 75 },
  { _id: "static_s7", name: "Git & GitHub", category: "Tools & DevOps", level: 85 },
  { _id: "static_s8", name: "REST APIs", category: "Backend", level: 90 },
];

export default function Skills() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchedSkills = useSelector((s) => s.skills.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  const skillsToDisplay = [...fetchedSkills, ...staticSkills];

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const groupedSkills = skillsToDisplay.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  // --- CRUD Handlers (Unchanged) ---
  function handleAddSkill(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createSkill({ name: fd.get("name"), category: fd.get("category"), level: Number(fd.get("level") || 0) })).then((r) => {
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

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-24">

      {/* HERO SECTION */}
      <section className="text-center space-y-6 motion-safe:animate-fade-in">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Stacks</span>
        </h2>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
          A comprehensive overview of my proficiency in modern web technologies,
          architecture, and automated workflows.
        </p>
        <div className="flex justify-center">
          <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
        </div>
      </section>

      {/* ADMIN PANEL */}
      {auth.user && auth.user.username === "satyam" && (
        <section className="max-w-2xl mx-auto motion-safe:animate-slide-up">
          <div className="p-[1px] rounded-2xl bg-gradient-to-br from-emerald-500/50 to-cyan-500/50 shadow-2xl">
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-950/90 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <span className="text-emerald-400">🛠️</span> Update Technical Arsenal
              </h3>
              <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <input name="name" placeholder="Skill Name (e.g., Docker)" required className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 transition outline-none" />
                </div>
                <input name="category" placeholder="Category" required className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 transition outline-none" />
                <input name="level" type="number" min="0" max="100" placeholder="Level (0-100)" required className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 transition outline-none" />
                <button type="submit" className="sm:col-span-2 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 py-3.5 font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]">
                  Add Technical Skill
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* SKILLS GROUPED BY CATEGORY */}
      <section className="space-y-20">
        {Object.keys(groupedSkills).map((category, catIndex) => (
          <div key={category} className="space-y-8 motion-safe:animate-fade-in" style={{ animationDelay: `${catIndex * 150}ms` }}>
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-white whitespace-nowrap">{category}</h3>
              <div className="h-px bg-slate-800 w-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {groupedSkills[category].map((skill) => (
                <div key={skill._id} className="group relative">
                  {editing === skill._id ? (
                    /* EDIT FORM */
                    <form onSubmit={(e) => handleUpdateSkill(skill._id, e)} className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/50 space-y-4">
                      <input name="name" defaultValue={skill.name} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                      <div className="flex gap-4">
                        <input name="category" defaultValue={skill.category} className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                        <input name="level" type="number" defaultValue={skill.level} className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-bold">Save</button>
                        <button type="button" onClick={() => setEditing(null)} className="flex-1 bg-slate-700 text-white py-2 rounded-lg">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    /* SKILL CARD */
                    <div className="space-y-3 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.02]">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                            {skill.name}
                          </h4>
                        </div>
                        <span className="font-mono text-sm text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Modern Progress Bar */}
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>

                      {/* Admin Controls */}
                      {auth.user?.username === "satyam" && !skill._id.startsWith("static_") && (
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                          <button onClick={() => setEditing(skill._id)} className="text-[10px] uppercase font-bold text-yellow-500 tracking-wider">Edit</button>
                          <button onClick={() => handleDeleteSkill(skill._id)} className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Delete</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER CTA */}
      <section className="text-center py-12 border-t border-slate-900">
        <p className="text-slate-500 italic">Always learning, always evolving. Current focus: GenAI & LLM Orchestration.</p>
      </section>

    </main>
  );
}