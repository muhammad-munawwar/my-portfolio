'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Technology } from '@/constants/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  technologies: Technology[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ technologies }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for the left column
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });

      tl.fromTo('.about-tag',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo('.about-title-line',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out' },
          '-=0.3'
        )
        .fromTo('.about-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
          '-=0.4'
        )
        .fromTo('.about-tech',
          { opacity: 0, scale: 0.9, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.5)' },
          '-=0.3'
        );

      // Animation for the right column (Image)
      gsap.fromTo(rightColRef.current,
        { opacity: 0, scale: 0.85, x: 30 },
        {
          opacity: 1, scale: 1, x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
          onComplete: () => {
            // Add continuous floating animation after it appears
            gsap.to(rightColRef.current, {
              y: -15,
              duration: 3,
              ease: 'power1.inOut',
              yoyo: true,
              repeat: -1
            });
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameTitle = "Muhammad Munawwar.";

  return (
    <section ref={sectionRef} id="about" className="border-b border-[var(--border)] py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Subtle Background Glow behind the image section */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="custom-container relative z-10">
        <div ref={leftColRef}>
          <div className="overflow-hidden inline-block mb-2 pb-1">
            <span className="about-tag mono-tag block">[02] PROFILE / MIND BEHIND</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 lg:gap-20 mt-4 sm:mt-8 items-center">
          {/* Left Column: Text & Technologies */}
          <div className="flex flex-col" ref={leftColRef}>
            <div className="overflow-hidden pb-2 mb-1 md:mb-2 2xl:mb-3 group cursor-default">
              {/* Name with Hover Animation (Single Line) */}
              <h2 className="about-title-line font-[family:var(--font-display)] text-[clamp(1.8rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] leading-[1.1] relative overflow-hidden flex h-[1.2em]">
                {/* White Title */}
                <span className="flex">
                  {nameTitle.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[110%] text-[var(--text)] whitespace-pre"
                      style={{ transitionDelay: `${charIndex * 0.02}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                {/* Blue Title (Animates from bottom) */}
                <span className="absolute left-0 top-0 flex">
                  {nameTitle.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 text-[var(--primary)] whitespace-pre"
                      style={{ transitionDelay: `${charIndex * 0.02}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </h2>
            </div>

            <p className="about-desc text-[1.1rem] sm:text-[1.2rem] 2xl:text-[1.5rem] mt-1 text-(--primary)">
              Software Engineer & MERN Stack Developer
            </p>

            <div className="mt-6 sm:mt-8 text-(--text-soft) leading-[1.7] space-y-4 sm:space-y-6 text-[0.95rem] sm:text-[1.05rem]">
              <p className="about-desc">
                With over <strong>1.5 years of professional on-site experience</strong> and ongoing remote work, I specialize in building robust, scalable software solutions. In my current remote role, I manage a production-level Sales CRM, oversee the company's digital portfolio, and am laying the groundwork for an upcoming HRM application.
              </p>
              <p className="about-desc">
                As an independent developer, I am actively building a comprehensive <strong>Desktop HRM software</strong> for a large-scale textile factory, which is nearing completion. Previously, I successfully delivered a complete <strong>Billing System</strong> for a Network Provider company.
              </p>
              <p className="about-desc">
                My technical expertise spans building interactive web applications, high-performance cross-platform mobile apps, and robust desktop systems. I leverage my strong command over <strong>React.js, Next.js, Angular.js, React Native, and Electron.js</strong> to deliver seamless digital experiences.
              </p>
            </div>

            <div className="mt-8 sm:mt-12">
              <h3 className="about-desc font-[family:var(--font-display)] text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-[var(--text)]">
                Technological Stack
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="about-tech flex items-center gap-1 md:gap-1.5 text-[0.65rem] md:text-[0.7rem] group/tag font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[#00d2ff]/20 p-1.5 hover:border-[#00d2ff]/40 hover:bg-[#00d2ff]/10 bg-[#00d2ff]/5 transition-all duration-300"
                  >
                    <div className="text-[#00d2ff] p-1 bg-[#00d2ff]/10 flex items-center justify-center opacity-90 transition-transform duration-300 group-hover/tag:-rotate-6 group-hover/tag:scale-110">
                      {tech.icon}
                    </div>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div ref={rightColRef} className="relative w-full h-[320px] sm:h-[450px] lg:h-[700px] flex items-center justify-center mt-4 lg:mt-0">
            {/* Image Container with floating effect */}
            <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[500px] aspect-[3/4] drop-shadow-[0_0_40px_rgba(139,92,246,0.15)]">
              <Image
                src="/assets/about-profile.png"
                alt="Muhammad Munawwar Profile"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
