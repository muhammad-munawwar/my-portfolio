import React from 'react';
import {
  FileCode, Brush, Code, Atom, Zap, Globe, Smartphone, Monitor,
  Layers, Palette, Server, ServerCog, Database, Box, GitBranch,
  PenTool, Container
} from 'lucide-react';

export interface Service {
  title: string;
  icon: string;
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  icon: React.ReactNode;
}

export interface Experience {
  title: string;
  company_name: string;
  date: string;
  points: string[];
}

export interface Project {
  id: string;
  name: string;
  short_description: string;
  tech_stack: string[];
  overview: string;
  image?: string; // optional thumbnail or preview image URL
  liveUrl?: string; // optional link to live demo
}

export const services: Service[] = [
  {
    title: "Javascript Developer",
    icon: "⚡",
  },
  {
    title: "Web Developer",
    icon: "🌐",
  },
  {
    title: "React Native Developer",
    icon: "📱",
  },
  {
    title: "Backend Developer",
    icon: "🛡️",
  },
];

const iconProps = { strokeWidth: 1.5, className: "w-3.5 h-3.5" };

export const technologies: Technology[] = [
  { name: "HTML 5", category: "frontend", icon: <FileCode {...iconProps} /> },
  { name: "CSS 3", category: "frontend", icon: <Brush {...iconProps} /> },
  { name: "JavaScript", category: "frontend", icon: <Code {...iconProps} /> },
  { name: "TypeScript", category: "frontend", icon: <Code {...iconProps} /> },
  { name: "React JS", category: "frontend", icon: <Atom {...iconProps} /> },
  { name: "Next JS", category: "frontend", icon: <Zap {...iconProps} /> },
  { name: "Angular JS", category: "frontend", icon: <Globe {...iconProps} /> },
  { name: "React Native", category: "frontend", icon: <Smartphone {...iconProps} /> },
  { name: "Electron JS", category: "frontend", icon: <Monitor {...iconProps} /> },
  { name: "Redux Toolkit", category: "frontend", icon: <Layers {...iconProps} /> },
  { name: "Tailwind CSS", category: "frontend", icon: <Palette {...iconProps} /> },
  { name: "Node JS", category: "backend", icon: <Server {...iconProps} /> },
  { name: "Express JS", category: "backend", icon: <ServerCog {...iconProps} /> },
  { name: "MongoDB", category: "backend", icon: <Database {...iconProps} /> },
  { name: "Three JS", category: "frontend", icon: <Box {...iconProps} /> },
  { name: "Git", category: "tools", icon: <GitBranch {...iconProps} /> },
  { name: "Figma", category: "tools", icon: <PenTool {...iconProps} /> },
];

export const experiences: Experience[] = [
  {
    title: "Frontend Development Intern",
    company_name: "KDYS Lab",
    date: "Oct 2024 - Dec 2024",
    points: [
      "Contributed to frontend development using React.js and Next.js, focusing on API integration and UI feature enhancements.",
      "Adopted production-level development standards and gained hands-on experience with Redux Toolkit and scalable architectures.",
      "Worked closely with senior developers to understand best practices in code quality, version control, and deployment workflows."
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "KDYS Lab",
    date: "Dec 2024 - Feb 2026",
    points: [
      "Developed 7+ AI-powered web applications and production-ready Next.js portfolios with optimized performance and modern UI.",
      "Engineered scalable state management and real-time systems using Redux Toolkit, WebSockets, and WebRTC for chat and video.",
      "Integrated secure authentication (JWT/Cookies), role-based access, and streaming API responses for high-frequency dashboards.",
      "Built cross-platform mobile features using React Native and Expo for the company's mobile application.",
      "Collaborated with cross-functional teams to deliver stable, user-focused features in production-level environments."
    ],
  },
  {
    title: "Software Engineer (Remote)",
    company_name: "Unicorn Electric",
    date: "Feb 2026 - Present",
    points: [
      "Managing and maintaining the company's production-level Sales CRM application, ensuring stability and delivering new feature updates.",
      "Overseeing the company's digital portfolio website and handling ongoing improvements and content updates.",
      "Laying the groundwork for an upcoming HRM application to streamline internal workforce management.",
      "Working remotely with occasional on-site visits to coordinate with the team and align on project requirements."
    ],
  },
  {
    title: "Full Stack Developer (Freelance)",
    company_name: "TechnoCity Networks",
    date: "Oct 2024 - Present",
    points: [
      "End-to-end development of a state-of-the-art ERP and Billing Management System tailored for network service providers.",
      "Engineered core modules for automated invoicing, real-time financial snapshots, user lifecycle management, and payroll.",
      "Leveraged a dual-database architecture (MongoDB & MySQL) with automated daily backups and Socket.io for live updates.",
      "Currently managing ongoing maintenance, feature updates, and performance optimizations."
    ],
  },
];

export const projects: Project[] = [
  {
    id: "techciaga-portfolio",
    name: "TechCiaga",
    short_description: "Large scale animated company portfolio website featuring 30+ pages with smooth scrolling and interactive GSAP animations.",
    tech_stack: ["Next.js", "GSAP", "Modern UI Animations", "Tailwind CSS"],
    overview: "TechCiaga portfolio is a high end animated company website.",
  },
  {
    id: "testciaga",
    name: "TestCiaga",
    short_description: "AI powered QA testing platform generating API test cases and comparing UI designs with live screens.",
    tech_stack: ["React.js", "Redux Toolkit", "AI APIs", "Swagger Integration", "Tailwind CSS"],
    overview: "TestCiaga is an AI powered QA and testing platform.",
  },
  {
    id: "contentciaga",
    name: "ContentCiaga",
    short_description: "AI content generation platform generating text, images, and posts for social media with history tracking.",
    tech_stack: ["React.js", "Redux Toolkit", "AI APIs", "Tailwind CSS"],
    overview: "ContentCiaga is a lightweight AI content generation platform.",
  },
  {
    id: "recciaga",
    name: "RecCiaga",
    short_description: "AI driven recruitment and HR platform automating CV parsing, job matching, candidate scoring, and voice interviews.",
    tech_stack: ["React.js", "Redux Toolkit", "WebSockets", "AI APIs", "IMAP Integration", "Tailwind CSS"],
    overview: "RecCiaga is an AI powered HR and recruitment management system.",
  },
  {
    id: "shifara",
    name: "Shifara",
    short_description: "AI powered healthcare platform supporting pharmacy ordering, lab tests, appointments, real-time chat, and video consultations.",
    tech_stack: ["Next.js", "React.js", "Redux Toolkit", "WebSockets", "WebRTC", "Stripe", "GSAP", "Tailwind CSS"],
    overview: "Shifara is a full scale healthcare platform designed for patients, doctors, and administrators.",
  },
  {
    id: "tcne-billing",
    name: "Billing Technocity Networks",
    short_description: "State-of-the-art ERP and Billing Management System designed for large-scale network service providers.",
    tech_stack: ["React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "Redux Toolkit", "Socket.io", "Tailwind CSS"],
    overview: "A centralized hub for managing users, finances, sales, and employee payroll for ISP business operations.",
  },
  {
    id: "unicorn-sales",
    name: "Unicorn Sales Management",
    short_description: "Premium Sales ERP and CRM solution built for electrical manufacturing companies to manage production and sales pipelines.",
    tech_stack: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.io", "Redux Toolkit", "Framer Motion", "Tailwind CSS"],
    overview: "A comprehensive ERP & CRM solution designed to automate the sales workflow for industrial electrical manufacturing.",
  },
  {
    id: "icevia",
    name: "Icevia Ice Cream",
    short_description: "Fully animated static storefront featuring category-wise ice cream product listings.",
    tech_stack: ["Next.js", "GSAP", "Tailwind CSS"],
    overview: "Icevia is a modern storefront for an ice cream brand, heavily relying on GSAP to create smooth, interactive category filtering and product showcases.",
    image: "/assets/icevia-thumbnail.png",
    liveUrl: "https://demo-icevia.netlify.app/"
  },
  {
    id: "hrm-electron",
    name: "HRM Electron",
    short_description: "Electron‑based HR management desktop application for internal staff workflows.",
    tech_stack: ["Electron.js", "React.js", "SQLite", "Redux Toolkit", "MongoDB", "Next.js", "Tailwind CSS"],
    overview: "HRM Electron provides recruitment, attendance tracking, and payroll management in an offline‑first desktop app."
  },
  {
    id: "unicorn-portfolio",
    name: "Unicorn Portfolio",
    short_description: "Portfolio website for Unicorn Electric showcasing projects and services with GSAP animations.",
    tech_stack: ["Next.js", "GSAP", "Tailwind CSS"],
    overview: "A sleek, animated portfolio highlighting Unicorn Electric's offerings and recent work."
  }
];
