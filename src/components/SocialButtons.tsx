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
      {/* GitHub Link */}
      <AnimatedSocialButton href="https://github.com/muhammad-munawwar" target="_blank" rel="noreferrer" ariaLabel="GitHub">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      </AnimatedSocialButton>

      {/* WhatsApp Link */}
      <AnimatedSocialButton href="https://wa.me/923141304783" target="_blank" rel="noreferrer" ariaLabel="WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </AnimatedSocialButton>

      {/* Email Link */}
      <AnimatedSocialButton href="mailto:muhammadmunawwar124@gmail.com" ariaLabel="Email">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </AnimatedSocialButton>
    </div>
  );
};
