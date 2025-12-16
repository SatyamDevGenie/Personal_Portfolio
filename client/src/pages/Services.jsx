import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServices, createService, updateService, deleteService } from "../slices/servicesSlice.js";
import { toast } from "react-toastify";

export default function Services() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const services = useSelector((s) => s.services.items);
  const auth = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  function handleAddService(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    dispatch(createService({ title: fd.get("title"), description: fd.get("description"), category: fd.get("category") })).then((r) => {
      if (r.type.endsWith("/fulfilled")) { toast.success("Service added"); navigate("/"); }
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
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold">Services</h2>

      {auth.user && auth.user.username === "satyam" && (
        <div className="max-w-2xl border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow">
          <h3 className="font-heading font-bold text-base sm:text-lg mb-4">Add New Service</h3>
          <form onSubmit={handleAddService} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Service Title *</label>
              <input name="title" placeholder="e.g. Web Development" required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Category</label>
              <input name="category" placeholder="e.g. Backend, Frontend" className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Description *</label>
              <textarea name="description" rows={3} placeholder="Describe this service briefly..." required className="w-full rounded-lg px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-sm focus:border-emerald-500 focus:outline-none transition resize-none" />
            </div>
            <button type="submit" className="w-full rounded-lg cta py-2.5 font-semibold text-sm sm:text-base">Add Service</button>
          </form>
        </div>
      )}
    </main>
  );
}
