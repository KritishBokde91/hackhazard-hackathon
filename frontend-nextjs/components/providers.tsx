"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAuth } from "@/hooks/stores/use-auth";
import { useEffect } from "react";
export function Providers({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const { getUser } = useAuth();
    useEffect(() => {
        getUser();
    }, [getUser])

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
