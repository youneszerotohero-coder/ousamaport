import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit2, Save, X, Phone, Mail, MapPin, 
  Globe, Info, PlusCircle, Check, ArrowLeft, Loader2, Link, Lock, User, LogOut
} from 'lucide-react';
import { 
  fetchServices, fetchProjects, fetchContact, 
  createService, updateService, deleteService,
  createProject, updateProject, deleteProject,
  updateContact, uploadImage, adminLogin,
  fetchProjectCategories, createProjectCategory
} from '../lib/api';

const ImageUploadInput = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const res = await uploadImage(file);
      onChange(res.url);
    } catch (err) {
      setUploadError('Échec du téléchargement');
    } finally {
      setUploading(false);
    }
  };

  // Safe ID for input elements
  const inputId = `file-upload-${label.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${Math.round(Math.random() * 10000)}`;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-gray-400 uppercase">{label}</label>
      <div className="flex items-center gap-4 bg-[#0A0B10] border border-white/10 rounded-xl p-3">
        {value ? (
          <img 
            src={value} 
            alt="Preview" 
            className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-dashed border-white/20 flex items-center justify-center shrink-0">
            <span className="text-[10px] text-gray-500">No image</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={inputId}
          />
          <label 
            htmlFor={inputId}
            className="inline-block px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold cursor-pointer border border-white/10 transition"
          >
            {uploading ? 'Téléchargement...' : 'Choisir un fichier'}
          </label>
          {uploadError && <span className="block text-[10px] text-red-400 mt-1">{uploadError}</span>}
          {value && (
            <div className="text-[10px] text-gray-500 truncate mt-1 max-w-[200px]" title={value}>
              {value.substring(value.lastIndexOf('/') + 1)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onBack, onDataChanged }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'projects' | 'contact'
  
  const [services, setServices] = useState({});
  const [projects, setProjects] = useState({});
  const [contact, setContact] = useState(null);
  const [projectCategories, setProjectCategories] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Editing states
  const [editingItem, setEditingItem] = useState(null); // { type: 'service' | 'project', id: string | null }
  const [serviceForm, setServiceForm] = useState(null);
  const [projectForm, setProjectForm] = useState(null);
  const [contactForm, setContactForm] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('elecpro_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      const data = await adminLogin(loginUsername, loginPassword);
      if (data.success) {
        localStorage.setItem('elecpro_admin_token', data.token);
        localStorage.setItem('elecpro_admin_user', data.username);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setLoginError(err.message || 'Identifiants invalides');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('elecpro_admin_token');
    localStorage.removeItem('elecpro_admin_user');
    setIsAuthenticated(false);
  };

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [sData, pData, cData, catData] = await Promise.all([
        fetchServices(),
        fetchProjects(),
        fetchContact(),
        fetchProjectCategories()
      ]);
      setServices(sData);
      setProjects(pData);
      setContact(cData);
      setContactForm(cData);
      setProjectCategories(catData || []);
    } catch (err) {
      setError('Erreur lors du chargement des données. Assurez-vous que le serveur backend est en cours d\'exécution.');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // ----------------------------------------------------
  // CONTACT SUBMIT
  // ----------------------------------------------------
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updated = await updateContact(contactForm);
      setContact(updated);
      await onDataChanged?.();
      showSuccess('Informations de contact mises à jour avec succès !');
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour des contacts.');
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------
  // SERVICE FORM INITIALIZER
  // ----------------------------------------------------
  const initNewService = () => {
    setEditingItem({ type: 'service', id: null });
    setServiceForm({
      id: '',
      title: '',
      category: '',
      image: '/pic1.jpg',
      tagline: '',
      description: '',
      benefits: [''],
      features: [],
      specifications: [],
      workflow: [],
      projects: [],
      gallery: [],
      testimonial: { quote: '', author: '', role: '' },
      calculator: {
        basePrice: 100,
        unitName: 'Superficie (m²)',
        minUnit: 10,
        maxUnit: 1000,
        stepUnit: 10,
        options: [{ id: 'opt1', label: '', pricePerUnit: 0, priceFixed: 0 }]
      }
    });
  };

  const initEditService = (service) => {
    setEditingItem({ type: 'service', id: service.id });
    setServiceForm({
      ...service,
      benefits: service.benefits?.length ? [...service.benefits] : [''],
      features: service.features?.length ? [...service.features] : [],
      specifications: service.specifications?.length ? [...service.specifications] : [],
      workflow: service.workflow?.length ? [...service.workflow] : [],
      projects: service.projects?.length ? [...service.projects] : [],
      gallery: service.gallery?.length ? [...service.gallery] : [],
      testimonial: service.testimonial || { quote: '', author: '', role: '' },
      calculator: service.calculator || {
        basePrice: 100,
        unitName: 'Superficie (m²)',
        minUnit: 10,
        maxUnit: 1000,
        stepUnit: 10,
        options: [{ id: 'opt1', label: '', pricePerUnit: 0, priceFixed: 0 }]
      }
    });
  };

  // ----------------------------------------------------
  // SERVICE FORM SAVE & DELETE
  // ----------------------------------------------------
  const handleServiceSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    // Clean up empty form arrays
    const cleanedBenefits = serviceForm.benefits.filter(b => b.trim() !== '');
    const cleanedFeatures = [];
    const cleanedSpecs = [];
    const cleanedWorkflow = [];
    const cleanedProjects = (serviceForm.projects || []).filter(p => p && p.name && p.name.trim() !== '');
    const cleanedOptions = serviceForm.calculator.options.filter(o => o.label.trim() !== '');

    const finalForm = {
      ...serviceForm,
      benefits: cleanedBenefits,
      features: cleanedFeatures,
      specifications: cleanedSpecs,
      workflow: cleanedWorkflow,
      projects: cleanedProjects,
      gallery: (serviceForm.gallery || []).filter(Boolean),
      calculator: {
        ...serviceForm.calculator,
        options: cleanedOptions
      }
    };

    try {
      if (editingItem.id === null) {
        // Create new
        const created = await createService(finalForm);
        setServices(prev => ({ ...prev, [created.id]: created }));
        showSuccess(`Service "${created.title}" créé avec succès !`);
      } else {
        // Update
        const updated = await updateService(editingItem.id, finalForm);
        setServices(prev => ({ ...prev, [updated.id]: updated }));
        showSuccess(`Service "${updated.title}" mis à jour avec succès !`);
      }
      await onDataChanged?.();
      setEditingItem(null);
      setServiceForm(null);
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement du service.');
    } finally {
      setSaving(false);
    }
  };

  const handleServiceDelete = async (id, title) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le service "${title}" ?`)) return;
    setError('');
    try {
      await deleteService(id);
      setServices(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      await onDataChanged?.();
      showSuccess(`Service "${title}" supprimé.`);
    } catch (err) {
      setError(err.message || 'Impossible de supprimer le service.');
    }
  };

  // ----------------------------------------------------
  // PROJECT FORM INITIALIZER
  // ----------------------------------------------------
  const initNewProject = () => {
    setEditingItem({ type: 'project', id: null });
    setProjectForm({
      id: '',
      title: '',
      category: '',
      image: '/pic1.jpg',
      client: '',
      location: '',
      duration: '',
      date: '',
      challenge: '',
      solution: '',
      gallery: [],
      testimonial: { quote: '', author: '', role: '' },
      serviceIds: []
    });
  };

  const initEditProject = (project) => {
    setEditingItem({ type: 'project', id: project.id });
    setProjectForm({
      ...project,
      gallery: project.gallery?.length ? [...project.gallery] : [],
      testimonial: project.testimonial || { quote: '', author: '', role: '' },
      serviceIds: project.serviceIds || []
    });
  };

  // ----------------------------------------------------
  // PROJECT FORM SAVE & DELETE
  // ----------------------------------------------------
  const handleProjectSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const finalForm = {
      ...projectForm,
      results: [],
      features: [],
      technologies: [],
      gallery: (projectForm.gallery || []).filter(Boolean)
    };

    try {
      if (editingItem.id === null) {
        // Create new
        const created = await createProject(finalForm);
        setProjects(prev => ({ ...prev, [created.id]: created }));
        showSuccess(`Projet "${created.title}" créé avec succès !`);
      } else {
        // Update
        const updated = await updateProject(editingItem.id, finalForm);
        setProjects(prev => ({ ...prev, [updated.id]: updated }));
        showSuccess(`Projet "${updated.title}" mis à jour avec succès !`);
      }
      await onDataChanged?.();
      setEditingItem(null);
      setProjectForm(null);
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement du projet.');
    } finally {
      setSaving(false);
    }
  };

  const handleProjectDelete = async (id, title) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${title}" ?`)) return;
    setError('');
    try {
      await deleteProject(id);
      setProjects(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      await onDataChanged?.();
      showSuccess(`Projet "${title}" supprimé.`);
    } catch (err) {
      setError(err.message || 'Impossible de supprimer le projet.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center px-4 relative overflow-hidden font-sans">
        {/* Abstract background glowing circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#90EE90]/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-green-900/5 blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#161822]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 text-white">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/ousamalogo.png" 
              alt="Logo" 
              className="w-14 h-14 object-contain mb-4 shadow-[0_0_30px_rgba(144,238,144,0.2)]" 
            />
            <h1 className="font-extrabold text-2xl tracking-widest text-white uppercase">
              Elec<span className="text-[#90EE90]">pro-dz</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wider">Espace Administration</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#90EE90]" /> Identifiant
              </label>
              <input 
                type="text" 
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Entrez votre identifiant"
                className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#90EE90]" /> Mot de passe
              </label>
              <input 
                type="password" 
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition placeholder-gray-600"
              />
            </div>

            <button 
              type="submit"
              disabled={loggingIn}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#90EE90] hover:bg-white text-black font-bold rounded-xl text-sm transition duration-300 disabled:opacity-50 cursor-pointer mt-2"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
            <button 
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Retour au site
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B10] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-[#90EE90] animate-spin mb-4" />
        <p className="text-gray-400">Chargement de la base de données SQLite...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top bar */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#90EE90]"></span>
              CMS Admin elec<span className="text-[#90EE90]">pro</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">Gérez le contenu des pages services, projets et contacts en temps réel.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-950/20 hover:bg-red-900/30 text-red-300 hover:text-red-200 font-semibold rounded-xl border border-red-500/20 transition duration-300 text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Se déconnecter
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/10 transition duration-300 text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au site
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl text-sm flex items-start gap-2.5">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-950/40 border border-green-500/20 text-green-300 rounded-xl text-sm flex items-start gap-2.5">
            <Check className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* If editing / creating a service */}
        {editingItem?.type === 'service' && serviceForm && (
          <div className="bg-[#161822]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">
                {editingItem.id === null ? 'Ajouter un Nouveau Service' : `Modifier le Service: ${serviceForm.title}`}
              </h2>
              <button 
                onClick={() => { setEditingItem(null); setServiceForm(null); }}
                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleServiceSave} className="space-y-8">
              {/* Core fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">ID Unique (ex: commercial)</label>
                  <input 
                    type="text" 
                    required
                    disabled={editingItem.id !== null}
                    value={serviceForm.id}
                    onChange={(e) => setServiceForm({ ...serviceForm, id: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Titre du Service</label>
                  <input 
                    type="text" 
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Catégorie</label>
                  <input 
                    type="text" 
                    required
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploadInput 
                  label="Image Principale" 
                  value={serviceForm.image} 
                  onChange={(url) => setServiceForm({ ...serviceForm, image: url })} 
                />
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Accroche / Tagline</label>
                  <input 
                    type="text" 
                    required
                    value={serviceForm.tagline}
                    onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description Générale</label>
                <textarea 
                  required
                  rows={4}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-[#0A0B10] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#90EE90] transition resize-none"
                />
              </div>

              {/* Slider Images / Diaporama Upload Section */}
              <div className="border-t border-white/5 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Diaporama du Service (Slider)</h3>
                    <p className="text-xs text-gray-400 mt-1">Ces images défilent dans la galerie de la page de détails du service. Si aucune image n'est ajoutée, les projets connexes seront affichés.</p>
                  </div>
                  <div>
                    <input 
                      type="file" 
                      accept="image/*"
                      id="slider-image-upload-new"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        try {
                          const res = await uploadImage(file);
                          const currentGallery = serviceForm.gallery || [];
                          setServiceForm({ 
                            ...serviceForm, 
                            gallery: [...currentGallery, res.url] 
                          });
                        } catch (err) {
                          alert('Échec du téléchargement de l\'image');
                        }
                      }}
                    />
                    <label 
                      htmlFor="slider-image-upload-new"
                      className="flex items-center gap-1.5 text-xs text-[#90EE90] hover:text-white transition cursor-pointer border border-[#90EE90]/20 hover:border-white/20 bg-white/5 px-3 py-1.5 rounded-lg"
                    >
                      <PlusCircle className="w-4 h-4" /> Ajouter une image au diaporama
                    </label>
                  </div>
                </div>
                
                {(!serviceForm.gallery || serviceForm.gallery.length === 0) ? (
                  <div className="text-xs text-gray-500 bg-[#0A0B10]/50 border border-white/5 rounded-xl p-4 text-center">
                    Aucune image personnalisée. Le diaporama utilisera l'image principale et les projets connexes.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {serviceForm.gallery.map((url, index) => (
                      <div key={index} className="relative group bg-[#0A0B10] border border-white/10 rounded-xl overflow-hidden aspect-video">
                        <img 
                          src={url} 
                          alt={`Slider ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const updatedGallery = serviceForm.gallery.filter((_, i) => i !== index);
                              setServiceForm({ ...serviceForm, gallery: updatedGallery });
                            }}
                            className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors cursor-pointer"
                            title="Supprimer cette image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Benefits (List of strings) */}
              <div className="border-t border-white/5 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Avantages Clés</h3>
                  <button 
                    type="button"
                    onClick={() => setServiceForm({ ...serviceForm, benefits: [...serviceForm.benefits, ''] })}
                    className="flex items-center gap-1.5 text-xs text-[#90EE90] hover:text-white transition"
                  >
                    <PlusCircle className="w-4 h-4" /> Ajouter un avantage
                  </button>
                </div>
                <div className="space-y-3">
                  {serviceForm.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text"
                        value={benefit}
                        placeholder="ex: Conformité réglementaire absolue"
                        onChange={(e) => {
                          const copy = [...serviceForm.benefits];
                          copy[index] = e.target.value;
                          setServiceForm({ ...serviceForm, benefits: copy });
                        }}
                        className="flex-1 bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#90EE90] transition"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const copy = serviceForm.benefits.filter((_, i) => i !== index);
                          setServiceForm({ ...serviceForm, benefits: copy.length ? copy : [''] });
                        }}
                        className="text-gray-500 hover:text-red-400 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects references from DB selection */}
              <div className="border-t border-white/5 pt-6">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Projets Réalisés Connexes</h3>
                  <p className="text-xs text-gray-400 mt-1">Sélectionnez les projets de la base de données associés à ce service pour les afficher dans le diaporama.</p>
                </div>
                {Object.keys(projects).length === 0 ? (
                  <div className="text-xs text-gray-500 bg-[#0A0B10] border border-white/10 rounded-xl p-4 text-center">
                    Aucun projet disponible dans la base de données. Créez d'abord des projets dans l'onglet Projets.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.values(projects).map((proj) => {
                      const isSelected = serviceForm.projects && serviceForm.projects.some(p => p.id === proj.id);
                      return (
                        <div 
                          key={proj.id}
                          onClick={() => {
                            const currentProjs = serviceForm.projects || [];
                            const exists = currentProjs.some(p => p.id === proj.id);
                            let updated;
                            if (exists) {
                              updated = currentProjs.filter(p => p.id !== proj.id);
                            } else {
                              updated = [...currentProjs, { 
                                id: proj.id, 
                                name: proj.title, 
                                image: proj.image, 
                                description: proj.challenge || '', 
                                stat: proj.location || '' 
                              }];
                            }
                            setServiceForm({ ...serviceForm, projects: updated });
                          }}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'bg-[#90EE90]/10 border-[#90EE90] text-white shadow-lg shadow-[#90EE90]/5' 
                              : 'bg-[#0A0B10] border-white/10 hover:border-white/20 text-gray-400'
                          }`}
                        >
                          <img 
                            src={proj.image} 
                            alt={proj.title}
                            className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold truncate text-white">{proj.title}</h4>
                            <p className="text-[10px] text-gray-500 truncate">{proj.category} • {proj.location}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-[#90EE90] border-[#90EE90] text-black' : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Testimonial (quote, author, role) */}
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Témoignage Client</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Citation / Quote</label>
                    <input 
                      type="text" 
                      value={serviceForm.testimonial.quote}
                      onChange={(e) => setServiceForm({ 
                        ...serviceForm, 
                        testimonial: { ...serviceForm.testimonial, quote: e.target.value } 
                      })}
                      className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Auteur</label>
                    <input 
                      type="text" 
                      value={serviceForm.testimonial.author}
                      onChange={(e) => setServiceForm({ 
                        ...serviceForm, 
                        testimonial: { ...serviceForm.testimonial, author: e.target.value } 
                      })}
                      className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Rôle / Poste</label>
                    <input 
                      type="text" 
                      value={serviceForm.testimonial.role}
                      onChange={(e) => setServiceForm({ 
                        ...serviceForm, 
                        testimonial: { ...serviceForm.testimonial, role: e.target.value } 
                      })}
                      className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition"
                    />
                  </div>
                </div>
              </div>



              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => { setEditingItem(null); setServiceForm(null); }}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#90EE90] hover:bg-white text-black font-bold rounded-xl text-sm transition disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Enregistrer le Service
                </button>
              </div>
            </form>
          </div>
        )}

        {/* If editing / creating a project */}
        {editingItem?.type === 'project' && projectForm && (
          <div className="bg-[#161822]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">
                {editingItem.id === null ? 'Ajouter un Nouveau Projet' : `Modifier le Projet: ${projectForm.title}`}
              </h2>
              <button 
                onClick={() => { setEditingItem(null); setProjectForm(null); }}
                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSave} className="space-y-8">
              {/* Core fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">ID Unique (ex: lighting)</label>
                  <input 
                    type="text" 
                    required
                    disabled={editingItem.id !== null}
                    value={projectForm.id}
                    onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Titre du Projet</label>
                  <input 
                    type="text" 
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Catégorie</label>
                  <select 
                    required
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition mb-2"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {projectCategories.map((cat) => (
                      <option key={cat.id || cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Nouvelle catégorie..."
                      id="new-category-input"
                      className="flex-1 bg-[#0A0B10]/50 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#90EE90]"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const input = document.getElementById('new-category-input');
                        const val = input?.value?.trim();
                        if (!val) return;
                        try {
                          const newCat = await createProjectCategory(val);
                          setProjectCategories(prev => [...prev, newCat]);
                          setProjectForm({ ...projectForm, category: newCat.name });
                          if (input) input.value = '';
                        } catch (err) {
                          alert(err.message || 'Impossible de créer la catégorie');
                        }
                      }}
                      className="px-3 py-1.5 bg-[#90EE90] hover:bg-white text-black font-semibold rounded-lg text-xs transition cursor-pointer"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Client</label>
                  <input 
                    type="text" 
                    required
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Lieu / Ville</label>
                  <input 
                    type="text" 
                    required
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Durée (ex: 3 mois)</label>
                  <input 
                    type="text" 
                    required
                    value={projectForm.duration}
                    onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Date (ex: Janvier 2026)</label>
                  <input 
                    type="text" 
                    required
                    value={projectForm.date}
                    onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition"
                  />
                </div>
                <ImageUploadInput 
                  label="Image de Couverture" 
                  value={projectForm.image} 
                  onChange={(url) => setProjectForm({ ...projectForm, image: url })} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Le Défi du Projet (Challenge)</label>
                  <textarea 
                    required
                    rows={4}
                    value={projectForm.challenge}
                    onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#90EE90] transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Notre Solution (Solution)</label>
                  <textarea 
                    required
                    rows={4}
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    className="w-full bg-[#0A0B10] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#90EE90] transition resize-none"
                  />
                </div>
              </div>

              {/* Carousel Images Section */}
              <div className="border-t border-white/5 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Diaporama du Projet (Carrousel)</h3>
                    <p className="text-xs text-gray-400 mt-1">Téléchargez des images pour le diaporama/carrousel de la page de détails du projet.</p>
                  </div>
                  <div>
                    <input 
                      type="file" 
                      accept="image/*"
                      id="project-slider-image-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        try {
                          const res = await uploadImage(file);
                          const currentGallery = projectForm.gallery || [];
                          setProjectForm({ 
                            ...projectForm, 
                            gallery: [...currentGallery, res.url] 
                          });
                        } catch (err) {
                          alert('Échec du téléchargement de l\'image');
                        }
                      }}
                    />
                    <label 
                      htmlFor="project-slider-image-upload"
                      className="flex items-center gap-1.5 text-xs text-[#90EE90] hover:text-white transition cursor-pointer border border-[#90EE90]/20 hover:border-white/20 bg-white/5 px-3 py-1.5 rounded-lg font-bold"
                    >
                      <PlusCircle className="w-4 h-4" /> Ajouter une image au diaporama
                    </label>
                  </div>
                </div>
                
                {(!projectForm.gallery || projectForm.gallery.length === 0) ? (
                  <div className="text-xs text-gray-500 bg-[#0A0B10]/50 border border-white/5 rounded-xl p-4 text-center">
                    Aucune image personnalisée. Le diaporama utilisera l'image de couverture.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {projectForm.gallery.map((url, index) => (
                      <div key={index} className="relative group bg-[#0A0B10] border border-white/10 rounded-xl overflow-hidden aspect-video">
                        <img 
                          src={url} 
                          alt={`Slider ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const updatedGallery = projectForm.gallery.filter((_, i) => i !== index);
                              setProjectForm({ ...projectForm, gallery: updatedGallery });
                            }}
                            className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors cursor-pointer"
                            title="Supprimer cette image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Associated Services selection */}
              <div className="border-t border-white/5 pt-6">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Services Connexes</h3>
                  <p className="text-xs text-gray-400 mt-1">Sélectionnez les services associés à ce projet. Ce projet s'affichera dans le diaporama de ces services.</p>
                </div>
                {Object.keys(services).length === 0 ? (
                  <div className="text-xs text-gray-500 bg-[#0A0B10] border border-white/10 rounded-xl p-4 text-center">
                    Aucun service disponible. Créez d'abord des services dans l'onglet Services.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.values(services).map((srv) => {
                      const isSelected = projectForm.serviceIds && projectForm.serviceIds.includes(srv.id);
                      return (
                        <div 
                          key={srv.id}
                          onClick={() => {
                            const currentSrvIds = projectForm.serviceIds || [];
                            const exists = currentSrvIds.includes(srv.id);
                            let updated;
                            if (exists) {
                              updated = currentSrvIds.filter(id => id !== srv.id);
                            } else {
                              updated = [...currentSrvIds, srv.id];
                            }
                            setProjectForm({ ...projectForm, serviceIds: updated });
                          }}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'bg-[#90EE90]/10 border-[#90EE90] text-white shadow-lg shadow-[#90EE90]/5' 
                              : 'bg-[#0A0B10] border-white/10 hover:border-white/20 text-gray-400'
                          }`}
                        >
                          <img 
                            src={srv.image} 
                            alt={srv.title}
                            className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold truncate text-white">{srv.title}</h4>
                            <p className="text-[10px] text-gray-500 truncate">{srv.category}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-[#90EE90] border-[#90EE90] text-black' : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Testimonial */}
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Témoignage du Client pour ce Projet</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Quote / Citation</label>
                    <input 
                      type="text" 
                      value={projectForm.testimonial.quote}
                      onChange={(e) => setProjectForm({ 
                        ...projectForm, 
                        testimonial: { ...projectForm.testimonial, quote: e.target.value } 
                      })}
                      className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Auteur</label>
                    <input 
                      type="text" 
                      value={projectForm.testimonial.author}
                      onChange={(e) => setProjectForm({ 
                        ...projectForm, 
                        testimonial: { ...projectForm.testimonial, author: e.target.value } 
                      })}
                      className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Rôle</label>
                    <input 
                      type="text" 
                      value={projectForm.testimonial.role}
                      onChange={(e) => setProjectForm({ 
                        ...projectForm, 
                        testimonial: { ...projectForm.testimonial, role: e.target.value } 
                      })}
                      className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#90EE90] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => { setEditingItem(null); setProjectForm(null); }}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#90EE90] hover:bg-white text-black font-bold rounded-xl text-sm transition disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Enregistrer le Projet
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Normal lists display */}
        {!editingItem && (
          <div>
            {/* Tabs Selector */}
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl mb-8 max-w-md">
              <button 
                onClick={() => setActiveTab('services')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition cursor-pointer ${
                  activeTab === 'services' ? 'bg-[#90EE90] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition cursor-pointer ${
                  activeTab === 'projects' ? 'bg-[#90EE90] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Projets
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition cursor-pointer ${
                  activeTab === 'contact' ? 'bg-[#90EE90] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Contacts
              </button>
            </div>

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Liste des Services</h2>
                  <button 
                    onClick={initNewService}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#90EE90] text-black hover:bg-white transition duration-300 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Ajouter un service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(services).map((service) => (
                    <div key={service.id} className="bg-[#161822]/40 border border-white/10 rounded-2xl p-6 flex gap-4 items-start group relative">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-20 h-20 object-cover rounded-xl border border-white/5"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[#90EE90] text-[10px] font-bold uppercase tracking-wider">{service.category}</span>
                        <h3 className="text-base font-bold text-white truncate mt-0.5">{service.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 mt-1">{service.tagline}</p>
                        
                        <div className="flex gap-3 mt-4">
                          <button 
                            onClick={() => initEditService(service)}
                            className="flex items-center gap-1 text-[11px] text-gray-300 hover:text-[#90EE90] transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Modifier
                          </button>
                          <button 
                            onClick={() => handleServiceDelete(service.id, service.title)}
                            className="flex items-center gap-1 text-[11px] text-gray-300 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {Object.keys(services).length === 0 && (
                    <div className="col-span-2 text-center py-10 bg-white/2 border border-dashed border-white/10 rounded-2xl text-gray-500">
                      Aucun service enregistré dans la base de données.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Liste des Projets</h2>
                  <button 
                    onClick={initNewProject}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#90EE90] text-black hover:bg-white transition duration-300 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Ajouter un projet
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(projects).map((project) => (
                    <div key={project.id} className="bg-[#161822]/40 border border-white/10 rounded-2xl p-6 flex gap-4 items-start group relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-20 h-20 object-cover rounded-xl border border-white/5"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[#90EE90] text-[10px] font-bold uppercase tracking-wider">{project.category}</span>
                        <h3 className="text-base font-bold text-white truncate mt-0.5">{project.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">Client: {project.client} | {project.location}</p>
                        
                        <div className="flex gap-3 mt-4">
                          <button 
                            onClick={() => initEditProject(project)}
                            className="flex items-center gap-1 text-[11px] text-gray-300 hover:text-[#90EE90] transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Modifier
                          </button>
                          <button 
                            onClick={() => handleProjectDelete(project.id, project.title)}
                            className="flex items-center gap-1 text-[11px] text-gray-300 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {Object.keys(projects).length === 0 && (
                    <div className="col-span-2 text-center py-10 bg-white/2 border border-dashed border-white/10 rounded-2xl text-gray-500">
                      Aucun projet enregistré dans la base de données.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: CONTACT DETAILS */}
            {activeTab === 'contact' && contactForm && (
              <div className="bg-[#161822]/40 border border-white/10 rounded-2xl p-8 max-w-3xl">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-white/5">Coordonnées de l'Entreprise</h2>
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#90EE90]" /> Nom de l'Entreprise
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.company_name}
                        onChange={(e) => setContactForm({ ...contactForm, company_name: e.target.value })}
                        className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#90EE90]" /> Téléphone
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#90EE90]" /> E-mail de Contact
                      </label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#90EE90]" /> Adresse Physique
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.address}
                        onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                        className="w-full bg-[#0A0B10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Liens Messageries (Popup Contact Flottant)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Numéro WhatsApp (ex: +33612345678)</label>
                        <input 
                          type="text" 
                          value={contactForm.whatsapp}
                          onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                          className="w-full bg-[#0A0B10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#90EE90]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Numéro Viber (ex: +33612345678)</label>
                        <input 
                          type="text" 
                          value={contactForm.viber}
                          onChange={(e) => setContactForm({ ...contactForm, viber: e.target.value })}
                          className="w-full bg-[#0A0B10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#90EE90]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Username Telegram (sans @)</label>
                        <input 
                          type="text" 
                          value={contactForm.telegram}
                          onChange={(e) => setContactForm({ ...contactForm, telegram: e.target.value })}
                          className="w-full bg-[#0A0B10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#90EE90]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Réseaux Sociaux</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Lien Facebook (ex: https://facebook.com/page)</label>
                        <input 
                          type="url" 
                          value={contactForm.facebook || ''}
                          onChange={(e) => setContactForm({ ...contactForm, facebook: e.target.value })}
                          className="w-full bg-[#0A0B10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#90EE90]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Lien Instagram (ex: https://instagram.com/compte)</label>
                        <input 
                          type="url" 
                          value={contactForm.instagram || ''}
                          onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                          className="w-full bg-[#0A0B10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#90EE90]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description / Slogan Footer</label>
                    <textarea 
                      required
                      rows={3}
                      value={contactForm.description}
                      onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                      className="w-full bg-[#0A0B10] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#90EE90] transition resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-[#90EE90] hover:bg-white text-black font-bold rounded-xl text-sm transition disabled:opacity-50 cursor-pointer"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Enregistrer les Contacts
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
