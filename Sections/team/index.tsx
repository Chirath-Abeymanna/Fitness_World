"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrainerCard } from "@/components/trainer_card";

const trainers = [
  {
    image: "/img/trainers/trainer1.jpg",
    name: "Kasun Perera",
    role: "Head Strength Coach",
    description:
      "Kasun brings 10+ years of competitive powerlifting experience, specializing in strength programming and athletic performance for all levels.",
    instagram: "#",
    facebook: "#",
    phone: "tel:-",
    email: "mailto:kasun@gym.com",
  },
  {
    image: "/img/trainers/trainer2.jpg",
    name: "Nimasha Fernando",
    role: "Nutrition & Wellness Coach",
    description:
      "Nimasha is a certified nutritionist and yoga instructor dedicated to helping clients build sustainable, healthy lifestyles from the inside out.",
    instagram: "#",
    facebook: "#",
    phone: "tel:-",
    email: "mailto:nimasha@gym.com",
  },
  {
    image: "/img/trainers/trainer3.avif",
    name: "Dinesh Rajapaksa",
    role: "HIIT & Conditioning Specialist",
    description:
      "Dinesh is a former national-level sprinter turned fitness coach, known for his high-energy HIIT sessions and athletic conditioning programs.",
    instagram: "#",
    facebook: "#",
    phone: "tel:-",
    email: "mailto:dinesh@gym.com",
  },
  {
    image: "/img/trainers/trainer4.jpg",
    name: "Sachini Wijesinghe",
    role: "Mobility & Recovery Coach",
    description:
      "Sachini specializes in mobility training and injury prevention, helping athletes move better and recover faster between sessions.",
    instagram: "#",
    facebook: "#",
    phone: "tel:-",
    email: "mailto:sachini@gym.com",
  },
];

export function Team() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section
      id="team"
      className=" relative py-24 bg-background  overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0"
        style={{
          backgroundImage: "url('img/handshake.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          opacity: 0.2,
        }}
      />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-14">
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
              Our Team
            </motion.h2>
          </div>

          <motion.p
            className="text-white/40 text-sm md:text-base max-w-2xl pb-5 mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Our expert trainers are here to guide, motivate, and push you to
            become your best self.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10"
        >
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.05 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TrainerCard
                image={trainer.image}
                name={trainer.name}
                description={trainer.description}
                instagram={trainer.instagram}
                facebook={trainer.facebook}
                phone={trainer.phone}
                email={trainer.email}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
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
