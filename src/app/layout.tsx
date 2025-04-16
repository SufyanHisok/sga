
"use client";
import CustomLayout from "@/components/customLayout";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import "@/app//globals.css";
import AuthGuard from "./modules/auth-guard/auth-guard";
import { usePathname } from "next/navigation";
import MobileSplash from "./splash-screen/mob-splash";
import { LoadingProvider } from "./services/loading-service";
import Loader from "./modules/loader/loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Customize weights
  display: "swap",
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const isOnboardingPage = pathname === '/modules/onboarding';

  return (
    <html lang="en" className={poppins.className}>
      <body className="font-poppins">
        <ThemeProvider theme={theme}>
          <LoadingProvider>
           
            {isLoginPage || isOnboardingPage ? (
              <>
                {isLoginPage && <MobileSplash />}
                {children}
              </>
            ) : (
              <AuthGuard>
                <CustomLayout>  <Loader /> {children}</CustomLayout>
              </AuthGuard>
            )}
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
