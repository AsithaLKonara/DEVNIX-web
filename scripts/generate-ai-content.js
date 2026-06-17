const fs = require('fs');
const path = require('path');

const services = [
  { slug: "ai-agent-development", title: "AI Agent Development Services", keywords: ["AI agents", "autonomous agents", "custom AI agents"] },
  { slug: "openai-integration", title: "OpenAI Integration Services", keywords: ["OpenAI API", "GPT-4 integration", "OpenAI enterprise"] },
  { slug: "claude-integration", title: "Claude AI Integration Services", keywords: ["Anthropic Claude", "Claude integration", "Claude 3 API"] },
  { slug: "gemini-integration", title: "Google Gemini Integration Services", keywords: ["Google Gemini API", "Gemini integration", "Gemini Pro"] },
  { slug: "mcp-development", title: "Model Context Protocol (MCP) Development", keywords: ["MCP development", "Model Context Protocol", "LLM integrations"] },
  { slug: "rag-development", title: "RAG Development Services", keywords: ["RAG architecture", "Retrieval-Augmented Generation", "custom RAG"] },
  { slug: "langchain-development", title: "LangChain Development Services", keywords: ["LangChain developers", "LangChain framework", "LLM orchestration"] },
  { slug: "llamaindex-development", title: "LlamaIndex Development Services", keywords: ["LlamaIndex developers", "LlamaIndex integration", "data frameworks"] },
  { slug: "vector-database-development", title: "Vector Database Development", keywords: ["Pinecone", "Qdrant", "vector DB implementation"] },
  { slug: "ai-chatbot-development", title: "AI Chatbot Development Services", keywords: ["custom AI chatbot", "LLM chatbot", "customer support bot"] },
  { slug: "ai-automation", title: "AI Automation Services", keywords: ["AI workflow automation", "business process automation", "AI solutions"] },
  { slug: "ai-workflow-automation", title: "AI Workflow Automation", keywords: ["intelligent workflows", "automated workflows", "AI process automation"] },
  { slug: "ai-voice-agents", title: "AI Voice Agent Development", keywords: ["AI voice bots", "conversational AI", "voice assistants"] },
  { slug: "ai-customer-support-bots", title: "AI Customer Support Bot Development", keywords: ["automated customer support", "AI helpdesk", "support automation"] }
];

const dir = path.join(__dirname, '../content/services/ai-development');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

services.forEach(service => {
  const content = `---
title: "${service.title}"
description: "Xonit Space offers expert ${service.title.toLowerCase()} to help businesses scale operations and build intelligent workflows."
keywords: ${JSON.stringify(service.keywords)}
faqs:
  - question: "What is ${service.title.toLowerCase()}?"
    answer: "It is the process of building specialized AI solutions tailored to your unique business requirements."
  - question: "How long does implementation take?"
    answer: "Most implementations range from 4 to 12 weeks depending on complexity and data readiness."
process:
  - step: "Consultation"
    description: "Understanding your goals and existing infrastructure."
  - step: "Prototyping"
    description: "Rapid iteration to prove concept viability."
  - step: "Deployment"
    description: "Secure rollout to production."
technologies: ["Python", "Next.js", "Node.js"]
industries: ["SaaS", "Finance", "Healthcare"]
---

## Comprehensive ${service.title}

At Xonit Space, we specialize in delivering high-end **${service.title}**. Our team of engineers leverages the latest advancements in Artificial Intelligence to build systems that automate operations, enhance decision-making, and create entirely new product capabilities.

### Transform Your Operations

Generative AI is no longer a buzzword; it is a critical competitive advantage. We help you move beyond the hype by building secure, scalable, and highly performant AI integrations tailored to your specific use case.

### Scalable Architecture

We design our solutions to scale with your user base and data volume. From efficient vector storage to optimized LLM API calls, we ensure your AI infrastructure is cost-effective and highly responsive.
`;

  fs.writeFileSync(path.join(dir, `${service.slug}.md`), content);
  console.log(`Created ${service.slug}.md`);
});
