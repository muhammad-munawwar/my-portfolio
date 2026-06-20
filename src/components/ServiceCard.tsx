'use client';

import React from 'react';
import { ShinyButton } from './ShinyButton'; // optional if needed for link

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: { text: string; icon: React.ReactNode }[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, icon, tags }) => {
  return (
    <div className="service-card group relative bg-[#0a0a0b] hover:bg-[#111113] transition-colors duration-500 overflow-hidden flex flex-col p-10 md:p-8 2xl:p-10 min-h-[380px] border border-[var(--border)] rounded-md">
      {/* Top Glow on Hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00d2ff]/80 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] z-20" />
      {/* Background Number */}
      <div className="absolute right-10 top-10 text-[6rem] md:text-[8rem] leading-none font-sans font-black pointer-events-none select-none text-transparent transition-all duration-500 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.1)] group-hover:[-webkit-text-stroke:1.5px_#00d2ff]">
        {id}
      </div>

      {/* Icon Box */}
      <div className="relative mb-10 w-12 h-12 flex items-center justify-center border border-[#00d2ff]/30 bg-[#00d2ff]/5 group-hover:-rotate-5 group-hover:scale-[1.05] group-hover:border-[#00d2ff]/60 group-hover:bg-[#00d2ff]/10 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]">
        <div className="relative z-10 text-[#00d2ff]">{icon}</div>
      </div>

      {/* Title with Hover Animation */}
      <h3 className="font-[family:var(--font-display)] text-3xl md:text-4xl font-bold mb-4 relative overflow-hidden flex h-[1.2em]">
        <span className="flex">
          {title.split('').map((char, i) => (
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
          {title.split('').map((char, i) => (
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
      <p className="text-[var(--text-soft)] text-[0.95rem] leading-[1.6] max-w-[85%] mb-10">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 md:gap-1.5 text-[0.65rem] md:text-[0.7rem] group/tag font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[#00d2ff]/20 p-1.5 hover:border-[#00d2ff]/40 hover:bg-[#00d2ff]/10 bg-[#00d2ff]/5 transition-all duration-300"
          >
            <div className="text-[#00d2ff] p-1 bg-[#00d2ff]/10 flex items-center justify-center opacity-90 transition-transform duration-300 group-hover/tag:-rotate-6 group-hover/tag:scale-110">
              {tag.icon}
            </div>
            {tag.text}
          </span>
        ))}
      </div>
    </div>
  );
};
