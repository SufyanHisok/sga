
"use client";
import CustomLayout from "@/components/customLayout";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import "@/app//globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Customize weights
  display: "swap",
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="font-poppins">
      <ThemeProvider theme={theme}>
        <CustomLayout>{children}</CustomLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
