const fs = require('fs');
const path = require('path');

const locations = [
  { slug: "bangalore", title: "Software Development Company in Bangalore", city: "Bangalore", region: "India" },
  { slug: "chennai", title: "Software Development Company in Chennai", city: "Chennai", region: "India" },
  { slug: "hyderabad", title: "Software Development Company in Hyderabad", city: "Hyderabad", region: "India" },
  { slug: "mumbai", title: "Software Development Company in Mumbai", city: "Mumbai", region: "India" },
  { slug: "delhi", title: "Software Development Company in Delhi", city: "Delhi", region: "India" },
  { slug: "pune", title: "Software Development Company in Pune", city: "Pune", region: "India" },
  { slug: "kochi", title: "Software Development Company in Kochi", city: "Kochi", region: "India" },
  { slug: "coimbatore", title: "Software Development Company in Coimbatore", city: "Coimbatore", region: "India" },
  { slug: "singapore", title: "Software Development Company in Singapore", city: "Singapore", region: "Asia" },
  { slug: "dubai", title: "Software Development Company in Dubai", city: "Dubai", region: "UAE" },
  { slug: "london", title: "Software Development Company in London", city: "London", region: "UK" },
  { slug: "usa", title: "Software Development Company in USA", city: "USA", region: "North America" },
  { slug: "canada", title: "Software Development Company in Canada", city: "Canada", region: "North America" },
  { slug: "australia", title: "Software Development Company in Australia", city: "Australia", region: "Oceania" }
];

const dir = path.join(__dirname, '../content/locations');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

locations.forEach(loc => {
  const content = `---
title: "${loc.title}"
description: "Xonit Space is a premier ${loc.title.toLowerCase()} delivering custom software, SaaS products, and AI integrations."
keywords: ["software development ${loc.city}", "app developers ${loc.city}", "AI company ${loc.city}"]
faqs:
  - question: "Do you serve clients in ${loc.city}?"
    answer: "Yes, Xonit Space partners with enterprises and startups in ${loc.city} to deliver world-class software development services remotely and via distributed teams."
  - question: "How do we communicate across time zones?"
    answer: "Our project management and delivery processes are highly optimized for asynchronous work, ensuring seamless communication regardless of your location."
process:
  - step: "Virtual Discovery"
    description: "Aligning on goals via remote workshops."
  - step: "Agile Development"
    description: "Transparent sprint deliveries every two weeks."
  - step: "Global Launch"
    description: "Deploying your product on scalable cloud infrastructure."
technologies: ["Next.js", "React Native", "Python AI", "AWS"]
industries: ["Enterprise", "SaaS", "Startups in ${loc.city}"]
---

## Empowering Businesses in ${loc.city}

The tech ecosystem in **${loc.city}** is moving faster than ever. To stay competitive, companies need robust, scalable software that can handle rapid growth and integrate seamlessly with modern AI workflows.

At Xonit Space, we serve clients across ${loc.region} and globally, providing elite software engineering services. We act as your extended engineering team, bringing deep expertise in:

*   **Custom Software Development:** Modern web and mobile applications built for scale.
*   **SaaS Product Engineering:** From MVP to multi-tenant enterprise architectures.
*   **AI Integration:** Building intelligent agents and automating workflows using the latest LLMs.

### A Global Team with Local Understanding

While our engineering talent is distributed globally to ensure the highest quality at competitive rates, our delivery methodology ensures that we operate in tight alignment with your business goals, timezone requirements, and compliance standards.
`;

  fs.writeFileSync(path.join(dir, `${loc.slug}.md`), content);
  console.log(`Created ${loc.slug}.md`);
});
