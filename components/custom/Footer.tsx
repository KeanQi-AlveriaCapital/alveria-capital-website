"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

// Animation variants for staggered fade-in effects
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      ease: "easeInOut"
    }
  })
};

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribeStatus("success");
      setEmail("");
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscribeStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <footer className="relative z-10 w-[100vw] min-h-screen lg:h-[100vh] bg-[var(--outer-space)] overflow-hidden flex flex-col pt-[100px] justify-start lg:justify-end pb-[25px] lg:relative lg:z-0">
      <div className="relative z-10 max-w-[2560px] mx-auto w-full flex flex-col lg:relative lg:z-0">
        {/* CTA Section */}
        <motion.div 
          className="relative z-20 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-[100px] lg:z-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          custom={0}
        >
          <AnimatedText
            as="h2"
            className="text-h3"
            style={{ color: 'var(--mercury)' }}
            delay={0}
          >
            {t("footer.ready")}
          </AnimatedText>
          
          <AnimatedText
            className="text-p4 max-w-2xl mx-auto my-[50px]"
            style={{ color: 'var(--mercury)' }}
            delay={0.1}
          >
            {t("footer.readyDescription")}
          </AnimatedText>
          
          <motion.div 
            className="inline-block overflow-hidden rounded-[4px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a 
              href="/contact"
              className="flex items-center gap-2 transition-all duration-300"
              style={{ 
                padding: '24px 48px',
                backgroundColor: 'var(--sherpa-blue)',
                color: 'var(--mercury)',
                fontFamily: "'Proxima Nova', system-ui, sans-serif",
                fontSize: 'var(--text-p3)',
                fontWeight: 600,
                lineHeight: '1.25rem',
                borderRadius: '4px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--dawn)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sherpa-blue)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Mail className="h-4 w-4" />
              {t("footer.contactUs")}
            </a>
          </motion.div>
        </motion.div>
        
        {/* Divider */}
        <motion.div 
          className="border-t border-[var(--dawn)]/40 mx-6 md:mx-12 lg:mx-[100px] my-[50px]"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>
        
        {/* Main Footer Content */}
        
        {/* Mobile/Tablet: Stacked Layout */}
        <div className="lg:hidden flex flex-col space-y-8 section-padding-responsive">
          {/* Logo and About */}
          <motion.div 
            className="flex flex-col space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image 
                src="/logo.svg" 
                alt="Alveria Capital" 
                width={180} 
                height={90}
                className="h-22 w-auto"
              />
            </motion.div>
            
            <motion.p 
              className="text-p4" 
              style={{ color: 'var(--mercury)', height: '100px', display: 'block' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Empty but preserved for spacing */}
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a href="https://www.linkedin.com/company/alveriacapital" target="_blank" rel="noopener noreferrer" className="text-[var(--mercury)] hover:text-[var(--dawn)] transition-colors">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </motion.div>
          </motion.div>
          
          {/* We're Hiring */}
          <motion.div 
            className="flex flex-col space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={2}
          >
            <motion.h3 
              className="text-h1 font-medium" 
              style={{ color: 'var(--dawn)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {t("footer.hiring")}
            </motion.h3>
            
            <motion.p 
              className="text-p4" 
              style={{ color: 'var(--mercury)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t("footer.hiringDescription")}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button 
                variant="default"
                className="btn-investor"
                asChild
              >
                <a href="mailto:careers@alveriacapital.com" className="text-[var(--mercury)]">
                  {t("footer.applyNow")}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stay Informed */}
          <motion.div 
            className="flex flex-col space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={3}
          >
            <motion.h3 
              className="text-h1 font-medium" 
              style={{ color: 'var(--dawn)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {t("footer.stayInformed")}
            </motion.h3>
            
            <motion.p 
              className="text-p4" 
              style={{ color: 'var(--mercury)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {t("footer.stayInformedDescription")}
            </motion.p>
            
            <motion.form 
              onSubmit={handleSubscribe} 
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex h-[38px] newsletter-input-border rounded-[4px]">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.yourEmail")} 
                  className="bg-[var(--outer-space)] border-0 px-4 py-2 text-p3 w-full focus:outline-none text-[var(--mercury)] rounded-l-[4px]"
                  disabled={isSubmitting || subscribeStatus === "success"}
                />
                <Button 
                  type="submit" 
                  variant="ghost"
                  className="btn-investor border-l border-[var(--dawn)]/50 rounded-l-none h-full rounded-r-[4px] px-4 flex items-center justify-center"
                  disabled={isSubmitting || subscribeStatus === "success"}
                >
                  {isSubmitting ? (
                    <div className="animate-spin w-5 h-5 border-2 border-[var(--mercury)] border-t-transparent rounded-full" />
                  ) : (
                    <ArrowRight size={18} className="text-[var(--mercury)]" />
                  )}
                </Button>
              </div>
              
              {subscribeStatus === "success" && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-p2 absolute"
                >
                  {t("footer.thanks")}
                </motion.p>
              )}
            </motion.form>
          </motion.div>
        </div>

        {/* Desktop: Original Grid Layout */}
        <div className="hidden lg:grid grid-cols-4 gap-x-8 gap-y-8 px-6 md:px-12 lg:px-[100px] h-full">
          {/* Column 1: Logo and About (spans 2 columns) */}
          <motion.div 
            className="col-span-2 flex flex-col h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
          >
            <div className="max-w-[50%] flex flex-col justify-between h-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="Alveria Capital" 
                  width={180} 
                  height={90}
                  className="h-22 w-auto"
                />
              </motion.div>
              
              <motion.p 
                className="text-p4" 
                style={{ color: 'var(--mercury)', height: '100px', display: 'block' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {/* Empty but preserved for spacing */}
              </motion.p>
              
              <motion.div 
                className="flex space-x-4 mt-[50px]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a href="https://www.linkedin.com/company/alveriacapital" target="_blank" rel="noopener noreferrer" className="text-[var(--mercury)] hover:text-[var(--dawn)] transition-colors">
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Column 2: We're Hiring */}
          <motion.div 
            className="col-span-1 flex flex-col h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={2}
          >
            <div className="flex flex-col justify-between h-full">
              <motion.h3 
                className="text-h1 font-medium" 
                style={{ color: 'var(--dawn)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {t("footer.hiring")}
              </motion.h3>
              
              <motion.p 
                className="text-p4" 
                style={{ color: 'var(--mercury)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {t("footer.hiringDescription")}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Button 
                  variant="default"
                  className="btn-investor"
                  asChild
                >
                  <a href="mailto:careers@alveriacapital.com" className="text-[var(--mercury)]">
                    {t("footer.applyNow")}
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Column 3: Stay Informed */}
          <motion.div 
            className="col-span-1 flex flex-col h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={3}
          >
            <div className="flex flex-col justify-between h-full">
              <motion.h3 
                className="text-h1 font-medium" 
                style={{ color: 'var(--dawn)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {t("footer.stayInformed")}
              </motion.h3>
              
              <motion.p 
                className="text-p4" 
                style={{ color: 'var(--mercury)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {t("footer.stayInformedDescription")}
              </motion.p>
              
              <motion.form 
                onSubmit={handleSubscribe} 
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex h-[38px] newsletter-input-border rounded-[4px]">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.yourEmail")} 
                    className="bg-[var(--outer-space)] border-0 px-4 py-2 text-p3 w-full focus:outline-none text-[var(--mercury)] rounded-l-[4px]"
                    disabled={isSubmitting || subscribeStatus === "success"}
                  />
                  <Button 
                    type="submit" 
                    variant="ghost"
                    className="btn-investor border-l border-[var(--dawn)]/50 rounded-l-none h-full rounded-r-[4px] px-4 flex items-center justify-center"
                    disabled={isSubmitting || subscribeStatus === "success"}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin w-5 h-5 border-2 border-[var(--mercury)] border-t-transparent rounded-full" />
                    ) : (
                      <ArrowRight size={18} className="text-[var(--mercury)]" />
                    )}
                  </Button>
                </div>
                
                {subscribeStatus === "success" && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-p2 absolute"
                  >
                    {t("footer.thanks")}
                  </motion.p>
                )}
              </motion.form>
            </div>
          </motion.div>
        </div>
        
        {/* Divider */}
        <motion.div 
          className="border-t border-[var(--dawn)]/40 mx-6 md:mx-12 lg:mx-[100px] mt-[50px] mb-[25px]"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.3 }}
        ></motion.div>
        
        {/* Bottom Footer */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-[100px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {/* Copyright */}
          <p className="text-p2 md:mb-0 text-center md:text-left" style={{ color: 'var(--mercury)' }}>
            &copy; {new Date().getFullYear()} Alveria Capital. {t("footer.rights")}
          </p>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <a 
              href="/terms" 
              className="text-p2 transition-colors hover:text-[var(--dawn)]"
              style={{ color: 'var(--mercury)' }}
            >
              {t("footer.terms")}
            </a>
            <a 
              href="/privacy" 
              className="text-p2 transition-colors hover:text-[var(--dawn)]"
              style={{ color: 'var(--mercury)' }}
            >
              {t("footer.privacy")}
            </a>
            <a 
              href="/legal" 
              className="text-p2 transition-colors hover:text-[var(--dawn)]"
              style={{ color: 'var(--mercury)' }}
            >
              {t("footer.legal")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 