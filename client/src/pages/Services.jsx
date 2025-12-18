import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServices, createService, updateService, deleteService } from "../slices/servicesSlice.js";
import { toast } from "react-toastify";

export default function Services() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const fetchedServices = useSelector((s) => s.services.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  const staticServices = [
    { 
      _id: "static_s1", 
      title: "Full-Stack Web Development (MERN)", 
      category: "Development", 
      description: "End-to-end development of modern, scalable web applications using the MERN stack (MongoDB, Express, React, Node.js). Focused on performance and clean architecture.",
      icon: "🚀"
    },
    { 
      _id: "static_s2", 
      title: "AI & Workflow Automation", 
      category: "Automation", 
      description: "Implementing custom AI solutions and automated workflows to streamline business processes, reduce manual effort, and enhance data insights.",
      icon: "🤖"
    },
    { 
      _id: "static_s3", 
      title: "UI/UX & Frontend Engineering", 
      category: "Design & Frontend", 
      description: "Crafting beautiful, responsive, and highly intuitive user interfaces (UI) with a strong focus on user experience (UX) using React and modern CSS frameworks like Tailwind CSS.",
      icon: "🎨"
    },
  ];

  const servicesToDisplay = [...fetchedServices, ...staticServices];

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // --- CRUD Handlers (Unchanged) ---
  function handleAddService(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createService({ title: fd.get("title"), description: fd.get("description"), category: fd.get("category") })).then((r) => {
      if (r.type.endsWith("/fulfilled")) { toast.success("Service added"); navigate("/services"); }
      else toast.error("Failed to add service");
    });
    e.target.reset();
  }

  function handleUpdateService(id, e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(updateService({ id, data: { title: fd.get("title"), category: fd.get("category"), description: fd.get("description") } })).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Service updated");
      else toast.error("Failed to update");
    });
    setEditing(null);
  }

  function handleDeleteService(id) {
    dispatch(deleteService(id)).then((r) => {
      if (r.type.endsWith("/fulfilled")) toast.success("Service deleted");
      else toast.error("Failed to delete");
    });
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-20 overflow-hidden">
      
      {/* HERO HEADER */}
      <section className="text-center space-y-4 motion-safe:animate-fade-in">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Srevices provided by & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Satyam Sawant</span>
        </h2>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
          High-performance services tailored to modern business needs, from architecture to AI integration.
        </p>
        <div className="flex justify-center pt-4">
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
        </div>
      </section>

      {/* ADMIN: Add New Service Form */}
      {auth.user && auth.user.username === "satyam" && (
        <section className="max-w-2xl mx-auto motion-safe:animate-slide-up">
          <div className="relative group p-[1px] rounded-2xl bg-gradient-to-br from-emerald-500/50 to-cyan-500/50">
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-950/90 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <span className="text-emerald-400 text-2xl">⚡</span> Admin: Expand Your Offerings
              </h3>
              <form onSubmit={handleAddService} className="space-y-4">
                <input name="title" placeholder="Service Title" required className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 transition outline-none" />
                <input name="category" placeholder="Category (e.g. AI, Backend)" className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 transition outline-none" />
                <textarea name="description" rows={3} placeholder="Describe the value you provide..." required className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 transition outline-none resize-none" />
                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 py-3.5 font-bold text-white shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5">
                  Deploy New Service
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* SERVICE LIST GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesToDisplay.map((service, index) => (
          <div 
            key={service._id} 
            className="group relative h-full motion-safe:animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative h-full border border-slate-800 rounded-3xl p-8 bg-slate-900/30 backdrop-blur-sm flex flex-col justify-between hover:border-slate-600 hover:bg-slate-900/50 transition-all duration-300">
              
              {editing === service._id ? (
                // --- Edit Mode UI ---
                <form onSubmit={(e) => handleUpdateService(service._id, e)} className="space-y-4">
                  <input name="title" defaultValue={service.title} className="w-full bg-slate-800 rounded-lg p-2 text-white text-sm border border-cyan-500" />
                  <textarea name="description" defaultValue={service.description} rows={4} className="w-full bg-slate-800 rounded-lg p-2 text-white text-sm border border-cyan-500" />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-emerald-500 text-xs font-bold py-2 rounded-lg">Save</button>
                    <button type="button" onClick={() => setEditing(null)} className="flex-1 bg-slate-700 text-xs font-bold py-2 rounded-lg">Cancel</button>
                  </div>
                </form>
              ) : (
                // --- Standard Display UI ---
                <>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="text-4xl">{service.icon || "💎"}</div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                        {service.category || "Pro"}
                      </span>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h4>
                    
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-8 flex items-center justify-between">
                    {auth.user && auth.user.username === "satyam" && !service._id.startsWith("static_") ? (
                      <div className="flex gap-4">
                        <button onClick={() => setEditing(service._id)} className="text-xs font-bold text-yellow-500 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteService(service._id)} className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                      </div>
                    ) : (
                      <div className="text-cyan-500 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More →
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* CTA Footer Section */}
      <section className="rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">Ready to build something extraordinary?</h3>
        <p className="text-slate-400">Custom projects and white-label development services available.</p>
        <button 
           onClick={() => navigate('/contact')} 
           className="px-8 py-3 rounded-full bg-white text-black font-black hover:bg-cyan-400 hover:scale-105 transition-all"
        >
          Get In Touch
        </button>
      </section>

    </main>
  );
}