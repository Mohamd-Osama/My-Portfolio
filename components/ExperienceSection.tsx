'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

const experiences = [
  {
    role: 'Data Analysis Trainee',
    company: 'FCI Data Analysis Bootcamp',
    location: 'Assiut University',
    date: 'Oct 2025 – Nov 2025',
    color: '#00d4ff',
    bullets: [
      'Optimized complex SQL queries by replacing nested subqueries with CTEs and Window Functions for better performance.',
      'Designed a robust Data Model (Star Schema) to integrate data sources, enabling efficient filtering and reporting.',
      'Developed interactive Power BI dashboards to visualize key metrics, identifying top performers from 50000+ records.'
    ]
  },
  {
    role: 'Data Analyst Intern',
    company: 'National Telecommunication Institute (NTI)',
    location: 'Aswan, Egypt',
    date: 'July 2025 – Aug 2025',
    color: '#a855f7',
    bullets: [
      'Developed 4 interactive dashboards using Power BI based on diverse datasets processed via SQL and Python.',
      'Performed data cleaning and exploratory analysis (EDA) on complex datasets to ensure accuracy for visualization.',
      'Collaborated with a team of 4 peers to deliver a final capstone project, achieving a 98% performance score.'
    ]
  },
  {
    role: 'Data Analyst Intern',
    company: 'Data Pill',
    location: 'Remote',
    date: 'June 2025 – Aug 2025',
    color: '#10b981',
    bullets: [
      'Accelerated data processing by 20% for 100,000+ transactions by engineering optimized ETL pipelines using SSIS.',
      'Designed a Star Schema data model that reduced dashboard loading latency by 35%, enhancing user experience.',
      'Ensured 100% data accuracy by implementing automated validation scripts, enabling reliable daily reporting for management.'
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--glass-border)' }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Briefcase size={14} style={{ color: 'var(--accent)' }} />
            <span className="tag-badge">Career</span>
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">
            Professional Experience
          </h2>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            My journey in data analysis, transforming raw data into strategic solutions and operational efficiency.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-black/5 dark:bg-white/10 hidden sm:block" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col sm:flex-row gap-6 sm:gap-10"
            >
              {/* Timeline dot */}
              <div 
                className="hidden sm:flex mt-1.5 w-14 h-14 rounded-2xl flex-shrink-0 items-center justify-center relative z-10"
                style={{ 
                  background: 'var(--bg-primary)',
                  border: `2px solid ${exp.color}`,
                  boxShadow: `0 0 20px ${exp.color}20`
                }}
              >
                <Building2 size={24} color={exp.color} />
              </div>

              {/* Card */}
              <div 
                className="glass-card p-6 sm:p-8 rounded-2xl flex-1 border transition-colors hover:border-transparent group"
                style={{
                  borderColor: 'var(--glass-border)'
                }}
              >
                {/* Glow */}
                <div 
                  className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"
                  style={{ 
                    background: `linear-gradient(45deg, ${exp.color}40, transparent)`,
                    zIndex: -1
                  }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                      {exp.role}
                    </h3>
                    <h4 className="font-semibold text-base sm:text-lg" style={{ color: exp.color }}>
                      {exp.company}
                    </h4>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{exp.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
