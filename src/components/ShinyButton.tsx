import React from 'react';
import Link from 'next/link';

interface ShinyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animatedBorder?: boolean;
  type?: 'button' | 'submit' | 'reset';
  customLineWidth?: number
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  size = 'md',
  animatedBorder = false,
  type = 'button',
  customLineWidth = 600
}) => {
  const baseClasses = "group relative z-10 inline-flex items-center justify-center gap-2 text-white rounded-[2px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] font-display cursor-pointer select-none font-medium";

  const sizeClasses = {
    sm: "px-4 py-2 text-[0.85rem]",
    md: "px-6 py-3 text-[0.95rem]",
    lg: "px-8 py-4 text-base"
  };

  const staticClasses = "bg-[#0000ff02] border border-blue-400/10 cursor-pointer hover:bg-[#00000011]";

  const animatedClasses = "border-none bg-blue-400/10";

  const finalClasses = `${baseClasses} ${sizeClasses[size]} ${animatedBorder ? animatedClasses : staticClasses} ${className}`;

  const renderAnimatedBackground = () => (
    <>
      <span
        className="absolute left-1/2 top-1/2 -z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ height: `${customLineWidth}px`, width: `${customLineWidth}px` }}
      >
        <span className="block h-full w-full animate-[spin_4s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_45%,#00d2ff,#7c3aed,transparent_55%)]" />
      </span>
      <span className="absolute inset-px -z-10 rounded-[2px] bg-[#111113] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:bg-[radial-gradient(ellipse_at_center,#111113_30%,rgba(0,210,255,0.15)_100%)]" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${finalClasses}`}>
        {animatedBorder && renderAnimatedBackground()}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={finalClasses}>
      {animatedBorder && renderAnimatedBackground()}
      {children}
    </button>
  );
};
