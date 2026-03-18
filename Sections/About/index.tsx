"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const images = [
  { src: "/img/about1.jpg", alt: "Training session 1" },
  { src: "/img/about2.avif", alt: "Training session 2" },
  { src: "/img/about3.jpg", alt: "Training session 3" },
];

const stats = [
  { value: "10+", label: "Exp Years" },
  { value: "5K+", label: "Members" },
];

function StatItem({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-0.5"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-3xl font-black text-white tracking-tight">
        {value}
      </span>
      <span className="text-xs font-semibold text-[#D5A310] uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const textInView = useInView(textRef, { once: true, margin: "-60px" });
  const imagesInView = useInView(imagesRef, { once: true, margin: "-60px" });
  const curveInView = useInView(curveRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imagesY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#111111] overflow-hidden min-h-screen flex flex-col justify-center py-16"
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header — tighter */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-2">
            About Us
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            More than just a gym — a community dedicated to your personal growth
            and physical well-being.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] lg:grid-cols-[1fr_72px_1fr] gap-6 md:gap-0 items-center">
          {/* LEFT — images */}
          <motion.div
            ref={imagesRef}
            className="flex flex-col gap-3 items-center md:items-start"
            style={{ y: imagesY }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-lg border border-white/5 shadow-xl ${
                  i === 0
                    ? "w-54 md:w-48 self-center md:self-center"
                    : i === 1
                      ? "w-54 md:w-48 self-center md:self-start"
                      : "w-54 md:w-48 self-center md:self-center"
                }`}
                initial={{ opacity: 0, x: -30, rotate: i % 2 === 0 ? -2 : 1 }}
                animate={
                  imagesInView
                    ? { opacity: 1, x: 0, rotate: i % 2 === 0 ? -1 : 0.5 }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.13,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  transition: { duration: 0.25 },
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full aspect-4/3 object-cover"
                />
                <div className="absolute inset-0 hover:bg-[#D5A310]/8 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* CENTER — SVG curve */}
          <div
            ref={curveRef}
            className="hidden md:flex items-center justify-center self-stretch"
          >
            <svg
              viewBox="0 0 60 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full max-h-80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="curveGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="400"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#D5A310" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#D5A310" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFFF" stopOpacity="1" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 30 0 C 30 0, 60 60, 30 120 C 0 180, 60 240, 30 310 C 15 350, 30 400, 30 400"
                stroke="url(#curveGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={curveInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* RIGHT — text */}
          <motion.div
            ref={textRef}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h3
              className="text-xl md:text-2xl lg:text-3xl font-black text-[#D5A310] leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Forged by Iron, <br className="hidden sm:block" />
              Fueled by Community
            </motion.h3>

            <motion.p
              className="text-white/50 text-xs md:text-sm leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.43, ease: "easeOut" }}
            >
              We believe that fitness is a lifelong journey. Our facility is
              designed to provide you with state-of-the-art equipment in an
              environment that feels like a second home.
            </motion.p>

            <motion.p
              className="text-white/35 text-xs md:text-sm leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.51, ease: "easeOut" }}
            >
              Whether you are taking your first steps towards a healthier
              lifestyle or you are a seasoned athlete pushing your limits, our
              expert trainers and supportive community are here to ensure you
              reach your goals.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="h-px bg-white/10"
              initial={{ scaleX: 0, originX: 0 }}
              animate={textInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.58, ease: "easeOut" }}
            />

            {/* Stats */}
            <div className="flex items-end gap-48 pt-1">
              {stats.map((stat, i) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={0.62 + i * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center top-5"
        >
          <img src="/img/dumbell-bg.svg" alt="" />
        </motion.div>
      </div>
    </section>
  );
}
