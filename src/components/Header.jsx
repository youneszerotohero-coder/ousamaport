import React, { useState, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';

const Header = ({ currentServiceId, onNavigateHome, startAnimation, contact, onLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e, link) => {
    if (link === '#admin') {
      e.preventDefault();
      if (onLogin) onLogin();
      return;
    }
    if (currentServiceId) {
      e.preventDefault();
      onNavigateHome(link);
    }
  };

  const menuItems = [
    { label: 'Accueil', ariaLabel: 'Aller à l\'accueil', link: '#' },
    { label: 'À propos', ariaLabel: 'En savoir plus sur nous', link: '#about' },
    { label: 'Services', ariaLabel: 'Voir nos services', link: '#services-section' },
    { label: 'Nos Projets', ariaLabel: 'Voir nos projets', link: '#portfolio' },
    { label: 'Connexion', ariaLabel: 'Se connecter à l\'administration', link: '#admin' },
  ];

  const socialItems = [];
  if (contact?.instagram) {
    socialItems.push({ label: 'Instagram', link: contact.instagram });
  } else {
    socialItems.push({ label: 'Instagram', link: 'https://instagram.com' });
  }
  if (contact?.facebook) {
    socialItems.push({ label: 'Facebook', link: contact.facebook });
  } else {
    socialItems.push({ label: 'Facebook', link: 'https://facebook.com' });
  }

  return (
    <>
      {/* Desktop Header */}
      <header 
        className={`hidden md:block fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#0A0B10]/80 backdrop-blur-md py-4 border-white/10 shadow-lg' 
            : 'bg-transparent py-6 border-transparent'
        } ${startAnimation ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="flex items-center justify-between px-6 max-w-7xl mx-auto w-full relative">
          {/* Logo */}
          <div 
            onClick={(e) => handleNavLinkClick(e, '#')}
            className="flex items-center gap-2 pointer-events-auto cursor-pointer"
          >
            <img 
              src="/ousamalogo.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain" 
            />
            <span className="font-semibold text-lg tracking-wide text-white font-sans">Elecpro-dz</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="flex items-center gap-8 text-sm text-gray-300 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <a href="#" onClick={(e) => handleNavLinkClick(e, '#')} className="hover:text-white transition-colors">Accueil</a>
            <a href="#about" onClick={(e) => handleNavLinkClick(e, '#about')} className="hover:text-white transition-colors">À propos</a>
            <a href="#services-section" onClick={(e) => handleNavLinkClick(e, '#services-section')} className="hover:text-white transition-colors">Services</a>
            <a href="#portfolio" onClick={(e) => handleNavLinkClick(e, '#portfolio')} className="hover:text-white transition-colors">Nos Projets</a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="flex items-center gap-6 text-sm pointer-events-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (onLogin) onLogin();
              }} 
              className="text-gray-300 hover:text-white transition-colors font-medium cursor-pointer bg-transparent border-none"
            >
              Connexion
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div 
        className={`md:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b h-[70px] flex items-center ${
          isScrolled 
            ? 'bg-[#0A0B10]/95 backdrop-blur-md border-white/10 shadow-lg' 
            : 'bg-transparent border-transparent'
        } ${startAnimation ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
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
            onItemClick={handleNavLinkClick}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
