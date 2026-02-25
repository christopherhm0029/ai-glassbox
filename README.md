# AI Glass Box

**Demystifying AI for enterprises — because trust starts with transparency.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deployed-success?logo=github)](https://christopherhm0029.github.io/ai-glassbox)

---

## The Problem

Enterprises are hesitant to adopt AI because they cannot see what happens with their data inside the model — it feels like black magic. This mirrors the early days of cloud adoption, when customers asked: "Where is my data in the cloud?" That question slowed cloud adoption for years. The same dynamic is playing out with AI. Without a clear, trustworthy explanation of the pipeline, procurement teams stall, legal teams object, and executives stay on the fence.

## The Solution

AI Glass Box is an interactive, step-by-step visualization of the complete Retrieval-Augmented Generation (RAG) pipeline. It shows both the AI process and the infrastructure where your data lives at every stage — no black boxes, no hand-waving. Every stage is explained in plain language, making it accessible to mixed audiences from C-level executives to developers. The goal is to replace "I don't trust this" with "I understand exactly how this works."

## Screenshot / Demo

> Screenshot or animated GIF coming soon.

Live demo: [https://christopherhm0029.github.io/ai-glassbox](https://christopherhm0029.github.io/ai-glassbox)

## The 8 Stages

| Stage | Name | What It Shows |
|-------|------|---------------|
| 1 | User Question | Secure transmission from client to your app server |
| 2 | Document Ingestion | PDF chunking with overlap, token counts |
| 3 | Embedding | Text → vector transformation, semantic clustering |
| 4 | Retrieval | Cosine similarity search, match scoring |
| 5 | Prompt Assembly | System instructions + context + user query |
| 6 | Inside the LLM | Tokenization, attention heatmap, probability distribution, safety checks |
| 7 | Response | Streaming output with inline citations, source traceability |
| 8 | Data Lifecycle | Request/processing/response phases, cleanup, what you control |

## Key Principles

- **Fully Transparent**: Every stage visible and explained in plain language
- **Data Sovereign**: Data never leaves the customer's tenant
- **Fully Traceable**: Every claim links back to source documents

## Quick Start

```bash
git clone https://github.com/christopherhm0029/ai-glassbox.git
cd ai-glassbox
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to GitHub Pages

```bash
npm run build
# Push to main — GitHub Actions handles deployment automatically
```

## Accuracy Notes

- The LLM internals visualization (Stage 6) is illustrative of how transformer models work. Specific layer counts and parameter numbers are representative, not exact specifications of any particular model.
- Zero Data Retention on Azure OpenAI requires opting out of abuse monitoring through the Modified Abuse Monitoring program. This requires an Enterprise Agreement (EA) or Microsoft Customer Agreement (MCA). By default, Azure OpenAI may retain data for up to 30 days.
- All infrastructure references assume Azure OpenAI deployment. The concepts apply to other cloud providers with different service names.

## Use Cases

- Solution architects presenting AI solutions to enterprise customers
- Sales engineers demoing RAG pipelines to non-technical stakeholders
- AI consultants building trust with skeptical leadership teams
- Educators explaining how AI works to business audiences
- Internal teams building the case for AI adoption

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT License](LICENSE)

## Built With

- [Next.js 16](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React](https://react.dev)

## Acknowledgments

Inspired by real customer conversations about AI transparency. Built to bridge the gap between AI capability and enterprise trust.
