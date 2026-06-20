import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';

const ServiceDetails = ({ serviceId, onBack, services = servicesData, onOpenContact }) => {
  const data = services[serviceId];

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0A0B10] flex flex-col items-center justify-center p-8 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Service Introuvable</h1>
        <p className="text-gray-400 mb-6">Le service demandé n'existe pas ou a été déplacé.</p>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-[#90EE90] hover:bg-white transition-colors duration-300 text-black font-semibold rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" /> Retour à l'accueil
        </button>
      </div>
    );
  }

  // Extract images for the slideshow
  const sliderImages = [
    data.image,
    ...(data.gallery && data.gallery.length > 0 
      ? data.gallery 
      : (data.projects ? data.projects.map((p) => p.image) : []))
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white pt-24">
      {/* Top sticky navigation bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-[#0A0B10]/80 backdrop-blur-md border-b border-white/5 py-3 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto w-full">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-[#90EE90] transition-colors duration-300 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Retour à l'accueil</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#90EE90]"></span>
          <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">{data.category}</span>
        </div>
      </div>

      {/* Main Page Layout */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 space-y-12">
        {/* Title & Tagline Header */}
        <div className="space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#90EE90] uppercase block">
            {data.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-[#90EE90] font-medium leading-relaxed max-w-2xl">
            {data.tagline}
          </p>
        </div>

        {/* Elegant Image Slider */}
        <ImageSlider images={sliderImages} />

        {/* Description & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4 border-t border-white/5">
          {/* Main Description */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-[#90EE90] uppercase tracking-wider">Description du Service</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Clean bulleted list of benefits, no card elements */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-[#90EE90] uppercase tracking-wider">Avantages Clés</h2>
            <ul className="space-y-3">
              {data.benefits && data.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#90EE90] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
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

        {/* Back and Call to Action */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all duration-300 text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux services
          </button>
          <button 
            onClick={() => {
              if (onOpenContact) {
                onOpenContact();
              } else {
                onBack();
                setTimeout(() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 300);
              }
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#90EE90] hover:bg-white text-black font-bold rounded-xl transition-all duration-300 text-sm cursor-pointer shadow-lg shadow-[#90EE90]/10"
          >
            Demander un Devis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceDetails;
