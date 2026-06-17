# Xonit Space Frontend

<p align="center">
  <img src="/public/icon.png" width="120" alt="Xonit Space Logo" />
</p>

Official frontend repository for Xonit Space, built with a heavy emphasis on performance, programmatic SEO, and enterprise-grade Next.js architecture.

**Live URL:** [https://xonitspace.com](https://xonitspace.com)  
**Status:** Production  
**Version:** 1.0.0

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Goals](#project-goals)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Architecture](#project-architecture)
- [Routing](#routing)
- [Content System](#content-system)
- [SEO Architecture](#seo-architecture)
- [Programmatic SEO](#programmatic-seo)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Project Overview

This repository contains the Next.js frontend for Xonit Space. It acts both as the company's marketing website and a massive programmatic SEO engine designed to capture high-intent B2B software engineering queries across the globe.

## Project Goals

- **Performance:** Sub-second page loads leveraging Next.js App Router and static generation.
- **Lead Generation:** Act as a robust inbound marketing machine through 130+ programmatic landing pages.
- **Scalability:** Ensure the codebase is clean, modular, and easy for new engineers to understand and expand.

## Features

- **Dynamic Routing** via Next.js App Router
- **MDX Content System** for fast content delivery
- **130+ Programmatic SEO Landing Pages**
- **Dynamic Sitemap Generation**
- **Dark Mode by Default**
- **Image Optimization**
- **Schema.org Structured Data**
- **Automated Vercel Deployments**

## Tech Stack

**Frontend Framework:** Next.js (App Router)  
**UI Library:** React, TailwindCSS  
**Language:** TypeScript  
**Content Management:** MDX (Markdown)  
**Deployment:** Vercel  
**Database/ORM:** PostgreSQL, Prisma (for dashboard/chatbot)

## Folder Structure

```text
frontend/
├── app/                  # Next.js App Router routes (pages, layouts, sitemap)
├── components/           # Reusable React components (UI, SEO templates)
├── content/              # MDX markdown files organized by SEO category
├── lib/                  # Utility functions (content parser, prisma client)
├── public/               # Static assets (images, icons)
├── scripts/              # Node scripts for generating programmatic content
├── styles/               # Global CSS and Tailwind directives
├── package.json
└── tsconfig.json
```

## Installation

**Requirements:** Node.js (v18+), npm/pnpm, Git.

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the frontend directory
cd "Xonit Space/frontend"

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Environment Variables

Create a `.env` file in the root of the `frontend` directory.

```text
NEXT_PUBLIC_SITE_URL=https://xonitspace.com
DATABASE_URL=postgresql://user:password@host:port/database # Required for Prisma
```

*Never commit your `.env` file to version control.*

## Scripts

```bash
npm run dev       # Starts the development server on localhost:3000
npm run build     # Creates an optimized production build
npm run start     # Starts the production server
npm run lint      # Runs ESLint to catch code issues
```

## Project Architecture

The application strictly follows the Next.js App Router (`app/` directory) paradigm. The architecture is split into three main layers:
1. **Routing Layer:** Dynamic routes (e.g., `app/[location]/[service]/page.tsx`).
2. **Data Layer:** The `lib/content.ts` utility parses MDX files from the `content/` directory.
3. **Presentation Layer:** The `components/seo/ServicePageTemplate.tsx` dynamically renders the parsed content.

## Routing

Key routes include:
- `/` - Home
- `/about` - About Us
- `/services/[category]` - Main services
- `/[location]/[service]` - Ultra-niche local SEO pages
- `/startup/[stage]` - Startup stage pages
- `/compliance/[framework]` - Security compliance hubs
- `/sitemap.xml` - Dynamically generated sitemap

## Content System

The site relies entirely on a flat-file Markdown/MDX CMS for maximum speed. 

Example frontmatter:
```yaml
---
title: "AI Development Company in New York"
description: "Looking for top-tier AI Development in New York? Xonit Space delivers enterprise-grade software engineering."
keywords: ["AI development company NYC", "New York artificial intelligence agency"]
---
```
Files are parsed via `gray-matter` in `lib/content.ts`.

## SEO Architecture

- **Metadata:** Every dynamic route utilizes Next.js `generateMetadata` to inject SEO-optimized titles and descriptions.
- **Sitemap:** A highly customized `app/sitemap.ts` dynamically crawls the `content/` directory and generates a fresh XML sitemap on build.
- **Internal Linking:** Automated within the programmatic pages to distribute page rank.

## Programmatic SEO

We have implemented a massive 20-phase programmatic SEO engine. Current inventory:

| Category | Status | Approx. Pages |
| :--- | :--- | :---: |
| Services | ✅ | 15+ |
| Industries | ✅ | 11 |
| Technologies | ✅ | 19 |
| Locations | ✅ | 14 |
| Solutions | ✅ | 8 |
| Roles | ✅ | 4 |
| Features | ✅ | 8 |
| Engagement | ✅ | 4 |
| Glossary | ✅ | 10 |
| Methodologies | ✅ | 4 |
| Partners | ✅ | 4 |
| Integrations | ✅ | 6 |
| Compliance | ✅ | 4 |
| Startups | ✅ | 4 |
| Local Services | ✅ | 6 |
| Case Studies | 🔄 | Growing |
| Blogs | 🔄 | Growing |

## Performance

The site achieves near-perfect Lighthouse scores by:
- Statically generating (SSG) all 130+ SEO pages at build time.
- Serving static assets and the built application via Vercel's global Edge Network.
- Utilizing Next.js Image Optimization for all media.

## Deployment

Pushes to the `main` branch automatically trigger a deployment on **Vercel**. 
The build process includes:
1. Installing dependencies.
2. Generating the Prisma client.
3. Type-checking.
4. Statically rendering all MDX pages.
5. Deploying to the Edge Network.

## Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`).
2. Commit your changes (`git commit -m 'feat: add amazing feature'`).
3. Push to the branch (`git push origin feature/your-feature`).
4. Open a Pull Request.
