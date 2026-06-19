import React, { useRef } from 'react';
import SplitText from './SplitText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Portfolio = ({ onSelectProject }) => {
  const containerRef = useRef(null);
  const projects = [
    { id: "lighting", title: "Installation d'Éclairage Commercial", category: "Commercial", image: "/pic1.jpg" },
    { id: "wiring", title: "Mise à Niveau du Câblage Résidentiel", category: "Résidentiel", image: "/pic2.jpg" },
    { id: "switchboard", title: "Installation de Tableaux Industriels", category: "Industriel", image: "/pic3.jpg" },
    { id: "domotics", title: "Intégration Domotique Résidentielle", category: "Systèmes Intelligents", image: "/pic4.png" }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.portfolio-card');
    cards.forEach((card, index) => {
      const isLeft = index % 2 === 0;
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 60,
          x: isLeft ? -30 : 30,
          rotate: isLeft ? -2 : 2,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="portfolio" 
      className="relative py-32 bg-white text-[#0A0B10] flex flex-col items-center z-30 overflow-hidden"
    >
      {/* Top Fade Layer */}
      <div 
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #0A0B10 0%, rgba(10, 11, 16, 0.9) 20%, rgba(10, 11, 16, 0.4) 60%, rgba(10, 11, 16, 0) 100%)'
        }}
      />

      {/* Bottom Fade Layer */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, #0A0B10 0%, rgba(10, 11, 16, 0.9) 20%, rgba(10, 11, 16, 0.4) 60%, rgba(10, 11, 16, 0) 100%)'
        }}
      />

      <div className="max-w-7xl w-full px-8 relative z-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex flex-col mb-4">
              <SplitText
                text="Notre"
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0B10] leading-[1.1] mb-2"
                tag="h2"
                textAlign="left"
                delay={35}
                duration={1.1}
              />
              <SplitText
                text="Portfolio"
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-green-600 leading-[1.1]"
                tag="h2"
                textAlign="left"
                delay={35}
                duration={1.1}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              onClick={() => onSelectProject?.(project.id)}
              className="portfolio-card group relative overflow-hidden rounded-2xl bg-[#1A1C23] border border-black/5 aspect-[4/3] shadow-lg hover:shadow-2xl cursor-pointer transition-shadow duration-500"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[#90EE90] text-sm font-medium mb-1">{project.category}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <span className="text-xs text-gray-400 group-hover:text-[#90EE90] transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider">
                  Voir le projet <span className="translate-x-0 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

