"use client";

// Logo.jsx — shared logo component. Used on the landing nav + footer and
// imported by the cabinet's Sidebar so brand stays in sync across both apps.

const STYLE = `
  .tk-logo{
    display:inline-flex; align-items:baseline; gap:2px;
    font-family:var(--font-manrope), -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight:800; font-size:20px; letter-spacing:-0.02em;
    color:inherit;
  }
  .tk-logo .tk-dot{
    width:9px; height:9px; border-radius:50%;
    background:currentColor;
    display:inline-block; margin-right:8px; transform:translateY(-1px);
    animation: tk-logo-pulse 1.6s ease-in-out infinite;
    flex-shrink:0;
  }
  @keyframes tk-logo-pulse { 50% { opacity:.4; } }
  .tk-logo .tk-slash{ color:var(--tk-logo-mute, #6c6c6c); font-weight:500; margin:0 6px; }
  .tk-logo .tk-tag{
    font-family:var(--font-jetbrains-mono), ui-monospace, Menlo, monospace;
    font-size:11px; color:var(--tk-logo-mute, #6c6c6c); font-weight:500;
    margin-left:10px; letter-spacing:0;
  }
  .tk-logo.tk-sm{ font-size:17px; }
  .tk-logo.tk-sm .tk-dot{ width:8px; height:8px; margin-right:7px; }
  @media (prefers-reduced-motion: reduce){
    .tk-logo .tk-dot{ animation:none; }
  }
`;

export function Logo({ tag, small = false, as: As = "span" }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <As className={`tk-logo ${small ? "tk-sm" : ""}`}>
        <span className="tk-dot" />
        <span>токен</span>
        <span className="tk-slash">/</span>
        <span>сток</span>
        {tag && <small className="tk-tag">{tag}</small>}
      </As>
    </>
  );
}
