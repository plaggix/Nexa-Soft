import { motion } from 'framer-motion';
import { Globe, Smartphone, Code2, Brain, Cloud, Palette, ArrowRight } from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Code2,
  Brain,
  Cloud,
  Palette,
};

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon_name] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative glass-card p-7 hover:border-primary-500/40 hover:bg-white/8 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-accent-500/0 group-hover:from-primary-600/5 group-hover:to-accent-500/5 transition-all duration-500 rounded-2xl" />

      {/* Icon */}
      <div className="relative mb-5">
        <div className="w-14 h-14 bg-gradient-to-br from-primary-600/20 to-accent-500/20 border border-primary-500/20 rounded-2xl flex items-center justify-center group-hover:from-primary-600/30 group-hover:to-accent-500/30 group-hover:border-primary-400/40 transition-all duration-300">
          <Icon className="w-7 h-7 text-primary-400 group-hover:text-accent-400 transition-colors duration-300" />
        </div>
        {/* Decorative dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-primary-200 transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
        {service.description}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <span>En savoir plus</span>
        <ArrowRight className="w-4 h-4" />
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
    </motion.div>
  );
}
