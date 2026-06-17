const fs = require('fs');
const path = require('path');

const blogs = [
  { 
    slug: "building-rag-pipelines", 
    title: "How to Build a Scalable RAG Pipeline with Next.js and Pinecone", 
    description: "A deep dive into architecting enterprise-grade Retrieval-Augmented Generation systems that don't hallucinate.",
    tags: ["Engineering", "AI", "Architecture"],
    readTime: "12 min read"
  },
  { 
    slug: "monolith-to-microservices-migration", 
    title: "The Zero-Downtime Guide to Monolith to Microservices Migration", 
    description: "Strangler fig pattern, data syncing, and how we migrate legacy enterprise systems to Kubernetes without dropping requests.",
    tags: ["Engineering", "Cloud", "Case Studies"],
    readTime: "15 min read"
  },
  { 
    slug: "multi-agent-workflows", 
    title: "Introduction to Multi-Agent Workflows: Beyond Simple Chatbots", 
    description: "Why the future of enterprise AI relies on specialized, communicating agents rather than single monolithic LLMs.",
    tags: ["AI", "Architecture", "Future"],
    readTime: "10 min read"
  }
];

const dir = path.join(__dirname, '../content/resources');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

blogs.forEach(blog => {
  const content = `---
title: "${blog.title}"
description: "${blog.description}"
keywords: ["${blog.tags.join('", "')}", "software engineering blog"]
author: "Xonit Space Engineering"
date: "${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}"
readTime: "${blog.readTime}"
tags: ${JSON.stringify(blog.tags)}
---

Retrieval-Augmented Generation (RAG) is no longer a buzzword; it is a fundamental requirement for any enterprise AI application that needs to answer questions based on proprietary data.

However, building a RAG prototype in a Jupyter notebook is vastly different from deploying a highly concurrent, secure, and hallucination-free pipeline in production.

In this guide, we will break down exactly how our engineering team at Xonit Space architects RAG pipelines for our enterprise clients using modern stacks like **Next.js**, **Pinecone**, and **OpenAI**.

## The Architecture Overview

A production RAG system is split into two asynchronous pipelines:

1.  **The Ingestion Pipeline:** (Background Cron/Queue)
2.  **The Retrieval Pipeline:** (Real-time API)

### 1. The Ingestion Pipeline

You cannot afford to embed documents on the fly during a user request. Your ingestion pipeline must listen for database changes (webhooks) or run on a cron job.

\`\`\`typescript
// Example: A simplified chunking utility
export function chunkText(text: string, maxTokens: number = 500): string[] {
  // In production, use LangChain's RecursiveCharacterTextSplitter 
  // to ensure you don't cut words or sentences in half.
  const sentences = text.split('.');
  // ... chunking logic
  return chunks;
}
\`\`\`

> **Engineering Tip:** Never chunk blindly by character count. Always use semantic chunking or sentence-aware splitting, otherwise your vector embeddings will lose crucial context.

### 2. The Retrieval Pipeline

When a user asks a question, we must embed their query, search the vector database, inject the results into a prompt, and stream the LLM response back.

## Common Production Pitfalls

Here are three things that break RAG pipelines when you scale:

1.  **Stale Vectors:** If a user updates a document in your SaaS, the old vector must be deleted and re-embedded immediately.
2.  **Prompt Injection:** Never trust user input. Always sanitize queries before passing them to your LLM.
3.  **Context Window Overflow:** If you inject too many search results, you will exceed the LLM's token limit. Implement a strict token-counting function before building your final prompt string.

## Conclusion

Building RAG is easy; building *reliable* RAG is an engineering challenge. If your team is struggling to get AI features out of the prototype phase and into production, [reach out to our engineering team](/contact). We specialize in building secure, scalable AI infrastructure.
`;

  fs.writeFileSync(path.join(dir, `${blog.slug}.md`), content);
  console.log(`Created ${blog.slug}.md`);
});
