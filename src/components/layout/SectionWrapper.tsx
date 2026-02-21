import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <div className={`max-w-[1400px] mx-auto px-8 ${className}`}>
      {children}
    </div>
  );
}
