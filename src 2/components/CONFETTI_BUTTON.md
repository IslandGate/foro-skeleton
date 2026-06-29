# Confetti Button

A reusable Tailwind utility and React component for adding confetti animation to buttons.

## Usage

### Method 1: Using the ConfettiButton Component

```tsx
import { ConfettiButton } from '@/components/ConfettiButton';

export function MyComponent() {
  return (
    <ConfettiButton
      particleCount={200}
      spread={80}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      🎉 Click me!
    </ConfettiButton>
  );
}
```

### Method 2: Using the useConfetti Hook with Tailwind Class

```tsx
'use client';

import { useConfetti } from '@/hooks/useConfetti';
import { Button } from '@/components/Button';

export function MyComponent() {
  const triggerConfetti = useConfetti({ particleCount: 150 });

  return (
    <Button
      onClick={triggerConfetti}
      className="confetti-button bg-success"
    >
      Like
    </Button>
  );
}
```

### Method 3: Manual Implementation

```tsx
'use client';

export function MyComponent() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 150,
        spread: 60,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="confetti-button bg-blue-600 text-white px-4 py-2 rounded"
    >
      Click me!
    </button>
  );
}
```

## Configuration

### useConfetti Hook Options

```typescript
interface ConfettiOptions {
  particleCount?: number;  // Number of confetti particles (default: 150)
  spread?: number;         // Spread angle in degrees (default: 60)
  origin?: {
    x?: number;           // X origin (0-1, default: 0.5)
    y?: number;           // Y origin (0-1, default: 0.5)
  };
}
```

### Tailwind Class

The `confetti-button` utility class includes:
- Relative positioning with z-index
- Elevated box-shadow for depth
- Active state scale transform (1.01x)
- Smooth transitions

## Features

- ✅ Requires canvas-confetti library (loaded globally via CDN)
- ✅ Type-safe with TypeScript
- ✅ Customizable particle count and spread
- ✅ Works with any button styling
- ✅ Client-side only (safe to use in Next.js)
- ✅ Lazy-loaded script for performance

## Notes

- The canvas-confetti library is loaded in the root layout via CDN
- All components using confetti functionality must be client components
- The hook checks for `window.confetti` availability before triggering
