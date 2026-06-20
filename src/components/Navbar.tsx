'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ShinyButton } from './ShinyButton';
import { Logo } from './Logo';
import { useLoading } from '@/context/LoadingContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();

  const navLinks = [
    { id: '#about', title: 'About' },
    { id: '#work', title: 'Services' },
    { id: '#projects', title: 'Projects' },
    { id: '#experience', title: 'Experience' },
    { id: '#contact', title: 'Contact' },
  ];

  useEffect(() => {
    if (!isLoading && navContainerRef.current) {
      gsap.fromTo(navContainerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [isLoading]);

  useEffect(() => {
    const menu = menuRef.current;
    const container = menuContainerRef.current;
    if (!menu || !container) return;

    if (isOpen) {
      gsap.killTweensOf([menu]);
      gsap.set(menu, { display: 'flex', yPercent: 100 });
      // Overlay slides up from bottom — like preloader exit in reverse
      gsap.to(menu, {
        yPercent: 0,
        duration: 0.7,
        ease: 'power4.out',
      });
      // Each link title character animates up from below — hero-title-line style
      const linkLines = container.querySelectorAll('.nav-link-line');
      gsap.fromTo(linkLines,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power4.out', delay: 0.15 }
      );
      // Footer info fades in
      const footer = container.querySelector('.nav-footer');
      if (footer) {
        gsap.fromTo(footer,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.55 }
        );
      }
    } else {
      gsap.killTweensOf([menu]);
      // Overlay slides back down
      gsap.to(menu, {
        yPercent: 100,
        duration: 0.55,
        ease: 'power4.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none', yPercent: 100 });
        }
      });
    }
  }, [isOpen]);

  return (
    <>
      <div ref={navContainerRef} className='w-full z-[100] fixed py-3 px-4 flex justify-center opacity-0'>
        <nav className="p-1.5 2xl:p-2 grid grid-cols-[25%_50%_25%] sm:grid-cols-[20%_60%_20%] bg-[#10101258] border border-blue-400/10 w-max min-w-[350px] sm:min-w-[360px] max-w-[450px] rounded-sm backdrop-blur-md">
          <div className='flex items-center justify-center'>
            <Link href="/" className="flex items-center no-underline">
              <Logo className="size-7 lg:size-8" />
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <ShinyButton size="sm" animatedBorder={true} href="#contact">
              Start a project &rarr;
            </ShinyButton>
          </div>
          <div className='flex items-center justify-end pr-1 sm:pr-0'>
            <button
              id="burgerBtn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="border border-blue-400/10 cursor-pointer hover:bg-[#00000011] flex flex-col justify-center items-center gap-[5px] sm:gap-[6px] w-8 h-8 sm:w-10 sm:h-10 z-[101] transition-colors duration-200 ease-[var(--easing)] rounded-sm"
            >
              <span
                className={`block w-[14px] sm:w-[18px] h-[2px] bg-[var(--text)] transition-transform duration-300 ease-[var(--easing)] ${isOpen ? 'translate-y-[3.5px] sm:translate-y-[4px] rotate-45' : ''
                  }`}
              />
              <span
                className={`block w-[14px] sm:w-[18px] h-[2px] bg-[var(--text)] transition-transform duration-300 ease-[var(--easing)] ${isOpen ? '-translate-y-[3.5px] sm:-translate-y-[4px] -rotate-45' : ''
                  }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* GSAP Managed Overlay Menu — slides up from bottom */}
      <div
        ref={menuRef}
        style={{ display: 'none' }}
        className="fixed inset-0 bg-[#0a0a0b] z-[99] flex flex-col justify-center p-6 sm:p-12 overflow-hidden"
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div
          ref={menuContainerRef}
          className="flex flex-col gap-3 sm:gap-5 max-w-[700px] mx-auto w-full relative z-10"
        >
          {navLinks.map((link, index) => (
            <div key={link.id} className="overflow-hidden">
              {/* Parent div overflow-hidden clips the GSAP slide-in from below */}
              <Link
                href={link.id}
                onClick={() => setIsOpen(false)}
                className="nav-link-line group relative inline-flex overflow-hidden no-underline pb-1"
              >
                {/* White letters — slide up on hover */}
                <span className="flex">
                  {link.title.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="block text-[2.6rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-bold leading-[1] text-[var(--text)] whitespace-pre transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[110%]"
                      style={{ transitionDelay: `${charIndex * 0.025}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                {/* Purple letters — slide up into view on hover */}
                <span className="absolute left-0 top-0 flex">
                  {link.title.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="block text-[2.6rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-bold leading-[1] text-[var(--primary)] whitespace-pre translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0"
                      style={{ transitionDelay: `${charIndex * 0.025}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </Link>
            </div>
          ))}

          <div className="nav-footer border-t border-[var(--border)] pt-6 sm:pt-8 mt-3 sm:mt-6 flex justify-between flex-wrap gap-4">
            <div>
              <p className="mono-tag mb-1.5 text-[0.7rem] sm:text-[0.8rem] tracking-widest">EMAIL</p>
              <a
                href="mailto:muhammadmunawwar124@gmail.com"
                className="text-[var(--text-soft)] no-underline text-sm sm:text-[0.95rem] hover:text-[var(--primary)] transition-colors duration-300"
              >
                muhammadmunawwar124@gmail.com
              </a>
            </div>
            <div>
              <p className="mono-tag mb-1.5 text-[0.7rem] sm:text-[0.8rem] tracking-widest">FOLLOW</p>
              <div className="flex gap-5 text-sm sm:text-[0.95rem]">
                <a href="https://github.com/muhammad-munawwar" target="_blank" rel="noreferrer" className="text-[var(--text-soft)] no-underline hover:text-[var(--primary)] transition-colors duration-300">GitHub</a>
                <a href="https://www.linkedin.com/in/munawwar-ishaq-892180361" target="_blank" rel="noreferrer" className="text-[var(--text-soft)] no-underline hover:text-[var(--primary)] transition-colors duration-300">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
