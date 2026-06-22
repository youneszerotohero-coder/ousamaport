import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ArrowUpRight } from 'lucide-react';

const ContactPopup = ({ contact, isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
  const setIsOpen = controlledSetIsOpen !== undefined ? controlledSetIsOpen : setLocalIsOpen;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Helper variables for dynamic links based on contact details
  const whatsappNumber = contact?.whatsapp || '+15551234567';
  const whatsappUrl = whatsappNumber.startsWith('http') 
    ? whatsappNumber 
    : `https://wa.me/${whatsappNumber.replace(/[\s\+\-\(\)]/g, '')}`;

  const messengerUrl = (() => {
    const facebookUrl = contact?.facebook;
    if (!facebookUrl) return 'https://m.me/elecpro';
    try {
      const cleanedUrl = facebookUrl.replace(/\/$/, '');
      const idMatch = cleanedUrl.match(/profile\.php\?id=(\d+)/);
      if (idMatch && idMatch[1]) {
        return `https://m.me/${idMatch[1]}`;
      }
      const parts = cleanedUrl.split('/');
      const lastPart = parts[parts.length - 1];
      if (lastPart && lastPart !== 'facebook.com' && lastPart !== 'www.facebook.com' && lastPart !== 'facebook' && !lastPart.includes('?')) {
        return `https://m.me/${lastPart}`;
      }
    } catch (e) {
      console.error('Error parsing facebook url for messenger:', e);
    }
    return 'https://m.me/elecpro';
  })();

  // Custom Messenger SVG Icon
  const MessengerIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      className="w-6 h-6 transition-transform group-hover:scale-110 duration-300"
      fill="currentColor"
    >
      <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.9 1.14 5.38 3.02 7.08.15.14.24.34.24.55l-.04 2.1c-.02.66.63 1.13 1.23.85l2.42-1.11c.17-.08.36-.09.53-.04 1.15.35 2.37.54 3.63.54 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm1.09 12.82l-2.61-2.77-5.08 2.77c-.49.27-1.06-.27-.79-.76l2.81-5.12 2.61 2.77 5.08-2.77c.49-.27 1.06.27.79.76l-2.81 5.12z" />
    </svg>
  );

  // Custom WhatsApp SVG Icon
  const WhatsAppIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      className="w-6 h-6 transition-transform group-hover:scale-110 duration-300"
      fill="currentColor"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.457 1.875 13.99 .843 11.35 1.841c-5.441 0-9.864 4.42-9.868 9.863-.001 1.77.462 3.5 1.34 5.047L1.83 22.18l5.817-1.526zM17.51 14.887c-.29-.145-1.713-.846-1.979-.943-.265-.096-.459-.145-.651.145-.193.29-.747.943-.916 1.135-.169.193-.338.217-.627.072-2.825-1.413-4.662-3.128-5.385-4.38-.193-.338-.02-.522.148-.69.153-.15.338-.39.507-.585.169-.193.226-.328.338-.55.112-.222.056-.415-.028-.585-.084-.17-.651-1.57-.892-2.14-.236-.57-.497-.49-.651-.497-.154-.008-.332-.01-.509-.01-.177 0-.466.066-.71.328-.244.266-.931.91-.931 2.22s.953 2.576 1.085 2.753c.133.177 1.876 2.865 4.545 4.016.634.273 1.13.436 1.517.559.638.203 1.22.175 1.68.107.513-.076 1.713-.7 1.954-1.376.242-.676.242-1.256.17-1.376-.073-.12-.266-.193-.556-.338z"/>
    </svg>
  );

  return (
    <>
      {/* Contact Popup Modal & Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Blurred Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={togglePopup}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 25, scale: 0.95, filter: 'blur(8px)' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-96 max-w-full bg-[#1A1C23]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden z-10 text-white"
            >
              {/* Ambient Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#90EE90]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#90EE90] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#90EE90]"></span>
                  </span>
                  <span className="text-xs font-semibold text-[#90EE90] tracking-wider uppercase">Disponible</span>
                </div>
                <button 
                  onClick={togglePopup}
                  className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all duration-300 hover:rotate-90 cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Description */}
              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Discutons Ensemble !</h3>
                <p className="text-sm text-gray-400">
                  Vous avez un projet ou une question ? Contactez-nous directement sur nos réseaux.
                </p>
              </div>

              {/* Channels */}
              <div className="space-y-3 relative z-10">
                
                {/* WhatsApp Channel */}
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-[#25D366]/5 hover:bg-[#25D366]/15 border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/25 flex items-center justify-center text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.15)] group-hover:scale-105 transition-transform duration-300">
                      <WhatsAppIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-[#90EE90] transition-colors duration-300">WhatsApp</h4>
                      <p className="text-xs text-gray-400">Discuter en direct</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>

                {/* Messenger Channel */}
                <a 
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-[#0084FF]/5 hover:bg-[#0084FF]/15 border border-[#0084FF]/20 hover:border-[#0084FF]/40 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0084FF]/25 flex items-center justify-center text-[#0084FF] shadow-[0_0_15px_rgba(0,132,255,0.15)] group-hover:scale-105 transition-transform duration-300">
                      <MessengerIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-[#90EE90] transition-colors duration-300">Messenger</h4>
                      <p className="text-xs text-gray-400">Nous écrire sur Messenger</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              </div>

              {/* Subtle Footer Note */}
              <div className="mt-5 text-center text-[10px] text-gray-500 relative z-10">
                Elecpro-dz Réponse Express
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-[110]">
        <motion.button
          onClick={togglePopup}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 border group select-none ${
            isOpen 
              ? 'bg-[#1A1C23] border-white/20 text-[#90EE90] shadow-[0_0_20px_rgba(144,238,144,0.15)]' 
              : 'bg-[#90EE90] border-transparent text-black shadow-[0_4px_20px_rgba(144,238,144,0.3)] hover:shadow-[0_0_30px_rgba(144,238,144,0.5)] hover:bg-[#a3ffa3]'
          }`}
          aria-label="Bouton de contact"
        >
          {/* Pulsing ring when closed */}
          {!isOpen && (
            <span className="absolute -inset-0.5 rounded-full bg-[#90EE90]/40 animate-ping opacity-60 pointer-events-none" />
          )}
          
          {/* Animated Icons */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default ContactPopup;
