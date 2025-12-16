import React from "react";
import { useDispatch } from "react-redux";
import { createService } from "../slices/servicesSlice.js";
import { createSkill } from "../slices/skillsSlice.js";
import { createProject } from "../slices/projectsSlice.js";
import { toast } from "react-toastify";

export default function Admin() {
    const dispatch = useDispatch();

    function handleAddService(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        dispatch(createService({ title: fd.get("title"), description: fd.get("description"), category: fd.get("category") })).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Service added"); else toast.error("Failed to add service"); });
        e.target.reset();
    }

    function handleAddSkill(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        dispatch(createSkill({ name: fd.get("name"), category: fd.get("category"), level: Number(fd.get("level") || 0) })).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Skill added"); else toast.error("Failed to add skill"); });
        e.target.reset();
    }

    function handleAddProject(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        dispatch(createProject({ name: fd.get("name"), description: fd.get("description"), url: fd.get("url"), repo: fd.get("repo"), stack: fd.get("stack") })).then((r) => { if (r.type.endsWith("/fulfilled")) toast.success("Project added"); else toast.error("Failed to add project"); });
        e.target.reset();
    }

    const certifications = [
        {
            id: 1,
            title: "Full Stack JavaScript Web Development Training",
            org: "RST Forum, Dadar - Mumbai",
            period: "Feb 2023 – Jun 2023",
        },
        {
            id: 2,
            title: "ANIIT in Cloud and Mobile Software Engineering",
            org: "NIIT Institute, Delhi (Remote)",
            period: "Jun 2019 – May 2022",
        },
        {
            id: 3,
            title: "AI Foundations and Infrastructure",
            org: "Oracle University (Remote)",
            period: "2025",
        },
    ];

    const achievements = [
        {
            id: 1,
            title: "Black Belt in Martial Arts Karate",
            org: "Mumbai Karate Association",
            year: "2013",
            details:
                "Secured Silver and Bronze medals from Kerala Sports Institution for outstanding performance in Karate competitions. Also won silver medal in Akshay Kumar Competition. Recognized for discipline and excellence.",
        },
    ];

    const experience = [
        {
            id: 1,
            title: "Software Developer / Freelancer / AI",
            company: "Self-Employed",
            period: "Jan 2025 - Present",
            location: "Remote",
            highlights: [
                "Developed and deployed 10+ MERN stack projects with responsive design",
                "Implemented JWT authentication and role-based access control",
                "Optimized database queries reducing response time by 40%",
            ],
        },
        {
            id: 2,
            title: "Web Developer",
            company: "Hi-Technic Systems and Services",
            period: "Sept 2024 - Sept 2025",
            location: "Mumbai, India",
            highlights: [
                "Built REST APIs with Node.js and Express",
                "Collaborated with design team to implement responsive UI components",
                "Participated in code reviews and debugging sessions",
            ],
        },
    ];

    const contactInfo = {
        name: "Satyam Sawant",
        title: "Full Stack Developer",
        phone: "+91 9326903988",
        email: "satyamsawant54@gmail.com",
        links: [
            { label: "LinkedIn", url: "https://linkedin.com/in/satyam-sawant", icon: "linkedin" },
            { label: "GitHub", url: "https://github.com/SatyamDevGenie", icon: "github" },
        ],
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">Admin Dashboard</h2>
            <p className="text-xs sm:text-sm text-slate-400">Manage portfolio content. Visible only to admin.</p>

            {/* Contact Info Card */}
            <section className="motion-safe:animate-fade-in">
                <div className="border border-slate-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow max-w-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-100">{contactInfo.name}</h3>
                            <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">{contactInfo.title}</p>
                            <div className="space-y-2 mt-3">
                                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-emerald-300 transition">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {contactInfo.phone}
                                </a>
                                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-emerald-300 transition">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {contactInfo.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {contactInfo.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-300 hover:from-emerald-500/40 hover:to-cyan-500/40 transition flex items-center gap-2"
                                >
                                    {link.icon === "linkedin" && (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.413-.103.249-.129.597-.129.946v5.446h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                        </svg>
                                    )}
                                    {link.icon === "github" && (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    )}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="space-y-4 mt-10 motion-safe:animate-fade-in">
                <h3 className="font-heading text-xl sm:text-2xl font-bold">My Certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="border border-slate-700 rounded-xl sm:rounded-2xl p-4 bg-gradient-to-br from-slate-900/80 to-slate-950/80 glow hover:border-emerald-500/40 transition">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500/20 to-sky-400/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-heading font-semibold text-sm text-slate-100">{cert.title}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{cert.org}</p>
                                    <p className="text-xs text-emerald-300 font-medium mt-2">{cert.period}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Awards & Achievements Section */}
            <section className="space-y-4 mt-8 motion-safe:animate-fade-in">
                <h3 className="font-heading text-xl sm:text-2xl font-bold">Awards & Achievements</h3>
                <div className="space-y-3">
                    {achievements.map((award) => (
                        <div key={award.id} className="border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-slate-900/80 via-slate-950/80 to-slate-900/80 glow">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-400/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-heading font-semibold text-sm text-slate-100">{award.title}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{award.org} • {award.year}</p>
                                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">{award.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-4 mt-8 motion-safe:animate-fade-in">
                <h3 className="font-heading text-xl sm:text-2xl font-bold">Professional Experience</h3>
                <div className="space-y-4">
                    {experience.map((job) => (
                        <div key={job.id} className="border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/70 to-slate-950/70 glow hover:border-blue-500/40 transition">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-400/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 0L8 4m8 0v2m0-6h.01M4 15h16v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-heading font-semibold text-sm sm:text-base text-slate-100">{job.title}</h4>
                                    <p className="text-xs sm:text-sm text-blue-300 font-medium mt-1">{job.company}</p>
                                    <p className="text-xs text-slate-400 mt-1">{job.period} • {job.location}</p>
                                    <ul className="mt-3 space-y-2">
                                        {job.highlights.map((highlight, idx) => (
                                            <li key={idx} className="text-xs text-slate-300 flex gap-2">
                                                <span className="text-cyan-400 flex-shrink-0">▸</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
