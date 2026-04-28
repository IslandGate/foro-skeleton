"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

interface DigitData {
  id: string;
  char: string;
  x: number;
  y: number;
  rotation: number;
}

const randomWeighted = () => (Math.random() + Math.random() + Math.random()) / 3;

const createDigit = (char: string, existingPositions: DigitData[], isInitial: boolean): DigitData => {
  let placed = false;
  let attempts = 0;
  let x = 0;
  let y = 0;
  const minDistance = 15;

  while (!placed && attempts < 50) {
    if (isInitial) {
      x = 10 + randomWeighted() * 30; 
      y = 5 + randomWeighted() * 80;
    } else {
      // spread out more if not 404.
      x = 2 + Math.random() * 43; 
      y = 5 + Math.random() * 80;
    }

    let overlap = false;
    for (const p of existingPositions) {
      const distance = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
      if (distance < minDistance) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      placed = true;
    }
    
    attempts++;
  }

  return {
    id: Math.random().toString(36).substring(2, 9),
    char,
    x,
    y,
    rotation: Math.floor(Math.random() * 90) - 60,
  };
};

export default function NotFound() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [digitsData, setDigitsData] = useState<DigitData[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // 1. Initial "404" setup
  useEffect(() => {
    const chars = ['4', '0', '4'];
    const initialPositions: DigitData[] = [];

    chars.forEach((char) => {
      // passed true for intial
      initialPositions.push(createDigit(char, initialPositions, true));
    });

    setDigitsData(initialPositions);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        setDigitsData((prev) => {
          // pass false after initial
          const newDigit = createDigit(e.key, prev, false);
          return [...prev, newDigit];
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cream flex flex-col md:flex-row overflow-hidden select-none relative"
      ref={constraintsRef}
    >
      {/* 404 */}
      {isMounted && digitsData.map((item) => (
        <motion.div
          key={item.id}
          className="absolute font-space-grotesk leading-[0.3] text-black text-[14rem] md:text-[18rem] font-bold cursor-grab z-50 flex items-center justify-center w-fit h-fit"
          style={{ 
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.8, 
            rotate: item.rotation,
            filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))'
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: item.rotation,
            filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))' 
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            filter: { type: 'tween', duration: 0.2, ease: 'easeOut' }
          }}
          drag
          dragMomentum={true} 
          dragTransition={{ timeConstant: 150, power: 0.2 }}
          dragConstraints={constraintsRef}
          whileTap={{ 
            scale: 1.15, 
            cursor: 'grabbing',
            zIndex: 60,
            filter: 'drop-shadow(20px 30px 20px rgba(0,0,0,0.2))' 
          }}
        >
          {item.char}
        </motion.div>
      ))}

      <div className="w-full md:w-[60%] h-[50vh] md:h-screen pointer-events-none"></div>

      <div className="w-full md:w-[40%] h-[50vh] md:h-screen flex flex-col justify-center items-start px-8 md:pr-24 z-10 pointer-events-auto ">
        <img
          src="/marketing-page-assets/il-foro-logo-wip.png"
          alt="Il Foro Logo"
          className="w-48 mb-8 object-contain pointer-events-none"
          draggable="false"
        />
        
        <h1 className="text-black text-4xl font-garamond md:text-5xl mb-10 font-medium tracking-tight">
          Well, this is awkward...
        </h1>
        
        <Button
          className="px-8 py-4 rounded-2xl font-medium font-space-grotesk bg-mauve text-white text-xl transition-all duration-300 hover:brightness-90 hover:shadow-md ease-in-out hover:scale-105 shadow-sm border-1 border-black "
          onClick={() => window.history.back()}
        >
          Take me back...
        </Button>
      </div>
    </div>
  );
}