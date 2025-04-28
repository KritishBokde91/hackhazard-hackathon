"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAuth } from "@/hooks/stores/use-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export function Providers({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = useState(false)
    const router = useRouter();
    // check if user is authenticated
    const { checkAuth } = useAuth()
    useEffect(() => {
        router.push("https://codinggeek.codeltix.com")
        async function mount() {
          await checkAuth()
          setMounted(true)
        }                
        mount()
    }, [checkAuth  , router])
    if (mounted) {
        return <NextThemesProvider {...props}>{children}</NextThemesProvider>
    }
}
