# Contributing to AI Glass Box

Thanks for your interest in improving AI Glass Box! Every contribution helps make AI more transparent and trustworthy for enterprises.

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-new-stage`)
3. Make your changes
4. Run `npm run lint` and `npm run build` to verify everything works
5. Commit with clear, descriptive messages
6. Open a Pull Request describing what you changed and why

## Types of Contributions Welcome

- New pipeline stage visualizations
- Accuracy improvements to existing explanations
- Design and UX improvements
- Accessibility enhancements
- Translations
- Documentation improvements
- Bug fixes

## Development Setup

```bash
git clone https://github.com/christopherhm0029/ai-glassbox.git
cd ai-glassbox
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to see your changes.

## Code Standards

- **TypeScript strict mode** — all code must be type-safe
- **Tailwind CSS** — use utility classes; do not add external UI libraries
- **Components** — place new components in `app/components/`
- **Language** — use plain language in explanations; write for a mixed audience of executives and engineers

## Accuracy Matters

This project is used to explain AI to enterprise audiences. If you spot an inaccuracy in how we describe the RAG pipeline, LLM internals, or data handling, please open an issue or PR. Accuracy is more important than visual appeal.

## Code of Conduct

We are committed to a respectful and inclusive environment. Please be kind and constructive in all interactions — in issues, pull requests, and discussions. Harassment or discrimination of any kind will not be tolerated.
