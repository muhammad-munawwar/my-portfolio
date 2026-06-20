'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/constants/portfolioData';
import { ShinyButton } from './ShinyButton';
import { ProjectInquiryModal } from './ProjectInquiryModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, []);

  // Split title for hover animation (mirrors ServiceCard style)
  const titleChars = project.name.split('');

  return (
    <div
      ref={cardRef}
      className="service-card group relative bg-[#0a0a0b]/50 hover:bg-[#111113] transition-colors duration-500 overflow-hidden flex flex-col p-5 md:p-6 2xl:p-8 min-h-[340px] border border-[var(--border)] rounded-md"
    >
      {/* Top Glow on Hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00d2ff]/80 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] z-20" />

      {/* Background Number */}
      <div className="absolute right-5 md:right-6 2xl:right-6 top-2.5 md:top-3 2xl:top-4 text-[5rem] md:text-[6rem] leading-none font-sans font-black pointer-events-none select-none text-transparent transition-all duration-500 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.1)] group-hover:[-webkit-text-stroke:1.5px_#00d2ff]">
        {formattedIndex}
      </div>

      {/* Icon placeholder */}
      <div className="relative mb-8 w-12 h-12 flex items-center justify-center border border-[#00d2ff]/30 bg-[#00d2ff]/5 group-hover:-rotate-5 group-hover:scale-[1.05] group-hover:border-[#00d2ff]/60 group-hover:bg-[#00d2ff]/10 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00d2ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>

      {/* Title with Hover Animation */}
      <h3 className="font-[family:var(--font-display)] text-xl md:text-2xl 2xl:text-3xl font-bold mb-4 relative overflow-hidden flex h-[1.2em]">
        <span className="flex">
          {titleChars.map((char, i) => (
            <span
              key={i}
              className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[110%] text-[var(--text)]"
              style={{ transitionDelay: `${i * 0.02}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="absolute left-0 top-0 flex">
          {titleChars.map((char, i) => (
            <span
              key={i}
              className="block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 text-[#00d2ff]"
              style={{ transitionDelay: `${i * 0.02}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </h3>

      {/* Description */}
      <p className="text-[var(--text-soft)] text-[0.95rem] leading-[1.6] mb-6 flex-grow">
        {project.short_description}
      </p>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
        {project.tech_stack.slice(0, 4).map((tech, i) => (
          <span
            key={i}
            className="font-[family:var(--font-mono)] text-[0.65rem] md:text-[0.7rem] border border-[#00d2ff]/20 bg-[#00d2ff]/5 text-[var(--text-muted)] px-2 py-1 rounded transition-colors duration-300 group-hover/tag:border-[#00d2ff]/40 group-hover/tag:bg-[#00d2ff]/10"
          >
            {tech}
          </span>
        ))}
        {project.tech_stack.length > 4 && (
          <span className="font-[family:var(--font-mono)] text-[0.65rem] md:text-[0.7rem] text-[var(--primary)]">
            +{project.tech_stack.length - 4} more
          </span>
        )}
      </div>

      {/* CTA button */}
      <ShinyButton
        animatedBorder
        size='sm'
        className="mt-4 self-start"
        onClick={() => setIsModalOpen(true)}
      >
        Inquire About Project
      </ShinyButton>

      {/* Inquiry Modal */}
      {isModalOpen && (
        <ProjectInquiryModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
