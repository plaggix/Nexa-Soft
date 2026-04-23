import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, MessageSquare, Layers, Briefcase, Trash2,
  LogOut, RefreshCw, ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import { fetchAdminStats, fetchAdminContacts, deleteContact } from '../lib/api';

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [inputToken, setInputToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await fetchAdminStats(inputToken);
      localStorage.setItem('admin_token', inputToken);
      setToken(inputToken);
      setIsAuthenticated(true);
    } catch {
      setError('Token invalide. Accès refusé.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsAuthenticated(false);
    setStats(null);
    setContacts([]);
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    try {
      const [statsData, contactsData] = await Promise.all([
        fetchAdminStats(token),
        fetchAdminContacts(token, page),
      ]);
      setStats(statsData);
      setContacts(contactsData.data);
      setPagination(contactsData.pagination);
    } catch (err) {
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminStats(token)
        .then(() => { setIsAuthenticated(true); loadData(); })
        .catch(() => { localStorage.removeItem('admin_token'); setToken(''); });
    }
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await deleteContact(token, id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (stats) setStats((s) => ({ ...s, totalContacts: s.totalContacts - 1 }));
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Nexa Soft — Accès sécurisé</p>
          </div>

          <div className="glass-card p-8">
            <form onSubmit={login} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Token d'administration
                </label>
                <input
                  type="password"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="Entrez votre token admin..."
                  required
                  className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/60 transition-all text-sm"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary justify-center py-3.5 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Accéder au dashboard
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-slate-600 text-xs mt-6">
            Token par défaut (dev) : <code className="text-slate-400">nexasoft_admin_2024</code>
          </p>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-dark-800/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Nexa Soft Logo" className="w-8 h-8" />
            <span className="font-display font-bold text-white">NexaSoft Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => loadData(pagination.page)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Rafraîchir"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { icon: MessageSquare, label: 'Messages reçus', value: stats.totalContacts, color: 'text-primary-400' },
              { icon: Layers, label: 'Services actifs', value: stats.totalServices, color: 'text-accent-400' },
              { icon: Briefcase, label: 'Projets portfolio', value: stats.totalProjects, color: 'text-green-400' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contacts Table */}
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-display font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-400" />
              Messages des prospects
            </h2>
            <span className="text-slate-400 text-sm">{pagination.total} message(s)</span>
          </div>

          {loading && contacts.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
              Chargement...
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
              Aucun message pour le moment
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Nom', 'Email', 'Sujet', 'Date', 'Actions'].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-6 py-4 text-sm text-white font-medium">{contact.full_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{contact.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate">{contact.subject}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                          {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit', month: 'short', year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedContact(contact)}
                              className="p-1.5 text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all"
                              title="Voir le message"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(contact.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    Page {pagination.page} / {pagination.pages}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadData(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="p-2 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-white/5 rounded-lg transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => loadData(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                      className="p-2 text-slate-400 hover:text-white disabled:opacity-30 hover:bg-white/5 rounded-lg transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl font-bold text-white mb-1">{selectedContact.full_name}</h3>
              <p className="text-slate-400 text-sm mb-1">{selectedContact.email}</p>
              <p className="text-primary-400 text-sm font-medium mb-5">{selectedContact.subject}</p>
              <div className="bg-dark-700/50 rounded-xl p-4 text-slate-300 text-sm leading-relaxed mb-6">
                {selectedContact.message}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">
                  {new Date(selectedContact.created_at).toLocaleString('fr-FR')}
                </span>
                <button onClick={() => setSelectedContact(null)} className="btn-outline text-sm py-2">
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
