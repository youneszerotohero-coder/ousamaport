import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper to convert arrays back into keyed objects
const toObject = (arr) => {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    return toObject(data);
  } catch (error) {
    console.warn('Backend offline or services fetch failed, falling back to static data:', error);
    return servicesData;
  }
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return toObject(data);
  } catch (error) {
    console.warn('Backend offline or projects fetch failed, falling back to static data:', error);
    return projectsData;
  }
};

export const fetchContact = async () => {
  const fallbackContact = {
    id: 'main',
    whatsapp: '+15551234567',
    viber: '+15551234567',
    telegram: 'elecpro_admin',
    email: 'contact@elecpro.com',
    phone: '+1 (555) 123-4567',
    address: '123 Rue de l\'Électricité, Paris, France',
    company_name: 'ELECPRO',
    description: 'Solutions électriques de premier choix, conçues pour la sécurité et l\'énergie durable.',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  };

  try {
    const res = await fetch(`${API_BASE_URL}/contact`);
    if (!res.ok) throw new Error('Failed to fetch contact details');
    return await res.json();
  } catch (error) {
    console.warn('Backend offline or contact fetch failed, falling back to static contact details:', error);
    return fallbackContact;
  }
};

// CRUD Operations (primarily used in the Admin Dashboard)

export const createService = async (service) => {
  const res = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service)
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to create service');
  }
  return await res.json();
};

export const updateService = async (id, service) => {
  const res = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service)
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to update service');
  }
  return await res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to delete service');
  }
  return await res.json();
};

export const createProject = async (project) => {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to create project');
  }
  return await res.json();
};

export const updateProject = async (id, project) => {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to update project');
  }
  return await res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to delete project');
  }
  return await res.json();
};

export const updateContact = async (contact) => {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to update contact details');
  }
  return await res.json();
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Failed to upload image');
  }
  return await res.json(); // { url: '...' }
};

export const adminLogin = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || 'Identifiants invalides');
  }
  return await res.json(); // { success: true, token: '...', username: '...' }
};
