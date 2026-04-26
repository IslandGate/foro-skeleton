"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  bgImage: string;
  children: React.ReactNode;
  strength?: number;    
}

export default function Parallax({ bgImage, children, strength = 400 }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], 
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", `${strength}px`]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">

      <motion.div
        className="absolute top-0 left-0 w-full h-[120vh] -z-10 bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          y,
        }}
      />
      
      <div className="relative z-10 w-full">
        {children}
      </div>
      
    </div>
  );
}