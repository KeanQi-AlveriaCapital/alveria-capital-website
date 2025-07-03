"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import AnimatedText from "@/components/AnimatedText";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
              if (sectionName === "form") {
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

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("Form submission failed:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

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
              {t("contactus.title")}
            </AnimatedText>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-p4 text-center max-w-2xl mx-auto"
              style={{ color: "var(--mercury)" }}
            >
              {t("contactus.description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        data-section="form"
        className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-[var(--mercury)]"
      >
        <div className="container-responsive py-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-h3 text-left mb-8"
                style={{ color: "var(--midnight)" }}
              >
                {t("contactus.section1.title")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail
                    className="w-6 h-6 mr-4 mt-1"
                    style={{ color: "var(--sherpa-blue)" }}
                  />
                  <div>
                    <h3
                      className="text-h1 mb-2"
                      style={{ color: "var(--midnight)" }}
                    >
                      {t("contactus.section1.subtitle1")}
                    </h3>
                    <p
                      className="text-p4"
                      style={{ color: "var(--outer-space)" }}
                    >
                      <a
                        href="mailto:info@alveriacapital.com"
                        className="hover:underline"
                        style={{ color: "var(--sherpa-blue)" }}
                      >
                        info@alveriacapital.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone
                    className="w-6 h-6 mr-4 mt-1"
                    style={{ color: "var(--sherpa-blue)" }}
                  />
                  <div>
                    <h3
                      className="text-h1 mb-2"
                      style={{ color: "var(--midnight)" }}
                    >
                      {t("contactus.section1.subtitle2")}
                    </h3>
                    <p
                      className="text-p4"
                      style={{ color: "var(--outer-space)" }}
                    >
                      <a
                        href="tel:+12125551234"
                        className="hover:underline"
                        style={{ color: "var(--sherpa-blue)" }}
                      >
                        +1 (212) 555-1234
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin
                    className="w-6 h-6 mr-4 mt-1"
                    style={{ color: "var(--sherpa-blue)" }}
                  />
                  <div>
                    <h3
                      className="text-h1 mb-2"
                      style={{ color: "var(--midnight)" }}
                    >
                      {t("contactus.section1.subtitle3")}
                    </h3>
                    <p
                      className="text-p4"
                      style={{ color: "var(--outer-space)" }}
                    >
                      #16-90, The Central Office 1
                      <br />
                      8 Eu Tong Sen St
                      <br />
                      Singapore 059818
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2
                className="text-h3 text-left mb-8"
                style={{ color: "var(--midnight)" }}
              >
                {t("contactus.section2.title")}
              </h2>

              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-lg shadow-md"
                >
                  <h3
                    className="text-h2 text-left mb-4"
                    style={{ color: "var(--sherpa-blue)" }}
                  >
                    {t("contactus.section3.title")}
                  </h3>
                  <p
                    className="text-p4 text-left"
                    style={{ color: "var(--outer-space)" }}
                  >
                    {t("contactus.section3.description")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-p3 mb-2"
                      style={{ color: "var(--midnight)" }}
                    >
                      {t("contactus.section2.label1")}*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "var(--dawn)",
                        backgroundColor: "white",
                        color: "var(--outer-space)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-p3 mb-2"
                      style={{ color: "var(--midnight)" }}
                    >
                      {t("contactus.section2.label2")}*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "var(--dawn)",
                        backgroundColor: "white",
                        color: "var(--outer-space)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-p3 mb-2"
                      style={{ color: "var(--midnight)" }}
                    >
                      {t("contactus.section2.label3")}*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "var(--dawn)",
                        backgroundColor: "white",
                        color: "var(--outer-space)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-p3 mb-2"
                      style={{ color: "var(--midnight)" }}
                    >
                      {t("contactus.section2.label4")}*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "var(--dawn)",
                        backgroundColor: "white",
                        color: "var(--outer-space)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center px-6 py-3 rounded-md transition-all duration-300"
                    style={{
                      backgroundColor: "var(--sherpa-blue)",
                      color: "var(--mercury)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--dawn)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--sherpa-blue)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin w-5 h-5 border-2 border-[var(--mercury)] border-t-transparent rounded-full mr-2" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting
                      ? t("contactus.section2.button.onclick")
                      : t("contactus.section2.button")}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section data-section="footer">
        <Footer />
      </section>
    </div>
  );
}
