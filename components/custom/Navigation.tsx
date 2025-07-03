"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

// Animated Navigation Link Component
function AnimatedNavLink({
  href,
  children,
  className = "",
  style = {},
  isDarkMode = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isDarkMode?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const underlineColor = isDarkMode ? "var(--midnight)" : "var(--mercury)";

  return (
    <NavigationMenuLink
      className={`${className} nav-text relative hover:bg-transparent`}
      style={style}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[1px] nav-underline"
        style={{ backgroundColor: underlineColor }}
        initial={{ width: 0, x: "-50%" }}
        animate={{
          width: isHovered ? "100%" : 0,
          x: "-50%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
    </NavigationMenuLink>
  );
}

// Animated Mobile Link Component
function AnimatedMobileLink({
  href,
  children,
  className = "",
  style = {},
  isDarkMode = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isDarkMode?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const underlineColor = isDarkMode ? "var(--midnight)" : "var(--mercury)";

  return (
    <a
      href={href}
      className={`${className} relative block hover:bg-transparent`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[1px]"
        style={{ backgroundColor: underlineColor }}
        initial={{ width: 0, x: "-50%" }}
        animate={{
          width: isHovered ? "100%" : 0,
          x: "-50%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
    </a>
  );
}

// Language Toggle Component (Desktop)
function LanguageToggle({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <ToggleGroup
      type="single"
      value={language}
      onValueChange={(value: string) =>
        value && setLanguage(value as "EN" | "中文")
      }
      className="rounded-[4px] p-0 h-auto shadow-[0_0_0_1px_var(--dawn)] overflow-hidden"
    >
      <ToggleGroupItem
        value="EN"
        className="text-p3 font-medium bg-transparent data-[state=on]:bg-[var(--dawn)] hover:bg-[var(--outer-space)] active:scale-95 border-none rounded-none px-6 py-4 transition-all duration-300 toggle-item first:rounded-l-[4px] last:rounded-r-[4px]"
      >
        EN
      </ToggleGroupItem>
      <ToggleGroupItem
        value="中文"
        className="text-p3 font-medium bg-transparent data-[state=on]:bg-[var(--dawn)] hover:bg-[var(--outer-space)] active:scale-95 border-none rounded-none px-6 py-4 transition-all duration-300 toggle-item first:rounded-l-[4px] last:rounded-r-[4px]"
      >
        中文
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

// Mobile Language Dropdown Component
function MobileLanguageDropdown({
  isDarkMode = false,
}: {
  isDarkMode?: boolean;
}) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-lang-dropdown")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleColor = isDarkMode ? "var(--midnight)" : "var(--mercury)";
  const inactiveTextColor = isDarkMode ? "var(--midnight)" : "var(--mercury)";
  const activeTextColor = isDarkMode ? "var(--mercury)" : "var(--midnight)";

  return (
    <div className="mobile-lang-dropdown relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-[4px] transition-all duration-300 text-p3 font-medium hover:bg-[var(--outer-space)]/20"
        style={{ color: toggleColor }}
      >
        {language}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: toggleColor }}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full right-0 mt-1 rounded-[4px] shadow-[0_0_0_1px_var(--dawn)] overflow-hidden z-50 min-w-[60px]"
        >
          <button
            onClick={() => {
              setLanguage("EN");
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left text-p3 font-medium transition-all duration-300 hover:bg-[var(--outer-space)] ${
              language === "EN" ? "bg-[var(--dawn)]" : "bg-[var(--mercury)]/8"
            }`}
            style={{
              color: language === "EN" ? activeTextColor : inactiveTextColor,
            }}
          >
            EN
          </button>
          <button
            onClick={() => {
              setLanguage("中文");
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left text-p3 font-medium transition-all duration-300 hover:bg-[var(--outer-space)] ${
              language === "中文" ? "bg-[var(--dawn)]" : "bg-[var(--mercury)]/8"
            }`}
            style={{
              color: language === "中文" ? activeTextColor : inactiveTextColor,
            }}
          >
            中文
          </button>
        </motion.div>
      )}
    </div>
  );
}

// Main Navigation Component
interface NavigationProps {
  isDarkMode?: boolean;
  className?: string;
  currentSection?: string;
}

export default React.forwardRef<HTMLElement, NavigationProps>(
  function Navigation(
    { isDarkMode = false, className = "", currentSection = "hero" },
    ref
  ) {
    const { t } = useLanguage();

    return (
      <nav
        ref={ref}
        className={`fixed top-0 left-0 z-50 w-screen ${
          isDarkMode ? "nav-dark" : "nav-light"
        } ${className}`}
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(5px)", // Safari support
          borderBottom: "0.5px solid var(--outer-space)",
        }}
      >
        {/* Max-width container for ultrawide support */}
        <div className="max-w-[2560px] mx-auto px-6 md:px-12 lg:px-[100px] py-[12px]">
          <div className="relative flex items-center">
            {/* Logo - Fixed Left */}
            <div className="flex items-center">
              <a href="/">
                <Image
                  src="/logo.svg"
                  alt="Alveria Capital"
                  width={200}
                  height={100}
                  className="h-25 w-auto transition-all duration-300 logo cursor-pointer"
                />
              </a>
            </div>

            {/* Desktop Navigation Menu - Centered (hidden on all screens except XL) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden xl:block">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-8">
                  <NavigationMenuItem>
                    <AnimatedNavLink
                      className="text-p3 font-medium transition-colors"
                      href="/who-we-are"
                      isDarkMode={isDarkMode}
                    >
                      {t("nav.whoWeAre")}
                    </AnimatedNavLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <AnimatedNavLink
                      className="text-p3 font-medium transition-colors"
                      href="/what-we-do"
                      isDarkMode={isDarkMode}
                    >
                      {t("nav.whatWeDo")}
                    </AnimatedNavLink>
                  </NavigationMenuItem>

                  {/* <NavigationMenuItem>
                  <AnimatedNavLink 
                    className="text-p3 font-medium transition-colors" 
                    href="/news"
                    isDarkMode={isDarkMode}
                  >
                    {t("nav.news")}
                  </AnimatedNavLink>
                </NavigationMenuItem> */}

                  <NavigationMenuItem>
                    <AnimatedNavLink
                      className="text-p3 font-medium transition-colors"
                      href="/careers"
                      isDarkMode={isDarkMode}
                    >
                      {t("nav.careers")}
                    </AnimatedNavLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <AnimatedNavLink
                      className="text-p3 font-medium transition-colors"
                      href="/contact"
                      isDarkMode={isDarkMode}
                    >
                      {t("nav.contact")}
                    </AnimatedNavLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Login Button - Fixed Right (hidden on all screens except XL) */}
            <div className="ml-auto hidden xl:flex items-center gap-6">
              <LanguageToggle isDarkMode={isDarkMode} />
              <Button className="btn-investor shadow-[0_0_0_1px_var(--dawn)]">
                <LogIn className="h-4 w-4" />
                {t("nav.investorLogin")}
              </Button>
            </div>

            {/* Mobile/Tablet/Desktop Menu Button - Far Right (visible on all screens except XL) */}
            <div className="ml-auto xl:hidden flex items-center gap-3">
              <MobileLanguageDropdown isDarkMode={isDarkMode} />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-none">
                    <Menu
                      className="h-6 w-6 transition-colors duration-300"
                      style={{
                        color: isDarkMode
                          ? "var(--midnight)"
                          : "var(--mercury)",
                      }}
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-[var(--outer-space)] rounded-none border-none [&>button]:text-[var(--mercury)] [&>button]:hover:text-[var(--dawn)] [&>button]:p-4 [&>button]:m-2"
                >
                  <div className="flex flex-col space-y-8 mt-12 px-6">
                    <a
                      href="/who-we-are"
                      className="text-p3 font-medium transition-colors px-4 py-4 hover:bg-[var(--outer-space)]/20 rounded-[4px]"
                      style={{ color: "var(--mercury)" }}
                    >
                      {t("nav.whoWeAre")}
                    </a>

                    <a
                      href="/what-we-do"
                      className="text-p3 font-medium transition-colors px-4 py-4 hover:bg-[var(--outer-space)]/20 rounded-[4px]"
                      style={{ color: "var(--mercury)" }}
                    >
                      {t("nav.whatWeDo")}
                    </a>

                    <a
                      href="/news"
                      className="text-p3 font-medium transition-colors px-4 py-4 hover:bg-[var(--outer-space)]/20 rounded-[4px]"
                      style={{ color: "var(--mercury)" }}
                    >
                      {t("nav.news")}
                    </a>

                    <a
                      href="/careers"
                      className="text-p3 font-medium transition-colors px-4 py-4 hover:bg-[var(--outer-space)]/20 rounded-[4px]"
                      style={{ color: "var(--mercury)" }}
                    >
                      {t("nav.careers")}
                    </a>

                    <a
                      href="/contact"
                      className="text-p3 font-medium transition-colors px-4 py-4 hover:bg-[var(--outer-space)]/20 rounded-[4px]"
                      style={{ color: "var(--mercury)" }}
                    >
                      {t("nav.contact")}
                    </a>

                    {/* Login Button inside Mobile Menu */}
                    <div className="border-t border-[var(--dawn)]/20 pt-8 mt-8">
                      <Button className="btn-investor w-full shadow-[0_0_0_1px_var(--dawn)] py-6 text-p3 font-semibold">
                        <LogIn className="h-5 w-5" />
                        {t("nav.investorLogin")}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    );
  }
);
