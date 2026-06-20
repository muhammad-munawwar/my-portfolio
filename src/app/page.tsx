'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { SocialButtons } from '@/components/SocialButtons';
import { services, technologies, experiences, projects } from '@/constants/portfolioData';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen relative">
        {/* HERO */}
        <HeroSection />

        {/* ABOUT */}
        <AboutSection technologies={technologies} />

        {/* SERVICES */}
        <ServicesSection services={services} />

        {/* EXPERIENCE */}
        <ExperienceSection experiences={experiences} />

        {/* PROJECTS */}
        <ProjectsSection projects={projects} />

        {/* CONTACT */}
        <ContactSection />
      </main>

      {/* FLOATING SOCIAL ACTIONS */}
      <SocialButtons />

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] py-12 px-8 bg-[#070708]">
        <div className="custom-container flex justify-between items-center flex-wrap gap-6">
          <p className="text-[var(--text-muted)] text-[0.9rem]">
            &copy; {new Date().getFullYear()} Muhammad Munawwar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[var(--text-soft)] no-underline text-[0.9rem]">Github</a>
            <a href="#" className="text-[var(--text-soft)] no-underline text-[0.9rem]">LinkedIn</a>
            <a href="https://wibify.agency/en" target="_blank" rel="noreferrer" className="text-[var(--text-soft)] no-underline text-[0.9rem]">Design Ins.</a>
          </div>
        </div>
      </footer>
    </>
  );
}
