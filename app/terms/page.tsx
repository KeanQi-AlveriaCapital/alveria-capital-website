"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import { motion } from "framer-motion";

export default function Terms() {
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
      
      {/* Terms & Conditions Content */}
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
              Terms and Conditions
            </h1>
            <p className="text-p4 italic" style={{ color: 'var(--outer-space)' }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
          
          {/* Terms Content */}
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
                  Welcome to Alveria Capital. These Terms and Conditions govern your access to and use of our fund's services. By investing with Alveria Capital, you agree to comply with these terms. Alveria Capital is incorporated under the laws of Labuan, Malaysia, and operates under the regulatory framework of the Labuan Financial Services Authority (LFSA).
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>2. Definitions</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  The term "Fund" refers to Alveria Capital and its managed investment vehicles. "Investor" refers to any individual or entity investing in the Fund. "Services" include fund management, portfolio allocation, and investment advisory services provided by Alveria Capital.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>3. Investor Eligibility</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Investors must meet the qualification criteria set by Labuan laws, including but not limited to high-net-worth individuals, accredited investors, and institutional investors.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>4. Risk Disclosure</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Investing in hedgefunds involves significant financial risk, including the risk of total capital loss. Past performance is not indicative of future results. Alveria Capital is not liable for losses incurred by investors.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>5. Subscription and Redemption</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Investors must adhere to the Fund's subscription and redemption policies as outlined in the Fund's Offering Memorandum. Redemption requests are subject to lock-up periods and notice requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>6. Regulatory Compliance</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Investors must ensure their investment activities comply with applicable Labuan financial regulations and international anti-money laundering (AML) laws.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>7. Fee Structure</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Alveria Capital charges management fees and performance-based incentive fees as specified in the Offering Memorandum. Fee structures are subject to periodic review and updates.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>8. Prohibited Activities</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Investors must not engage in money laundering or fraudulent transactions, market manipulation or insider trading, or any activity that violates regulatory compliance.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>9. Governance</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  The Fund is governed by a Board of Directors and complies with fiduciary obligations to act in the best interests of investors.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>10. Limitation of Liability</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  Alveria Capital shall not be held liable for indirect or consequential losses. Liability is limited to direct damages resulting from gross negligence or willful misconduct.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>11. Amendments</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  These Terms and Conditions may be updated periodically. Investors will be notified of significant changes.
                </p>
              </div>
              
              <div>
                <h3 className="text-h1 mb-4" style={{ color: 'var(--midnight)' }}>12. Governing Law</h3>
                <p className="text-p4 pl-4" style={{ color: 'var(--outer-space)' }}>
                  These Terms are governed by the laws of Labuan, Malaysia. Disputes shall be resolved through arbitration in Labuan.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Disclaimer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 bg-[var(--dawn)]/10 p-8 rounded-md border"
            style={{ borderColor: 'var(--dawn)' }}
          >
            <h2 className="text-h1 mb-6 border-b pb-2" style={{ color: 'var(--midnight)', borderColor: 'var(--dawn)' }}>
              Disclaimer
            </h2>
            
            <div className="legal-content space-y-6">
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                The information provided by Alveria Capital is for informational purposes only and should not be considered as investment, financial, legal, or tax advice. No content constitutes a solicitation, recommendation, or offer to buy or sell any securities, financial instruments, or investment products. Investors should consult with their financial advisors before making investment decisions.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                Alveria Capital operates as a Labuan hedgefund and is only available to high-net-worth individuals, institutional investors, and accredited investors as defined under Labuan Financial Services Authority (Labuan FSA) regulations. By engaging with Alveria Capital, you confirm that you meet the necessary regulatory requirements.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                Investing in hedgefunds involves substantial risk, including potential loss of principal. The fund employs leverage, derivatives, and alternative strategies, which may increase volatility. Past performance is not indicative of future results. Investors should carefully review the offering memorandum, risk disclosures, and all legal documents before investing.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                Alveria Capital operates under the Labuan Financial Services and Securities Act 2010 and complies with Labuan Financial Services Authority (Labuan FSA) regulations. However, the fund may not be registered in all jurisdictions, and access may be restricted based on local regulatory requirements.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                Alveria Capital does not guarantee returns or the preservation of capital. Investment decisions made by the fund's management team are based on research, market conditions, and proprietary strategies, which are subject to market risks, liquidity risks, and macroeconomic factors.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                Alveria Capital, its affiliates, directors, employees, or representatives shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of its services, investment losses, or reliance on information provided.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                Any market data, research, or third-party content provided is believed to be reliable but is not guaranteed for accuracy or completeness. Alveria Capital does not endorse or assume responsibility for third-party sources.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                Alveria Capital reserves the right to modify this disclaimer at any time without prior notice. Continued use of our services constitutes acceptance of any updates.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                This Disclaimer is governed by and construed in accordance with the laws of Labuan, Malaysia. Any disputes shall be subject to the exclusive jurisdiction of the Labuan courts.
              </p>
              
              <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
                For any inquiries regarding these Terms and Conditions, or Disclaimer, please contact Alveria Capital's compliance team.
              </p>
            </div>
          </motion.div>
          
          {/* Privacy Policy Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[var(--midnight)]/5 p-6 rounded-md"
          >
            <p className="text-p4" style={{ color: 'var(--outer-space)' }}>
              Please review our <a href="/privacy" className="underline font-medium" style={{ color: 'var(--sherpa-blue)' }}>Privacy Policy</a> on the website, which is a part of this Agreement and hereby incorporated by reference, to learn about our information collection practices and the measures we take to preserve the privacy and security of your information.
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