'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'About', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl border-b' : 'bg-transparent'
      }`}
      style={
        scrolled
          ? {
              background: 'var(--glass-bg)',
              borderColor: 'var(--glass-border)',
              boxShadow: 'var(--shadow)',
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5">
          {/* Logo — actual logo image */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-14 md:h-16 w-auto rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300"
              style={{
                border: '1.5px solid rgba(0,212,255,0.35)',
                boxShadow: '0 0 20px rgba(0,212,255,0.3)'
              }}
            >
              <Image
                src="/profile/my logo.jpeg"
                alt="Mohamed Osama Logo"
                width={112}
                height={112}
                className="object-contain h-14 md:h-16 w-auto"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
            <div className="hidden sm:block">
              <p
                className="font-display font-semibold text-sm leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Mohamed Osama
              </p>
              <p className="text-[10px] leading-tight font-mono" style={{ color: 'var(--accent)' }}>
                Data Analyst & BI Developer
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                id="theme-toggle"
                whileTap={{ scale: 0.85 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
                style={{
                  borderColor: 'var(--glass-border)',
                  background: 'var(--accent-dim)',
                }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: 90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={15} style={{ color: 'var(--accent)' }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: -90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={15} style={{ color: 'var(--text-primary)' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{ borderColor: 'var(--glass-border)', background: 'var(--accent-dim)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={15} style={{ color: 'var(--accent)' }} />
              ) : (
                <Menu size={15} style={{ color: 'var(--text-secondary)' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden fixed inset-0 z-[100] bg-[#f0f4f8] dark:bg-[#0f172a] flex flex-col"
            >
              {/* Close Button Inside Overlay */}
              <div className="flex items-center justify-end p-4 sm:p-5">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{ borderColor: 'var(--glass-border)', background: 'var(--accent-dim)' }}
                  aria-label="Close menu"
                >
                  <X size={20} style={{ color: 'var(--accent)' }} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col items-center justify-center flex-1 space-y-8 pb-20">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      setMobileOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className="text-2xl font-semibold tracking-wide transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
