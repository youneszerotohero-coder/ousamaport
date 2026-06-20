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
import ProjectsPage from "./pages/ProjectsPage"
import LoadingScreen from "./components/LoadingScreen"
import ContactPopup from "./components/ContactPopup"
import AdminDashboard from "./pages/AdminDashboard"
import { fetchServices, fetchProjects, fetchContact } from "./lib/api"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProjectsPage, setIsProjectsPage] = useState(false);
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'entering' | 'exiting'

  // DB dynamic data state
  const [services, setServices] = useState(null);
  const [projects, setProjects] = useState(null);
  const [contact, setContact] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const currentServiceIdRef = useRef(null);
  const currentProjectIdRef = useRef(null);
  const isAdminRef = useRef(false);
  const isProjectsPageRef = useRef(false);

  useEffect(() => {
    currentServiceIdRef.current = currentServiceId;
    currentProjectIdRef.current = currentProjectId;
    isAdminRef.current = isAdmin;
    isProjectsPageRef.current = isProjectsPage;
  });

  // Load database data on mount
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [sData, pData, cData] = await Promise.all([
          fetchServices(),
          fetchProjects(),
          fetchContact()
        ]);
        setServices(sData);
        setProjects(pData);
        setContact(cData);
      } catch (err) {
        console.error('Failed to load portfolio database data:', err);
      }
    };
    loadAllData();
  }, []);

  const triggerPageTransition = (navCallback) => {
    setTransitionState('entering');
    setTimeout(() => {
      navCallback();
      setTransitionState('exiting');
      setTimeout(() => {
        setTransitionState('idle');
        // Let layout settle, then refresh ScrollTrigger positions
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }, 650);
    }, 650);
  };

  useEffect(() => {
    if (!isLoadingScreen) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoadingScreen]);

  useEffect(() => {
    // Check initial path on load
    const checkPathInitial = () => {
      const path = window.location.pathname;
      const serviceMatch = path.match(/\/service\/([^/]+)/);
      const projectMatch = path.match(/\/project\/([^/]+)/);
      
      if (path === '/admin') {
        setIsAdmin(true);
        setIsProjectsPage(false);
        setCurrentServiceId(null);
        setCurrentProjectId(null);
      } else if (path === '/projects') {
        setIsProjectsPage(true);
        setIsAdmin(false);
        setCurrentServiceId(null);
        setCurrentProjectId(null);
      } else if (serviceMatch) {
        setCurrentServiceId(serviceMatch[1]);
        setCurrentProjectId(null);
        setIsAdmin(false);
        setIsProjectsPage(false);
      } else if (projectMatch) {
        setCurrentProjectId(projectMatch[1]);
        setCurrentServiceId(null);
        setIsAdmin(false);
        setIsProjectsPage(false);
      } else {
        setCurrentServiceId(null);
        setCurrentProjectId(null);
        setIsAdmin(false);
        setIsProjectsPage(false);
      }
    };

    // Transitioning check for back/forward navigation
    const checkPathPopState = () => {
      const path = window.location.pathname;
      const isAdminPath = path === '/admin';
      const isProjectsPath = path === '/projects';
      const serviceMatch = path.match(/\/service\/([^/]+)/);
      const projectMatch = path.match(/\/project\/([^/]+)/);
      
      const nextServiceId = serviceMatch ? serviceMatch[1] : null;
      const nextProjectId = projectMatch ? projectMatch[1] : null;

      // Skip transition if target is same as current page
      if (
        isAdminPath === isAdminRef.current && 
        isProjectsPath === isProjectsPageRef.current && 
        nextServiceId === currentServiceIdRef.current && 
        nextProjectId === currentProjectIdRef.current
      ) {
        return;
      }

      triggerPageTransition(() => {
        setIsAdmin(isAdminPath);
        setIsProjectsPage(isProjectsPath);
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
        setIsAdmin(false);
        setIsProjectsPage(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.history.pushState(null, "", "/");
        setCurrentServiceId(null);
        setCurrentProjectId(null);
        setIsAdmin(false);
        setIsProjectsPage(false);
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
        setIsAdmin(false);
        setIsProjectsPage(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.history.pushState(null, "", "/");
        setCurrentProjectId(null);
        setCurrentServiceId(null);
        setIsAdmin(false);
        setIsProjectsPage(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  };

  const navigateToProjectsPage = () => {
    triggerPageTransition(() => {
      window.history.pushState(null, "", "/projects");
      setIsProjectsPage(true);
      setCurrentServiceId(null);
      setCurrentProjectId(null);
      setIsAdmin(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  const navigateFromProjectsPage = () => {
    triggerPageTransition(() => {
      window.history.pushState(null, "", "/");
      setIsProjectsPage(false);
      setCurrentServiceId(null);
      setCurrentProjectId(null);
      setIsAdmin(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  const navigateToAdmin = () => {
    triggerPageTransition(() => {
      window.history.pushState(null, "", "/admin");
      setIsAdmin(true);
      setIsProjectsPage(false);
      setCurrentServiceId(null);
      setCurrentProjectId(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  const navigateFromAdmin = () => {
    triggerPageTransition(() => {
      window.history.pushState(null, "", "/");
      setIsAdmin(false);
      setIsProjectsPage(false);
      setCurrentServiceId(null);
      setCurrentProjectId(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  const handleNavigateHomeAndScroll = (hash) => {
    triggerPageTransition(() => {
      window.history.pushState(null, "", "/");
      setCurrentServiceId(null);
      setCurrentProjectId(null);
      setIsAdmin(false);
      setIsProjectsPage(false);
      
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
              <img 
                src="/ousamalogo.png" 
                alt="Logo" 
                className="w-10 h-10 object-contain shadow-[0_0_20px_rgba(144,238,144,0.3)]" 
              />
              <span className="font-extrabold text-xl tracking-widest text-white font-sans uppercase">
                Elec<span className="text-[#90EE90]" style={{ textShadow: '0 0 10px rgba(144,238,144,0.4)' }}>pro-dz</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {isAdmin ? (
        <AdminDashboard onBack={navigateFromAdmin} />
      ) : (
        <>
          <Header 
            currentServiceId={currentServiceId || currentProjectId || isProjectsPage} 
            onNavigateHome={handleNavigateHomeAndScroll} 
            startAnimation={startHeroAnimation || !isLoadingScreen}
            contact={contact}
          />
          
          {currentServiceId && (
            <ServiceDetails 
              serviceId={currentServiceId} 
              onBack={() => navigateToService(null)} 
              services={services} 
              onOpenContact={() => setIsContactOpen(true)}
            />
          )}
          
          {currentProjectId && (
            <ProjectDetails 
              projectId={currentProjectId} 
              onBack={() => navigateToProject(null)} 
              onSelectProject={navigateToProject} 
              projects={projects}
            />
          )}

          {isProjectsPage && (
            <ProjectsPage 
              projects={projects}
              onSelectProject={navigateToProject}
              onBack={navigateFromProjectsPage}
            />
          )}
          
          {!currentServiceId && !currentProjectId && !isProjectsPage && (
            <>
              <Hero 
                services={services}
                onSelectService={navigateToService} 
                startAnimation={startHeroAnimation || !isLoadingScreen} 
                onOpenContact={() => setIsContactOpen(true)}
              />
              <Services />
              <About />
              <Portfolio 
                onSelectProject={navigateToProject} 
                projects={projects} 
                onSeeMore={navigateToProjectsPage}
              />
              <TestimonialsSection />
              <Footer contact={contact} onNavigateAdmin={navigateToAdmin} />
            </>
          )}
          <ContactPopup contact={contact} isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
        </>
      )}
    </div>
  )
}

export default App