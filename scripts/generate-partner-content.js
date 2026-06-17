const fs = require('fs');
const path = require('path');

const partners = [
  { 
    slug: "aws", 
    title: "AWS Consulting Partner & Experts", 
    keywords: ["AWS consulting partner", "hire AWS developers", "AWS cloud migration agency"] 
  },
  { 
    slug: "vercel", 
    title: "Vercel Enterprise Partner", 
    keywords: ["Vercel enterprise partner", "Next.js agency", "Vercel migration experts"] 
  },
  { 
    slug: "stripe", 
    title: "Stripe Integration Experts", 
    keywords: ["Stripe integration agency", "custom Stripe payments", "hire Stripe developers"] 
  },
  { 
    slug: "openai", 
    title: "OpenAI Integration Partner", 
    keywords: ["OpenAI integration agency", "hire OpenAI developers", "ChatGPT enterprise integration"] 
  }
];

const dir = path.join(__dirname, '../content/partners');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

partners.forEach(partner => {
  const content = `---
title: "${partner.title}"
description: "Leverage the full power of the ${partner.title.split(' ')[0]} ecosystem with Xonit Space, your certified enterprise integration partner."
keywords: ${JSON.stringify(partner.keywords)}
faqs:
  - question: "Why hire a certified partner instead of doing it in-house?"
    answer: "These ecosystems are massive and constantly evolving. As partners, we have direct access to beta features, dedicated support channels, and years of experience navigating the specific quirks of the platform."
  - question: "Can you audit our existing setup?"
    answer: "Yes. Our first step is usually a comprehensive technical audit to identify security vulnerabilities and cost-optimization opportunities within your current architecture."
process:
  - step: "Architecture Audit"
    description: "Evaluating your current usage of the platform to identify immediate optimizations."
  - step: "Custom Integration"
    description: "Building the specific features, pipelines, or APIs required for your business logic."
  - step: "Scale & Maintenance"
    description: "Ensuring the system handles enterprise-level traffic without degrading."
technologies: ["${partner.title.split(' ')[0]}", "Node.js", "React", "TypeScript"]
industries: ["Enterprise", "SaaS", "E-commerce"]
---

## Maximize Your Investment in ${partner.title.split(' ')[0]}

Choosing an underlying technology provider is only the first step. The true challenge lies in architecting, integrating, and scaling that technology to meet the specific demands of your business.

As an official **${partner.title}**, Xonit Space possesses the deep, specialized knowledge required to unlock the full potential of this ecosystem.

### Beyond Basic Implementation

Anyone can read the docs and set up a basic integration. We handle the edge cases that break standard implementations.

*   **Cost Optimization:** We architect solutions that scale efficiently, ensuring you aren't hit with massive, unexpected infrastructure bills.
*   **Enterprise Security:** We implement strict IAM roles, VPCs, and encryption protocols to ensure your data is locked down.
*   **Performance Tuning:** We utilize edge computing and advanced caching strategies to guarantee sub-second response times globally.

### Direct Line to the Source

Our partnership status means we don't get stuck in standard support queues. We have direct lines to the engineers who built these platforms, allowing us to resolve complex architectural blockers rapidly.
`;

  fs.writeFileSync(path.join(dir, `${partner.slug}.md`), content);
  console.log(`Created ${partner.slug}.md`);
});
