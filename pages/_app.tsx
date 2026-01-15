import { cn } from "@/common/utils";
import { inter, notoSansMyanmar, pyidaungsu } from "@/lib/fonts";
import { useAuthStore } from "@/lib/store/authStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Public routes that don't require authentication
const publicRoutes = ["/login", "/register"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Check if user has token
    const hasToken = checkAuth();

    console.log(hasToken);

    // If no token and trying to access protected route
    if (!hasToken && !publicRoutes.includes(router.pathname)) {
      router.replace("/login");
    }

    // If has token and trying to access login/register
    if (hasToken && publicRoutes.includes(router.pathname)) {
      router.replace("/");
    }
  }, [router.pathname, checkAuth, router]);

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-white",
        notoSansMyanmar.variable,
        pyidaungsu.variable,
        inter.variable
      )}
    >
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
