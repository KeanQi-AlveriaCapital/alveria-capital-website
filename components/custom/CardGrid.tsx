import React from "react";
import { motion } from "framer-motion";
import FlexibleCard, { FlexibleCardProps } from "./FlexibleCard";
import { useLanguage } from "@/context/LanguageContext";

interface CardGridProps {
  title?: string;
  titleColor?: string;
  cards: FlexibleCardProps[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  className?: string;
}

const CardGrid: React.FC<CardGridProps> = ({
  title,
  titleColor = "var(--midnight)",
  cards,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  gap = "gap-6",
  className = "",
}) => {
  const { t } = useLanguage();

  // Determine grid columns based on provided settings
  const getGridColumns = () => {
    const mobile = columns.mobile || 1;
    const tablet = columns.tablet || 2;
    const desktop = columns.desktop || 3;

    return `grid-cols-${mobile} md:grid-cols-${tablet} lg:grid-cols-${desktop}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full ${className}`}
    >
      {title && (
        <h2 className="text-h3 text-left mb-8" style={{ color: titleColor }}>
          {t(title)}
        </h2>
      )}

      <div className={`grid ${getGridColumns()} ${gap}`}>
        {cards.map((card, index) => (
          <FlexibleCard key={index} {...card} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default CardGrid;
