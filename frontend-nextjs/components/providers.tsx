"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAuth } from "@/hooks/stores/use-auth";
import { useEffect, useState } from "react";
export function Providers({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = useState(false)
    // check if user is authenticated
    const { checkAuth } = useAuth()
    useEffect(() => {
        async function mount() {
          await checkAuth()
          setMounted(true)
        }                
        mount()
    }, [checkAuth])
    if (mounted) {
        return <NextThemesProvider {...props}>{children}</NextThemesProvider>
    }
}
