import CustomButton from "@/components/shared/custom-btn";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import TodayIcon from '@mui/icons-material/Today';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useRouter } from 'next/navigation';
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
export default function Dashboard() {
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
              className="px-3 mt-3"
              onClick={() => router.push('/modules/planner')}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow ">
            <h3 className="text-lg font-semibold mb-4">
              Items to be delivered today!
            </h3>

            <div className="max-h-80 overflow-y-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3">Dish</th>
                  <th className="p-3 w-1/3">Unit</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {Object.entries(groupedIngredients).map(
                  ([dish, ingredients]) => (
                    <React.Fragment key={dish}>
                      {/* Dish Header Row */}
                      <tr className="bg-gray-200 font-semibold text-gray-800 ">
                        <td className="p-3">{ingredients[0].name}</td>
                        <td colSpan={1}>expected delivery : 2PM</td>
                      </tr>

                      {/* Ingredient Rows */}
                      {ingredients.map((ingredient, index) => (
                        <tr key={index} className="border border-gray-300">
                          <td className="p-3 ps-6">-{ingredient.name}</td>
                          <td className="p-3">{ingredient.unit}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
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
              <div className="bg-blue-100 text-blue-500 p-3 rounded-full">
                <AttachMoneyIcon />
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
                <p className="text-sm text-gray-500">Yesterday Dishes Delivered</p>
              </div>
              <div className="bg-slate-100 text-slate-600 p-3 rounded-full">
                <TodayIcon />
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
              <div className="bg-slate-100 text-slate-600 p-3 rounded-full">
                <AutoAwesomeIcon />
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
