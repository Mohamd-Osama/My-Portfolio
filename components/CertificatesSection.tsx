'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink } from 'lucide-react';

const certificates = [
  {
    id: 'datapill',
    title: 'Data Pill Certificate',
    issuer: 'Data Pill',
    image: '/certificates/Data Pill Certificate.png',
    pdf: '/certificates/Data Pill Certificate.pdf',
    color: '#00d4ff',
  },
  {
    id: 'nasa',
    title: 'NASA Space Apps Challenge',
    issuer: 'NASA',
    image: '/certificates/NASA Space Apps Challenge.png',
    pdf: '/certificates/NASA Space Apps Challenge.pdf',
    color: '#818cf8',
  },
  {
    id: 'nti',
    title: 'NTI Data Analysis Certificate',
    issuer: 'National Telecommunication Institute',
    image: '/certificates/NTI Data Analysis Certificate.png',
    pdf: '/certificates/NTI Data Analysis Certificate.pdf',
    color: '#10b981',
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-24 relative" style={{ background: 'var(--bg-secondary)' }}>
      {/* Subtle divider line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--glass-border)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Award size={14} style={{ color: 'var(--accent)' }} />
            <span className="tag-badge">Credentials</span>
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">
            Certificates & Awards
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Recognized achievements and professional development milestones.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl overflow-hidden group"
              style={{ border: `1px solid ${cert.color}20` }}
            >
              {/* Certificate image preview */}
              <div
                className="relative overflow-hidden"
                style={{ paddingBottom: '70%', background: '#0d1117' }}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  unoptimized={true}
                />
                {/* Open PDF overlay */}
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `${cert.color}12`, backdropFilter: 'blur(2px)' }}
                  aria-label={`Open ${cert.title} PDF`}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      background: 'rgba(2,8,23,0.85)',
                      color: cert.color,
                      border: `1px solid ${cert.color}50`,
                    }}
                  >
                    <ExternalLink size={13} />
                    View Full PDF
                  </div>
                </a>
              </div>

              {/* Card info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className="font-display font-semibold text-base mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cert.title}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                  >
                    <Award size={14} style={{ color: cert.color }} />
                  </div>
                </div>
              </div>

              {/* Color accent line */}
              <div
                className="h-0.5"
                style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
