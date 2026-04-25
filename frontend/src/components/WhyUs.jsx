import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Zap, HeartHandshake, Lightbulb, Clock, Trophy,
  X, CheckCircle, ArrowRight, ChevronRight, Star
} from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Performance Maximale',
    description: 'Chaque ligne de code est optimisée pour la vitesse. Nos applications atteignent des scores Lighthouse > 95 et des temps de chargement < 2s.',
    color: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    accentBg: 'bg-yellow-500/10',
    // ── Contenu détaillé ──
    tagline: 'La vitesse n\'est pas une option, c\'est une exigence.',
    intro:
      'Dans un monde où 53% des utilisateurs abandonnent un site qui met plus de 3 secondes à charger, la performance est directement liée à votre chiffre d\'affaires. Nous en faisons une priorité absolue dès la première ligne de code.',
    points: [
      { title: 'Score Lighthouse > 95', desc: 'Audit systématique de chaque livraison sur les 4 métriques : Performance, Accessibilité, Bonnes pratiques, SEO.' },
      { title: 'Core Web Vitals optimisés', desc: 'LCP < 2.5s, FID < 100ms, CLS < 0.1 — les métriques Google qui impactent votre référencement.' },
      { title: 'Lazy loading & Code splitting', desc: 'Chargement intelligent des ressources : seul ce qui est visible est chargé en priorité.' },
      { title: 'CDN & Edge caching', desc: 'Vos assets servis depuis le point de présence le plus proche de chaque utilisateur.' },
      { title: 'Optimisation des images', desc: 'Compression WebP/AVIF, responsive images, et chargement progressif automatiques.' },
      { title: 'Base de données optimisée', desc: 'Index stratégiques, requêtes N+1 éliminées, cache Redis pour les données fréquentes.' },
    ],
    proof: [
      { value: '< 2s', label: 'Temps de chargement moyen' },
      { value: '97/100', label: 'Score Lighthouse moyen' },
      { value: '+32%', label: 'Taux de conversion gagné' },
    ],
    quote: '"Un site 1 seconde plus rapide augmente les conversions de 7%." — Google Research',
  },
  {
    icon: Shield,
    title: 'Sécurité Renforcée',
    description: 'Architecture zero-trust, chiffrement end-to-end, audits de sécurité réguliers. Vos données et celles de vos utilisateurs sont protégées.',
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/20',
    iconColor: 'text-green-400',
    accentBg: 'bg-green-500/10',
    tagline: 'Votre sécurité n\'est pas négociable.',
    intro:
      'Les cyberattaques coûtent en moyenne 4,45 millions de dollars aux entreprises. Nous intégrons la sécurité dès la conception (Security by Design) et non comme une couche ajoutée après coup.',
    points: [
      { title: 'Architecture Zero-Trust', desc: 'Aucune confiance implicite — chaque requête est authentifiée et autorisée explicitement.' },
      { title: 'Chiffrement end-to-end', desc: 'TLS 1.3, chiffrement des données sensibles au repos et en transit, gestion sécurisée des secrets.' },
      { title: 'Protection OWASP Top 10', desc: 'Prévention des injections SQL, XSS, CSRF, et des 10 vulnérabilités web les plus critiques.' },
      { title: 'Authentification robuste', desc: 'JWT, OAuth 2.0, MFA, gestion des sessions sécurisée et rotation des tokens.' },
      { title: 'Audits de sécurité réguliers', desc: 'Scans de vulnérabilités automatisés, tests de pénétration et revues de code sécurité.' },
      { title: 'Conformité RGPD', desc: 'Gestion du consentement, droit à l\'oubli, minimisation des données et registre des traitements.' },
    ],
    proof: [
      { value: '0', label: 'Incidents de sécurité majeurs' },
      { value: '100%', label: 'Projets conformes RGPD' },
      { value: 'A+', label: 'Note SSL Labs moyenne' },
    ],
    quote: '"La sécurité n\'est pas un produit, c\'est un processus." — Bruce Schneier',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Continue',
    description: 'Nous intégrons les dernières technologies — IA, edge computing, WebAssembly — pour vous donner une longueur d\'avance sur la concurrence.',
    color: 'from-primary-500/20 to-accent-500/20',
    border: 'border-primary-500/20',
    iconColor: 'text-primary-400',
    accentBg: 'bg-primary-500/10',
    tagline: 'Aujourd\'hui\'s tech, tomorrow\'s advantage.',
    intro:
      'La technologie évolue à une vitesse vertigineuse. Notre veille technologique permanente et notre culture d\'expérimentation nous permettent d\'intégrer les innovations qui créent de la valeur réelle pour votre business.',
    points: [
      { title: 'Intelligence Artificielle intégrée', desc: 'LLMs, RAG, agents autonomes — nous intégrons l\'IA là où elle crée de la valeur mesurable.' },
      { title: 'Edge Computing', desc: 'Traitement des données au plus près des utilisateurs pour des latences ultra-faibles.' },
      { title: 'WebAssembly (WASM)', desc: 'Performances quasi-natives dans le navigateur pour les applications computationnellement intensives.' },
      { title: 'Architecture serverless', desc: 'Scalabilité automatique et coûts optimisés avec AWS Lambda, Vercel Edge Functions.' },
      { title: 'Real-time & WebSockets', desc: 'Applications collaboratives, notifications instantanées et dashboards live.' },
      { title: 'Veille technologique active', desc: 'Notre équipe consacre 20% de son temps à la R&D et à l\'exploration de nouvelles technologies.' },
    ],
    proof: [
      { value: '20%', label: 'Du temps dédié à la R&D' },
      { value: '15+', label: 'Technologies maîtrisées' },
      { value: '2026', label: 'Stack toujours à jour' },
    ],
    quote: '"Innover, c\'est voir ce que tout le monde voit et penser ce que personne ne pense." — Albert Szent-Györgyi',
  },
  {
    icon: HeartHandshake,
    title: 'Partenariat Durable',
    description: 'Nous ne livrons pas juste du code. Nous construisons une relation long terme : support, maintenance, évolutions — nous sommes là à chaque étape.',
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
    accentBg: 'bg-pink-500/10',
    tagline: 'Votre succès est notre succès.',
    intro:
      'Nous ne sommes pas un prestataire qui livre et disparaît. Nous nous impliquons dans votre réussite sur le long terme, en comprenant vos enjeux business et en évoluant avec vous.',
    points: [
      { title: 'Interlocuteur dédié', desc: 'Un chef de projet unique qui connaît votre contexte et assure la continuité de la relation.' },
      { title: 'Transparence totale', desc: 'Accès en temps réel à l\'avancement, aux métriques et aux décisions techniques via nos outils de suivi.' },
      { title: 'Support réactif', desc: 'Temps de réponse garanti < 4h en jours ouvrés, < 2h pour les incidents critiques.' },
      { title: 'Maintenance évolutive', desc: 'Mises à jour de sécurité, montées de version et évolutions fonctionnelles planifiées.' },
      { title: 'Transfert de compétences', desc: 'Formation de vos équipes, documentation exhaustive et code commenté pour votre autonomie.' },
      { title: 'Revues trimestrielles', desc: 'Points réguliers pour aligner la roadmap technique avec vos objectifs business.' },
    ],
    proof: [
      { value: '92%', label: 'Taux de fidélisation clients' },
      { value: '3 ans', label: 'Durée moyenne de partenariat' },
      { value: '< 4h', label: 'Temps de réponse support' },
    ],
    quote: '"Les meilleurs partenariats naissent d\'une confiance mutuelle et d\'objectifs partagés."',
  },
  {
    icon: Clock,
    title: 'Livraison dans les Délais',
    description: 'Méthodologie Agile rigoureuse, sprints de 2 semaines, démos régulières. 97% de nos projets sont livrés dans les délais et le budget convenus.',
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    tagline: 'On livre ce qu\'on promet, quand on le promet.',
    intro:
      'Les retards de projet coûtent cher — en argent, en opportunités manquées et en confiance. Notre méthodologie Agile éprouvée et notre culture de la responsabilité nous permettent de tenir nos engagements.',
    points: [
      { title: 'Sprints de 2 semaines', desc: 'Cycles courts avec des livrables concrets à chaque sprint — vous voyez l\'avancement en temps réel.' },
      { title: 'Estimation rigoureuse', desc: 'Story points, planning poker et buffer de risque intégrés dès le départ pour des estimations réalistes.' },
      { title: 'Démos bi-hebdomadaires', desc: 'Présentation des fonctionnalités développées à chaque fin de sprint pour validation immédiate.' },
      { title: 'Gestion proactive des risques', desc: 'Identification et mitigation des risques dès la phase de cadrage, pas en cours de projet.' },
      { title: 'Outils de suivi transparents', desc: 'Jira, Linear ou Notion partagés — vous avez accès au backlog et à la vélocité de l\'équipe.' },
      { title: 'Escalade rapide', desc: 'Tout blocage est remonté et résolu en < 24h pour ne jamais perdre de momentum.' },
    ],
    proof: [
      { value: '97%', label: 'Projets livrés dans les délais' },
      { value: '2 sem.', label: 'Durée d\'un sprint' },
      { value: '0€', label: 'Surcoût moyen sur budget' },
    ],
    quote: '"La ponctualité est la politesse des rois — et des développeurs sérieux."',
  },
  {
    icon: Trophy,
    title: 'Excellence Reconnue',
    description: 'Certifiés AWS, Google Cloud Partner et Microsoft Gold Partner. Nos équipes sont formées aux meilleures pratiques de l\'industrie.',
    color: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    tagline: 'L\'excellence n\'est pas un accident.',
    intro:
      'Nos certifications, nos processus qualité et notre culture d\'amélioration continue sont la garantie que chaque projet bénéficie du meilleur de notre expertise. Nous ne nous contentons pas du "ça marche" — nous visons le "c\'est parfait".',
    points: [
      { title: 'Certifications cloud', desc: 'AWS Certified Solutions Architect, Google Cloud Professional, Microsoft Azure Expert.' },
      { title: 'Code reviews systématiques', desc: 'Chaque ligne de code est relue par un pair avant d\'être mergée — zéro dette technique non assumée.' },
      { title: 'Tests automatisés', desc: 'Couverture de tests > 80% sur tous nos projets : unitaires, intégration et end-to-end.' },
      { title: 'Documentation exhaustive', desc: 'README, ADRs, Swagger API, guides de déploiement — tout est documenté et maintenu à jour.' },
      { title: 'Formation continue', desc: 'Budget formation annuel par développeur, conférences, certifications et veille technologique.' },
      { title: 'Processus ISO-inspirés', desc: 'Gestion de la qualité, revues post-mortem et amélioration continue intégrées à notre culture.' },
    ],
    proof: [
      { value: '8+', label: 'Certifications cloud actives' },
      { value: '80%+', label: 'Couverture de tests' },
      { value: '4.9★', label: 'Note clients moyenne' },
    ],
    quote: '"La qualité n\'est jamais un accident. C\'est toujours le résultat d\'un effort intelligent." — John Ruskin',
  },
];

export default function WhyUs() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="why-us" className="py-24 bg-dark-800 relative overflow-hidden">
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
            <span className="block mt-2 text-sm text-slate-500">Cliquez sur une valeur pour en savoir plus.</span>
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
              onClick={() => setSelected(value)}
              className={`relative p-7 rounded-2xl bg-gradient-to-br ${value.color} border ${value.border} backdrop-blur-sm group transition-all duration-300 cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-xl bg-dark-800/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <value.icon className={`w-6 h-6 ${value.iconColor}`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {value.description}
              </p>
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${value.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <span>En savoir plus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${value.color.replace('/20', '')} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`} />
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

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-white/10 rounded-3xl shadow-2xl"
            >
              {/* Header */}
              <div className={`relative p-8 pb-6 bg-gradient-to-br ${selected.color} border-b border-white/10`}>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-dark-800/60 border border-white/10 rounded-2xl flex items-center justify-center">
                    <selected.icon className={`w-7 h-7 ${selected.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">{selected.title}</h2>
                    <p className="text-slate-300 text-sm mt-0.5 italic">{selected.tagline}</p>
                  </div>
                </div>

                {/* Proof stats */}
                <div className="grid grid-cols-3 gap-3">
                  {selected.proof.map((p, i) => (
                    <div key={i} className="bg-dark-900/40 rounded-xl p-3 text-center border border-white/5">
                      <div className="font-display text-xl font-bold text-white">{p.value}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-7">
                {/* Intro */}
                <p className="text-slate-300 leading-relaxed">{selected.intro}</p>

                {/* Points */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <ChevronRight className={`w-5 h-5 ${selected.iconColor}`} />
                    Comment nous le faisons
                  </h3>
                  <div className="space-y-3">
                    {selected.points.map((pt, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-white/[0.03] border border-white/8 rounded-xl hover:border-white/15 transition-colors">
                        <CheckCircle className={`w-5 h-5 ${selected.iconColor} flex-shrink-0 mt-0.5`} />
                        <div>
                          <div className="text-white text-sm font-semibold mb-0.5">{pt.title}</div>
                          <div className="text-slate-400 text-xs leading-relaxed">{pt.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className={`p-5 rounded-xl ${selected.accentBg} border ${selected.border}`}>
                  <Star className={`w-4 h-4 ${selected.iconColor} mb-2`} />
                  <p className={`text-sm italic ${selected.iconColor} leading-relaxed`}>
                    {selected.quote}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={() => {
                      setSelected(null);
                      setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200);
                    }}
                    className="btn-primary flex-1 justify-center py-3.5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Démarrer un projet
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <button
                    onClick={() => setSelected(null)}
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
    </section>
  );
}
