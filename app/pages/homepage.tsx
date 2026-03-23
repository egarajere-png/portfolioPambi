"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import projectPage from "@/app/pages/projects";


// ─── Design tokens ─────────────────────────────────────────────────────────────
const SERIF = "'Cormorant Garamond', Georgia, serif";
const MONO  = "'DM Mono', monospace";
const INK   = "#1a1a1a";

// ─── Grain overlay ─────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999]"
      style={{
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }}
    />
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-7"
      style={{
        backgroundColor: scrolled ? "rgba(245,242,236,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,26,26,0.08)" : "1px solid transparent",
        transition: "background-color 0.5s ease, border-color 0.5s ease",
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        style={{
          fontFamily: SERIF,
          fontSize: "15px",
          color: INK,
          letterSpacing: "0.02em",
          fontStyle: "italic",
        }}
      >
        P.E
      </span>

      <nav className="flex items-center gap-10">
        {[
          { label: "About",    href: "/about"    },
          { label: "Projects", href: "/pages/projects.tsx" },
          { label: "Contact",  href: "/contact"  },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="group relative"
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "rgba(26,26,26,0.55)",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {label}
            <span
              className="absolute -bottom-0.5 left-0 h-px bg-[#1a1a1a] group-hover:w-full transition-all duration-300"
              style={{ width: 0 }}
            />
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}

// ─── Marquee strip ──────────────────────────────────────────────────────────────
function MarqueeName() {
  const chunk    = "Pambi Egara · ";
  const repeated = chunk.repeat(12);

  return (
    <div className="absolute bottom-8 left-0 right-0 overflow-hidden select-none pointer-events-none z-10 marquee-strip">
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontFamily: SERIF,
          fontSize: "clamp(3.5rem, 10vw, 9rem)",
          fontWeight: 300,
          color: "rgba(26,26,26,0.055)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          animation: "marqueescroll 30s linear infinite",
        }}
      >
        {repeated}
      </div>
    </div>
  );
}

// ─── Role data ──────────────────────────────────────────────────────────────────
const ROLES: { left: string; right: string }[] = [
  { left: "Full Stack",    right: "Engineer" },
  { left: "Data",          right: "Analyst"  },
  { left: "Cybersecurity", right: "Analyst"  },
  { left: "IT Support",    right: "Engineer" },
  { left: "iOS",           right: "Engineer" },
];

const roleFontStyle: React.CSSProperties = {
  fontFamily: SERIF,
  fontSize: "clamp(2rem, 7vw, 8.5rem)",
  fontWeight: 300,
  lineHeight: 0.93,
  letterSpacing: "-0.03em",
  color: INK,
  whiteSpace: "nowrap",
};

// ─── Hero section ───────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y       = useTransform(scrollYProgress, [0, 1],    ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1],    [1, 0.97]);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const wordVariants: Variants = {
    enter:  { opacity: 0, y: 50,  skewY:  3 },
    center: {
      opacity: 1, y: 0, skewY: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0, y: -40, skewY: -2,
      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const imgVariants: Variants = {
    hidden:  { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#f5f2ec]"
      style={{ y, opacity, scale }}
    >
      {/* 3-column grid: LEFT WORD · IMAGE · RIGHT WORD — all centred */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ paddingTop: "5rem" }} /* clear fixed header */
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",   /* vertically centre all three columns */
            width: "100%",
            height: "100%",
          }}
        >
          {/* LEFT WORD */}
          <div
            className="hero-left"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: "clamp(0.75rem, 2.5vw, 3.5rem)",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`left-${index}`}
                variants={wordVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ ...roleFontStyle, fontStyle: "italic", textAlign: "right" }}
              >
                {ROLES[index].left}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* CENTRE IMAGE — tall enough to dominate the viewport */}
          <motion.div
            className="hero-image"
            variants={imgVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: "relative",
              width: "clamp(300px, 38vw, 600px)",
              height: "clamp(560px, 88vh, 1000px)",
              flexShrink: 0,
              zIndex: 20,
            }}
          >
            <motion.div
              style={{ width: "100%", height: "100%", position: "relative" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/heropambi.png"
                alt="Pambi Egara"
                fill
                sizes="(max-width: 640px) 70vw, 30vw"
                style={{ objectFit: "contain", objectPosition: "center center" }}
                priority
              />
            </motion.div>
          </motion.div>

          {/* RIGHT WORD */}
          <div
            className="hero-right"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "clamp(0.75rem, 2.5vw, 3.5rem)",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`right-${index}`}
                variants={wordVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ ...roleFontStyle, textAlign: "left" }}
              >
                {ROLES[index].right}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Brief note — bottom right */}
      <motion.p
        className="absolute z-30 hero-note"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          bottom: "clamp(5rem, 10vh, 8rem)",
          right: "2.5rem",
          maxWidth: "200px",
          fontFamily: MONO,
          fontSize: "10px",
          lineHeight: 1.9,
          color: "rgba(26,26,26,0.42)",
          letterSpacing: "0.04em",
        }}
      >
        Based in Nairobi — building thoughtful interfaces at the intersection of design, data, and security.
      </motion.p>

      {/* Scroll pulse — bottom left */}
      <motion.div
        className="absolute bottom-10 left-10 flex items-center gap-3 z-30 hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <motion.div
          style={{ width: "1px", height: "38px", backgroundColor: "rgba(26,26,26,0.22)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            letterSpacing: "0.42em",
            color: "rgba(26,26,26,0.28)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </motion.div>

      <MarqueeName />
    </motion.section>
  );
}

// ─── About section ──────────────────────────────────────────────────────────────
const ABOUT_TEXT =
  "I'm Pambi Egara — a multi-disciplinary technologist from Nairobi. I architect full-stack products, extract meaning from data, harden systems against threats, and ship polished iOS experiences. Every line of code I write is a bridge between human intention and digital precision.";

function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [started,   setStarted  ] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(ABOUT_TEXT.slice(0, i));
      if (i >= ABOUT_TEXT.length) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [started]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-10 bg-[#f5f2ec] overflow-hidden"
      style={{ y }}
    >
      {/* Ghost word */}
      <div
        aria-hidden
        className="absolute top-12 left-8 select-none pointer-events-none"
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(5rem, 17vw, 15rem)",
          fontWeight: 300,
          color: "rgba(26,26,26,0.038)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        About
      </div>

      <div className="relative z-10" style={{ maxWidth: "100%" }}>
        {/* Label */}
        <div className="flex items-center gap-4 mb-10">
          <div style={{ width: "30px", height: "1px", backgroundColor: "rgba(26,26,26,0.28)" }} />
          <span
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              letterSpacing: "0.5em",
              color: "rgba(26,26,26,0.38)",
              textTransform: "uppercase",
            }}
          >
            About me
          </span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(2.4rem, 6vw, 6rem)",
            fontWeight: 300,
            color: INK,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            fontStyle: "italic",
            marginBottom: "2.5rem",
          }}
        >
          The person <br />
          behind the screen.
        </motion.h2>

        {/* Typewriter body */}
        <p
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(1.3rem, 2.6vw, 2rem)",
            fontWeight: 300,
            color: INK,
            lineHeight: 1.55,
            letterSpacing: "0.005em",
          }}
        >
          {displayed}
          {displayed.length < ABOUT_TEXT.length && started && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                backgroundColor: INK,
                marginLeft: "3px",
                verticalAlign: "text-bottom",
              }}
            />
          )}
        </p>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
        className="absolute bottom-0 left-10 right-10 origin-left"
        style={{ height: "1px", backgroundColor: "rgba(26,26,26,0.1)" }}
      />
    </motion.section>
  );
}

// ─── Works data ─────────────────────────────────────────────────────────────────
const WORKS = [
  {
    id: "01",
    title: "Sentinel Dashboard",
    category: "Cybersecurity · Full Stack",
    year: "2024",
    description: "Real-time threat monitoring platform with live anomaly detection and incident response workflows.",
    tags: ["Next.js", "Python", "WebSockets"],
  },
  {
    id: "02",
    title: "PulseAnalytics",
    category: "Data Analytics · iOS",
    year: "2024",
    description: "Mobile-first analytics suite that transforms raw datasets into elegant, actionable visual narratives.",
    tags: ["Swift", "SwiftUI", "PostgreSQL"],
  },
];

// ─── Work card ──────────────────────────────────────────────────────────────────
function WorkCard({ work, index }: { work: (typeof WORKS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{ borderTop: "1px solid rgba(26,26,26,0.12)", paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <div className="flex items-start justify-between gap-8">
        {/* Index + title */}
        <div className="flex items-start gap-6 flex-1 min-w-0">
          <span
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: "rgba(26,26,26,0.28)",
              letterSpacing: "0.3em",
              marginTop: "0.55rem",
              flexShrink: 0,
            }}
          >
            {work.id}
          </span>
          <div className="min-w-0">
            <motion.h3
              animate={{ x: hovered ? 8 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(1.7rem, 3.3vw, 3.1rem)",
                fontWeight: 300,
                color: INK,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                fontStyle: hovered ? "italic" : "normal",
              }}
            >
              {work.title}
            </motion.h3>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: "rgba(26,26,26,0.33)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginTop: "0.5rem",
              }}
            >
              {work.category} — {work.year}
            </p>
          </div>
        </div>

        {/* Description + tags (desktop only) */}
        <div className="max-w-[260px] hidden md:block flex-shrink-0">
          <p style={{ fontFamily: MONO, fontSize: "11px", color: "rgba(26,26,26,0.48)", lineHeight: 1.85 }}>
            {work.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {work.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: MONO,
                  fontSize: "8px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(26,26,26,0.38)",
                  border: "1px solid rgba(26,26,26,0.14)",
                  padding: "3px 8px",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: hovered ? 5 : 0, opacity: hovered ? 1 : 0.28 }}
          transition={{ duration: 0.28 }}
          style={{ marginTop: "0.45rem", flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Works section ──────────────────────────────────────────────────────────────
function WorksSection() {
  return (
    <section className="relative px-10 py-28 bg-[#f5f2ec]">
      {/* Header row */}
      <div className="flex items-end justify-between mb-14">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <div style={{ width: "30px", height: "1px", backgroundColor: "rgba(26,26,26,0.28)" }} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                letterSpacing: "0.5em",
                color: "rgba(26,26,26,0.38)",
                textTransform: "uppercase",
              }}
            >
              Selected Work
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)",
              fontWeight: 300,
              color: INK,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            Recent Works
          </motion.h2>
        </div>

        <motion.a
          href="/projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ x: 5 }}
          className="hidden md:flex items-center gap-3"
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            letterSpacing: "0.35em",
            color: "rgba(26,26,26,0.48)",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          All works
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </div>

      {/* Cards */}
      {WORKS.map((work, i) => (
        <WorkCard key={work.id} work={work} index={i} />
      ))}
      <div style={{ height: "1px", backgroundColor: "rgba(26,26,26,0.12)" }} />

      {/* Mobile — all works link */}
      <motion.a
        href="/projects"
        whileHover={{ x: 5 }}
        className="mt-10 flex md:hidden items-center gap-3"
        style={{
          fontFamily: MONO,
          fontSize: "9px",
          letterSpacing: "0.35em",
          color: "rgba(26,26,26,0.48)",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        All works
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M11 5l5 5-5 5" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}

// ─── Placeholder section ────────────────────────────────────────────────────────
function PlaceholderSection({ label, id }: { label: string; id: string }) {
  return (
    <section
      id={id}
      className="relative px-10 py-28 bg-[#f5f2ec] overflow-hidden"
      style={{ borderTop: "1px solid rgba(26,26,26,0.07)" }}
    >
      <div
        aria-hidden
        className="absolute top-10 left-8 select-none pointer-events-none"
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(4.5rem, 13vw, 12rem)",
          fontWeight: 300,
          color: "rgba(26,26,26,0.038)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        {label}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[38vh] text-center gap-4">
        <div className="flex items-center gap-4 mb-1">
          <div style={{ width: "28px", height: "1px", backgroundColor: "rgba(26,26,26,0.18)" }} />
          <span
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              letterSpacing: "0.5em",
              color: "rgba(26,26,26,0.28)",
              textTransform: "uppercase",
            }}
          >
            Coming soon
          </span>
          <div style={{ width: "28px", height: "1px", backgroundColor: "rgba(26,26,26,0.18)" }} />
        </div>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
            fontWeight: 300,
            color: "rgba(26,26,26,0.18)",
            letterSpacing: "-0.03em",
            fontStyle: "italic",
          }}
        >
          {label} Section
        </h2>
      </div>
    </section>
  );
}

// ─── Root export ────────────────────────────────────────────────────────────────
export default function HomeContent() {
  return (
    <div className="bg-[#f5f2ec]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        @keyframes marqueescroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        ::selection {
          background: rgba(26,26,26,0.1);
          color: #1a1a1a;
        }

        /* ── Mobile: stack hero vertically, all centred ── */
        @media (max-width: 640px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto !important;
            align-items: center !important;
            justify-items: center !important;
            gap: 0 !important;
          }
          .hero-left {
            justify-content: center !important;
            padding-right: 0 !important;
            padding-bottom: 0.4rem !important;
            padding-top: 0 !important;
            order: 1;
            width: 100%;
            text-align: center !important;
          }
          .hero-image {
            order: 2;
            width: 85vw !important;
            height: 62vh !important;
            margin: 0 auto !important;
          }
          .hero-right {
            justify-content: center !important;
            padding-left: 0 !important;
            padding-top: 0.4rem !important;
            padding-bottom: 0 !important;
            order: 3;
            width: 100%;
            text-align: center !important;
          }
          .hero-note {
            bottom: 0.75rem !important;
            right: 0.75rem !important;
            max-width: 150px !important;
            font-size: 9px !important;
          }
          .hero-scroll { bottom: 0.75rem !important; left: 0.75rem !important; }
          .marquee-strip { bottom: 2.5rem !important; }
          nav { gap: 1.5rem !important; }
          header { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }

        /* ── Tablet tweaks ── */
        @media (max-width: 900px) and (min-width: 641px) {
          .hero-grid { gap: 0 1vw !important; }
          .hero-image { width: 32vw !important; height: 80vh !important; }
        }
      `}</style>

      <Grain />
      <Header />

      {/* 1 · Hero */}
      <HeroSection />

      {/* 2 · About */}
      <AboutSection />

      {/* 3 · Services — placeholder */}
      <PlaceholderSection label="Services" id="services" />

      {/* 4 · Works */}
      <WorksSection />

      {/* 5 · Reviews — placeholder */}
      <PlaceholderSection label="Reviews" id="reviews" />

      {/* 6 · Footer — placeholder */}
      <PlaceholderSection label="Footer" id="footer" />
    </div>
  );
}