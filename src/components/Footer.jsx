import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0A0B10] z-30">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom pointer-events-none opacity-90"
        style={{ 
          backgroundImage: `url('/pic5.jpg')`,
          height: '100%'
        }}
      />

      {/* Gradient Overlay Layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0A0B10 0%, rgba(10, 11, 16, 0.8) 8%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.9) 50%, #ffffff 70%, #ffffff 100%)'
        }}
      />

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-72 pb-16 text-[#1A1C23]">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          
          {/* Brand & Description Column */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-start">
            <h3 className="text-xl font-bold tracking-widest text-[#0A0B10] uppercase mb-4">
              ELECPRO
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Solutions électriques de premier choix, conçues pour la sécurité et l'énergie durable.
            </p>
          </div>

          {/* Spacer Column */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Link Columns */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0B10] mb-4">
              Explorer
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services-section" className="text-gray-500 hover:text-black transition-colors font-medium">Services</a>
              </li>
              <li>
                <a href="#about" className="text-gray-500 hover:text-black transition-colors font-medium">À Propos</a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-500 hover:text-black transition-colors font-medium">Portfolio</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-500 hover:text-black transition-colors font-medium">Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0B10] mb-4">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services-section" className="text-gray-500 hover:text-black transition-colors font-medium">Commercial</a>
              </li>
              <li>
                <a href="#services-section" className="text-gray-500 hover:text-black transition-colors font-medium">Résidentiel</a>
              </li>
              <li>
                <a href="#services-section" className="text-gray-500 hover:text-black transition-colors font-medium">Industriel</a>
              </li>
              <li>
                <a href="#services-section" className="text-gray-500 hover:text-black transition-colors font-medium">Systèmes Intelligents</a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0B10] mb-4">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium">Consignes de Sécurité</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium">Politique de Confidentialité</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-black transition-colors font-medium">Conditions d'Utilisation</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Logo & Border */}
        <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Custom Circular Badge matching the header logo but styled in black & green */}
            <div className="w-9 h-9 rounded-full bg-[#0A0B10] flex items-center justify-center shadow-md">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#90EE90] to-green-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0A0B10]"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium ml-2">
              © {new Date().getFullYear()} elecpro. Tous droits réservés.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
