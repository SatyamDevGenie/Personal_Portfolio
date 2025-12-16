import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Contact() {
  async function handleContact(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await axios.post("/api/contacts", { name: fd.get("name"), email: fd.get("email"), message: fd.get("message") });
      e.target.reset();
      toast.success("Message sent");
    } catch (err) {
      toast.error("Failed to send message");
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-6 items-start">
        <form onSubmit={handleContact} className="space-y-3 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
          <input name="name" placeholder="Your name" className="w-full rounded-xl px-3 py-2 bg-slate-950 border border-slate-800 text-sm" required />
          <input name="email" type="email" placeholder="you@example.com" className="w-full rounded-xl px-3 py-2 bg-slate-950 border border-slate-800 text-sm" required />
          <textarea name="message" rows={4} placeholder="Tell me about your project..." className="w-full rounded-xl px-3 py-2 bg-slate-950 border border-slate-800 text-sm" required />
          <button type="submit" className="w-full rounded-full bg-emerald-500 text-slate-900 font-semibold py-2">Send message</button>
        </form>
        <div className="border border-slate-800 rounded-2xl p-4 bg-slate-900/60 text-sm text-slate-300">
          <p>I usually respond within 24 hours. Share your timeline, budget range, and what success looks like for you.</p>
        </div>
      </div>
    </main>
  );
}
