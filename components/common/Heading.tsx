import React from "react";

interface HeadingProps {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const sizeClasses = {
  sm: "text-lg font-semibold tracking-tight",
  md: "text-xl sm:text-2xl font-semibold tracking-tight",
  lg: "text-2xl sm:text-3xl font-bold tracking-tight",
  xl: "text-3xl sm:text-4xl font-bold tracking-tight",
  "2xl": "text-4xl sm:text-5xl font-bold tracking-tight",
  "3xl": "text-5xl sm:text-6xl font-extrabold tracking-tight",
  "4xl": "text-6xl sm:text-7xl font-extrabold tracking-tight",
  "5xl": "text-7xl sm:text-8xl font-extrabold tracking-tight",
};

export const Heading: React.FC<HeadingProps> = ({
  level = "h2",
  children,
  className = "",
  size,
}) => {
  const Tag = level;
  
  // Default sizes based on heading level if size is not specified
  const defaultSizeMap: Record<string, keyof typeof sizeClasses> = {
    h1: "2xl",
    h2: "xl",
    h3: "lg",
    h4: "md",
    h5: "sm",
    h6: "sm",
  };

  const selectedSize = size || defaultSizeMap[level];
  const sizeClass = sizeClasses[selectedSize];

  return (
    <Tag className={`font-heading text-[#334180] ${sizeClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
