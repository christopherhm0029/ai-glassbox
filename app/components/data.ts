/**
 * data.ts — Mock pipeline data for the demonstration.
 *
 * Contains the sample document chunks, retrieval results, and the
 * generated response text. Extracted here so stage components stay
 * focused on presentation, and the data can be swapped out easily.
 */

import type { Chunk, RetrievalResult } from "./tokens";

/* ── Document chunks (simulated output of ingestion stage) ── */
export const chunks: Chunk[] = [
  { id: 1, text: "Q3 revenue reached €42.5M, a 15% YoY increase driven by cloud services expansion across Nordic markets.", page: 3, tok: 87 },
  { id: 2, text: "Customer acquisition cost decreased to €1,200 per enterprise client, down from €1,800 in the prior quarter.", page: 7, tok: 64 },
  { id: 3, text: "The AI division contributed 28% of total revenue, up from 12% in the previous fiscal year.", page: 11, tok: 72 },
  { id: 4, text: "Employee headcount grew to 1,450 with key hires in ML engineering and solutions architecture.", page: 15, tok: 58 },
  { id: 5, text: "R&D investment allocated at 22% of revenue, focused on generative AI capabilities.", page: 22, tok: 61 },
];

/* ── Top-3 retrieval results with cosine similarity scores ── */
export const retrieved: RetrievalResult[] = [
  { cid: 3, score: 0.94 },
  { cid: 1, score: 0.87 },
  { cid: 5, score: 0.81 },
];

/* ── LLM-generated response with inline source citations ── */
export const response =
  `Based on the company's financial data, the AI division now accounts for 28% of total revenue — more than double the 12% from the previous year [Source: Page 11]. This growth is part of a broader upward trend, with Q3 revenue reaching €42.5M, a 15% year-over-year increase driven primarily by cloud services [Source: Page 3]. The company is reinforcing this trajectory by allocating 22% of revenue to R&D, with generative AI as a core focus area [Source: Page 22].`;
