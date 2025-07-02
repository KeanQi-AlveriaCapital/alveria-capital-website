"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import AnimatedText from "@/components/AnimatedText";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhatWeDo() {
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
              if (sectionName === 'strategies' || sectionName === 'markets' || sectionName === 'risk' || sectionName === 'investor') {
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
            {t("whatwedo.title")}
            </AnimatedText>
          </motion.div>
        </div>
      </section>
      
      {/* Investment Strategies Section */}
      <section 
        data-section="strategies" 
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--mercury)]"
      >
        <div className="container-responsive py-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-h3 text-left mb-8" style={{ color: 'var(--midnight)' }}>
                {t("whatwedo.strategies")}
              </h2>
            
            <p className="text-p4 text-left mb-8" style={{ color: 'var(--outer-space)' }}>
                {t("whatwedo.strategies.description")}
              </p>
              
            <div className="space-y-6">
                <div>
                <h3 className="text-h2 text-left mb-4" style={{ color: 'var(--midnight)' }}>
                    {t("whatwedo.strategies.quant")}
                  </h3>
                  <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
                    {t("whatwedo.strategies.quant.description")}
                  </p>
                </div>
                
                <div>
                <h3 className="text-h2 text-left mb-4" style={{ color: 'var(--midnight)' }}>
                    {t("whatwedo.strategies.discretionary")}
                  </h3>
                  <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
                    {t("whatwedo.strategies.discretionary.description")}
                  </p>
                </div>
              </div>
          </motion.div>
            </div>
      </section>
      
      {/* Markets Section */}
      <section 
        data-section="markets" 
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--submarine)]"
      >
        <div className="container-responsive py-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-h3 text-left mb-8" style={{ color: 'var(--midnight)' }}>
                {t("whatwedo.markets")}
              </h2>
              
            <div className="space-y-6">
                <div>
                <h3 className="text-h2 text-left mb-4" style={{ color: 'var(--midnight)' }}>
                    {t("whatwedo.markets.equity")}
                  </h3>
                  <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
                    {t("whatwedo.markets.equity.description")}
                  </p>
                </div>
                
                <div>
                <h3 className="text-h2 text-left mb-4" style={{ color: 'var(--midnight)' }}>
                    {t("whatwedo.markets.crypto")}
                  </h3>
                  <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
                    {t("whatwedo.markets.crypto.description")}
                  </p>
                </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Risk Management Section */}
      <section 
        data-section="risk" 
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--dawn)]"
      >
        <div className="container-responsive py-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-h3 text-left mb-8" style={{ color: 'var(--midnight)' }}>
                {t("whatwedo.risk")}
              </h2>
            
            <p className="text-p4 text-left mb-6" style={{ color: 'var(--outer-space)' }}>
                {t("whatwedo.risk.description")}
              </p>
            
            <p className="text-p4 text-left" style={{ color: 'var(--outer-space)' }}>
                {t("whatwedo.risk.system")}
              </p>
          </motion.div>
            </div>
      </section>
      
      {/* Investor Relations Section */}
      <section 
        data-section="investor" 
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--sherpa-blue)]"
      >
        <div className="container-responsive py-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-h3 text-left mb-8" style={{ color: 'var(--mercury)' }}>
                {t("whatwedo.investor")}
              </h2>
            
            <p className="text-p4 text-left mb-6" style={{ color: 'var(--mercury)' }}>
                {t("whatwedo.investor.description")}
              </p>
            
            <p className="text-p4 text-left" style={{ color: 'var(--mercury)' }}>
                {t("whatwedo.investor.process")}
              </p>
          </motion.div>
        </div>
      </section>
      
      {/* Footer Section */}
      <section data-section="footer">
        <Footer />
      </section>
    </div>
  );
} 