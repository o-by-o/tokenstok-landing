"use client";

// Landing.jsx — full port of variants/marketplace.html from the design bundle.
// One big component intentionally — mirrors the source HTML structure so any
// future design tweak maps 1:1.

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

// ─── CSS (lifted directly from marketplace.html with prefixed selectors
//       scoped under .lp-root to avoid bleeding into the rest of the app)
const STYLE = `
  .lp-root{ overflow-x: hidden; }
  .lp-root{
    --bg: #faf9f6;
    --ink: #0c0c0c;
    --ink-2: #2a2a2a;
    --mute: #6c6c6c;
    --mute-2: #a8a6a0;
    --line: #1c1c1c;
    --line-2: #e6e3da;
    --paper: #f0ede4;
    --card: #ffffff;
    --hl: #0c0c0c;
    --hl-fg: #ffffff;
    --shadow-card: 0 1px 0 rgba(0,0,0,.02), 0 24px 60px -32px rgba(0,0,0,.18);
    --shadow-card-hover: 0 12px 32px -16px rgba(0,0,0,.18);
    --sans: var(--font-manrope), -apple-system, BlinkMacSystemFont, sans-serif;
    --mono: var(--font-jetbrains-mono), ui-monospace, Menlo, monospace;
    --tk-logo-mute: var(--mute);
    background: var(--bg); color: var(--ink);
    font-family: var(--sans);
  }
  :root[data-theme="dark"] .lp-root{
    --bg: #0c0c0c;
    --ink: #f5f3ee;
    --ink-2: #d6d3cc;
    --mute: #8d8a82;
    --mute-2: #4a4844;
    --line: #f5f3ee;
    --line-2: #232220;
    --paper: #161513;
    --card: #15140f;
    --hl: #f5f3ee;
    --hl-fg: #0c0c0c;
    --shadow-card: 0 1px 0 rgba(255,255,255,.03), 0 24px 60px -32px rgba(0,0,0,.7);
    --shadow-card-hover: 0 12px 32px -16px rgba(0,0,0,.7);
  }
  .lp-root .wrap{ max-width:1140px; margin:0 auto; padding:0 36px; }

  /* nav */
  .lp-root nav.top{
    position:sticky; top:0; z-index:50;
    background: color-mix(in oklab, var(--bg) 92%, transparent);
    backdrop-filter: blur(10px);
    border-bottom:1px solid var(--line-2);
  }
  .lp-root nav.top .row{ display:flex; align-items:center; justify-content:space-between; padding:18px 0; gap:24px; }
  .lp-root nav.top ul{ list-style:none; display:flex; gap:28px; margin:0; padding:0; font-size:14px; color:var(--ink-2); font-weight:500; }
  .lp-root nav.top ul a:hover{ color:var(--ink); text-decoration:underline; text-underline-offset:4px; }
  .lp-root nav.top .cta{ display:flex; gap:10px; align-items:center; }
  .lp-root .btn{
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid var(--ink); padding:10px 16px; border-radius:999px;
    font-weight:600; font-size:14px; font-family:var(--sans);
    background:transparent; color:var(--ink); cursor:pointer;
    transition: background .15s ease, color .15s ease, transform .15s ease;
  }
  .lp-root .btn:hover{ background:var(--ink); color:var(--bg); }
  .lp-root .btn.solid{ background:var(--ink); color:var(--bg); }
  .lp-root .btn.solid:hover{ background:transparent; color:var(--ink); }
  .lp-root .btn .arr{ display:inline-block; transition: transform .2s ease; }
  .lp-root .btn:hover .arr{ transform: translateX(3px); }

  /* hero */
  .lp-root header.hero{ padding: 80px 0 100px; position:relative; }
  .lp-root .eyebrow{
    font-family:var(--mono); font-size:12px; letter-spacing:0.08em;
    text-transform:uppercase; color:var(--mute);
    display:inline-flex; align-items:center; gap:10px; margin-bottom:32px;
  }
  .lp-root .eyebrow::before{ content:""; width:24px; height:1px; background:var(--mute); display:inline-block; }
  .lp-root h1.title{
    font-family:var(--sans); font-weight:800;
    font-size: clamp(64px, 8.5vw, 108px);
    line-height: 0.96; letter-spacing: -0.035em;
    margin:0 0 28px; text-wrap: balance;
  }
  .lp-root h1.title em{
    font-style: normal; display:inline-block; padding: 0 12px;
    background: var(--ink); color: var(--bg);
    transform: skew(-4deg); margin: 0 -2px;
  }
  .lp-root h1.title em > span{ display:inline-block; transform: skew(4deg); }
  .lp-root .lede{ font-size: 21px; line-height: 1.45; color: var(--ink-2); max-width: 640px; margin: 0 0 40px; letter-spacing: -0.005em; }
  .lp-root .hero-ctas{ display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
  .lp-root .hero-ctas .btn{ padding:14px 22px; font-size:15px; }
  .lp-root .hero-note{ font-family:var(--mono); font-size:12px; color:var(--mute); margin-left:6px; }

  /* prompt demo */
  .lp-root .demo{
    margin-top: 64px; border:1px solid var(--line-2); border-radius:18px;
    background:var(--card); overflow:hidden;
    box-shadow: var(--shadow-card);
  }
  .lp-root .demo-head{
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 18px; border-bottom:1px solid var(--line-2);
    font-family:var(--mono); font-size:12px; color:var(--mute); background: var(--paper);
  }
  .lp-root .demo-head .dots{ display:flex; gap:6px; flex-shrink:0; }
  .lp-root .demo-head .dots span{ width:9px; height:9px; border-radius:50%; background: var(--mute-2); }
  .lp-root .demo-head .dots span:nth-child(1){ background: var(--ink); }
  .lp-root .demo-subtitle{ min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .lp-root .demo-cost{ white-space:nowrap; flex-shrink:0; }
  .lp-root .demo-body{
    padding: 24px 28px 28px; min-height: 200px;
    display:flex; flex-direction:column; gap:14px;
    font-size:16px; line-height:1.55;
  }
  .lp-root .demo-q{
    align-self:flex-end; background: var(--paper); color: var(--ink);
    padding: 10px 14px; border-radius: 16px 16px 4px 16px;
    max-width: 80%; font-size: 15px;
  }
  .lp-root .demo-a{
    align-self:flex-start; color: var(--ink);
    max-width: 92%; white-space: pre-wrap; min-height: 1.2em;
    font-family: var(--mono); font-size: 14.5px; line-height: 1.55;
  }
  .lp-root .caret{
    display:inline-block; width:.55em; height:1em; background: var(--ink);
    vertical-align:-2px; margin-left:1px; animation: lp-blink 1s steps(2) infinite;
  }
  @keyframes lp-blink{ 50%{ opacity:0; } }
  .lp-root .demo-meta{
    display:flex; gap:18px; align-items:center;
    padding: 12px 18px; border-top:1px solid var(--line-2);
    font-family:var(--mono); font-size:11px; color:var(--mute); background: var(--paper);
    flex-wrap:wrap;
  }
  .lp-root .demo-meta b{ color: var(--ink); font-weight:600; }
  .lp-root .demo-meta .live{ display:inline-flex; align-items:center; gap:6px; }
  .lp-root .demo-meta .live::before{
    content:""; width:6px; height:6px; border-radius:50%; background: var(--ink);
    animation: lp-pulse 1.4s ease-in-out infinite;
  }
  @keyframes lp-pulse{ 50%{ opacity:.35; } }

  /* trust */
  .lp-root .trust{ border-top:1px solid var(--line-2); border-bottom:1px solid var(--line-2); padding: 22px 0; margin-top: 88px; }
  .lp-root .trust .row{ display:flex; justify-content:space-between; align-items:center; gap:32px; flex-wrap:wrap; }
  .lp-root .trust .l{ font-family:var(--mono); font-size:12px; color: var(--mute); text-transform:uppercase; letter-spacing:.06em; }
  .lp-root .trust .logos{ display:flex; gap:36px; align-items:center; opacity:.7; flex-wrap:wrap; }
  .lp-root .trust .logos span{ font-weight:700; font-size:18px; letter-spacing:-0.02em; color:var(--ink-2); font-family: var(--sans); }
  .lp-root .trust .logos span.mono{ font-family: var(--mono); font-weight:600; font-size:15px; }

  /* sections */
  .lp-root section{ padding: 110px 0; }
  .lp-root section h2{ font-family:var(--sans); font-weight:700; font-size: clamp(40px, 4.8vw, 60px); line-height: 1.02; letter-spacing: -0.03em; margin:0 0 18px; text-wrap: balance; }
  .lp-root section .lede{ margin-bottom: 56px; }
  .lp-root .section-head{ display:flex; align-items:flex-end; justify-content:space-between; gap:32px; margin-bottom: 48px; }
  .lp-root .section-head .left{ max-width: 620px; }
  .lp-root .section-head .num{ font-family:var(--mono); font-size:12px; color:var(--mute); text-transform:uppercase; letter-spacing:.08em; }

  /* catalog */
  .lp-root .cat-controls{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px; font-family:var(--mono); font-size:13px; }
  .lp-root .cat-controls button{
    background:transparent; border:1px solid var(--line-2);
    padding:8px 14px; border-radius:999px; cursor:pointer;
    font-family:var(--mono); font-size:12px; color:var(--ink-2);
    transition: all .15s ease;
  }
  .lp-root .cat-controls button:hover{ border-color: var(--ink); }
  .lp-root .cat-controls button.active{ background:var(--ink); color: var(--bg); border-color: var(--ink); }
  .lp-root .cat-controls .count{ margin-left:auto; color:var(--mute); align-self:center; }
  .lp-root .grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  @media (max-width: 900px){ .lp-root .grid{ grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px){ .lp-root .grid{ grid-template-columns: 1fr; } }
  .lp-root .card{
    background: var(--card); border:1px solid var(--line-2); border-radius: 16px;
    padding: 22px; display:flex; flex-direction:column; gap:16px; position:relative;
    transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
  }
  .lp-root .card:hover{ transform: translateY(-2px); border-color: var(--ink); box-shadow: var(--shadow-card-hover); }
  .lp-root .card .top{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
  .lp-root .card .glyph{
    width:44px; height:44px; border-radius:11px; background:var(--paper);
    display:grid; place-items:center; flex:0 0 auto;
    border:1px solid var(--line-2);
    font-family:var(--mono); font-weight:600; font-size:14px; color: var(--ink);
  }
  .lp-root .card .tag{
    font-family:var(--mono); font-size:10px; letter-spacing:.06em; text-transform:uppercase;
    color: var(--mute); padding: 4px 8px; border:1px solid var(--line-2); border-radius:999px;
  }
  .lp-root .card .tag.hot{ color: var(--bg); background: var(--ink); border-color: var(--ink); }
  .lp-root .card h3{ margin: 0; font-weight:700; font-size: 20px; letter-spacing: -0.02em; }
  .lp-root .card .vendor{ font-family:var(--mono); font-size:12px; color:var(--mute); margin-top: -10px; }
  .lp-root .card .desc{ font-size:14px; color: var(--ink-2); line-height:1.5; margin-top: -4px; }
  .lp-root .card .price{ display:flex; align-items:baseline; justify-content:space-between; padding-top: 14px; border-top:1px dashed var(--line-2); margin-top: auto; }
  .lp-root .card .price .v{ font-family:var(--mono); font-weight:600; font-size: 17px; color: var(--ink); }
  .lp-root .card .price .u{ font-family:var(--mono); font-size:11px; color: var(--mute); text-align:right; max-width:55%; }
  .lp-root .card .buy{
    margin-top: 14px;
    display:flex; align-items:center; justify-content:space-between;
    padding: 10px 14px; border-radius: 999px; border:1px solid var(--ink);
    background: transparent; cursor:pointer;
    font-family: var(--sans); font-weight:600; font-size:13px;
    transition: all .15s ease;
  }
  .lp-root .card .buy:hover{ background:var(--ink); color: var(--bg); }
  .lp-root .card .buy:hover .arr{ transform: translateX(3px); }
  .lp-root .card .buy .arr{ transition: transform .2s ease; }
  .lp-root .more{ margin-top:32px; display:flex; justify-content:center; }

  /* how */
  .lp-root .steps{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 4px; border:1px solid var(--line-2); border-radius: 16px; overflow:hidden; }
  @media (max-width: 800px){ .lp-root .steps{ grid-template-columns: 1fr; } }
  .lp-root .step{
    padding: 36px 32px 40px; background: var(--card); position:relative;
    display:flex; flex-direction:column; gap:14px; min-height: 240px;
  }
  .lp-root .step + .step{ border-left:1px solid var(--line-2); }
  @media (max-width: 800px){ .lp-root .step + .step{ border-left:0; border-top:1px solid var(--line-2); } }
  .lp-root .step .n{ font-family:var(--mono); font-size:12px; color:var(--mute); letter-spacing: .08em; margin-bottom: 14px; }
  .lp-root .step h3{ margin:0; font-weight:700; font-size: 28px; line-height:1.1; letter-spacing: -0.025em; }
  .lp-root .step p{ margin:0; color: var(--ink-2); font-size: 15px; line-height: 1.55; }
  .lp-root .step .ill{
    margin-top: auto; height: 80px;
    border:1px dashed var(--line-2); border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    font-family:var(--mono); font-size:11px; color:var(--mute);
    background: var(--paper); padding: 12px;
    white-space: pre; overflow:hidden;
  }

  /* pricing */
  .lp-root .pricing{ display:grid; grid-template-columns: 1.1fr .9fr; gap:14px; }
  @media (max-width: 800px){ .lp-root .pricing{ grid-template-columns: 1fr; } }
  .lp-root .price-card{
    background: var(--card); border:1px solid var(--line-2); border-radius: 18px;
    padding: 32px; display:flex; flex-direction:column; gap:20px; position:relative;
  }
  .lp-root .price-card.featured{ background: var(--ink); color: var(--bg); border-color: var(--ink); }
  .lp-root .price-card .ribbon{
    position:absolute; top:24px; right:24px;
    font-family:var(--mono); font-size:11px; letter-spacing:.06em; text-transform:uppercase;
    border:1px solid currentColor; padding: 4px 10px; border-radius: 999px; opacity:.7;
  }
  .lp-root .price-card h3{ margin:0; font-weight:700; font-size: 26px; letter-spacing: -0.02em; }
  .lp-root .price-card .big{ font-family: var(--sans); font-weight:800; font-size: 64px; letter-spacing: -0.04em; line-height: 1; }
  .lp-root .price-card .big sup{ font-size: 22px; font-weight:600; vertical-align: top; margin-left: 4px; opacity:.7; }
  .lp-root .price-card .sub{ opacity:.7; font-size: 14px; margin-top: -10px; }
  .lp-root .price-card ul{ list-style:none; padding:0; margin: 0; display:flex; flex-direction:column; gap:10px; }
  .lp-root .price-card ul li{ display:flex; gap:10px; align-items:flex-start; font-size: 15px; line-height:1.45; }
  .lp-root .price-card ul li::before{
    content:""; flex:0 0 auto; width:14px; height:14px; border-radius:50%;
    background: currentColor; opacity: .9; margin-top:3px;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M2 7l3.5 3.5L12 4" stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>') center / contain no-repeat;
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M2 7l3.5 3.5L12 4" stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>') center / contain no-repeat;
  }
  .lp-root .price-card .price-btn{
    margin-top:auto;
    display:inline-flex; align-items:center; justify-content:center; gap:8px;
    padding: 14px 18px; border-radius: 999px;
    font-family:var(--sans); font-weight:600; font-size: 15px; cursor:pointer;
    background: var(--ink); color: var(--bg); border: 1px solid var(--ink);
    transition: all .15s ease;
  }
  .lp-root .price-card.featured .price-btn{ background: var(--bg); color: var(--ink); border-color: var(--bg); }
  .lp-root .price-card .price-btn:hover{ transform: translateY(-1px); }

  /* quotes */
  .lp-root .quotes{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  @media (max-width: 900px){ .lp-root .quotes{ grid-template-columns: 1fr; } }
  .lp-root .quote{
    background: var(--card); border:1px solid var(--line-2); border-radius: 16px;
    padding: 26px; display:flex; flex-direction:column; gap:18px;
  }
  .lp-root .quote .text{ font-size: 17px; line-height: 1.5; letter-spacing: -0.005em; text-wrap: pretty; }
  .lp-root .quote .who{ display:flex; align-items:center; gap:12px; padding-top:14px; border-top:1px solid var(--line-2); }
  .lp-root .quote .av{
    width:36px; height:36px; border-radius:50%; background: var(--paper);
    display:grid; place-items:center;
    font-family:var(--mono); font-weight:600; font-size:12px;
    color: var(--ink); border:1px solid var(--line-2);
  }
  .lp-root .quote .nm{ font-weight:600; font-size:14px; }
  .lp-root .quote .role{ font-size:12px; color: var(--mute); font-family: var(--mono); }

  /* faq */
  .lp-root .faq{ display:grid; grid-template-columns: 1fr 1.4fr; gap: 48px; }
  @media (max-width: 800px){ .lp-root .faq{ grid-template-columns: 1fr; } }
  .lp-root .faq .left h2{ position: sticky; top: 100px; }
  .lp-root .faq dl{ margin:0; padding:0; border-top:1px solid var(--line); }
  .lp-root .faq details{ border-bottom:1px solid var(--line-2); padding: 22px 0; }
  .lp-root .faq summary{
    list-style:none; cursor:pointer;
    display:flex; align-items:center; justify-content:space-between; gap:16px;
    font-weight:600; font-size: 19px; letter-spacing: -0.015em;
  }
  .lp-root .faq summary::-webkit-details-marker{ display:none; }
  .lp-root .faq summary .sign{
    width:22px; height:22px; flex:0 0 auto;
    display:grid; place-items:center; position:relative;
    border:1px solid var(--ink); border-radius:50%;
  }
  .lp-root .faq summary .sign::before, .lp-root .faq summary .sign::after{
    content:""; position:absolute; background: var(--ink); transition: transform .2s ease;
  }
  .lp-root .faq summary .sign::before{ width:10px; height:1.5px; }
  .lp-root .faq summary .sign::after{ width:1.5px; height:10px; }
  .lp-root .faq details[open] summary .sign::after{ transform: scaleY(0); }
  .lp-root .faq details p{ margin: 14px 0 0; color: var(--ink-2); font-size: 15.5px; line-height: 1.55; max-width: 56ch; }

  /* cta */
  .lp-root section.cta-section{
    padding: 120px 0; background: var(--ink); color: var(--bg);
    margin-top: 40px; border-radius: 28px 28px 0 0;
  }
  .lp-root section.cta-section .wrap{ text-align: center; }
  .lp-root section.cta-section h2{
    font-size: clamp(48px, 7vw, 92px); letter-spacing: -0.035em; line-height: 0.98;
    margin: 0 auto 24px; max-width: 14ch; text-wrap: balance;
  }
  .lp-root section.cta-section .lede{ color: color-mix(in oklab, currentColor 70%, transparent); max-width: 540px; margin: 0 auto 40px; }
  .lp-root .signup{
    max-width: 480px; margin: 0 auto; display:flex; gap: 8px;
    border:1px solid color-mix(in oklab, currentColor 25%, transparent); padding: 6px; border-radius: 999px;
    background: color-mix(in oklab, currentColor 4%, transparent); transition: border-color .15s ease;
  }
  .lp-root .signup:focus-within{ border-color: color-mix(in oklab, currentColor 80%, transparent); }
  .lp-root .signup input{
    flex:1; background: transparent; border:0; outline:0;
    color: var(--bg); font-family: var(--sans); font-size: 15px; padding: 12px 18px;
  }
  .lp-root .signup input::placeholder{ color: color-mix(in oklab, currentColor 40%, transparent); }
  .lp-root .signup button{
    background: var(--bg); color: var(--ink); border:0;
    padding: 12px 22px; border-radius: 999px;
    font-family: var(--sans); font-weight: 600; font-size: 14px; cursor: pointer;
    display:inline-flex; align-items:center; gap:8px;
    transition: transform .15s ease;
  }
  .lp-root .signup button:hover{ transform: translateX(2px); }
  .lp-root .cta-foot{ margin-top: 22px; font-family: var(--mono); font-size:12px; color: color-mix(in oklab, currentColor 50%, transparent); }

  /* footer */
  .lp-root footer{ background: var(--ink); color: var(--bg); padding: 60px 0 40px; }
  .lp-root footer .row{ display:grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px; }
  @media (max-width: 800px){ .lp-root footer .row{ grid-template-columns: 1fr 1fr; } }
  .lp-root footer .col h4{ margin:0 0 18px; font-size: 12px; font-family: var(--mono); text-transform: uppercase; letter-spacing: .08em; color: color-mix(in oklab, currentColor 50%, transparent); font-weight:500; }
  .lp-root footer .col ul{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
  .lp-root footer .col ul a{ font-size:14px; color: color-mix(in oklab, currentColor 85%, transparent); }
  .lp-root footer .col ul a:hover{ color: var(--bg); text-decoration: underline; text-underline-offset: 4px; }
  .lp-root footer .tag-line{ margin-top: 16px; max-width: 280px; color: color-mix(in oklab, currentColor 60%, transparent); font-size: 14px; line-height: 1.5; }
  .lp-root footer .legal{
    margin-top: 56px; padding-top: 24px;
    border-top:1px solid color-mix(in oklab, currentColor 12%, transparent);
    display:flex; justify-content:space-between; align-items:center;
    font-family: var(--mono); font-size: 11px; color: color-mix(in oklab, currentColor 50%, transparent);
    flex-wrap:wrap; gap: 16px;
  }
  .lp-root footer { --tk-logo-mute: color-mix(in oklab, currentColor 50%, transparent); }

  /* theme toggle — floating pill, bottom-right */
  .lp-root .theme-toggle{
    position: fixed;
    right: max(20px, env(safe-area-inset-right));
    bottom: max(20px, env(safe-area-inset-bottom));
    z-index: 60;
    width: 46px; height: 46px;
    display: grid; place-items: center;
    border: 1px solid var(--ink);
    border-radius: 999px;
    background: color-mix(in oklab, var(--card) 88%, transparent);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    color: var(--ink); cursor: pointer;
    box-shadow: var(--shadow-card-hover);
    transition: transform .15s ease, background .15s ease;
  }
  .lp-root .theme-toggle:hover{ background: var(--card); transform: translateY(-2px); }
  .lp-root .theme-toggle:active{ transform: scale(.94); }
  .lp-root .theme-toggle svg{ width: 18px; height: 18px; display: block; }
  .lp-root .theme-toggle .sun{ display:none; }
  .lp-root .theme-toggle .moon{ display:block; }
  :root[data-theme="dark"] .lp-root .theme-toggle .sun{ display:block; }
  :root[data-theme="dark"] .lp-root .theme-toggle .moon{ display:none; }
  @media (prefers-reduced-motion: reduce){
    .lp-root .theme-toggle{ transition: none; }
    .lp-root .theme-toggle:hover{ transform: none; }
  }

  /* mobile nav tweak */
  @media (max-width: 900px){
    .lp-root nav.top ul{ display:none; }
  }

  /* ── mobile adaptation ───────────────────────────────────────────── */
  @media (max-width: 720px){
    .lp-root .wrap{ padding: 0 40px; }

    .lp-root nav.top .row{ padding: 14px 0; gap: 12px; }
    .lp-root nav.top .cta{ gap: 8px; }
    .lp-root nav.top .cta .btn.solid{ display: none; }
    .lp-root nav.top .cta .btn{ padding: 8px 14px; font-size: 13px; }

    .lp-root header.hero{ padding: 48px 0 64px; }
    .lp-root .eyebrow{ margin-bottom: 22px; font-size: 11px; }
    .lp-root h1.title{
      font-size: clamp(38px, 11vw, 64px);
      line-height: 1.02; letter-spacing: -0.028em;
      margin: 0 0 20px;
    }
    .lp-root h1.title em{ padding: 0 8px; margin: 0 -1px; }
    .lp-root .lede{ font-size: 17px; margin-bottom: 28px; }
    .lp-root .hero-ctas{ gap: 10px; }
    .lp-root .hero-ctas .btn{ padding: 12px 18px; font-size: 14px; }
    .lp-root .hero-note{ flex-basis: 100%; margin-left: 2px; }

    .lp-root .demo{ margin-top: 40px; border-radius: 14px; }
    .lp-root .demo-head{ padding: 12px 14px; font-size: 11px; gap: 10px; }
    .lp-root .demo-head .dots span{ width:8px; height:8px; }
    .lp-root .demo-subtitle{ display: none; }
    .lp-root .demo-body{ padding: 18px 16px 20px; font-size: 15px; gap: 12px; }
    .lp-root .demo-q{ font-size: 14px; max-width: 88%; }
    .lp-root .demo-a{ font-size: 13.5px; }
    .lp-root .demo-meta{ padding: 10px 14px; font-size: 10.5px; gap: 12px; }

    .lp-root .trust{ margin-top: 60px; padding: 18px 0; }
    .lp-root .trust .row{ gap: 16px; }
    .lp-root .trust .logos{ gap: 20px; }
    .lp-root .trust .logos span{ font-size: 15px; }
    .lp-root .trust .logos span.mono{ font-size: 13px; }

    .lp-root section{ padding: 64px 0; }
    .lp-root section h2{ font-size: clamp(30px, 7.5vw, 44px); margin: 0 0 14px; }
    .lp-root section .lede{ margin-bottom: 36px; }
    .lp-root .section-head{ margin-bottom: 32px; }

    .lp-root .cat-controls{ gap: 6px; margin-bottom: 22px; }
    .lp-root .cat-controls button{ padding: 7px 11px; font-size: 11px; }
    .lp-root .cat-controls .count{ flex-basis: 100%; margin-left: 0; margin-top: 4px; }
    .lp-root .grid{ gap: 12px; }
    .lp-root .card{ padding: 18px; gap: 14px; border-radius: 14px; }
    .lp-root .card h3{ font-size: 18px; }
    .lp-root .card .glyph{ width: 40px; height: 40px; }

    .lp-root .step{ padding: 28px 22px 30px; min-height: 0; }

    .lp-root .price-card{ padding: 26px; border-radius: 14px; }
    .lp-root .price-card .big{ font-size: 52px; }
    .lp-root .price-card .ribbon{ top: 20px; right: 20px; font-size: 10px; padding: 3px 8px; }

    .lp-root .quote{ padding: 22px; border-radius: 14px; }
    .lp-root .quote .text{ font-size: 16px; }

    .lp-root .faq{ gap: 28px; }
    .lp-root .faq .left h2{ position: static; }
    .lp-root .faq summary{ font-size: 17px; gap: 12px; }
    .lp-root .faq details{ padding: 18px 0; }
    .lp-root .faq details p{ font-size: 14.5px; margin-top: 12px; }

    .lp-root section.cta-section{ padding: 72px 0; border-radius: 22px 22px 0 0; margin-top: 24px; }
    .lp-root section.cta-section h2{ font-size: clamp(34px, 9.5vw, 56px); margin-bottom: 18px; }
    .lp-root section.cta-section .lede{ margin-bottom: 28px; font-size: 16px; }
    .lp-root .signup{ flex-direction: column; gap: 6px; padding: 8px; border-radius: 18px; }
    .lp-root .signup input{ padding: 10px 14px; font-size: 14px; text-align: center; }
    .lp-root .signup button{ width: 100%; justify-content: center; padding: 11px 18px; }

    .lp-root footer{ padding: 44px 0 32px; }
    .lp-root footer .row{ gap: 28px 20px; }
    .lp-root footer .legal{ margin-top: 36px; flex-direction: column; align-items: flex-start; gap: 8px; text-align: left; }
  }

  @media (max-width: 420px){
    .lp-root .wrap{ padding: 0 30px; }
    .lp-root nav.top .row{ gap: 8px; }
    .lp-root nav.top .tk-tag{ display: none; }
    .lp-root .theme-toggle{
      right: max(14px, env(safe-area-inset-right));
      bottom: max(14px, env(safe-area-inset-bottom));
      width: 42px; height: 42px;
    }
    .lp-root h1.title{ font-size: clamp(34px, 10.5vw, 48px); }
    .lp-root .trust .logos{ gap: 14px; }
    .lp-root .trust .logos span{ font-size: 14px; }
    .lp-root footer .row{ grid-template-columns: 1fr; }
  }
`;

// ─── catalog data — taken from marketplace.html
const MODELS = [
  { name:"GPT-5", vendor:"OpenAI", glyph:"G5", desc:"Самая умная нейросеть для сложных задач и текста. Помнит 1 млн слов разговора.", price:"4,12", unit:"₽ / 1000 слов вопроса · 12,34 ₽ / 1000 слов ответа", tag:"hot" },
  { name:"Claude Sonnet 4.5", vendor:"Anthropic", glyph:"CL", desc:"Лучшая для длинных текстов и анализа документов. Очень долгие диалоги.", price:"2,88", unit:"₽ / 1000 слов вопроса · 8,64 ₽ / 1000 слов ответа", tag:"" },
  { name:"Claude Haiku 4.5", vendor:"Anthropic", glyph:"CH", desc:"Быстрая и дешёвая. Для коротких ответов и повседневных задач.", price:"0,38", unit:"₽ / 1000 слов вопроса · 1,52 ₽ / 1000 слов ответа", tag:"" },
  { name:"Gemini 2.5 Pro", vendor:"Google", glyph:"G·", desc:"Понимает фото, видео и аудио. Помнит 2 млн слов разговора.", price:"1,82", unit:"₽ / 1000 слов вопроса · 6,12 ₽ / 1000 слов ответа", tag:"" },
  { name:"DeepSeek R1", vendor:"DeepSeek", glyph:"DS", desc:"Думающая нейросеть из Китая. Бюджетная и сильная в математике.", price:"0,52", unit:"₽ / 1000 слов вопроса · 1,84 ₽ / 1000 слов ответа", tag:"new" },
  { name:"Llama 4 405B", vendor:"Meta", glyph:"L4", desc:"Открытая нейросеть от Meta. Хороша в творческих задачах.", price:"1,12", unit:"₽ / 1000 слов вопроса · 3,40 ₽ / 1000 слов ответа", tag:"" },
  { name:"Mistral Large 3", vendor:"Mistral", glyph:"M3", desc:"Хорошо знает европейские языки. Экономная на длинных текстах.", price:"0,98", unit:"₽ / 1000 слов вопроса · 2,94 ₽ / 1000 слов ответа", tag:"" },
  { name:"DALL·E 4", vendor:"OpenAI", glyph:"D4", desc:"Картинки по описанию. Делает 1024×1024 точно по тексту запроса.", price:"3,40", unit:"₽ / картинку", tag:"" },
  { name:"Suno v5", vendor:"Suno", glyph:"S5", desc:"Музыка по тексту: 3 минуты вокала и инструментала за один заход.", price:"6,80", unit:"₽ / минуту", tag:"" },
];

const SCRIPT = [
  { q: "сколько стоит вопрос к gpt-5?",
    a: "≈ 0,03 ₽ за обычный диалог.\nЗа этот ответ ты заплатишь 0,0124 ₽.",
    model: "gpt-5", cost: 0.0124, tokens: 142, lat: 312 },
  { q: "переключи на claude, у него длиннее память",
    a: "Готово. Текущая нейросеть → claude-sonnet-4.5\nПомнит 1 млн слов разговора. Счёт тот же.",
    model: "claude-sonnet-4.5", cost: 0.0088, tokens: 96, lat: 281 },
  { q: "а самая дешёвая для коротких вопросов?",
    a: "claude-haiku-4.5 — 0,38 ₽ за 1000 слов.\nНа 100 ₽ хватит на несколько сотен ответов.",
    model: "claude-haiku-4.5", cost: 0.0042, tokens: 71, lat: 198 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function DemoTypewriter() {
  const aRef = useRef(null);
  const [turnIdx, setTurnIdx] = useState(0);
  const [q, setQ] = useState(SCRIPT[0].q);
  const [model, setModel] = useState(SCRIPT[0].model);
  const [tokens, setTokens] = useState(0);
  const [cost, setCost] = useState(0);
  const [lat, setLat] = useState(SCRIPT[0].lat);
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    let i = 0;
    const run = async () => {
      while (!cancelRef.current) {
        const turn = SCRIPT[i % SCRIPT.length];
        setTurnIdx(i % SCRIPT.length);
        setQ(turn.q);
        setModel(turn.model);
        setTokens(0);
        setCost(0);
        setLat(turn.lat);
        if (aRef.current) aRef.current.innerHTML = "";
        await sleep(400);
        if (cancelRef.current) return;
        const text = turn.a;
        const start = performance.now();
        for (let c = 0; c < text.length; c++) {
          if (cancelRef.current) return;
          if (aRef.current) {
            const tn = document.createTextNode(text[c]);
            const caret = aRef.current.querySelector(".caret");
            if (caret) caret.parentNode.insertBefore(tn, caret);
            else aRef.current.appendChild(tn);
          }
          const ratio = (c + 1) / text.length;
          setTokens(Math.round(turn.tokens * ratio));
          setCost(turn.cost * ratio);
          await sleep(text[c] === "\n" ? 180 : Math.random() * 30 + 22);
        }
        await sleep(3200);
        i++;
      }
    };
    // initialize caret in a element
    if (aRef.current) {
      aRef.current.innerHTML = '<span class="caret"></span>';
    }
    run();
    return () => { cancelRef.current = true; };
  }, []);

  return (
    <div className="demo" id="demo">
      <div className="demo-head">
        <div className="dots"><span/><span/><span/></div>
        <span className="demo-subtitle">пример · gpt-5 → claude-sonnet-4.5</span>
        <span className="demo-cost">{cost.toFixed(4).replace(".", ",")}&nbsp;₽</span>
      </div>
      <div className="demo-body">
        <div className="demo-q">{q}</div>
        <div className="demo-a" ref={aRef}>
          <span className="caret"/>
        </div>
      </div>
      <div className="demo-meta">
        <span className="live">в реальном времени</span>
        <span>нейросеть: <b>{model}</b></span>
        <span>слов: <b>{tokens}</b></span>
        <span>ответ за: <b>{lat} мс</b></span>
        <span style={{ marginLeft:"auto" }}>на счёте: <b>847,12 ₽</b></span>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
  }, []);
  const toggle = () => {
    const next = (document.documentElement.dataset.theme || "light") === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("tokenstok-theme", next); } catch {}
    setTheme(next);
  };
  const label = theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему";
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
      </svg>
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    </button>
  );
}

export function Landing() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="lp-root">
        {/* NAV */}
        <nav className="top">
          <div className="wrap row">
            <a href="#"><Logo tag="pre-alpha"/></a>
            <ul>
              <li><a href="#catalog">Модели</a></li>
              <li><a href="#how">Как работает</a></li>
              <li><a href="#pricing">Цены</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#docs">Документация</a></li>
            </ul>
            <div className="cta">
              <a href="#" className="btn">Войти</a>
              <a href="#" className="btn solid">Попробовать <span className="arr">→</span></a>
            </div>
          </div>
        </nav>
        <ThemeToggle/>

        {/* HERO */}
        <header className="hero">
          <div className="wrap">
            <div className="eyebrow">181 нейросеть · chatgpt, claude, gemini, deepseek · без vpn</div>
            <h1 className="title">
              Все нейросети<br/>в одном чате.<br/>
              <em><span>Без</span></em> VPN.<br/>Платишь за ответ.
            </h1>
            <p className="lede">ChatGPT, Claude, Gemini, DeepSeek и ещё 180 нейросетей на русском — в одном окне, без VPN, без подписки. Оплата картой РФ или СБП.</p>
            <div className="hero-ctas">
              <a href="#" className="btn solid">Спросить нейросеть <span className="arr">→</span></a>
              <a href="#catalog" className="btn">Все 181 нейросеть</a>
              <span className="hero-note">от 100 ₽ — карта РФ или СБП</span>
            </div>
            <DemoTypewriter/>
          </div>
        </header>

        {/* TRUST */}
        <div className="trust">
          <div className="wrap row">
            <div className="l">Без VPN · Без подписки · Оплата из России</div>
            <div className="logos">
              <span>OpenAI</span>
              <span>Anthropic</span>
              <span>Google</span>
              <span>Meta</span>
              <span>Mistral</span>
              <span>DeepSeek</span>
              <span className="mono">+ 14 других</span>
            </div>
          </div>
        </div>

        {/* CATALOG */}
        <section id="catalog">
          <div className="wrap">
            <div className="section-head">
              <div className="left">
                <div className="num">01 · каталог</div>
                <h2>181 нейросеть.<br/>Один счёт&nbsp;в&nbsp;рублях.</h2>
                <p className="lede">Нейросеть для текста, фото, картинок, песен, презентаций, кода. Выбирай любую в одно касание — платишь только за то, что спросил. Новые нейросети добавляем каждую неделю.</p>
              </div>
            </div>
            <div className="cat-controls">
              <button className="active">Все · 181</button>
              <button>Текст · 84</button>
              <button>Фото · 41</button>
              <button>Код · 22</button>
              <button>Песни · 12</button>
              <button>Голос · 18</button>
              <button>Видео · 11</button>
              <button>Презентации · 8</button>
              <span className="count">показано 9 из 181</span>
            </div>
            <div className="grid">
              {MODELS.map((m, i) => (
                <div key={i} className="card">
                  <div className="top">
                    <div className="glyph">{m.glyph}</div>
                    {m.tag && <div className={`tag ${m.tag}`}>{m.tag === "hot" ? "🔥 хит" : m.tag}</div>}
                  </div>
                  <h3>{m.name}</h3>
                  <div className="vendor">by {m.vendor}</div>
                  <div className="desc">{m.desc}</div>
                  <div className="price">
                    <span className="v">{m.price} ₽</span>
                    <span className="u">{m.unit}</span>
                  </div>
                  <button className="buy">подключить <span className="arr">→</span></button>
                </div>
              ))}
            </div>
            <div className="more">
              <a href="#" className="btn">Смотреть все 181 модель <span className="arr">→</span></a>
            </div>
          </div>
        </section>

        {/* HOW */}
        <section id="how" style={{ background: "var(--paper)" }}>
          <div className="wrap">
            <div className="section-head">
              <div className="left">
                <div className="num">02 · как это работает</div>
                <h2>Спрашиваешь за 30 секунд.<br/>Платишь по факту.</h2>
              </div>
            </div>
            <div className="steps">
              <div className="step">
                <div className="n">шаг 01</div>
                <h3>Положи&nbsp;на&nbsp;счёт</h3>
                <p>От 100 ₽. Карта или СБП. Без подписок и автосписаний — деньги лежат, пока не используешь.</p>
                <div className="ill">{`┌────────────┐\n│  + 1000 ₽  │\n└────────────┘`}</div>
              </div>
              <div className="step">
                <div className="n">шаг 02</div>
                <h3>Выбери&nbsp;нейросеть</h3>
                <p>ChatGPT, Claude, Gemini, DeepSeek — переключаешься между ними в одно касание. Без VPN, без аккаунтов у каждой, без английского.</p>
                <div className="ill">{`◉ GPT-5\n  Claude  Gemini  DeepSeek`}</div>
              </div>
              <div className="step">
                <div className="n">шаг 03</div>
                <h3>Спрашивай</h3>
                <p>Каждый ответ списывает копейки. Видишь сразу — сколько потратил и сколько осталось. Без подписок и без сюрпризов в конце месяца.</p>
                <div className="ill">{`вопрос · 0,0421 ₽\nкартинка · 3,40 ₽\nостаток · 96,53 ₽`}</div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing">
          <div className="wrap">
            <div className="section-head">
              <div className="left">
                <div className="num">03 · цены</div>
                <h2>Никаких подписок.<br/>Платишь только за ответ.</h2>
                <p className="lede">Кладёшь деньги на счёт — тратятся только когда ты пишешь нейросети. Без подписок, без минимальных платежей, без «годовых пакетов». Рублёвый счёт, чек на e-mail.</p>
              </div>
            </div>
            <div className="pricing">
              <div className="price-card featured">
                <div className="ribbon">рекомендуем</div>
                <h3>Платишь&nbsp;за&nbsp;ответ</h3>
                <div className="big">от&nbsp;0,38<sup>₽</sup></div>
                <div className="sub">за 1000 слов. Цена видна перед каждым ответом.</div>
                <ul>
                  <li>181 нейросеть в одном чате</li>
                  <li>Рублёвый счёт, чек на e-mail</li>
                  <li>Без подписок и минимальных платежей</li>
                  <li>Закрытие счёта в один клик, остаток возвращается</li>
                  <li>История трат — на чём и сколько потратил</li>
                </ul>
                <button className="price-btn">Открыть кошелёк <span className="arr">→</span></button>
              </div>
              <div className="price-card">
                <h3>Команда</h3>
                <div className="big">990<sup>₽/мес</sup></div>
                <div className="sub">для команд от 3 человек. Всё как у обычного + ниже.</div>
                <ul>
                  <li>Общий баланс на всю команду</li>
                  <li>Лимиты и роли участников</li>
                  <li>Отдельные счета по проектам</li>
                  <li>Вход через Яндекс ID и корпоративный e-mail</li>
                  <li>Сводный отчёт по тратам команды</li>
                </ul>
                <button className="price-btn">Подключить команду <span className="arr">→</span></button>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ background: "var(--paper)" }}>
          <div className="wrap">
            <div className="section-head">
              <div className="left">
                <div className="num">04 · отзывы</div>
                <h2>Первые<br/>отзывы.</h2>
              </div>
            </div>
            <div className="quotes">
              {[
                { text: "Использую для подготовки к урокам — конспект разобрать, объяснение упростить, картинку для презентации сделать в DALL·E. Раньше платил 2000 ₽ в месяц за ChatGPT через посредников. Теперь — 150-200 ₽ и переключаюсь между нейросетями под задачу.", av: "МК", nm: "Михаил Кравченко", role: "учитель · школа" },
                { text: "Тексты для клиентов в разных нишах — для каждого нужна своя нейросеть. Раньше держала три подписки и платила в долларах через знакомых. Теперь — один рублёвый счёт, чек на e-mail, бухгалтерия не задаёт вопросов.", av: "АП", nm: "Анна Прокофьева", role: "копирайтер · самозанятая" },
                { text: "Зашёл с телефона, оплатил СБП на 200 ₽, спросил Claude про курсовую, нарисовал к ней обложку в DALL·E. Никаких иностранных карт, никаких VPN, никто ничего не списывает каждый месяц.", av: "ДС", nm: "Дмитрий Соловьёв", role: "студент · 3 курс" },
              ].map((q, i) => (
                <div key={i} className="quote">
                  <div className="text">{q.text}</div>
                  <div className="who">
                    <div className="av">{q.av}</div>
                    <div>
                      <div className="nm">{q.nm}</div>
                      <div className="role">{q.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="wrap">
            <div className="faq">
              <div className="left">
                <div className="num">05 · faq</div>
                <h2>Частые<br/>вопросы.</h2>
              </div>
              <div>
                <dl>
                  {[
                    { q: "Работает без VPN из России?", a: "Да. ChatGPT, Claude, Gemini, DeepSeek и остальные нейросети открываются прямо с домашнего интернета. Никаких прокси, никаких иностранных аккаунтов — заходишь на tokenstok.ru и пишешь.", open: true },
                    { q: "Можно оплатить картой РФ или СБП?", a: "Да, и то и другое. Карты Мир, Visa и Mastercard российских банков, а также СБП. Чек присылаем на e-mail, для самозанятых и ИП — закрывающие документы. Иностранные карты и крипта не нужны." },
                    { q: "А правда без подписок?", a: "Правда. Никакого ежемесячного списания, никакого «забыл отменить пробный период». Деньги лежат на счёте — тратятся только когда ты сам пишешь нейросети. Не пользуешься неделю — не платишь ничего." },
                    { q: "Какие нейросети есть, и все ли на русском?", a: "GPT-5, Claude Sonnet 4.5, Claude Haiku, Gemini 2.5 Pro, DeepSeek R1, Llama 4, Mistral Large 3, DALL·E 4 (картинки), Suno (песни) — всего 181 модель. Все понимают и отвечают на русском без потери качества — переключаешься между ними в одно касание." },
                    { q: "Чем это лучше прямого ChatGPT?", a: "Не нужен VPN и иностранная карта. По одному счёту — ещё 180 нейросетей (Claude, Gemini, DeepSeek, картинки, музыка). Рублёвый счёт и чек на e-mail — для самозанятых, ИП и бухгалтерии." },
                    { q: "Сколько стоит один вопрос нейросети?", a: "Зависит от нейросети и длины ответа. GPT-5 — около 3 копеек за обычный диалог, Claude Haiku — около 0,4 копейки, картинка DALL·E — 3,40 ₽. На 100 ₽ получается несколько сотен вопросов или десятки картинок. Точную цену видно перед отправкой." },
                    { q: "А как с задержкой ответа?", a: "Серверы в России. Оверхед — 20-40 мс. На глаз незаметно: первое слово ответа прилетает так же быстро, как от нейросети напрямую." },
                    { q: "Что с моими данными?", a: "Запросы и ответы не сохраняем — только метаданные для биллинга (нейросеть, длина ответа, время). Опционально включаешь сохранение истории в свой аккаунт, тогда она шифруется." },
                    { q: "Можно ли вывести остаток?", a: "Да, в любой момент. Открываешь настройки → «закрыть счёт», деньги уходят обратно на ту же карту в течение 1-3 рабочих дней. Без вопросов и удержаний." },
                    { q: "Подходит для работы и учёбы?", a: "Да. Автоматические повторы при сетевых ошибках, резервные нейросети если основная упала. Используют и для бизнеса, и для домашних задач, и для учёбы." },
                  ].map((d, i) => (
                    <details key={i} open={d.open || undefined}>
                      <summary>{d.q} <span className="sign"/></summary>
                      <p>{d.a}</p>
                    </details>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="wrap">
            <h2>Спроси нейросеть.<br/>Получи ответ.</h2>
            <p className="lede">Без VPN, без иностранных карт, без подписок. Регистрация — по номеру телефона. Кладёшь от 100 ₽ и пишешь.</p>
            <form className="signup" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="ты@пример.рф" />
              <button type="submit">Открыть кошелёк <span className="arr">→</span></button>
            </form>
            <div className="cta-foot">займёт 47 секунд · без карты · без подписки</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="wrap">
            <div className="row">
              <div className="col">
                <a href="#" style={{ color:"var(--bg)" }}><Logo/></a>
                <p className="tag-line">Все нейросети на русском. ChatGPT, Claude, Gemini, DeepSeek и ещё 180 моделей — без VPN, без подписки, оплата из России.</p>
              </div>
              <div className="col">
                <h4>Продукт</h4>
                <ul>
                  <li><a href="#">Каталог</a></li>
                  <li><a href="#">Документация</a></li>
                  <li><a href="#">Playground</a></li>
                  <li><a href="#">Статус</a></li>
                </ul>
              </div>
              <div className="col">
                <h4>Компания</h4>
                <ul>
                  <li><a href="#">О нас</a></li>
                  <li><a href="#">Блог</a></li>
                  <li><a href="#">Карьера</a></li>
                  <li><a href="#">Контакты</a></li>
                </ul>
              </div>
              <div className="col">
                <h4>Право</h4>
                <ul>
                  <li><a href="#">Оферта</a></li>
                  <li><a href="#">Конфиденциальность</a></li>
                  <li><a href="#">Безопасность</a></li>
                </ul>
              </div>
            </div>
            <div className="legal">
              <span>© 2026 ТокенСток · реквизиты появятся после регистрации</span>
              <span>сделано с уважением к токенам</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
