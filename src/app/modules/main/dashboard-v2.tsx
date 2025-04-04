import CustomButton from "@/components/shared/custom-btn";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import TodayIcon from '@mui/icons-material/Today';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useRouter } from 'next/navigation';
import { useMediaQuery, useTheme } from "@mui/material";
const groupedIngredients = {
 Biryani: [
    { name: "Chicken", unit: "500g" },
    { name: "Rice", unit: "300g" },
    { name: "Chicken", unit: "500g" },
    { name: "Yogurt", unit: "100g" },
  ],
  Pasta: [
    { name: "Spaghetti", unit: "200g" },
    { name: "Tomato Sauce", unit: "100g" },
    { name: "Cheese", unit: "50g" },
  ],
};



const data = Object.entries(groupedIngredients).map(([dish, ingredients]) => ({
  dish,
  expectedDelivery: "2PM", // Or use dynamic delivery time if available
  items: ingredients,
}));
export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();
  return (
    <div>
      {/* <p className="text-xs text-gray-500">Welcome back</p>
      <h2 className="text-xl">Khizer Ahmed</h2>
      <hr className="my-3 text-gray-300"></hr>

      <div>
        <div className="shadow-sm rounded-md w-70 p-2">
          <p className="text-slate-800">Items to be delivered today</p>{" "}
          <hr className="my-3 text-gray-200"></hr>
          <div className="flex justify-between items-center px-2 py-3">
            <p className="text-base">Chicken Biryani</p>
            <div className="text-sm rounded-xl px-3 py-1 bg-slate-100 text-slate-700 border-slate-300 ">
              Lunch
            </div>
          </div>
          <div className="flex justify-between items-center px-2 py-3">
            <p className="text-base">Alfredo Pasta</p>
            <div className="text-sm rounded-xl px-3 py-1 bg-emerald-50 text-emerald-700 border-slate-300 ">
              Dinner
            </div>
          </div>
          <div className="flex justify-between items-center px-2 py-3">
            <p className="text-base">Mutton Karahi</p>
            <div className="text-sm rounded-xl px-3 py-1 bg-slate-200 text-slate-700 border-slate-300 ">
              Lunch
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT SECTION (75%) */}
        <div className="md:col-span-9 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">Welcome Back!</h2>
            <p className="text-gray-600">
              Start generating your food plan now.
            </p>
            <CustomButton
              label="Generate Plan"
              icon={AddIcon}
              className="px-3 mt-3 max-sm:w-full max-sm:flex max-sm:justify-center"
              onClick={() => router.push("/modules/planner")}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow ">
            <h3 className="text-lg font-semibold mb-4">
              Items to be delivered today!
            </h3>

            <div className="max-h-80 overflow-y-auto">
              {/* Desktop View */}
              <div className="hidden md:block">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="p-3">Dish</th>
                      <th className="p-3 w-1/3">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {data.map((group, index) => (
                      <React.Fragment key={index}>
                        <tr className="bg-gray-200 font-semibold text-gray-800">
                          <td className="p-3">{group.dish}</td>
                          <td className="p-3">
                            expected delivery : {group.expectedDelivery}
                          </td>
                        </tr>
                        {group.items.map((item, idx) => (
                          <tr key={idx} className="border border-gray-300">
                            <td className="p-3 ps-6">- {item.name}</td>
                            <td className="p-3">{item.unit}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="block md:hidden space-y-4">
                {data.map((group, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow p-4 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {group.dish}
                      </span>
                      <span className="text-sm text-gray-600">
                        expected delivery: {group.expectedDelivery}
                      </span>
                    </div>
                    {group.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between border-t border-gray-300 pt-2 text-sm"
                      >
                        <span className="text-gray-700">- {item.name}</span>
                        <span className="font-medium">{item.unit}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION (25%) */}
        <div className="md:col-span-3 space-y-6">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-xl shadow space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Weekly Spent</p>
                <p className="text-xl font-bold mt-1">88$ USD</p>
              </div>
              <div className="bg-blue-100 text-blue-500 p-3 max-sm:w-10 max-sm:h-10 max-sm:flex rounded-full">
                <AttachMoneyIcon style={{ fontSize: isMobile ? "16px" : undefined }} />
              </div>
            </div>
            <div className="flex items-center text-sm text-red-500 gap-1">
              <span>+2.08%</span>
              <span className="text-gray-400">vs last week</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl shadow space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Yesterday Dishes Delivered
                </p>
              </div>
              <div className="bg-slate-100 text-slate-600 p-3 rounded-full max-sm:w-10 max-sm:h-10 max-sm:flex">
                <TodayIcon style={{ fontSize: isMobile ? "16px" : undefined }} />
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-base">Vegetable Paneer Handi</p>
                <div className="text-sm rounded-xl px-3 py-1 bg-slate-100 text-slate-700 border-slate-300">
                  Lunch
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-base">Daal Makhni</p>
                <div className="text-sm rounded-xl px-3 py-1 bg-slate-100 text-slate-700 border-slate-300">
                  Lunch
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-base">Mutton Karahi</p>
                <div className="text-sm rounded-xl px-3 py-1 bg-emerald-50 text-emerald-700 border-slate-300">
                  Dinner
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-xl shadow space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Our Recommendation</p>
              </div>
              <div className="bg-slate-100 text-slate-600 p-3 rounded-full max-sm:w-10 max-sm:h-10 max-sm:flex">
                <AutoAwesomeIcon style={{ fontSize: isMobile ? "14px" : undefined }} />
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-base">Fried Egg with avocado</p>
                <div className="text-xs rounded-xl px-3 py-1 bg-slate-50 text-gray-700">
                  287 Kcal
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-base">Chicked Fried Rice</p>
                <div className="text-xs rounded-xl px-3 py-1 bg-slate-50 text-gray-700">
                  398 Kcal
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-base">Black bean tortilla soup</p>
                <div className="text-xs rounded-xl px-3 py-1 bg-slate-50 text-gray-700">
                  130 Kcal
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="text-base">Shrimp puttanesca</p>
                <div className="text-xs rounded-xl px-3 py-1 bg-slate-50 text-gray-700">
                  400 Kcal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
