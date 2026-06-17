const fs = require('fs');
const path = require('path');

const localServices = [
  { 
    slug: "new-york-ai-development", 
    title: "AI Development Company in New York", 
    location: "New York",
    service: "AI Development",
    keywords: ["AI development company NYC", "New York artificial intelligence agency", "hire AI developers New York"] 
  },
  { 
    slug: "london-fintech-software", 
    title: "Fintech Software Agency in London", 
    location: "London",
    service: "Fintech Software",
    keywords: ["London fintech developers", "financial software agency UK", "build fintech app London"] 
  },
  { 
    slug: "san-francisco-saas-development", 
    title: "SaaS Development in San Francisco", 
    location: "San Francisco",
    service: "SaaS Development",
    keywords: ["San Francisco SaaS developers", "Bay Area software agency", "SaaS development company SF"] 
  },
  { 
    slug: "dubai-enterprise-software", 
    title: "Enterprise Software Solutions in Dubai", 
    location: "Dubai",
    service: "Enterprise Software",
    keywords: ["Dubai enterprise software company", "UAE software agency", "custom software development Dubai"] 
  },
  { 
    slug: "singapore-blockchain-development", 
    title: "Blockchain Developers in Singapore", 
    location: "Singapore",
    service: "Blockchain Development",
    keywords: ["Singapore blockchain agency", "hire web3 developers Singapore", "crypto software development SG"] 
  },
  { 
    slug: "austin-startup-mvp", 
    title: "Startup MVP Builders in Austin", 
    location: "Austin",
    service: "Startup MVP",
    keywords: ["Austin MVP development", "Texas startup software agency", "build MVP Austin TX"] 
  }
];

const dir = path.join(__dirname, '../content/local-services');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

localServices.forEach(ls => {
  const content = `---
title: "${ls.title}"
description: "Looking for top-tier ${ls.service.toLowerCase()} in ${ls.location}? Xonit Space delivers enterprise-grade software engineering."
keywords: ${JSON.stringify(ls.keywords)}
faqs:
  - question: "Do you have an office in ${ls.location}?"
    answer: "Xonit Space operates as a globally distributed, remote-first agency. This allows us to source the absolute top 1% of engineering talent worldwide, while delivering enterprise solutions to clients in ${ls.location} and beyond."
  - question: "How do you handle time zone differences?"
    answer: "We structure our agile pods to overlap with your core business hours in ${ls.location}, ensuring seamless daily standups and real-time communication via Slack or Teams."
process:
  - step: "Discovery & Architecture"
    description: "Aligning our technical strategy with your local business objectives."
  - step: "Agile Development Sprints"
    description: "Executing the roadmap with complete transparency and weekly deliverables."
  - step: "Deployment & Scaling"
    description: "Launching your product on highly available, secure infrastructure."
technologies: ["React", "Node.js", "Python", "AWS"]
industries: ["Enterprise", "SaaS", "Startups"]
---

## World-Class ${ls.service} for ${ls.location} Businesses

When searching for a technical partner, proximity used to be the only factor. Today, settling for a local agency just because they are down the street often means compromising on the technical expertise required for complex systems.

Xonit Space bridges that gap. We bring elite, globally-sourced engineering talent directly to your business in **${ls.location}**, specializing heavily in **${ls.service}**.

### Why Limit Your Talent Pool?

If you are building complex ${ls.service.toLowerCase()}, you need developers who have solved these exact architectural challenges at scale. 

*   **Global Expertise, Local Impact:** We have successfully delivered high-stakes projects for companies across the globe. We bring those battle-tested patterns to your project.
*   **Agile Communication:** Our project managers ensure that distance is never a barrier. You get the communication and responsiveness of an in-house team, with the execution power of a specialized agency.
*   **Predictable Delivery:** We don't guess at timelines. We use rigorous data-driven agile methodologies to guarantee delivery dates and budgets.

### Elevate Your Engineering

Stop settling for average code. Whether you are a startup looking to disrupt the market or an enterprise needing to scale securely, Xonit Space provides the technical firepower you need to dominate in ${ls.location}.
`;

  fs.writeFileSync(path.join(dir, `${ls.slug}.md`), content);
  console.log(`Created ${ls.slug}.md`);
});
