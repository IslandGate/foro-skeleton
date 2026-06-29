'use client';

import { useCallback } from 'react';

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
}

/**
 * Hook to trigger confetti animation on click
 * Requires canvas-confetti library to be loaded
 * @param options - Configuration options for confetti animation
 * @returns onClick handler function
 */
export function useConfetti(options: ConfettiOptions = {}) {
  const { particleCount = 150, spread = 60, origin = { x: 0.5, y: 0.5 } } = options;

  const triggerConfetti = useCallback((fromElement?: HTMLElement) => {
    if (typeof window !== 'undefined' && (window as any).confetti) {
      let confettiOrigin = origin;

      // Calculate origin from element position if provided
      if (fromElement) {
        const rect = fromElement.getBoundingClientRect();
        confettiOrigin = {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        };
      }

      (window as any).confetti({
        particleCount,
        spread,
        origin: confettiOrigin,
      });
    }
  }, [particleCount, spread, origin]);

  return triggerConfetti;
}
