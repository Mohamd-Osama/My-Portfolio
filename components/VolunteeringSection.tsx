'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Users, Star, Calendar } from 'lucide-react';

const photos = [
  { src: '/volunteering/1.jpg', alt: 'Volunteering activity 1' },
  { src: '/volunteering/2.jpg', alt: 'Volunteering activity 2' },
  { src: '/volunteering/photo_4_2026-06-26_11-31-49.jpg', alt: 'Event photo 1' },
  { src: '/volunteering/photo_5_2026-06-26_11-31-49.jpg', alt: 'Event photo 2' },
];

export default function VolunteeringSection() {
  return (
    <section className="py-24 relative" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--glass-border)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart size={14} style={{ color: '#ec4899' }} />
            <span className="tag-badge" style={{ color: '#ec4899', background: 'rgba(236,72,153,0.08)', borderColor: 'rgba(236,72,153,0.2)' }}>
              Community Impact
            </span>
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">
            Volunteering Experience
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Giving back through technology education and community development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Organization card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Org card */}
            <div
              className="glass-card rounded-2xl p-6"
              style={{ border: '1px solid rgba(236,72,153,0.2)' }}
            >
              <div className="flex items-start gap-4 mb-5">
                {/* Org logo */}
                <div
                  className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative"
                  style={{ border: '1px solid rgba(236,72,153,0.3)' }}
                >
                  <Image
                    src="/volunteering/Human For Good Logo.jpg"
                    alt="Human For Good Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    Human For Good
                  </h3>
                  <p className="text-sm font-arabic" style={{ color: '#ec4899' }}>
                    إنسان للخير
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="tag-badge" style={{ color: '#ec4899', background: 'rgba(236,72,153,0.08)', borderColor: 'rgba(236,72,153,0.2)' }}>
                      Non-Profit
                    </span>
                  </div>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { icon: <Users size={14} />, label: 'Role', value: 'PR & Event Organizer' },
                  { icon: <Calendar size={14} />, label: 'Duration', value: '2+ Years' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-3"
                    style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.12)' }}
                  >
                    <div className="flex items-center gap-1.5 mb-1" style={{ color: '#ec4899' }}>
                      {item.icon}
                      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Actively volunteered for over two years in the Public Relations and Event Organization
                committee, contributing to community development and youth empowerment initiatives.
              </p>
            </div>

            {/* Programmer's Footprint highlight */}
            <div
              className="glass-card rounded-2xl p-6"
              style={{ border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Star size={15} style={{ color: 'var(--accent)' }} />
                <h4 className="font-display font-semibold text-base" style={{ color: 'var(--accent)' }}>
                  Key Highlight
                </h4>
              </div>
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
                "Programmer's Footprint" Event
              </h3>
              <p className="text-sm mb-1" style={{ color: 'var(--accent)', opacity: 0.7 }}>
                بصمة مبرمج
              </p>
              <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
                Played a core role in planning, organizing, and executing this highly successful
                tech-awareness event, connecting aspiring developers with industry experts. Managed
                public relations efforts including speaker coordination, attendee communications,
                and ensuring a seamless and engaging experience for all participants.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Event Planning', 'Public Relations', 'Speaker Coordination', 'Community Leadership'].map(
                  (skill) => (
                    <span key={skill} className="tag-badge">{skill}</span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Right — Photo grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className={`group relative rounded-xl overflow-hidden ${i === 0 ? 'col-span-2' : ''}`}
                style={{
                  paddingBottom: i === 0 ? '55%' : '80%',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                  quality={100}
                  unoptimized={true}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
