# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 marketing website built from the Salient template (a Tailwind Plus commercial template). It uses React 19, TypeScript, and Tailwind CSS 4.x with the App Router architecture.

## Development Commands

```bash
# Install dependencies (use npm, not pnpm despite the presence of pnpm-lock.yaml)
npm install

# Run development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### App Router Structure
- Uses Next.js App Router with the `/src/app` directory
- Route groups: `(auth)` for login/register pages (uses SlimLayout)
- Main landing page at `src/app/page.tsx` composes marketing sections
- Root layout at `src/app/layout.tsx` sets up fonts (Inter, Lexend) and global styles

### Component Organization
All components are in `/src/components` with flat structure:
- **Layout components**: `Header`, `Footer`, `Container`, `SlimLayout`
- **Section components**: `Hero`, `PrimaryFeatures`, `SecondaryFeatures`, `CallToAction`, `Testimonials`, `Pricing`, `Faqs` (composed in main page)
- **UI primitives**: `Button`, `TextField`, `NavLink`, `Logo`
- Uses Headless UI for accessible interactive components (Popover in Header)

### Styling
- Tailwind CSS 4.x with custom configuration
- Global styles in `src/styles/tailwind.css`
- Prettier with `prettier-plugin-tailwindcss` for class sorting (configured in `prettier.config.js`)
- Uses `clsx` utility for conditional class names
- Custom fonts: Inter (body) and Lexend (headings) loaded via next/font/google

### TypeScript
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Target ES6

## Code Conventions

### Prettier Configuration
- Single quotes
- No semicolons
- Tailwind classes auto-sorted by Prettier plugin

### Component Patterns
- Server components by default
- Client components marked with `'use client'` directive (e.g., Header uses Headless UI)
- Metadata exported from pages for SEO
- Form components use Tailwind Forms plugin styling

## Assets
- Images in `src/images/` with subdirectories: `screenshots/`, `avatars/`, `logos/`
- Background images for sections (features, auth, call-to-action, faqs)
