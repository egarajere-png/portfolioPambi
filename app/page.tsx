"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroLoader from "@/app/components/introloader";
import NameReveal from "@/app/components/namereveal";
import HomeContent from "@/app/pages/homepage";


type Phase = "loading" | "name" | "home";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");

  return (
    <>
      {/* Google Fonts — add to layout.tsx <head> instead if preferred */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
      `}</style>

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <IntroLoader onComplete={() => setPhase("name")} />
          </motion.div>
        )}

        {phase === "name" && (
          <motion.div key="name">
            <NameReveal onFinish={() => setPhase("home")} />
          </motion.div>
        )}

        {phase === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <HomeContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}