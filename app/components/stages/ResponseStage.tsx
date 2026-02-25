/**
 * stages/ResponseStage.tsx — Pipeline stages 7 and 8.
 *
 * Stage 7: Generated response with typing animation and source traceability.
 * Stage 8: Data lifecycle breakdown — request/processing/response phases,
 *          cleanup details, user-controlled retention, and trust banner.
 */

"use client";

import { C } from "../tokens";
import type { StageProps } from "../tokens";
import { SectionLabel, Stat, Card, Typing } from "../ui";
import { IconSearch, IconLock, IconCheck, IconTrash } from "../Icons";

/* ═══════════════════════════════════════════════
   Stage 7 — Response (Grounded & Traceable)
   ═══════════════════════════════════════════════ */

export function ResponseStage({ v, anim, response }: StageProps & { response: string }) {
  /* Claims mapped to their source pages for the traceability panel */
  const citations = [
    { page: 11, claim: "AI division = 28% of revenue" },
    { page: 3,  claim: "Q3 revenue = €42.5M, 15% YoY" },
    { page: 22, claim: "22% R&D allocation to AI" },
  ];

  return (
    <div className="w-full" style={anim(6)}>
      <SectionLabel step="7" label="Response — Grounded & Traceable" color={C.green[600]} />
      <Card accent={C.green[500]}>
        <div className="p-6">
          {/* AI response bubble with typing animation */}
          <div className="flex gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs text-white font-bold"
              style={{ background: `linear-gradient(135deg,${C.green[400]},${C.green[600]})` }}
            >
              AI
            </div>
            <div
              className="flex-1 p-4 bg-white rounded-[4px_14px_14px_14px] border text-[13px] leading-[1.85]"
              style={{ borderColor: C.slate[200] }}
            >
              {v(6) ? <Typing text={response} speed={10} /> : <span style={{ color: C.slate[400] }}>...</span>}
            </div>
          </div>

          {/* Source traceability list */}
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] mb-2.5" style={{ color: C.slate[400] }}>
            Source Traceability
          </div>
          {citations.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg border mb-1.5"
              style={{ background: C.green[50], borderColor: `${C.green[500]}35` }}
            >
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono"
                style={{ background: `${C.green[500]}22`, color: C.green[600] }}
              >
                Page {c.page}
              </span>
              <span className="text-[11px] flex-1" style={{ color: C.slate[500] }}>{c.claim}</span>
              <span className="text-[10px] font-bold font-mono" style={{ color: C.green[600] }}>✓ Verified</span>
            </div>
          ))}

          {/* Summary stats */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <Stat label="Output" value="156" unit=" tok" />
            <Stat label="Grounded" value="100" unit="%" />
            <Stat label="Sources" value="3" />
            <Stat label="Total" value="2.1" unit="s" />
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Stage 8 — Data Lifecycle & Trust Banner
   ═══════════════════════════════════════════════ */

export function DataLifecycleStage({ anim }: StageProps) {
  return (
    <div className="w-full" style={anim(7)}>
      <SectionLabel step="✦" label="Data Lifecycle — After the Response" color={C.green[600]} />
      <Card accent={C.blue[500]}>
        <div className="p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-gray-900">Your data&apos;s complete journey</h3>
          <p className="text-sm mb-8 max-w-[520px] mx-auto leading-relaxed" style={{ color: C.slate[500] }}>
            From request to cleanup — here&apos;s where every byte goes, how long it stays, and what happens when the response is complete.
          </p>

          <PhaseCards />
          <CleanupAndControlGrid />

          {/* Zero data retention caveat */}
          <p className="text-[10px] mt-4 mx-auto max-w-[540px] italic leading-relaxed" style={{ color: C.slate[400] }}>
            Note: Zero Data Retention requires opting out of Azure OpenAI abuse monitoring. Contact your Microsoft representative to enable this for your deployment.
          </p>
        </div>
      </Card>

      <TrustBanner />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Three-column phase breakdown
   ───────────────────────────────────────────── */

function PhaseCards() {
  const phases = [
    {
      icon: "📨",
      title: "Request Phase",
      color: C.blue[500],
      items: [
        "Your prompt sent over TLS 1.3",
        "Hits YOUR Azure OpenAI endpoint",
        "Private endpoint = never public internet",
        "Request logged in YOUR Azure Monitor",
      ],
    },
    {
      icon: "⚡",
      title: "Processing Phase",
      color: C.purple[500],
      items: [
        "Prompt loaded into GPU VRAM",
        "Processed in isolated compute",
        "Not mixed with other tenants' data",
        "VRAM cleared after each inference",
      ],
    },
    {
      icon: "📤",
      title: "Response Phase",
      color: C.green[500],
      items: [
        "Tokens streamed back to your app",
        "Delivered over encrypted connection",
        "Response stored in YOUR app (if configured)",
        "You control retention policy",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-6">
      {phases.map((phase, i) => (
        <div key={i} className="p-5 rounded-xl" style={{ background: `${phase.color}15`, border: `1px solid ${phase.color}35` }}>
          <div className="text-2xl mb-2">{phase.icon}</div>
          <div className="text-sm font-bold mb-3 text-gray-900">{phase.title}</div>
          {phase.items.map((it, j) => (
            <div key={j} className="flex items-start gap-2 mb-1.5 text-[11px]" style={{ color: C.slate[500] }}>
              <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-[5px]" style={{ background: phase.color }} />
              {it}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Cleanup + What YOU Control grid
   ───────────────────────────────────────────── */

function CleanupAndControlGrid() {
  const cleanupRows = [
    { what: "Prompt input",      when: "Immediately after response" },
    { what: "GPU memory",        when: "Immediately — cleared for next request" },
    { what: "Azure OpenAI logs", when: "0 days when Zero Data Retention is enabled" },
    { what: "Inference cache",   when: "Not cached (ephemeral only)" },
  ];

  const controlRows = [
    { what: "Chat history",       detail: "Stored in YOUR app database — you decide retention" },
    { what: "Vector embeddings",  detail: "In YOUR vector DB — delete anytime" },
    { what: "Source documents",   detail: "In YOUR blob storage — your lifecycle policy" },
    { what: "Audit logs",         detail: "In YOUR Azure Monitor — your compliance rules" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
      {/* Cleanup column */}
      <div className="p-5 rounded-xl" style={{ background: C.slate[50], border: `1px solid ${C.slate[200]}` }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.green[100] }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green[600]} strokeWidth="2.5" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <div className="text-sm font-bold text-gray-900">Cleanup — What Gets Deleted</div>
        </div>
        {cleanupRows.map((r, i) => (
          <div key={i} className={`flex gap-3 py-2 ${i < cleanupRows.length - 1 ? "border-b" : ""}`} style={{ borderColor: C.slate[200] }}>
            <span className="text-[10px] font-bold font-mono shrink-0 w-[105px]" style={{ color: C.green[600] }}>{r.what}</span>
            <span className="text-[10px] flex-1" style={{ color: C.slate[500] }}>{r.when}</span>
          </div>
        ))}
      </div>

      {/* User control column */}
      <div className="p-5 rounded-xl" style={{ background: C.slate[50], border: `1px solid ${C.slate[200]}` }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.blue[100] }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.blue[600]} strokeWidth="2.5" strokeLinecap="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
          </div>
          <div className="text-sm font-bold text-gray-900">What YOU Control</div>
        </div>
        {controlRows.map((r, i) => (
          <div key={i} className={`flex gap-3 py-2 ${i < controlRows.length - 1 ? "border-b" : ""}`} style={{ borderColor: C.slate[200] }}>
            <span className="text-[10px] font-bold font-mono shrink-0 w-[105px]" style={{ color: C.blue[600] }}>{r.what}</span>
            <span className="text-[10px] flex-1" style={{ color: C.slate[500] }}>{r.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Trust Banner (bottom of pipeline)
   ───────────────────────────────────────────── */

function TrustBanner() {
  const pillars = [
    { Icon: IconSearch, t: "Fully Transparent", d: "7 visible stages" },
    { Icon: IconLock,   t: "Data Sovereign",    d: "Never leaves your tenant" },
    { Icon: IconCheck,  t: "Fully Traceable",   d: "Every claim cited" },
    { Icon: IconTrash,  t: "Zero Retention",    d: "Cleaned after response" },
  ];

  return (
    <div
      className="mt-5 p-7 md:p-8 rounded-xl text-white text-center"
      style={{ background: `linear-gradient(135deg, ${C.blue[600]}, ${C.blue[700]})` }}
    >
      <h3 className="text-lg md:text-xl font-extrabold mb-2">No black magic. Just transparent engineering.</h3>
      <p className="text-sm mb-6 opacity-85 leading-relaxed max-w-lg mx-auto">
        Every step visible. Every byte accounted for. Every answer traceable to your source documents.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {pillars.map((b, i) => (
          <div
            key={i}
            className="px-3 py-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
          >
            <div className="w-10 h-10 mx-auto mb-2.5 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
              <b.Icon />
            </div>
            <div className="text-xs font-bold">{b.t}</div>
            <div className="text-[10px] opacity-70 mt-0.5">{b.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
