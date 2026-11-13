import { GraduationCap, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";

const footerLinks = [
  { to: "/live-quiz", label: "Live Quiz", isLive: true },
  { to: "/practice/setup?competency=all", label: "Full Mock Test", isSpecial: true },
  { to: "/practice/setup", label: "Practice" },
  { to: "/quiz/setup", label: "AI Quiz" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About Us" },
  { to: "/admin", label: "Admin", isAdmin: true },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ulm-lavender bg-ulm-lavender/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <GraduationCap
            className="mt-0.5 h-5 w-5 shrink-0 text-ulm-gold"
            aria-hidden
          />
          <div>
            <p className="font-semibold text-ulm-dark">
              CS Competency Test Preparation Portal
            </p>
            <p className="mt-1 max-w-md text-sm text-gray-600">
              Practice topic-focused questions and comprehensive all-subjects mock exams
              aligned with official competency areas for your Computer Science competency examination.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {footerLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "inline-flex items-center gap-1.5 transition-colors",
                  isActive
                    ? "font-bold text-ulm-purple underline decoration-2 underline-offset-4"
                    : item.isSpecial
                    ? "font-semibold text-ulm-purple hover:underline"
                    : item.isAdmin
                    ? "text-gray-500 hover:text-ulm-purple hover:underline"
                    : "text-ulm-purple hover:underline",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-ulm-purple shrink-0 animate-pulse"
                      title="Current Active Page"
                    />
                  )}
                  {item.isAdmin && <ShieldCheck className="h-3.5 w-3.5" />}
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="border-t border-ulm-lavender/60 bg-white/50 px-4 py-3.5 text-center text-xs text-gray-500">
        © 2026 CodeMinds. Designed & Developed by <span className="font-semibold text-ulm-purple">Muhammad Hanif.</span> All rights reserved. For educational and practice purposes only.
      </div>
    </footer>
  );
}
