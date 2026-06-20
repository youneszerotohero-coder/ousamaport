import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Grid } from 'lucide-react';
import { gsap } from 'gsap';

const ProjectsPage = ({ projects, onSelectProject, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const containerRef = useRef(null);

  const projectsArray = projects 
    ? (Array.isArray(projects) ? projects : Object.values(projects)) 
    : [
        { id: "lighting", title: "Installation d'Éclairage Commercial", category: "Commercial", image: "/pic1.jpg" },
        { id: "wiring", title: "Mise à Niveau du Câblage Résidentiel", category: "Résidentiel", image: "/pic2.jpg" },
        { id: "switchboard", title: "Installation de Tableaux Industriels", category: "Industriel", image: "/pic3.jpg" },
        { id: "domotics", title: "Intégration Domotique Résidentielle", category: "Systèmes Intelligents", image: "/pic4.png" }
      ];

  const categories = ['Tous', 'Commercial', 'Résidentiel', 'Industriel', 'Systèmes Intelligents'];

  const filteredProjects = selectedCategory === 'Tous' 
    ? projectsArray 
    : projectsArray.filter(p => p.category === selectedCategory);

  useEffect(() => {
    // Stagger animation on load / filter change
    const cards = containerRef.current?.querySelectorAll('.project-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white pt-28 pb-24 font-sans relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#90EE90]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-green-950/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Navigation / Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-xs font-semibold text-[#90EE90] uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition duration-300 cursor-pointer mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Retour à l'accueil
            </button>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
              Tous nos <span className="text-[#90EE90]" style={{ textShadow: '0 0 15px rgba(144,238,144,0.3)' }}>Projets</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg mt-1 font-semibold uppercase tracking-wider">
              Découvrez la diversité de nos réalisations industrielles, tertiaires et résidentielles.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-gray-500 font-mono text-xs border border-white/5 bg-[#12131A] px-4 py-2.5 rounded-xl">
            <Grid className="w-3.5 h-3.5 text-[#90EE90]" />
            <span>{filteredProjects.length} PROJETS RÉPERTORIÉS</span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#90EE90] text-black shadow-[0_0_20px_rgba(144,238,144,0.25)]'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject?.(project.id)}
                className="project-card group relative overflow-hidden rounded-2xl bg-[#161822]/60 border border-white/15 aspect-[4/3] shadow-lg hover:shadow-2xl cursor-pointer transition-shadow duration-500"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 translate-y-3 group-hover:translate-y-0 transition-transform">
                  <span className="text-[#90EE90] text-xs font-bold uppercase tracking-wider mb-1">{project.category}</span>
                  <h3 className="text-lg font-bold text-white mb-2.5 leading-snug">{project.title}</h3>
                  <span className="text-xs text-gray-300 group-hover:text-[#90EE90] transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider">
                    Détails du projet <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-[#12131A] border border-white/5 rounded-2xl">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectsPage;
