"use client";
import React from "react";
import { SvgIconComponent } from "@mui/icons-material"; // For MUI icons

interface CustomButtonProps {
  className?: string;
  label: string;
  onClick: () => void;
  icon?: SvgIconComponent; // Optional MUI icon
}

const CustomButton: React.FC<CustomButtonProps> = ({ className, label,  onClick, icon: Icon }) => {
  return (
    <button 
      onClick={onClick} 
      className={`flex border-1 border-solid rounded-xl p-1 border-gray-200 items-center gap-2 
        hover:bg-gray-100 hover:border-gray-300
        transition-all duration-300 cursor-pointer
        ${className}`}
    >
      {Icon && <Icon />} {/* Render icon only if provided */}
      {label}
    </button>
  );
};

export default CustomButton;