import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type BgColor = 'olive' | 'mauve' | 'white' | 'success' | 'none';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'none';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  bg?: BgColor;
  size?: ButtonSize;
  className?: string;
}

export function Button({
  children,
  href,
  bg = 'none',
  size = 'none',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-space-grotesk transition-all duration-200 ease-in-out cursor-pointer hover:brightness-90 hover:shadow-md";

  const bgStyles = {
    olive: "bg-olive text-cream border border-black",
    mauve: "bg-mauve text-cream border border-black", 
    white: "bg-white text-gray-700 border border-gray-200",
    success: "bg-[#6fbc7b] text-black",
    none: ""
  };

  const sizeStyles = {
    sm: "py-2.5 px-4 text-[11px] sm:text-xs rounded-lg font-bold",
    md: "px-6 py-3 text-base rounded-xl font-medium",
    lg: "px-8 py-4 text-xl rounded-2xl font-medium",
    xl: "px-8 py-5 text-xl rounded-2xl font-medium",
    none: ""
  };

  const combinedClasses = `${baseStyles} ${bgStyles[bg]} ${sizeStyles[size]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}