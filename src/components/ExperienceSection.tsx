'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience } from '@/constants/portfolioData';
import {
  Code, Monitor, Layers, Briefcase
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  experiences: Experience[];
}

const expVisuals = [
  {
    icon: <Code strokeWidth={0.8} className="w-16 h-16 sm:w-24 sm:h-24" />,
    keywords: ['Intern', 'React · Next.js', 'Learning'],
    color: '#00d2ff',
  },
  {
    icon: <Monitor strokeWidth={0.8} className="w-16 h-16 sm:w-24 sm:h-24" />,
    keywords: ['Frontend', 'AI Apps · React Native', 'Production'],
    color: '#A075FF',
  },
  {
    icon: <Layers strokeWidth={0.8} className="w-16 h-16 sm:w-24 sm:h-24" />,
    keywords: ['Remote · WFH', 'CRM · Portfolio', 'Maintenance'],
    color: '#00d2ff',
  },
  {
    icon: <Briefcase strokeWidth={0.8} className="w-16 h-16 sm:w-24 sm:h-24" />,
    keywords: ['Billing · ERP', 'Network ISP', 'Freelance'],
    color: '#A075FF',
  },
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSticky(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });
      tl.fromTo('.exp-tag',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' }
      ).fromTo('.exp-title-line',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out' },
        '-=0.3'
      );

      // Card stacking animations — progressive scale down and fade (only >= 1024px)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            const inner = card.querySelector('.exp-card-inner');

            // Calculate how much it should scale and fade based on its position from the end
            const cardsAfter = cards.length - 1 - i;
            const targetScale = 1 - (cardsAfter * 0.05);
            const targetOpacity = Math.max(0.15, 1 - (cardsAfter * 0.3));

            gsap.to(inner, {
              scale: targetScale,
              opacity: targetOpacity,
              scrollTrigger: {
                trigger: cards[i + 1], // Start animating when the NEXT card comes into view
                start: 'top 80%',
                endTrigger: cards[cards.length - 1], // Keep animating until the LAST card is sticky
                end: `top ${80 + (cards.length - 1) * 30}px`,
                scrub: true,
              },
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const total = experiences.length;

  return (
    <section ref={sectionRef} id="experience" className="border-b border-[var(--border)] relative pb-12 sm:pb-24">
      {/* Header */}
      <div ref={headerRef} className="pt-16 pb-10 sm:pt-24 sm:pb-16 px-4 sm:px-8 bg-[var(--bg)]">
        <div className="custom-container">
          <div className="overflow-hidden inline-block mb-2 pb-1">
            <span className="exp-tag mono-tag text-[var(--primary)] text-[0.75rem] sm:text-[0.8rem] tracking-widest font-semibold uppercase block">
              [04] EXPERIENCE / WORK HISTORY
            </span>
          </div>
          <h2 className="font-[family:var(--font-display)] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-bold mt-2 sm:mt-4 tracking-[-0.02em] leading-[1.1] text-[var(--text)]">
            <span className="overflow-hidden pb-1 sm:pb-2 block">
              <span className="exp-title-line block">From <span className="text-(--primary)">learning</span> to <span className="text-(--primary)">leading.</span></span>
            </span>
          </h2>
        </div>
      </div>

      {/* Stacking Cards */}
      <div className="relative px-4 sm:px-8">
        <div className="custom-container">
          {experiences.map((exp, index) => {
            const visual = expVisuals[index] || expVisuals[0];

            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="relative lg:sticky mb-6 sm:mb-10 last:mb-0"
                style={isSticky ? {
                  top: `${80 + index * 20}px`,
                  zIndex: 10 + index,
                } : undefined}
              >
                <div
                  className="exp-card-inner grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-xl border border-[var(--border)] origin-top"
                  style={{ background: '#0e0e10' }}
                >
                  {/* LEFT — Visual */}
                  <div
                    className="relative flex items-center justify-center min-h-[220px] sm:min-h-[300px] lg:min-h-[460px] overflow-hidden"
                    style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.04] pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(${visual.color} 1px, transparent 1px), linear-gradient(90deg, ${visual.color} 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                      }}
                    />

                    {/* Radial glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, ${visual.color}0c 0%, transparent 65%)`,
                      }}
                    />

                    {/* Decorative circles */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" viewBox="0 0 400 400">
                      <circle cx="200" cy="200" r="80" fill="none" stroke={visual.color} strokeWidth="0.5" strokeDasharray="4 4" />
                      <circle cx="200" cy="200" r="130" fill="none" stroke={visual.color} strokeWidth="0.5" strokeDasharray="2 6" />
                      <circle cx="200" cy="200" r="170" fill="none" stroke={visual.color} strokeWidth="0.5" strokeDasharray="1 8" />
                    </svg>

                    {/* Icon */}
                    <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 py-6 lg:py-0">
                      <div
                        className="p-6 sm:p-10 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${visual.color}12 0%, transparent 70%)`,
                          border: `1px solid ${visual.color}18`,
                          boxShadow: `0 0 80px ${visual.color}15, inset 0 0 40px ${visual.color}08`,
                          color: `${visual.color}50`,
                        }}
                      >
                        {visual.icon}
                      </div>

                      {/* Keywords */}
                      <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center px-4">
                        {visual.keywords.map((kw, ki) => (
                          <span
                            key={ki}
                            className="font-[family:var(--font-mono)] text-[0.55rem] sm:text-[0.6rem] tracking-[0.1em] sm:tracking-[0.15em] uppercase px-2.5 py-1 sm:px-3 sm:py-1.5"
                            style={{
                              color: `${visual.color}80`,
                              border: `1px solid ${visual.color}20`,
                              background: `${visual.color}08`,
                            }}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — Content */}
                  <div className="flex flex-col justify-center py-8 px-6 sm:py-12 sm:px-10 lg:px-14">
                    {/* Counter */}
                    <span
                      className="font-[family:var(--font-mono)] text-[0.75rem] sm:text-[0.8rem] tracking-widest mb-4 sm:mb-6"
                      style={{ color: visual.color }}
                    >
                      {String(index + 1).padStart(2, '0')}{' '}
                      <span className="text-[var(--text-faint)]">/</span>{' '}
                      <span className="text-[var(--text-faint)]">{String(total).padStart(2, '0')}</span>
                    </span>

                    {/* Title */}
                    <h3 className="font-[family:var(--font-display)] text-[clamp(1.4rem,3vw,2.8rem)] font-extrabold tracking-[-0.02em] leading-[1.15] text-[var(--text)] mb-3 sm:mb-4">
                      {exp.title}
                    </h3>

                    {/* Company & Date */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <span
                        className="font-[family:var(--font-mono)] text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.12em] px-2.5 py-1 sm:px-3 sm:py-1.5"
                        style={{
                          color: visual.color,
                          border: `1px solid ${visual.color}25`,
                          background: `${visual.color}0a`,
                        }}
                      >
                        {exp.company_name}
                      </span>
                      <span className="font-[family:var(--font-mono)] text-[0.65rem] sm:text-[0.7rem] text-[var(--text-muted)] tracking-wider">
                        {exp.date}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--text-soft)] text-sm sm:text-[0.95rem] leading-[1.7] mb-6 sm:mb-8 max-w-full lg:max-w-[90%]">
                      {exp.points[0]}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3">
                      {exp.points.slice(1).map((pt, pi) => {
                        const shortTag = pt.split(/[,.—]/)[0].trim().substring(0, 45).toUpperCase();
                        return (
                          <span
                            key={pi}
                            className="font-[family:var(--font-mono)] text-[0.55rem] sm:text-[0.6rem] tracking-[0.12em] sm:tracking-[0.15em] text-[var(--text-muted)] flex items-center gap-1.5 sm:gap-2"
                          >
                            <span
                              className="w-1 h-1 rounded-full flex-shrink-0"
                              style={{ background: visual.color }}
                            />
                            {shortTag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
