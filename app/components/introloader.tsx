"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep ref in sync without re-triggering the effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const duration = 5000;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic — surges then decelerates
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * 100);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(() => onCompleteRef.current(), 600);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []); // intentionally empty — runs once on mount

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-end justify-end overflow-hidden">
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-white/10"
        initial={{ width: "0%" }}
        animate={{ width: `${count}%` }}
        style={{ transition: "width 0.05s linear" }}
      />

      {/* Counter — bottom right */}
      <div className="relative z-20 p-10 pb-12 pr-14 flex flex-col items-end gap-1">
        <motion.span
          className="text-white/20 uppercase font-light mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.4em",
          }}
        >
          Loading
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden"
        >
          <span
            className="text-white font-light tabular-nums"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(4rem, 8vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {String(count).padStart(2, "0")}
          </span>
        </motion.div>
      </div>

      {/* Expanding circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          className="rounded-full border border-white/10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: "60vmin", height: "60vmin" }}
          transition={{ duration: 4.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}