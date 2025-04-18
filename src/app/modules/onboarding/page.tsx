"use client";

import Image from "next/image";
import chefImage from '@/assets/images/chef.svg';
import { useState } from "react";
// import CustomInput from "@/components/shared/custom-Input";
import CheckIcon from '@mui/icons-material/Check';
import CustomButton from "@/components/shared/custom-btn";
import { useRouter } from "next/navigation";
import LogoIcon from '@/assets/icons/grocery-icon.png'; 

export default function OnboardingPage() {
  const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [kidsCount, setKidsCount] = useState<number | null>(null);
    const [adultsCount, setAdultsCount] = useState<number | null>(null);
    const [eldersCount, setEldersCount] = useState<number | null>(null);
    const allergyOptions = ["Dairy", "Gluten", "Peanuts", "Seafood", "Soy", "Wheat"];
    const cuisinesOptions = ["Italian", "Mexican", "Desi", "Chinese", "Vegetarian"];
    const budgetOptions = ["PKR 5,000 – 10,000", "PKR 10,000 – 20,000", "Above PKR 20,000", "Skip for now"];
    const countOptions = [0, 1, 2, 3, 4, 5];
    const totalSteps = 5;


    const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  
    const handleNext = () => {
      if (activeStep < totalSteps - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        const familyMembers = (kidsCount ?? 0) + (adultsCount ?? 0) + (eldersCount ?? 0)

        const user = localStorage.getItem('user');
        const userData = JSON.parse(user!);
        
        const userPreferences = {
          familyMembers,
          allergies: selectedAllergies,
          cuisines: selectedCuisines,
          budget: selectedBudget,
          user: userData.email
        };

        localStorage.setItem(
          "userPreferences",
          JSON.stringify(userPreferences)
        );
        console.log("Saved:", userPreferences);
        router.push("/modules/main");
      }
    };
  
    const handleBack = () => {
      if (activeStep > 0) {
        setActiveStep((prev) => prev - 1);
      }
    };

    const toggleAllergy = (item: string) => {
        setSelectedAllergies((prev) =>
          prev.includes(item)
            ? prev.filter((a) => a !== item)
            : [...prev, item]
        );
      };

      const toggleCuisine = (item: string) => {
        setSelectedCuisines((prev) =>
          prev.includes(item)
            ? prev.filter((a) => a !== item)
            : [...prev, item]
        );
      };

 return (
   <div className="flex h-screen">
     {/* Left Side */}
     <div className="w-1/3 max-sm:hidden bg-blue-700 text-white flex flex-col gap-40 justify-center items-start px-16">
       <div>
         <h1 className="text-4xl/12 font-bold mb-1">
           Let&apos;s get to know your kitchen
         </h1>
         <p className="text-lg">
           Tell us a bit about you — we’ll handle the planning, portions, and
           ingredients
         </p>
       </div>

       <div>
         <Image
           src={chefImage}
           alt="..."
           className="absolute bottom-6 w-70 h-70"
         />
       </div>
     </div>

     {/* Right Side */}

     <div className="w-2/3 max-sm:w-full bg-white flex flex-col gap-4 justify-center items-center px-16">
       <div className="min-sm:hidden absolute top-6 left-6 flex items-end gap-1.5">
         <Image src={LogoIcon} alt="..." className="w-7 h-7" />{" "}
         <div className="text-black text-base">
           Smart<span className="text-green-500">Grocery</span>
         </div>
       </div>

       {activeStep === 0 && (
         <div className="w-full gap-3 flex flex-col">
           <h2 className="text-xl text-center font-semibold text-gray-800 mb-10">
             👨‍👩‍👧‍👦 How many people are in your household?
           </h2>
           <div className="flex flex-col gap-5 px-30 max-sm:px-0">
             <div className="flex justify-between max-sm:flex-col max-sm:gap-3 max-sm:py-3 items-center  py-1 px-2 rounded">
               <p className="text-gray-800">Kids (4-12 Yrs)</p>
               <div className="flex flex-wrap max-sm:justify-center gap-2">
                 {countOptions.map((num) => (
                   <button
                     key={num}
                     onClick={() => setKidsCount(num)}
                     className={`px-6 py-1 rounded-full border text-sm cursor-pointer
                      ${
                        kidsCount === num
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                   >
                     {num}
                   </button>
                 ))}
               </div>
             </div>
             <div className="flex justify-between items-center py-1 px-2 rounded max-sm:flex-col max-sm:gap-3 max-sm:py-3">
               <p className="text-gray-800">Adults (18-43 Yrs)</p>
               <div className="flex flex-wrap gap-2 max-sm:justify-center">
                 {countOptions.map((num) => (
                   <button
                     key={num}
                     onClick={() => setAdultsCount(num)}
                     className={`px-6 py-1 rounded-full border text-sm cursor-pointer
                      ${
                        adultsCount === num
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                   >
                     {num}
                   </button>
                 ))}
               </div>
             </div>
             <div className="flex justify-between items-center  py-1 px-2 rounded max-sm:flex-col max-sm:gap-3 max-sm:py-3">
               <p className="text-gray-800">Elders (50+ Yrs)</p>
               <div className="flex flex-wrap gap-2 max-sm:justify-center">
                 {countOptions.map((num) => (
                   <button
                     key={num}
                     onClick={() => setEldersCount(num)}
                     className={`px-6 py-1 rounded-full border text-sm cursor-pointer
                      ${
                        eldersCount === num
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                   >
                     {num}
                   </button>
                 ))}
               </div>
             </div>
           </div>
         </div>
       )}

       {activeStep === 1 && (
         <div className="w-full gap-3 flex flex-col">
           <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
             Any allergies?
           </h2>
           <div className="flex gap-3 flex-wrap justify-center">
             {allergyOptions.map((item) => {
               const isSelected = selectedAllergies.includes(item);

               return (
                 <button
                   key={item}
                   onClick={() => toggleAllergy(item)}
                   className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full border transition 
                    ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                 >
                   {isSelected && <CheckIcon className="w-4 h-4" />}
                   <span>{item}</span>
                 </button>
               );
             })}
           </div>
         </div>
       )}

       {activeStep === 2 && (
         <div className="w-full gap-3 flex flex-col">
           <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
             🍽️ What Do You Love to Eat?
           </h2>

           <div className="flex gap-3 flex-wrap justify-center">
             {cuisinesOptions.map((item) => {
               const isSelected = selectedCuisines.includes(item);

               return (
                 <button
                   key={item}
                   onClick={() => toggleCuisine(item)}
                   className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full border transition 
                    ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                 >
                   {isSelected && <CheckIcon className="w-4 h-4" />}
                   <span>{item}</span>
                 </button>
               );
             })}
           </div>
         </div>
       )}

       {activeStep === 3 && (
         <div className="w-full gap-3 flex flex-col">
           <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
             What is your weekly grocery budget?
           </h2>
           <div className="flex flex-wrap gap-3 justify-center mt-4">
             {budgetOptions.map((option) => {
               const isSelected = selectedBudget === option;

               return (
                 <button
                   key={option}
                   onClick={() => setSelectedBudget(option)}
                   className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2
          ${
            isSelected
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
                 >
                   {isSelected && (
                     <svg
                       className="w-4 h-4"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       viewBox="0 0 24 24"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="M5 13l4 4L19 7"
                       />
                     </svg>
                   )}
                   {option}
                 </button>
               );
             })}
           </div>
         </div>
       )}

       {activeStep === 4 && (
         <div className="w-full text-center">
           <h2 className="text-2xl font-bold text-blue-700 mb-4">All Set!</h2>
           <p className="text-gray-600">
             You can always change these preference later.Start Smart
             Grocerying!
           </p>
           <div className="min-sm:hidden mt-4 flex justify-center">
             <CustomButton
               onClick={handleNext}
               className="px-6 py-2 bg-blue-700 text-white"
               label={
                 activeStep === totalSteps - 1 ? "Go to dashboard" : "Next"
               }
             />
           </div>
         </div>
       )}

       <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-50">
         {activeStep > 0 ? (
           <CustomButton
             onClick={handleBack}
             className="px-4 py-2 border rounded bg-none text-black hover:bg-gray-200"
             label="Back"
           />
         ) : (
           <div /> // optional: keeps spacing consistent
         )}

         {activeStep < totalSteps - 1 && (
           <CustomButton
             onClick={handleNext}
             className="px-6 py-2 bg-blue-700 text-white"
             label={activeStep === totalSteps - 1 ? "Go to dashboard" : "Next"}
           />
         )}
       </div>

       {/* NAVIGATION BUTTONS */}
       <div className="w-full flex justify-between mt-6 max-sm:hidden">
         {activeStep > 0 ? (
           <CustomButton
             onClick={handleBack}
             className="px-4 py-2 border rounded bg-none text-black hover:bg-gray-200"
             label="Back"
           />
         ) : (
           <div /> // empty div to take left space
         )}

         <CustomButton
           onClick={handleNext}
           className="px-6 py-2 bg-blue-700"
           label={activeStep === totalSteps - 1 ? "Submit" : "Next"}
         />
       </div>
     </div>
   </div>
 );
        
}