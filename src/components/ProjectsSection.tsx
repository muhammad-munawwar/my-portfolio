'use client';

import React, { useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/constants/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Header Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });

      tl.fromTo('.projects-tag',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo('.projects-title-line',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out' },
          '-=0.3'
        );

      // Cards Animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-(--bg) border-b border-(--border) overflow-hidden py-16">
      {/* Animated Background Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] md:w-[120vw] max-w-[1500px] aspect-square opacity-[0.04] pointer-events-none z-0 flex items-center justify-center animate-[spin_120s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#00d2ff" strokeWidth="0.15">
          <circle cx="50" cy="50" r="15" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="25" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="35" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="45" strokeDasharray="8 4" />
          <circle cx="50" cy="50" r="55" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="65" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Subtle background glow for the header */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-(--primary-glow) blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="custom-container relative z-10 flex flex-col mx-auto">
        {/* Header section inside the container */}
        <div ref={headerRef} className="mb-14">
          <div className="overflow-hidden inline-block mb-2 pb-1">
            <span className="projects-tag mono-tag text-(--primary) text-[0.8rem] tracking-widest font-semibold uppercase block">
              [02] SELECTED WORK / 2024 — 2026
            </span>
          </div>
          <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] font-bold mt-4 tracking-[-0.02em] leading-[1.1] text-(--text) flex flex-col">
            <span className="overflow-hidden pb-2">
              <span className="projects-title-line block">What we&apos;ve <span className="text-(--primary)">built.</span></span>
            </span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 2xl:gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
