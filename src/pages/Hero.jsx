import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import SplitText from '../components/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/servicesData';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onSelectService, startAnimation, onOpenContact, services }) => {
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);
    const image4Ref = useRef(null);

    const containerRef = useRef(null);
    const buttonsRef = useRef(null);

    const activeServices = services && Object.keys(services).length > 0 
        ? Object.values(services) 
        : Object.values(servicesData);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [isEntranceFinished, setIsEntranceFinished] = useState(false);
    useEffect(() => {
        if (startAnimation) {
            const timer = setTimeout(() => {
                setIsEntranceFinished(true);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [startAnimation]);

    useLayoutEffect(() => {
        if (!startAnimation) return;

        let ctx = gsap.context(() => {
            // Animate buttons entrance on load
            if (buttonsRef.current) {
                gsap.fromTo(buttonsRef.current.children, {
                    opacity: 0,
                    y: 30,
                    scale: 0.95
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    delay: 0.4,
                    stagger: 0.15,
                    ease: "power4.out"
                });
            }
        });
        return () => ctx.revert();
    }, [startAnimation]);

    useLayoutEffect(() => {
        if (!startAnimation || !isEntranceFinished) return;

        let ctx = gsap.context(() => {
            const animations = [
                { ref: image1Ref, targetId: 'grid-img-1', startX: -48, startY: -24, startRot: -8 },
                { ref: image2Ref, targetId: 'grid-img-2', startX: 40, startY: -40, startRot: 6 },
                { ref: image3Ref, targetId: 'grid-img-3', startX: -24, startY: 32, startRot: 6 },
                { ref: image4Ref, targetId: 'grid-img-4', startX: 48, startY: 48, startRot: 12 },
            ];

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#services-section",
                    start: "top bottom",
                    end: "top top",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });

            animations.forEach((anim) => {
                tl.fromTo(anim.ref.current, {
                    x: anim.startX,
                    y: anim.startY,
                    rotation: anim.startRot,
                    scale: 1,
                }, {
                    x: () => {
                        const target = document.getElementById(anim.targetId);
                        const container = containerRef.current;
                        if (!target || !container) return 0;
                        const tRect = target.getBoundingClientRect();
                        const cRect = container.getBoundingClientRect();
                        return (tRect.left + tRect.width / 2) - (cRect.left + cRect.width / 2);
                    },
                    y: () => {
                        const target = document.getElementById(anim.targetId);
                        const container = containerRef.current;
                        if (!target || !container) return 0;
                        const tRect = target.getBoundingClientRect();
                        const cRect = container.getBoundingClientRect();
                        return (tRect.top + tRect.height / 2) - (cRect.top + cRect.height / 2);
                    },
                    scale: () => {
                        const target = document.getElementById(anim.targetId);
                        if (!target || !anim.ref.current) return 1;
                        return target.getBoundingClientRect().width / anim.ref.current.offsetWidth;
                    },
                    rotation: 0,
                    ease: "none",
                    immediateRender: false
                }, 0);
            });

            // Pin the services section at the top of viewport when it reaches top,
            // and unpin it when about section reaches top. Use pinSpacing: false so about overlays it.
            ScrollTrigger.create({
                trigger: "#services-section",
                start: "bottom bottom",
                endTrigger: "#about",
                end: "top top",
                pin: true,
                pinSpacing: false,
                zIndex: 10,
                id: "services-pin",
                invalidateOnRefresh: true
            });

            // Pin the Hero images container at the exact same time so that they stick together.
            ScrollTrigger.create({
                trigger: "#services-section",
                start: "bottom bottom",
                endTrigger: "#about",
                end: "top top",
                pin: containerRef.current,
                pinSpacing: false,
                zIndex: 20,
                id: "images-pin",
                invalidateOnRefresh: true
            });
        });

        return () => ctx.revert();
    }, [startAnimation, isEntranceFinished]);

    return (
        <div className="relative min-h-screen flex flex-col font-sans bg-[#0A0B10] pt-20 z-20">
            {/* Background glow effect - changed to #90EE90 */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-[#90EE90]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>


            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-8 max-w-7xl mx-auto w-full pt-4 md:pt-10 pb-12 md:pb-24 gap-12 lg:gap-12">
                {/* Left Content */}
                <div className="max-w-2xl z-20 flex flex-col items-center md:items-start w-full">
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="block text-white min-h-[1.1em]">
                            {startAnimation ? (
                                <SplitText
                                    text="Installation"
                                    className="inline"
                                    tag="span"
                                    textAlign={isMobile ? "center" : "left"}
                                    delay={40}
                                    duration={1.2}
                                
                                />
                            ) : (
                                <span className="opacity-0">Installation</span>
                            )}
                        </span>
                        <span className="block text-[#90EE90] min-h-[1.1em]">
                            {startAnimation ? (
                                <SplitText
                                    text="Électrique"
                                    className="inline"
                                    tag="span"
                                    textAlign={isMobile ? "center" : "left"}
                                    delay={40}
                                    duration={1.2}
                                
                                />
                            ) : (
                                <span className="opacity-0">Électrique</span>
                            )}
                        </span>
                    </h1>

                    <div className="hidden md:block min-h-[60px]">
                        {startAnimation ? (
                            <SplitText
                                text="Fournir des solutions électriques sûres, fiables et efficaces pour les projets résidentiels, commerciaux et industriels."
                                className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
                                tag="p"
                                textAlign="left"
                                splitType="words"
                                delay={40}
                                duration={1.2}
                            
                            />
                        ) : (
                            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10 opacity-0">
                                Fournir des solutions électriques sûres, fiables et efficaces pour les projets résidentiels, commerciaux et industriels.
                            </p>
                        )}
                    </div>

                    <div ref={buttonsRef} className={`flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4 mb-10 md:mb-20 transition-opacity duration-500 ${startAnimation ? 'opacity-100' : 'opacity-0'}`}>
                        <button 
                            onClick={onOpenContact}
                            className="group flex items-center gap-1.5 md:gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-white hover:bg-[#90EE90] transition-all duration-300 text-black rounded-xl font-semibold text-sm cursor-pointer whitespace-nowrap"
                        >
                            Obtenir un devis
                            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-black group-hover:rotate-12 transition-transform" />
                        </button>
                        <button 
                            onClick={() => {
                                const el = document.getElementById('portfolio');
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="group flex items-center gap-1.5 md:gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-white/5 hover:bg-white transition-all duration-300 text-white hover:text-black rounded-xl font-semibold border border-white/10 text-sm cursor-pointer whitespace-nowrap"
                        >
                            Nos Projets
                            <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-black transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>

                {/* Right side - Overlapping Images */}
                <div ref={containerRef} className="relative w-full lg:w-[500px] h-[75vw] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center mt-2 md:mt-12 lg:mt-0 z-10">
                    {/* Base shadow/glow for the images stack */}
                    <div className="absolute inset-0 bg-[#90EE90]/5 blur-3xl rounded-full"></div>

                    {activeServices.slice(0, 4).map((service, index) => {
                        const cardStyles = [
                            {
                                style: { '--final-x': '-3rem', '--final-y': '-1.5rem', '--final-rotate': '-8deg' },
                                className: '-rotate-8 -translate-x-12 -translate-y-6 z-10'
                            },
                            {
                                style: { '--final-x': '2.5rem', '--final-y': '-2.5rem', '--final-rotate': '6deg' },
                                className: 'rotate-6 translate-x-10 -translate-y-10'
                            },
                            {
                                style: { '--final-x': '-1.5rem', '--final-y': '2rem', '--final-rotate': '6deg' },
                                className: 'rotate-6 -translate-x-6 translate-y-8'
                            },
                            {
                                style: { '--final-x': '3rem', '--final-y': '3rem', '--final-rotate': '12deg' },
                                className: 'rotate-12 translate-x-12 translate-y-12'
                            }
                        ];
                        
                        const styleConfig = cardStyles[index] || cardStyles[0];
                        const ref = index === 0 ? image1Ref : index === 1 ? image2Ref : index === 2 ? image3Ref : image4Ref;

                        return (
                            <div
                                key={service.id || index}
                                ref={ref}
                                onClick={() => onSelectService?.(service.id)}
                                className={`absolute w-[58vw] sm:w-64 md:w-92 aspect-[3/2] rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden hover:rotate-0 hover:z-50 hover:scale-105 hover:shadow-[#90EE90]/20 transition-all duration-500 ease-out group cursor-pointer ${styleConfig.className} ${
                                    isEntranceFinished 
                                        ? '' 
                                        : (startAnimation ? 'animate-hero-image' : 'opacity-0 pointer-events-none')
                                } flex items-center justify-center`}
                                style={styleConfig.style}
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="max-w-full max-h-full w-auto h-auto transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="service-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300">
                                    <span className="text-[#90EE90] text-xs font-semibold tracking-widest uppercase mb-1">{service.category}</span>
                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 mb-4 transition-all duration-300">
                                        {service.tagline}
                                    </p>
                                    <div className="h-10 opacity-100 overflow-hidden transition-all duration-300">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectService?.(service.id);
                                            }}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#90EE90] text-black font-semibold text-xs rounded-lg hover:bg-white transition-colors duration-300 cursor-pointer"
                                        >
                                            Voir les Détails
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Hero;