"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && pathname !== "/login") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) return null; // Or loading spinner
  return <>{children}</>;
}