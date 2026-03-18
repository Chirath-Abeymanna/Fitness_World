"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── VIDEO ── */}
      {/* Mobile: full-screen background | Desktop: centered tilted card */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -38 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full h-full md:w-auto md:h-auto"
        >
          {/* Mobile: fills screen | Desktop: tilted card */}
          <div className="relative w-full h-screen lg:w-70 md:h-auto md:rotate-[-32deg] md:rounded-2xl overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover brightness-150"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            {/* Heavier overlay on mobile for text legibility */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── MOBILE CONTENT ── shown only on small screens */}
      <motion.div
        className="relative z-10 flex md:hidden flex-col items-center justify-center text-center px-8 gap-6 min-h-screen"
        style={{ y: textY }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {["YOUR", "BEST", "SELF"].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                className={`text-7xl font-bold tracking-tighter uppercase leading-none ${
                  word === "BEST" ? "text-[#1c1c1c]" : "text-white"
                }`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {["STARTS", "HERE"].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                className={`text-7xl font-bold tracking-tighter uppercase leading-none ${
                  word === "STARTS" ? "text-white/20" : "text-white/10"
                }`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 1.0 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-sm text-white/50 max-w-xs leading-relaxed mt-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          Master your fitness journey with the right tools and a community that
          supports your pace.
        </motion.p>
      </motion.div>

      <motion.div
        className="container relative z-10 mx-auto px-6 w-full max-w-8xl hidden md:block"
        style={{ y: textY }}
      >
        <div className="flex flex-row items-center justify-between w-full min-h-[60vh] gap-8">
          <motion.div className="flex flex-col items-start">
            {["YOUR", "BEST", "SELF"].map((word, i) => (
              <div key={word} className="overflow-hidden pb-1">
                <motion.h1
                  className={`text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-none pb-5 ${
                    word === "YOUR"
                      ? "text-white ml-0 mt-5"
                      : word === "BEST"
                        ? "text-[#414141] ml-12 lg:ml-56"
                        : "text-white ml-16 md:ml-80"
                  }`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + i * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </motion.div>

          <motion.div className="flex flex-col items-end mt-24 lg:mt-32 pr-5">
            {["STARTS", "HERE"].map((word, i) => (
              <div key={word} className="overflow-hidden pb-1">
                <motion.h1
                  className={`text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-none pb-5 ${
                    word === "STARTS"
                      ? "text-white pr-20"
                      : "text-[#564424] mr-12 md:mr-12"
                  }`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 1.04 + i * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mt-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
        >
          Master your fitness journey with the right tools and a community that
          supports your pace.
        </motion.p>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#D5A310] z-10 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
        <span className="text-xs font-mono tracking-widest uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
