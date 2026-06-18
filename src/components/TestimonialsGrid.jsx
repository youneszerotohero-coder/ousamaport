import React from 'react';

const ImageCard = ({ src, alt, mb = false }) => (
  <div className={`relative overflow-hidden rounded-2xl group cursor-pointer h-[8em] aspect-[9/10] ${mb ? 'mb-[1em]' : ''} border border-white/10`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
    />
    <div className="absolute inset-0 bg-[#0A0B10]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
      <span className="text-white text-xs font-bold tracking-widest uppercase py-1 px-3 border border-[#90EE90]/30 rounded-full bg-[#90EE90]/10">
        Voir
      </span>
    </div>
  </div>
);

function TestimonialsGrid() {
  return (
    <div className="flex gap-4 md:gap-6 px-4">
      <div className="hidden md:block mt-[4em]">
        <ImageCard src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Testimonial 1" mb />
        <ImageCard src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Testimonial 2" />
      </div>
      <div className="hidden md:block">
        <ImageCard src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Testimonial 3" mb />
        <ImageCard src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Testimonial 4" />
      </div>
      <div className="hidden md:block mt-[5em]">
        <ImageCard src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Testimonial 5" />
      </div>
      <div className="mt-[1em]">
        <ImageCard src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80" alt="Testimonial 6" />
      </div>
      <div className="mt-[3em]">
        <ImageCard src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" alt="Testimonial 7" />
      </div>
      <div className="mt-[1em]">
        <ImageCard src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" alt="Testimonial 8" />
      </div>
      <div className="hidden md:block mt-[5em]">
        <ImageCard src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" alt="Testimonial 9" />
      </div>
      <div className="hidden md:block">
        <ImageCard src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" alt="Testimonial 10" mb />
        <ImageCard src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80" alt="Testimonial 11" />
      </div>
      <div className="hidden md:block mt-[4em]">
        <ImageCard src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Testimonial 12" mb />
        <ImageCard src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Testimonial 13" />
      </div>
    </div>
  );
}

export default TestimonialsGrid;
