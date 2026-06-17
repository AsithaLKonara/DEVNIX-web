const fs = require('fs');
const path = require('path');

const casestudies = [
  { 
    slug: "healthcare-ai-automation", 
    title: "Automating Patient Triage with Specialized LLMs", 
    client: "National Health Network",
    metrics: [
      { label: "Time Saved", value: "14,000 hrs/yr" },
      { label: "Accuracy", value: "99.2%" },
      { label: "Deployment", value: "6 Weeks" },
      { label: "ROI", value: "450%" }
    ],
    problem: "The client was overwhelmed with tier-1 patient inquiries across 14 hospitals. Human triage staff spent an average of 8 minutes categorizing and routing simple questions, leading to a massive backlog during flu season.",
    solution: "We designed a secure, HIPAA-compliant RAG architecture using a specialized healthcare LLM. The system ingests incoming queries, cross-references internal medical triage protocols, and routes the patient immediately to the correct department or provides self-serve answers.",
    testimonial: {
      quote: "Xonit Space didn't just build a chatbot; they architected a deeply integrated AI agent that genuinely understands our medical routing logic. The impact on our response times has been staggering.",
      author: "Dr. Sarah Jenkins",
      role: "Chief Medical Information Officer"
    },
    technologies: ["LlamaIndex", "Pinecone", "Next.js", "Python Fast API", "AWS HIPAA Enclave"]
  },
  { 
    slug: "fintech-saas-migration", 
    title: "Scaling a Fintech MVP to an Enterprise SaaS Platform", 
    client: "PayFlow Analytics",
    metrics: [
      { label: "Latency", value: "< 45ms" },
      { label: "Uptime", value: "99.99%" },
      { label: "Users Scaled", value: "500k+" },
      { label: "Cloud Costs", value: "-40%" }
    ],
    problem: "A fast-growing fintech startup had built their MVP on a monolithic architecture that began failing under the load of 50,000 active users. Database deadlocks and server crashes were causing significant customer churn.",
    solution: "We executed a zero-downtime migration to a modern microservices architecture on AWS. We implemented horizontal scaling with Kubernetes, migrated to PostgreSQL with heavy read-replicas, and introduced Redis caching to drop latency by 80%.",
    testimonial: {
      quote: "The engineering team at Xonit Space is world-class. They didn't just fix our scaling issues; they completely modernized our infrastructure while we continued to operate seamlessly.",
      author: "Marcus Vance",
      role: "CTO, PayFlow Analytics"
    },
    technologies: ["Node.js", "React", "Kubernetes", "PostgreSQL", "Redis", "AWS"]
  },
  { 
    slug: "enterprise-legacy-migration", 
    title: "Digital Transformation for a 40-Year-Old Logistics Giant", 
    client: "Global Freight Corp",
    metrics: [
      { label: "Data Migrated", value: "14 TB" },
      { label: "Systems Replaced", value: "8" },
      { label: "Efficiency Gain", value: "65%" },
      { label: "User Adoption", value: "98%" }
    ],
    problem: "Global Freight Corp was running critical routing and fleet management operations on 8 disparate, on-premise legacy systems built in the 1990s. Data silos were causing severe inefficiencies and costing millions in lost time.",
    solution: "We built a unified, cloud-native ERP dashboard using Next.js and NestJS. We built custom API bridges to slowly siphon data from the legacy mainframes into a modern PostgreSQL cluster, allowing staff to transition to the new UI without disrupting daily logistics.",
    testimonial: {
      quote: "Migrating decades of legacy data terrified us. Xonit Space managed the entire process with surgical precision. The new unified dashboard has completely transformed how our operators work.",
      author: "Elena Rodriguez",
      role: "VP of Operations"
    },
    technologies: ["Next.js", "NestJS", "TypeScript", "AWS RDS", "Docker"]
  }
];

const dir = path.join(__dirname, '../content/case-studies');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

casestudies.forEach(cs => {
  const content = `---
title: "${cs.title}"
description: "Discover how Xonit Space helped ${cs.client} overcome critical technical challenges and scale their operations."
keywords: ["${cs.slug.replace(/-/g, ' ')}", "case study", "software development case study"]
client: "${cs.client}"
metrics: ${JSON.stringify(cs.metrics)}
problem: "${cs.problem}"
solution: "${cs.solution}"
technologies: ${JSON.stringify(cs.technologies)}
testimonial:
  quote: "${cs.testimonial.quote}"
  author: "${cs.testimonial.author}"
  role: "${cs.testimonial.role}"
---

## Technical Deep Dive

While the high-level metrics show the business impact, the true success of this project lies in the engineering decisions made under the hood.

### Architectural Decisions

We faced several constraints during the initial discovery phase:
1.  **Strict Compliance Requirements:** Data could not leave specific geographic zones.
2.  **Legacy Integration:** The new system had to communicate with SOAP APIs built 15 years ago.
3.  **High Availability:** The client required a 99.99% uptime guarantee SLA.

To address these, our engineering team opted for a modular approach...
`;

  fs.writeFileSync(path.join(dir, `${cs.slug}.md`), content);
  console.log(`Created ${cs.slug}.md`);
});
