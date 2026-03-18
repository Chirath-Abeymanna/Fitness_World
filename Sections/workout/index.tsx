"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { SearchBox } from "@/components/SearchBox";
import workouts from "@/data/workout_data.json";
import { WorkoutCard } from "@/components/workout_card";
import { Search } from "lucide-react";

export function WorkOut() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkouts = workouts.filter((w) =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const slideY = useTransform(scrollYProgress, [0.8, 1], [0, -60]);
  const fadeOut = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="workouts"
      className="relative bg-[#111111] overflow-hidden py-20"
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-[#D5A310]/5 blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10"
        style={{ y: slideY, opacity: fadeOut }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div ref={headingRef} className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-px w-8 bg-[#D5A310]" />
              <span className="text-[#D5A310] text-xs font-mono tracking-[0.3em] uppercase">
                Training Plans
              </span>
              <div className="h-px w-8 bg-[#D5A310]" />
            </motion.div>

            <div className="overflow-hidden mb-3">
              <motion.h2
                className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white"
                initial={{ y: "100%" }}
                animate={headingInView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Workouts For <span className="text-[#D5A310]">You</span>
              </motion.h2>
            </div>

            <motion.p
              className="text-white/40 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              These workout plans are crafted by our experts for a healthier
              lifestyle.
            </motion.p>
          </div>

          {/* Search */}
          <motion.div
            className="flex justify-center md:justify-end mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchBox
              placeholder="Search workouts"
              onSearch={setSearchQuery}
            />
          </motion.div>

          {/* Grid — grows with content */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredWorkouts.length === 0 ? (
                <motion.div
                  key="empty"
                  layout
                  className="col-span-full flex flex-col items-center justify-center gap-3 py-16 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Search className="text-white/20" size={36} />
                  <p className="text-white/50 text-sm font-medium">
                    No workouts found for{" "}
                    <span className="text-[#D5A310]">"{searchQuery}"</span>
                  </p>
                  <p className="text-white/25 text-xs">
                    Try a different keyword
                  </p>
                </motion.div>
              ) : (
                filteredWorkouts.map((workout, i) => (
                  <motion.div
                    key={workout.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={gridInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{
                      duration: 0.5,
                      delay: gridInView ? 0.05 + i * 0.08 : 0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <WorkoutCard
                      image={workout.image}
                      title={workout.title}
                      frequency={workout.frequency}
                      description={workout.description}
                      days={workout.days}
                      difficulty={workout.difficulty}
                      duration={workout.duration}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
