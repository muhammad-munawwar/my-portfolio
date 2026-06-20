'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor, Code, Database, Search, FlaskConical,
  Sparkles, PenTool, Crosshair, LayoutTemplate, BookOpen,
  Terminal, MonitorPlay, Cloud, Layers,
  Smartphone, Rocket, Bell, ArrowRight
} from 'lucide-react';

const customServices = [
  {
    id: "01",
    title: "Websites",
    description: "High-performance marketing sites, landing pages and corporate websites — built for conversion and speed.",
    icon: <Monitor strokeWidth={1.5} className="w-6 h-6" />,
    tags: [
      { text: "NEXT.JS & REACT", icon: <Code strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "HEADLESS CMS", icon: <Database strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "SEO & PERFORMANCE", icon: <Search strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "A/B TESTING", icon: <FlaskConical strokeWidth={1.5} className="w-3.5 h-3.5" /> }
    ]
  },
  {
    id: "02",
    title: "Branding",
    description: "Brand identities from logo to design system — identities that stick and stay consistent across every touchpoint.",
    icon: <Sparkles strokeWidth={1.5} className="w-6 h-6" />,
    tags: [
      { text: "LOGO & WORDMARK", icon: <PenTool strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "VISUAL IDENTITY", icon: <Crosshair strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "DESIGN SYSTEM", icon: <LayoutTemplate strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "BRAND GUIDELINES", icon: <BookOpen strokeWidth={1.5} className="w-3.5 h-3.5" /> }
    ]
  },
  {
    id: "03",
    title: "Software",
    description: "Custom tools, internal platforms and SaaS products. From MVP to scalable enterprise solution.",
    icon: <Terminal strokeWidth={1.5} className="w-6 h-6" />,
    tags: [
      { text: "WEB APPS & DASHBOARDS", icon: <MonitorPlay strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "API & BACKEND", icon: <Database strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "SAAS PLATFORMS", icon: <Cloud strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "INTERNAL TOOLS", icon: <Layers strokeWidth={1.5} className="w-3.5 h-3.5" /> }
    ]
  },
  {
    id: "04",
    title: "Mobile Apps",
    description: "Native and cross-platform apps with first-class user experience — iOS, Android and everything in between.",
    icon: <Smartphone strokeWidth={1.5} className="w-6 h-6" />,
    tags: [
      { text: "IOS & ANDROID", icon: <Smartphone strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "REACT NATIVE", icon: <Code strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "APP STORE LAUNCH", icon: <Rocket strokeWidth={1.5} className="w-3.5 h-3.5" /> },
      { text: "PUSH & ANALYTICS", icon: <Bell strokeWidth={1.5} className="w-3.5 h-3.5" /> }
    ]
  }
];

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = ({ services }: any) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });

      tl.fromTo('.services-tag',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo('.services-title-line',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out' },
          '-=0.3'
        );

      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });

      const cards = gsap.utils.toArray('.service-card');
      cards.forEach((card: any, index: number) => {
        cardsTl.fromTo(card,
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' },
          index * 0.1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative bg-[var(--bg)] pt-24 pb-20 border-b border-[var(--border)] overflow-hidden">
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
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[var(--primary-glow)] blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="custom-container relative z-10 flex flex-col">
        {/* Header section inside the container */}
        <div ref={headerRef} className="mb-14">
          <div className="overflow-hidden inline-block mb-2 pb-1">
            <span className="services-tag mono-tag text-(--primary) text-[0.8rem] tracking-widest font-semibold uppercase block">
              [03] SERVICES / WHAT I DO
            </span>
          </div>
          <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] font-bold mt-4 tracking-[-0.02em] leading-[1.1] text-[var(--text)] flex flex-col">
            <span className="overflow-hidden pb-2">
              <span className="services-title-line block">Engineering <span className="text-(--primary)">scalable</span></span>
            </span>
            <span className="overflow-hidden pb-2 -mt-2">
              <span className="services-title-line block">software solutions.</span>
            </span>
          </h2>
        </div>

        {/* Grid container inside the container */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 2xl:gap-5">
          {customServices.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-[#0a0a0b] hover:bg-[#111113] transition-colors duration-500 overflow-hidden flex flex-col p-10 md:p-8 2xl:p-10 min-h-[380px] border border-[var(--border)] rounded-md"
            >
              {/* Top Glow on Hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00d2ff]/80 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] z-20"></div>
              {/* Background Number */}
              <div
                className="absolute right-10 top-10 text-[6rem] md:text-[8rem] leading-none font-sans font-black pointer-events-none select-none text-transparent transition-all duration-500 [-webkit-text-stroke:1.5px_rgba(255,255,255,0.1)] group-hover:[-webkit-text-stroke:1.5px_#00d2ff]"
              >
                {service.id}
              </div>

              {/* Icon Box */}
              <div className="relative mb-10 w-12 h-12 flex items-center justify-center border border-[#00d2ff]/30 bg-[#00d2ff]/5  group-hover:-rotate-5 group-hover:scale-[1.05] group-hover:border-[#00d2ff]/60 group-hover:bg-[#00d2ff]/10 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]">
                <div className="relative z-10 text-[#00d2ff]">
                  {service.icon}
                </div>
              </div>

              {/* Title with Hover Animation */}
              <h3 className="font-[family:var(--font-display)] text-3xl md:text-4xl font-bold mb-4 relative overflow-hidden flex h-[1.2em]">
                {/* White Title */}
                <span className="flex">
                  {service.title.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[110%] text-[var(--text)]"
                      style={{ transitionDelay: `${charIndex * 0.02}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                {/* Blue Title (Animates from bottom) */}
                <span className="absolute left-0 top-0 flex">
                  {service.title.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 text-[#00d2ff]"
                      style={{ transitionDelay: `${charIndex * 0.02}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </h3>

              {/* Description */}
              <p className="text-[var(--text-soft)] text-[0.95rem] leading-[1.6] max-w-[85%] sm:max-w-[80%] md:max-w-[70%] 2xl:max-w-[65%] mb-10 relative z-10">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 md:gap-3 mt-auto relative z-10">
                {service.tags.map((tag, i) => (
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

              {/* Arrow */}
              <div className="absolute right-5 bottom-2 text-[#2e3031] group-hover:text-[#00d2ff] text-2xl 2xl:text-3xl -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]">
                →
              </div>

              {/* Subtle radial glow on card hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.04)_0%,transparent_60%)] opacity-0 group-hover:opacity-80 pointer-events-none transition-opacity duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
