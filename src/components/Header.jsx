import React, { useState, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Accueil', ariaLabel: 'Aller à l\'accueil', link: '#' },
    { label: 'À propos', ariaLabel: 'En savoir plus sur nous', link: '#about' },
    { label: 'Services', ariaLabel: 'Voir nos services', link: '#services-section' },
    { label: 'Portfolio', ariaLabel: 'Voir notre portfolio', link: '#portfolio' },
    { label: 'Contact', ariaLabel: 'Nous contacter', link: '#contact' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header 
        className={`hidden md:block fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-[#0A0B10]/80 backdrop-blur-md py-4 border-white/10 shadow-lg' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 max-w-7xl mx-auto w-full relative">
          {/* Logo */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#90EE90] to-green-800 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#0A0B10]"></div>
            </div>
            <span className="font-semibold text-lg tracking-wide text-white font-sans">Elecpro</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="flex items-center gap-8 text-sm text-gray-300 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <a href="#" className="hover:text-white transition-colors">Accueil</a>
            <a href="#about" className="hover:text-white transition-colors">À propos</a>
            <a href="#services-section" className="hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="flex items-center gap-6 text-sm pointer-events-auto">
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Connexion</a>
            <a href="#" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white font-medium border border-white/5">
              S'inscrire
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div 
        className={`md:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b h-[70px] flex items-center ${
          isScrolled 
            ? 'bg-[#0A0B10]/95 backdrop-blur-md border-white/10 shadow-lg' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="w-full h-full relative">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#90EE90"
            changeMenuColorOnOpen={true}
            colors={['#0A0B10', '#161822']}
            logoUrl=""
            accentColor="#90EE90"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
