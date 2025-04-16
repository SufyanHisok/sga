import React from "react";

interface CustomInputProps { 
  type?: string;
  className?: string;
  placeholder?: string;
  value?: string | number;  // Controlled input value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event handler
  width?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ type, className, placeholder, value, onChange, width }) => {
  return (


    <input
      style={{width: width || "200px"}}    
      type={type || "text"}
      className={`custom-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ring-0 focus:ring-2 focus:ring-gray-500 text-sm  ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // Handle changes
    />
  );
};

export default CustomInput;