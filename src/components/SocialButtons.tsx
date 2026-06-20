'use client';

import React from 'react';

const AnimatedSocialButton = ({ href, ariaLabel, children, ...props }: any) => {
  return (
    <a
      href={href}
      className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[6px] text-[#c8c7c2] transition-all duration-300 hover:scale-105 hover:text-[#00d2ff]"
      aria-label={ariaLabel}
      {...props}
    >
      {/* Animated spinning background */}
      <span className="absolute left-1/2 top-1/2 -z-20 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2">
        <span className="block h-full w-full animate-[spin_5s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_35%,#00d2ff,transparent_65%)] bg-blue-400/10" />
      </span>
      {/* Inner background with radial gradient on hover */}
      <span className="absolute inset-[1.5px] -z-10 rounded-[4px] bg-[#111113] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:bg-[radial-gradient(circle_at_center,#111113_30%,rgba(0,210,255,0.25)_100%)]" />

      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </a>
  );
};

export const SocialButtons = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-3">
      {/* WhatsApp Link */}
      <AnimatedSocialButton href="https://wa.me/4915754405511" target="_blank" rel="noreferrer" ariaLabel="WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </AnimatedSocialButton>

      {/* Phone dial */}
      <AnimatedSocialButton href="tel:+4915754405511" ariaLabel="Phone">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2v3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </AnimatedSocialButton>

      {/* Contact/Chat overlay link */}
      <AnimatedSocialButton href="#contact" ariaLabel="Contact">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </AnimatedSocialButton>
    </div>
  );
};
