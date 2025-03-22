
"use client";
import CustomButton from "@/components/shared/custom-btn";
import CustomInput from "@/components/shared/custom-Input";
import { Card } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CustomDropdown from "@/components/shared/custom-dropdown";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";
export default function Planner() {
    type Meal = {
        id: number;
        dish: string;
        mealType: string;
        groceries?: GroceryItem[]; // Add groceries field
      };
    
      type GroceryItem = {
        name: string;
        amount: number;
        unit: string;
        totalPrice: number;
      };
    
      // type MealsByDay = {
      //   [key: string]: { id: number; dish: string; mealType: string }[];
      // };
    
      const [familyMembers, setFamilyMembers] = useState("");
      const [showGroceryPlan, setShowGroceryPlan] = useState(false);
      const [groceryData, setGroceryData] = useState<Record<string, Meal[]>>({});
      const [weeklyMeals, setWeeklyMeals] = useState<Record<string, Meal[]>>({
        Monday: [{ id: 1, dish: "", mealType: "", groceries: [] }],
        Tuesday: [{ id: 1, dish: "", mealType: "", groceries: [] }],
        Wednesday: [{ id: 1, dish: "", mealType: "", groceries: [] }],
        Thursday: [{ id: 1, dish: "", mealType: "", groceries: [] }],
        Friday: [{ id: 1, dish: "", mealType: "", groceries: [] }],
        Saturday: [{ id: 1, dish: "", mealType: "", groceries: [] }],
        Sunday: [{ id: 1, dish: "", mealType: "", groceries: [] }],
      });
    
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
    
      const mealOptions = [
        { label: "Breakfast", value: "breakfast" },
        { label: "Lunch", value: "lunch" },
        { label: "Dinner", value: "dinner" },
      ];
    
      const groceryDatabase: Record<
        string,
        { name: string; baseAmount: number; unit: string; pricePerUnit: number }[]
      > = {
        Biryani: [
          { name: "Rice", baseAmount: 0.5, unit: "KG", pricePerUnit: 200 }, // 0.5 KG per person
          { name: "Chicken", baseAmount: 0.3, unit: "KG", pricePerUnit: 450 }, // 0.3 KG per person
          { name: "Masala", baseAmount: 1, unit: "Packet", pricePerUnit: 100 }, // 1 Packet per meal
        ],
        Pasta: [
          { name: "Pasta", baseAmount: 0.2, unit: "KG", pricePerUnit: 150 },
          { name: "Cheese", baseAmount: 0.1, unit: "KG", pricePerUnit: 500 },
          { name: "Sauce", baseAmount: 1, unit: "Bottle", pricePerUnit: 250 },
        ],
      };
    
    
    
    const handleGenerateGroceryPlan = () => {
      setGroceryData(weeklyMeals)
      setShowGroceryPlan(true);
    };
    
      const handleAddMeal = (day: string) => {
        if (weeklyMeals[day].length >= 4) return;
        setWeeklyMeals((prev) => ({
          ...prev,
          [day]: [
            ...prev[day],
            { id: prev[day].length + 1, dish: "", mealType: "" },
          ],
        }));
      };
    
      // const handleDishChange = (day: string, id: number, value: string) => {
      //   setWeeklyMeals((prev) => ({
      //     ...prev,
      //     [day]: prev[day].map((meal) =>
      //       meal.id === id ? { ...meal, dish: value } : meal
      //     ),
      //   }));
      // };
    
      const handleDishChange = (day: string, id: number, value: string) => {
        setWeeklyMeals((prev) => ({
          ...prev,
          [day]: prev[day].map((meal) =>
            meal.id === id
              ? { ...meal, dish: value, groceries: calculateGroceries(value) }
              : meal
          ),
        }));
      };
      
    
      const calculateGroceries = (dish: string) => {
        const familySize = Number(familyMembers) || 1; // Default to 1 if not set
        if (!groceryDatabase[dish]) return [];
    
        return groceryDatabase[dish].map((item) => ({
          name: item.name,
          amount: item.baseAmount * familySize, // Adjust based on family size
          unit: item.unit,
          totalPrice: item.baseAmount * familySize * item.pricePerUnit, // Calculate price
        }));
      };
    
      const handleMealTypeChange = (day: string, id: number, value: string) => {
        setWeeklyMeals((prev) => ({
          ...prev,
          [day]: prev[day].map((meal) =>
            meal.id === id ? { ...meal, mealType: value } : meal
          ),
        }));
      };
      const handleDishDelete = (day: string, id: number) => {
        if (weeklyMeals[day].length > 1) {
          setWeeklyMeals((prev) => ({
            ...prev,
            [day]: prev[day].filter((meal) => meal.id !== id),
          }));
        }
      };
    
      const handleSubmit = () => {
        const payload = {
          familyMembers: Number(familyMembers),
          meals: weeklyMeals,
        };
    
        console.log("Submitting:", payload);
    
        fetch("/api/submit-meal-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => console.log("Response:", data))
          .catch((err) => console.error("Error:", err));
      };
    
      return (
        <div>
          <h3 style={{ fontSize: "20px" }}>Set Up Your Weekly Meals</h3>
          <hr className="my-3 text-gray-100"></hr>
    
          <div className="flex flex-col gap-3 w-100 mt-6">
            <div className="flex flex-col">
              <p className="text-base text-gray-500">Family Members </p>
              <p style={{ fontSize: "12px" }} className="text-gray-300">
                The number of people you are planning meals for
              </p>
            </div>
    
            <CustomInput
              type="number"
              placeholder="e.g. 2, 3, 4"
              value={familyMembers}
              onChange={(e) => setFamilyMembers(e.target.value)}
            />
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg xl:grid-cols-3 gap-4">
            {daysOfWeek.map((day) => (
              <Card key={day} className="mt-6 p-4 w-full">
                <div className="text-2xl text-slate-800">{day}</div>
    
                <div className="mt-2 mb-1">
                  {/* <p className="text-base text-gray-500">Dish</p>
                  <p className="text-xs text-gray-300">
                    Write the dish name and specify when you’ll have it
                  </p> */}
                </div>
    
                <div className="gap-3 flex flex-col">
                  {weeklyMeals[day].map((meal, index) => (
                    <div key={meal.id} className="flex gap-2 mt-2">
                      <CustomInput
                        type="text"
                        placeholder="Dish Name, e.g. Biryani"
                        value={meal.dish}
                        onChange={(e) =>
                          handleDishChange(day, meal.id, e.target.value)
                        }
                      />
    
                      <CustomDropdown
                        label="Meal Type"
                        options={mealOptions}
                        value={meal.mealType}
                        onChange={(e) =>
                          handleMealTypeChange(day, meal.id, String(e))
                        }
                      />
    
                      {index > 0 && (
                        <button
                          onClick={() => handleDishDelete(day, meal.id)}
                          className="cursor-pointer text-red-500"
                        >
                          <HighlightOffIcon />
                        </button>
                      )}
                    </div>
                  ))}
    
                  <CustomButton
                    label="Add Another Dish"
                    className="w-50"
                    icon={AddIcon}
                    onClick={() => handleAddMeal(day)}
                  />
                </div>
              </Card>
            ))}
          </div>
    
          <div className="flex mt-6">
            <CustomButton
              label="Calculate & Generate Grocery Plan"
              className="bg-black text-white px-2 py-2 hover:text-black"
              icon={DoneIcon}
              onClick={handleGenerateGroceryPlan}
            />
          </div>
    
          {/* Grocery Plan Summary */}
    
          {showGroceryPlan && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Grocery Plan</h2>
              <table className="w-full mt-3 border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Day</th>
                    <th className="p-2 border">Dish</th>
                    <th className="p-2 border">Item</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(groceryData).map((day) => {
                    const mealsForDay = groceryData[day].filter(
                      (meal) => meal.groceries?.length
                    );
                    const dayTotal = mealsForDay.reduce(
                      (acc, meal) =>
                        acc +
                        (meal.groceries?.reduce(
                          (sum, item) => sum + item.totalPrice,
                          0
                        ) || 0),
                      0
                    );
    
                    return mealsForDay.length > 0 ? (
                      <React.Fragment key={day}>
                        {/* Day Header Row */}
                        <tr className="bg-gray-200">
                          <td
                            colSpan={5}
                            className="p-3 border text-lg font-semibold"
                          >
                            {day}
                          </td>
                        </tr>
    
                        {mealsForDay.map((meal) =>
                          meal.groceries?.length ? (
                            <React.Fragment key={`${day}-${meal.id}`}>
                              {/* Dish Header Row */}
                              <tr className="bg-gray-100">
                                <td colSpan={5} className="p-2 border font-medium">
                                  {meal.dish || "No Dish Selected"}
                                </td>
                              </tr>
    
                              {/* Grocery Items */}
                              {meal.groceries.map((item, index) => (
                                <tr
                                  key={`${day}-${meal.id}-${index}`}
                                  className="border"
                                >
                                  <td className="p-2"></td>{" "}
                                  {/* Empty cell for alignment */}
                                  <td className="p-2"></td>{" "}
                                  {/* Empty cell for alignment */}
                                  <td className="p-2">{item.name}</td>
                                  <td className="p-2">
                                    {item.amount} {item.unit}
                                  </td>
                                  <td className="p-2">Rs. {item.totalPrice}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ) : null
                        )}
    
                        {/* Day Total Row */}
                        <tr className="bg-gray-200 font-semibold">
                          <td colSpan={4} className="p-2 border">
                            Total for {day}
                          </td>
                          <td className="p-2 border">Rs. {dayTotal.toFixed(2)}</td>
                        </tr>
                      </React.Fragment>
                    ) : null;
                  })}
    
                  {/* Grand Total Row */}
                  <tr className="bg-green-200 font-semibold">
                    <td colSpan={4} className="p-3 border text-lg">
                      Grand Total
                    </td>
                    <td className="p-3 border text-lg">
                      Rs.{" "}
                      {Object.keys(groceryData)
                        .reduce(
                          (acc, day) =>
                            acc +
                            groceryData[day].reduce(
                              (daySum, meal) =>
                                daySum +
                                (meal.groceries?.reduce(
                                  (sum, item) => sum + item.totalPrice,
                                  0
                                ) || 0),
                              0
                            ),
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
    
          {showGroceryPlan && (
            <div className="flex flex-row justify-center">
              <CustomButton
                label="Submit Plan"
                className="mt-4 w-50 text-center "
                icon={DoneIcon}
                onClick={handleSubmit}
              />
            </div>
          )}
        </div>
      );
}