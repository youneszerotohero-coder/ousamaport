import React from 'react';
import LogoLoop from './LogoLoop';
import SplitText from './SplitText';

const Services = () => {
  const brands = [
    {
      name: 'Legrand',
      node: (
        <span className="font-sans font-bold tracking-tight text-zinc-400 hover:text-[#E11F26] transition-colors duration-300 select-none cursor-default">
          legrand
        </span>
      )
    },
    {
      name: 'ABB',
      node: (
        <span className="font-sans font-black tracking-tighter text-zinc-400 hover:text-[#FF0000] transition-colors duration-300 select-none cursor-default">
          ABB
        </span>
      )
    },
    {
      name: 'Siemens',
      node: (
        <span className="font-sans font-bold tracking-normal text-zinc-400 hover:text-[#00828A] uppercase transition-colors duration-300 select-none cursor-default">
          siemens
        </span>
      )
    },
    {
      name: 'Schneider Electric',
      node: (
        <span className="font-sans font-bold tracking-tight text-zinc-400 hover:text-[#3DCD58] flex items-center gap-1 transition-colors duration-300 select-none cursor-default group">
          Schneider <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-zinc-200/50 group-hover:bg-[#3DCD58]/10 text-zinc-400 group-hover:text-[#3DCD58] rounded tracking-wider transition-colors duration-300">Electric</span>
        </span>
      )
    },
    {
      name: 'Hager',
      node: (
        <span className="font-sans font-extrabold tracking-tight text-zinc-400 hover:text-[#004A8F] lowercase transition-colors duration-300 select-none cursor-default">
          hager
        </span>
      )
    },
    {
      name: 'Eaton',
      node: (
        <span className="font-sans font-black italic tracking-wide text-zinc-400 hover:text-[#1C5694] transition-colors duration-300 select-none cursor-default">
          EATON
        </span>
      )
    },
    {
      name: 'Philips',
      node: (
        <span className="font-serif font-semibold tracking-wide text-zinc-400 hover:text-[#0060A9] transition-colors duration-300 select-none cursor-default">
          PHILIPS
        </span>
      )
    },
    {
      name: 'Finder',
      node: (
        <span className="font-sans font-extrabold italic text-zinc-400 hover:text-[#E30613] tracking-tighter transition-colors duration-300 select-none cursor-default">
          finder
        </span>
      )
    },
    {
      name: 'Fluke',
      node: (
        <span className="font-sans font-black tracking-tight text-zinc-400 hover:text-[#FFC20E] uppercase transition-colors duration-300 select-none cursor-default">
          fluke
        </span>
      )
    },
    {
      name: 'Gewiss',
      node: (
        <span className="font-sans font-bold tracking-tight text-zinc-400 hover:text-[#004B93] transition-colors duration-300 select-none cursor-default">
          GEWISS
        </span>
      )
    },
    {
      name: 'Osram',
      node: (
        <span className="font-sans font-bold tracking-tight text-zinc-400 hover:text-[#FF8F00] transition-colors duration-300 select-none cursor-default">
          OSRAM
        </span>
      )
    },
    {
      name: 'Nexans',
      node: (
        <span className="font-sans font-extrabold tracking-tight text-zinc-400 hover:text-[#E30613] uppercase transition-colors duration-300 select-none cursor-default">
          nexans
        </span>
      )
    }
  ];

  return (
    <section id="services-section" className="min-h-screen w-full bg-[#f4f4f5] text-black pt-16 pb-24 px-8 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        {/* Brand Logo Loop Banner */}
        <div className="w-full mb-2 pb-12 border-b border-zinc-200/80">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold mb-8 text-center md:text-left">
            Équipements Premium de Confiance & Systèmes Certifiés
          </p>
          <LogoLoop
            logos={brands}
            speed={50}
            gap={64}
            logoHeight={28}
            fadeOut={true}
            fadeOutColor="#f4f4f5"
            pauseOnHover={true}
            scaleOnHover={true}
            className="w-full"
          />
        </div>

        <div className="flex flex-col mb-16">
          <SplitText
            text="Nos Services"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.1] mb-2"
            tag="h2"
            textAlign="left"
            delay={35}
            duration={1.1}
          />
          <SplitText
            text="Premium"
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-green-600 leading-[1.1]"
            tag="h2"
            textAlign="left"
            delay={35}
            duration={1.1}
          />
        </div>

        {/* We leave this area generally open so the hero images can animate into this space. */}
        {/* We can provide a placeholder grid so the user knows where the images will land. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 w-full mt-12 opacity-0">
          {/* The actual elements will be the animated images from the Hero section */}
          <div id="grid-img-1" className="aspect-[3/2] rounded-2xl"></div>
          <div id="grid-img-2" className="aspect-[3/2] rounded-2xl"></div>
          <div id="grid-img-3" className="aspect-[3/2] rounded-2xl"></div>
          <div id="grid-img-4" className="aspect-[3/2] rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Services;
