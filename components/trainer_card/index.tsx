"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface TrainerCardProps {
  image: string;
  name: string;
  description: string;
  instagram?: string;
  facebook?: string;
  phone?: string;
  email?: string;
}

export function TrainerCard({
  image,
  name,
  description,
  instagram = "#",
  facebook = "#",
  phone = "#",
  email = "#",
}: TrainerCardProps) {
  const socials: SocialLink[] = [
    { icon: <Instagram size={20} />, href: instagram, label: "Instagram" },
    { icon: <Facebook size={20} />, href: facebook, label: "Facebook" },
    { icon: <Phone size={20} />, href: phone, label: "Phone" },
    { icon: <Mail size={20} />, href: email, label: "Email" },
  ];

  return (
    <motion.div
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-70 mx-auto"
    >
      <Card className="relative  overflow-hidden bg-[#1a1a1a] border border-[#D5A310]/40 rounded-2xl shadow-xl shadow-black/40">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover " />
          {/* Gradient fade into card body */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/10 to-transparent" />
        </div>

        <CardContent className="px-5 pb-5 pt-3 flex flex-col gap-3">
          {/* Name */}
          <h3 className="text-xl font-black text-[#D5A310] leading-tight">
            {name}
          </h3>

          {/* Description */}
          <p className="text-white/55 text-sm leading-relaxed">{description}</p>

          {/* Divider */}
          <div className="h-px bg-white/8 my-1" />

          {/* Socials */}
          <div className="flex items-center justify-center gap-6">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/40 hover:text-[#D5A310] transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
