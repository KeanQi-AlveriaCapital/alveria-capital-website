"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedNumberBackground from "./AnimatedNumberBackground";
import { useLanguage } from "@/context/LanguageContext";

// Animation variants for staggered fade-in effects
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.7,
      ease: "easeInOut"
    }
  })
};

interface CarouselItem {
  id: number;
  title: string;
  content: string;
}

export default function InvestmentPillars() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true,
    amount: 0.3
  });
  const { t } = useLanguage();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle left/right arrows for pillar navigation
      // Up/down arrows will be handled by the main page navigation
      if (e.key === 'ArrowLeft') {
        e.preventDefault(); // Prevent default behavior
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault(); // Prevent default behavior
        setCurrentIndex(prev => Math.min(investmentPillars.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Define pillars using translation keys
  const investmentPillars: CarouselItem[] = [
    {
      id: 1,
      title: t("pillars.inefficient"),
      content: t("pillars.inefficient.description")
    },
    {
      id: 2,
      title: t("pillars.risk"),
      content: t("pillars.risk.description")
    },
    {
      id: 3,
      title: t("pillars.opportunistic"),
      content: t("pillars.opportunistic.description")
    },
    {
      id: 4,
      title: t("pillars.absolute"),
      content: t("pillars.absolute.description")
    },
    {
      id: 5,
      title: t("pillars.adaptability"),
      content: t("pillars.adaptability.description")
    }
  ];

  const currentPillar = investmentPillars[currentIndex];

  const nextPillar = () => {
    if (currentIndex < investmentPillars.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevPillar = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <section 
      ref={sectionRef}
      data-section="pillars"
      data-nav-mode="light"
      className="relative w-screen min-h-screen lg:h-screen bg-[var(--midnight)] overflow-hidden"
    >
      {/* Mobile/Tablet: Stacked Layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Background SVG Numbers - Mobile (Top 50%) */}
        <motion.div
          variants={fadeIn}
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-[50vh] flex items-start justify-center pt-8"
        >
          <div className="transform scale-150 w-full h-full">
            <AnimatedNumberBackground 
              number={currentIndex + 1} 
              strokeWidth="0.4" 
              scale={1} 
            />
          </div>
        </motion.div>

        {/* Content Container - Bottom 50% aligned to bottom */}
        <div className="h-[50vh] flex flex-col justify-end section-padding-responsive lg:container-responsive pb-8 lg:pb-8">
          {/* Heading - Mobile */}
          <motion.div 
            variants={fadeIn}
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.h2 
                key={`title-mobile-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-h3 font-medium text-left" 
                style={{ color: 'var(--mercury)' }}
              >
                {currentPillar.title}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Content - Mobile */}
          <motion.div 
            variants={fadeIn}
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`content-mobile-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
                className="text-p3 text-left leading-relaxed"
                style={{ color: 'var(--mercury)' }}
              >
                {currentPillar.content}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Navigation - Mobile */}
          <motion.div 
            variants={fadeIn}
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center gap-4"
          >
            {/* Progress Dots - Mobile */}
            <div className="flex space-x-3 mb-4">
              {investmentPillars.map((_, index) => (
                <button
                  key={index}
                  className="transition-all duration-300"
                  onClick={() => setCurrentIndex(index)}
                >
                  <div 
                    className={`h-2 w-2 transition-all duration-300 ${
                      index === currentIndex ? 'bg-[var(--mercury)] scale-125 opacity-100' : 'bg-[var(--mercury)] opacity-40'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Arrows - Mobile */}
            <div className="flex items-center gap-4">
              {/* Previous Arrow */}
              <button
                onClick={prevPillar}
                disabled={currentIndex === 0}
                className={`flex items-center justify-center w-12 h-12 border rounded-[4px] transition-all duration-300 ${
                  currentIndex === 0 
                    ? 'opacity-30 cursor-not-allowed border-[var(--mercury)]' 
                    : 'hover:bg-[var(--outer-space)] border-[var(--mercury)]'
                }`}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 20 20" 
                  fill="none"
                  className="ml-[-2px]"
                >
                  <path 
                    d="M12 16l-6-6 6-6" 
                    stroke={currentIndex === 0 ? 'var(--mercury)' : 'var(--mercury)'} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Next Arrow */}
              <button
                onClick={nextPillar}
                disabled={currentIndex === investmentPillars.length - 1}
                className={`flex items-center justify-center w-12 h-12 border rounded-[4px] transition-all duration-300 ${
                  currentIndex === investmentPillars.length - 1 
                    ? 'opacity-30 cursor-not-allowed border-[var(--mercury)]' 
                    : 'hover:bg-[var(--outer-space)] border-[var(--mercury)]'
                }`}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 20 20" 
                  fill="none"
                  className="ml-[2px]"
                >
                  <path 
                    d="M8 4l6 6-6 6" 
                    stroke={currentIndex === investmentPillars.length - 1 ? 'var(--mercury)' : 'var(--mercury)'} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop: Original Layout */}
      <motion.div 
        className="hidden lg:block max-w-[2560px] h-full mx-auto relative"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {}
        }}
      >
        {/* Background SVG Numbers */}
        <motion.div
          variants={fadeIn}
          custom={0}
        >
          <AnimatedNumberBackground number={currentIndex + 1} />
        </motion.div>

        {/* Heading - Top Left */}
        <motion.div 
          className="absolute top-[200px] left-[100px] z-10 max-w-[600px]"
          variants={fadeIn}
          custom={1}
        >
          <AnimatePresence mode="wait">
            <motion.h2 
              key={`title-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-h3 font-medium text-left" 
              style={{ color: 'var(--mercury)' }}
            >
              {currentPillar.title}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        {/* Paragraph - Bottom Left */}
        <motion.div 
          className="absolute bottom-[100px] left-[100px] z-10 max-w-[600px]"
          variants={fadeIn}
          custom={2}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={`content-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
              className="text-p3 text-left leading-relaxed"
              style={{ color: 'var(--mercury)' }}
            >
              {currentPillar.content}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Arrows - Bottom Right */}
        <motion.div 
          className="absolute bottom-[100px] right-[100px] z-10"
          variants={fadeIn}
          custom={3}
        >
          <div className="flex items-center gap-4">
            {/* Position Indicator */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`indicator-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-p3 font-medium"
                style={{ color: 'var(--mercury)' }}
              >
                {currentIndex + 1} / {investmentPillars.length}
              </motion.span>
            </AnimatePresence>

            {/* Previous Arrow */}
            <button
              onClick={prevPillar}
              disabled={currentIndex === 0}
              className={`flex items-center justify-center w-12 h-12 border rounded-[4px] transition-all duration-300 ${
                currentIndex === 0 
                  ? 'opacity-30 cursor-not-allowed border-[var(--mercury)]' 
                  : 'hover:bg-[var(--outer-space)] border-[var(--mercury)]'
              }`}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 20 20" 
                fill="none"
                className="ml-[-2px]"
              >
                <path 
                  d="M12 16l-6-6 6-6" 
                  stroke={currentIndex === 0 ? 'var(--mercury)' : 'var(--mercury)'} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next Arrow */}
            <button
              onClick={nextPillar}
              disabled={currentIndex === investmentPillars.length - 1}
              className={`flex items-center justify-center w-12 h-12 border rounded-[4px] transition-all duration-300 ${
                currentIndex === investmentPillars.length - 1 
                  ? 'opacity-30 cursor-not-allowed border-[var(--mercury)]' 
                  : 'hover:bg-[var(--outer-space)] border-[var(--mercury)]'
              }`}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 20 20" 
                fill="none"
                className="ml-[2px]"
              >
                <path 
                  d="M8 4l6 6-6 6" 
                  stroke={currentIndex === investmentPillars.length - 1 ? 'var(--mercury)' : 'var(--mercury)'} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Progress Indicator Dots - Bottom Middle */}
        <motion.div 
          className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 z-10"
          variants={fadeIn}
          custom={4}
        >
          <div className="flex space-x-3">
            {investmentPillars.map((_, index) => (
              <button
                key={index}
                className="transition-all duration-300"
                onClick={() => setCurrentIndex(index)}
              >
                <div 
                  className={`h-2 w-2 transition-all duration-300 ${
                    index === currentIndex ? 'bg-[var(--mercury)] scale-125 opacity-100' : 'bg-[var(--mercury)] opacity-40'
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 