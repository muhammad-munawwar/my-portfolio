'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShinyButton } from './ShinyButton';
import dynamic from 'next/dynamic';
import { useLoading } from '@/context/LoadingContext';

const Badge = dynamic(() => import('./Badge'), { ssr: false });

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const { isLoading } = useLoading();

  useEffect(() => {
    if (containerRef.current) {
      setEventSource(containerRef.current);
    }

    if (isLoading) return; // Wait until loaded before animating

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // GSAP staggered entrance animations
      tl.fromTo('.hero-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo('.hero-title-line',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo('.hero-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-buttons > *',
          { opacity: 0, scale: 0.9, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.3'
        )
        .fromTo('.hero-metric-item',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section
      ref={containerRef}
      className="min-h-dvh flex items-center py-20 sm:py-16 px-4 sm:px-8 border-b border-[var(--border)] relative bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(10, 10, 11, 0.9) 0%, rgba(10, 10, 11, 0.95) 100%), url('/hero-background.jpg')" }}
    >
      {/* Top Left Gradient Glow */}
      <div className="hero-glow" />

      <div className="custom-container grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 lg:gap-16 items-center">
        {/* Left Content Column */}
        <div className="z-10 text-left">
          <p className="hero-tag mono-tag mb-4 sm:mb-6 text-[0.8rem] sm:text-[0.9rem] text-[var(--text-soft)]">
            [01] SOFTWARE ENGINEER & DEVELOPER
          </p>

          <h1 className="font-[family:var(--font-display)] text-[clamp(2.8rem,5vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] mb-4 xl:mb-5 2xl:mb-6 text-[var(--text)] flex flex-col">
            <span className="overflow-hidden pb-1 sm:pb-2">
              <span className="hero-title-line block">I build <span className="text-(--primary)">digital</span></span>
            </span>
            <span className="overflow-hidden pb-1 sm:pb-2 -mt-1 sm:-mt-2">
              <span className="hero-title-line block"><span className="text-(--primary)">products</span> as a Full</span>
            </span>
            <span className="overflow-hidden pb-1 sm:pb-2 -mt-1 sm:-mt-2">
              <span className="hero-title-line block">Stack Developer.</span>
            </span>
          </h1>

          <p className="hero-desc text-[clamp(0.95rem,1.5vw,1.1rem)] text-(--text-soft) max-w-[550px] leading-[1.6] mb-8 sm:mb-12">
            Hi, I am Muhammad Munawwar. I specialize in building custom web applications, cross-platform mobile apps, and robust desktop systems using JavaScript libraries.
          </p>

          <div className="hero-buttons flex gap-3 sm:gap-4 flex-wrap mb-10 sm:mb-16">
            <ShinyButton animatedBorder href="#contact" className="text-sm sm:text-base">
              Start a project &rarr;
            </ShinyButton>
            <ShinyButton href="#projects" className="text-sm sm:text-base">
              Selected work
            </ShinyButton>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap border-t border-(--border) pt-6 sm:pt-8 w-full">
            <div className="hero-metric-item flex items-center gap-2">
              <span className="text-(--primary) text-[0.9rem] sm:text-[clamp(1rem,1.8vw,1.3rem)]">✦</span>
              <span className="font-bold font-(--font-mono) text-[1rem] sm:text-[clamp(1.1rem,1.8vw,1.3rem)]">1.5+</span>
              <span className="text-[0.65rem] sm:text-[clamp(0.7rem,1vw,0.75rem)] text-(--text-muted) uppercase tracking-wider">Years Experience</span>
            </div>
            <div className="hero-metric-item flex items-center gap-2">
              <span className="text-(--primary) text-[0.9rem] sm:text-[clamp(1rem,1.8vw,1.3rem)]">⚡</span>
              <span className="font-bold font-[family:var(--font-mono)] text-[1rem] sm:text-[clamp(1.1rem,1.8vw,1.3rem)]">10+</span>
              <span className="text-[0.65rem] sm:text-[clamp(0.7rem,1vw,0.75rem)] text-(--text-muted) uppercase tracking-wider">Projects Completed</span>
            </div>
            <div className="hero-metric-item flex items-center gap-2">
              <span className="text-(--primary) text-[0.9rem] sm:text-[clamp(1rem,1.8vw,1.3rem)]">💻</span>
              <span className="font-bold font-(--font-mono) text-[1rem] sm:text-[clamp(1.1rem,1.8vw,1.3rem)]">Full</span>
              <span className="text-[0.65rem] sm:text-[clamp(0.7rem,1vw,0.75rem)] text-(--text-muted) uppercase tracking-wider">Stack Developer</span>
            </div>
          </div>
        </div>

        {/* Right Column (Placeholder for image/graphic) */}
        <div className="hidden md:flex relative items-center justify-center h-[400px] md:h-[500px] lg:h-[600px] z-10 w-full pointer-events-none">
          {/* Spacer to maintain layout grid */}
        </div>
      </div>

      {/* Full HeroSection Overlay for the 3D Badge */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-20 pointer-events-none">
        {eventSource && <Badge eventSource={eventSource} />}
      </div>
    </section>
  );
};
