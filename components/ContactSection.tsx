'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Link2,
  GitFork,
  MessageCircle,
  MapPin,
  Send,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const contactLinks = [
  {
    id: 'email',
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'Send an Email',
    href: 'mailto:mohamed.osama.data@gmail.com',
    color: '#f97316',
    description: 'Drop me a message anytime',
  },
  {
    id: 'whatsapp',
    icon: <FaWhatsapp size={20} />,
    label: 'WhatsApp',
    value: '+20 112 839 9605',
    href: 'https://wa.me/201128399605',
    color: '#25d366',
    description: 'Quick response guaranteed',
  },
  {
    id: 'linkedin',
    icon: <FaLinkedin size={20} />,
    label: 'LinkedIn',
    value: 'Mohamed Osama',
    href: 'https://www.linkedin.com/in/mohamed-osama10/',
    color: '#0077b5',
    description: 'Connect professionally',
  },
  {
    id: 'github',
    icon: <FaGithub size={20} />,
    label: 'GitHub',
    value: 'Mohamd-Osama',
    href: 'https://github.com/Mohamd-Osama',
    color: '#94a3b8',
    description: 'View my code repositories',
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--glass-border)' }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Send size={14} style={{ color: 'var(--accent)' }} />
            <span className="tag-badge">Get In Touch</span>
          </div>
          <h2 className="section-heading text-4xl sm:text-5xl mb-4">Contact Me</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Ready to turn your data into actionable insights? Let's talk.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactLinks.map((contact, i) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={['linkedin', 'github', 'whatsapp'].includes(contact.id) ? '_blank' : '_self'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ 
                y: -4, 
                scale: 1.02,
                borderColor: 'rgba(0, 212, 255, 0.5)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)'
              }}
              className="glass-card rounded-2xl p-5 flex items-start gap-4 group transition-colors"
              style={{
                border: `1px solid ${contact.color}20`,
                textDecoration: 'none',
              }}
              aria-label={contact.label}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                style={{
                  background: `${contact.color}12`,
                  border: `1px solid ${contact.color}30`,
                  color: contact.color,
                  boxShadow: `0 0 15px ${contact.color}10`,
                }}
              >
                {contact.icon}
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: contact.color }}
                >
                  {contact.label}
                </p>
                <p
                  className="text-sm font-medium mb-0.5 break-words whitespace-normal leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {contact.value}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {contact.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Location note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <MapPin size={14} />
          <span className="text-sm">Based in Aswan, Egypt · Available for Remote Work Globally</span>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 pt-8 border-t text-center"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {[
              {
                href: 'https://www.linkedin.com/in/mohamed-osama10/',
                icon: <FaLinkedin size={18} />,
                label: 'LinkedIn',
                color: '#0077b5',
              },
              {
                href: 'https://github.com/Mohamd-Osama',
                icon: <FaGithub size={18} />,
                label: 'GitHub',
                color: '#94a3b8',
              },
              {
                href: 'mailto:mohamed.osama.data@gmail.com',
                icon: <Mail size={18} />,
                label: 'Email',
                color: '#f97316',
              },
              {
                href: 'https://wa.me/201128399605',
                icon: <FaWhatsapp size={18} />,
                label: 'WhatsApp',
                color: '#25d366',
              },
              {
                href: 'tel:+201128399605',
                icon: <Phone size={18} />,
                label: 'Phone',
                color: '#10b981',
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.2, 
                  y: -2,
                  borderColor: 'rgba(0, 212, 255, 0.6)',
                  color: 'var(--accent)',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
                }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: `${social.color}12`,
                  border: `1px solid ${social.color}25`,
                  color: social.color,
                }}
                aria-label={social.label}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            Designed & Built by{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Mohamed Osama</span>
            {' '}· 2026
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
            Data Analyst · Power BI Developer · SQL Developer · Assiut University
          </p>
        </motion.div>
      </div>
    </section>
  );
}
