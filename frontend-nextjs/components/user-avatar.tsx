"use client"

import { useAuth } from "@/hooks/stores/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
    const router = useRouter()
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
        <Avatar onClick={() => { router.push("/dashboard") }} className="cursor-pointer">
            <AvatarImage src={user?.profile} />
            <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>


    );
}

export default UserAvatar;