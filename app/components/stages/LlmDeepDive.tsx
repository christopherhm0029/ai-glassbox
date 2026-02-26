/**
 * stages/LlmDeepDive.tsx — Pipeline stage 6: Inside the LLM.
 *
 * Breaks down the transformer inference process into five substeps
 * that animate sequentially via the `llmSub` counter:
 *   A. Tokenization
 *   B. Transformer Layers (illustrative progress bars)
 *   C. Attention heatmap
 *   D. Token generation with probability bars
 *   E. Safety & output validation checks
 */

"use client";

import { C } from "../tokens";
import type { StageProps } from "../tokens";
import { SectionLabel, Badge, Stat, Card, InfraBox, TwoCol, TokenBubble, HeatCell, ProbBar, BusinessSummaryBox } from "../ui";

interface LlmDeepDiveProps extends StageProps {
  /** Current LLM substep counter (0–6) */
  llmSub: number;
}

export default function LlmDeepDive({ anim, llmSub }: LlmDeepDiveProps) {
  return (
    <div className="w-full" style={anim(5)}>
      <SectionLabel step="6" label="Inside the LLM — What Actually Happens" color={C.cyan[500]} />

      {/* ── LLM header card ── */}
      <Card accent={C.cyan[500]}>
        <div className="p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px]"
              style={{ background: `linear-gradient(135deg,${C.cyan[500]},${C.blue[600]})` }}
            >
              🧠
            </div>
            <div>
              <div className="text-base font-extrabold text-gray-900">Large Language Model Processing</div>
              <div className="text-[11px] font-mono" style={{ color: C.slate[400] }}>
                GPT-4o · Transformer architecture · Billions of parameters
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge color={C.green[600]} bg={C.green[50]}>Your Azure deployment</Badge>
            <Badge color={C.cyan[500]} bg={C.cyan[50]}>GPU: NVIDIA A100/H100</Badge>
          </div>
        </div>
      </Card>

      {/* ── Infrastructure context panel ── */}
      <div className="border border-t-0 rounded-b-xl p-6 mb-4 bg-white" style={{ borderColor: C.slate[200] }}>
        <TwoCol
          leftTitle="Model Processing"
          rightTitle="Infrastructure & Data Path"
          left={
            <p className="text-[12px] m-0 leading-relaxed" style={{ color: C.slate[500] }}>
              Your prompt enters the model and passes through many transformer layers. Each layer refines the
              model&apos;s understanding — from basic token recognition to complex reasoning.
            </p>
          }
          right={
            <InfraBox
              icon="🏗"
              title="Azure OpenAI Service"
              subtitle="Your deployment · Your region · Your keys"
              items={[
                "GPU cluster: NVIDIA A100/H100 in YOUR region",
                "Dedicated capacity (PTU) or shared pool",
                "Network: private endpoint / VNET integrated",
                "Data encrypted at rest (AES-256) & in transit",
                "Microsoft has NO access to your prompts",
                "Up to 30 days by default · 0 days with approved Zero Data Retention",
              ]}
              color={C.cyan[500]}
            />
          }
        />
      </div>

      {/* ── Substep cards ── */}
      <div className="flex flex-col gap-3">
        <TokenizationCard llmSub={llmSub} />
        <TransformerLayersCard llmSub={llmSub} />
        <AttentionCard llmSub={llmSub} />
        <TokenGenerationCard llmSub={llmSub} />
        <SafetyCard llmSub={llmSub} />
      </div>

      {/* ── Summary stats ── */}
      <div className="flex gap-2 mt-4 flex-wrap justify-center">
        <Stat label="Architecture" value="Transformer" />
        <Stat label="Inference" value="1.4" unit="s" />
        <Stat label="Output" value="156" unit=" tok" />
        <Stat label="Tok/sec" value="111" />
      </div>

      <BusinessSummaryBox
        summary="The AI processes your question and your document sections through hundreds of mathematical layers in about 1.4 seconds. At each step it refines its understanding, identifies what is most relevant, and builds the answer word by word — always guided by the data in your documents. It is not guessing or searching the internet."
        takeaway="The AI writes its answer one word at a time, each choice backed by the content in your documents. Every key figure — like '28%' — comes directly from your data with 96%+ confidence."
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Substep A — Tokenization
   ───────────────────────────────────────────── */

function TokenizationCard({ llmSub }: { llmSub: number }) {
  return (
    <Card accent={C.cyan[500]}>
      <SubstepHeader letter="A" title="Tokenization" complete={llmSub >= 1} />
      <div className="p-5" style={{ opacity: llmSub >= 1 ? 1 : 0.45, transition: "opacity .4s ease" }}>
        <p className="text-[12px] mb-3 leading-relaxed" style={{ color: C.slate[500] }}>
          Text → subword tokens (the model&apos;s vocabulary units). Each token maps to a number.
        </p>

        {/* System instruction tokens (red) */}
        <div className="flex flex-wrap mb-2">
          {["Answer", " based", " ONLY", " on", " the", " provided", " context"].map((t, i) => (
            <TokenBubble key={i} text={t} type="system" />
          ))}
        </div>

        {/* Context tokens (amber) */}
        <div className="flex flex-wrap mb-2">
          {["The", " AI", " division", " contributed", " 28", "%", " of", " total", " revenue"].map((t, i) => (
            <TokenBubble key={i} text={t} type="context" />
          ))}
          <span className="text-[9px] px-2 py-1 self-center" style={{ color: C.slate[400] }}>...+580 more</span>
        </div>

        {/* Query tokens (blue) */}
        <div className="flex flex-wrap">
          {["What", " is", " the", " AI", " division", "'s", " contribution"].map((t, i) => (
            <TokenBubble key={i} text={t} type="query" />
          ))}
        </div>

        <div className="flex gap-2 mt-3 flex-wrap">
          <Stat label="Tokens" value="847" />
          <Stat label="Vocab" value="100K" unit="+" />
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Substep B — Transformer Layers
   ───────────────────────────────────────────── */

function TransformerLayersCard({ llmSub }: { llmSub: number }) {
  const layers = [
    { l: "Early layers", d: "Token recognition, syntax", w: 100 },
    { l: "Lower-mid",    d: "Semantic meaning",         w: 100 },
    { l: "Upper-mid",    d: "Context binding, co-reference", w: 100 },
    { l: "Deep layers",  d: "Reasoning, inference chains",   w: 100 },
    { l: "Final layers", d: "Output formation, citations",   w: llmSub >= 3 ? 100 : 60 },
  ];

  return (
    <Card accent={C.cyan[500]}>
      <SubstepHeader letter="B" title="Transformer Layers" complete={llmSub >= 3} />
      <div className="p-5" style={{ opacity: llmSub >= 2 ? 1 : 0.45, transition: "opacity .4s ease" }}>
        <p className="text-[10px] italic mb-3" style={{ color: C.slate[400] }}>
          Illustrative — each group of layers handles a different level of understanding:
        </p>

        {/* Animated progress bars for each layer group */}
        <div className="flex flex-col gap-1.5 mb-3">
          {layers.map((layer, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[9px] font-mono w-[72px] text-right font-semibold" style={{ color: C.slate[400] }}>
                {layer.l}
              </span>
              <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: C.slate[100] }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${llmSub >= 2 ? layer.w : 0}%`,
                    background: `linear-gradient(90deg,${C.blue[200]},${C.blue[600]})`,
                    transition: `width .8s ease ${i * 120}ms`,
                  }}
                />
              </div>
              <span className="text-[9px] w-[130px]" style={{ color: C.slate[400] }}>{layer.d}</span>
            </div>
          ))}
        </div>

        <div
          className="px-3.5 py-2.5 rounded-lg border text-[11px] leading-relaxed"
          style={{ background: C.amber[50], borderColor: C.amber[200], color: C.amber[700] }}
        >
          💡 All 847 tokens process <strong>simultaneously</strong> through each layer — parallel GPU computation, not sequential.
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Substep C — Attention Heatmap
   ───────────────────────────────────────────── */

function AttentionCard({ llmSub }: { llmSub: number }) {
  /* Attention weight rows: each row shows how much the generated token attends to input tokens */
  const attentionRows = [
    { label: "→ 'AI'",      weights: [0.92, 0.88, 0.95, 0.78, 0.45, 0.12, 0.35, 0.28] },
    { label: "→ '28%'",     weights: [0.55, 0.62, 0.97, 0.90, 0.72, 0.05, 0.15, 0.10] },
    { label: "→ 'revenue'", weights: [0.40, 0.50, 0.85, 0.96, 0.65, 0.30, 0.42, 0.38] },
  ];
  const inputTokens = ["AI", "division", "28%", "revenue", "12%", "cloud", "R&D", "22%"];

  return (
    <Card accent={C.cyan[500]}>
      <SubstepHeader letter="C" title='Attention — How the Model "Focuses"' complete={llmSub >= 4} />
      <div className="p-5" style={{ opacity: llmSub >= 3 ? 1 : 0.45, transition: "opacity .4s ease" }}>
        <p className="text-[12px] mb-3 leading-relaxed" style={{ color: C.slate[500] }}>
          When generating each word, the model decides which input tokens to focus on. Darker blue = stronger attention:
        </p>

        {/* Heatmap grid */}
        <div className="p-3 rounded-xl border mb-3" style={{ background: C.slate[50], borderColor: C.slate[200] }}>
          <div className="text-[9px] font-mono font-bold mb-2 uppercase tracking-wider" style={{ color: C.slate[400] }}>
            Generating: &quot;AI division accounts for 28%&quot;
          </div>
          {attentionRows.map((row, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className="text-[9px] font-mono w-[60px] text-right font-semibold" style={{ color: C.slate[400] }}>
                {row.label}
              </span>
              <div className="flex gap-[3px] flex-1">
                {inputTokens.map((tok, j) => (
                  <HeatCell key={j} tok={tok} w={row.weights[j]} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="px-4 py-3 rounded-xl border text-[11px] leading-relaxed"
          style={{ background: C.blue[50], borderColor: C.blue[200], color: C.blue[700] }}
        >
          🔎 When generating &quot;28%&quot;, attention is <strong>97%</strong> on the &quot;28%&quot; from YOUR document — proof
          it&apos;s reading your data, not making things up.
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Substep D — Token Generation
   ───────────────────────────────────────────── */

function TokenGenerationCard({ llmSub }: { llmSub: number }) {
  return (
    <Card accent={C.cyan[500]}>
      <SubstepHeader letter="D" title="Token Generation — Choosing Each Word" complete={llmSub >= 5} />
      <div className="p-5" style={{ opacity: 1, transition: "opacity .4s ease" }}>
        <p className="text-[12px] mb-3 leading-relaxed" style={{ color: C.slate[500] }}>
          Output generated <strong>one token at a time</strong>. For each position, the model picks the highest-probability word:
        </p>

        <div className="p-3.5 rounded-xl border mb-3" style={{ background: C.slate[50], borderColor: C.slate[200] }}>
          <div className="text-[9px] font-mono font-bold mb-2 uppercase tracking-wider" style={{ color: C.slate[400] }}>
            Token #14 — Key data point
          </div>
          <div
            className="px-3 py-1.5 bg-white rounded-lg border mb-3 text-[11px] font-mono"
            style={{ borderColor: C.slate[200], color: C.slate[500] }}
          >
            &quot;...the AI division now accounts for&quot; → <strong style={{ color: C.blue[700] }}>?</strong>
          </div>

          {/* Probability bars for candidate tokens */}
          <ProbBar token="28" prob={0.96} rank={1} selected />
          <ProbBar token="approximately" prob={0.02} rank={2} />
          <ProbBar token="nearly" prob={0.01} rank={3} />

          <div className="mt-2.5 text-[11px] font-bold" style={{ color: C.green[600] }}>
            ✓ Selected: &quot;28&quot; (96.1% — high confidence, directly from your data)
          </div>
        </div>

        <div
          className="px-3.5 py-2.5 rounded-lg border text-[11px] leading-relaxed"
          style={{ background: C.amber[50], borderColor: C.amber[200], color: C.amber[700] }}
        >
          💡 The model performs mathematical operations to predict the most likely next token — guided by YOUR data in the
          context. It&apos;s not &quot;thinking&quot; like a human.
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Substep E — Safety & Output Validation
   ───────────────────────────────────────────── */

function SafetyCard({ llmSub }: { llmSub: number }) {
  const checks = [
    { check: "Content Safety", status: "Passed", icon: "🛡" },
    { check: "Grounding",      status: "100%",   icon: "📌" },
    { check: "PII Detection",  status: "Clear",  icon: "🔐" },
    { check: "Hallucination Risk", status: "Low", icon: "🎯" },
    { check: "Token Limit",    status: "OK",     icon: "📏" },
    { check: "Format Valid",   status: "✓",      icon: "✅" },
  ];

  return (
    <Card accent={C.cyan[500]}>
      <SubstepHeader letter="E" title="Safety & Output Validation" complete={llmSub >= 6} completeLabel="✓ All Passed" />
      <div className="p-5" style={{ opacity: 1, transition: "opacity .4s ease" }}>
        <div className="grid grid-cols-2 gap-2.5">
          {checks.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: C.slate[50], border: `1px solid ${C.slate[200]}` }}
            >
              <span className="text-sm">{c.icon}</span>
              <span className="text-[11px] font-semibold flex-1 text-gray-800">{c.check}</span>
              <span
                className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full"
                style={{ background: C.green[50], color: C.green[600] }}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Shared substep header bar
   ───────────────────────────────────────────── */

function SubstepHeader({
  letter,
  title,
  complete,
  completeLabel = "✓ Complete",
}: {
  letter: string;
  title: string;
  complete: boolean;
  completeLabel?: string;
}) {
  return (
    <div className="px-5 py-3 flex justify-between items-center border-b" style={{ background: C.cyan[50], borderColor: `${C.cyan[500]}35` }}>
      <div className="flex items-center gap-2">
        <span
          className="w-6 h-6 rounded-md inline-flex items-center justify-center text-[10px] font-extrabold font-mono border"
          style={{ background: `${C.cyan[500]}22`, borderColor: `${C.cyan[500]}50`, color: C.cyan[500] }}
        >
          {letter}
        </span>
        <span className="text-xs font-bold" style={{ color: C.cyan[500] }}>{title}</span>
      </div>
      {complete && <Badge color={C.green[600]} bg={C.green[50]}>{completeLabel}</Badge>}
    </div>
  );
}
