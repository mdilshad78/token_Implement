"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useProtectRoute() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token"); // 👈 ya cookie use karo

        if (!token) {
            router.replace("/");
            return;
        }

        axios.post(
            "https://token-implement.vercel.app/api/auth/verify",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ send token in header
                },
            }
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
                localStorage.removeItem("token");
                router.replace("/");
            })
            .finally(() => setIsChecking(false));
    }, [router]);

    return { isChecking, user };
}
