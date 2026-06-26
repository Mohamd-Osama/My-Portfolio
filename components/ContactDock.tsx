'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const contacts = [
  {
    id: 'phone',
    icon: <Phone size={18} />,
    label: 'Phone',
    value: '+20 1128399605',
    href: 'tel:+201128399605',
    color: '#10b981',
  },
  {
    id: 'email',
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'mohamed.osama.data@gmail.com',
    href: 'mailto:mohamed.osama.data@gmail.com',
    color: '#f97316',
  },
  {
    id: 'linkedin',
    icon: <FaLinkedin size={18} />,
    label: 'LinkedIn',
    value: 'in/mohamed-osama10',
    href: 'https://www.linkedin.com/in/mohamed-osama10/',
    color: '#0077b5',
  },
  {
    id: 'github',
    icon: <FaGithub size={18} />,
    label: 'GitHub',
    value: 'Mohamd-Osama',
    href: 'https://github.com/Mohamd-Osama',
    color: '#c9d1d9',
  },
];

export default function ContactDock() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact items */}
      <AnimatePresence>
        {expanded &&
          contacts.map((contact, i) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={contact.id === 'email' || contact.id === 'phone' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredId(contact.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-xl cursor-pointer"
              style={{
                background: 'var(--glass-bg)',
                border: hoveredId === contact.id ? '1px solid rgba(0, 212, 255, 0.5)' : `1px solid ${contact.color}35`,
                boxShadow: hoveredId === contact.id
                  ? `0 0 20px rgba(0, 212, 255, 0.3), 0 4px 20px rgba(0,0,0,0.3)`
                  : '0 4px 20px rgba(0,0,0,0.2)',
                transform: hoveredId === contact.id ? 'translateX(-4px)' : 'translateX(0)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
              aria-label={contact.label}
            >
              <AnimatePresence>
                {hoveredId === contact.id && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-xs font-medium overflow-hidden whitespace-nowrap"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {contact.value}
                  </motion.span>
                )}
              </AnimatePresence>
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                {contact.label}
              </span>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{
                  background: hoveredId === contact.id ? 'rgba(0, 212, 255, 0.1)' : `${contact.color}15`,
                  color: hoveredId === contact.id ? 'var(--accent)' : (contact.id === 'github' ? 'var(--text-primary)' : contact.color),
                }}
              >
                {contact.icon}
              </div>
            </motion.a>
          ))}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        id="contact-dock-toggle"
        onClick={() => setExpanded((v) => !v)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
        style={{
          background: expanded
            ? 'linear-gradient(135deg, #0a1d3a, #071428)'
            : 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
          color: expanded ? '#00d4ff' : '#020817',
          border: expanded ? '1px solid rgba(0,212,255,0.3)' : 'none',
          boxShadow: `0 0 ${expanded ? '20px' : '30px'} rgba(0,212,255,${expanded ? '0.2' : '0.4'})`,
        }}
        aria-label={expanded ? 'Close contact panel' : 'Open contact panel'}
        aria-expanded={expanded}
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <MessageCircle size={22} />
        </motion.div>
      </motion.button>

      {/* Pulse ring when closed */}
      {!expanded && (
        <motion.div
          className="absolute bottom-0 right-0 w-14 h-14 rounded-2xl pointer-events-none"
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          style={{ background: 'rgba(0,212,255,0.3)' }}
        />
      )}
    </div>
  );
}
