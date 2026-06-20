import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 42,
}) => {
  return (
    <Image
      src="/logo.png"
      alt="Muhammad Munawwar Logo"
      width={size}
      height={size}
      className={`${className} block object-contain`}
      priority
    />
  );
};
