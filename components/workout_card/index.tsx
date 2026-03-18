"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ChevronRight, ChevronDown } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface Day {
  day: string;
  focus: string;
  exercises: Exercise[];
}

interface WorkoutCardProps {
  image: string;
  title: string;
  frequency: string;
  description: string;
  days: Day[];
  difficulty?: string;
  duration?: string;
}

function DayAccordion({ day, index }: { day: Day; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#D5A310]/60 w-5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="text-left">
            <p className="text-sm font-bold text-white leading-none">
              {day.day}
            </p>
            <p className="text-[10px] text-[#D5A310] font-mono uppercase tracking-widest mt-0.5">
              {day.focus}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={15} className="text-white/30" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-3 pt-2">
              {day.exercises.map((ex, i) => (
                <motion.div
                  key={i}
                  className="flex items-start justify-between gap-4 px-3 py-2.5 rounded-lg border border-white/5 bg-black/20 hover:border-[#D5A310]/20 transition-colors duration-200"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[9px] font-mono text-[#D5A310]/40 mt-0.5 w-4 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white leading-tight">
                        {ex.name}
                      </p>
                      {ex.notes && (
                        <p className="text-[10px] text-white/30 mt-0.5 leading-snug">
                          {ex.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-bold text-white">
                      {ex.sets}×{ex.reps}
                    </span>
                    <span className="text-[9px] text-white/25">
                      Rest {ex.rest}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WorkoutCard({
  image,
  title,
  frequency,
  description,
  days,
  difficulty = "Intermediate",
  duration = "60 min",
}: WorkoutCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        className="relative w-full min-h-88 rounded-xl overflow-hidden border border-[#D5A310]/20 bg-card/25 select-none"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="relative h-36 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/10 to-transparent" />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm border border-[#D5A310]/40 rounded-full px-2 py-0.5">
            <span className="text-[9px] font-mono text-[#D5A310] uppercase tracking-widest">
              {difficulty}
            </span>
          </div>
        </div>

        <div className="relative px-3 pb-3 pt-2 flex flex-col gap-2">
          <h3 className="text-sm font-black text-[#D5A310] leading-tight line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center justify-end gap-1.5 text-white/40">
            <Clock size={11} />
            <span className="text-[10px]">{frequency}</span>
          </div>
          <p className="text-white/50 text-[11px] leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-1">
            {days.slice(0, 3).map((d, i) => (
              <span
                key={i}
                className="text-[8px] font-mono text-white/25 border border-white/8 rounded-full px-1.5 py-0.5 uppercase tracking-wider"
              >
                {d.focus}
              </span>
            ))}
            {days.length > 3 && (
              <span className="text-[8px] font-mono text-[#D5A310]/40 border border-[#D5A310]/15 rounded-full px-1.5 py-0.5">
                +{days.length - 3}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-6 right-4 flex items-center gap-1 text-white/70 font-semibold text-sm hover:text-[#D5A310] transition-colors duration-200 group"
        >
          View Full Workout
          <ChevronRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          />
        </button>
      </motion.div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div className="fixed inset-0 z-9999 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="relative w-full max-w-5xl max-h-[70vh] rounded-2xl border border-[#D5A310]/30 bg-[#111] pointer-events-auto flex flex-col md:flex-row overflow-hidden"
                initial={{ opacity: 0, scale: 0.92, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 32 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* ── LEFT: Image column ── */}
                <div className="relative md:w-64 lg:w-72 shrink-0 h-56 md:h-auto overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Gradient — bottom on mobile, right on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111] via-[#111]/20 to-transparent" />

                  {/* Gold accent line — bottom on mobile, right on desktop */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-[2px] md:h-full bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[#D5A310] to-transparent" />

                  {/* Difficulty badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-[#D5A310]/40 rounded-full px-2.5 py-1">
                    <span className="text-[9px] font-mono text-[#D5A310] uppercase tracking-widest">
                      {difficulty}
                    </span>
                  </div>

                  {/* Stats overlaid on image bottom */}
                  <div className="absolute bottom-4 left-4 right-4 hidden md:flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock size={12} />
                      <span className="text-xs">{frequency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                        Duration
                      </span>
                      <span className="text-xs font-bold text-white">
                        {duration}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      {days.length} day plan
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Content column ── */}
                <div className="flex flex-col flex-1 min-h-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3 shrink-0">
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-[#D5A310] leading-tight mb-1">
                        {title}
                      </h2>
                      {/* Mobile-only meta */}
                      <div className="flex md:hidden items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-white/50">
                          <Clock size={11} />
                          <span className="text-[10px]">{frequency}</span>
                        </div>
                        <span className="text-[9px] font-mono text-[#D5A310] border border-[#D5A310]/30 rounded-full px-2 py-0.5 uppercase tracking-widest">
                          {difficulty}
                        </span>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                          {days.length} day plan
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      className="w-8 h-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-[#D5A310]/50 hover:text-[#D5A310] transition-all duration-200"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <p className="text-white/50 text-xs leading-relaxed px-5 pb-4 shrink-0">
                    {description}
                  </p>

                  {/* Divider */}
                  <div className="flex items-center gap-3 px-5 pb-4 shrink-0">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.25em]">
                      Weekly Plan
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Scrollable days */}
                  <div className="overflow-y-auto flex-1 px-5 pb-5">
                    <div className="flex flex-col gap-3">
                      {days.map((day, i) => (
                        <DayAccordion key={i} day={day} index={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
