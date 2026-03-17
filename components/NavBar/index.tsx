"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home", number: "01" },
  { href: "#about", label: "About", number: "02" },
  { href: "#services", label: "Services", number: "03" },
  { href: "#workouts", label: "Work Outs", number: "04" },
  { href: "#plans", label: "Plans", number: "05" },
  { href: "#team", label: "Team", number: "06" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary">
            <img src="/logo.jpg" alt="Logo" className="w-14 h-14 rounded-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-20">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:flex rounded-full px-8 font-semibold" >
              <Link href="#contact">Get In Touch</Link>
            </Button>

            {/* Hamburger — mobile only */}
            <button
  className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/40 text-white hover:bg-white/10 transition-all duration-200"
  onClick={() => setOpen((prev) => !prev)}
  aria-label="Toggle menu"
>
  <AnimatePresence mode="wait">
    {open ? (
      <motion.span
        key="close"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        <X size={18} strokeWidth={2.5} color="#ffffff" />
      </motion.span>
    ) : (
      <motion.span
        key="menu"
        initial={{ rotate: 90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        <Menu size={18} strokeWidth={2.5} color="#ffffff" />
      </motion.span>
    )}
  </AnimatePresence>
</button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-80 md:hidden flex flex-col overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-[#0a0a0a]/95 border-l border-white/6" />

              {/* Gold accent line at top */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#D5A310] to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              />

              {/* Content */}
              <div className="relative flex flex-col h-full px-8 pt-24 pb-10">

                {/* Nav links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map(({ href, label, number }, i) => (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2 + i * 0.07,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between py-4 border-b border-white/[0.06] hover:border-[#D5A310]/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-mono text-white/20 group-hover:text-[#D5A310]/60 transition-colors duration-300">
                            {number}
                          </span>
                          <span className="text-xl font-bold uppercase tracking-tight text-white/70 group-hover:text-white transition-colors duration-300">
                            {label}
                          </span>
                        </div>
                        <motion.span
                          className="text-white/0 group-hover:text-[#D5A310] text-lg transition-colors duration-300"
                          whileHover={{ x: 4 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom section */}
                <div className="mt-auto flex flex-col gap-5">
                  {/* Divider */}
                  <div className="h-px bg-white/[0.06]" />

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                  >
                    <Button
                      className="w-full rounded-full font-semibold h-12 text-sm tracking-wide"
                      
                    >
                      <Link href="#contact" onClick={() => setOpen(false)}>
                        Get In Touch
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Footer note */}
                  <motion.p
                    className="text-[10px] text-center font-mono text-white/15 tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    Your Best Self Starts Here
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}