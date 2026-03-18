"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/service_card";
import services from "@/data/services_data.json";
import { Search } from "lucide-react";

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const kettleTopY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const kettleBottomY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* ── Kettlebell decorations ── */}
      <motion.div
        className="absolute top-0 left-0  pointer-events-none"
        style={{ y: kettleTopY }}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="img/kettlebell-up.svg" alt="" className="" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0  pointer-events-none"
        style={{ y: kettleBottomY }}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="img/kettlebell-down.svg" alt="" />
      </motion.div>

      {/* ── Ambient glow ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full bg-[#D5A310]/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-6">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-px w-8 bg-[#D5A310]" />
            <span className="text-[#D5A310] text-xs font-mono tracking-[0.3em] uppercase">
              What We Offer
            </span>
            <div className="h-px w-8 bg-[#D5A310]" />
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white"
              initial={{ y: "100%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Our Services
            </motion.h2>
          </div>

          <motion.p
            className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Comprehensive fitness solutions designed to elevate your performance
            and well-being.
          </motion.p>
        </div>

        {/* ── Search ── */}
        <motion.div
          className="flex justify-center md:justify-end mb-12"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchBox placeholder="Search services" onSearch={setSearchQuery} />
        </motion.div>

        {/* ── Cards grid — wraps ServiceCard as-is in an animated wrapper ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.length === 0 ? (
              <motion.div
                className="col-span-full flex flex-col items-center justify-center gap-3 py-16 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Search className="text-white/20" size={36} />
                <p className="text-white/50 text-sm font-medium">
                  No services found for{" "}
                  <span className="text-[#D5A310]">"{searchQuery}"</span>
                </p>
                <p className="text-white/25 text-xs">Try a different keyword</p>
              </motion.div>
            ) : (
              filteredServices.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className=" transition-transform duration-300"
                >
                  <ServiceCard
                    header={service.title}
                    details={service.description}
                    buttonText="Inquire Now"
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom rule ── */}
        <motion.div
          className="mt-16 h-px w-full"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            background:
              "linear-gradient(to right, transparent, #D5A310 40%, #D5A310 60%, transparent)",
          }}
        />
      </div>
    </section>
  );
}
