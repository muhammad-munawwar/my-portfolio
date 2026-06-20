<div align="center">

# ✦ Muhammad Munawwar — Developer Portfolio

**A premium, dark-themed developer portfolio built with Next.js, GSAP, Three.js, and Tailwind CSS.**

[Live Preview →](#) · [Report Bug →](https://github.com/muhammad-munawwar/my-portfolio/issues) · [Request Feature →](https://github.com/muhammad-munawwar/my-portfolio/issues)

</div>

---

## ⚡ About

This is the personal portfolio of **Muhammad Munawwar** — a Full Stack Developer specializing in building custom web applications, cross-platform mobile apps, and robust desktop systems using JavaScript technologies.

The portfolio is designed to make a lasting first impression with premium dark aesthetics, physics-based animations, and an interactive 3D badge, while remaining fully responsive and performant.

---

## 🧩 Key Features

| Feature | Description |
|---|---|
| **3D Interactive Badge** | A draggable, physics-based 3D card built with React Three Fiber and Rapier, rendered on the hero section. |
| **GSAP Scroll Animations** | Every section uses GSAP `ScrollTrigger` for smooth, staggered reveal animations that play and reverse on scroll. |
| **Sticky Experience Cards** | Experience timeline uses a stacked, sticky card layout with scale and opacity transitions for a unique scrolling experience. |
| **Animated Service Cards** | Character-by-character hover animations on service titles with glowing accent lines. |
| **Project Inquiry Modal** | A full-screen modal (via React Portal) with physics-based open/close animations — the modal drops in with a random tilt and falls out like a physical object on close. |
| **Dual-Mode Contact Forms** | Forms support both **Nodemailer** (API route) and **Netlify Forms**, toggled by an environment variable. |
| **Dark Mode Email Templates** | Handlebars `.hbs` email templates styled to match the portfolio's dark theme for both contact and inquiry emails. |
| **Animated Border Buttons** | Custom `ShinyButton` component with a spinning conic-gradient border animation. |
| **Responsive Design** | Fully responsive across mobile, tablet, and desktop with fluid typography using `clamp()`. |
| **Spam Protection** | Honeypot field integration for bot filtering on Netlify Forms submissions. |

---

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)

### Animation & 3D
- **[GSAP](https://gsap.com/)** — ScrollTrigger-based section animations, staggered reveals
- **[React Three Fiber](https://r3f.docs.pmnd.rs/)** — 3D scene rendering for the interactive badge
- **[React Three Rapier](https://github.com/pmndrs/react-three-rapier)** — Physics engine for the 3D badge
- **[Framer Motion](https://www.framer.com/motion/)** — Component transitions
- **[@use-gesture/react](https://use-gesture.netlify.app/)** — Drag gesture handling for the 3D badge

### Backend & Email
- **[Nodemailer](https://nodemailer.com/)** — Email delivery via Gmail SMTP
- **[Handlebars](https://handlebarsjs.com/)** — HTML email templating engine
- **Netlify Forms** — Zero-backend form submission alternative

### UI Libraries
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Three.js](https://threejs.org/)** — 3D graphics engine
- **[MeshLine](https://github.com/pmndrs/meshline)** — 3D line rendering

---

## 📁 Project Structure

```
my-portfolio/
├── public/                    # Static assets (images, fonts, models)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts   # Nodemailer API endpoint
│   │   ├── globals.css        # Global styles & CSS variables
│   │   ├── layout.tsx         # Root layout with fonts
│   │   └── page.tsx           # Main page (all sections)
│   ├── components/
│   │   ├── Navbar.tsx         # Fixed navigation bar
│   │   ├── HeroSection.tsx    # Hero with 3D badge & metrics
│   │   ├── Badge.tsx          # Interactive 3D badge (R3F)
│   │   ├── AboutSection.tsx   # About me & tech stack
│   │   ├── ServicesSection.tsx # Services grid with animations
│   │   ├── ServiceCard.tsx    # Individual service card
│   │   ├── ExperienceSection.tsx # Sticky card experience timeline
│   │   ├── ProjectsSection.tsx # Projects grid
│   │   ├── ProjectCard.tsx    # Project card with inquiry button
│   │   ├── ProjectInquiryModal.tsx # Physics-based inquiry modal
│   │   ├── ContactSection.tsx # Contact form & info
│   │   ├── ShinyButton.tsx    # Animated border button
│   │   ├── Input.tsx          # Reusable form input
│   │   ├── Textarea.tsx       # Reusable textarea
│   │   ├── Logo.tsx           # Site logo
│   │   └── SocialButtons.tsx  # Social media links
│   ├── constants/
│   │   └── portfolioData.tsx  # All portfolio content data
│   └── templates/
│       ├── contact.hbs        # Contact email template (dark)
│       └── inquiry.hbs        # Inquiry email template (dark)
├── .env.local                 # Environment variables (gitignored)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/muhammad-munawwar/my-portfolio.git

# Navigate to the project
cd my-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Form Submission Mode
# "true"  = Nodemailer (API route with Gmail SMTP)
# "false" = Netlify Forms (zero-backend)
NEXT_PUBLIC_USE_NODEMAILER="true"

# Nodemailer Configuration (required when USE_NODEMAILER = "true")
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"
EMAIL_TO="your-receiving-email@gmail.com"
```

> **Note:** `EMAIL_PASS` must be a [Gmail App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password. You need to have 2-Step Verification enabled on your Google account to generate one.

---

## 📧 Dual-Mode Form System

This portfolio supports two form submission backends, controlled by a single environment variable:

### Mode 1: Nodemailer (`NEXT_PUBLIC_USE_NODEMAILER="true"`)
- Sends emails through the `/api/contact` Next.js API route.
- Uses Gmail SMTP via Nodemailer.
- Renders beautiful dark-themed HTML emails using Handlebars templates.
- Works on any hosting platform (Netlify, Vercel, etc.).

### Mode 2: Netlify Forms (`NEXT_PUBLIC_USE_NODEMAILER="false"`)
- Submits forms directly to Netlify's built-in form handling.
- Zero backend code required.
- 100 free submissions/month on Netlify's free tier.
- Includes honeypot spam protection.
- Email notifications configured through the Netlify dashboard.

---

## 📋 Projects Showcased

| # | Project | Description |
|---|---------|-------------|
| 01 | **TechCiaga** | Large-scale animated company portfolio with 30+ pages and GSAP animations |
| 02 | **TestCiaga** | AI-powered QA testing platform with API test generation and UI comparison |
| 03 | **ContentCiaga** | AI content generation platform for text, images, and social media posts |
| 04 | **RecCiaga** | AI-driven recruitment & HR platform with CV parsing and voice interviews |
| 05 | **Shifara** | AI healthcare platform with pharmacy, lab tests, chat, and video consultations |
| 06 | **Billing Technocity Networks** | ERP & Billing Management System for network service providers |
| 07 | **Unicorn Sales Management** | Sales ERP & CRM for electrical manufacturing companies |
| 08 | **Icevia Ice Cream** | Fully animated static storefront with GSAP category-wise product listings |
| 09 | **HRM Electron** | Electron-based desktop HR management application |
| 10 | **Unicorn Portfolio** | Animated portfolio website for Unicorn Electric |

---

## 🌐 Deployment

### Netlify (Recommended)

```bash
# Build the project
npm run build

# Deploy via Netlify CLI or connect your GitHub repo
# on https://app.netlify.com
```

When deploying on Netlify:
1. Set the build command to `npm run build`
2. Set the publish directory to `.next`
3. Add your environment variables in **Site Settings → Environment Variables**
4. If using Netlify Forms, enable form detection in **Forms → Settings**

---

## 📞 Contact

**Muhammad Munawwar**
- 📧 Email: [muhammadmunawwar124@gmail.com](mailto:muhammadmunawwar124@gmail.com)
- 📱 Phone: +92 314 1304783
- 📍 Location: Karachi, Pakistan

---

<div align="center">

**Built with ❤️ by Muhammad Munawwar**

© 2026 Muhammad Munawwar. All rights reserved.

</div>
