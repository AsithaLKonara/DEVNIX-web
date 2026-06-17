const fs = require('fs');
const path = require('path');

const industries = [
  { slug: "healthcare", title: "Healthcare Software Development", keywords: ["healthcare software", "medical software", "custom health tech"] },
  { slug: "fintech", title: "Fintech Software Development", keywords: ["financial software", "fintech solutions", "banking tech"] },
  { slug: "edtech", title: "EdTech Software Development", keywords: ["educational software", "LMS development", "EdTech solutions"] },
  { slug: "real-estate", title: "Real Estate Software Development", keywords: ["proptech", "real estate software", "property management tech"] },
  { slug: "logistics", title: "Logistics Software Development", keywords: ["supply chain software", "logistics tech", "fleet management software"] },
  { slug: "manufacturing", title: "Manufacturing Software Development", keywords: ["industry 4.0", "manufacturing software", "ERP development"] },
  { slug: "ecommerce", title: "Ecommerce Software Development", keywords: ["custom ecommerce", "B2B ecommerce software", "retail tech"] },
  { slug: "automotive", title: "Automotive Software Development", keywords: ["auto tech", "automotive software", "connected vehicles"] },
  { slug: "legal", title: "LegalTech Software Development", keywords: ["legal software", "law firm tech", "legal automation"] },
  { slug: "travel", title: "Travel & Hospitality Software", keywords: ["travel tech", "booking engine development", "hospitality software"] },
  { slug: "construction", title: "Construction Software Development", keywords: ["construction tech", "proptech", "project management software"] }
];

const dir = path.join(__dirname, '../content/industries');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

industries.forEach(industry => {
  const content = `---
title: "${industry.title}"
description: "Xonit Space delivers enterprise-grade ${industry.title.toLowerCase()} tailored to your specific regulatory and operational needs."
keywords: ${JSON.stringify(industry.keywords)}
faqs:
  - question: "Do you have experience in ${industry.title.split(' ')[0]}?"
    answer: "Yes, our engineering team has deep domain expertise in building secure and compliant solutions for the ${industry.title.split(' ')[0]} industry."
  - question: "How do you handle compliance and security?"
    answer: "We build all our software adhering strictly to global standards (SOC2, GDPR, HIPAA if applicable) to ensure maximum data protection."
process:
  - step: "Domain Discovery"
    description: "Deep dive into your industry-specific workflows and constraints."
  - step: "Architecture Design"
    description: "Designing a robust system that integrates with your legacy tools."
  - step: "Iterative Build"
    description: "Agile sprints with continuous stakeholder feedback."
technologies: ["React", "Node.js", "Python", "AWS", "Docker"]
industries: ["${industry.title.split(' ')[0]}"]
---

## Custom ${industry.title} Company

The ${industry.title.split(' ')[0]} industry is undergoing massive digital transformation. Off-the-shelf software rarely fits the highly specific operational and regulatory needs of modern enterprises. 

At Xonit Space, we build bespoke, highly secure **${industry.title.split(' ')[0]} software solutions** that scale. Whether you are modernizing legacy infrastructure, building a new SaaS product, or integrating AI to automate workflows, our engineers deliver production-ready systems.

### Built for Scale and Security

We understand the stakes. Security and compliance are not afterthoughts; they are baked into the core architecture from Day 1. Our solutions are deployed on enterprise-grade infrastructure and rigorously tested.

### Why Xonit Space?
*   **Domain Expertise**: We understand the unique challenges of your industry.
*   **AI-Ready Infrastructure**: We don't just build traditional software; we future-proof your tech stack to leverage Generative AI and advanced analytics.
*   **Agile Delivery**: Fast time-to-market without compromising on quality or security.
`;

  fs.writeFileSync(path.join(dir, `${industry.slug}.md`), content);
  console.log(`Created ${industry.slug}.md`);
});
