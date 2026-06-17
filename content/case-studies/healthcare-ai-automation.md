---
title: "Automating Patient Triage with Specialized LLMs"
description: "Discover how Xonit Space helped National Health Network overcome critical technical challenges and scale their operations."
keywords: ["healthcare ai automation", "case study", "software development case study"]
client: "National Health Network"
metrics: [{"label":"Time Saved","value":"14,000 hrs/yr"},{"label":"Accuracy","value":"99.2%"},{"label":"Deployment","value":"6 Weeks"},{"label":"ROI","value":"450%"}]
problem: "The client was overwhelmed with tier-1 patient inquiries across 14 hospitals. Human triage staff spent an average of 8 minutes categorizing and routing simple questions, leading to a massive backlog during flu season."
solution: "We designed a secure, HIPAA-compliant RAG architecture using a specialized healthcare LLM. The system ingests incoming queries, cross-references internal medical triage protocols, and routes the patient immediately to the correct department or provides self-serve answers."
technologies: ["LlamaIndex","Pinecone","Next.js","Python Fast API","AWS HIPAA Enclave"]
testimonial:
  quote: "Xonit Space didn't just build a chatbot; they architected a deeply integrated AI agent that genuinely understands our medical routing logic. The impact on our response times has been staggering."
  author: "Dr. Sarah Jenkins"
  role: "Chief Medical Information Officer"
---

## Technical Deep Dive

While the high-level metrics show the business impact, the true success of this project lies in the engineering decisions made under the hood.

### Architectural Decisions

We faced several constraints during the initial discovery phase:
1.  **Strict Compliance Requirements:** Data could not leave specific geographic zones.
2.  **Legacy Integration:** The new system had to communicate with SOAP APIs built 15 years ago.
3.  **High Availability:** The client required a 99.99% uptime guarantee SLA.

To address these, our engineering team opted for a modular approach...
