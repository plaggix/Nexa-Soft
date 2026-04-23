import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { fetchServices } from '../lib/api';

// Fallback data if API is unavailable
const fallbackServices = [
  { id: '1', title: 'Développement Web', description: 'Applications web modernes, performantes et scalables. React, Next.js, Node.js et architectures cloud.', icon_name: 'Globe' },
  { id: '2', title: 'Applications Mobiles', description: 'iOS et Android natifs ou cross-platform avec React Native et Flutter. UX soignée et performances optimales.', icon_name: 'Smartphone' },
  { id: '3', title: 'Logiciels Métier', description: 'Solutions sur mesure adaptées à vos processus. ERP, CRM, outils de gestion — nous digitalisons votre activité.', icon_name: 'Code2' },
  { id: '4', title: 'Intelligence Artificielle', description: 'Chatbots intelligents, analyse prédictive, NLP et automatisation par machine learning intégrés à vos produits.', icon_name: 'Brain' },
  { id: '5', title: 'Cloud & DevOps', description: 'Architecture AWS/GCP/Azure, CI/CD, Docker/Kubernetes. Disponibilité, sécurité et scalabilité garanties.', icon_name: 'Cloud' },
  { id: '6', title: 'UI/UX Design', description: 'Interfaces élégantes et intuitives. Prototypage Figma, design systems, tests utilisateurs — expériences mémorables.', icon_name: 'Palette' },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setServices(fallbackServices))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-primary-500/50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
            <Layers className="w-4 h-4" />
            Nos Expertises
          </div>
          <h2 className="section-title mb-4">
            Des solutions pour chaque{' '}
            <span className="gradient-text">défi digital</span>
          </h2>
          <p className="section-subtitle">
            De la conception à la mise en production, nous couvrons l'ensemble du spectre
            technologique pour transformer vos ambitions en réalité.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-7 animate-pulse">
                <div className="w-14 h-14 bg-white/10 rounded-2xl mb-5" />
                <div className="h-5 bg-white/10 rounded mb-3 w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                  <div className="h-3 bg-white/5 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
