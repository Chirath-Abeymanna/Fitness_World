"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contactForm";

const contactDetails = [
  { icon: MapPin, label: "Location", value: "23 Fitness Ave, Colombo 06" },
  { icon: Phone, label: "Phone", value: "+94 11 3445 345" },
  { icon: Mail, label: "Email", value: "info@fitnessworld.com" },
];

export function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const leftInView = useInView(leftRef, { once: true, margin: "-60px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-60px" });
  const curveInView = useInView(curveRef, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      className="relative bg-background overflow-hidden min-h-screen flex flex-col justify-center py-16"
    >
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
            Get In Touch
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Ready to start? Have questions? Drop us a message or visit our
            facility.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] lg:grid-cols-[1fr_72px_1fr] gap-6 md:gap-0 items-center">
          <motion.div className="flex flex-col gap-3 items-center md:items-start">
            <motion.div
              ref={leftRef}
              className="flex flex-col gap-8 w-full lg:flex-1 lg:pr-12"
              initial={{ opacity: 0, x: -40 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div>
                <h3 className="text-xl font-black text-[#D5A310] mb-2">
                  Contact Information
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D5A310]/10 border border-[#D5A310]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#D5A310]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {label}
                      </p>
                      <p className="text-sm text-white/40">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* CENTER — SVG curve */}
          <div
            ref={curveRef}
            className="hidden md:flex items-center justify-center self-stretch"
          >
            <svg
              viewBox="0 0 60 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full max-h-[250px]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="curveGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="300"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#D5A310" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#D5A310" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFFF" stopOpacity="1" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 30 0 C 30 0, 60 45, 30 90 C 0 135, 60 195, 30 240 C 15 265, 30 300, 30 300"
                stroke="url(#curveGradient)"
                strokeWidth="3.0"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={curveInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* RIGHT — form */}
          <motion.div className="w-full h-full">
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
