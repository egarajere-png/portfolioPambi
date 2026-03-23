"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const SERIF = "'Cormorant Garamond', Georgia, serif";
const MONO  = "'DM Mono', monospace";
const INK   = "#1a1a1a";
const CREAM = "#f5f2ec";

// ─── Project data ───────────────────────────────────────────────────────────────
// Replace `image` paths with your actual project screenshots under /public/projects/
const PROJECTS = [
  {
    id: "01",
    title: "Sentinel",
    subtitle: "Dashboard",
    category: "Cybersecurity",
    tags: ["Next.js", "Python", "WebSockets"],
    year: "2024",
    description: "Real-time threat monitoring platform with live anomaly detection and incident response workflows.",
    image: "/projects/sentinel.jpg",
    size: "large",   // large | small — controls grid span
    color: "#1c1f26",
  },
  {
    id: "02",
    title: "Pulse",
    subtitle: "Analytics",
    category: "Data · iOS",
    tags: ["Swift", "SwiftUI", "PostgreSQL"],
    year: "2024",
    description: "Mobile-first analytics suite transforming raw datasets into elegant, actionable narratives.",
    image: "/projects/pulse.jpg",
    size: "small",
    color: "#2a2318",
  },
  {
    id: "03",
    title: "Aegis",
    subtitle: "IT Platform",
    category: "IT Support",
    tags: ["React", "Node.js", "AWS"],
    year: "2023",
    description: "Unified IT support platform with automated ticketing, asset management, and SLA tracking.",
    image: "/projects/aegis.jpg",
    size: "small",
    color: "#1a2118",
  },
  {
    id: "04",
    title: "Meridian",
    subtitle: "iOS App",
    category: "iOS Engineering",
    tags: ["Swift", "CoreML", "CloudKit"],
    year: "2023",
    description: "Award-winning productivity iOS application with machine learning-powered task prioritisation.",
    image: "/projects/meridian.jpg",
    size: "large",
    color: "#1c1824",
  },
  {
    id: "05",
    title: "Nexus",
    subtitle: "API Gateway",
    category: "Full Stack",
    tags: ["Go", "Docker", "Kubernetes"],
    year: "2023",
    description: "High-throughput API gateway handling 2M+ daily requests with sub-50ms median latency.",
    image: "/projects/nexus.jpg",
    size: "small",
    color: "#201a18",
  },
  {
    id: "06",
    title: "Cipher",
    subtitle: "Audit Tool",
    category: "Cybersecurity",
    tags: ["Python", "Bash", "OpenSSL"],
    year: "2022",
    description: "Automated security audit toolchain for penetration testing and compliance reporting.",
    image: "/projects/cipher.jpg",
    size: "small",
    color: "#18201c",
  },
];

// ─── Grain ──────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999]"
      style={{
        opacity: 0.032,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }}
    />
  );
}

// ─── Custom drag cursor ─────────────────────────────────────────────────────────
function DragCursor() {
  const [pos,     setPos    ] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [active,  setActive ] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed pointer-events-none z-[998] flex items-center justify-center"
          animate={{
            x: pos.x - (active ? 44 : 6),
            y: pos.y - (active ? 44 : 6),
            width: active ? 88 : 12,
            height: active ? 88 : 12,
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.4 }}
          style={{ borderRadius: "50%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: active ? INK : "transparent",
              border: active ? "none" : `1.5px solid rgba(26,26,26,0.5)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {active && (
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: CREAM,
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                View
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────────
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
      <Link
        href="/"
        style={{
          fontFamily: SERIF,
          fontSize: "15px",
          color: INK,
          letterSpacing: "0.02em",
          fontStyle: "italic",
          textDecoration: "none",
        }}
      >
        P.E
      </Link>

      <nav className="flex items-center gap-10">
        {[
          { label: "About",    href: "/about"    },
          { label: "Projects", href: "/projects" },
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
              color: href === "/projects" ? INK : "rgba(26,26,26,0.5)",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {label}
            {href === "/projects" && (
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-[#1a1a1a]"
                style={{ width: "100%" }}
              />
            )}
            {href !== "/projects" && (
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-[#1a1a1a] group-hover:w-full transition-all duration-300"
                style={{ width: 0 }}
              />
            )}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}

// ─── Hero title block ───────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section className="relative pt-40 pb-16 px-10 overflow-hidden">
      {/* Ghost large label behind */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center pointer-events-none select-none"
        style={{ paddingLeft: "2vw" }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(10rem, 28vw, 26rem)",
            fontWeight: 300,
            color: "rgba(26,26,26,0.04)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
          }}
        >
          Works
        </span>
      </div>

      <div className="relative z-10">
        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
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
            Selected Projects
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "rgba(26,26,26,0.25)",
            }}
          >
            — {PROJECTS.length} Works
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(3.5rem, 9vw, 9.5rem)",
              fontWeight: 300,
              color: INK,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              fontStyle: "italic",
            }}
          >
            All Projects
          </motion.h1>
        </div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-10 right-10 origin-left"
        style={{ height: "1px", backgroundColor: "rgba(26,26,26,0.1)" }}
      />
    </section>
  );
}

// ─── Individual project card ────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onMouseEnter,
  onMouseLeave,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const isLarge = project.size === "large";

  return (
    <motion.div
      ref={ref}
      className="project-card relative overflow-hidden cursor-none group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); onMouseEnter(); }}
      onMouseLeave={() => { setHovered(false); onMouseLeave(); }}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        aspectRatio: isLarge ? "16/9" : "4/5",
        borderRadius: "3px",
        backgroundColor: project.color,
      }}
    >
      {/* Image with parallax */}
      <motion.div
        style={{ y, width: "100%", height: "108%", position: "absolute", top: "-4%", left: 0 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Dark gradient always present at bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ backgroundColor: "rgba(26,26,26,0.22)" }}
      />

      {/* Bottom meta */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex items-end justify-between">
          {/* Left: index + title */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-2"
              animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "8px",
                  letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {project.id}
              </span>
              <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)" }} />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "8px",
                  letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                }}
              >
                {project.category}
              </span>
            </motion.div>

            <motion.h2
              animate={{ y: hovered ? -2 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: SERIF,
                fontSize: isLarge
                  ? "clamp(2rem, 4.5vw, 5rem)"
                  : "clamp(1.6rem, 3vw, 3.2rem)",
                fontWeight: 300,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                fontStyle: hovered ? "italic" : "normal",
                transition: "font-style 0s",
              }}
            >
              {project.title}
              <br />
              <span style={{ opacity: 0.6 }}>{project.subtitle}</span>
            </motion.h2>
          </div>

          {/* Right: year + arrow */}
          <div className="flex flex-col items-end gap-3">
            <motion.span
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {project.year}
            </motion.span>
            <motion.div
              animate={{
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : -8,
                rotate: hovered ? 0 : -45,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M5 11h12M12 5l6 6-6 6"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Tags — slide up on hover */}
        <motion.div
          className="flex flex-wrap gap-2 mt-3"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: MONO,
                fontSize: "7px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.18)",
                padding: "3px 7px",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Projects grid ──────────────────────────────────────────────────────────────
function ProjectsGrid() {
  const [cursorActive, setCursorActive] = useState(false);

  // Filter states
  const categories = ["All", "Full Stack", "Cybersecurity", "Data · iOS", "IT Support", "iOS Engineering"];
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section className="px-10 pb-28">
      {/* Filter bar */}
      <motion.div
        className="flex flex-wrap items-center gap-2 mb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: "2px",
              border: `1px solid ${activeFilter === cat ? INK : "rgba(26,26,26,0.18)"}`,
              backgroundColor: activeFilter === cat ? INK : "transparent",
              color: activeFilter === cat ? CREAM : "rgba(26,26,26,0.45)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {cat}
          </button>
        ))}

        <span
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "rgba(26,26,26,0.25)",
            marginLeft: "auto",
          }}
        >
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(0.75rem, 1.5vw, 1.5rem)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        className="flex items-center justify-center mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            style={{
              width: "1px",
              height: "48px",
              backgroundColor: "rgba(26,26,26,0.2)",
            }}
          />
          <span
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              letterSpacing: "0.5em",
              color: "rgba(26,26,26,0.3)",
              textTransform: "uppercase",
            }}
          >
            End of works
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Minimal footer ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="px-10 py-12 flex items-center justify-between"
      style={{ borderTop: "1px solid rgba(26,26,26,0.08)" }}
    >
      <span
        style={{
          fontFamily: SERIF,
          fontSize: "13px",
          color: "rgba(26,26,26,0.35)",
          fontStyle: "italic",
        }}
      >
        Pambi Egara
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: "9px",
          letterSpacing: "0.35em",
          color: "rgba(26,26,26,0.25)",
          textTransform: "uppercase",
        }}
      >
        © {new Date().getFullYear()}
      </span>
      <Link
        href="/"
        style={{
          fontFamily: MONO,
          fontSize: "9px",
          letterSpacing: "0.35em",
          color: "rgba(26,26,26,0.4)",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        Back to home ↑
      </Link>
    </footer>
  );
}

// ─── Root export ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <div className="bg-[#f5f2ec] min-h-screen" style={{ cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        ::selection {
          background: rgba(26,26,26,0.1);
          color: #1a1a1a;
        }

        /* Hide default cursor site-wide on projects page */
        * { cursor: none !important; }

        /* ── Mobile grid: single column ── */
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .project-card {
            grid-column: span 1 !important;
            aspect-ratio: 4/5 !important;
          }
          header {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
          section, footer {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }

        /* ── Tablet grid: 2 columns ── */
        @media (max-width: 1024px) and (min-width: 641px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .project-card[style*="span 2"] {
            grid-column: span 2 !important;
          }
        }
      `}</style>

      <Grain />
      <DragCursor />
      <Header />
      <PageHero />
      <ProjectsGrid />
      <Footer />
    </div>
  );
}