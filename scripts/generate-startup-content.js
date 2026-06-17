const fs = require('fs');
const path = require('path');

const stages = [
  { 
    slug: "pre-seed-mvp", 
    title: "Pre-Seed & Seed MVP Development", 
    keywords: ["startup MVP developer", "seed stage app development", "build MVP fast"] 
  },
  { 
    slug: "series-a-scaling", 
    title: "Series A Technical Scaling", 
    keywords: ["Series A software scaling", "refactor MVP", "startup technical debt"] 
  },
  { 
    slug: "series-b-enterprise", 
    title: "Series B & Enterprise Expansion", 
    keywords: ["Series B engineering partner", "enterprise software compliance", "scale startup infrastructure"] 
  },
  { 
    slug: "cto-as-a-service", 
    title: "CTO as a Service for Startups", 
    keywords: ["startup CTO consulting", "fractional CTO for startups", "technical due diligence prep"] 
  }
];

const dir = path.join(__dirname, '../content/startup');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

stages.forEach(stage => {
  const content = `---
title: "${stage.title}"
description: "Xonit Space provides the exact engineering velocity and architectural strategy required for ${stage.title.toLowerCase()}."
keywords: ${JSON.stringify(stage.keywords)}
faqs:
  - question: "Are you comfortable with equity-based compensation?"
    answer: "While we operate primarily on a fee-for-service model, we are open to hybrid equity/cash models for exceptional founders building in spaces where we have deep domain expertise (e.g., Enterprise AI)."
  - question: "How fast can you build an MVP?"
    answer: "For early-stage startups, our MVP sprints are typically 6 to 10 weeks, focusing purely on the core value proposition required to prove traction."
process:
  - step: "Roadmap Audit"
    description: "Aligning your technical roadmap with your immediate fundraising or revenue goals."
  - step: "Agile Execution"
    description: "Deploying a dedicated squad to execute the roadmap with extreme velocity."
  - step: "Due Diligence Prep"
    description: "Ensuring the code, architecture, and documentation are ready to pass rigorous investor audits."
technologies: ["React", "Next.js", "Node.js", "AWS"]
industries: ["SaaS", "Fintech", "AI Startups"]
---

## Engineering for ${stage.title.split(' ')[0]} Startups

The technical needs of a startup change violently between funding rounds. 

If you build an MVP with enterprise architecture, you will burn through your runway before you launch. If you try to scale a scrappy MVP to a Series B user base, your servers will crash and you will lose your clients.

At Xonit Space, we understand the specific engineering mandate required for **${stage.title.split(' ')[0]}** companies.

### Strategic Capital Deployment

You have a limited runway. Every dollar spent on engineering must directly translate to increased valuation or revenue.

*   **Speed vs. Scale:** We know when to take on calculated technical debt to hit a deadline, and when to slow down and build robust, scalable infrastructure.
*   **Investor Readiness:** Our code is clean, our documentation is thorough, and our architecture is standard. When you go out to raise your next round, your tech stack will easily pass technical due diligence.
*   **Fractional Leadership:** We don't just provide coders; we provide senior technical leadership to help you make critical architectural decisions before they become expensive mistakes.

### Your Growth Partner

We have helped dozens of founders navigate the perilous transition from a hacked-together prototype to a secure, highly-available enterprise platform. 
`;

  fs.writeFileSync(path.join(dir, `${stage.slug}.md`), content);
  console.log(`Created ${stage.slug}.md`);
});
