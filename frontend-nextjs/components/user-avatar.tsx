"use client"

import { useAuth } from "@/hooks/stores/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

const UserAvatar = () => {
    const { user, isAuthChecking } = useAuth()
    if (!user && !isAuthChecking) {
        return (
            <Link href="/login" className="cursor-pointer">
                <Button className="cursor-pointer">
                    Login
                </Button>
            </Link>
        )
    }
    return (
        <Avatar>
            <AvatarImage src={user?.profile} />
            <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>


    );
}

export default UserAvatar;