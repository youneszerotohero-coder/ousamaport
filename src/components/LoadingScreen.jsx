import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onStartExit, onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALISATION DU SYSTÈME...");
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const duration = 3000; // 3 seconds loading

  useEffect(() => {
    // Block scroll when loading starts
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
      
      setProgress(currentProgress);

      // Status text progression to match electrical context
      if (currentProgress < 20) {
        setStatusText("INITIALISATION DU SYSTÈME...");
      } else if (currentProgress < 45) {
        setStatusText("CHARGEMENT DES COMPOSANTS...");
      } else if (currentProgress < 70) {
        setStatusText("OPTIMISATION DU RÉSEAU ÉLECTRIQUE...");
      } else if (currentProgress < 90) {
        setStatusText("VÉRIFICATION DES SYSTÈMES DE SÉCURITÉ...");
      } else {
        setStatusText("SYSTÈME PRÊT");
      }

      if (elapsedTime < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsDone(true);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, []);

  useEffect(() => {
    if (isDone) {
      // Small reading pause at 100% before starting transition
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
        onStartExit(); // Notify parent to start hero animations

        // Wait for the slide-up transition to complete (1.2s)
        const finishTimeout = setTimeout(() => {
          onFinished(); // Unmount loader completely
          // Restore scroll
          document.body.style.overflow = '';
          document.body.style.height = '';
        }, 1200);

        return () => clearTimeout(finishTimeout);
      }, 400);

      return () => clearTimeout(exitTimeout);
    }
  }, [isDone, onStartExit, onFinished]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#0A0B10] flex flex-col items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full opacity-90' : 'translate-y-0'
      }`}
    >
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40"></div>
      
      {/* Background glow behind logo */}
      <div className="absolute w-[400px] h-[400px] bg-[#90EE90]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative flex flex-col items-center select-none z-10">
        {/* Custom Animated Logo */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          {/* Outer spinning dash-ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-dashed border-t-[#90EE90] border-r-transparent border-b-transparent border-l-transparent animate-spin"
            style={{ animationDuration: '3s' }}
          ></div>
          
          {/* Middle pulsing glow ring with gradient */}
          <div className="absolute inset-2 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(144,238,144,0.25)] bg-[#0A0B10] overflow-hidden">
            <img 
              src="/ousamalogo.png" 
              alt="Logo" 
              className="w-14 h-14 object-contain animate-pulse" 
            />
          </div>
        </div>

        {/* Brand Text */}
        <div className="text-3xl font-extrabold tracking-[0.25em] text-white uppercase mb-1 font-sans">
          Elec<span className="text-[#90EE90]" style={{ textShadow: '0 0 15px rgba(144,238,144,0.6)' }}>pro-dz</span>
        </div>

        {/* Status indicator */}
        <div className="text-[10px] tracking-[0.3em] text-gray-500 uppercase h-4 flex items-center justify-center font-mono mt-2 transition-all duration-300">
          {statusText}
        </div>

        {/* Progress & Bar */}
        <div className="mt-14 flex flex-col items-center gap-4">
          {/* Counter with leading zeros */}
          <div className="text-6xl font-black tracking-wider text-white font-mono flex items-baseline select-none">
            <span className="text-[#90EE90]" style={{ textShadow: '0 0 20px rgba(144,238,144,0.4)' }}>
              {progress.toString().padStart(3, '0')}
            </span>
            <span className="text-xs text-gray-500 ml-1 font-sans font-normal">%</span>
          </div>

          {/* Progress bar container */}
          <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            {/* Glowing progress line */}
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-[#90EE90] transition-all duration-75 ease-out"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px #90EE90'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Decorative footer elements */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1 opacity-20 font-mono text-[9px] tracking-widest text-gray-400">
        <span>Elecpro-dz V2.0 // EST. 2026</span>
        <span>ENERGY OPTIMIZED INTERFACE</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
