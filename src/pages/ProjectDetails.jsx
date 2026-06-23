import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';

const ProjectDetails = ({ projectId, onBack, onSelectProject, projects = projectsData }) => {
  const data = projects[projectId];

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0A0B10] flex flex-col items-center justify-center p-8 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Projet Introuvable</h1>
        <p className="text-gray-400 mb-6">Le projet demandé n'existe pas ou a été déplacé.</p>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-[#90EE90] hover:bg-white transition-colors duration-300 text-black font-semibold rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" /> Retour aux projets
        </button>
      </div>
    );
  }

  // Find next project for quick navigation at the bottom
  const projectIds = Object.keys(projects);
  const currentIndex = projectIds.indexOf(projectId);
  const nextProjectId = projectIds[(currentIndex + 1) % projectIds.length];
  const nextProject = projects[nextProjectId];

  // Prepare slider images
  const sliderImages = data.gallery && data.gallery.length > 0 ? data.gallery : [data.image];

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white pt-24">
      {/* Top sticky navigation bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-[#0A0B10]/80 backdrop-blur-md border-b border-white/5 py-3 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto w-full">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-[#90EE90] transition-colors duration-300 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Retour aux projets</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#90EE90]"></span>
          <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">{data.category}</span>
        </div>
      </div>

      {/* Main Page Layout */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 space-y-12">
        {/* Title & Metadata Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#90EE90] uppercase">
            <span>{data.category}</span>
            <span>•</span>
            <span>{data.location}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            {data.title}
          </h1>
          <p className="text-sm text-gray-400">
            Client: <span className="text-white font-medium">{data.client}</span> &nbsp;|&nbsp; Date: <span className="text-white font-medium">{data.date}</span> &nbsp;|&nbsp; Durée: <span className="text-white font-medium">{data.duration}</span>
          </p>
        </div>

        {/* Elegant Image Slider */}
        <ImageSlider images={sliderImages} />

        {/* Description Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-white/5">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#90EE90] uppercase tracking-wider">Le Défi du Projet</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              {data.challenge}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#90EE90] uppercase tracking-wider">Notre Solution</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              {data.solution}
            </p>
          </div>
        </div>

        {/* Testimonial Quote */}
        {data.testimonial && (
          <div className="pt-8 border-t border-white/5 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-5xl font-serif text-[#90EE90] leading-none block">“</span>
            <p className="text-lg md:text-xl text-gray-200 italic font-medium leading-relaxed">
              {data.testimonial.quote}
            </p>
            <div className="text-sm">
              <span className="text-white font-bold block">{data.testimonial.author}</span>
              <span className="text-gray-500 text-xs block mt-0.5">{data.testimonial.role}</span>
            </div>
          </div>
        )}

        {/* Bottom Cross-Navigation (Next Project) */}
        <div className="pt-12 border-t border-white/5">
          <div 
            onClick={() => onSelectProject(nextProjectId)}
            className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/5 hover:border-[#90EE90]/20 transition-all duration-300 cursor-pointer gap-6"
          >
            <div>
              <span className="text-xs text-[#90EE90] font-bold uppercase tracking-widest block mb-1">Projet Suivant</span>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#90EE90] transition-colors">{nextProject.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{nextProject.category} — {nextProject.location}</p>
            </div>
            <span className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#90EE90] transition-colors">
              Découvrir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetails;
