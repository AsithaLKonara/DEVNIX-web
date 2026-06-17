const fs = require('fs');
const path = require('path');

const methods = [
  { 
    slug: "agile-development", 
    title: "Agile Software Development", 
    keywords: ["agile development company", "scrum software development", "agile engineering agency"] 
  },
  { 
    slug: "devops-consulting", 
    title: "DevOps Consulting Services", 
    keywords: ["devops consulting firm", "infrastructure as code", "kubernetes consulting"] 
  },
  { 
    slug: "cloud-native-architecture", 
    title: "Cloud-Native Architecture", 
    keywords: ["cloud native software development", "microservices architecture consulting", "cloud native agency"] 
  },
  { 
    slug: "ci-cd-pipelines", 
    title: "Continuous Integration & Delivery (CI/CD)", 
    keywords: ["CI/CD implementation", "automated testing pipelines", "deployment automation"] 
  }
];

const dir = path.join(__dirname, '../content/methodologies');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

methods.forEach(method => {
  const content = `---
title: "${method.title}"
description: "Ensure enterprise-grade reliability and rapid feature delivery with Xonit Space's rigorous ${method.title.toLowerCase()} processes."
keywords: ${JSON.stringify(method.keywords)}
faqs:
  - question: "How does this methodology improve my ROI?"
    answer: "By automating manual processes and breaking massive projects into trackable milestones, we drastically reduce the risk of critical failures and accelerate your time-to-market."
  - question: "Do we need to adopt your internal tools?"
    answer: "Not necessarily. While we have preferred tech stacks, our methodologies are tool-agnostic. We can integrate our processes directly into your existing Jira, GitHub, or AWS environments."
process:
  - step: "Audit & Assessment"
    description: "Evaluating your current infrastructure and identifying operational bottlenecks."
  - step: "Implementation & Automation"
    description: "Building the pipelines, setting up the boards, and automating the testing."
  - step: "Continuous Optimization"
    description: "Monitoring the new processes and refining them for maximum efficiency."
technologies: ["GitHub Actions", "Docker", "Kubernetes", "Jira"]
industries: ["Enterprise", "Fintech", "Healthcare"]
---

## Enterprise-Grade ${method.title}

Building great software isn't just about writing code; it's about *how* that code is written, tested, and deployed. In an enterprise environment, a lack of operational structure leads directly to massive technical debt and catastrophic deployment failures.

At Xonit Space, **${method.title}** isn't just a buzzword we put on our website. It is the fundamental operating system for how our engineering teams function.

### Predictability Over Heroics

Many agencies rely on "hero developers" pulling all-nighters to meet deadlines. This is unsustainable and dangerous for your business. 

We rely on rigorous methodology:
*   **Automated Quality Assurance:** Code isn't deployed unless it passes automated security and regression tests.
*   **Transparent Velocity:** You will always know exactly what is being built, who is building it, and when it will ship.
*   **Zero-Downtime Deployments:** Our infrastructure is designed to handle updates without taking your application offline.

### Built for Scale

Whether you need us to audit your existing processes or build a new pipeline from scratch, our senior architects will ensure your software delivery lifecycle is secure, scalable, and ruthlessly efficient.
`;

  fs.writeFileSync(path.join(dir, `${method.slug}.md`), content);
  console.log(`Created ${method.slug}.md`);
});
