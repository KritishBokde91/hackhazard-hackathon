"use client";
import { useAuth } from "@/hooks/stores/use-auth";
import { usePathname, useRouter } from "next/navigation";

const ProtectedLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { user, isAuthChecking } = useAuth();
    const router = useRouter();
    const path = usePathname();
    if (isAuthChecking) {
        return (<div>Loading</div>)
    }
    else if (!user) {
        router.push("/login?next=" + path);
    } else return (children);
}

export default ProtectedLayout;