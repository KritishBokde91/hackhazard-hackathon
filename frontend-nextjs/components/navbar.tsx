"use client"
import Link from "next/link"
import { MobileDrawer } from "@/components/mobile-drawer"
import { usePathname } from "next/navigation"
import UserAvatar from "./user-avatar"

export function Navbar() {
    const pathName = usePathname()
    const routes = [
        { name: "Problems", href: "/problems" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]
    const mobileRoutes = routes.slice()
    mobileRoutes.unshift({ name: "Home", href: "/" })

    return (
        <header className="fixed left-0 w-full top-0 z-50 border-b backdrop-blur-md">
            <nav className="container mx-auto">
                <div className="flex h-16 items-center px-4">
                    <MobileDrawer routes={mobileRoutes} pathName={pathName} />

                    <div className="hidden md:flex md:flex-1">
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            <span className="font-bold">{process.env.NEXT_PUBLIC_SITE_NAME}</span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            {routes.map((route) => (
                                <Link key={route.href} href={route.href} className={`hover:text-primary transition-all duration-300 ${pathName === route.href ? "text-primary" : "text-muted-foreground"}`}>
                                    {route.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-1 md:flex-none">

                        <UserAvatar />

                    </div>
                </div>

            </nav>

        </header>
    )
}