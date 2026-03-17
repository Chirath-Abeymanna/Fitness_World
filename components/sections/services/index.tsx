"use client";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Dumbbell, Users, HeartPulse, Activity } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Personal Training",
      description:
        "One-on-one coaching tailored to your specific goals, fitness level, and schedule.",
      icon: <Activity className="h-10 w-10 text-primary" />,
    },
    {
      title: "Group Classes",
      description:
        "High-energy sessions ranging from HIIT to Yoga, designed for all fitness levels.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Open Gym",
      description:
        "Access to our state-of-the-art equipment and facilities on your own schedule.",
      icon: <Dumbbell className="h-10 w-10 text-primary" />,
    },
    {
      title: "Nutrition Coaching",
      description:
        "Expert guidance to fuel your workouts and accelerate your fitness results.",
      icon: <HeartPulse className="h-10 w-10 text-primary" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="services"
      className="py-24 bg-background relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center items-start"
      >
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-2">
          OUR SERVICES
        </h1>
      </motion.div>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card/50 border-white/5 hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <div className="mb-4 bg-background/50 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground font-bold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
