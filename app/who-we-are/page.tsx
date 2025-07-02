"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhoWeAre() {
  const { t, language } = useLanguage();
  const [currentSection, setCurrentSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Refs for each section - match scroll-test structure
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const tile1Ref = useRef<HTMLDivElement>(null);
  const tile2Ref = useRef<HTMLDivElement>(null);
  const tile3Ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set up GSAP animations for desktop only
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Clear any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      // Check if we're on desktop (xl breakpoint: 1300px and above) and not a touch device
      const isDesktop = () => window.innerWidth >= 1300;
      const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      if (isDesktop() && !isTouchDevice()) {
        console.log("Implementing animation timeline for desktop");
        
        // Create a timeline that pins the hero section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",        // Start when top of hero section hits top of viewport
            end: "+=100%",           // End after scrolling one full viewport height
            pin: true,               // Pin the hero section in place during animation
            scrub: 1,                // Smooth scrubbing effect (1 second lag)
            markers: false           // Hide markers in production
          },
        });
        
        // Calculate the distance to move
        // From initial position at bottom with padding to top with padding
        const sectionHeight = heroSectionRef.current?.clientHeight || 0;
        const contentHeight = heroContentRef.current?.clientHeight || 0;
        const moveDistance = sectionHeight - contentHeight - 200; // 200px accounts for top and bottom padding
        
        // Phase 2: Hero content moves from bottom to top (0-50% of timeline)
        tl.to(heroContentRef.current, {
          y: -moveDistance,
          duration: 0.5,  // Takes up first 50% of the timeline
          ease: "none"
        }, 0);
        
        // Position tiles initially below the viewport
        gsap.set(tile1Ref.current, {
          y: "50vh", // Start 50vh below its normal position
          opacity: 0
        });
        
        gsap.set(tile2Ref.current, {
          y: "50vh", 
          opacity: 0
        });
        
        gsap.set(tile3Ref.current, {
          y: "50vh", 
          opacity: 0
        });
        
        // Phase 3: Tile animations
        // Tile 1 moves up into view (50-100% of timeline)
        tl.to(tile1Ref.current, {
          y: 0,        // Move up to its original position
          opacity: 1,
          duration: 0.5, // Takes up second 50% of the timeline
          ease: "none"
        }, 0.5); // Start at 50% of the timeline
        
        // Tile 2 moves up with duration 1.3
        tl.to(tile2Ref.current, {
          y: 0,
          opacity: 1,
          duration: 1.3, // Longer duration as requested
          ease: "none"
        }, 0.5); // Start at 50% of the timeline
        
        // Tile 3 moves up with duration 1.6
        tl.to(tile3Ref.current, {
          y: 0,
          opacity: 1,
          duration: 1.6, // Even longer duration as requested
          ease: "none"
        }, 0.5); // Start at 50% of the timeline
        
        // Debug information
        console.log("Animation setup complete");
        console.log("Section height:", sectionHeight);
        console.log("Content height:", contentHeight);
        console.log("Move distance:", moveDistance);
      } else {
        console.log("Mobile/Tablet or touch device detected - using simple scroll layout");
      }
    }
    
    // Set up intersection observer to change nav mode
    const sectionsElements = document.querySelectorAll('[data-section]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              setCurrentSection(sectionName);
              
              // Only change navigation color for main sections, not the tiles
              // The tiles are only 50vh tall and don't require nav color changes
              if (sectionName === 'footer') {
                setIsDarkMode(false);
              } else if (sectionName === 'hero company') {
                setIsDarkMode(false);
              }
              
              // No longer changing isDarkMode for mission/vision/values tiles
            }
          }
        });
      },
      {
        threshold: 0.3
      }
    );
    
    sectionsElements.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      // Clean up
      observer.disconnect();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Fixed Navigation */}
      <Navigation isDarkMode={isDarkMode} />

      {/* Hero Section with Company Overview */}
      <div 
        ref={heroSectionRef}
        data-section="hero company" 
        className="w-screen h-screen relative overflow-hidden lg:block"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[var(--midnight)]/60"></div>
        </div>
        
        {/* Hero Content positioned at bottom left */}
        <div 
          ref={heroContentRef} 
          className="absolute bottom-0 left-0 w-full z-10 section-padding-responsive lg:pb-[100px] lg:px-[100px]"
        >
          <div className="max-w-3xl">
            <h1 className="text-h3 text-left mb-4" style={{ color: 'var(--mercury)' }}>
              {t("whoweare.overview")}
            </h1>
            
            <p className="text-p4 text-left" style={{ color: 'var(--mercury)' }}>
              {t("whoweare.description")}
            </p>
          </div>
        </div>
        
        {/* Desktop: Tiles inside hero section with complex animations */}
        <div className="absolute bottom-0 left-0 right-0 flex hidden lg:flex">
          {/* Mission Tile */}
          <div 
            ref={tile1Ref}
            data-section="mission" 
            className="w-1/3 h-[50vh] relative bg-[var(--submarine)] flex flex-col justify-center"
          >
            <div className="section-padding-mobile-sm lg:p-[75px]">
              <h2 className="text-h3 text-left mb-6" style={{ color: 'var(--midnight)' }}>
                {language === "EN" ? "Mission" : "使命"}
              </h2>
              
              <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
                {language === "EN" 
                  ? "To achieve superior risk-adjusted returns through a diversified portfolio of global equities and crypto assets."
                  : "通过全球股票及加密资产的多元化组合，实现卓越的风险调整收益。"
                }
              </p>
            </div>
          </div>
          
          {/* Vision Tile */}
          <div 
            ref={tile2Ref}
            data-section="vision" 
            className="w-1/3 h-[50vh] relative bg-[var(--dawn)] flex flex-col justify-center"
          >
            <div className="section-padding-mobile-sm lg:p-[75px]">
              <h2 className="text-h3 text-left mb-6" style={{ color: 'var(--midnight)' }}>
                {language === "EN" ? "Vision" : "愿景"}
              </h2>
              
              <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
                {language === "EN"
                  ? "To become a leading global investment fund, widely recognized in the global investment community for its innovation and sustained excellence."
                  : "成为全球领先的投资基金，以创新和持续的卓越表现，在全球投资领域中享有广泛认可。"
                }
              </p>
            </div>
          </div>
          
          {/* Values Tile */}
          <div 
            ref={tile3Ref}
            data-section="values" 
            className="w-1/3 h-[50vh] relative bg-[var(--sherpa-blue)] flex flex-col justify-center"
          >
            <div className="section-padding-mobile-sm lg:p-[75px]">
              <h2 className="text-h3 text-left mb-6" style={{ color: 'var(--mercury)' }}>
                {language === "EN" ? "Core Values" : "核心价值观"}
              </h2>
              
              <p className="text-p4 text-left" style={{ color: 'var(--mercury)' }}>
                {language === "EN"
                  ? "Integrity, responsibility, respect, innovation, teamwork"
                  : "诚信、责任、尊重、创新、团队合作"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Simple Stacked Tiles Below Hero */}
      <div className="lg:hidden">
        {/* Mission Tile */}
        <div 
          data-section="mission" 
          className="w-full min-h-screen bg-[var(--submarine)] flex flex-col justify-center"
        >
          <div className="section-padding-responsive">
            <h2 className="text-h3 text-left mb-6" style={{ color: 'var(--midnight)' }}>
              {language === "EN" ? "Mission" : "使命"}
            </h2>
            
            <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
              {language === "EN" 
                ? "To achieve superior risk-adjusted returns through a diversified portfolio of global equities and crypto assets."
                : "通过全球股票及加密资产的多元化组合，实现卓越的风险调整收益。"
              }
            </p>
          </div>
        </div>
        
        {/* Vision Tile */}
        <div 
          data-section="vision" 
          className="w-full min-h-screen bg-[var(--dawn)] flex flex-col justify-center"
        >
          <div className="section-padding-responsive">
            <h2 className="text-h3 text-left mb-6" style={{ color: 'var(--midnight)' }}>
              {language === "EN" ? "Vision" : "愿景"}
            </h2>
            
            <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
              {language === "EN"
                ? "To become a leading global investment fund, widely recognized in the global investment community for its innovation and sustained excellence."
                : "成为全球领先的投资基金，以创新和持续的卓越表现，在全球投资领域中享有广泛认可。"
              }
            </p>
          </div>
        </div>
        
        {/* Values Tile */}
        <div 
          data-section="values" 
          className="w-full min-h-screen bg-[var(--sherpa-blue)] flex flex-col justify-center"
        >
          <div className="section-padding-responsive">
            <h2 className="text-h3 text-left mb-6" style={{ color: 'var(--mercury)' }}>
              {language === "EN" ? "Core Values" : "核心价值观"}
            </h2>
            
            <p className="text-p4 text-left" style={{ color: 'var(--mercury)' }}>
              {language === "EN"
                ? "Integrity, responsibility, respect, innovation, teamwork"
                : "诚信、责任、尊重、创新、团队合作"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div 
        ref={footerRef}
        data-section="footer" 
        data-nav-mode="light"
        className="w-screen h-screen bg-[var(--outer-space)]"
      >
        <Footer />
      </div>
    </div>
  );
} 