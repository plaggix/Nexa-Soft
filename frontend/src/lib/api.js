import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://nexa-soft-backend.onrender.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchServices = async () => {
  const { data } = await api.get('/services');
  return data.data;
};

export const fetchProjects = async () => {
  const { data } = await api.get('/projects');
  return data.data;
};

export const submitContact = async (formData) => {
  const { data } = await api.post('/contact', formData);
  return data;
};

export const fetchAdminStats = async (token) => {
  const { data } = await api.get('/admin/stats', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const fetchAdminContacts = async (token, page = 1) => {
  const { data } = await api.get(`/admin/contacts?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteContact = async (token, id) => {
  const { data } = await api.delete(`/admin/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export default api;
