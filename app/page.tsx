"use client";

import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import AnimatedCodeEmbed from "@/components/AnimatedCodeEmbed";
import InvestmentPillars from "@/components/InvestmentCarousel";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { useLanguage } from "@/context/LanguageContext";

// Interactive Card Component
function InteractiveCard({ title, content, fullWidth = false }: {
  title: string;
  content: string;
  fullWidth?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
        fullWidth ? 'w-full' : ''
      }`}
      style={{
        background: 'linear-gradient(135deg, var(--outer-space) 0%, var(--sherpa-blue) 100%)',
        border: '1px solid var(--dawn)',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      animate={{
        height: isExpanded ? 'auto' : '120px'
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut"
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-h3 font-medium text-left pr-4" style={{ color: 'var(--mercury)' }}>
            {title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
            style={{ color: 'var(--dawn)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </motion.div>
          </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ 
            duration: 0.3,
            delay: isExpanded ? 0.2 : 0
          }}
          className="mt-4"
        >
          <p className="text-p4 text-left" style={{ color: 'var(--mercury)' }}>
            {content}
          </p>
        </motion.div>
                    </div>
      
      {/* Subtle hover effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, var(--dawn) 0%, transparent 50%)',
          opacity: 0
        }}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Investment Pillar Component
function InvestmentPillar({ number, title, content }: {
  number: string;
  title: string;
  content: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative h-64 rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      style={{ backgroundColor: 'var(--mercury)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="text-h2 font-medium mb-4" style={{ color: 'var(--midnight)' }}>
          {number}.
                    </div>
        <h3 className="text-p3 font-medium text-left" style={{ color: 'var(--midnight)' }}>
          {title}
        </h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex-1"
        >
          <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
            {content}
          </p>
        </motion.div>
          </div>

      {/* Subtle border effect */}
      <div 
        className="absolute inset-0 rounded-lg transition-opacity duration-300"
              style={{ 
          border: `1px solid ${isHovered ? 'var(--dawn)' : 'transparent'}`,
          pointerEvents: 'none'
              }}
      />
          </div>
  );
}

// Centralized Scroll Manager Hook
function useScrollManager() {
  const [currentSection, setCurrentSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [philosophyImageAnimated, setPhilosophyImageAnimated] = useState(false);
  
  const isAnimatingRef = useRef(false);
  const currentSectionIndexRef = useRef(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const lastGestureTimeRef = useRef(0);

  // Section configuration
  const sectionConfig = [
    { name: "hero", navMode: "light" },
    { name: "philosophy", navMode: "dark" },
    { name: "pillars", navMode: "light" },
    { name: "final", navMode: "dark" },
    { name: "footer", navMode: "light" }
  ];

  // Initialize sections
  const initializeSections = useCallback(() => {
    const sections = Array.from(document.querySelectorAll('section[data-section]')) as HTMLElement[];
    sectionsRef.current = sections;
    
    // Set initial section based on scroll position
    const scrollPosition = window.scrollY;
    const viewportCenter = scrollPosition + window.innerHeight / 2;
    
    let initialIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].offsetTop;
      const sectionBottom = i < sections.length - 1 ? sections[i + 1].offsetTop : document.body.scrollHeight;
      
      if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
        initialIndex = i;
        break;
      }
    }
    
    // Check if near bottom
    if (scrollPosition + window.innerHeight >= document.body.scrollHeight - 100) {
      initialIndex = sections.length - 1;
    }
    
    currentSectionIndexRef.current = initialIndex;
    updateSectionState(initialIndex);
    
    console.log(`Initialized to section ${initialIndex}: ${sectionConfig[initialIndex]?.name}`);
  }, []);

  // Update section state and trigger side effects
  const updateSectionState = useCallback((index: number) => {
    const config = sectionConfig[index];
    if (!config) return;

    // Update navigation state
    setCurrentSection(config.name);
    setIsDarkMode(config.navMode === "dark");
    
    // Trigger philosophy image animation when philosophy section becomes active
    if (config.name === "philosophy" && !philosophyImageAnimated) {
      setPhilosophyImageAnimated(true);
    }
    
    console.log(`Section updated: ${config.name}, darkMode: ${config.navMode === "dark"}`);
  }, [philosophyImageAnimated]);

  // Scroll to specific section
  const scrollToSection = useCallback((index: number) => {
    const sections = sectionsRef.current;
    if (isAnimatingRef.current || index < 0 || index >= sections.length) {
      return;
    }

    // Debounce gestures
    const now = Date.now();
    if (now - lastGestureTimeRef.current < 800) {
      return;
    }
    lastGestureTimeRef.current = now;

    isAnimatingRef.current = true;
    const targetPosition = sections[index].offsetTop;
    
    // Immediately update state for responsive navigation
    currentSectionIndexRef.current = index;
    updateSectionState(index);

    gsap.to(window, {
      scrollTo: targetPosition,
      duration: 1.0,
      ease: "power2.out",
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });
  }, [updateSectionState]);

  // Handle scroll wheel/touch gestures
  const handleScrollGesture = useCallback((direction: 'up' | 'down') => {
    const currentIndex = currentSectionIndexRef.current;
    const maxIndex = sectionsRef.current.length - 1;
    
    if (direction === 'up' && currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    } else if (direction === 'down' && currentIndex < maxIndex) {
      scrollToSection(currentIndex + 1);
    }
  }, [scrollToSection]);

  // Track natural scroll position for fallback
  const handleNaturalScroll = useCallback(() => {
    if (isAnimatingRef.current) return;
    
    const sections = sectionsRef.current;
    if (sections.length === 0) return;

    const scrollPosition = window.scrollY;
    const viewportCenter = scrollPosition + window.innerHeight / 2;
    
    let newIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].offsetTop;
      const sectionBottom = i < sections.length - 1 ? sections[i + 1].offsetTop : document.body.scrollHeight;
      
      if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
        newIndex = i;
        break;
      }
    }
    
    // Handle bottom of page
    if (scrollPosition + window.innerHeight >= document.body.scrollHeight - 100) {
      newIndex = sections.length - 1;
    }
    
    if (newIndex !== currentSectionIndexRef.current) {
      currentSectionIndexRef.current = newIndex;
      updateSectionState(newIndex);
    }
  }, [updateSectionState]);

  return {
    currentSection,
    isDarkMode,
    philosophyImageAnimated,
    initializeSections,
    handleScrollGesture,
    handleNaturalScroll
  };
}

export default function Home() {
  const { language, t } = useLanguage();
  const [heroAnimationsTriggered, setHeroAnimationsTriggered] = useState(false);
  const heroAnimationsTriggeredRef = useRef(false); // 🔧 Stable ref for callback
  
  // ✅ PHASE 1: Enabling only nav color changes (without scroll snapping)
  const [currentSection, setCurrentSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false); // Default light mode for hero
  const [philosophyImageAnimated, setPhilosophyImageAnimated] = useState(false);
  
  // Refs for coordinated animations
  const navRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bodyTextRef = useRef<HTMLParagraphElement>(null);

  // Function to handle when text fill animation starts
  const handleTextFillStart = useCallback(() => {
    console.log('🎬 handleTextFillStart called', {
      heroAnimationsTriggered: heroAnimationsTriggeredRef.current,
      navRefExists: !!navRef.current,
      videoRefExists: !!videoRef.current,
      bodyTextRefExists: !!bodyTextRef.current
    });
    
    if (heroAnimationsTriggeredRef.current) {
      console.log('❌ Hero animations already triggered, skipping');
      return;
    }
    
    heroAnimationsTriggeredRef.current = true;
    setHeroAnimationsTriggered(true);
    
    if (navRef.current && videoRef.current && bodyTextRef.current) {
      console.log('✅ All refs exist, starting GSAP animation');
      console.log('Elements:', {
        nav: navRef.current,
        video: videoRef.current,
        bodyText: bodyTextRef.current
      });
      
      gsap.to([navRef.current, videoRef.current, bodyTextRef.current], {
        opacity: 1,
        duration: 2.0,
        ease: "power1.out",
        onStart: () => console.log('🎭 GSAP animation started'),
        onComplete: () => console.log('🎭 GSAP animation completed')
      });
    } else {
      console.log('❌ Missing refs:', {
        nav: !!navRef.current,
        video: !!videoRef.current,
        bodyText: !!bodyTextRef.current
      });
    }
  }, []); // 🔧 STABLE CALLBACK - no dependencies to prevent AnimatedCodeEmbed re-runs

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Set initial hidden states for hero animations
    if (navRef.current && videoRef.current && bodyTextRef.current) {
      gsap.set([navRef.current, videoRef.current, bodyTextRef.current], { opacity: 0 });
      console.log('🎭 Set initial opacity to 0 for hero elements');
    }

    // Check if we're on extra large screens (xl breakpoint: 1536px and above)
    const isDesktop = () => window.innerWidth >= 1536;
    let currentlyDesktop = isDesktop();

    // ✅ PHASE 1: Simple intersection observer for section detection and nav color changes (ALL DEVICES)
    const sectionConfig = [
      { name: "hero", navMode: "light" },
      { name: "philosophy", navMode: "dark" },
      { name: "pillars", navMode: "light" },
      { name: "final", navMode: "dark" },
      { name: "footer", navMode: "light" }
    ];

    const colorObserver = new IntersectionObserver(
      (entries) => {
        // Find the section with highest intersection ratio
        let bestSection: Element | null = null;
        let bestRatio = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestSection = entry.target;
          }
        });

        // Update state based on section
        if (bestSection) {
          const sectionName = (bestSection as HTMLElement).getAttribute('data-section');
          console.log(`Current section changed to: ${sectionName}`);
          
          // Update current section for navigation
          if (sectionName) {
            setCurrentSection(sectionName);
            
            // Find config for this section
            const config = sectionConfig.find(s => s.name === sectionName);
            if (config) {
              // Update dark mode based on section config
              setIsDarkMode(config.navMode === "dark");
              console.log(`Nav mode: ${config.navMode}`);
              
              // Trigger philosophy image animation when philosophy section becomes active
              if (sectionName === "philosophy") {
                setPhilosophyImageAnimated(true);
              }
            }
          }
        }
      },
      {
        // Detection zone to catch sections properly
        rootMargin: '0px 0px -50% 0px', // Top 50% of viewport
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5] // Multiple thresholds for better detection
      }
    );

    // Observe all sections with data-section attribute
    const sections = document.querySelectorAll('section[data-section]');
    console.log(`Observing ${sections.length} sections:`, Array.from(sections).map(s => s.getAttribute('data-section')));
    
    sections.forEach(section => {
      colorObserver.observe(section);
    });

    // ✅ PHASE 2: Scroll snapping setup - DESKTOP ONLY
    let scrollObserver: any = null;
    let handleKeyDown: ((e: KeyboardEvent) => void) | null = null;

    if (isDesktop()) {
      console.log('🖥️ Desktop detected - enabling scroll snapping');
      
      let currentSectionIndex = 0;
      let isAnimating = false;
      let lastGestureTime = 0;
      let isProcessingGesture = false;

      // Get all section elements for scroll snapping
      const sectionElements = Array.from(sections) as HTMLElement[];
      
      // Function to get section positions
      const getSectionPositions = () => sectionElements.map(section => section.offsetTop);

      // Initialize current section based on scroll position
      const initializeCurrentSection = () => {
        const scrollPosition = window.scrollY;
        const positions = getSectionPositions();
        let initialIndex = 0;
        
        for (let i = 0; i < positions.length; i++) {
          const sectionTop = positions[i];
          const sectionBottom = i < positions.length - 1 ? positions[i + 1] : document.body.scrollHeight;
          const viewportCenter = scrollPosition + window.innerHeight / 2;
          
          if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
            initialIndex = i;
            break;
          }
        }
        
        // Special handling for footer detection
        const isNearBottom = scrollPosition + window.innerHeight >= document.body.scrollHeight - 100;
        if (isNearBottom) {
          initialIndex = positions.length - 1;
        }
        
        currentSectionIndex = initialIndex;
      };

      // Initialize section position
      setTimeout(initializeCurrentSection, 100);

      // Function to scroll to specific section
      const scrollToSection = (index: number) => {
        if (isAnimating || index < 0 || index >= sectionElements.length) {
          return;
        }
        
        // Debounce gestures - prevent rapid firing
        const now = Date.now();
        if (now - lastGestureTime < 800) {
          return;
        }
        lastGestureTime = now;
        
        isAnimating = true;
        const targetPosition = getSectionPositions()[index];
        
        gsap.to(window, {
          scrollTo: targetPosition,
          duration: 1.0,
          ease: "power2.out",
          onComplete: () => {
            currentSectionIndex = index;
            isAnimating = false;
          }
        });
      };

      // ✅ PHASE 3: Keyboard navigation handler for section scrolling (DESKTOP ONLY)
      handleKeyDown = (e: KeyboardEvent) => {
        // Only handle up/down arrows for section navigation
        // Left/right arrows are still available for pillars navigation
        if (e.key === 'ArrowUp') {
          // In Investment Pillars section, let the component handle left/right arrows
          // but use our section navigation for up/down
          if (currentSection === 'pillars' && document.activeElement?.tagName === 'BUTTON') {
            return; // Let the Investment Pillars handle their own focus navigation
          }
          
          if (!isAnimating && currentSectionIndex > 0) {
            // Using the same logic as scroll gesture
            e.preventDefault(); // Prevent default scrolling
            scrollToSection(currentSectionIndex - 1);
          }
        } else if (e.key === 'ArrowDown') {
          // Same check for Investment Pillars section
          if (currentSection === 'pillars' && document.activeElement?.tagName === 'BUTTON') {
            return;
          }
          
          if (!isAnimating && currentSectionIndex < sectionElements.length - 1) {
            e.preventDefault(); // Prevent default scrolling  
            scrollToSection(currentSectionIndex + 1);
          }
        }
      };

      // Add keyboard event listener (desktop only)
      window.addEventListener('keydown', handleKeyDown);

      // Scroll observer for wheel and touch gestures (desktop only)
      scrollObserver = ScrollTrigger.observe({
        target: window,
        type: "wheel,touch",
        wheelSpeed: -1,
        onDown: () => {
          if (isProcessingGesture) return;
          
          if (!isAnimating && currentSectionIndex > 0) {
            isProcessingGesture = true;
            const targetIndex = currentSectionIndex - 1;
            scrollToSection(targetIndex);
            
            // Reset gesture flag after a delay
            setTimeout(() => {
              isProcessingGesture = false;
            }, 1200);
          }
        },
        onUp: () => {
          if (isProcessingGesture) return;
          
          if (!isAnimating && currentSectionIndex < sectionElements.length - 1) {
            isProcessingGesture = true;
            scrollToSection(currentSectionIndex + 1);
            
            // Reset gesture flag after a delay
            setTimeout(() => {
              isProcessingGesture = false;
            }, 1200);
          }
        },
        tolerance: 200, // Higher tolerance for less sensitivity
        preventDefault: true // Prevent normal scrolling to force snapping
      });
    } else {
      console.log('📱 Mobile/Tablet detected - using natural scrolling');
    }

    // Handle resize events to reinitialize if switching between mobile/desktop
    const handleResize = () => {
      const nowDesktop = isDesktop();
      if (nowDesktop !== currentlyDesktop) {
        console.log(`🔄 Device type changed: ${currentlyDesktop ? 'desktop' : 'mobile'} → ${nowDesktop ? 'desktop' : 'mobile'}`);
        // Refresh the page to reinitialize with correct behavior
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      colorObserver.disconnect();
      if (scrollObserver) {
        scrollObserver.kill();
      }
      if (handleKeyDown) {
        window.removeEventListener('keydown', handleKeyDown);
      }
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // No dependencies - runs once on mount

  return (
    <div className="relative">
      {/* Fixed Navigation */}
      <Navigation 
        ref={navRef}
        isDarkMode={isDarkMode}
        className={heroAnimationsTriggered ? '' : 'opacity-0'}
        currentSection={currentSection}
      />
                  
      {/* Hero Section */}
      <section 
        data-section="hero"
        data-nav-mode="light"
        className="relative w-screen h-screen overflow-hidden"
      >
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, var(--sherpa-blue), var(--midnight))'
          }}
        />
        
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
                      style={{ 
            mixBlendMode: 'soft-light',
            opacity: 0.5
          }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/bg-wave.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Fade Overlay */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #05101C 5%, transparent 40%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex items-end justify-start w-full h-full pb-[100px]">
          <div className="container-responsive">
            <div className="flex flex-col gap-heading-content max-w-4xl">
              <AnimatedCodeEmbed onTextFillStart={handleTextFillStart} />
              <p 
                ref={bodyTextRef} 
                className={`text-p3 md:max-w-3xl mx-auto opacity-0`}
                style={{ color: 'var(--mercury)' }}
              >
                {t("hero.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section 
        data-section="philosophy"
        data-nav-mode="dark"
        className="relative w-full min-h-screen bg-[var(--mercury)] flex flex-col xl:flex-row xl:items-center xl:justify-start"
      >
        {/* Mobile/Tablet: No Image */}

        {/* Extra Large Screens: Animated Image - Bottom Left */}
        <motion.div 
          className="hidden xl:block absolute bottom-0 left-0" 
          style={{ width: '50vw', height: '75vh', transformOrigin: 'bottom left' }}
          initial={{ scale: 0 }}
          animate={{ scale: philosophyImageAnimated ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full h-full bg-[var(--outer-space)] overflow-hidden">
            <img 
              src="/sg.jpg" 
              alt="Singapore Skyline" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Mobile/Tablet/Desktop: Centered Content */}
        <div className="section-padding-responsive xl:hidden min-h-screen flex flex-col justify-center">
          <AnimatedText
            as="h2"
            className="text-h3 text-left"
            style={{ color: 'var(--midnight)' }}
            delay={0}
          >
            {t("philosophy.title")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left"
            style={{ color: 'var(--outer-space)' }}
            delay={0.2}
          >
            {t("philosophy.part1")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left"
            style={{ color: 'var(--outer-space)' }}
            delay={0.3}
          >
            {t("philosophy.part2")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left"
            style={{ color: 'var(--outer-space)' }}
            delay={0.4}
          >
            {t("philosophy.part3")}
          </AnimatedText>
        </div>

        {/* Extra Large Screens: Content - Right Side */}
        <div className="hidden xl:block absolute top-1/2 right-[25%] transform -translate-y-1/2 translate-x-1/2 z-10 max-w-[600px]">
          <AnimatedText
            as="h2"
            className="text-h3 text-left"
            style={{ color: 'var(--midnight)' }}
            delay={0}
          >
            {t("philosophy.title")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left"
            style={{ color: 'var(--outer-space)' }}
            delay={0.2}
          >
            {t("philosophy.part1")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left"
            style={{ color: 'var(--outer-space)' }}
            delay={0.3}
          >
            {t("philosophy.part2")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left"
            style={{ color: 'var(--outer-space)' }}
            delay={0.4}
          >
            {t("philosophy.part3")}
          </AnimatedText>
        </div>
      </section>

      {/* Investment Pillars Section */}
      <InvestmentPillars />

      {/* Final Section */}
      <section 
        data-section="final"
        data-nav-mode="dark"
        className="relative w-full min-h-screen bg-[var(--mercury)] flex items-center justify-center z-0 lg:min-h-screen"
      >
        <div className="section-padding-responsive lg:container-responsive mx-auto">
          <AnimatedText
            as="h2"
            className="text-h3 text-left"
            style={{ color: 'var(--midnight)' }}
            delay={0}
          >
            {t("commitment.title")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left max-w-4xl mx-auto"
            style={{ color: 'var(--outer-space)' }}
            delay={0.2}
          >
            {t("commitment.part1")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left max-w-4xl mx-auto"
            style={{ color: 'var(--outer-space)' }}
            delay={0.3}
          >
            {t("commitment.part2")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 mt-4 text-left max-w-4xl mx-auto"
            style={{ color: 'var(--outer-space)' }}
            delay={0.4}
          >
            {t("commitment.part3")}
          </AnimatedText>
        </div>
      </section>

      {/* Footer Section */}
      <section 
        data-section="footer"
        data-nav-mode="light"
        className="relative z-10 w-screen bg-[var(--outer-space)] lg:h-screen lg:relative lg:z-0"
      >
        <Footer />
      </section>
    </div>
  );
}
