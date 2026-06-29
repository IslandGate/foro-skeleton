'use client';

import { useConfetti } from '@/hooks/useConfetti';
import { ReactNode } from 'react';

interface ConfettiButtonProps {
  children: ReactNode;
  onClick?: () => void;
  particleCount?: number;
  spread?: number;
  className?: string;
}

/**
 * Button component that triggers confetti animation on click
 * Combines the confetti-button Tailwind utility with the useConfetti hook
 */
export function ConfettiButton({
  children,
  onClick,
  particleCount = 150,
  spread = 60,
  className = '',
}: ConfettiButtonProps) {
  const triggerConfetti = useConfetti({ particleCount, spread });

  const handleClick = () => {
    triggerConfetti();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`confetti-button ${className}`}
    >
      {children}
    </button>
  );
}
