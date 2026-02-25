/**
 * ui/index.tsx — Reusable presentational atoms.
 *
 * Small, stateless building blocks shared across multiple pipeline stages:
 * labels, badges, stats, cards, layout helpers, and data-visualisation
 * primitives (token bubbles, heatmap cells, probability bars).
 */

"use client";

import { useState, useEffect } from "react";
import { C } from "../tokens";

/* ─────────────────────────────────────────────
   Layout & Label Components
   ───────────────────────────────────────────── */

/** Numbered step indicator with coloured badge + uppercase label */
export function SectionLabel({ step, label, color }: { step: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold font-mono border-2 shadow-sm"
        style={{ background: `${color}20`, borderColor: `${color}50`, color }}
      >
        {step}
      </div>
      <span className="text-xs font-bold uppercase tracking-[1.5px]" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

/** Inline pill badge with configurable foreground / background */
export function Badge({
  children,
  color = C.blue[600],
  bg = C.blue[50],
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-mono border"
      style={{ background: bg, color, borderColor: `${color}25` }}
    >
      {children}
    </span>
  );
}

/** Single statistic display — large value with small unit and label */
export function Stat({ label, value, unit = "" }: { label: string; value: string; unit?: string }) {
  return (
    <div className="text-center px-3.5 py-2.5">
      <div className="text-xl font-extrabold font-mono leading-none" style={{ color: C.blue[700] }}>
        {value}
        <span className="text-[11px] font-medium" style={{ color: C.slate[400] }}>{unit}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wider font-semibold mt-0.5" style={{ color: C.slate[400] }}>
        {label}
      </div>
    </div>
  );
}

/** Vertical connector line with icon + label between pipeline stages */
export function ConnectorLabel({ text, icon }: { text: string; icon: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-[2px] h-6 rounded-full" style={{ background: C.blue[200] }} />
      <div
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border shadow-sm text-[11px] font-medium"
        style={{ color: C.slate[500], borderColor: C.slate[200] }}
      >
        <span className="text-xs">{icon}</span>{text}
      </div>
      <div className="w-[2px] h-6 rounded-full" style={{ background: C.blue[200] }} />
      {/* Downward-pointing arrow triangle */}
      <div
        className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px]"
        style={{ borderTopColor: C.blue[200] }}
      />
    </div>
  );
}

/** White card with optional coloured accent strip at top */
export function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm" style={{ border: `1px solid ${C.slate[200]}` }}>
      {accent && (
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg,${accent},${accent}90)` }} />
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Content Components
   ───────────────────────────────────────────── */

/** Infrastructure callout box — icon, title, subtitle, bullet list */
export function InfraBox({
  icon,
  title,
  subtitle,
  items,
  color = C.blue[600],
}: {
  icon: string;
  title: string;
  subtitle: string;
  items: string[];
  color?: string;
}) {
  return (
    <div className="p-4 rounded-[10px]" style={{ background: C.slate[50], border: `1px solid ${C.slate[200]}` }}>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-lg">{icon}</span>
        <div>
          <div className="text-xs font-bold text-gray-800">{title}</div>
          <div className="text-[10px] font-mono" style={{ color: C.slate[400] }}>{subtitle}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2 text-[11px]" style={{ color: C.slate[500] }}>
            <div className="w-[5px] h-[5px] rounded-full shrink-0 mt-[5px]" style={{ background: color }} />
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two-column responsive layout with optional section titles */
export function TwoCol({
  left,
  right,
  leftTitle,
  rightTitle,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  leftTitle?: string;
  rightTitle?: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        {leftTitle && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: C.blue[100] }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.blue[600]} strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[1.5px]" style={{ color: C.blue[600] }}>
              {leftTitle}
            </span>
          </div>
        )}
        {left}
      </div>
      <div>
        {rightTitle && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: C.green[100] }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.green[600]} strokeWidth="2.5" strokeLinecap="round">
                <rect x="2" y="2" width="20" height="20" rx="3" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[1.5px]" style={{ color: C.green[600] }}>
              {rightTitle}
            </span>
          </div>
        )}
        {right}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animation & Visualisation Components
   ───────────────────────────────────────────── */

/** Typing animation that reveals text character-by-character and highlights [Source: Page N] citations */
export function Typing({ text, speed = 12 }: { text: string; speed?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n < text.length) {
      const t = setTimeout(() => setN((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
  }, [n, text, speed]);

  const displayed = text.substring(0, n);

  return (
    <span>
      {/* Split on citation markers and highlight them */}
      {displayed.split(/(\[Source: Page \d+\])/).map((part, i) =>
        /\[Source: Page \d+\]/.test(part) ? (
          <span key={i} className="font-semibold rounded px-1.5 py-0.5 text-[11px]" style={{ color: C.blue[700], background: C.blue[50] }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
      {/* Blinking cursor while still typing */}
      {n < text.length && (
        <span className="inline-block w-0.5 h-3.5 ml-px align-middle animate-blink" style={{ background: C.blue[500] }} />
      )}
    </span>
  );
}

/** Coloured token pill — type determines colour scheme (system / context / query / output) */
export function TokenBubble({ text, type }: { text: string; type: "system" | "context" | "query" | "output" }) {
  const styles = {
    system:  { bg: C.red[100],   border: C.red[200],   text: C.red[700] },
    context: { bg: C.amber[100], border: C.amber[200], text: C.amber[700] },
    query:   { bg: C.blue[100],  border: C.blue[200],  text: C.blue[700] },
    output:  { bg: C.green[100], border: C.green[100], text: C.green[600] },
  }[type];

  return (
    <span
      className="inline-block px-2 py-0.5 m-[2px] rounded-md text-[10px] font-mono font-bold border"
      style={{ background: styles.bg, borderColor: styles.border, color: styles.text }}
    >
      {text}
    </span>
  );
}

/** Attention heatmap cell — darker blue = higher attention weight (0–1) */
export function HeatCell({ tok, w }: { tok: string; w: number }) {
  return (
    <div
      className="flex-1 h-7 rounded flex items-center justify-center text-[9px] font-mono min-w-[36px] border"
      style={{
        backgroundColor: `rgba(37, 99, 235, ${w})`,
        color: w > 0.5 ? "#ffffff" : C.slate[400],
        fontWeight: w > 0.7 ? 800 : w > 0.4 ? 600 : 400,
        borderColor: w > 0.7 ? `rgba(37, 99, 235, ${w + 0.15})` : "transparent",
      }}
    >
      {tok}
    </div>
  );
}

/** Horizontal probability bar with rank badge — shows token selection confidence */
export function ProbBar({
  token,
  prob,
  rank,
  selected = false,
}: {
  token: string;
  prob: number;
  rank: number;
  selected?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-[10px] font-mono w-5 text-center font-semibold" style={{ color: C.slate[400] }}>
        #{rank}
      </span>
      <span
        className={`text-[11px] font-mono w-24 shrink-0 ${selected ? "font-extrabold" : "font-medium"}`}
        style={{ color: selected ? C.blue[700] : C.slate[500] }}
      >
        &quot;{token}&quot;
      </span>
      <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: C.slate[100] }}>
        <div
          className="h-full rounded-md transition-all duration-500"
          style={{
            width: `${Math.max(prob * 100, 2)}%`,
            background: selected
              ? `linear-gradient(90deg, ${C.blue[500]}, ${C.blue[600]})`
              : `linear-gradient(90deg, ${C.slate[200]}, ${C.blue[200]})`,
          }}
        />
      </div>
      <span
        className={`text-[11px] font-mono w-[48px] text-right ${selected ? "font-extrabold" : "font-medium"}`}
        style={{ color: selected ? C.blue[700] : C.slate[400] }}
      >
        {(prob * 100).toFixed(1)}%
      </span>
    </div>
  );
}
