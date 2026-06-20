import React from 'react';

const FacebookIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer = ({ contact, onNavigateAdmin }) => {
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
              Elecpro-dz
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">
              {contact?.description || "Solutions électriques de premier choix, conçues pour la sécurité et l'énergie durable."}
            </p>
            
            {/* Social media links */}
            <div className="flex items-center gap-3">
              {contact?.facebook && (
                <a 
                  href={contact.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-[#0A0B10]/5 text-[#0A0B10] hover:bg-[#0A0B10] hover:text-[#90EE90] flex items-center justify-center transition-all duration-300 shadow-sm border border-black/5 hover:scale-105"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4.5 h-4.5" />
                </a>
              )}
              {contact?.instagram && (
                <a 
                  href={contact.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-[#0A0B10]/5 text-[#0A0B10] hover:bg-[#0A0B10] hover:text-[#90EE90] flex items-center justify-center transition-all duration-300 shadow-sm border border-black/5 hover:scale-105"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4.5 h-4.5" />
                </a>
              )}
            </div>
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
              <li>
                <a 
                  href="/admin" 
                  onClick={(e) => { e.preventDefault(); onNavigateAdmin?.(); }} 
                  className="text-gray-500 hover:text-[#90EE90] hover:bg-black/5 px-2 py-1 rounded transition-colors font-semibold border border-transparent hover:border-[#90EE90]/20"
                >
                  Administration
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Logo & Border */}
        <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Custom Circular Badge matching the header logo but styled in black & green */}
            <img 
              src="/ousamalogo.png" 
              alt="Logo" 
              className="w-9 h-9 object-contain" 
            />
            <span className="text-xs text-gray-400 font-medium ml-2">
              © {new Date().getFullYear()} Elecpro-dz. Tous droits réservés.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
