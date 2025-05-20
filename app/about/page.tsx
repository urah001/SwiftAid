// app/about/page.tsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          About This System
        </h1>

        <p className="mb-4 text-lg">
          Welcome to the <strong>CUSTECH Swift Aid</strong> – a
          centralized platform designed to Procide medical attention to injured or any student needing medical attention student and
          empower every student of{" "}
          <strong>Confluence University of Science and Technology</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-700">
          🎯 Purpose
        </h2>
        <p className="mb-4 text-base leading-relaxed">
          This system serves as a digital companion to help students access
          academic records, class schedules, announcements, results, and more –
          all in one secure, modern interface.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-700">
          🛠️ Features
        </h2>
        <ul className="list-disc ml-6 mb-6 space-y-2 text-base">
          <li>
            <strong>Personalized Dashboard</strong>: Track courses, results, and
            academic progress.
          </li>
          <li>
            <strong>Real-Time Updates</strong>: Stay informed with class
            changes, results, and announcements.
          </li>
          <li>
            <strong>Secure Authentication</strong>: Uses{" "}
            <span className="text-blue-500 font-medium">Kinde</span> for modern
            and safe login.
          </li>
          <li>
            <strong>User-Friendly UI</strong>: Built with performance and
            simplicity in mind using the latest web technologies.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-700">
          🏫 About CUSTECH
        </h2>
        <p className="text-base leading-relaxed">
          <strong>
            Confluence University of Science and Technology (CUSTECH)
          </strong>
          , located in Osara, Kogi State, is committed to academic excellence
          and digital innovation. This dashboard is part of the university's
          mission to integrate modern tech into student life.
        </p>

        <footer className="mt-12 text-sm text-slate-500 border-t pt-4">
          &copy; {new Date().getFullYear()} CUSTECH Student Dashboard. All
          rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
