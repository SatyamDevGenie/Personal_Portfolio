import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, createService, updateService, deleteService } from "../slices/servicesSlice.js";
import { toast } from "react-toastify";

export default function Services() {
  const dispatch = useDispatch();
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
      if (r.type.endsWith("/fulfilled")) toast.success("Service added");
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
    <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-10 space-y-4 sm:space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold">Services</h2>

      {auth.user && auth.user.username === "satyam" && (
        <div className="border border-slate-800 rounded-xl sm:rounded-2xl p-4 bg-slate-900/60">
          <h3 className="font-semibold mb-2 sm:mb-3 text-sm">Add New Service</h3>
          <form onSubmit={handleAddService} className="space-y-2 text-xs sm:text-sm">
            <input name="title" placeholder="Title" required className="w-full rounded-lg sm:rounded-xl px-3 py-2 bg-slate-950 border border-slate-800" />
            <input name="category" placeholder="Category" className="w-full rounded-lg sm:rounded-xl px-3 py-2 bg-slate-950 border border-slate-800" />
            <textarea name="description" rows={3} placeholder="Description" required className="w-full rounded-lg sm:rounded-xl px-3 py-2 bg-slate-950 border border-slate-800" />
            <button type="submit" className="w-full rounded-full bg-emerald-500 text-slate-900 font-semibold py-2 text-sm hover:bg-emerald-400 transition">Add Service</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {services.map((s) => (
          <article key={s._id} className="border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-slate-900/60">
            {editing === s._id ? (
              <form onSubmit={(e) => handleUpdateService(s._id, e)} className="space-y-2">
                <input name="title" defaultValue={s.title} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                <input name="category" defaultValue={s.category} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                <textarea name="description" defaultValue={s.description} rows={3} className="w-full rounded-lg px-2 sm:px-3 py-2 bg-slate-950 border border-slate-800 text-xs sm:text-sm" />
                <div className="flex gap-2">
                  <button className="rounded-full bg-emerald-500 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold">Save</button>
                  <button type="button" onClick={() => setEditing(null)} className="rounded-full bg-slate-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <p className="text-xs text-emerald-300 uppercase">{s.category || "Service"}</p>
                <h3 className="font-semibold mt-1 text-sm">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">{s.description}</p>
                {auth.user && auth.user.username === "satyam" && (
                  <div className="mt-3 flex gap-3">
                    <button onClick={() => handleDeleteService(s._id)} className="text-xs text-red-300 underline">Delete</button>
                    <button onClick={() => setEditing(s._id)} className="text-xs text-emerald-300 underline">Edit</button>
                  </div>
                )}
              </>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
