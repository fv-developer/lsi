import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  fillClassName?: string;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "solid";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
  fillClassName = "bg-[#334180]",
  type = "button",
  variant = "outline",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-semibold uppercase tracking-wider",
    md: "px-6 py-3 text-sm font-bold uppercase tracking-wider",
    lg: "px-8 py-4 text-base font-bold uppercase tracking-wider",
  };

  // Square button styling with hover fill effect
  const baseClasses =
    "relative inline-flex items-center justify-center rounded-none font-body transition-all duration-300 ease-out overflow-hidden group border-2 border-[#334180]";

  const variantClasses =
    variant === "outline"
      ? "bg-transparent text-[#334180] hover:text-white"
      : "bg-[#334180] text-white hover:bg-transparent hover:text-[#334180]";

  const content = (
    <>
      {/* Background fill animation layer */}
      <span className={`absolute inset-0 ${fillClassName} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-10`} />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;
