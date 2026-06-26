'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Code2, BarChart3, Database, FileSpreadsheet, Globe } from 'lucide-react';
import { projects, type Project } from '@/lib/projects';
import ProjectModal from './ProjectModal';

const categoryIcons: Record<string, React.ReactNode> = {
  'SQL · Power BI': <Database size={16} />,
  'SQL · SSIS · Power BI': <Database size={16} />,
  'Power BI · DAX': <BarChart3 size={16} />,
  'SQL · Advanced Analytics': <Code2 size={16} />,
  'Python · EDA': <Code2 size={16} />,
  'Excel · VBA': <FileSpreadsheet size={16} />,
  'Power BI · Analytics': <Globe size={16} />,
};

// Placeholder when no cover image
function NoCoverPlaceholder({ color, title }: { color: string; title: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}
    >
      <Code2 size={40} style={{ color, opacity: 0.5 }} />
      <span className="text-xs font-mono font-medium px-3 text-center" style={{ color, opacity: 0.7 }}>
        {title}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeInOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
      style={{ border: `1px solid ${project.accentColor}20` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Open ${project.title} project`}
    >
      {/* Cover image */}
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: '56.25%' /* 16:9 */ }}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
            unoptimized={true}
          />
        ) : (
          <NoCoverPlaceholder color={project.accentColor} title={project.title} />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${project.accentColor}15`, backdropFilter: 'blur(2px)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm"
            style={{
              background: 'rgba(2,8,23,0.85)',
              color: project.accentColor,
              border: `1px solid ${project.accentColor}50`,
            }}
          >
            <ExternalLink size={14} />
            View Details
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: 'rgba(2,8,23,0.8)',
              color: project.accentColor,
              border: `1px solid ${project.accentColor}40`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {categoryIcons[project.category]}
            {project.category}
          </span>
        </div>

        {/* Image count badge */}
        {project.images.length > 0 && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-mono"
            style={{
              background: 'rgba(2,8,23,0.8)',
              color: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.images.length} screens
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-display font-bold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>
        <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {project.subtitle}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-medium"
              style={{
                background: `${project.accentColor}10`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}20`,
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              className="px-2 py-0.5 rounded text-[10px] font-medium"
              style={{ color: 'var(--text-muted)', background: 'var(--accent-dim)' }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
      />
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)', animation: 'pulse 2s infinite' }} />
              <span className="tag-badge">Data Lab Showcase</span>
            </div>
            <h2 className="section-heading text-4xl sm:text-5xl mb-4">
              Featured Projects
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              End-to-end analytics solutions spanning SQL, Power BI, Python, and Excel VBA —
              each delivering measurable business impact.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
