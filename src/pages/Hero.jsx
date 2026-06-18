import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import SplitText from '../components/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);
    const image4Ref = useRef(null);

    const containerRef = useRef(null);
    const buttonsRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useLayoutEffect(() => {
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
                    delay: 1.0,
                    stagger: 0.15,
                    ease: "power4.out"
                });
            }
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

            // Delay adding tweens slightly to ensure DOM is fully painted
            setTimeout(() => {
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
            }, 100);

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
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col font-sans bg-[#0A0B10] pt-20 z-20">
            {/* Background glow effect - changed to #90EE90 */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-[#90EE90]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>


            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-8 max-w-7xl mx-auto w-full pt-4 md:pt-10 pb-12 md:pb-24 gap-6 md:gap-12">
                {/* Left Content */}
                <div className="max-w-2xl z-20 flex flex-col items-center md:items-start w-full">
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="block text-white">
                            <SplitText
                                text="Installation"
                                className="inline"
                                tag="span"
                                textAlign={isMobile ? "center" : "left"}
                                delay={40}
                                duration={1.2}
                            />
                        </span>
                        <span className="block text-[#90EE90]">
                            <SplitText
                                text="Électrique"
                                className="inline"
                                tag="span"
                                textAlign={isMobile ? "center" : "left"}
                                delay={40}
                                duration={1.2}
                            />
                        </span>
                    </h1>

                    <div className="hidden md:block">
                        <SplitText
                            text="Fournir des solutions électriques sûres, fiables et efficaces pour les projets résidentiels, commerciaux et industriels."
                            className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
                            tag="p"
                            textAlign="left"
                            splitType="words"
                            delay={40}
                            duration={1.2}
                        />
                    </div>

                    <div ref={buttonsRef} className="flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4 mb-10 md:mb-20">
                        <button className="group flex items-center gap-1.5 md:gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-white hover:bg-[#90EE90] transition-all duration-300 text-black rounded-xl font-semibold text-sm cursor-pointer whitespace-nowrap">
                            Obtenir un devis
                            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-black group-hover:rotate-12 transition-transform" />
                        </button>
                        <button className="group flex items-center gap-1.5 md:gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-white/5 hover:bg-white transition-all duration-300 text-white hover:text-black rounded-xl font-semibold border border-white/10 text-sm cursor-pointer whitespace-nowrap">
                            Nos Services
                            <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-black transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>

                {/* Right side - Overlapping Images */}
                <div ref={containerRef} className="relative w-full lg:w-[500px] h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center mt-2 md:mt-12 lg:mt-0 z-10">
                    {/* Base shadow/glow for the images stack */}
                    <div className="absolute inset-0 bg-[#90EE90]/5 blur-3xl rounded-full"></div>

                    {/* Image 1 (Bottom) */}
                    <div
                        ref={image1Ref}
                        className="absolute w-44 sm:w-64 md:w-92 aspect-[3/2] rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden -rotate-8 -translate-x-12 -translate-y-6 hover:rotate-0 hover:z-50 hover:scale-105 hover:shadow-[#90EE90]/20 transition-all duration-500 ease-out animate-hero-image group cursor-pointer z-10"
                        style={{ '--final-x': '-3rem', '--final-y': '-1.5rem', '--final-rotate': '-8deg' }}
                    >
                        <img
                            src="/pic1.jpg"
                            alt="Électricité Commerciale"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="service-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 translate-y-5 transition-all duration-300">
                            <span className="text-[#90EE90] text-xs font-semibold tracking-widest uppercase mb-1">Commercial</span>
                            <h3 className="text-xl font-bold text-white mb-2">Électricité Commerciale</h3>
                            <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-300">
                                Installation électrique haut de gamme, éclairage commercial et configurations de sécurité sur mesure.
                            </p>
                            <div className="h-0 opacity-0 group-hover:h-10 group-hover:opacity-100 overflow-hidden transition-all duration-300">
                                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#90EE90] text-black font-semibold text-xs rounded-lg hover:bg-white transition-colors duration-300">
                                    Voir les Détails
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image 2 */}
                    <div
                        ref={image2Ref}
                        className="absolute w-44 sm:w-64 md:w-92 aspect-[3/2] rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden rotate-6 translate-x-10 -translate-y-10 hover:rotate-0 hover:z-50 hover:scale-105 hover:shadow-[#90EE90]/20 transition-all duration-500 ease-out animate-hero-image group cursor-pointer"
                        style={{ '--final-x': '2.5rem', '--final-y': '-2.5rem', '--final-rotate': '6deg' }}
                    >
                        <img
                            src="/pic2.jpg"
                            alt="Câblage Résidentiel"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="service-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 translate-y-5 transition-all duration-300">
                            <span className="text-[#90EE90] text-xs font-semibold tracking-widest uppercase mb-1">Résidentiel</span>
                            <h3 className="text-xl font-bold text-white mb-2">Câblage Résidentiel</h3>
                            <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-300">
                                Intégration d'éclairage élégante, inspections de sécurité électrique et mises à niveau du câblage général.
                            </p>
                            <div className="h-0 opacity-0 group-hover:h-10 group-hover:opacity-100 overflow-hidden transition-all duration-300">
                                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#90EE90] text-black font-semibold text-xs rounded-lg hover:bg-white transition-colors duration-300">
                                    Voir les Détails
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image 3 */}
                    <div
                        ref={image3Ref}
                        className="absolute w-44 sm:w-64 md:w-92 aspect-[3/2] rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden rotate-6 -translate-x-6 translate-y-8 hover:rotate-0 hover:z-50 hover:scale-105 hover:shadow-[#90EE90]/20 transition-all duration-500 ease-out animate-hero-image group cursor-pointer"
                        style={{ '--final-x': '-1.5rem', '--final-y': '2rem', '--final-rotate': '6deg' }}
                    >
                        <img
                            src="/pic3.jpg"
                            alt="Solutions Industrielles"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="service-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 translate-y-5 transition-all duration-300">
                            <span className="text-[#90EE90] text-xs font-semibold tracking-widest uppercase mb-1">Industriel</span>
                            <h3 className="text-xl font-bold text-white mb-2">Solutions Industrielles</h3>
                            <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-300">
                                Câblage haute tension, installations de machines, tests et support opérationnel régulier.
                            </p>
                            <div className="h-0 opacity-0 group-hover:h-10 group-hover:opacity-100 overflow-hidden transition-all duration-300">
                                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#90EE90] text-black font-semibold text-xs rounded-lg hover:bg-white transition-colors duration-300">
                                    Voir les Détails
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image 4 (Top) */}
                    <div
                        ref={image4Ref}
                        className="absolute w-44 sm:w-64 md:w-92 aspect-[3/2] rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden rotate-12 translate-x-12 translate-y-12 hover:rotate-0 hover:z-50 hover:scale-105 hover:shadow-[#90EE90]/20 transition-all duration-500 ease-out animate-hero-image group cursor-pointer"
                        style={{ '--final-x': '3rem', '--final-y': '3rem', '--final-rotate': '12deg' }}
                    >
                        <img
                            src="/pic4.png"
                            alt="Domotique Intelligente"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="service-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 translate-y-5 transition-all duration-300">
                            <span className="text-[#90EE90] text-xs font-semibold tracking-widest uppercase mb-1">Systèmes Intelligents</span>
                            <h3 className="text-xl font-bold text-white mb-2">Domotique Intelligente</h3>
                            <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all duration-300">
                                Intégration personnalisée pour la sécurité résidentielle, l'automatisation du climat et le contrôle sans fil à distance.
                            </p>
                            <div className="h-0 opacity-0 group-hover:h-10 group-hover:opacity-100 overflow-hidden transition-all duration-300">
                                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#90EE90] text-black font-semibold text-xs rounded-lg hover:bg-white transition-colors duration-300">
                                    Voir les Détails
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Hero;