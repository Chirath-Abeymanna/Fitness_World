"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";

export function Plans() {
  const plans = [
    {
      name: "Starter",
      price: "LKR 2000.00",
      period: "per month",
      description: "Perfect for beginners starting their journey.",
      features: [
        "Full Open Gym Access",
        "Locker Room Access",
        "1 Free Assessment",
        "Community App Access",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "LKR 5900.00",
      period: "per month",
      description: "For dedicated members who want more.",
      features: [
        "Everything in Basic",
        "Unlimited Group Classes",
        "1 PT Session / Month",
        "Nutrition Guide",
        "Suana Access",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "LKR 9900.00",
      period: "per month",
      description: "The ultimate fitness experience.",
      features: [
        "Everything in Pro",
        "4 PT Sessions / Month",
        "Custom Meal Plans",
        "Priority Booking",
        "Guest Passes",
      ],
      popular: false,
    },
  ];

  return (
    <section id="plans" className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-2">
            Membership Plans
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Choose the plan that fits your lifestyle and fitness goals. No
            hidden fees, just pure value to help you succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                className={`relative h-full flex flex-col ${plan.popular ? "bg-background border-primary shadow-lg shadow-primary/20 scale-105 z-10 overflow-visible" : "bg-card/50 border-white/5"}`}
              >
                {plan.popular && (
                  <div className="absolute  top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="grow pt-4">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-black text-white">
                      {plan.price}
                    </span>{" "}
                    <br />
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full font-bold ${plan.popular ? "" : "bg-secondary hover:bg-secondary/80 text-foreground"}`}
                  >
                    Choose {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
