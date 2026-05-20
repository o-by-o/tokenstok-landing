"use client";

import { useEffect, useState } from "react";

const STYLE = `
  .inv-theme-toggle{
    position: fixed;
    right: max(20px, env(safe-area-inset-right));
    bottom: max(20px, env(safe-area-inset-bottom));
    z-index: 60;
    width: 46px; height: 46px;
    display: grid; place-items: center;
    border: 1px solid var(--ink);
    border-radius: 999px;
    background: color-mix(in oklab, var(--card) 88%, transparent);
    backdrop-filter: blur(12px);
    color: var(--ink); cursor: pointer;
    box-shadow: 0 12px 32px -16px rgba(0,0,0,.18);
    transition: transform .15s ease, background .15s ease;
  }
  .inv-theme-toggle:hover{ background: var(--card); transform: translateY(-2px); }
  .inv-theme-toggle svg{ width: 18px; height: 18px; display: block; }
  .inv-theme-toggle .sun{ display: none; }
  .inv-theme-toggle .moon{ display: block; }
  :root[data-theme="dark"] .inv-theme-toggle .sun{ display: block; }
  :root[data-theme="dark"] .inv-theme-toggle .moon{ display: none; }
`;

export function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
  }, []);
  const toggle = () => {
    const next =
      (document.documentElement.dataset.theme || "light") === "dark"
        ? "light"
        : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("tokenstok-theme", next);
    } catch {}
    setTheme(next);
  };
  const label = theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему";
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <button
        type="button"
        className="inv-theme-toggle"
        onClick={toggle}
        aria-label={label}
        title={label}
      >
        <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
        </svg>
        <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      </button>
    </>
  );
}
