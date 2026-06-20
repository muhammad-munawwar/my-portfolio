'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useProgress } from '@react-three/drei';
import { useLoading } from '@/context/LoadingContext';
import { Logo } from './Logo';

export const Preloader = () => {
  const { progress } = useProgress();
  const { isLoading, setIsLoading } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Smoothly animate the progress number
      gsap.to({ val: displayProgress }, {
        val: progress,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: function () {
          setDisplayProgress(Math.round(this.targets()[0].val));
        }
      });
      
      // Initial entrance animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, 
          { opacity: 0, scale: 0.8 }, 
          { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }
        );
      }
    }
  }, [progress, isLoading]); // removed displayProgress from dependency to avoid loop re-triggering

  useEffect(() => {
    const triggerExit = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }
      });

      tl.to('.preloader-content', { opacity: 0, scale: 0.95, duration: 0.4, ease: 'power2.inOut', delay: 0.4 })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          borderBottomLeftRadius: '50%',
          borderBottomRightRadius: '50%'
        }, "-=0.1");
    };

    // Ensure it triggers after progress hits 100
    if (progress >= 99.9) {
      if (document.readyState === 'complete') {
        triggerExit();
      } else {
        window.addEventListener('load', triggerExit);
        return () => window.removeEventListener('load', triggerExit);
      }
    }
  }, [progress, setIsLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#070708] flex flex-col items-center justify-center overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      <div className="preloader-content flex flex-col items-center relative z-10 w-full px-8">
        
        {/* Animated Logo */}
        <div ref={logoRef} className="mb-12 drop-shadow-[0_0_20px_rgba(0,210,255,0.3)]">
          <Logo size={60} />
        </div>

        {/* Progress Display */}
        <div className="flex flex-col items-center w-full max-w-[300px]">
          <div className="flex justify-between w-full mb-3 text-[var(--text-soft)] font-[family:var(--font-mono)] text-[0.75rem] tracking-widest uppercase">
            <span>Initializing</span>
            <span className="text-[var(--primary)]">{displayProgress}%</span>
          </div>
          
          <div className="w-full h-[1px] bg-[var(--border-strong)] relative overflow-hidden">
            <div 
              ref={progressLineRef}
              className="absolute top-0 left-0 h-full bg-[var(--primary)] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,210,255,0.8)]"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Abstract Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[var(--primary)]/5 rounded-full blur-[100px] -z-10" />
    </div>
  );
};
