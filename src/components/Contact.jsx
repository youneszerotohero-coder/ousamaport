import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#0A0B10] text-white flex flex-col items-center border-t border-white/5 relative z-30">
      <div className="max-w-7xl w-full px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Contactez-nous
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md">
              Prêt à démarrer votre prochain projet électrique ? Contactez notre équipe d'experts dès aujourd'hui pour une consultation et un devis gratuit.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1C23] flex items-center justify-center border border-white/5">
                  <Phone className="w-5 h-5 text-[#90EE90]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Appelez-nous</p>
                  <p className="text-lg font-medium">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1C23] flex items-center justify-center border border-white/5">
                  <Mail className="w-5 h-5 text-[#90EE90]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Écrivez-nous</p>
                  <p className="text-lg font-medium">contact@elecpro-electric.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1C23] flex items-center justify-center border border-white/5">
                  <MapPin className="w-5 h-5 text-[#90EE90]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Visitez-nous</p>
                  <p className="text-lg font-medium">123 Energy Way, Spark City</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1C23] p-8 rounded-2xl border border-white/5">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm text-gray-400">Prénom</label>
                  <input type="text" id="firstName" className="bg-[#0A0B10] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition-colors" placeholder="Jean" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm text-gray-400">Nom</label>
                  <input type="text" id="lastName" className="bg-[#0A0B10] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition-colors" placeholder="Dupont" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-gray-400">E-mail</label>
                <input type="email" id="email" className="bg-[#0A0B10] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition-colors" placeholder="jean@example.com" />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                <textarea id="message" rows="4" className="bg-[#0A0B10] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#90EE90] transition-colors resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>
              <button className="flex items-center justify-center gap-2 w-full py-4 bg-[#90EE90] hover:bg-[#78d478] text-black font-medium rounded-lg transition-colors group cursor-pointer">
                Envoyer le Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
