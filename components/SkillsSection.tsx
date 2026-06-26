'use client';

import { motion } from 'framer-motion';
import { Terminal, LineChart, Database, Code2, Brain } from 'lucide-react';

const skillCategories = [
  {
    title: 'Data Analytics',
    icon: <Brain size={20} className="text-blue-400" />,
    skills: ['Data Cleaning', 'Exploratory Data Analysis (EDA)', 'Statistical Analysis', 'A/B Testing'],
    color: '#3b82f6'
  },
  {
    title: 'Business Intelligence',
    icon: <LineChart size={20} className="text-purple-400" />,
    skills: ['Dashboard Design', 'Data Storytelling', 'KPI Tracking', 'Business Reporting'],
    color: '#a855f7'
  },
  {
    title: 'Programming',
    icon: <Code2 size={20} className="text-emerald-400" />,
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'C++'],
    color: '#10b981'
  },
  {
    title: 'Databases',
    icon: <Database size={20} className="text-amber-400" />,
    skills: ['SQL (Advanced)', 'Microsoft SQL Server', 'CTEs & Window Functions', 'Data Modeling', 'Star Schema'],
    color: '#f59e0b'
  },
  {
    title: 'ETL',
    icon: <Terminal size={20} className="text-rose-400" />,
    skills: ['SSIS (Integration Services)', 'Data Pipelines', 'Data Extraction', 'Data Transformation'],
    color: '#fb7185'
  },
  {
    title: 'Data Visualization',
    icon: <LineChart size={20} className="text-cyan-400" />,
    skills: ['Power BI', 'DAX', 'Power Query', 'Tableau', 'Excel (Pivot Tables & Macros)'],
    color: '#06b6d4'
  },
  {
    title: 'Tools',
    icon: <Terminal size={20} className="text-indigo-400" />,
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'VS Code'],
    color: '#6366f1'
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--glass-border)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Terminal size={14} style={{ color: 'var(--accent)' }} />
            <span className="tag-badge">Expertise</span>
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">
            Technical Skills
          </h2>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            My comprehensive toolkit for building end-to-end data pipelines, designing optimized models, and delivering actionable intelligence.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group"
              style={{
                border: '1px solid var(--glass-border)',
              }}
            >
              {/* Subtle background glow on hover */}
              <div 
                className="absolute -inset-2 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                style={{ background: category.color }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-black/20 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10">
                    {category.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors hover:border-transparent"
                      style={{ 
                        background: 'var(--bg-primary)',
                        borderColor: 'var(--glass-border)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
