import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

const footerLinks = {
  Services: ['Développement Web', 'Applications Mobiles', 'Logiciels Métier', 'IA & Machine Learning', 'Cloud & DevOps'],
  Entreprise: ['À propos', 'Notre équipe', 'Carrières', 'Blog Tech', 'Partenaires'],
  Légal: ['Mentions légales', 'Politique de confidentialité', 'CGU', 'Cookies'],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <img src="/logo.svg" alt="Nexa Soft Logo" className="w-9 h-9" />
              <span className="font-display font-bold text-xl text-white">
                Nexa<span className="gradient-text">Soft</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Votre partenaire technologique pour transformer vos idées en solutions
              digitales performantes et scalables.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-primary-600/20 border border-white/10 hover:border-primary-500/30 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-400 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-primary-300 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Nexa Soft. Tous droits réservés.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-9 h-9 bg-primary-600/20 hover:bg-primary-600/40 border border-primary-500/20 rounded-xl flex items-center justify-center text-primary-400 transition-all duration-200"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
