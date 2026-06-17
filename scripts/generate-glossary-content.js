const fs = require('fs');
const path = require('path');

const glossary = [
  { 
    slug: "rag", 
    title: "What is RAG (Retrieval-Augmented Generation)?", 
    tldr: "Retrieval-Augmented Generation (RAG) is an AI architecture that improves Large Language Models by connecting them to external, private databases. It retrieves facts before answering, drastically reducing hallucinations.",
    serviceUrl: "/services/ai-development/rag-development",
    serviceLabel: "Explore RAG Development Services"
  },
  { 
    slug: "llm", 
    title: "What is a Large Language Model (LLM)?", 
    tldr: "A Large Language Model (LLM) is an AI algorithm trained on massive amounts of text data to understand and generate human language. Examples include OpenAI's GPT-4, Google's Gemini, and Meta's Llama.",
    serviceUrl: "/services/ai-development/openai-integration",
    serviceLabel: "Explore LLM Integration Services"
  },
  { 
    slug: "microservices-architecture", 
    title: "What is Microservices Architecture?", 
    tldr: "Microservices Architecture is a software development approach where an application is structured as a collection of small, independent services communicating over APIs, rather than a single monolith.",
    serviceUrl: "/tech/nodejs",
    serviceLabel: "Explore Backend Development Services"
  },
  { 
    slug: "headless-cms", 
    title: "What is a Headless CMS?", 
    tldr: "A Headless CMS is a content management system that separates the backend content repository from the frontend presentation layer. Content is delivered via APIs to any device or framework (like Next.js).",
    serviceUrl: "/tech/nextjs",
    serviceLabel: "Explore Next.js Development"
  },
  { 
    slug: "vector-database", 
    title: "What is a Vector Database?", 
    tldr: "A Vector Database is specialized software designed to store, manage, and search high-dimensional vectors (mathematical representations of data). They are crucial for AI applications to perform semantic search and power RAG pipelines.",
    serviceUrl: "/services/ai-development/vector-database-development",
    serviceLabel: "Explore Vector Database Services"
  },
  { 
    slug: "ai-agent", 
    title: "What is an AI Agent?", 
    tldr: "An AI Agent is an autonomous system that uses an LLM as its 'brain' to perceive its environment, make decisions, and execute actions using external tools (like APIs or calculators) to achieve a specific goal.",
    serviceUrl: "/services/ai-development/ai-agent-development",
    serviceLabel: "Explore AI Agent Development"
  },
  { 
    slug: "langchain", 
    title: "What is LangChain?", 
    tldr: "LangChain is an open-source framework designed to simplify the creation of applications using large language models. It provides standard interfaces for chains, agents, and memory.",
    serviceUrl: "/services/ai-development/langchain-development",
    serviceLabel: "Explore LangChain Development"
  },
  { 
    slug: "prompt-engineering", 
    title: "What is Prompt Engineering?", 
    tldr: "Prompt Engineering is the practice of designing, refining, and optimizing text inputs (prompts) to guide Generative AI models into producing highly accurate and desired outputs.",
    serviceUrl: "/services/ai-development",
    serviceLabel: "Explore AI Consulting Services"
  },
  { 
    slug: "kubernetes", 
    title: "What is Kubernetes (K8s)?", 
    tldr: "Kubernetes is an open-source container orchestration system for automating software deployment, scaling, and management. It allows massive distributed systems to run reliably across clusters of servers.",
    serviceUrl: "/tech/kubernetes",
    serviceLabel: "Explore Kubernetes Consulting"
  },
  { 
    slug: "api-gateway", 
    title: "What is an API Gateway?", 
    tldr: "An API Gateway is an API management tool that sits between a client and a collection of backend services. It acts as a reverse proxy, routing requests, enforcing security, and handling rate limiting.",
    serviceUrl: "/tech/aws",
    serviceLabel: "Explore Cloud Architecture Services"
  }
];

const dir = path.join(__dirname, '../content/glossary');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

glossary.forEach(item => {
  const content = `---
title: "${item.title}"
description: "${item.tldr.replace(/"/g, "'")}"
keywords: ["${item.slug.replace(/-/g, ' ')} definition", "what is ${item.slug.replace(/-/g, ' ')}", "${item.title.replace('What is ', '').replace('?', '')}"]
tldr: "${item.tldr.replace(/"/g, "'")}"
relatedServiceUrl: "${item.serviceUrl}"
relatedServiceLabel: "${item.serviceLabel}"
---

## Deep Dive into ${item.title.replace('What is ', '').replace('?', '')}

While the short answer provides a high-level overview, understanding the nuances of **${item.title.replace('What is ', '').replace('?', '')}** requires looking at how it is applied in modern software engineering.

### Why is it Important?

In the current landscape of digital transformation and AI integration, this technology plays a foundational role. 

Historically, companies struggled with legacy architectures that were monolithic and difficult to scale. The introduction of modern concepts like this has allowed engineering teams to:

1.  **Scale Independent Components:** Rather than scaling an entire massive application, teams can scale just the bottlenecks.
2.  **Improve Developer Velocity:** Smaller codebases or abstracted interfaces mean faster feature delivery.
3.  **Enhance Security and Fault Tolerance:** Isolating failures ensures that a single bug doesn't crash the entire enterprise system.

### Common Use Cases in the Enterprise

You will typically see this technology implemented when a company reaches a certain scale. For instance:

*   **High-Traffic Platforms:** E-commerce sites handling Black Friday spikes.
*   **Data-Heavy Applications:** AI systems needing to process terabytes of unstructured data.
*   **Security-First Environments:** Healthcare or Fintech platforms requiring strict access controls and auditing.

### Xonit Space's Approach

When we architect systems for our clients, we don't adopt technology just because it's a buzzword. We evaluate the long-term maintenance costs, the specific team capabilities, and the exact business requirements before implementing these architectures.
`;

  fs.writeFileSync(path.join(dir, `${item.slug}.md`), content);
  console.log(`Created ${item.slug}.md`);
});
