'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Code2, Award, Calendar } from 'lucide-react';



const courses = [
  'Data Structures & Algorithms',
  'Database Systems & SQL',
  'Machine Learning Foundations',
  'Statistical Analysis',
  'Software Engineering',
  'Business Intelligence',
  'Computer Networks',
  'Operating Systems',
];

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-24 relative"
      style={{ background: 'var(--bg-primary)' }}
    >
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
            <GraduationCap size={14} style={{ color: 'var(--accent)' }} />
            <span className="tag-badge">Academic Background</span>
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">Education</h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Building a strong technical foundation at one of Egypt's leading universities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: University Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
              style={{ border: '1px solid rgba(0,212,255,0.2)' }}
            >
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at top right, rgba(0,212,255,0.08) 0%, transparent 70%)',
                }}
              />

              {/* Icon + Degree */}
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(0,212,255,0.25)',
                    boxShadow: '0 0 20px rgba(0,212,255,0.1)',
                  }}
                >
                  <GraduationCap size={28} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h3
                    className="font-display font-bold text-xl sm:text-2xl mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Bachelor of Computer Science
                  </h3>
                  <p className="font-semibold text-base mb-1" style={{ color: 'var(--accent)' }}>
                    Assiut University
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Information Systems Major
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    icon: <Calendar size={14} />,
                    label: 'Duration',
                    value: 'Sep 2023 – July 2027',
                    color: '#10b981',
                  },
                  {
                    icon: <Award size={14} />,
                    label: 'GPA',
                    value: '3.8 / 4.0',
                    color: 'var(--accent)',
                  },
                  {
                    icon: <BookOpen size={14} />,
                    label: 'Field',
                    value: 'Computer Science',
                    color: '#818cf8',
                  },
                  {
                    icon: <Code2 size={14} />,
                    label: 'Specialization',
                    value: 'Data & BI',
                    color: '#f59e0b',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-3"
                    style={{
                      background: `${item.color}10`,
                      border: `1px solid ${item.color}25`,
                    }}
                  >
                    <div
                      className="flex items-center gap-1.5 mb-1"
                      style={{ color: item.color, opacity: 0.85 }}
                    >
                      {item.icon}
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {item.label}
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Pursuing a comprehensive Computer Science degree with a self-directed focus on Data
                Analytics, Business Intelligence, and database engineering. Applied academic
                knowledge through real-world freelance projects and team-based analytical
                solutions.
              </p>

              {/* Accent bottom line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, var(--accent), transparent)',
                }}
              />
            </div>
          </motion.div>

          {/* ── Right: Relevant Courses ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex h-full"
          >
            {/* Relevant Courses */}
            <div
              className="glass-card rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-center"
              style={{ border: '1px solid var(--glass-border)' }}
            >
              <h4
                className="font-display font-semibold text-lg sm:text-xl mb-6 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <BookOpen size={20} style={{ color: '#818cf8' }} />
                Relevant Coursework
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div
                    key={course}
                    className="flex items-center gap-3 text-sm sm:text-base py-2 px-3 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    />
                    {course}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
