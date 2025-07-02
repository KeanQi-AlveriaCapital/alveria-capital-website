"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import AnimatedText from "@/components/AnimatedText";
import { CardGrid } from "@/components/custom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function News() {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set up intersection observer to change nav mode
    const sections = document.querySelectorAll('section[data-section]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              setCurrentSection(sectionName);
              // Set dark mode for navigation on light sections
              if (sectionName === 'recent' || sectionName === 'press') {
                setIsDarkMode(true);
              } else {
                setIsDarkMode(false);
              }
            }
          }
        });
      },
      {
        threshold: 0.5
      }
    );
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Sample news data
  const recentNews = [
    {
      title: "Alveria Capital Launches New Investment Strategy",
      subtitle: "May 15, 2023",
      description: "Alveria Capital announced today the launch of its new quantitative investment strategy focused on global equities.",
      link: {
        text: "Read more",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: false
      }
    },
    {
      title: "Market Outlook Report for Q2 2023",
      subtitle: "April 5, 2023",
      description: "Our latest market outlook report highlights key trends and opportunities in both traditional and crypto markets.",
      link: {
        text: "Read more",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: false
      }
    },
    {
      title: "Alveria Capital Expands Team with Senior Hires",
      subtitle: "March 22, 2023",
      description: "We're pleased to announce the addition of three senior investment professionals to our growing team.",
      link: {
        text: "Read more",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: false
      }
    }
  ];
  
  const pressReleases = [
    {
      title: "Alveria Capital Achieves 25% Returns in 2022",
      subtitle: "January 12, 2023",
      description: "Despite market volatility, our strategic approach delivered exceptional returns for our investors.",
      link: {
        text: "Read more",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: false
      }
    },
    {
      title: "Alveria Capital Opens New Office in Singapore",
      subtitle: "November 8, 2022",
      description: "Expanding our global presence to better serve investors in the Asia-Pacific region.",
      link: {
        text: "Read more",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: false
      }
    }
  ];

  return (
    <div className="relative">
      {/* Fixed Navigation */}
      <Navigation isDarkMode={isDarkMode} />
      
      {/* Hero Section */}
      <section 
        data-section="hero" 
        className="w-[100vw] h-[100vh] relative flex items-center justify-center overflow-hidden"
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
        
        {/* Hero Content */}
        <div className="container-responsive relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <AnimatedText
              as="h1"
              className="text-h3 text-center mb-6"
              style={{ color: 'var(--mercury)' }}
              delay={0.1}
            >
              News & Updates
            </AnimatedText>
          </motion.div>
        </div>
      </section>
      
      {/* Recent News Section */}
      <section 
        data-section="recent" 
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--mercury)]"
      >
        <div className="container-responsive py-[100px]">
          <CardGrid
            title="Recent News"
            titleColor="var(--midnight)"
            cards={recentNews}
            columns={{
              mobile: 1,
              tablet: 2,
              desktop: 3
            }}
          />
        </div>
      </section>
      
      {/* Press Releases Section */}
      <section 
        data-section="press" 
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--submarine)]"
      >
        <div className="container-responsive py-[100px]">
          <CardGrid
            title="Press Releases"
            titleColor="var(--midnight)"
            cards={pressReleases}
            columns={{
              mobile: 1,
              tablet: 2,
              desktop: 2
            }}
          />
        </div>
      </section>
      
      {/* Footer Section */}
      <section data-section="footer">
        <Footer />
      </section>
    </div>
  );
} 