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

export default function Careers() {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set up intersection observer to change nav mode
    const sections = document.querySelectorAll("section[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section");
            if (sectionName) {
              setCurrentSection(sectionName);
              // Set dark mode for navigation on light sections
              if (
                sectionName === "openings" ||
                sectionName === "benefits" ||
                sectionName === "culture"
              ) {
                setIsDarkMode(true);
              } else {
                setIsDarkMode(false);
              }
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Sample job openings
  const jobOpenings = [
    {
      title: "Admin Assistant",
      tags: [
        { text: "Remote", backgroundColor: "var(--submarine)" },
        { text: "Full-time", backgroundColor: "var(--dawn)" },
      ],
      description:
        "Provides administrative and organizational support to the trading or research team. Handles scheduling, documentation, travel arrangements, and office coordination to ensure smooth daily operations.",
      link: {
        text: "Apply now",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: true,
      },
    },
    {
      title: "Compliance Officer",
      tags: [
        { text: "Singapore", backgroundColor: "var(--submarine)" },
        { text: "Full-time", backgroundColor: "var(--dawn)" },
      ],
      description:
        "Ensures the company adheres to financial regulations, trading laws, and internal policies. Acts as a safeguard against regulatory breaches and helps manage risk.",
      link: {
        text: "Apply now",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: true,
      },
    },
    {
      title: "Senior Trader",
      tags: [
        { text: "Remote", backgroundColor: "var(--submarine)" },
        { text: "Full-time", backgroundColor: "var(--dawn)" },
      ],
      description:
        "Leads the design, execution, and optimization of trading strategies. Responsible for significant capital deployment, managing risk, and mentoring junior traders.",
      link: {
        text: "Apply now",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: true,
      },
    },
    {
      title: "Trader",
      tags: [
        { text: "Singapore", backgroundColor: "var(--submarine)" },
        { text: "Full-time", backgroundColor: "var(--dawn)" },
      ],
      description:
        "Executes trades and monitors market trends to identify profit opportunities. Balances speed and accuracy, often within automated or semi-automated systems.",
      link: {
        text: "Apply now",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: true,
      },
    },
    {
      title: "Junior Frontend Developer - Quantitative Trading Systems",
      tags: [
        { text: "Singapore", backgroundColor: "var(--submarine)" },
        { text: "Full-time", backgroundColor: "var(--dawn)" },
      ],
      description:
        "Assists in building and maintaining user interfaces for trading platforms and data dashboards. Works closely with traders, quants, and backend developers.",
      link: {
        text: "Apply now",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: true,
      },
    },
    {
      title: "Quantitative Researcher",
      tags: [
        { text: "Singapore", backgroundColor: "var(--submarine)" },
        { text: "Full-time", backgroundColor: "var(--dawn)" },
      ],
      description:
        "Develops and tests mathematical models to generate alpha and manage risk. Works at the intersection of statistics, machine learning, and financial theory.",
      link: {
        text: "Apply now",
        url: "#",
        color: "var(--sherpa-blue)",
        showArrow: true,
      },
    },
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
              style={{ color: "var(--mercury)" }}
              delay={0.1}
            >
              Careers
            </AnimatedText>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-p4 text-center max-w-2xl mx-auto"
              style={{ color: "var(--mercury)" }}
            >
              Join our team of talented professionals and help shape the future
              of investment management
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section
        data-section="openings"
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--mercury)]"
      >
        <div className="container-responsive py-[100px]">
          <CardGrid
            title="Current Openings"
            titleColor="var(--midnight)"
            cards={jobOpenings}
            columns={{
              mobile: 1,
              tablet: 2,
              desktop: 2,
            }}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section
        data-section="benefits"
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
            <h2
              className="text-h3 text-left mb-8"
              style={{ color: "var(--midnight)" }}
            >
              Benefits & Perks
            </h2>

            <div className="space-y-8">
              <div>
                <h3
                  className="text-h2 text-left mb-4"
                  style={{ color: "var(--midnight)" }}
                >
                  Competitive Compensation
                </h3>
                <p
                  className="text-p4 text-left"
                  style={{ color: "var(--outer-space)" }}
                >
                  We offer industry-leading salaries and bonus structures, with
                  significant performance-based incentives.
                </p>
              </div>

              <div>
                <h3
                  className="text-h2 text-left mb-4"
                  style={{ color: "var(--midnight)" }}
                >
                  Health & Wellness
                </h3>
                <p
                  className="text-p4 text-left"
                  style={{ color: "var(--outer-space)" }}
                >
                  Comprehensive health insurance, mental health resources, gym
                  memberships, and wellness programs.
                </p>
              </div>

              <div>
                <h3
                  className="text-h2 text-left mb-4"
                  style={{ color: "var(--midnight)" }}
                >
                  Growth & Development
                </h3>
                <p
                  className="text-p4 text-left"
                  style={{ color: "var(--outer-space)" }}
                >
                  Continuous learning opportunities, professional
                  certifications, and career advancement paths.
                </p>
              </div>

              <div>
                <h3
                  className="text-h2 text-left mb-4"
                  style={{ color: "var(--midnight)" }}
                >
                  Work-Life Balance
                </h3>
                <p
                  className="text-p4 text-left"
                  style={{ color: "var(--outer-space)" }}
                >
                  Flexible working arrangements, generous PTO, and parental
                  leave policies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section
        data-section="culture"
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
            <h2
              className="text-h3 text-left mb-8"
              style={{ color: "var(--midnight)" }}
            >
              Our Culture
            </h2>

            <p
              className="text-p4 text-left mb-6"
              style={{ color: "var(--outer-space)" }}
            >
              At Alveria Capital, we foster a collaborative environment where
              innovative thinking is encouraged and rewarded. We believe in
              creating a diverse and inclusive workplace where everyone's voice
              is heard and valued.
            </p>

            <p
              className="text-p4 text-left"
              style={{ color: "var(--outer-space)" }}
            >
              Our team consists of passionate individuals who are not only
              experts in their respective fields but also share a common goal of
              delivering exceptional results for our clients. We prioritize
              integrity, respect, and continuous improvement in everything we
              do.
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
