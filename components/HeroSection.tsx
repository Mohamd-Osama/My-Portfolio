'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, ChevronDown, Database, BarChart2, Code2 } from 'lucide-react';
import Image from 'next/image';
import CVModal from './CVModal';

const roles = [
  'Data Analyst',
  'Power BI Developer',
  'SQL Developer',
  'Business Intelligence Engineer',
];

const stats = [
  { label: 'Projects Delivered', value: '7+', icon: <BarChart2 size={15} /> },
  { label: 'SQL Queries Written', value: '100+', icon: <Database size={15} /> },
  { label: 'Dashboards Built', value: '12+', icon: <Code2 size={15} /> },
];

export default function HeroSection() {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(
          () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
          80
        );
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIdx]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } as any },
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-24 md:pt-28"
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)',
          }}
        />
        {/* Ambient blobs */}
        <div
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* ── LEFT: Text Content ── */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              {/* Lab label */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent)', animation: 'pulse 2s infinite' }}
                />
                <span className="tag-badge">Digital Insight Lab</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="font-display font-bold leading-tight mb-3"
                style={{
                  fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                  color: 'var(--text-primary)',
                }}
              >
                Mohamed
                <br />
                <span className="gradient-text">Osama</span>
              </motion.h1>

              {/* Role */}
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 } as any}
                className="font-mono text-xl sm:text-2xl mb-5 flex items-center gap-0 justify-center lg:justify-start"
                style={{ color: 'var(--accent)', minHeight: '2rem' }}
              >
                <span>Data Analyst & BI Developer</span>
              </motion.div>

              {/* Bio */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ color: 'var(--text-secondary)' }}
              >
                Senior Computer Science student at{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  Assiut University
                </span>{' '}
                with a profound passion for Data Analytics and Business Intelligence. Specializing in
                delivering{' '}
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  end-to-end data solutions
                </span>{' '}
                that save time and boost operational efficiency.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <a
                  id="download-cv-btn"
                  href="/profile/cv.pdf"
                  download="Mohamed_Osama_CV.pdf"
                  className="btn-primary"
                >
                  <Download size={16} />
                  Download CV
                </a>
                <button
                  id="view-cv-btn"
                  className="btn-outline"
                  onClick={() => setCvModalOpen(true)}
                >
                  <Eye size={16} />
                  View CV
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div
                      className="flex items-center gap-1.5 justify-center lg:justify-start mb-1"
                      style={{ color: 'var(--accent)' }}
                    >
                      {stat.icon}
                      <span className="font-display font-bold text-2xl">{stat.value}</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Photo + Logo ── */}
            <motion.div
              variants={itemVariants}
              className="relative flex-shrink-0 flex flex-col items-center gap-6"
            >
              {/* Personal Photo — primary visual */}
              <div className="relative">
                {/* Spinning accent ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #00d4ff 0%, transparent 40%, #7c3aed 60%, transparent 80%, #00d4ff 100%)',
                    animation: 'spin 14s linear infinite',
                    padding: '2px',
                    borderRadius: '50%',
                    filter: 'blur(1px)',
                  }}
                />
                {/* Photo circle */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' } as any}
                  className="relative w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full overflow-hidden"
                  style={{
                    border: '3px solid rgba(0,212,255,0.4)',
                    boxShadow:
                      '0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(0,212,255,0.08), inset 0 0 30px rgba(0,212,255,0.04)',
                  }}
                >
                  <Image
                    src="/profile/photo.png"
                    alt="Mohamed Osama — Data Analyst"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 320px, 460px"
                    quality={100}
                    unoptimized={true}
                  />
                </motion.div>

                {/* Floating SQL badge */}
                <motion.div
                  className="absolute -right-8 top-10 glass-card rounded-xl px-4 py-2.5 flex items-center gap-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } as any}
                  style={{ border: '1px solid rgba(0,212,255,0.3)' }}
                >
                  <Database size={15} style={{ color: 'var(--accent)' }} />
                  <span
                    className="text-sm font-mono font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    SQL
                  </span>
                </motion.div>

                {/* Floating Python badge */}
                <motion.div
                  className="absolute -left-6 top-1/4 glass-card rounded-xl px-4 py-2.5 flex items-center gap-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 } as any}
                  style={{ border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  <Code2 size={15} style={{ color: '#f59e0b' }} />
                  <span
                    className="text-sm font-mono font-semibold"
                    style={{ color: '#f59e0b' }}
                  >
                    Python
                  </span>
                </motion.div>

                {/* Floating Power BI badge */}
                <motion.div
                  className="absolute -left-8 bottom-12 glass-card rounded-xl px-4 py-2.5 flex items-center gap-2"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 } as any}
                  style={{ border: '1px solid rgba(124,58,237,0.35)' }}
                >
                  <BarChart2 size={15} style={{ color: '#818cf8' }} />
                  <span className="text-sm font-mono font-semibold" style={{ color: '#818cf8' }}>
                    Power BI
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity } as any}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Explore Projects
            </span>
            <ChevronDown size={18} style={{ color: 'var(--accent)' }} />
          </a>
        </motion.div>
      </section>

      <CVModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </>
  );
}
