import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Award, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';

const About = () => {
  return (
    <section id="about" className="py-28 bg-[#0A0B10] text-white flex flex-col items-center relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
      {/* Decorative Glows Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#90EE90]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl w-full px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#90EE90] uppercase"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Notre Histoire
          </motion.div>
          
          <div className="flex flex-col items-center">
            <SplitText
              text="L'Histoire Derrière"
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-2"
              tag="h2"
              textAlign="center"
              delay={35}
              duration={1.1}
            />
            <SplitText
              text="Notre Héritage Électrique"
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight [&_.split-char]:bg-gradient-to-r [&_.split-char]:from-[#90EE90] [&_.split-char]:to-green-400 [&_.split-char]:bg-clip-text [&_.split-char]:text-transparent leading-[1.1]"
              tag="h2"
              textAlign="center"
              delay={35}
              duration={1.1}
            />
          </div>
        </div>

        {/* Alternating Content Rows */}
        <div className="flex flex-col gap-28 md:gap-36 lg:gap-44">
          
          {/* Row 1: Image Left, Text Right */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Image Col */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#90EE90]/15 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
              <div className="relative w-full h-[100vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-zinc-950">
                <img 
                  src="/pic2.jpg" 
                  alt="Là où tout a commencé" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Text Col Wrapper */}
            <div className="lg:col-span-5">
              {/* Sticky Content Wrapper */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-[20vh]">
                <div className="inline-flex items-center gap-2 self-start text-[#90EE90] uppercase tracking-[0.25em] text-xs font-bold font-mono">
                  <Shield className="w-4 h-4" />
                  01 / LA GENÈSE
                </div>
                <div className="flex flex-col gap-1">
                  <SplitText
                    text="Comment Tout"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
                    tag="h3"
                    textAlign="left"
                    delay={30}
                    duration={1.0}
                  />
                  <SplitText
                    text="A Commencé"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold [&_.split-char]:bg-gradient-to-r [&_.split-char]:from-[#90EE90] [&_.split-char]:to-green-400 [&_.split-char]:bg-clip-text [&_.split-char]:text-transparent tracking-tight leading-[1.1] mt-1"
                    tag="h3"
                    textAlign="left"
                    delay={30}
                    duration={1.0}
                  />
                </div>
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  blurStrength={6}
                  baseRotation={1}
                  containerClassName="mt-2"
                  textClassName="!text-lg md:!text-xl lg:!text-2xl !leading-relaxed text-zinc-400 !font-light"
                >
                  Notre parcours a débuté par des interventions locales simples. Grâce à notre rigueur et notre honnêteté, nous avons rapidement gagné la confiance de nos clients.
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Row 2: Image Right, Text Left */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Image Col (order-1 on mobile, lg:order-2 on desktop) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 lg:col-span-7 relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#90EE90]/15 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
              <div className="relative w-full h-[100vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-zinc-950">
                <img 
                  src="/pic3.jpg" 
                  alt="Instaurer la confiance, fil après fil" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Text Col Wrapper (order-2 on mobile, lg:order-1 on desktop) */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              {/* Sticky Content Wrapper */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-[20vh]">
                <div className="inline-flex items-center gap-2 self-start text-[#90EE90] uppercase tracking-[0.25em] text-xs font-bold font-mono">
                  <Zap className="w-4 h-4" />
                  02 / NOTRE PHILOSOPHIE
                </div>
                <div className="flex flex-col gap-1">
                  <SplitText
                    text="Bâtir La"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
                    tag="h3"
                    textAlign="left"
                    delay={30}
                    duration={1.0}
                  />
                  <SplitText
                    text="Confiance"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold [&_.split-char]:bg-gradient-to-r [&_.split-char]:from-[#90EE90] [&_.split-char]:to-green-400 [&_.split-char]:bg-clip-text [&_.split-char]:text-transparent tracking-tight leading-[1.1] mt-1"
                    tag="h3"
                    textAlign="left"
                    delay={30}
                    duration={1.0}
                  />
                </div>
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  blurStrength={6}
                  baseRotation={1}
                  containerClassName="mt-2"
                  textClassName="!text-lg md:!text-xl lg:!text-2xl !leading-relaxed text-zinc-400 !font-light"
                >
                  Du résidentiel aux grands réseaux industriels, notre exigence reste la même. Chaque projet est traité avec soin, plaçant la sécurité au cœur de nos priorités.
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Row 3: Image Left, Text Right */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Image Col */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#90EE90]/15 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
              <div className="relative w-full h-[100vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer bg-zinc-950">
                <img 
                  src="/pic1.jpg" 
                  alt="Électrifier l'Avenir" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Text Col Wrapper */}
            <div className="lg:col-span-5">
              {/* Sticky Content Wrapper */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-[20vh]">
                <div className="inline-flex items-center gap-2 self-start text-[#90EE90] uppercase tracking-[0.25em] text-xs font-bold font-mono">
                  <Award className="w-4 h-4" />
                  03 / L'AVENIR
                </div>
                <div className="flex flex-col gap-1">
                  <SplitText
                    text="Innover Pour"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
                    tag="h3"
                    textAlign="left"
                    delay={30}
                    duration={1.0}
                  />
                  <SplitText
                    text="L'Avenir"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold [&_.split-char]:bg-gradient-to-r [&_.split-char]:from-[#90EE90] [&_.split-char]:to-green-400 [&_.split-char]:bg-clip-text [&_.split-char]:text-transparent tracking-tight leading-[1.1] mt-1"
                    tag="h3"
                    textAlign="left"
                    delay={30}
                    duration={1.0}
                  />
                </div>
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  blurStrength={6}
                  baseRotation={1}
                  containerClassName="mt-2"
                  textClassName="!text-lg md:!text-xl lg:!text-2xl !leading-relaxed text-zinc-400 !font-light"
                >
                  Nous concevons des installations durables, efficaces et intelligentes. Nous accompagnons la transition énergétique locale avec un savoir-faire moderne et robuste.
                </ScrollReveal>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
