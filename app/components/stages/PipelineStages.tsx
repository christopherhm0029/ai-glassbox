/**
 * stages/PipelineStages.tsx — Pipeline stages 1 through 5.
 *
 * Each stage is a self-contained component that receives shared animation
 * helpers (`v`, `anim`) via StageProps. Stages covered:
 *   1. User Question
 *   2. Document Ingestion & Chunking
 *   3. Embedding (vector transformation)
 *   4. Semantic Retrieval
 *   5. Prompt Assembly
 */

"use client";

import { C } from "../tokens";
import type { StageProps, Chunk, RetrievalResult } from "../tokens";
import { SectionLabel, Badge, Stat, Card, InfraBox, TwoCol } from "../ui";

/* ═══════════════════════════════════════════════
   Stage 1 — User Question
   ═══════════════════════════════════════════════ */

export function UserQuestionStage({ anim }: StageProps) {
  return (
    <div className="w-full" style={anim(0)}>
      <SectionLabel step="1" label="User asks a question" color={C.blue[600]} />
      <Card accent={C.blue[500]}>
        <div className="p-6">
          <TwoCol
            leftTitle="What happens"
            rightTitle="Where it happens"
            left={
              <>
                {/* User message bubble */}
                <div
                  className="flex items-center gap-2.5 p-3 rounded-xl border mb-3"
                  style={{ background: C.slate[50], borderColor: C.slate[200] }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white font-bold shrink-0"
                    style={{ background: `linear-gradient(135deg,${C.blue[400]},${C.blue[600]})` }}
                  >
                    U
                  </div>
                  <div className="text-[13px] font-medium leading-relaxed">
                    &quot;What is the AI division&apos;s contribution to revenue?&quot;
                  </div>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: C.slate[500] }}>
                  Natural language question enters the system. No data sent to any model yet.
                </p>
              </>
            }
            right={
              <InfraBox
                icon="🖥"
                title="Client Application"
                subtitle="Your browser / Teams / API"
                items={[
                  "Request originates from your network",
                  "TLS 1.3 encrypted in transit",
                  "Authenticated via Entra ID / OAuth",
                  "No data leaves your org boundary yet",
                ]}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Stage 2 — Document Ingestion & Chunking
   ═══════════════════════════════════════════════ */

export function IngestionStage({ anim, chunks }: StageProps & { chunks: Chunk[] }) {
  return (
    <div className="w-full" style={anim(1)}>
      <SectionLabel step="2" label="Document Ingestion & Chunking" color={C.blue[600]} />
      <Card accent={C.blue[500]}>
        <div className="p-6">
          <TwoCol
            leftTitle="What happens"
            rightTitle="Where it happens"
            left={
              <>
                {/* File info card */}
                <div
                  className="flex items-center gap-3 p-3 rounded-xl border mb-3"
                  style={{ background: C.blue[50], borderColor: C.blue[200] }}
                >
                  <span className="text-2xl">📄</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold" style={{ color: C.blue[800] }}>Q3_Financial_Report.pdf</div>
                    <div className="text-[10px] font-mono" style={{ color: C.blue[500] }}>24 pages · 8,432 tokens</div>
                  </div>
                  <Badge color={C.green[600]} bg={C.green[50]}>Processed</Badge>
                </div>

                <p className="text-[12px] mb-3 leading-relaxed" style={{ color: C.slate[500] }}>
                  Document split into overlapping <strong>chunks</strong> — smaller searchable pieces that preserve context.
                </p>

                {/* First 3 chunk previews */}
                <div className="flex flex-col gap-2">
                  {chunks.slice(0, 3).map((c) => (
                    <div
                      key={c.id}
                      className="p-2.5 rounded-lg text-[11px] leading-relaxed"
                      style={{ background: C.slate[50], border: `1px solid ${C.slate[200]}`, color: C.slate[500] }}
                    >
                      <span className="font-mono text-[9px] font-bold" style={{ color: C.slate[400] }}>
                        Chunk #{c.id} · Page {c.page} · {c.tok} tok
                      </span>
                      <div className="mt-0.5">&quot;{c.text.slice(0, 80)}...&quot;</div>
                    </div>
                  ))}
                  <div className="text-[10px] text-center" style={{ color: C.slate[400] }}>+ 2 more chunks</div>
                </div>
              </>
            }
            right={
              <InfraBox
                icon="⚡"
                title="Azure App Service / Function"
                subtitle="Your subscription · Your region"
                items={[
                  "Runs in YOUR Azure subscription",
                  "Region: West Europe (or your choice)",
                  "Document never leaves your tenant",
                  "Chunking runs on your compute",
                  "No external API calls at this stage",
                ]}
              />
            }
          />
          {/* Summary stats */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <Stat label="Chunks" value="5" />
            <Stat label="Avg Size" value="68" unit=" tok" />
            <Stat label="Overlap" value="50" unit=" tok" />
            <Stat label="Time" value="0.3" unit="s" />
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Stage 3 — Embedding
   ═══════════════════════════════════════════════ */

export function EmbeddingStage({ anim }: StageProps) {
  /* Points for the 2D vector-space scatter visualisation */
  const scatterPoints = [
    { x: 18, y: 32, c: C.blue[500], label: "Revenue" },
    { x: 26, y: 55, c: C.blue[500], label: "Growth" },
    { x: 56, y: 25, c: C.purple[500], label: "AI div." },
    { x: 68, y: 50, c: C.green[500], label: "R&D" },
    { x: 50, y: 65, c: C.purple[500], label: "28%" },
  ];

  const legendItems = [
    { c: C.blue[500], l: "Financial" },
    { c: C.purple[500], l: "AI/Growth" },
    { c: C.green[500], l: "Operations" },
  ];

  return (
    <div className="w-full" style={anim(2)}>
      <SectionLabel step="3" label="Embedding — Making Text Searchable" color={C.purple[500]} />
      <Card accent={C.purple[500]}>
        <div className="p-6">
          <TwoCol
            leftTitle="What happens"
            rightTitle="Where it happens"
            left={
              <>
                <p className="text-[12px] mb-3 leading-relaxed" style={{ color: C.slate[500] }}>
                  Each chunk → <strong>3,072-dimension vector</strong> capturing its meaning. Enables search by concept, not keywords.
                </p>

                {/* Text → vector transformation example */}
                <div className="p-3 rounded-lg border mb-3" style={{ background: C.slate[50], borderColor: C.slate[200] }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="px-2.5 py-1.5 bg-white rounded-lg border text-[10px] max-w-[160px]" style={{ borderColor: C.slate[200], color: C.slate[500] }}>
                      &quot;AI division contributed 28%...&quot;
                    </div>
                    <span className="text-sm font-bold" style={{ color: C.purple[500] }}>→</span>
                    <div className="px-2.5 py-1.5 bg-white rounded-lg border font-mono text-[9px]" style={{ borderColor: C.slate[200], color: C.purple[500] }}>
                      [0.023, -0.189, ... 3,072 dims]
                    </div>
                  </div>
                </div>

                {/* 2D vector space scatter plot */}
                <div className="relative h-[130px] rounded-lg border overflow-hidden" style={{ background: C.slate[50], borderColor: C.slate[200] }}>
                  <div className="absolute top-2 left-3 text-[9px] font-mono font-semibold" style={{ color: C.slate[400] }}>
                    Vector space (2D projection)
                  </div>
                  {scatterPoints.map((d, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      style={{ left: `${d.x}%`, top: `${d.y}%` }}
                    >
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white"
                        style={{ background: d.c, boxShadow: `0 0 0 1px ${d.c}40, 0 2px 6px ${d.c}30` }}
                      />
                      <span className="text-[7px] font-mono font-bold mt-0.5" style={{ color: d.c }}>{d.label}</span>
                    </div>
                  ))}
                  {/* Legend */}
                  <div className="absolute bottom-2 right-3 flex gap-3">
                    {legendItems.map((leg, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: leg.c }} />
                        <span className="text-[8px] font-mono" style={{ color: C.slate[400] }}>{leg.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
            right={
              <InfraBox
                icon="🧮"
                title="Azure OpenAI — Embedding Endpoint"
                subtitle="text-embedding-3-large · Your deployment"
                items={[
                  "API call to YOUR Azure OpenAI instance",
                  "Runs on dedicated GPU in your region",
                  "Data encrypted in transit (TLS 1.3)",
                  "No data retained after embedding",
                  "Vectors stored in YOUR vector DB",
                  "Microsoft cannot access your data",
                ]}
                color={C.purple[500]}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Stage 4 — Semantic Retrieval
   ═══════════════════════════════════════════════ */

export function RetrievalStage({
  anim,
  chunks,
  retrieved,
}: StageProps & { chunks: Chunk[]; retrieved: RetrievalResult[] }) {
  return (
    <div className="w-full" style={anim(3)}>
      <SectionLabel step="4" label="Semantic Retrieval — Finding Relevant Data" color={C.amber[500]} />
      <Card accent={C.amber[400]}>
        <div className="p-6">
          <TwoCol
            leftTitle="What happens"
            rightTitle="Where it happens"
            left={
              <>
                <div
                  className="px-3 py-2.5 rounded-lg border mb-3 text-[12px] font-medium"
                  style={{ background: C.amber[50], borderColor: C.amber[200], color: C.amber[700] }}
                >
                  🔍 Query vectorized → matched against stored chunks by meaning
                </div>

                {/* Matched chunks with similarity scores */}
                <div className="flex flex-col gap-2">
                  {retrieved.map((r) => {
                    const c = chunks.find((x) => x.id === r.cid)!;
                    return (
                      <div key={r.cid} className="p-2.5 rounded-lg text-[11px] border" style={{ background: C.blue[50], borderColor: C.blue[200] }}>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono text-[10px] font-bold" style={{ color: C.blue[600] }}>
                            Chunk #{c.id} · Page {c.page}
                          </span>
                          <span
                            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ color: C.green[600], background: C.green[50] }}
                          >
                            {(r.score * 100).toFixed(0)}% match
                          </span>
                        </div>
                        <div style={{ color: C.slate[500] }} className="leading-relaxed">
                          &quot;{c.text.slice(0, 85)}...&quot;
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            }
            right={
              <InfraBox
                icon="🗄"
                title="Azure AI Search / ChromaDB"
                subtitle="Vector database · Your subscription"
                items={[
                  "Cosine similarity search in your DB",
                  "All vectors stored in YOUR tenant",
                  "No data shared across tenants",
                  "Results: top 3 chunks from YOUR docs",
                  "Latency: ~45ms (local to your region)",
                ]}
                color={C.amber[500]}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Stage 5 — Prompt Assembly
   ═══════════════════════════════════════════════ */

export function PromptAssemblyStage({
  anim,
  chunks,
  retrieved,
}: StageProps & { chunks: Chunk[]; retrieved: RetrievalResult[] }) {
  /* The three prompt sections shown to the user */
  const promptBlocks = [
    {
      label: "System Instructions",
      color: C.red[500],
      icon: "⚙",
      content: `"Answer based ONLY on provided context. Always cite source pages."`,
    },
    {
      label: "Retrieved Context (YOUR data)",
      color: C.amber[500],
      icon: "📄",
      content: retrieved
        .map((r) => `[Page ${chunks.find((c) => c.id === r.cid)!.page}]: ${chunks.find((c) => c.id === r.cid)!.text.slice(0, 60)}...`)
        .join("\n"),
    },
    {
      label: "User Question",
      color: C.blue[600],
      icon: "💬",
      content: `"What is the AI division's contribution to revenue?"`,
    },
  ];

  return (
    <div className="w-full" style={anim(4)}>
      <SectionLabel step="5" label="Prompt Assembly — What the Model Receives" color={C.red[500]} />
      <Card accent={C.red[400]}>
        <div className="p-6">
          <p className="text-[12px] mb-4 leading-relaxed" style={{ color: C.slate[500] }}>
            The model receives a structured prompt with <strong>three components</strong> — not your entire document:
          </p>

          {/* Prompt component blocks */}
          <div className="flex flex-col gap-3 mb-4">
            {promptBlocks.map((b, i) => (
              <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: `${b.color}40` }}>
                <div
                  className="px-4 py-2 border-b flex items-center gap-2"
                  style={{ background: `${b.color}18`, borderColor: `${b.color}30` }}
                >
                  <span className="text-sm">{b.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[1.2px] font-mono" style={{ color: b.color }}>
                    {b.label}
                  </span>
                </div>
                <div
                  className={`px-4 py-3 text-[11px] leading-relaxed whitespace-pre-line ${i === 1 ? "font-mono" : ""}`}
                  style={{ color: C.slate[500], background: `${b.color}0c` }}
                >
                  {b.content}
                </div>
              </div>
            ))}
          </div>

          {/* Summary stats */}
          <div className="flex gap-2 flex-wrap">
            <Stat label="Total Tokens" value="847" />
            <Stat label="Context %" value="72" unit="%" />
            <Stat label="Model" value="GPT-4o" />
            <Stat label="Temp" value="0.1" />
          </div>
        </div>
      </Card>
    </div>
  );
}
