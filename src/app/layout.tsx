
"use client";
import CustomLayout from "@/components/customLayout";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import "@/app//globals.css";
import AuthGuard from "./modules/auth-guard/auth-guard";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Customize weights
  display: "swap",
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  return (
    <html lang="en" className={poppins.className}>
      <body className="font-poppins">
        <ThemeProvider theme={theme}>
          {isLoginPage ? (
            children
          ) : (
            <AuthGuard>
              <CustomLayout>{children}</CustomLayout>
            </AuthGuard>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
