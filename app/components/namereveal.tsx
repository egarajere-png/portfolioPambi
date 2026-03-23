"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const letterReveal: Variants = {
  hidden: { opacity: 0, y: 80, skewY: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -60,
    skewY: -4,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

const surnameReveal: Variants = {
  hidden: { opacity: 0, y: 80, skewY: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -60,
    skewY: -4,
    transition: {
      delay: 0.1 + i * 0.04,
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

const FIRST_NAME = "Pambi".split("");
const LAST_NAME = "Egara".split("");

interface NameRevealProps {
  onFinish: () => void;
}

export default function NameReveal({ onFinish }: NameRevealProps) {
  const [exiting, setExiting] = useState(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onFinishRef.current(), 900);
    }, 2200);

    return () => clearTimeout(holdTimer);
  }, []); // intentionally empty — runs once on mount

  const letterStyle: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
    fontWeight: 300,
    color: "#ffffff",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    fontStyle: "italic",
  };

  return (
    <motion.div
      className="fixed inset-0 bg-[#0a0a0a] flex items-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: 0.055,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Center vertical divider */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: exiting ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* First Name — left */}
      <div className="absolute left-[6vw] flex overflow-hidden pb-2" style={{ gap: "0.04em" }}>
        <AnimatePresence>
          {!exiting &&
            FIRST_NAME.map((letter, i) => (
              <motion.span
                key={`first-${i}`}
                custom={i}
                variants={letterReveal}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="block"
                style={letterStyle}
              >
                {letter}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {/* Last Name — right */}
      <div className="absolute right-[6vw] flex overflow-hidden pb-2" style={{ gap: "0.04em" }}>
        <AnimatePresence>
          {!exiting &&
            LAST_NAME.map((letter, i) => (
              <motion.span
                key={`last-${i}`}
                custom={i}
                variants={surnameReveal}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="block"
                style={letterStyle}
              >
                {letter}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {/* Portfolio tag — center bottom */}
      <AnimatePresence>
        {!exiting && (
          <motion.div
            key="portfolio-tag"
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-px bg-white/30" />
            <span
              className="text-white/40 uppercase"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.5em",
              }}
            >
              Portfolio
            </span>
            <div className="w-8 h-px bg-white/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}