import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Briefcase, Globe, Network, Database, Cpu, MapPin, Wrench, Code2, Phone } from 'lucide-react';
import { fetchProjects } from '../lib/api';

// Fallback si l'API est indisponible
const fallbackProjects = [
  {
    id: '1',
    name: 'SIG SARL',
    description:
      'Site vitrine complet pour SIG SARL (Solutions Informatiques et de Gestion) — Yaoundé, Cameroun. Présentation des services : MATRIIX ERP, réseaux, télécommunication, tracking GPS, bases de données et maintenance informatique.',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    project_url: 'https://www.sig-sarl.com',
    service: { title: 'Développement Web' },
  },
];

// Services proposés par SIG SARL — affichés comme tags dans la carte
const sigServices = [
  { icon: Cpu,      label: 'MATRIIX ERP' },
  { icon: Network,  label: 'Réseaux & VPN' },
  { icon: Database, label: 'Bases de données' },
  { icon: Phone,    label: 'Télécommunication' },
  { icon: MapPin,   label: 'Tracking GPS' },
  { icon: Wrench,   label: 'Maintenance IT' },
  { icon: Code2,    label: 'Programmation' },
  { icon: Cpu,      label: 'Systèmes informatiques' },
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        // Injecter l'URL du projet si absent de la DB
        const enriched = data.map((p) =>
          p.name === 'SIG SARL' ? { ...p, project_url: 'https://www.sig-sarl.com' } : p
        );
        setProjects(enriched);
      })
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-dark-900 relative overflow-hidden">
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
            <Briefcase className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="section-title mb-4">
            Nos réalisations{' '}
            <span className="gradient-text">parlent d'elles-mêmes</span>
          </h2>
          <p className="section-subtitle">
            Découvrez les projets qui illustrent notre savoir-faire et notre capacité
            à relever des défis technologiques complexes.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(1)].map((_, i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="h-64 bg-white/10" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const isSig = project.name === 'SIG SARL';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group glass-card overflow-hidden hover:border-primary-500/30 transition-all duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Image side ── */}
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <img
            src={project.image_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-900/60 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent lg:hidden" />

          {/* Live badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 border border-green-500/40 backdrop-blur-sm rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold">Site en ligne</span>
          </div>

          {/* Service badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-primary-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-primary-400/30">
              {project.service?.title}
            </span>
          </div>
        </div>

        {/* ── Content side ── */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            {/* Title + URL */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-primary-200 transition-colors">
                  {project.name}
                </h3>
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {project.project_url.replace('https://', '')}
                  </a>
                )}
              </div>
              {project.project_url && (
                <motion.a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-10 h-10 bg-primary-600/20 hover:bg-primary-600/40 border border-primary-500/30 rounded-xl flex items-center justify-center text-primary-400 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Visiter le site"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Services tags — spécifique SIG SARL */}
            {isSig && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Services couverts
                </p>
                <div className="flex flex-wrap gap-2">
                  {sigServices.map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-dark-700/60 border border-white/10 rounded-lg text-slate-300 text-xs font-medium"
                    >
                      <s.icon className="w-3 h-3 text-primary-400" />
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          {project.project_url && (
            <div className="mt-8">
              <motion.a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex text-sm py-3 px-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Globe className="w-4 h-4" />
                Visiter sig-sarl.com
              </motion.a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
