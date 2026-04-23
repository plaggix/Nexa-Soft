import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pourquoi Nous', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <img src="/logo.svg" alt="Nexa Soft Logo" className="w-9 h-9" />
            <span className="font-display font-bold text-xl text-white">
              Nexa<span className="gradient-text">Soft</span>
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="hidden md:flex btn-primary text-sm py-2.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Démarrer un projet
            </motion.button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-800/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => scrollTo('#contact')}
                  className="w-full btn-primary justify-center"
                >
                  Démarrer un projet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
