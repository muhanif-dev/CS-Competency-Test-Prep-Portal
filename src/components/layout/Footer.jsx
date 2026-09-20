import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ulm-lavender bg-ulm-lavender/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
              Practice topic-focused questions aligned with official competency
              areas for your Computer Science competency examination.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/competencies" className="text-ulm-purple hover:underline">
            Subjects
          </Link>
          <Link to="/quiz/setup" className="text-ulm-purple hover:underline">
            Start Quiz
          </Link>
          <Link to="/about" className="text-ulm-purple hover:underline">
            About
          </Link>
        </div>
      </div>
      <div className="border-t border-ulm-lavender/60 bg-white/50 py-3 text-center text-xs text-gray-500">
        © {new Date().getFullYear()}  Muhammad Hanif CS Competency Preparation Academy. All rights reserved. For educational and practice purposes only.
      </div>
    </footer>
  );
}
