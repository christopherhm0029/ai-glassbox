/**
 * tokens.ts — Design token palette and shared TypeScript types.
 *
 * Central color system used across every component in the pipeline.
 * Keeps visual consistency in one place so adjustments propagate everywhere.
 */

/* ── Color palette (keyed by shade number) ── */
export const C = {
  blue:   { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af" },
  green:  { 50: "#f0fdf4", 100: "#dcfce7", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a" },
  purple: { 50: "#faf5ff", 100: "#f3e8ff", 400: "#c084fc", 500: "#a855f7" },
  amber:  { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 400: "#fbbf24", 500: "#f59e0b", 700: "#b45309" },
  red:    { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 400: "#f87171", 500: "#ef4444", 700: "#b91c1c" },
  cyan:   { 50: "#ecfeff", 100: "#cffafe", 400: "#22d3ee", 500: "#06b6d4" },
  slate:  { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b" },
} as const;

/* ── Shared types for pipeline data ── */

/** A chunk produced by document ingestion */
export interface Chunk {
  id: number;
  text: string;
  page: number;
  tok: number;
}

/** A retrieval result referencing a chunk by id */
export interface RetrievalResult {
  cid: number;
  score: number;
}

/** Props shared by every pipeline stage component */
export interface StageProps {
  /** Returns true when the pipeline has reached step `s` */
  v: (s: number) => boolean;
  /** CSS transition style that fades-up when step `s` is reached */
  anim: (s: number) => React.CSSProperties;
}
