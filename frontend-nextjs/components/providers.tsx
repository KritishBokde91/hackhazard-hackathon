"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAuth } from "@/hooks/stores/use-auth";
import { useEffect } from "react";
import { ProblemLoader } from "./problems-loader";
export function Providers({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const { getUser, isAuthChecking } = useAuth();
    useEffect(() => {
        getUser();
    }, [getUser])

    if (isAuthChecking) {
        return <ProblemLoader />
    } else return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
