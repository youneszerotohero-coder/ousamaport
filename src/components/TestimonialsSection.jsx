import React from 'react';
import { motion } from 'motion/react';
import CountUp from './CountUp';
import TestimonialsGrid from './TestimonialsGrid';

const stats = [
  { to: 10, suffix: 'k+', label: 'Clients Satisfaits' },
  { to: 50, suffix: 'k+', label: 'Projets Réalisés' },
  { to: 99, suffix: '%', label: 'Indice de Sécurité' },
  { to: 10, suffix: '+', label: 'Années de Service' },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-20 sm:py-28 flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0B10] z-30">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#90EE90]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full overflow-hidden flex justify-center [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] mb-12 md:-mb-16 md:translate-y-16"
      >
        <TestimonialsGrid />
      </motion.div>

      {/* Text Section */}
      <div className="flex flex-col items-center px-6 text-center z-10 relative mt-12 md:mt-20">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          className="h-[2px] bg-[#90EE90] mb-4"
        />
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
        >
          l’équipe
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto mb-10"
        >
          Voici notre équipe d'experts dévoués à vous offrir les meilleures solutions.
        </motion.p>
      </div>

      {/* Stats Row */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 border-t border-white/10 pt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-2 text-white group-hover:text-[#90EE90] transition-colors flex justify-center items-center">
                <CountUp
                  from={0}
                  to={stat.to}
                  separator=","
                  direction="up"
                  duration={2}
                  className="tabular-nums"
                />
                <span className="text-[#90EE90]">{stat.suffix}</span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
