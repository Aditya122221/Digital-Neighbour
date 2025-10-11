import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CustomButtonProps {
  text: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  textColor?: 'white' | 'black';
  borderColor?: 'white' | 'black';
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("size-6", className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  href,
  className,
  onClick,
  textColor = 'black',
  borderColor = 'white',
}) => {
  const buttonContent = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-full border-2 bg-yellow px-4 py-2 transition-all duration-300 ease-out group-hover:border-[3px]",
        borderColor === "white" ? "border-white" : "border-black"
      )}
    >
      {/* Default 3D gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />

      {/* Enhanced 3D gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

      {/* Content */}
      <div
        className={cn(
          "relative flex items-center gap-3",
          textColor === "white" ? "text-white" : "text-black"
        )}
      >
        <span className="text-md transition-all duration-300 font-medium">
          {text}
        </span>

        {/* Arrow circle */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-all duration-300 group-hover:shadow-lg">
          <ArrowIcon className="text-yellow transition-transform duration-300 -rotate-45 group-hover:rotate-0 ease-out" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={cn('inline-block', className)}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn('inline-block', className)}
      type="button"
    >
      {buttonContent}
    </button>
  );
};

export default CustomButton;
