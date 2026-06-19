import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ArrowUpRight } from 'lucide-react';

const ContactPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Custom Viber SVG Icon
  const ViberIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      className="w-6 h-6 transition-transform group-hover:scale-110 duration-300"
      fill="currentColor"
    >
      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.541v2.42s-.038.97.602 1.17c.79.25 1.24-.499 1.99-1.299l1.4-1.58c3.85.32 6.8-.419 7.14-.529.78-.25 5.181-.811 5.901-6.652.74-6.031-.36-9.831-2.34-11.551l-.01-.002c-.6-.55-3-2.3-8.37-2.32 0 0-.396-.025-1.038-.016zm.067 1.697c.545-.003.88.02.88.02 4.54.01 6.711 1.38 7.221 1.84 1.67 1.429 2.528 4.856 1.9 9.892-.6 4.88-4.17 5.19-4.83 5.4-.28.09-2.88.73-6.152.52 0 0-2.439 2.941-3.199 3.701-.12.13-.26.17-.35.15-.13-.03-.17-.19-.16-.41l.02-4.019c-4.771-1.32-4.491-6.302-4.441-8.902.06-2.6.55-4.732 2-6.172 1.957-1.77 5.475-2.01 7.11-2.02zm.36 2.6a.299.299 0 0 0-.3.299.3.3 0 0 0 .3.3 5.631 5.631 0 0 1 4.03 1.59c1.09 1.06 1.621 2.48 1.641 4.34a.3.3 0 0 0 .3.3v-.009a.3.3 0 0 0 .3-.3 6.451 6.451 0 0 0-1.81-4.76c-1.19-1.16-2.692-1.76-4.462-1.76zm-3.954.69a.955.955 0 0 0-.615.12h-.012c-.41.24-.788.54-1.148.94-.27.32-.421.639-.461.949a1.24 1.24 0 0 0 .05.541l.02.01a13.722 13.722 0 0 0 1.2 2.6 15.383 15.383 0 0 0 2.32 3.171l.03.04.04.03.03.03.03.03a15.603 15.603 0 0 0 3.18 2.33c1.32.72 2.122 1.06 2.602 1.2v.01c.14.04.268.06.398.06a1.84 1.84 0 0 0 1.102-.472c.39-.35.7-.738.93-1.148v-.01c.23-.43.15-.841-.18-1.121a13.632 13.632 0 0 0-2.15-1.54c-.51-.28-1.03-.11-1.24.17l-.45.569c-.23.28-.65.24-.65.24l-.012.01c-3.12-.8-3.95-3.959-3.95-3.959s-.04-.43.25-.65l.56-.45c.27-.22.46-.74.17-1.25a13.522 13.522 0 0 0-1.54-2.15.843.843 0 0 0-.504-.3zm4.473.89a.3.3 0 0 0 .002.6 3.78 3.78 0 0 1 2.65 1.15 3.5 3.5 0 0 1 .9 2.57.3.3 0 0 0 .3.299l.01.012a.3.3 0 0 0 .3-.301c.03-1.19-.34-2.19-1.07-2.99-.73-.8-1.75-1.25-3.05-1.34a.3.3 0 0 0-.042 0zm.49 1.619a.305.305 0 0 0-.018.611c.99.05 1.47.55 1.53 1.58a.3.3 0 0 0 .3.29h.01a.3.3 0 0 0 .29-.32c-.07-1.34-.8-2.091-2.1-2.161a.305.305 0 0 0-.012 0z"/>
    </svg>
  );

  // Custom Telegram SVG Icon
  const TelegramIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      className="w-6 h-6 transition-transform group-hover:scale-110 duration-300"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.87-1.68 6.45-2.79 7.74-3.32 3.68-1.51 4.44-1.78 4.94-1.79.11 0 .36.03.52.16.14.12.18.28.2.42.02.13.02.26 0 .39z"/>
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Contact Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 25, scale: 0.95, filter: 'blur(8px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-4 w-96 max-w-[calc(100vw-3rem)] bg-[#1A1C23]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
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
                href="https://wa.me/15551234567" // Placeholder WhatsApp Link - can be updated easily
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

              {/* Viber Channel */}
              <a 
                href="viber://chat?number=%2B15551234567" // Placeholder number - can be updated easily
                className="group flex items-center justify-between p-4 bg-[#7360F2]/5 hover:bg-[#7360F2]/15 border border-[#7360F2]/20 hover:border-[#7360F2]/40 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7360F2]/25 flex items-center justify-center text-[#7360F2] shadow-[0_0_15px_rgba(115,96,242,0.15)] group-hover:scale-105 transition-transform duration-300">
                    <ViberIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-[#90EE90] transition-colors duration-300">Viber</h4>
                    <p className="text-xs text-gray-400">Discuter instantanément</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>

              {/* Telegram Channel */}
              <a 
                href="https://t.me/elecpro_admin" // Placeholder Telegram Username
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-[#24A1DE]/5 hover:bg-[#24A1DE]/15 border border-[#24A1DE]/20 hover:border-[#24A1DE]/40 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#24A1DE]/25 flex items-center justify-center text-[#24A1DE] shadow-[0_0_15px_rgba(36,161,222,0.15)] group-hover:scale-105 transition-transform duration-300">
                    <TelegramIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-[#90EE90] transition-colors duration-300">Telegram</h4>
                    <p className="text-xs text-gray-400 font-sans">@elecpro_admin</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>

            </div>

            {/* Subtle Footer Note */}
            <div className="mt-5 text-center text-[10px] text-gray-500 relative z-10">
              Elecpro Réponse Express
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={togglePopup}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 z-50 border group select-none ${
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
  );
};

export default ContactPopup;
