import React, { useState, useEffect, useRef } from "react"
import Header from "./components/Header"
import Hero from "./pages/Hero"
import Services from "./components/Services"
import About from "./components/About"
import Portfolio from "./components/Portfolio"
import TestimonialsSection from "./components/TestimonialsSection"
import Footer from "./components/Footer"
import ServiceDetails from "./pages/ServiceDetails"
import ProjectDetails from "./pages/ProjectDetails"
import LoadingScreen from "./components/LoadingScreen"
import ContactPopup from "./components/ContactPopup"

const App = () => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'entering' | 'exiting'

  const currentServiceIdRef = useRef(null);
  const currentProjectIdRef = useRef(null);

  useEffect(() => {
    currentServiceIdRef.current = currentServiceId;
    currentProjectIdRef.current = currentProjectId;
  });

  const triggerPageTransition = (navCallback) => {
    setTransitionState('entering');
    setTimeout(() => {
      navCallback();
      setTransitionState('exiting');
      setTimeout(() => {
        setTransitionState('idle');
      }, 650);
    }, 650);
  };

  useEffect(() => {
    // Check initial path on load
    const checkPathInitial = () => {
      const path = window.location.pathname;
      const serviceMatch = path.match(/\/service\/([^/]+)/);
      const projectMatch = path.match(/\/project\/([^/]+)/);
      
      if (serviceMatch) {
        setCurrentServiceId(serviceMatch[1]);
        setCurrentProjectId(null);
      } else if (projectMatch) {
        setCurrentProjectId(projectMatch[1]);
        setCurrentServiceId(null);
      } else {
        setCurrentServiceId(null);
        setCurrentProjectId(null);
      }
    };

    // Transitioning check for back/forward navigation
    const checkPathPopState = () => {
      const path = window.location.pathname;
      const serviceMatch = path.match(/\/service\/([^/]+)/);
      const projectMatch = path.match(/\/project\/([^/]+)/);
      
      const nextServiceId = serviceMatch ? serviceMatch[1] : null;
      const nextProjectId = projectMatch ? projectMatch[1] : null;

      // Skip transition if target is same as current page (e.g. hash navigations on home page)
      if (nextServiceId === currentServiceIdRef.current && nextProjectId === currentProjectIdRef.current) {
        return;
      }

      triggerPageTransition(() => {
        if (serviceMatch) {
          setCurrentServiceId(serviceMatch[1]);
          setCurrentProjectId(null);
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (projectMatch) {
          setCurrentProjectId(projectMatch[1]);
          setCurrentServiceId(null);
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          setCurrentServiceId(null);
          setCurrentProjectId(null);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      });
    };

    checkPathInitial();
    window.addEventListener("popstate", checkPathPopState);
    return () => window.removeEventListener("popstate", checkPathPopState);
  }, []);

  const navigateToService = (id) => {
    triggerPageTransition(() => {
      if (id) {
        window.history.pushState({ serviceId: id }, "", `/service/${id}`);
        setCurrentServiceId(id);
        setCurrentProjectId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.history.pushState(null, "", "/");
        setCurrentServiceId(null);
        setCurrentProjectId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  };

  const navigateToProject = (id) => {
    triggerPageTransition(() => {
      if (id) {
        window.history.pushState({ projectId: id }, "", `/project/${id}`);
        setCurrentProjectId(id);
        setCurrentServiceId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.history.pushState(null, "", "/");
        setCurrentProjectId(null);
        setCurrentServiceId(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  };

  const handleNavigateHomeAndScroll = (hash) => {
    triggerPageTransition(() => {
      window.history.pushState(null, "", "/");
      setCurrentServiceId(null);
      setCurrentProjectId(null);
      
      // Wait for the render to complete, then scroll to section
      setTimeout(() => {
        if (hash && hash !== '#') {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white ">
      {isLoadingScreen && (
        <LoadingScreen 
          onStartExit={() => setStartHeroAnimation(true)} 
          onFinished={() => setIsLoadingScreen(false)} 
        />
      )}

      {/* Page Wipe Transition Overlay */}
      {transitionState !== 'idle' && (
        <div className="fixed inset-0 z-[10000] pointer-events-none">
          {/* Panel 1 (Green Sweep) */}
          <div 
            className={`absolute inset-0 bg-[#90EE90] pointer-events-auto ${
              transitionState === 'entering' ? 'animate-sweep-enter-green' : 'animate-sweep-exit-green'
            }`}
          ></div>

          {/* Panel 2 (Dark Sweep) */}
          <div 
            className={`absolute inset-0 bg-[#0A0B10] flex items-center justify-center pointer-events-auto ${
              transitionState === 'entering' ? 'animate-sweep-enter-dark' : 'animate-sweep-exit-dark'
            }`}
          >
            {/* Central Logo */}
            <div 
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                transitionState === 'entering' ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: transitionState === 'entering' ? '250ms' : '0ms' }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#90EE90] to-green-800 flex items-center justify-center shadow-[0_0_20px_rgba(144,238,144,0.3)]">
                <div className="w-5 h-5 rounded-full bg-[#0A0B10]"></div>
              </div>
              <span className="font-extrabold text-xl tracking-widest text-white font-sans uppercase">
                Elec<span className="text-[#90EE90]" style={{ textShadow: '0 0 10px rgba(144,238,144,0.4)' }}>pro</span>
              </span>
            </div>
          </div>
        </div>
      )}

      <Header 
        currentServiceId={currentServiceId || currentProjectId} 
        onNavigateHome={handleNavigateHomeAndScroll} 
        startAnimation={startHeroAnimation || !isLoadingScreen}
      />
      
      {currentServiceId && (
        <ServiceDetails serviceId={currentServiceId} onBack={() => navigateToService(null)} />
      )}
      
      {currentProjectId && (
        <ProjectDetails 
          projectId={currentProjectId} 
          onBack={() => navigateToProject(null)} 
          onSelectProject={navigateToProject} 
        />
      )}
      
      {!currentServiceId && !currentProjectId && (
        <>
          <Hero onSelectService={navigateToService} startAnimation={startHeroAnimation || !isLoadingScreen} />
          <Services />
          <About />
          <Portfolio onSelectProject={navigateToProject} />
          <TestimonialsSection />
          <Footer />
        </>
      )}
      <ContactPopup />
    </div>
  )
}

export default App