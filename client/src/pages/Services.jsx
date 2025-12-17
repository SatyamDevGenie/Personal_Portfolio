import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServices, createService, updateService, deleteService } from "../slices/servicesSlice.js";
import { toast } from "react-toastify";

export default function Services() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Fetched services from Redux store (these are the ones you manage via the admin panel)
  const fetchedServices = useSelector((s) => s.services.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  // Define static data that must always be displayed
  const staticServices = [
    { 
      _id: "static_s1", 
      title: "Full-Stack Web Development (MERN)", 
      category: "Development", 
      description: "End-to-end development of modern, scalable web applications using the MERN stack (MongoDB, Express, React, Node.js). Focused on performance and clean architecture."
    },
    { 
      _id: "static_s2", 
      title: "AI & Workflow Automation", 
      category: "Automation", 
      description: "Implementing custom AI solutions and automated workflows to streamline business processes, reduce manual effort, and enhance data insights."
    },
    { 
      _id: "static_s3", 
      title: "UI/UX & Frontend Engineering", 
      category: "Design & Frontend", 
      description: "Crafting beautiful, responsive, and highly intuitive user interfaces (UI) with a strong focus on user experience (UX) using React and modern CSS frameworks like Tailwind CSS."
    },
    // You can add more static services here if needed
  ];

  // Combine fetched services and static services. 
  // We use `[...fetchedServices, ...staticServices]` to ensure that 
  // services from the database are listed first, followed by the static ones.
  const servicesToDisplay = [...fetchedServices, ...staticServices];

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // --- CRUD Handlers (Unchanged Logic) ---

  function handleAddService(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createService({ title: fd.get("title"), description: fd.get("description"), category: fd.get("category") })).then((r) => {
      if (r.type.endsWith("/fulfilled")) { toast.success("Service added"); navigate("/services"); } // Changed navigate to /services
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

  // --- Component Render ---

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <h2 className="text-4xl font-extrabold text-white">Services Offered by Satyam Sawant</h2>

      {/* ADMIN: Add New Service Form (Only visible to 'satyam') */}
      {auth.user && auth.user.username === "satyam" && (
        <div className="max-w-2xl border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow">
          <h3 className="font-heading font-bold text-base sm:text-lg mb-4 text-emerald-400">⚡ Admin Panel: Add New Service</h3>
          <form onSubmit={handleAddService} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Service Title *</label>
              <input name="title" placeholder="e.g. Custom CRM Development" required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Category</label>
              <input name="category" placeholder="e.g. Backend, Frontend, AI" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Description *</label>
              <textarea name="description" rows={3} placeholder="Describe this service briefly..." required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition resize-none" />
            </div>
            <button type="submit" className="w-full rounded-lg cta py-2.5 font-semibold text-sm sm:text-base">Add Service</button>
          </form>
        </div>
      )}
      
      {/* SERVICE LIST (Visible to ALL Users - Combines Static and Dynamic) */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold border-b border-slate-800 pb-3">My Core Offerings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesToDisplay.map((service) => (
            <div 
              // Use service._id or fallback to service ID for static ones
              key={service._id} 
              className="border border-slate-800 rounded-xl p-6 space-y-3 bg-slate-900 hover:border-cyan-500/50 transition duration-300"
            >
              
              {/* Check if service is dynamic (can be edited/deleted) or static */}
              {service._id.startsWith("static_") ? (
                // --- Static Service Display (No Edit/Delete) ---
                <>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-900/30 px-2 py-1 rounded-full">{service.category || "General"}</span>
                  <h4 className="text-xl font-bold text-white">{service.title}</h4>
                  <p className="text-slate-400 text-base leading-relaxed">{service.description}</p>
                </>
              ) : (
                // --- Dynamic Service Display (with Admin functions) ---
                editing === service._id && auth.user && auth.user.username === "satyam" ? (
                  // --- Edit Service Form ---
                  <form onSubmit={(e) => handleUpdateService(service._id, e)} className="space-y-3">
                    <h4 className="text-lg font-semibold text-cyan-400">Editing: {service.title}</h4>
                    <input name="title" defaultValue={service.title} required className="w-full rounded-lg px-3 py-2 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                    <input name="category" defaultValue={service.category} placeholder="Category" className="w-full rounded-lg px-3 py-2 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition" />
                    <textarea name="description" rows={3} defaultValue={service.description} required className="w-full rounded-lg px-3 py-2 bg-slate-950 border border-slate-700 text-sm focus:border-emerald-500 focus:outline-none transition resize-none" />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 rounded-lg bg-emerald-600 py-2 text-white font-semibold text-sm hover:bg-emerald-500 transition">Save Changes</button>
                      <button type="button" onClick={() => setEditing(null)} className="rounded-lg bg-slate-700 py-2 px-4 text-white font-semibold text-sm hover:bg-slate-600 transition">Cancel</button>
                    </div>
                  </form>
                ) : (
                  // --- Dynamic Service Display (Standard View) ---
                  <>
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-900/30 px-2 py-1 rounded-full">{service.category || "General"}</span>
                    <h4 className="text-xl font-bold text-white">{service.title}</h4>
                    <p className="text-slate-400 text-base leading-relaxed">{service.description}</p>
                    
                    {/* Admin Actions */}
                    {auth.user && auth.user.username === "satyam" && (
                      <div className="pt-3 flex gap-2">
                        <button onClick={() => setEditing(service._id)} className="text-xs text-yellow-400 hover:text-yellow-300 transition">Edit</button>
                        <span className="text-slate-700">|</span>
                        <button onClick={() => handleDeleteService(service._id)} className="text-xs text-red-500 hover:text-red-400 transition">Delete</button>
                      </div>
                    )}
                  </>
                )
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Fallback Message only if BOTH dynamic and static lists are empty */}
      {servicesToDisplay.length === 0 && (
        <p className="text-center text-slate-500 mt-10">No services currently listed. Check back soon!</p>
      )}

    </main>
  );
}


