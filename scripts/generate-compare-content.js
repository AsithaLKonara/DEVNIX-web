const fs = require('fs');
const path = require('path');

const comparisons = [
  { 
    slug: "react-vs-nextjs", 
    title: "React vs Next.js: Which should you choose?", 
    winner: "Next.js is the clear winner for production apps needing SEO and fast load times, while React is fine for basic single-page applications behind a login.",
    features: [
      { feature: "Routing", optionA: "React Router (Client-side)", optionB: "App Router (Server-side & Client)" },
      { feature: "SEO", optionA: "Poor (Client-rendered)", optionB: "Excellent (Server-rendered)" },
      { feature: "Performance", optionA: "Heavy initial load", optionB: "Optimized initial load" }
    ],
    pros: ["React: Easier to learn", "React: Huge ecosystem", "Next.js: Out-of-the-box performance", "Next.js: API Routes included"],
    cons: ["React: No built-in SSR", "Next.js: Steeper learning curve"]
  },
  { 
    slug: "flutter-vs-react-native", 
    title: "Flutter vs React Native: The 2026 Guide", 
    winner: "Choose React Native if your team already knows React/TypeScript. Choose Flutter if UI consistency across platforms is your absolute top priority.",
    features: [
      { feature: "Language", optionA: "Dart (Flutter)", optionB: "JavaScript/TypeScript (React Native)" },
      { feature: "Performance", optionA: "Near-native (compiled)", optionB: "Near-native (JIT/Hermes)" }
    ],
    pros: ["Flutter: Beautiful custom UI", "React Native: Shared codebase with web"],
    cons: ["Flutter: Dart is less popular", "React Native: Bridge can cause bottlenecks"]
  },
  {
    slug: "openai-vs-claude",
    title: "OpenAI GPT-4 vs Anthropic Claude 3 for Enterprise",
    winner: "Claude 3 (Opus/Sonnet) is generally preferred for long-context analysis and coding, while OpenAI remains the standard for general-purpose integrations and voice.",
    features: [
      { feature: "Context Window", optionA: "128k (GPT-4o)", optionB: "200k+ (Claude 3.5)" },
      { feature: "Coding Ability", optionA: "Excellent", optionB: "Industry Leading" }
    ],
    pros: ["OpenAI: Massive ecosystem", "Claude: Less hallucinations on long texts"],
    cons: ["OpenAI: Prone to 'lazy' outputs", "Claude: Stricter safety filters"]
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine Tuning: How to customize your LLM",
    winner: "Use RAG to give the model access to new, dynamic facts (like company docs). Use Fine-Tuning to teach the model a new tone, style, or format.",
    features: [
      { feature: "Data Updates", optionA: "Instant (RAG)", optionB: "Requires retraining (Fine-Tuning)" },
      { feature: "Cost", optionA: "Low setup, higher inference", optionB: "High setup, lower inference" }
    ],
    pros: ["RAG: No retraining needed", "Fine-Tuning: Deeply internalizes tone"],
    cons: ["RAG: Context window limits", "Fine-Tuning: Hard to remove bad facts"]
  },
  {
    slug: "mcp-vs-apis",
    title: "Model Context Protocol (MCP) vs Standard APIs",
    winner: "MCP is the future for connecting AI agents to local tools and enterprise systems securely, replacing fragmented API integrations.",
    features: [
      { feature: "Standardization", optionA: "Standardized (MCP)", optionB: "Custom per vendor (APIs)" },
      { feature: "Agentic Support", optionA: "Native", optionB: "Requires wrappers" }
    ],
    pros: ["MCP: Universal standard for AI", "APIs: Exists everywhere"],
    cons: ["MCP: Still early adoption phase", "APIs: Maintenance nightmare for 100+ tools"]
  },
  {
    slug: "langchain-vs-llamaindex",
    title: "LangChain vs LlamaIndex",
    winner: "Use LlamaIndex if your primary goal is advanced RAG and data ingestion. Use LangChain if you are building complex agentic workflows with many tools.",
    features: [
      { feature: "Primary Focus", optionA: "Agents & Chains (LangChain)", optionB: "Data Indexing & RAG (LlamaIndex)" }
    ],
    pros: ["LangChain: Huge integrations", "LlamaIndex: Best-in-class RAG"],
    cons: ["LangChain: Can be overly abstracted", "LlamaIndex: Less focused on generic agents"]
  },
  {
    slug: "cursor-vs-windsurf",
    title: "Cursor vs Windsurf: AI IDE Comparison",
    winner: "Both are incredible, but Cursor currently leads in overall stability and community adoption, while Windsurf excels in autonomous agentic 'flows'.",
    features: [
      { feature: "AI Model", optionA: "Multiple (Cursor)", optionB: "Multiple + Cascade (Windsurf)" }
    ],
    pros: ["Cursor: Familiar VSCode fork", "Windsurf: Innovative agentic UI"],
    cons: ["Cursor: Composer can be glitchy", "Windsurf: Newer, smaller community"]
  }
];

const dir = path.join(__dirname, '../content/compare');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

comparisons.forEach(comp => {
  const content = `---
title: "${comp.title}"
description: "A detailed technical comparison of ${comp.slug.replace(/-/g, ' ')} to help you make the right architectural decision."
keywords: ["${comp.slug.replace(/-/g, ' ')}", "comparison", "software architecture"]
winner: "${comp.winner}"
features: ${JSON.stringify(comp.features)}
pros: ${JSON.stringify(comp.pros)}
cons: ${JSON.stringify(comp.cons)}
---

## Deep Dive Comparison

When evaluating these technologies, it's crucial to look beyond the marketing hype and understand how they perform in production environments. At Xonit Space, we've deployed both solutions across enterprise architectures and have gathered real-world data on their performance, developer experience, and total cost of ownership.

### Architecture Implications

Choosing the wrong technology at the start of a project can cost hundreds of thousands of dollars in technical debt. Our engineering team recommends evaluating based on your team's existing expertise and the specific scaling constraints of your application.
`;

  fs.writeFileSync(path.join(dir, `${comp.slug}.md`), content);
  console.log(`Created ${comp.slug}.md`);
});
