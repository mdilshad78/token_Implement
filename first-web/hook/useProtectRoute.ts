"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useProtectRoute() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            router.replace("/");
            return;
        }

        axios.post("http://token-implement.vercel.app/api/auth/verify",
            { token }, // ✅ send token in body
            { headers: { "Content-Type": "application/json" } } // ✅ headers
        )
            .then((res) => {
                if (res.data.valid) {
                    setUser(res.data.user); // ✅ backend decoded user
                } else {
                    localStorage.removeItem("token");
                    router.replace("/");
                }
            })
            .catch(() => {
                sessionStorage.removeItem("token");
                router.replace("/");
            })
            .finally(() => setIsChecking(false));
    }, [router]);

    return { isChecking, user };
}
