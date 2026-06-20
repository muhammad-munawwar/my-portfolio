'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ShinyButton } from './ShinyButton';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: '#about', title: 'About' },
    { id: '#work', title: 'Services' },
    { id: '#projects', title: 'Projects' },
    { id: '#experience', title: 'Experience' },
    { id: '#contact', title: 'Contact' },
  ];

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
      <div className='w-full z-[100] fixed py-3 flex justify-center'>
        <nav className="p-1.5 2xl:p-2 grid grid-cols-[20%_60%_20%] bg-[#10101258] border border-blue-400/10 w-max min-w-[360px] rounded-sm">
          <div className='flex justify-center'>
            <Link href="/" className="flex items-center no-underline">
              <Logo size={34} />
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <ShinyButton size="sm" animatedBorder={true} href="#contact">
              Start a project &rarr;
            </ShinyButton>
          </div>
          <div className='flex justify-end'>
            <button
              id="burgerBtn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="border border-blue-400/10 cursor-pointer hover:bg-[#00000011] flex flex-col justify-center items-center gap-[6px] w-10 h-10 z-[101] transition-colors duration-200 ease-[var(--easing)] rounded-sm"
            >
              <span
                className={`block w-[18px] h-[2px] bg-[var(--text)] transition-transform duration-300 ease-[var(--easing)] ${isOpen ? 'translate-y-[4px] rotate-45' : ''
                  }`}
              />
              <span
                className={`block w-[18px] h-[2px] bg-[var(--text)] transition-transform duration-300 ease-[var(--easing)] ${isOpen ? '-translate-y-[4px] -rotate-45' : ''
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
        className="fixed inset-0 bg-[#0a0a0b] z-[99] flex flex-col justify-center p-12 opacity-0"
      >
        <div
          ref={menuContainerRef}
          className="flex flex-col gap-8 max-w-[600px] mx-auto w-full"
        >
          {navLinks.map((link) => (
            <div key={link.id}>
              <Link
                href={link.id}
                onClick={() => setIsOpen(false)}
                className="font-[family:var(--font-display)] text-5xl font-bold text-[var(--text)] no-underline transition-colors duration-200 ease-[var(--easing)] hover:text-[#A075FF]"
              >
                {link.title}
              </Link>
            </div>
          ))}

          <div className="border-t border-[var(--border)] pt-8 mt-4 flex justify-between flex-wrap gap-4">
            <div>
              <p className="mono-tag mb-1">EMAIL US</p>
              <a
                href="mailto:info@wibify.agency"
                className="text-[var(--text-soft)] no-underline"
              >
                info@wibify.agency
              </a>
            </div>
            <div>
              <p className="mono-tag mb-1">FOLLOW</p>
              <div className="flex gap-4">
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
