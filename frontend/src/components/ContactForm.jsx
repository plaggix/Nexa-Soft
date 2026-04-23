import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, CheckCircle, AlertCircle, Mail, User,
  MessageSquare, FileText, Phone, MapPin, ExternalLink
} from 'lucide-react';
import { submitContact } from '../lib/api';

const WHATSAPP_NUMBER = '237694672953';

const contactInfo = [
  { icon: Mail,  label: 'Email',     value: 'nexasoft@gmail.com',  href: 'mailto:nexasoft@gmail.com' },
  { icon: Phone, label: 'Téléphone', value: '+237 694 672 953',    href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { icon: MapPin,label: 'Adresse',   value: 'Yaoundé, Cameroun',   href: null },
];

export default function ContactForm() {
  const [form, setForm]       = useState({ full_name: '', email: '', subject: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const result = await submitContact(form);

      // URL WhatsApp retournée par l'API (ou construite en fallback)
      const waUrl =
        result.data?.whatsapp_url ||
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Bonjour Nexa Soft,\n\nJe suis ${form.full_name}. Je viens de vous envoyer un message via votre site concernant : "${form.subject}".\n\nCordialement.`
        )}`;

      setWhatsappUrl(waUrl);
      setStatus('success');
      setForm({ full_name: '', email: '', subject: '', message: '' });

      // Ouvrir WhatsApp automatiquement dans un nouvel onglet
      window.open(waUrl, '_blank', 'noopener,noreferrer');

    } catch (err) {
      setStatus('error');
      const errors = err.response?.data?.errors;
      setErrorMsg(
        errors?.length
          ? errors.map((e) => e.msg).join(', ')
          : err.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.'
      );
    }
  };

  const inputClass =
    'w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/60 focus:bg-dark-700/80 transition-all duration-200 text-sm';

  return (
    <section id="contact" className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

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
            <MessageSquare className="w-4 h-4" />
            Contact
          </div>
          <h2 className="section-title mb-4">
            Parlons de votre{' '}
            <span className="gradient-text">prochain projet</span>
          </h2>
          <p className="section-subtitle">
            Décrivez-nous votre vision. Notre équipe vous répond sous 24h avec
            une analyse personnalisée et une estimation gratuite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-7">
              <h3 className="font-display text-xl font-semibold text-white mb-6">
                Nos coordonnées
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-600/20 border border-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-white text-sm font-medium hover:text-primary-300 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white text-sm font-medium">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp direct CTA */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour Nexa Soft, je souhaite discuter d\'un projet.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 flex items-center gap-4 hover:border-green-500/40 transition-all duration-300 group cursor-pointer"
              whileHover={{ y: -3 }}
            >
              {/* WhatsApp icon */}
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm group-hover:text-green-300 transition-colors">
                  Discuter sur WhatsApp
                </div>
                <div className="text-slate-400 text-xs mt-0.5">Réponse rapide garantie</div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-green-400 transition-colors" />
            </motion.a>

            <div className="glass-card p-7">
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                Réponse garantie sous 24h
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Chaque demande est traitée personnellement par un expert technique.
                Pas de réponse automatique — une vraie conversation.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Équipe disponible</span>
              </div>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <AnimatePresence mode="wait">

                {/* ── SUCCESS STATE ── */}
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">
                      Message envoyé !
                    </h3>
                    <p className="text-slate-400 mb-2">
                      Votre message a été transmis à notre équipe par email.
                    </p>
                    <p className="text-slate-400 mb-8 text-sm">
                      WhatsApp s'est ouvert automatiquement pour un suivi instantané.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Ouvrir WhatsApp
                      </a>
                      <button
                        onClick={() => setStatus('idle')}
                        className="btn-outline text-sm py-3"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  </motion.div>

                ) : (
                  /* ── FORM STATE ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <User className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={form.full_name}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <Mail className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jean@entreprise.com"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <FileText className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                        Sujet *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Développement d'une application web"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet, vos besoins, votre budget estimé..."
                        required
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-red-300 text-sm">{errorMsg}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                      whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer le message
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-slate-500 text-center">
                      Votre message sera envoyé par email et WhatsApp à notre équipe.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
