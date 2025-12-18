import React from "react";
import profileImage from "../images/1.png";

export default function About() {
  const certifications = [
    { id: 1, title: "Full Stack JavaScript Web Development Training", org: "RST Forum, Dadar - Mumbai", period: "Feb 2023 – Jun 2023" },
    { id: 2, title: "ANIIT in Cloud and Mobile Software Engineering", org: "NIIT Institute, Delhi (Remote)", period: "Jun 2019 – May 2022" },
    { id: 3, title: "AI Foundations and Infrastructure", org: "Oracle University (Remote)", period: "2025" },
  ];

  const achievements = [
    {
      id: 1,
      title: "Black Belt in Martial Arts Karate",
      org: "Mumbai Karate Association",
      year: "2013",
      details: "Secured Silver and Bronze medals from Kerala Sports Institution. Won silver medal in Akshay Kumar Competition. Recognized for discipline and excellence.",
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

  const socials = [
    { label: "LinkedIn", url: "https://linkedin.com/in/satyam-sawant", icon: "linkedin", color: "hover:text-blue-400" },
    { label: "GitHub", url: "https://github.com/SatyamDevGenie", icon: "github", color: "hover:text-slate-100" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 sm:py-20 lg:px-8 space-y-24">

      {/* HERO SECTION: Profile & Bio */}
      <section className="flex flex-col lg:flex-row gap-12 items-center lg:items-start motion-safe:animate-fade-in">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img
            src={profileImage}
            alt="Satyam Sawant"
            className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-2xl border border-slate-700 transition duration-500 hover:scale-[1.01]"
          />
        </div>

        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Satyam <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Sawant</span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-400">
              Full Stack Developer & AI Automation Enthusiast
            </p>
          </div>

          <article className="text-slate-300 max-w-2xl mx-auto lg:mx-0 text-lg leading-relaxed">
            <p>
              I bridge the gap between complex backend logic and intuitive frontend experiences.
              Specializing in the <span className="text-white font-semibold">MERN Stack</span>,
              I build scalable applications enhanced by <span className="text-emerald-400 font-semibold">AI workflows</span>.
            </p>
          </article>

          {/* Social Links & CTA */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 ${social.color} transition-all hover:border-slate-600 hover:scale-110`}
                title={social.label}
              >
                {social.icon === "linkedin" ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .319.2.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                )}
              </a>
            ))}
            <a href="mailto:satyamsawant54@gmail.com" className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
              Hire Me
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">Professional Experience</h2>
          <div className="h-px bg-slate-800 w-full"></div>
        </div>
        <div className="grid gap-6">
          {experience.map((job) => (
            <div key={job.id} className="group p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 transition-all">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                  <p className="text-lg text-emerald-400 font-medium">{job.company}</p>
                </div>
                <div className="text-left md:text-right">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-sm font-mono border border-slate-700">{job.period}</span>
                  <p className="text-slate-500 text-sm mt-2">{job.location}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {job.highlights.map((item, i) => (
                  <li key={i} className="text-slate-400 flex gap-3 text-base">
                    <span className="text-cyan-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* LOWER GRID: Certs & Awards */}
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Certifications */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/30 transition-all">
                <h4 className="font-bold text-slate-100">{cert.title}</h4>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-slate-400">{cert.org}</p>
                  <p className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{cert.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Achievements
          </h2>
          {achievements.map((award) => (
            <div key={award.id} className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-20 h-20 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-100 mb-1">{award.title}</h4>
              <p className="text-sm text-amber-400 font-medium mb-4">{award.org} • {award.year}</p>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">{award.details}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}