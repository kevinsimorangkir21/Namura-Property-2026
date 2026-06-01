"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!token || !isLoggedIn) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
        setChecking(false);
    }, [router]);

    if (checking) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-gray-500">Memuat...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
