import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export interface Tag {
  text: string;
  color?: string;
  backgroundColor?: string;
}

export interface FlexibleCardProps {
  title: string;
  titleColor?: string;
  subtitle?: string;
  subtitleColor?: string;
  description?: string;
  descriptionColor?: string;
  tags?: Tag[];
  link?: {
    text: string;
    url: string;
    color?: string;
    showArrow?: boolean;
  };
  backgroundColor?: string;
  hoverEffect?: boolean;
  padding?: string;
  rounded?: string;
  shadow?: string;
  delay?: number;
  className?: string;
  index?: number;
}

const FlexibleCard: React.FC<FlexibleCardProps> = ({
  title,
  titleColor = "var(--midnight)",
  subtitle,
  subtitleColor = "var(--dawn)",
  description,
  descriptionColor = "var(--outer-space)",
  tags,
  link,
  backgroundColor = "white",
  hoverEffect = false,
  padding = "p-6",
  rounded = "rounded-[4px]",
  shadow = "",
  delay = 0,
  className = "",
  index = 0,
}) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay || index * 0.1 }}
      className={`${padding} ${rounded} ${shadow} ${className} transition-all duration-200`}
      style={{ backgroundColor }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0 },
            }
          : {
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0 },
            }
      }
    >
      {/* Title */}
      <h3 className="text-h1 text-left mb-2" style={{ color: titleColor }}>
        {title}
      </h3>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-p2 text-left mb-4" style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-p2 px-3 py-1 rounded-full"
              style={{
                backgroundColor: tag.backgroundColor || "var(--submarine)",
                color: tag.color || "var(--midnight)",
              }}
            >
              {tag.text}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-p4 text-left" style={{ color: descriptionColor }}>
          {description}
        </p>
      )}

      {/* Link */}
      {link && (
        <div className="mt-4">
          <a
            href={link.url}
            className="text-p3 font-medium inline-flex items-center"
            style={{ color: link.color || "var(--sherpa-blue)" }}
          >
            {link.text}
            {link.showArrow && (
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            )}
          </a>
        </div>
      )}
    </motion.div>
  );
};

export default FlexibleCard;
