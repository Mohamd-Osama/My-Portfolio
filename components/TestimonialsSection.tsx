'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 'khamast',
    platform: 'Khamsat.com',
    rating: 5,
    image: '/testimonials/Khamast 1.png',
    color: '#00d4ff',
  },
  {
    id: 'mostaql',
    platform: 'Mostaql.com',
    rating: 5,
    image: '/testimonials/Mostaql 1.png',
    color: '#10b981',
  },
  {
    id: 'client',
    platform: 'Client Review',
    rating: 5,
    image: '/testimonials/photo_2026-06-26_10-09-24.jpg',
    color: '#818cf8',
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section id="experience" className="py-24 relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--glass-border)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Quote size={14} style={{ color: 'var(--accent)' }} />
            <span className="tag-badge">Social Proof</span>
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">
            Client Testimonials
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Feedback from clients on freelancing platforms.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto">
          <div
            className="glass-card rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${t.color}25`,
              boxShadow: `0 0 40px ${t.color}08`,
            }}
          >
            {/* Platform header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: `${t.color}20`, background: `${t.color}06` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: t.color }}
                />
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {t.platform}
                </span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} fill={t.color} style={{ color: t.color }} />
                ))}
              </div>
            </div>

            {/* Screenshot */}
            <div
              className="relative"
              style={{ paddingBottom: '65%', background: '#0d1117' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      next();
                    } else if (swipe > swipeConfidenceThreshold) {
                      prev();
                    }
                  }}
                >
                  <Image
                    src={t.image}
                    alt={`${t.platform} testimonial`}
                    fill
                    className="object-contain p-3 pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 700px"
                    quality={100}
                    unoptimized={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl flex items-center justify-center glass-card transition-all hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? 'var(--accent)' : 'var(--glass-border)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl flex items-center justify-center glass-card transition-all hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
