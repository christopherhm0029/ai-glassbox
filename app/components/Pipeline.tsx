/**
 * Pipeline.tsx — Main orchestrator for the AI Glass Box pipeline.
 *
 * Manages the shared animation state (step counter, LLM substep counter)
 * and composes the header, hero section, and all pipeline stage components.
 * Each stage is imported from its own file and receives animation helpers
 * via props so it can fade in at the right moment.
 */

"use client";

import { useState, useEffect } from "react";
import { C } from "./tokens";
import { IconSearch } from "./Icons";
import { ConnectorLabel } from "./ui";
import { chunks, retrieved, response } from "./data";

/* Stage components */
import { UserQuestionStage, IngestionStage, EmbeddingStage, RetrievalStage, PromptAssemblyStage } from "./stages/PipelineStages";
import LlmDeepDive from "./stages/LlmDeepDive";
import { ResponseStage, DataLifecycleStage } from "./stages/ResponseStage";

export default function Pipeline() {
  /* ── Animation state ── */
  const [go, setGo] = useState(false);    // whether the pipeline is running
  const [step, setStep] = useState(-1);   // current stage (-1 = idle, 0–8 = stages)
  const [llmSub, setLlmSub] = useState(0); // LLM substep counter for stage 6

  /* Auto-advance to next stage on a timer while running */
  useEffect(() => {
    if (go && step < 8) {
      // First step appears quickly (400ms), LLM step gets extra time (2400ms)
      const delay = step === -1 ? 400 : step === 5 ? 2400 : 1400;
      const t = setTimeout(() => setStep((s) => s + 1), delay);
      return () => clearTimeout(t);
    }
  }, [go, step]);

  /* Auto-advance LLM substeps while on stage 6 */
  useEffect(() => {
    if (step === 5 && llmSub < 6) {
      const t = setTimeout(() => setLlmSub((s) => s + 1), 700);
      return () => clearTimeout(t);
    }
  }, [step, llmSub]);

  /* ── Handlers ── */
  const handleStart = () => { setGo(true); setStep(-1); setLlmSub(0); };
  const handleReset = () => { setGo(false); setStep(-1); setLlmSub(0); };

  /* ── Animation helpers passed to stage components ── */
  const v = (s: number) => step >= s;
  const anim = (s: number): React.CSSProperties => ({
    opacity: v(s) ? 1 : 0,
    transform: v(s) ? "translateY(0)" : "translateY(12px)",
    transition: "all .5s cubic-bezier(.22,1,.36,1)",
  });

  return (
    <div className="min-h-screen">
      {/* ═══ STICKY HEADER ═══ */}
      <header
        className="sticky top-0 z-50 px-6 md:px-8 py-3.5 backdrop-blur-xl border-b flex items-center justify-between"
        style={{ background: "rgba(248,250,252,.85)", borderColor: C.slate[200] }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ background: `linear-gradient(135deg,${C.blue[500]},${C.blue[700]})` }}
          >
            <IconSearch />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-gray-900">AI Glass Box</h1>
            <p className="text-[10px] font-medium" style={{ color: C.slate[400] }}>
              Full Transparency · Enterprise AI Pipeline
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Trust indicator pill */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border"
            style={{ background: C.green[50], borderColor: `${C.green[500]}20`, color: C.green[600] }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.green[500] }} />
            Data stays in your tenant
          </div>

          {/* Run / Reset button */}
          {go ? (
            <button
              onClick={handleReset}
              className="px-4 py-1.5 rounded-lg bg-white border text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ color: C.slate[500], borderColor: C.slate[200] }}
            >
              Reset
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-5 py-2 rounded-lg text-xs font-bold text-white cursor-pointer hover:brightness-110 transition-all shadow-md"
              style={{
                background: `linear-gradient(135deg,${C.blue[600]},${C.blue[700]})`,
                boxShadow: `0 2px 12px ${C.blue[500]}30`,
              }}
            >
              ▶ Run Pipeline
            </button>
          )}
        </div>
      </header>

      {/* ═══ HERO SECTION ═══ */}
      <section className="px-6 md:px-8 pt-16 md:pt-24 pb-14 md:pb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4">
          See what happens with<br />
          <span
            style={{
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            your data, end to end
          </span>
        </h2>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: C.slate[500] }}>
          From the moment you ask a question to the final answer — every step visible, every decision traceable, every byte accounted for.
        </p>
        <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
          {[
            { n: "7", l: "Pipeline Stages" },
            { n: "100%", l: "Traceable" },
            { n: "0", l: "Data Retained by Model" },
            { n: "Your Tenant", l: "All Processing" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold font-mono" style={{ color: C.blue[700] }}>{s.n}</div>
              <div className="text-[10px] uppercase tracking-wider font-semibold mt-1" style={{ color: C.slate[400] }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PIPELINE STAGES ═══ */}
      <div className="max-w-[800px] mx-auto px-4 md:px-6 pb-24 flex flex-col items-center">
        {/* Stage 1 */}
        <UserQuestionStage v={v} anim={anim} />
        {v(0) && <ConnectorLabel text="HTTPS request to your app service" icon="🔒" />}

        {/* Stage 2 */}
        <IngestionStage v={v} anim={anim} chunks={chunks} />
        {v(1) && <ConnectorLabel text="Chunks stored in your vector DB" icon="💾" />}

        {/* Stage 3 */}
        <EmbeddingStage v={v} anim={anim} />
        {v(2) && <ConnectorLabel text="Semantic search against your vectors" icon="🔍" />}

        {/* Stage 4 */}
        <RetrievalStage v={v} anim={anim} chunks={chunks} retrieved={retrieved} />
        {v(3) && <ConnectorLabel text="Context assembled into structured prompt" icon="📎" />}

        {/* Stage 5 */}
        <PromptAssemblyStage v={v} anim={anim} chunks={chunks} retrieved={retrieved} />
        {v(4) && <ConnectorLabel text="Prompt sent to LLM via Azure OpenAI API" icon="🧠" />}

        {/* Stage 6 — LLM Deep Dive */}
        <LlmDeepDive v={v} anim={anim} llmSub={llmSub} />
        {v(5) && <ConnectorLabel text="Response validated & streamed back" icon="⚡" />}

        {/* Stage 7 — Response */}
        <ResponseStage v={v} anim={anim} response={response} />
        {v(6) && <ConnectorLabel text="What happens after?" icon="♻" />}

        {/* Stage 8 — Data Lifecycle */}
        <DataLifecycleStage v={v} anim={anim} />
      </div>
    </div>
  );
}
