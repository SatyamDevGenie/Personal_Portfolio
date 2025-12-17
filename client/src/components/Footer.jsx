import React from "react";

export default function Footer() {
    // Replace with your actual email address
    const myEmail = "satyamsawant54@gmail.com";

    return (
        <footer className="border-t border-slate-700 py-8 text-center bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Name and Copyright */}
                <p className="font-sans text-xl font-extrabold text-slate-100 mb-2">
                     Satyam Subhash Sawant
                </p>

                {/* Title */}
                <p className="text-sm text-slate-400 mb-3">
                    AI Software Developer - MERN STACK + Agentic AI
                </p>

                {/* Email */}
                <p className="text-sm">
                    <a
                        href={`mailto:${myEmail}`}
                        className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                        {myEmail}
                    </a>
                </p>

            </div>
        </footer>
    );
}