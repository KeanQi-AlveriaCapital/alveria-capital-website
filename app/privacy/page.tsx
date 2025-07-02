"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import { motion } from "framer-motion";

export default function Privacy() {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState("content");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Set up intersection observer to change nav mode
  useEffect(() => {
    const sections = document.querySelectorAll('section[data-section]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              setCurrentSection(sectionName);
              // Set dark mode for navigation based on section
              if (sectionName === 'footer') {
                setIsDarkMode(false);
              } else {
                setIsDarkMode(true);
              }
            }
          }
        });
      },
      {
        threshold: 0.3
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
      
      {/* Privacy Policy Content */}
      <section 
        data-section="content"
        className="w-[100vw] min-h-[100vh] bg-[var(--mercury)] pt-[120px] pb-[100px]"
      >
        <div className="container-responsive max-w-[1000px] mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 border-b-2 pb-4"
            style={{ borderColor: 'var(--dawn)' }}
          >
            <h1 className="text-h3 mb-2" style={{ color: 'var(--midnight)' }}>
              Privacy Policy
            </h1>
            <p className="text-p4 italic" style={{ color: 'var(--outer-space)' }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
          
          {/* Privacy Policy Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="legal-content space-y-8">
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>1. Introduction</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  This Privacy Policy explains how Alveria Capital collects, processes, and protects investor data in compliance with the Labuan Data Protection Act.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>2. Data Collection</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  We collect the following types of investor data: personal identification information (name, contact details, ID verification documents), financial data related to investments and transactions, and regulatory compliance information, including AML/KYC documentation.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>3. Purpose of Data Collection</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Data is collected to verify investor identity and comply with AML regulations, manage investments and provide hedgefund services, and comply with Labuan Financial Services Authority (LFSA) requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>4. Data Sharing</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  We do not sell investor data. However, we may share information with regulatory authorities when required by law, banking institutions for fund transactions, and compliance service providers to ensure regulatory adherence.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>5. Data Retention</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Investor data is retained as required by law for compliance and audit purposes. Upon request, investors may seek deletion of their data, subject to regulatory requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>6. Data Security</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Alveria Capital implements strong security measures, including encryption and secure storage, to protect investor data.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>7. Investor Rights</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Investors have the right to access their personal data, request corrections or deletions, and withdraw consent for data processing, subject to legal limitations.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>8. Policy Updates</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  We may update this Privacy Policy periodically. Investors will be notified of significant changes.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>9. Governing Law</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  This Privacy Policy is governed by the laws of Labuan, Malaysia.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Terms Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[var(--midnight)]/5 p-6 rounded-md"
          >
            <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
              Please review our <a href="/terms" className="underline font-medium" style={{ color: 'var(--sherpa-blue)' }}>Terms and Conditions</a> on the website, which together with this Privacy Policy governs your relationship with Alveria Capital.
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