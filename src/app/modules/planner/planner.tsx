"use client";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/shared/custom-btn";
import CustomInput from "@/components/shared/custom-Input";
import { Card, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomDropdown from "@/components/shared/custom-dropdown";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";

import { dishes } from "@/app/data/dishes";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { generatePDF } from "@/app/utils/pdf-generate";
import { useLoading } from "@/app/services/loading-service";
export default function Planner() {

  const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  type Meal = {
    id: number;
    dish: string;
    mealType: string;
    isRecurring?: boolean;
    groceries?: GroceryItem[]; // Add groceries field
  };

  type GroceryItem = {
    name: string;
    qty: number;
    unit: string;
    amountPerUnit: number;
    totalPrice: number;
    isMonthlyStaple?: boolean;
    monthlyStapleToggle?: boolean;
  };

  // type MealsByDay = {
  //   [key: string]: { id: number; dish: string; mealType: string }[];
  // };



  const router = useRouter();
  const [sentEmail, setSentEmail] = useState("");
  const [emailSentError, setEmailSentError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
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

  const [activeStep, setActiveStep] = useState(0);
  const [isLoadingGroceryPlan, setIsLoadingGroceryPlan] = useState(false);
  const loader = useLoading();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const planDuration = [
    { label: "Current month", value: "1" },
    { label: "Next 2 months", value: "2" },
    { label: "Next 3 months", value: "3" },
  ]
  const [selectedDuration, setSelectedDuration] = useState("1");

  const mealOptions = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
  ];

  const steps = ["Plan", "Review" , "Confirmation"];

  const getIngredientsForDish = (dishName: string) => {
    const found = dishes.find(
      (d) => d.dish.toLowerCase() === dishName.toLowerCase()
    );
    return found?.ingredients || [];
  };

  const dishOptions = dishes.map((dish) => ({
    label: dish.dish,
    value: dish.dish,
  }));

  useEffect(() => {
    loader.setLoading(false);
  })

  const handleGenerateGroceryPlan = () => {
    setGroceryData(weeklyMeals);
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

  const handleFamilySizeChange = (value: string) => {
    setFamilyMembers(value);

    const newFamilySize = Number(value) || 1;

    setWeeklyMeals((prev) => {
      const updated = { ...prev };

      for (const day in updated) {
        updated[day] = updated[day].map((meal) => ({
          ...meal,
          groceries: calculateGroceries(meal.dish, newFamilySize),
        }));
      }

      return updated;
    });
  };

  // const handleRecurringToggle = (day: string, id: number) => {
  //   setWeeklyMeals((prev) => ({
  //     ...prev,
  //     [day]: prev[day].map((meal) => {
  //       if (meal.id !== id) return meal;

  //       const updatedRecurring = !meal.isRecurring;
  //       const familySize = Number(familyMembers) || 1;

  //       return {
  //         ...meal,
  //         isRecurring: updatedRecurring,
  //         groceries: calculateGroceries(
  //           meal.dish,
  //           familySize,
  //           updatedRecurring
  //         ),
  //       };
  //     }),
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

  // const handleMonthlyStapleToggle = (
  //   day: string,
  //   mealId: number,
  //   itemName: string
  // ) => {
  //   setGroceryData((prev) => {
  //     const updated = { ...prev };

  //     updated[day] = updated[day].map((meal) => {
  //       if (meal.id !== mealId) return meal;

  //       const updatedGroceries = meal.groceries?.map((item) =>
  //         item.name === itemName && item.isMonthlyStaple
  //           ? {
  //               ...item,
  //               monthlyStapleToggle: !item.monthlyStapleToggle,
  //             }
  //           : item
  //       );

  //       return { ...meal, groceries: updatedGroceries };
  //     });

  //     return updated;
  //   });
  // };

  const calculateGroceries = (
    dish: string,
    familySize = Number(familyMembers) || 1,
    isRecurring = false
  ) => {
    const ingredients = getIngredientsForDish(dish);
    if (!ingredients.length) return [];

    return ingredients.map((item) => ({
      name: item.name,
      qty: item.baseQuantity * familySize, // Adjust based on family size
      unit: item.unit,
      amountPerUnit: item.pricePerUnit,
      totalPrice: item.pricePerUnit * familySize, // Calculate price
      isRecurring,
      isMonthlyStaple: item.isMonthlyStaple || false,
      monthlyStapleToggle: item.isMonthlyStaple || false,
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

  const handleSubmit = async () => {
    const payload = {
      date: Date.now(),
      familyMembers: Number(familyMembers),
      meals: weeklyMeals,
    };
    localStorage.setItem("mealPlanData", JSON.stringify(payload));
    console.log("Submitting:", payload);

    const email = "addyj79@yahoo.com";
    setSentEmail(email);

    const blob = await generatePDF("pdf-content");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;

      const result = await fetch("/api/send-email-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          filename: "grocery-summary.pdf",
          pdfData: base64Data,
        }),
      });

      if (result.ok) {
        setOpenSnackbar(true);
        setTimeout(() =>  
         {
          setIsLoadingGroceryPlan(false);
         }, 1000);
      }
      else {
        console.error("Error sending email:", result.statusText);
        setIsLoadingGroceryPlan(false);
        setEmailSentError(true);
    
      }
    };

    reader.readAsDataURL(blob);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      setShowGroceryPlan(false);
      setActiveStep(1);
      setIsLoadingGroceryPlan(true);
  
      handleGenerateGroceryPlan();
  
      setTimeout(() => {
        setIsLoadingGroceryPlan(false);
        setShowGroceryPlan(true);
      }, 3500);
      return;
    } else if (activeStep === 1) {
      setActiveStep(2);
      setIsLoadingGroceryPlan(true);
      handleSubmit();
      return;
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="p-2 max-sm:mb-16">
      <div className="flex items-center gap-2 rounded-md w-fit">
        {steps.map((label, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center gap-1">
              <div
                className={`rounded-full w-6 h-6 flex items-center justify-center border px-2 py-[2px] text-sm ${
                  activeStep === index
                    ? "border-blue-500 text-blue-500 font-semibold"
                    : "border-gray-400 text-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm ${
                  activeStep === index
                    ? "text-blue-500 font-medium"
                    : "text-gray-300"
                }`}
              >
                {label}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <span className="mx-2 text-gray-400 text-sm">{"»"}</span>
            )}
          </div>
        ))}
      </div>

      {activeStep === 0 && (
        <>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Set Up Your Weekly Meals</h3>

            <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 max-sm:flex max-sm:flex-col">
              <div className="flex flex-col gap-3 w-100 mt-6">
                <div className="flex flex-col">
                  <p className="text-base text-gray-600">
                    Select your meal plan duration
                  </p>
                  <p className="text-xs text-gray-400">
                    the timeframe over which you want to plan your meals
                  </p>
                </div>
                <CustomDropdown
                  label="Select your meal plan duration"
                  options={planDuration}
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(String(e))}
                />
              </div>

              <div className="flex flex-col gap-3 w-100 mt-6">
                <div className="flex flex-col">
                  <p className="text-base text-gray-600">Family Members</p>
                  <p className="text-xs text-gray-400">
                    The number of people you are planning meals for
                  </p>
                </div>
                <CustomInput
                  type="number"
                  placeholder="e.g. 2, 3, 4"
                  value={familyMembers}
                  onChange={(e) => handleFamilySizeChange(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-sm:w-100">
              {daysOfWeek.map((day) => (
                <Card
                  key={day}
                  className="mt-6 p-4 w-full"
                  sx={{ width: { xs: "calc(100vw - 12%)", sm: "100%" } }}
                >
                  <div className="text-2xl max-sm:text-lg text-slate-800 mb-2">
                    {day}
                  </div>
                  <div className="gap-3 flex flex-col">
                    {weeklyMeals[day].map((meal, index) => (
                      <div key={meal.id} className="flex gap-2 mt-2">
                        {/* <CustomInput
                          type="text"
                          placeholder="Dish Name, e.g. Biryani"
                          value={meal.dish}
                          onChange={(e) =>
                            handleDishChange(day, meal.id, e.target.value)
                          }
                        /> */}

                        <CustomDropdown
                          width={isMobile ? "140px" : "160px"}
                          label="Select Dish"
                          options={dishOptions}
                          value={meal.dish}
                          onChange={(e) =>
                            handleDishChange(day, meal.id, String(e))
                          }
                        />

                        <CustomDropdown
                          label="Meal Type"
                          width={isMobile ? "125px" : "150px"}
                          options={mealOptions}
                          value={meal.mealType}
                          onChange={(e) =>
                            handleMealTypeChange(day, meal.id, String(e))
                          }
                        />

                        {/* <button
                          className={`flex border-1 transition border-solid rounded-xl p-1 border-gray-200 text-sm items-center px-3 gap-1
                              hover:bg-gray-100 hover:border-gray-300
                               cursor-pointer ${
                                 meal.isRecurring
                                   ? "bg-gray-200 border-gray-300"
                                   : ""
                               } `}
                          onClick={() => handleRecurringToggle(day, meal.id)}
                        >
                          {meal.isRecurring && <CheckIcon />}
                          Every week
                        </button> */}

                        {index > 0 && (
                          <button
                            onClick={() => handleDishDelete(day, meal.id)}
                            className="text-red-500"
                          >
                            <HighlightOffIcon />
                          </button>
                        )}
                      </div>
                    ))}
                    <CustomButton
                      label="Add Another Dish"
                      className={isMobile ? "w-40" : "w-50"}
                      icon={AddIcon}
                      onClick={() => handleAddMeal(day)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {activeStep === 1 && (
        <>
          {isLoadingGroceryPlan ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500 mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">
                  Generating your grocery plan...
                </p>
              </div>
            </div>
          ) : (
            showGroceryPlan && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold">
                  Grocery Plan{" "}
                  <span className="text-gray-500 text-sm italic">
                    for {familyMembers || 1} serving&apos;s
                  </span>
                  <span className="text-base ml-2 text-gray-600">
                    {" "}
                    (
                    {
                      planDuration.find((res) => res.value === selectedDuration)
                        ?.label
                    }
                    )
                  </span>
                </h2>

                <div
                  id="pdf-content"
                  className={activeStep !== 1 ? "hidden" : ""}
                  style={{ color: "black" }}
                >
                  <table className="w-full mt-3 border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left max-sm:text-sm">Day</th>
                        <th className="p-2 text-left max-sm:text-sm">Item</th>
                        <th className="p-2 text-left max-sm:text-sm">Qty</th>
                        <th className="p-2 text-left max-sm:text-sm">
                          Total Price
                        </th>
                        <th className="p-2 text-left max-sm:text-sm">
                          Price Per Month
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(groceryData).flatMap((day) => {
                        return groceryData[day]
                          .filter((meal) => meal.groceries?.length)
                          .map((meal) => {
                            const isRecurring = meal.isRecurring ?? true; // assume true if disabled

                            const weeklyItems = meal.groceries?.filter(
                              (i) =>
                                !i.isMonthlyStaple || !i.monthlyStapleToggle
                            );
                            const monthlyItems =
                              meal.groceries?.filter(
                                (i) =>
                                  i.isMonthlyStaple && i.monthlyStapleToggle
                              ) || [];

                            const weeklyTotal =
                              weeklyItems?.reduce(
                                (sum, item) => sum + item.totalPrice,
                                0
                              ) || 0;
                            const monthlyTotal =
                              monthlyItems?.reduce(
                                (sum, item) =>
                                  sum + item.totalPrice * (isRecurring ? 4 : 1),
                                0
                              ) || 0;

                            const dishTotal = weeklyTotal + monthlyTotal;

                            return (
                              <React.Fragment key={`${day}-${meal.id}`}>
                                <tr className="bg-gray-200">
                                  <td
                                    colSpan={5}
                                    className="p-3 font-semibold text-lg max-sm:text-sm"
                                  >
                                    {meal.dish || "No Dish Selected"} –{" "}
                                    {meal.mealType}
                                    <span className="px-3 ml-2 text-sm rounded-xl border-emerald-200 border-1 bg-emerald-50 text-emerald-600">
                                      {day}
                                    </span>
                                  </td>
                                </tr>

                                {weeklyItems && weeklyItems?.length > 0 && (
                                  <>
                                    <tr className="bg-gray-100 text-sm text-gray-700">
                                      <td
                                        colSpan={5}
                                        className="p-2 font-medium max-sm:text-xs"
                                      >
                                        Items to be delivered every {day}
                                      </td>
                                    </tr>
                                    {weeklyItems.map((item, idx) => (
                                      <tr key={`w-${meal.id}-${idx}`}>
                                        <td className="p-2 max-sm:text-xs"></td>
                                        <td className="p-2 max-sm:text-xs">
                                          {item.name}
                                        </td>
                                        <td className="p-2 max-sm:text-xs">
                                          {item.qty.toFixed(2)} {item.unit}
                                        </td>
                                        <td className="p-2 max-sm:text-xs">
                                          Rs. {item.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="p-2 max-sm:text-xs">
                                          –
                                        </td>
                                      </tr>
                                    ))}
                                  </>
                                )}

                                {monthlyItems?.length > 0 && (
                                  <>
                                    <tr className="bg-gray-100 text-sm text-gray-700">
                                      <td
                                        colSpan={5}
                                        className="p-2 font-medium max-sm:text-xs"
                                      >
                                        Items to be delivered on 1st {day} of
                                        each month
                                      </td>
                                    </tr>
                                    {monthlyItems.map((item, idx) => (
                                      <tr key={`m-${meal.id}-${idx}`}>
                                        <td className="p-2 max-sm:text-xs"></td>
                                        <td className="p-2 max-sm:text-xs">
                                          {item.name}
                                        </td>
                                        <td className="p-2 max-sm:text-xs">
                                          {(
                                            item.qty * (isRecurring ? 4 : 1)
                                          ).toFixed(2)}{" "}
                                          {item.unit}
                                        </td>
                                        <td className="p-2 max-sm:text-xs">
                                          -
                                        </td>
                                        <td className="p-2 max-sm:text-xs">
                                          Rs.{" "}
                                          {(
                                            item.totalPrice *
                                            (isRecurring ? 4 : 1)
                                          ).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}
                                  </>
                                )}
                                <tr className="bg-gray-100 font-semibold border-gray-400 max-sm:text-sm">
                                  <td colSpan={4} className="p-2 underline">
                                    Total for {meal.dish}
                                  </td>
                                  <td className="p-2 text-lg max-sm:text-sm">
                                    Rs. {dishTotal.toFixed(2)}
                                    {/* {monthlyTotal > 0 && (
                                    <div className="text-xs text-emerald-600">
                                      + Monthly: Rs. {monthlyTotal.toFixed(2)}
                                    </div>
                                  )} */}
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          });
                      })}

                      {/* Grand total row */}
                      <tr className="font-semibold border-t border-gray-400">
                        <td
                          colSpan={4}
                          className="p-3 text-lg max-sm:text-base"
                        >
                          Estimated Grand Total
                        </td>
                        <td className="p-3 text-lg max-sm:text-base">
                          {(() => {
                            let total = 0;
                            Object.values(groceryData).forEach((meals) => {
                              meals.forEach((meal) => {
                                if (!meal.groceries) return;
                                const isRecurring = meal.isRecurring ?? true;
                                meal.groceries.forEach((item) => {
                                  if (
                                    item.isMonthlyStaple &&
                                    item.monthlyStapleToggle
                                  ) {
                                    total +=
                                      item.totalPrice * (isRecurring ? 4 : 1);
                                  } else {
                                    total += item.totalPrice;
                                  }
                                });
                              });
                            });
                            return `Rs. ${total.toFixed(2)}`;
                          })()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <div className="flex justify-center mt-4">
          <CustomButton
            label="Submit Plan"
            className="mt-4 w-50 text-center"
            icon={DoneIcon}
            onClick={handleSubmit}
          />
        </div> */}
              </div>
            )
          )}
        </>
      )}

      {activeStep === 2 && (
        <div className="text-center mt-10">
          {isLoadingGroceryPlan ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500 mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">
                  Submitting the plan & generating invoice...
                </p>
              </div>
            </div>
          ) : emailSentError ? (
            <>
              <h2 className="text-xl font-semibold mb-2 text-red-600">
                Failed to send invoice 😓
              </h2>
              <p className="text-gray-500">Please try again later.</p>
              <div className="flex justify-center mt-6">
                <CustomButton
                  label="Go to Dashboard"
                  className="bg-blue-700 text-white px-5"
                  onClick={() => router.push("/modules/main")}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mt-20 mb-2 text-green-600">
                Your invoice has been sent to{" "}
                <span className="font-bold">{sentEmail}</span>
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <CustomButton
                  label="Go to Dashboard"
                  className="bg-blue-700 text-white px-5"
                  onClick={() => router.push("/modules/main")}
                />
              </div>
            </>
          )}
        </div>
      )}

      {!isLoadingGroceryPlan && activeStep < 2 && (
        <div className="mt-6 min-sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-50">
          {activeStep > 0 ? (
            <CustomButton label="Back" className="px-3" onClick={handleBack} />
          ) : (
            <div />
          )}

          <CustomButton
            className="px-5 py-4 bg-blue-700 text-white"
            label={activeStep === steps.length - 2 ? "Submit" : "Generate Plan"}
            onClick={handleNext}
          />
        </div>
      )}

      {!isLoadingGroceryPlan && activeStep < 2 && (
        <div className="flex justify-between mt-6 max-sm:hidden">
          {activeStep > 0 && (
            <CustomButton label="Back" className="px-3" onClick={handleBack} />
          )}

          {/* <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button> */}

          <CustomButton
            className="px-5 py-4 bg-blue-700 text-white"
            label={activeStep === steps.length - 2 ? "Submit" : "Generate Plan"}
            onClick={handleNext}
          />
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your plan has been saved!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
