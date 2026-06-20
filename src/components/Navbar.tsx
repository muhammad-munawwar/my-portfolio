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
      // Cancel previous animations
      gsap.killTweensOf([menu, container.children]);
      gsap.set(menu, { display: 'flex' });
      gsap.fromTo(menu,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo(container.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      // Cancel previous animations
      gsap.killTweensOf([menu, container.children]);
      gsap.to(menu, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' });
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

      {/* GSAP Managed Overlay Menu */}
      <div
        ref={menuRef}
        style={{ display: 'none' }}
        className="fixed inset-0 bg-[#0a0a0b] z-[99] flex flex-col justify-center p-6 sm:p-12 opacity-0"
      >
        <div
          ref={menuContainerRef}
          className="flex flex-col gap-6 sm:gap-8 max-w-[600px] mx-auto w-full"
        >
          {navLinks.map((link) => (
            <div key={link.id}>
              <Link
                href={link.id}
                onClick={() => setIsOpen(false)}
                className="font-[family:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] no-underline transition-colors duration-200 ease-[var(--easing)] hover:text-[#A075FF]"
              >
                {link.title}
              </Link>
            </div>
          ))}

          <div className="border-t border-[var(--border)] pt-6 sm:pt-8 mt-2 sm:mt-4 flex justify-between flex-wrap gap-4">
            <div>
              <p className="mono-tag mb-1 text-[0.75rem] sm:text-[0.85rem]">EMAIL US</p>
              <a
                href="mailto:info@wibify.agency"
                className="text-[var(--text-soft)] no-underline text-sm sm:text-base"
              >
                info@wibify.agency
              </a>
            </div>
            <div>
              <p className="mono-tag mb-1 text-[0.75rem] sm:text-[0.85rem]">FOLLOW</p>
              <div className="flex gap-4 text-sm sm:text-base">
                <a href="#" className="text-[var(--text-soft)] no-underline">GitHub</a>
                <a href="#" className="text-[var(--text-soft)] no-underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
