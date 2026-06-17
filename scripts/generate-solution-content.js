const fs = require('fs');
const path = require('path');

const solutions = [
  { slug: "ai-for-healthcare", title: "AI Solutions for Healthcare", keywords: ["AI in healthcare", "medical AI software", "healthcare automation"] },
  { slug: "ai-for-fintech", title: "AI Solutions for Fintech", keywords: ["fintech AI", "financial automation software", "banking AI"] },
  { slug: "enterprise-legacy-modernization", title: "Enterprise Legacy Modernization", keywords: ["legacy software modernization", "cloud migration", "monolith to microservices"] },
  { slug: "mvp-development-for-startups", title: "MVP Development for Startups", keywords: ["startup MVP development", "MVP agency", "build an MVP fast"] },
  { slug: "saas-product-engineering", title: "SaaS Product Engineering Solutions", keywords: ["SaaS development company", "multi-tenant architecture", "build SaaS platform"] },
  { slug: "cloud-migration-solutions", title: "Cloud Migration Solutions", keywords: ["AWS migration services", "cloud adoption strategy", "move to cloud"] },
  { slug: "dedicated-engineering-teams", title: "Dedicated Engineering Teams", keywords: ["staff augmentation", "hire dedicated developers", "managed software team"] },
  { slug: "workflow-automation-solutions", title: "Workflow Automation Solutions", keywords: ["business process automation", "enterprise workflow software", "custom automation tools"] }
];

const dir = path.join(__dirname, '../content/solutions');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

solutions.forEach(sol => {
  const content = `---
title: "${sol.title}"
description: "Xonit Space delivers custom ${sol.title.toLowerCase()} to accelerate your business growth and operational efficiency."
keywords: ${JSON.stringify(sol.keywords)}
faqs:
  - question: "How long does it take to implement this solution?"
    answer: "Depending on the complexity, our agile delivery cycles usually produce a deployable V1 within 8 to 12 weeks."
  - question: "Do you integrate with existing infrastructure?"
    answer: "Absolutely. We specialize in building custom API bridges and middleware to ensure our new solutions communicate seamlessly with your legacy databases."
process:
  - step: "Feasibility Assessment"
    description: "Analyzing your current architecture to map out the exact integration points."
  - step: "Core Engineering"
    description: "Developing the solution using modern, scalable frameworks."
  - step: "Deployment & Training"
    description: "Rolling out the system and ensuring your internal teams are fully trained."
technologies: ["Next.js", "Python Fast API", "AWS", "PostgreSQL"]
industries: ["Enterprise", "Mid-Market", "Scale-ups"]
---

## Strategic ${sol.title}

Technology should serve as a massive multiplier for your business operations. However, off-the-shelf software rarely addresses the nuanced complexities of growing organizations. 

At Xonit Space, we provide end-to-end **${sol.title}** tailored specifically to your unique operational bottlenecks and growth objectives.

### Engineering for Business Impact

We don't just write code; we solve business problems. Whether you need to process data faster, scale your user base without crashing, or automate hours of manual labor, our engineering squads are equipped to deliver.

*   **Scalable Architecture:** Built on enterprise-grade cloud infrastructure (AWS/GCP) to handle massive scale.
*   **Secure by Design:** Adhering to the strictest global data compliance standards.
*   **Seamless Integration:** Designed to work *with* your existing tools, not replace them unnecessarily.

### The Xonit Space Advantage

Partnering with us means gaining direct access to senior technical leadership. We act as your fractional engineering department, ensuring that every line of code written directly contributes to your bottom line.
`;

  fs.writeFileSync(path.join(dir, `${sol.slug}.md`), content);
  console.log(`Created ${sol.slug}.md`);
});
