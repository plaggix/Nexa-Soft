import { motion } from 'framer-motion';
import { Shield, Zap, HeartHandshake, Lightbulb, Clock, Trophy } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Performance Maximale',
    description: 'Chaque ligne de code est optimisée pour la vitesse. Nos applications atteignent des scores Lighthouse > 95 et des temps de chargement < 2s.',
    color: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Shield,
    title: 'Sécurité Renforcée',
    description: 'Architecture zero-trust, chiffrement end-to-end, audits de sécurité réguliers. Vos données et celles de vos utilisateurs sont protégées.',
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Continue',
    description: 'Nous intégrons les dernières technologies — IA, edge computing, WebAssembly — pour vous donner une longueur d\'avance sur la concurrence.',
    color: 'from-primary-500/20 to-accent-500/20',
    border: 'border-primary-500/20',
    iconColor: 'text-primary-400',
  },
  {
    icon: HeartHandshake,
    title: 'Partenariat Durable',
    description: 'Nous ne livrons pas juste du code. Nous construisons une relation long terme : support, maintenance, évolutions — nous sommes là à chaque étape.',
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
  },
  {
    icon: Clock,
    title: 'Livraison dans les Délais',
    description: 'Méthodologie Agile rigoureuse, sprints de 2 semaines, démos régulières. 97% de nos projets sont livrés dans les délais et le budget convenus.',
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Trophy,
    title: 'Excellence Reconnue',
    description: 'Certifiés AWS, Google Cloud Partner et Microsoft Gold Partner. Nos équipes sont formées aux meilleures pratiques de l\'industrie.',
    color: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Pourquoi Nous Choisir
          </div>
          <h2 className="section-title mb-4">
            L'excellence au cœur de{' '}
            <span className="gradient-text">chaque projet</span>
          </h2>
          <p className="section-subtitle">
            Ce qui nous distingue, c'est notre engagement indéfectible envers la qualité,
            la transparence et les résultats mesurables pour votre business.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`relative p-7 rounded-2xl bg-gradient-to-br ${value.color} border ${value.border} backdrop-blur-sm group transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl bg-dark-800/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className={`w-6 h-6 ${value.iconColor}`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6">
            Rejoignez les <span className="text-white font-semibold">150+ entreprises</span> qui nous font confiance
          </p>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary px-8 py-4 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discutons de votre projet
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
