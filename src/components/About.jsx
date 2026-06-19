import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Award, CheckCircle2, Play, Pause } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="about" className="py-28 bg-[#0A0B10] text-white flex flex-col items-center relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
      {/* Decorative Glows Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#90EE90]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl w-full px-4 md:px-8 relative z-10">
        
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
          <div className="relative w-screen ml-[calc(50%-50vw)] lg:ml-0 lg:w-full h-[55vh] md:h-[65vh] lg:h-auto overflow-hidden lg:overflow-visible flex lg:grid lg:grid-cols-12 items-center lg:items-stretch gap-12 lg:gap-20 p-8 md:p-16 lg:p-0 border-y border-white/10 lg:border-none">
            {/* Mobile Background Image with Parallax & Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed pointer-events-none lg:hidden"
              style={{ backgroundImage: "url('/pic2.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/65 lg:hidden pointer-events-none" />

            {/* Image Col */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block lg:col-span-7 relative group"
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
            <div className="lg:col-span-5 relative z-10 w-full">
              {/* Sticky Content Wrapper */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-[20vh] items-center text-center lg:items-start lg:text-left">
                <div className="inline-flex items-center gap-2 self-center lg:self-start text-[#90EE90] uppercase tracking-[0.25em] text-xs font-bold font-mono">
                  <Shield className="w-4 h-4" />
                  01 / LA GENÈSE
                </div>
                <div className="flex flex-col gap-1 items-center lg:items-start">
                  <SplitText
                    text="Comment Tout"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
                    tag="h3"
                    textAlign={isMobile ? 'center' : 'left'}
                    delay={30}
                    duration={1.0}
                  />
                  <SplitText
                    text="A Commencé"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold [&_.split-char]:bg-gradient-to-r [&_.split-char]:from-[#90EE90] [&_.split-char]:to-green-400 [&_.split-char]:bg-clip-text [&_.split-char]:text-transparent tracking-tight leading-[1.1] mt-1"
                    tag="h3"
                    textAlign={isMobile ? 'center' : 'left'}
                    delay={30}
                    duration={1.0}
                  />
                </div>
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  blurStrength={6}
                  baseRotation={1}
                  containerClassName="mt-2 text-center lg:text-left"
                  textClassName="!text-lg md:!text-xl lg:!text-2xl !leading-relaxed text-zinc-400 !font-light text-center lg:text-left"
                >
                  Notre parcours a débuté par des interventions locales simples. Grâce à notre rigueur et notre honnêteté, nous avons rapidement gagné la confiance de nos clients.
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Row 2: Image Right, Text Left */}
          <div className="py-12 md:py-0 md:h-[100vh] flex items-center justify-center">
            <div className="relative w-[45em] h-[30em] text-[1.8vw] sm:text-[1.8vw] md:text-[1.5vw] lg:text-base">
              <video 
                ref={videoRef}
                src="/vid.mp4" 
                className='w-full h-full object-cover' 
                muted
                playsInline
              />
              
              {/* Play/Pause overlay */}
              <div 
                onClick={togglePlay}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="absolute inset-0 flex items-center justify-center transition-colors duration-500 cursor-pointer z-20"
              >
                {/* Glowing Outer Ring & Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: (!isPlaying || isHovered) ? 1 : 0,
                    scale: (!isPlaying || isHovered) ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex items-center justify-center"
                >
                  {/* Pulse Ring (only when paused) */}
                  {!isPlaying && (
                    <span className="absolute -inset-4 rounded-full bg-[#90EE90]/25 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
                  )}
                  
                  {/* Glassmorphic Play/Pause Button */}
                  <div className="w-[5em] h-[5em] flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#90EE90] shadow-[0_0_30px_rgba(144,238,144,0.15)] hover:border-[#90EE90] hover:bg-black/60 hover:text-white hover:shadow-[0_0_40px_rgba(144,238,144,0.4)] transition-all duration-300">
                    {isPlaying ? (
                      <Pause className="w-[2em] h-[2em] fill-current" />
                    ) : (
                      <Play className="w-[2em] h-[2em] fill-current translate-x-[0.1em]" />
                    )}
                  </div>
                </motion.div>
              </div>

              <div className='absolute bg-green-600 h-[5em] w-[5em] bottom-[5em] left-0 z-10'></div>
              <div className='absolute bg-[#0A0B10] h-[5em] w-[5em] top-[-1px] right-[-1px] z-10'></div>
              <div className='absolute bg-green-600 h-[5em] w-[5em] top-1/2 right-[-2.5em] z-10'></div>
              <div className='absolute bg-[#0A0B10] h-[5em] w-[5em] bottom-0 left-0 z-10'></div>
              <div className='absolute bg-[#0A0B10] h-[5em] w-[5em] bottom-0 left-[5em] z-10'></div>

            </div>
          </div>

          {/* Row 3: Image Left, Text Right */}
          <div className="relative w-screen ml-[calc(50%-50vw)] lg:ml-0 lg:w-full h-[55vh] md:h-[65vh] lg:h-auto overflow-hidden lg:overflow-visible flex lg:grid lg:grid-cols-12 items-center lg:items-stretch gap-12 lg:gap-20 p-8 md:p-16 lg:p-0 border-y border-white/10 lg:border-none">
            {/* Mobile Background Image with Parallax & Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed pointer-events-none lg:hidden"
              style={{ backgroundImage: "url('/pic1.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/65 lg:hidden pointer-events-none" />

            {/* Image Col */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block lg:col-span-7 relative group"
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
            <div className="lg:col-span-5 relative z-10 w-full">
              {/* Sticky Content Wrapper */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-[20vh] items-center text-center lg:items-start lg:text-left">
                <div className="inline-flex items-center gap-2 self-center lg:self-start text-[#90EE90] uppercase tracking-[0.25em] text-xs font-bold font-mono">
                  <Award className="w-4 h-4" />
                  03 / L'AVENIR
                </div>
                <div className="flex flex-col gap-1 items-center lg:items-start">
                  <SplitText
                    text="Innover Pour"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
                    tag="h3"
                    textAlign={isMobile ? 'center' : 'left'}
                    delay={30}
                    duration={1.0}
                  />
                  <SplitText
                    text="L'Avenir"
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold [&_.split-char]:bg-gradient-to-r [&_.split-char]:from-[#90EE90] [&_.split-char]:to-green-400 [&_.split-char]:bg-clip-text [&_.split-char]:text-transparent tracking-tight leading-[1.1] mt-1"
                    tag="h3"
                    textAlign={isMobile ? 'center' : 'left'}
                    delay={30}
                    duration={1.0}
                  />
                </div>
                <ScrollReveal
                  baseOpacity={0.15}
                  enableBlur={true}
                  blurStrength={6}
                  baseRotation={1}
                  containerClassName="mt-2 text-center lg:text-left"
                  textClassName="!text-lg md:!text-xl lg:!text-2xl !leading-relaxed text-zinc-400 !font-light text-center lg:text-left"
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
