import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const ImageSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  const slideCount = images.length;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying && slideCount > 1) {
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === slideCount - 1 ? 0 : prevIndex + 1
          ),
        4000
      );
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPlaying, slideCount]);

  if (!slideCount) return null;

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const selectSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl shadow-black/50 bg-[#0e0f17]"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides Container */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
      >
        {images.map((imgSrc, idx) => (
          <div key={idx} className="w-full h-full shrink-0 relative overflow-hidden">
            <img 
              src={imgSrc} 
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-1000 scale-102 group-hover:scale-105"
            />
            {/* Soft dark overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10]/80 via-transparent to-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slideCount > 1 && (
        <>
          <button 
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0A0B10]/60 hover:bg-[#90EE90] hover:text-black border border-white/10 hover:border-[#90EE90] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0A0B10]/60 hover:bg-[#90EE90] hover:text-black border border-white/10 hover:border-[#90EE90] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators & Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/5 backdrop-blur-md">
        {/* Play/Pause state */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause Slideshow" : "Start Slideshow"}
          className="text-gray-400 hover:text-[#90EE90] transition-colors cursor-pointer mr-1"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Indicator dots */}
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-[#90EE90]' : 'w-1.5 bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
