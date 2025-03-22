// "use client"; // Ensure this component is client-side only

// import { useEffect, useState } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { format, parse, startOfWeek, getDay, set } from "date-fns";
// import { enUS } from "date-fns/locale/en-US";
// import "./calendarStyle.css";

// const locales = { "en-US": enUS };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Week starts on Monday
//   getDay,
//   locales,
// });

// // ✅ Meal Options (Static meal names, dynamic dates)
// // const mealOptions = [
// //   { title: "Biryani (Lunch)" },
// //   { title: "Chicken Karahi (Dinner)" },
// //   { title: "Pasta (Breakfast)" },
// //   { title: "Paratha & Omelette (Breakfast)" },
// //   { title: "BBQ (Dinner)" },
// //   { title: "Halwa Puri (Breakfast)" },
// //   { title: "Chicken Handi (Lunch)" },
// //   { title: "Aloo Paratha (Breakfast)" },
// // ];

// export default function DashboardV2() {
//   const [mealEvents, setMealEvents] = useState<
//     { title: string; start: Date; end: Date }[]
//   >([]);
//   const [view, setView] = useState<
//     "month" | "week" | "day" | "agenda" | "work_week"
//   >("month"); // ✅ Fix view handling
//   const [date, setDate] = useState(new Date()); // ✅ Track current date for navigation

//   useEffect(() => {
//     setMealEvents(generateMealEvents());
//   }, []);

//   const generateMealEvents = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();
//     const weekdays = [1, 2, 3, 4, 5]; // Monday to Friday
//     const generatedMeals: { title: string; start: Date; end: Date }[] = [];

//     mealOptions.slice(0, 5).forEach((meal, index) => {
//       const mealDate = new Date(
//         currentYear,
//         currentMonth,
//         weekdays[index % weekdays.length] + 7
//       ); // Set meal days
//       generatedMeals.push({
//         title: meal.title,
//         start: set(mealDate, { hours: 12, minutes: 0 }),
//         end: set(mealDate, { hours: 13, minutes: 0 }),
//       });
//     });

//     return generatedMeals;
//   };

//   return (
//     <div className="p-2">
//       <div className="rounded-lg overflow-hidden p-2">
//         <Calendar
//           localizer={localizer}
//           events={mealEvents}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: "80vh" }}
//           views={["month", "week", "day", "agenda"]} // ✅ Allow multiple views
//           view={view} // ✅ Bind state to fix switching issues
//           onView={(newView) => setView(newView)} // ✅ Fix view buttons
//           date={date} // ✅ Bind state to fix navigation buttons
//           onNavigate={(newDate) => setDate(newDate)} // ✅ Fix "Today", "Back", "Next"
//         />
//       </div>
//     </div>
//   );
// }
