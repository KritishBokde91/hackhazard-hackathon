"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"
import { ScrollArea } from "./ui/scroll-area"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function MobileDrawer({ routes, pathName }: { routes: { name: string; href: string }[], pathName: string }) {
    const [open, setOpen] = React.useState(false)

    const handleLinkClick = () => {
        setOpen(false)
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <VisuallyHidden>
                    <DrawerHeader>
                        <DrawerTitle>Navigation</DrawerTitle>
                        <DrawerDescription>Links to navigate the website</DrawerDescription>
                    </DrawerHeader>
                </VisuallyHidden>
                <ScrollArea className="h-[400px]">
                    <div className="flex flex-col space-y-2 p-4">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={handleLinkClick}
                                className={`hover:text-primary text-lg transition-all duration-300 ${pathName === route.href ? "text-primary" : "text-muted-foreground"}`
                                }
                            >
                                {route.name}
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}
