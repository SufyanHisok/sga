"use client";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomDropdown from "@/components/shared/custom-dropdown";
import CustomButton from "@/components/shared/custom-btn";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

// type Meal = {
//     id: number;
//     dish: string;
//     mealType: string;
//     isRecurring?: boolean;
//     groceries?: GroceryItem[]; // Add groceries field
//   };

//   type GroceryItem = {
//     name: string;
//     qty: number;
//     unit: string;
//     amountPerUnit: number;
//     totalPrice: number;
//     isMonthlyStaple?: boolean;
//     monthlyStapleToggle?: boolean;
//   };

  type DropdownOption = { label: string; value: string };
interface MobileMealDialogProps {
  open: boolean;
  onClose: () => void;
  day: string;
  editingMeal?: {
    dish: string;
    mealType: string;
    groceryType:string;
  };
  dishOptions: DropdownOption[];
  mealOptions: DropdownOption[];
  groceryTypeOptions: DropdownOption[];
  onAdd: (dish: string, mealType: string, groceryType:string) => void;
}

export default function MobileMealDialog({
  open,
  onClose,
  day,
  dishOptions,
  mealOptions,
  groceryTypeOptions,
  onAdd,
  editingMeal
}: MobileMealDialogProps) {
    const [selectedDish, setSelectedDish] = useState("");
    const [selectedMealType, setSelectedMealType] = useState("");
    const [selectedGroceryType, setselectedGroceryType] = useState("raw");
    useEffect(() => {
        // check if editingMeal exists AND has values
        const isEdit = editingMeal && (editingMeal.dish || editingMeal.mealType || editingMeal.groceryType);
      
        if (isEdit) {
          setSelectedDish(editingMeal.dish);
          setSelectedMealType(editingMeal.mealType);
          setselectedGroceryType(editingMeal.groceryType);
        } else {
          setSelectedDish("");
          setSelectedMealType("");
          setselectedGroceryType("raw"); // ✅ fallback for new meals
        }
      }, [editingMeal, open]);
  
    const handleAdd = () => {
      if (selectedDish && selectedMealType && selectedGroceryType) {
        onAdd(selectedDish, selectedMealType, selectedGroceryType);
        setSelectedDish("");
        setSelectedMealType("");
        setselectedGroceryType("");
        onClose();
      }
    };
    
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen>
      <DialogTitle className="flex justify-between items-center px-4 pt-4">
        Add Meal for {day}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="px-4 flex flex-col gap-4 mt-2">

      

        <CustomDropdown
          width="100%"
          label="Select Dish"
          options={dishOptions}
          value={selectedDish}
          onChange={(e) => setSelectedDish(String(e))}
        />
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">Meal Type</p>
          <div className="flex flex-wrap gap-2 max-sm:justify-center">
            {mealOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedMealType(option.value)}
                className={`px-5 py-1 rounded-full border text-sm cursor-pointer
          ${
            selectedMealType === option.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">Grocery Type</p>
          <div className="flex flex-col w-45 gap-2 max-sm:justify-center">
            {groceryTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setselectedGroceryType(option.value)}
                className={`px-5 py-1 rounded-full border text-sm cursor-pointer
          ${
            selectedGroceryType === option.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
       
      </DialogContent>

      <DialogActions className="px-4 pb-6">
        <CustomButton
            icon={AddIcon}
          label="Add Dish"
          className="px-4 py-2 bg-blue-700 text-white"
          onClick={handleAdd}
        />
      </DialogActions>
    </Dialog>
  );
}