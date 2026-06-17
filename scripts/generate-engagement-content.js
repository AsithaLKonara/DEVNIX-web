const fs = require('fs');
const path = require('path');

const models = [
  { 
    slug: "dedicated-teams", 
    title: "Hire Dedicated Engineering Teams", 
    keywords: ["hire dedicated developers", "dedicated software team", "offshore engineering team"] 
  },
  { 
    slug: "staff-augmentation", 
    title: "IT Staff Augmentation Services", 
    keywords: ["IT staff augmentation", "hire senior engineers", "team extension services"] 
  },
  { 
    slug: "fixed-price", 
    title: "Fixed-Price Project Delivery", 
    keywords: ["fixed price software development", "MVP project delivery", "custom software pricing"] 
  },
  { 
    slug: "technical-consulting", 
    title: "Technical Consulting & CTO as a Service", 
    keywords: ["CTO as a service", "software architecture consulting", "tech debt audit"] 
  }
];

const dir = path.join(__dirname, '../content/engagement');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

models.forEach(model => {
  const content = `---
title: "${model.title}"
description: "Flexible, transparent, and scalable: Discover how Xonit Space integrates with your business through our ${model.title.toLowerCase()} model."
keywords: ${JSON.stringify(model.keywords)}
faqs:
  - question: "How quickly can we start?"
    answer: "For staff augmentation, we can usually deploy senior engineers within 7-14 days. For fixed-price projects, discovery begins immediately after the contract is signed."
  - question: "Who owns the Intellectual Property (IP)?"
    answer: "You do. 100%. All code, assets, and documentation are legally transferred to your company upon payment."
process:
  - step: "Scope & Selection"
    description: "Defining the exact requirements, technical skills needed, and timelines."
  - step: "Integration & Kickoff"
    description: "Seamlessly embedding our resources into your existing workflows (Slack, Jira, Github)."
  - step: "Execution & Scaling"
    description: "Delivering code predictably. You can scale the team up or down with 30 days notice."
technologies: ["React", "Node.js", "Python", "AWS"]
industries: ["Enterprise", "Scale-ups", "SaaS"]
---

## Flexible Engagement: ${model.title}

Finding the right technical talent is difficult. Retaining them is even harder. 

At Xonit Space, we offer flexible engagement models designed to give you exactly what you need, exactly when you need it—without the overhead of traditional recruitment.

### How This Model Works

The **${model.title}** engagement model is designed specifically for companies that need:

*   **Speed to Market:** Bypass the 3-to-6 month recruitment cycle. We have senior talent ready to deploy.
*   **Cost Predictability:** Transparent billing structures mean you never get hit with unexpected invoices.
*   **Elite Talent:** Our engineers are rigorously vetted. We only hire the top 1% of technical talent, ensuring you get senior-level output from day one.

### The Xonit Space Guarantee

We don't believe in locking clients into rigid, unworkable contracts. Our models are Agile. If your funding rounds change or your roadmap pivots, our team structure can pivot right alongside you. We are your long-term technical partner, fully invested in your product's success.
`;

  fs.writeFileSync(path.join(dir, `${model.slug}.md`), content);
  console.log(`Created ${model.slug}.md`);
});
