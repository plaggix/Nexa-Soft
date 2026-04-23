import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '150+', label: 'Clients satisfaits' },
  { icon: Award, value: '8 ans', label: "D'expérience" },
  { icon: TrendingUp, value: '300+', label: 'Projets livrés' },
  { icon: Star, value: '4.9/5', label: 'Note moyenne' },
];

const floatingOrbs = [
  { size: 300, x: '10%', y: '20%', color: 'from-primary-600/20 to-transparent', delay: 0 },
  { size: 200, x: '70%', y: '10%', color: 'from-accent-500/15 to-transparent', delay: 1 },
  { size: 250, x: '80%', y: '60%', color: 'from-primary-500/10 to-transparent', delay: 2 },
];

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(99,114,241,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,114,241,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl pointer-events-none`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6 + orb.delay, repeat: Infinity, delay: orb.delay }}
        />
      ))}

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            Agence de Services Numériques Premium
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
          >
            Transformez vos idées
            <br />
            <span className="gradient-text">en solutions digitales</span>
            <br />
            performantes
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Nous concevons et développons des applications web, mobiles et des logiciels métier
            sur mesure qui propulsent votre croissance. De l'idée au déploiement, nous sommes
            votre partenaire technologique de confiance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              onClick={scrollToContact}
              className="btn-primary text-base px-8 py-4 glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Démarrer votre projet
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={scrollToServices}
              className="btn-outline text-base px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-4 h-4" />
              Voir nos services
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="glass-card p-5 text-center group hover:border-primary-500/30 transition-all duration-300"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <stat.icon className="w-6 h-6 text-primary-400 mx-auto mb-2 group-hover:text-accent-400 transition-colors" />
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
}
