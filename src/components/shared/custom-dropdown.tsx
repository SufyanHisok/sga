"use client";
import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CustomDropdownProps {
  label?: string;
  options: { label: string; value: string | number }[]; // List of options
  value: string | number; // Selected value
  width?: string
  onChange: (value: string | number) => void; // Function to update value
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, options, value, onChange, width }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedValue?: string | number) => {
    setAnchorEl(null);
    if (selectedValue !== undefined) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        style={{ borderRadius: "8px", border: "1px solid #d1d5dc", color: "rgba(0, 0, 0, 0.87)", fontWeight: 400, width: width }}
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        className="text-left"
      >
        {options.find((opt) => opt.value === value)?.label || label || "Select"}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()} disablePortal disableScrollLock
      >
        {options.map((option) => (
          <MenuItem key={option.value} onClick={() => handleClose(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CustomDropdown;