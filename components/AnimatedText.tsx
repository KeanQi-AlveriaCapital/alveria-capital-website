"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  // Allow any HTML element
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

/**
 * AnimatedText - A reusable component that fades in text when it enters the viewport
 * 
 * Uses the same animation style as the InvestmentPillars component with a clean fade-in
 * effect. Text will animate in when it enters the viewport.
 */
export default function AnimatedText({
  children,
  className = "",
  style,
  delay = 0.1,
  as = "p"
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,  // Only animate once
    amount: 0.3  // Trigger when 30% of the element is in view
  });

  // Create the component based on the "as" prop
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeInOut", 
        delay: delay
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
} 