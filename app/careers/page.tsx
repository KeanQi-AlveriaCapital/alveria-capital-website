"use client";

import { useState, useEffect } from "react";
import { translations, useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/custom/Navigation";
import Footer from "@/components/custom/Footer";
import AnimatedText from "@/components/AnimatedText";
import { CardGrid } from "@/components/custom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ApplcationFormData {
  name: string;
  position: string;
  resume: File | null;
  coverletter: File | null;
}

export default function Careers() {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentPosition, setCurrentPosition] = useState("");
  const [formData, setFormData] = useState<ApplcationFormData>({
    name: "",
    position: "",
    resume: null,
    coverletter: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("position", t(currentPosition));
    if (formData.resume) {
      submitData.append("resume", formData.resume);
    }

    try {
      const response = await fetch("/api/slack", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: "Resume submitted successfully! We'll be in touch soon.",
        });
        setFormData({
          name: "",
          position: "",
          resume: null,
          coverletter: null,
        });
        setIsOpenDialog(false);
        toast(t("career.application.success"));
        // Reset file input
        const fileInput = document.getElementById("resume") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setResult({ success: false, message: data.message });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Error submitting resume. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateJobOpeningsKeys = (
    translations: Record<string, string>
  ): any[] => {
    const openings: any[] = [];

    for (const key in translations) {
      if (
        key.startsWith("career.openposition.") &&
        key.endsWith(".jobdescription")
      ) {
        const baseKey = key.replace(".jobdescription", ""); // e.g., "career.openposition.adminassistant"

        const job = {
          title: baseKey,
          description: `${baseKey}.jobdescription`,
          tags: [
            {
              text: "career.jobdetails.fulltime",
              backgroundColor: "var(--dawn)",
            },
            {
              text: "career.jobdetails.singapore",
              backgroundColor: "var(--submarine)",
            },
          ],
          link: {
            text: "career.jobdetails.applynow",
            onClick: () => {
              setIsOpenDialog(true);
              setCurrentPosition(baseKey);
            },
            color: "var(--sherpa-blue)",
            showArrow: true,
          },
        };

        openings.push(job);
      }
    }

    return openings;
  };

  return (
    <div className="relative">
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent
          className="sm:max-w-[500px]"
          style={{
            backgroundColor: "var(--mercury)",
            borderColor: "var(--outer-space)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle style={{ color: "var(--midnight)" }}>
                {t("career.application.title")}: {t(currentPosition)}
              </DialogTitle>
              <DialogDescription style={{ color: "var(--outer-space)" }}>
                {t("career.application.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mb-4 pt-2">
              <div className="grid gap-3">
                <Label
                  htmlFor="applicant-name"
                  style={{ color: "var(--midnight)" }}
                >
                  {t("career.application.name")} *
                </Label>
                <Input
                  id="applicant-name"
                  name="name"
                  placeholder={t("career.application.name.placeholder")}
                  required
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: "white",
                    borderColor: "var(--outer-space)",
                    color: "var(--midnight)",
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="resume-upload"
                  style={{ color: "var(--midnight)" }}
                >
                  {t("career.application.resume")} *{" "}
                </Label>
                <Input
                  id="resume-upload"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                  style={{
                    backgroundColor: "white",
                    borderColor: "var(--outer-space)",
                    color: "var(--midnight)",
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  style={{
                    borderColor: "var(--outer-space)",
                    color: "var(--midnight)",
                    backgroundColor: "transparent",
                  }}
                >
                  {t("career.application.cancel")}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "var(--sherpa-blue)",
                  color: "var(--mercury)",
                  border: "none",
                }}
              >
                {isSubmitting
                  ? t("career.application.submitapplication.loading")
                  : t("career.application.submitapplication")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
              {t("career.title")}
            </AnimatedText>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-p4 text-center max-w-2xl mx-auto"
              style={{ color: "var(--mercury)" }}
            >
              {t("career.description")}
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
            title={"career.section1.title"}
            titleColor="var(--midnight)"
            cards={generateJobOpeningsKeys(translations.EN)}
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
              {t("career.section2.title")}
            </h2>

            <div className="space-y-8">
              <div>
                <h3
                  className="text-h2 text-left mb-4"
                  style={{ color: "var(--midnight)" }}
                >
                  {t("career.section2.subtitle1")}
                </h3>
                <p
                  className="text-p4 text-left"
                  style={{ color: "var(--outer-space)" }}
                >
                  {t("career.section2.description1")}
                </p>
              </div>

              <div>
                <h3
                  className="text-h2 text-left mb-4"
                  style={{ color: "var(--midnight)" }}
                >
                  {t("career.section2.subtitle2")}
                </h3>
                <p
                  className="text-p4 text-left"
                  style={{ color: "var(--outer-space)" }}
                >
                  {t("career.section2.description2")}
                </p>
              </div>

              <div>
                <h3
                  className="text-h2 text-left mb-4"
                  style={{ color: "var(--midnight)" }}
                >
                  {t("career.section2.subtitle3")}
                </h3>
                <p
                  className="text-p4 text-left"
                  style={{ color: "var(--outer-space)" }}
                >
                  {t("career.section2.description3")}
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
              {t("career.section3.title")}
            </h2>

            <p
              className="text-p4 text-left mb-6"
              style={{ color: "var(--outer-space)" }}
            >
              {t("career.section3.description1")}
            </p>

            <p
              className="text-p4 text-left"
              style={{ color: "var(--outer-space)" }}
            >
              {t("career.section3.description2")}
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
