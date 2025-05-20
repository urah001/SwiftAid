// app/about/page.tsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen  text-white-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#f2c25353] mb-6">About This System</h1>
        <p className="mb-4 text-lg">
          Welcome to the <strong>CUSTECH Emergency Medical Response System</strong> – a life-saving digital platform built to assist students of <strong>Confluence University of Science and Technology</strong> in times of medical emergencies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-700">🚑 Purpose</h2>
        <p className="mb-4 text-base leading-relaxed">
          This system is designed to bridge the gap between students and immediate medical help. In cases of accidents, health complications, or emergencies on campus, students can quickly notify medical personnel or emergency responders for timely assistance.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-700">🛠️ Key Features</h2>
        <ul className="list-disc ml-6 mb-6 space-y-2 text-base">
          <li><strong>Instant Emergency Alerts</strong>: Send real-time alerts to designated campus medical responders with one tap.</li>
          <li><strong>Student Medical Profiles</strong>: Store essential medical details for faster treatment decisions.</li>
          <li><strong>Location Tracking</strong>: Help responders locate students faster using geolocation (with consent).</li>
          <li><strong>Secure Access</strong>: Only authorized users can access or trigger alerts using <span className="text-blue-500 font-medium">Kinde</span> authentication.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-slate-700">🏫 Built for CUSTECH</h2>
        <p className="text-base leading-relaxed">
          <strong>Confluence University of Science and Technology (CUSTECH)</strong>, located in Osara, Kogi State, is committed to the safety and well-being of its students. This medical alert system is a major step in ensuring that no emergency goes unanswered on campus.
        </p>

        <footer className="mt-12 text-sm text-slate-500 border-t pt-4">
          &copy; {new Date().getFullYear()} CUSTECH Emergency Response System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
