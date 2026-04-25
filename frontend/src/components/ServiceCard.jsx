import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Smartphone, Code2, Brain, Cloud, Palette,
  ArrowRight, X, CheckCircle, ChevronRight, Zap
} from 'lucide-react';

const iconMap = { Globe, Smartphone, Code2, Brain, Cloud, Palette };

// Contenu détaillé par service
const serviceDetails = {
  'Développement Web': {
    tagline: 'Des applications web qui performent, convertissent et évoluent.',
    intro:
      'Nous concevons des expériences web sur mesure — de la landing page ultra-rapide au SaaS multi-tenant complexe. Chaque projet est pensé pour la performance, la scalabilité et l\'expérience utilisateur.',
    features: [
      { title: 'Applications React / Next.js', desc: 'SPAs et SSR modernes avec des interfaces fluides et réactives.' },
      { title: 'API REST & GraphQL', desc: 'Backends robustes en Node.js / Express avec documentation Swagger.' },
      { title: 'E-commerce & Marketplaces', desc: 'Boutiques en ligne performantes avec paiement intégré (Stripe, PayDunya).' },
      { title: 'CMS & Portails métier', desc: 'Tableaux de bord, back-offices et portails clients sur mesure.' },
      { title: 'PWA & Web Apps offline', desc: 'Applications installables fonctionnant même sans connexion.' },
      { title: 'Optimisation SEO & Performance', desc: 'Score Lighthouse > 95, Core Web Vitals optimisés, temps de chargement < 2s.' },
    ],
    stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Vercel'],
    process: [
      { step: '01', label: 'Analyse & Cahier des charges' },
      { step: '02', label: 'Maquettes & Prototypage' },
      { step: '03', label: 'Développement Agile' },
      { step: '04', label: 'Tests & Recette' },
      { step: '05', label: 'Déploiement & Suivi' },
    ],
    stats: [{ value: '120+', label: 'Sites livrés' }, { value: '< 2s', label: 'Temps de chargement' }, { value: '99.9%', label: 'Uptime garanti' }],
    accentColor: 'from-primary-500/20 to-accent-500/20',
    borderColor: 'border-primary-500/30',
  },
  'Applications Mobiles': {
    tagline: 'Des apps mobiles que vos utilisateurs adorent utiliser.',
    intro:
      'Nous développons des applications iOS et Android natives ou cross-platform qui offrent une expérience utilisateur irréprochable. De la conception UX au déploiement sur les stores, nous gérons tout.',
    features: [
      { title: 'React Native & Flutter', desc: 'Une seule codebase pour iOS et Android, avec des performances natives.' },
      { title: 'Apps natives iOS / Android', desc: 'Swift et Kotlin pour les projets nécessitant des performances maximales.' },
      { title: 'Intégration API & Backend', desc: 'Connexion à vos systèmes existants, REST, GraphQL, WebSockets.' },
      { title: 'Notifications push', desc: 'Engagement utilisateur via Firebase Cloud Messaging et APNs.' },
      { title: 'Paiement mobile', desc: 'Intégration Mobile Money (MTN, Orange), Stripe, Apple Pay, Google Pay.' },
      { title: 'Publication sur les stores', desc: 'Gestion complète de la soumission App Store et Google Play.' },
    ],
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo', 'Redux', 'Fastlane'],
    process: [
      { step: '01', label: 'UX Research & Wireframes' },
      { step: '02', label: 'Design UI interactif' },
      { step: '03', label: 'Développement itératif' },
      { step: '04', label: 'Tests sur devices réels' },
      { step: '05', label: 'Publication & ASO' },
    ],
    stats: [{ value: '40+', label: 'Apps publiées' }, { value: '4.8★', label: 'Note moyenne stores' }, { value: '2M+', label: 'Utilisateurs actifs' }],
    accentColor: 'from-violet-500/20 to-pink-500/20',
    borderColor: 'border-violet-500/30',
  },
  'Logiciels Métier': {
    tagline: 'Automatisez, optimisez, dominez votre secteur.',
    intro:
      'Vos processus métier sont uniques — vos outils doivent l\'être aussi. Nous développons des logiciels sur mesure qui s\'intègrent parfaitement à votre organisation et éliminent les tâches répétitives.',
    features: [
      { title: 'ERP & Gestion intégrée', desc: 'Pilotez comptabilité, stocks, RH et production depuis une seule plateforme.' },
      { title: 'CRM sur mesure', desc: 'Gestion des prospects, clients, devis et contrats adaptée à votre cycle de vente.' },
      { title: 'Automatisation des workflows', desc: 'Éliminez les saisies manuelles et les erreurs humaines par des processus automatisés.' },
      { title: 'Tableaux de bord & KPIs', desc: 'Visualisez vos données en temps réel pour des décisions éclairées.' },
      { title: 'Intégration systèmes existants', desc: 'Connexion avec vos outils actuels : comptabilité, e-commerce, ERP tiers.' },
      { title: 'Formation & Documentation', desc: 'Accompagnement de vos équipes et documentation complète fournie.' },
    ],
    stack: ['Node.js', 'React', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Electron', 'Python'],
    process: [
      { step: '01', label: 'Audit des processus existants' },
      { step: '02', label: 'Spécifications fonctionnelles' },
      { step: '03', label: 'Développement modulaire' },
      { step: '04', label: 'Tests métier & UAT' },
      { step: '05', label: 'Déploiement & Formation' },
    ],
    stats: [{ value: '50+', label: 'Logiciels déployés' }, { value: '60%', label: 'Gain de productivité moyen' }, { value: '24/7', label: 'Support disponible' }],
    accentColor: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
  },
  'Intelligence Artificielle': {
    tagline: 'Donnez à votre produit la puissance de l\'IA.',
    intro:
      'L\'IA n\'est plus réservée aux géants de la tech. Nous intégrons des solutions d\'intelligence artificielle concrètes et mesurables dans vos produits pour automatiser, prédire et personnaliser à grande échelle.',
    features: [
      { title: 'Chatbots & Assistants virtuels', desc: 'Agents conversationnels intelligents basés sur GPT-4, Claude ou des modèles fine-tunés.' },
      { title: 'Analyse prédictive', desc: 'Modèles ML pour anticiper les comportements clients, les pannes ou les tendances marché.' },
      { title: 'Traitement du langage (NLP)', desc: 'Classification de textes, extraction d\'entités, résumé automatique, traduction.' },
      { title: 'Vision par ordinateur', desc: 'Reconnaissance d\'images, détection d\'objets, OCR et analyse de documents.' },
      { title: 'Recommandations personnalisées', desc: 'Moteurs de recommandation pour e-commerce, contenu ou services.' },
      { title: 'Automatisation intelligente (RPA)', desc: 'Robots logiciels qui imitent les actions humaines sur vos interfaces.' },
    ],
    stack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Hugging Face', 'FastAPI', 'Pinecone'],
    process: [
      { step: '01', label: 'Identification des cas d\'usage' },
      { step: '02', label: 'Collecte & préparation des données' },
      { step: '03', label: 'Entraînement & évaluation du modèle' },
      { step: '04', label: 'Intégration dans votre produit' },
      { step: '05', label: 'Monitoring & amélioration continue' },
    ],
    stats: [{ value: '85%', label: 'Précision moyenne des modèles' }, { value: '10x', label: 'Gain de vitesse de traitement' }, { value: '30+', label: 'Projets IA livrés' }],
    accentColor: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-500/30',
  },
  'Cloud & DevOps': {
    tagline: 'Une infrastructure qui ne dort jamais, qui ne tombe jamais.',
    intro:
      'Nous concevons et opérons des infrastructures cloud modernes qui garantissent disponibilité, sécurité et scalabilité. Du déploiement initial à l\'optimisation des coûts, nous gérons votre infrastructure comme si c\'était la nôtre.',
    features: [
      { title: 'Architecture Cloud (AWS / GCP / Azure)', desc: 'Design d\'architectures résilientes, multi-régions et hautement disponibles.' },
      { title: 'CI/CD Pipelines', desc: 'Automatisation complète du cycle de déploiement : build, test, staging, production.' },
      { title: 'Containerisation Docker & Kubernetes', desc: 'Orchestration de conteneurs pour des déploiements reproductibles et scalables.' },
      { title: 'Infrastructure as Code (IaC)', desc: 'Terraform et Ansible pour une infrastructure versionnée et reproductible.' },
      { title: 'Monitoring & Observabilité', desc: 'Dashboards Grafana, alertes Prometheus, logs centralisés avec ELK Stack.' },
      { title: 'Sécurité & Conformité', desc: 'Gestion des secrets, WAF, VPN, audits de sécurité et conformité RGPD.' },
    ],
    stack: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Nginx'],
    process: [
      { step: '01', label: 'Audit de l\'infrastructure existante' },
      { step: '02', label: 'Architecture & dimensionnement' },
      { step: '03', label: 'Migration & déploiement' },
      { step: '04', label: 'Automatisation CI/CD' },
      { step: '05', label: 'Monitoring & optimisation' },
    ],
    stats: [{ value: '99.99%', label: 'Uptime garanti' }, { value: '40%', label: 'Réduction des coûts cloud' }, { value: '< 5min', label: 'Temps de déploiement' }],
    accentColor: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
  },
  'UI/UX Design': {
    tagline: 'Des interfaces que les utilisateurs comprennent du premier coup.',
    intro:
      'Un bon design n\'est pas qu\'esthétique — c\'est une stratégie business. Nous créons des expériences utilisateur qui réduisent le taux d\'abandon, augmentent les conversions et fidélisent vos clients.',
    features: [
      { title: 'UX Research & Tests utilisateurs', desc: 'Interviews, tests A/B, heatmaps et analyses comportementales pour des décisions basées sur des données.' },
      { title: 'Wireframes & Prototypes interactifs', desc: 'Maquettes Figma cliquables pour valider les parcours avant le développement.' },
      { title: 'Design Systems', desc: 'Bibliothèques de composants cohérentes pour accélérer le développement et garantir la cohérence.' },
      { title: 'Design responsive & mobile-first', desc: 'Interfaces parfaites sur tous les écrans, du mobile 320px aux grands écrans 4K.' },
      { title: 'Accessibilité WCAG 2.1', desc: 'Conformité aux standards d\'accessibilité pour toucher 100% de vos utilisateurs.' },
      { title: 'Motion Design & Micro-interactions', desc: 'Animations subtiles qui guident l\'utilisateur et rendent l\'expérience mémorable.' },
    ],
    stack: ['Figma', 'Adobe XD', 'Framer', 'Storybook', 'Tailwind CSS', 'Lottie', 'Hotjar', 'Maze'],
    process: [
      { step: '01', label: 'Discovery & UX Research' },
      { step: '02', label: 'Architecture de l\'information' },
      { step: '03', label: 'Wireframes basse fidélité' },
      { step: '04', label: 'Design haute fidélité' },
      { step: '05', label: 'Tests & itérations' },
    ],
    stats: [{ value: '+45%', label: 'Taux de conversion moyen' }, { value: '-60%', label: 'Taux d\'abandon' }, { value: '4.9★', label: 'Satisfaction utilisateurs' }],
    accentColor: 'from-rose-500/20 to-orange-500/20',
    borderColor: 'border-rose-500/30',
  },
};

export default function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);
  const Icon = iconMap[service.icon_name] || Code2;
  const details = serviceDetails[service.title];

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onClick={() => setOpen(true)}
        className="group relative glass-card p-7 hover:border-primary-500/40 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-accent-500/0 group-hover:from-primary-600/5 group-hover:to-accent-500/5 transition-all duration-500 rounded-2xl" />

        <div className="relative mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-600/20 to-accent-500/20 border border-primary-500/20 rounded-2xl flex items-center justify-center group-hover:from-primary-600/30 group-hover:to-accent-500/30 group-hover:border-primary-400/40 transition-all duration-300">
            <Icon className="w-7 h-7 text-primary-400 group-hover:text-accent-400 transition-colors duration-300" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </div>

        <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-primary-200 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center gap-2 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span>Voir le détail</span>
          <ArrowRight className="w-4 h-4" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
      </motion.div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && details && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-white/10 rounded-3xl shadow-2xl"
            >
              {/* Header */}
              <div className={`relative p-8 pb-6 bg-gradient-to-br ${details.accentColor} border-b border-white/10`}>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-5 right-5 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 bg-dark-800/60 border ${details.borderColor} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">{service.title}</h2>
                    <p className="text-slate-300 text-sm mt-0.5">{details.tagline}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {details.stats.map((s, i) => (
                    <div key={i} className="bg-dark-900/40 rounded-xl p-3 text-center border border-white/5">
                      <div className="font-display text-xl font-bold text-white">{s.value}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8">
                {/* Intro */}
                <p className="text-slate-300 leading-relaxed">{details.intro}</p>

                {/* Features */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary-400" />
                    Ce que nous faisons
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {details.features.map((f, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-white/[0.03] border border-white/8 rounded-xl hover:border-primary-500/20 transition-colors">
                        <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-white text-sm font-semibold mb-0.5">{f.title}</div>
                          <div className="text-slate-400 text-xs leading-relaxed">{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-accent-400" />
                    Notre processus
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {details.process.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl">
                        <span className="text-primary-400 font-bold text-xs font-mono">{p.step}</span>
                        <span className="text-slate-300 text-sm">{p.label}</span>
                        {i < details.process.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-slate-600 ml-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-4">
                    Stack technologique
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {details.stack.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-primary-600/15 border border-primary-500/20 text-primary-300 text-xs font-semibold rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <motion.button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200);
                    }}
                    className="btn-primary flex-1 justify-center py-3.5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Démarrer un projet {service.title}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <button
                    onClick={() => setOpen(false)}
                    className="btn-outline flex-1 justify-center py-3.5"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
