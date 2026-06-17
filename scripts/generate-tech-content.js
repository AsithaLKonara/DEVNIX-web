const fs = require('fs');
const path = require('path');

const technologies = [
  { slug: "react", title: "React Development Services", category: "Frontend" },
  { slug: "nextjs", title: "Next.js Development Agency", category: "Frontend" },
  { slug: "vue", title: "Vue.js Development Services", category: "Frontend" },
  { slug: "angular", title: "Angular Development Services", category: "Frontend" },
  { slug: "nodejs", title: "Node.js Development Services", category: "Backend" },
  { slug: "python", title: "Python Development Services", category: "Backend & AI" },
  { slug: "fastapi", title: "FastAPI Development Services", category: "Backend & AI" },
  { slug: "nestjs", title: "NestJS Development Services", category: "Backend" },
  { slug: "laravel", title: "Laravel Development Services", category: "Backend" },
  { slug: "flutter", title: "Flutter App Development", category: "Mobile" },
  { slug: "react-native", title: "React Native App Development", category: "Mobile" },
  { slug: "swift", title: "iOS Swift Development", category: "Mobile" },
  { slug: "kotlin", title: "Android Kotlin Development", category: "Mobile" },
  { slug: "aws", title: "AWS Cloud Consulting & Setup", category: "Cloud & DevOps" },
  { slug: "docker", title: "Docker Containerization Services", category: "Cloud & DevOps" },
  { slug: "kubernetes", title: "Kubernetes Consulting Services", category: "Cloud & DevOps" },
  { slug: "mongodb", title: "MongoDB Database Development", category: "Database" },
  { slug: "postgresql", title: "PostgreSQL Database Development", category: "Database" },
  { slug: "redis", title: "Redis Caching Implementation", category: "Database" }
];

const dir = path.join(__dirname, '../content/tech');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

technologies.forEach(tech => {
  const content = `---
title: "${tech.title}"
description: "Hire elite ${tech.title.split(' ')[0]} developers at Xonit Space. We build high-performance, scalable ${tech.category.toLowerCase()} architectures."
keywords: ["${tech.slug} developers", "hire ${tech.slug} experts", "${tech.category.toLowerCase()} development company"]
faqs:
  - question: "Why choose ${tech.title.split(' ')[0]} for our project?"
    answer: "Our engineers evaluate your technical constraints, scaling needs, and team capabilities before recommending ${tech.title.split(' ')[0]}. It is widely regarded as one of the best choices for modern ${tech.category.toLowerCase()} development."
  - question: "Do you have certified engineers?"
    answer: "Yes, our team consists of senior engineers with deep production experience in deploying scalable systems using ${tech.title.split(' ')[0]}."
process:
  - step: "Architecture Audit"
    description: "Reviewing your current stack to ensure compatibility."
  - step: "Implementation"
    description: "Writing clean, modular, and testable code."
  - step: "Performance Tuning"
    description: "Optimizing the application for maximum speed and minimal resource usage."
technologies: ["${tech.title.split(' ')[0]}", "TypeScript", "CI/CD", "Testing Frameworks"]
industries: ["Enterprise", "SaaS", "Fintech", "Healthcare"]
---

## Expert ${tech.title}

In the world of **${tech.category}**, choosing the right technology stack can mean the difference between a project that scales effortlessly and one that is bogged down by technical debt. 

At Xonit Space, **${tech.title.split(' ')[0]}** is a core part of our engineering DNA. We have built and deployed highly complex enterprise systems utilizing its full capabilities.

### Why We Leverage ${tech.title.split(' ')[0]}

When evaluating frameworks and languages for our clients, we look for stability, performance, and ecosystem maturity. ${tech.title.split(' ')[0]} provides the tooling necessary to deliver secure, rapid releases without compromising on quality.

*   **High Performance:** Optimized for production workloads.
*   **Scalable Architecture:** Capable of handling massive traffic spikes.
*   **Security First:** Adheres to enterprise-grade security standards.

### Our Engineering Philosophy

We don't just write code; we architect systems. When you hire our ${tech.slug} development team, you get full-stack thinkers who understand how the frontend, backend, database, and cloud infrastructure all communicate.
`;

  fs.writeFileSync(path.join(dir, `${tech.slug}.md`), content);
  console.log(`Created ${tech.slug}.md`);
});
