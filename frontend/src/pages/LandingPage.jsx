import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import ThemeToggle from "../components/Themetoggle";

export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Track mouse position for the interactive glow effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Slightly boost the glow's opacity in dark mode so it stays visible against a darker background.
  const glowAlpha = isDark ? 0.5 : 0.35;

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      {/* The Interactive Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          // The 5 mixed colors (Indigo, Purple, Pink, Yellow, Teal)
          background: `conic-gradient(from 0deg at ${mousePosition.x}px ${mousePosition.y}px, rgba(79,70,229,${glowAlpha}), rgba(168,85,247,${glowAlpha}), rgba(236,72,153,${glowAlpha}), rgba(234,179,8,${glowAlpha}), rgba(20,184,166,${glowAlpha}), rgba(79,70,229,${glowAlpha}))`,

          // This fades the edges out so it looks like a soft orb instead of a harsh circle
          WebkitMaskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
          maskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-40 w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Automatic Add Events to Google Calendar
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-300 dark:hover:text-indigo-400"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-sm dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-40 flex-1 flex flex-col items-center justify-center text-center px-6 mt-16 md:mt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-8 bg-opacity-80 backdrop-blur-sm dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300 dark:bg-opacity-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <Typewriter text="Created by Sajib and Mohaddis, a local AI that respects your privacy and keeps your data secure." />
        </div>

        <h1 className="max-w-4xl text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 dark:text-white">
          Your inbox is not a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
            calendar.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-500 mb-10 leading-relaxed dark:text-slate-400">
          Connect your Gmail and let local AI automatically extract events,
          meetings, and deadlines straight into your Google Calendar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-center shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 dark:shadow-indigo-950"
          >
            Connect Gmail Now
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-all backdrop-blur-sm bg-opacity-80 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:bg-opacity-80">
            Learn More
          </button>
        </div>

        {/* Feature Grid / Social Proof */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full border-t border-slate-200 pt-16 dark:border-slate-800">
          <div className="text-left bg-white bg-opacity-40 backdrop-blur-md p-6 rounded-2xl border border-slate-100 transition-all hover:bg-opacity-60 dark:bg-slate-800 dark:bg-opacity-40 dark:border-slate-700 dark:hover:bg-opacity-60">
            <div className="h-10 w-10 bg-rose-50 rounded-lg flex items-center justify-center mb-4 dark:bg-rose-500/10">
              <svg
                className="w-5 h-5 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2 dark:text-white">
              Automated Extraction
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Stop manually typing dates. We read the email context and format
              it perfectly.
            </p>
          </div>

          <div className="text-left bg-white bg-opacity-40 backdrop-blur-md p-6 rounded-2xl border border-slate-100 transition-all hover:bg-opacity-60 dark:bg-slate-800 dark:bg-opacity-40 dark:border-slate-700 dark:hover:bg-opacity-60">
            <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 dark:bg-emerald-500/10">
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2 dark:text-white">
              100% Private Processing
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your emails are processed entirely by a local AI model. No data is
              sent to external servers.
            </p>
          </div>

          <div className="text-left bg-white bg-opacity-40 backdrop-blur-md p-6 rounded-2xl border border-slate-100 transition-all hover:bg-opacity-60 dark:bg-slate-800 dark:bg-opacity-40 dark:border-slate-700 dark:hover:bg-opacity-60">
            <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center mb-4 dark:bg-amber-500/10">
              <svg
                className="w-5 h-5 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2 dark:text-white">
              One-Click Sync
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Review the extracted details and push them to Google Calendar
              instantly.
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative z-40 w-full text-center py-8 text-sm text-slate-400 mt-12 dark:text-slate-600">
        <p>
          © 2026 Automatic Add Events to Google Calendar. Build for speed and
          efficiency.
        </p>
      </footer>
    </div>
  );
}

// Typewriter Component
const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // If we haven't reached the end of the text, type the next character
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50); // 50ms typing speed
      return () => clearTimeout(timer);
    } else {
      // Once finished, pause for 3 seconds, then clear and restart
      const timer = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
