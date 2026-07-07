import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GmailView from "../components/views/GmailView";
import CalendarView from "../components/views/CalendarView";
import SyncView from "../components/views/SyncView";
import HistoryView from "../components/views/HistoryView";
const THEME_STORAGE_KEY = "autoprep-theme";

/** Reads/writes the color theme, persists it, syncs the `dark` class on <html> for Tailwind's class-based dark mode, and falls back to the OS preference on first load. */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return [theme, toggleTheme];
}

// --- Static config (kept outside the component so it isn't recreated every render) ---
const NAV_ITEMS = [
  {
    label: "Gmail",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    label: "Background Sync",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    ),
  },
  {
    label: "Calendar",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
  {
    label: "History",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

// Each orb trails the cursor at its own speed and size, so the pack visually
// separates into a multi-color trail rather than moving as a single blob.
const TRAIL_ORBS = [
  {
    size: 384,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    opacity: 0.55,
    ease: 0.18,
  },
  {
    size: 320,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    opacity: 0.45,
    ease: 0.12,
  },
  {
    size: 288,
    gradient: "from-pink-500 via-rose-500 to-orange-400",
    opacity: 0.4,
    ease: 0.08,
  },
  {
    size: 256,
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    opacity: 0.35,
    ease: 0.05,
  },
];

/** A pack of decorative gradient orbs that trail the cursor, each at a different speed/color, creating a multi-color comet-tail effect. */
function CursorGlow() {
  const orbRefs = useRef([]);
  const positions = useRef(TRAIL_ORBS.map(() => ({ x: -9999, y: -9999 })));
  const target = useRef({ x: -9999, y: -9999 });
  const frame = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!initialized.current) {
        // Snap every orb to the first known cursor position instead of easing in from off-screen.
        positions.current = positions.current.map(() => ({
          x: e.clientX,
          y: e.clientY,
        }));
        initialized.current = true;
      }
    };

    const animate = () => {
      positions.current = positions.current.map((pos, i) => {
        const { ease } = TRAIL_ORBS[i];
        const nextX = pos.x + (target.current.x - pos.x) * ease;
        const nextY = pos.y + (target.current.y - pos.y) * ease;
        const el = orbRefs.current[i];
        if (el) {
          const half = TRAIL_ORBS[i].size / 2;
          el.style.transform = `translate3d(${nextX - half}px, ${nextY - half}px, 0)`;
        }
        return { x: nextX, y: nextY };
      });
      frame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {TRAIL_ORBS.map((orb, i) => (
        <div
          key={orb.gradient}
          ref={(el) => (orbRefs.current[i] = el)}
          className={`absolute left-0 top-0 rounded-full bg-gradient-to-r ${orb.gradient} blur-3xl will-change-transform`}
          style={{ width: orb.size, height: orb.size, opacity: orb.opacity }}
        />
      ))}
    </div>
  );
}

// 1. Add the props inside the parentheses here
function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="z-20 flex w-64 flex-col justify-between border-r border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
      <div>
        <div className="px-8 py-8">
          <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-950">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            Home
          </h1>
        </div>

        <nav className="mt-4 flex flex-col space-y-2 px-4" aria-label="Primary">
          {NAV_ITEMS.map(({ label, icon }) => (
            // 2. Changed <a> to <button> and added dynamic class rendering
            <button
              key={label}
              onClick={() => setActiveView(label)}
              className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeView === label
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              }`}
            >
              <svg
                className={`h-5 w-5 transition-colors ${
                  activeView === label
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-indigo-400"
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                {icon}
              </svg>
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-4 p-4">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-all hover:bg-rose-50/80 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
        >
          <svg className="h-5 w-5 text-slate-400 transition-colors group-hover:text-rose-500 dark:text-slate-500 dark:group-hover:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </Link>
      </div>
    </aside>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
    >
      {isDark ? (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

function TopBar({ name, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-end border-b border-slate-200/50 bg-white/60 px-8 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/60">
      <div className="flex items-center gap-4">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {name}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 font-bold text-white shadow-md">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

const PLACEHOLDER_FULL_TEXT = "Add an event to your Google Calendar...";
const TYPE_SPEED_MS = 60; // delay between characters while typing
const ERASE_SPEED_MS = 30; // delay between characters while erasing
const HOLD_MS = 1800; // pause once fully typed, before erasing

/** Cycles a placeholder string through a type -> hold -> erase -> hold loop. Pauses while the field has real content. */
function useTypewriterPlaceholder(text, { active }) {
  const [placeholder, setPlaceholder] = useState("");
  const indexRef = useRef(0);
  const phaseRef = useRef("typing"); // "typing" | "holding" | "erasing"

  useEffect(() => {
    if (!active) return undefined;

    let timeoutId;

    const tick = () => {
      const phase = phaseRef.current;

      if (phase === "typing") {
        indexRef.current += 1;
        setPlaceholder(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          phaseRef.current = "holding";
          timeoutId = setTimeout(tick, HOLD_MS);
        } else {
          timeoutId = setTimeout(tick, TYPE_SPEED_MS);
        }
        return;
      }

      if (phase === "holding") {
        phaseRef.current = "erasing";
        timeoutId = setTimeout(tick, ERASE_SPEED_MS);
        return;
      }

      if (phase === "erasing") {
        indexRef.current -= 1;
        setPlaceholder(text.slice(0, indexRef.current));
        if (indexRef.current <= 0) {
          phaseRef.current = "typing";
          timeoutId = setTimeout(tick, TYPE_SPEED_MS);
        } else {
          timeoutId = setTimeout(tick, ERASE_SPEED_MS);
        }
      }
    };

    timeoutId = setTimeout(tick, TYPE_SPEED_MS);
    return () => clearTimeout(timeoutId);
  }, [text, active]);

  return placeholder;
}

function ChatComposer({ onSend }) {
  const [inputText, setInputText] = useState("");
  const animatedPlaceholder = useTypewriterPlaceholder(PLACEHOLDER_FULL_TEXT, {
    active: inputText.length === 0,
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = inputText.trim();
      if (!trimmed) return;
      onSend(trimmed);
      setInputText("");
    },
    [inputText, onSend],
  );

  return (
    <div className="z-20 border-t border-slate-200/50 bg-white/60 p-6 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/60">
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto flex max-w-4xl items-center gap-3"
      >
        <label htmlFor="event-input" className="sr-only">
          Add an event to your Google Calendar
        </label>
        <input
          id="event-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={animatedPlaceholder}
          className="w-full rounded-full border border-slate-200 bg-white/80 px-6 py-4 text-sm text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-medium text-white shadow-md transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default function Home() {
  const [theme, toggleTheme] = useTheme();
  const [activeView, setActiveView] = useState("Gmail");

  const handleSend = useCallback(async (text) => {
    console.log("Sending event data:", text);
    
    try {
      //backend terminal output URL
      const response = await fetch("http://localhost:8000/api/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      console.log("Success! Event URL:", data.eventLink);
      alert("Event added to your calendar!"); // Quick visual feedback for testing
      
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Check the console.");
    }
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <CursorGlow />
    
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="relative z-10 flex flex-1 flex-col bg-transparent">
        <TopBar name="UserName" theme={theme} onToggleTheme={toggleTheme} />

        <main className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8">
          {activeView === "Gmail" && <GmailView />}
          {activeView === "Calendar" && <CalendarView />}
          {activeView === "Background Sync" && <SyncView />}
          {activeView === "History" && <HistoryView />}
        </main>

        <ChatComposer onSend={handleSend} />
      </div>
    </div>
  );
}
