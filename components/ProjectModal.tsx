'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Code2, Terminal } from 'lucide-react';
import type { Project, ProjectCodeLab } from '@/lib/projects';
import CodeBlock from './CodeBlock';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [activeLabIdx, setActiveLabIdx] = useState(0);
  const hasImages = project.images.length > 0;
  const hasCodeLabs = project.codeLabs && project.codeLabs.length > 0;

  const prev = () =>
    setImgIdx((i) => (i === 0 ? project.images.length - 1 : i - 1));
  const next = () =>
    setImgIdx((i) => (i === project.images.length - 1 ? 0 : i + 1));

  // Use codeLabs if available, fall back to single codeSnippet
  const labs: ProjectCodeLab[] = hasCodeLabs
    ? project.codeLabs!
    : project.codeSnippet
    ? [
        {
          label: project.codeSnippet.label,
          language: project.codeSnippet.language,
          code: project.codeSnippet.code,
        },
      ]
    : [];

  const hasCode = labs.length > 0;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90]"
        style={{ background: 'rgba(2,8,23,0.9)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed inset-3 sm:inset-5 lg:inset-7 z-[91] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--bg-primary)',
          border: `1px solid ${project.accentColor}35`,
          boxShadow: `0 0 80px ${project.accentColor}15, 0 30px 80px rgba(0,0,0,0.6)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex items-start justify-between p-5 border-b flex-shrink-0"
          style={{ borderColor: `${project.accentColor}20`, background: 'var(--bg-secondary)' }}
        >
          <div className="flex-1 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="tag-badge"
                style={{
                  color: project.accentColor,
                  background: `${project.accentColor}12`,
                  borderColor: `${project.accentColor}30`,
                }}
              >
                {project.category}
              </span>
              <span className="tag-badge">{project.role}</span>
            </div>
            <h2
              className="font-display font-bold text-xl sm:text-2xl lg:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-red-500/10"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
            aria-label="Close project"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-7">

          {/* ── Image Gallery ── */}
          {hasImages && (
            <div className="space-y-3">
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ aspectRatio: '16/9', background: '#0d1117' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.images[imgIdx].src}
                      alt={project.images[imgIdx].alt}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      quality={100}
                      unoptimized={true}
                    />
                  </motion.div>
                </AnimatePresence>

                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(2,8,23,0.75)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(2,8,23,0.75)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className="rounded-full transition-all"
                          style={{
                            width: i === imgIdx ? '20px' : '6px',
                            height: '6px',
                            background: i === imgIdx ? project.accentColor : 'rgba(255,255,255,0.3)',
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-2 text-xs"
                  style={{ background: 'linear-gradient(transparent, rgba(2,8,23,0.8))', color: 'rgba(255,255,255,0.65)' }}
                >
                  {project.images[imgIdx].alt} · {imgIdx + 1}/{project.images.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all"
                      style={{
                        border: i === imgIdx ? `2px solid ${project.accentColor}` : '2px solid transparent',
                        opacity: i === imgIdx ? 1 : 0.5,
                      }}
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover" quality={100} unoptimized={true} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── 2-column: Overview + Tech ── */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Overview + Highlights */}
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  Project Overview
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.overview}
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
                  Key Highlights
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="font-display font-semibold text-base sm:text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border"
                    style={{
                      background: `${project.accentColor}10`,
                      color: project.accentColor,
                      borderColor: `${project.accentColor}28`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Code Labs (multi-tab) ── */}
          {hasCode && (
            <div className="space-y-4">
              {/* Section header */}
              <div className="flex items-center gap-2">
                <Terminal size={16} style={{ color: project.accentColor }} />
                <h3 className="font-display font-semibold text-base sm:text-lg" style={{ color: 'var(--text-primary)' }}>
                  {labs.length > 1 ? 'Code Labs' : 'Code Spotlight'}
                </h3>
                {labs.length > 1 && (
                  <span className="tag-badge" style={{ color: project.accentColor, background: `${project.accentColor}10`, borderColor: `${project.accentColor}30` }}>
                    {labs.length} Labs
                  </span>
                )}
              </div>

              {/* Tab selector (only if multiple labs) */}
              {labs.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {labs.map((lab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveLabIdx(i)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        background: i === activeLabIdx ? `${project.accentColor}18` : 'var(--accent-dim)',
                        color: i === activeLabIdx ? project.accentColor : 'var(--text-muted)',
                        border: `1px solid ${i === activeLabIdx ? `${project.accentColor}40` : 'var(--glass-border)'}`,
                      }}
                    >
                      <Code2 size={11} />
                      {lab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Active Lab Code Block */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLabIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CodeBlock
                    code={labs[activeLabIdx].code}
                    language={labs[activeLabIdx].language}
                    label={labs[activeLabIdx].label}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Note for no-image SQL/Python projects */}
              {!hasImages && (
                <div
                  className="rounded-xl px-4 py-3 text-xs flex items-start gap-2"
                  style={{ background: `${project.accentColor}08`, border: `1px solid ${project.accentColor}20`, color: 'var(--text-secondary)' }}
                >
                  <Code2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: project.accentColor }} />
                  <span>
                    These queries were written and executed against the HR schema database. Results were verified against expected business logic before delivery.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
