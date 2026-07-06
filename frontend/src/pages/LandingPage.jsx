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
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
          maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
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
            Smart Auto Scheduler
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/login"
            className="text-sm font-medium px-5 py-2.5 rounded-full border border-slate-300 bg-indigo-700 text-white shadow-sm hover:bg-slate-800 transition-colors dark:border-slate-700 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
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

        <h1 className="max-w-5xl text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6 dark:text-white">
          Your Inbox Holds Your Plans. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Let AI Schedule Them.
          </span>
        </h1>

        <p className="max-w-3xl text-xl md:text-2xl font-medium text-slate-500/90 mb-12 leading-relaxed dark:text-slate-400/90">
          Stop playing calendar detective. AutoPrep AI securely analyzes your
          incoming corporate invites, RSVPs, and floating thread deadlines
          locally on your machine instantly plotting them into Google Calendar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <Link
            to="/register"
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
          {/* Card 1: Automated Extraction */}
          <div className="group relative text-left bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-slate-800/60 shadow-lg transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="h-12 w-12 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20 dark:bg-rose-500/20">
                <svg
                  className="w-6 h-6 text-rose-500"
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
              <h3 className="text-xl font-bold text-slate-900 mb-3 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                Context Aware Engine
              </h3>
              <p className="text-base text-slate-500 leading-relaxed dark:text-slate-400">
                No raw text parsers here. Our system reads whole emails,
                deciphers timezone intents, and builds perfectly structured
                event entries automatically.
              </p>
            </div>
          </div>

          {/* Card 2: Private Processing */}
          <div className="group relative text-left bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-slate-800/60 shadow-lg transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 md:translate-y-4">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 dark:bg-emerald-500/20">
                <svg
                  className="w-6 h-6 text-emerald-500"
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
              <h3 className="text-xl font-bold text-slate-900 mb-3 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                Air-Gapped Privacy
              </h3>
              <p className="text-base text-slate-500 leading-relaxed dark:text-slate-400">
                Your corporate emails never touch an external machine learning
                host. Processing happens 100% locally on your computer hardware.
              </p>
            </div>
          </div>

          {/* Card 3: One-Click Sync */}
          <div className="group relative text-left bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-slate-800/60 shadow-lg transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-pink-500/10 hover:border-pink-500/30">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="h-12 w-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 dark:bg-amber-500/20">
                <svg
                  className="w-6 h-6 text-amber-500"
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
              <h3 className="text-xl font-bold text-slate-900 mb-3 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                Intelligent Verification
              </h3>
              <p className="text-base text-slate-500 leading-relaxed dark:text-slate-400">
                Review your AI predictions instantly on your clean central
                control room interface, and synchronize seamlessly with a simple
                execution hotkey.
              </p>
            </div>
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
