import React from "react";
// Assuming the image is saved in the 'src' directory, e.g., 'src/assets/satyam.jpg'
// You will need to import your actual image file path here.
// For this example, I'll use a placeholder variable.

// **IMPORTANT:** Replace this with the actual import path for your '1.jpg'
// For example:
// import profileImage from "./1.jpg";
// If you are using create-react-app or Vite, place the image in 'src' or 'public'
// and adjust the path accordingly.
import profileImage from "../images/1.png";


export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <section className="flex flex-col md:flex-row gap-10 items-start motion-safe:animate-fade-in">

        {/* Left Side: Profile Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src={profileImage}
            alt="Satyam Sawant - Freelance Software Developer"
            // CHANGED: Increased the dimensions from w-48/h-48 to w-64/h-64 (and sm:w-80/h-80 for large screens)
            className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-xl shadow-2xl border-4 border-cyan-500/50 transition duration-300 ease-in-out hover:scale-[1.02]"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-2/3 space-y-6">
          <header className="border-b border-slate-700 pb-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
              Satyam Sawant
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-cyan-400 mt-1">
              Freelance Software Developer with AI & Automation Expertise
            </p>
          </header>

          {/* Main Content / HR-Impressing Section */}
          <article className="text-slate-300 max-w-4xl space-y-4 text-lg">

            <p>
              I am a **passionate MERN stack developer** dedicated to transforming innovative ideas into robust, scalable, and high-performing applications. My commitment is to not just write code, but to deliver **measurable business value** through clean architecture, highly reusable components, and a relentless focus on user experience.
            </p>

            <p>
              My unique edge lies in the intersection of **full-stack development and emerging technologies**. I thrive on integrating **AI and Automation** into the MERN stack to create intelligent, efficient systems that streamline workflows and push the boundaries of what is possible.
            </p>

            <p>
              I pride myself on being a **rapid learner, problem-solver, and consistent high-quality executor**. I navigate the entire product lifecycle—from ideation and clean codebase architecture to deployment and optimization—ensuring every project is not just completed, but executed to an exceptional standard.
            </p>

            <p className="font-semibold text-cyan-300">
              Let's connect to build the next generation of intelligent, performant software solutions together.
            </p>

          </article>
        </div>
      </section>
    </main>
  );
}