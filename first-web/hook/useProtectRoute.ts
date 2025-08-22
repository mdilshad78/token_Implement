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

        //     fetch("http://localhost:5000/api/auth/verify", {  // ✅ correct endpoint
        //         method:"POST"
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ token }),
        //     })
        //         .then(async (res) => {
        //             const data = await res.json();
        //             if (res.ok && data.valid) {
        //                 setUser(data.user);
        //             } else {
        //                 sessionStorage.removeItem("token");
        //                 router.replace("/");
        //             }
        //         })
        //         .catch(() => {
        //             sessionStorage.removeItem("token");
        //             router.replace("/");
        //         })
        //         .finally(() => setIsChecking(false));
        // }, [router]);

        axios.post("http://localhost:5000/api/auth/verify",
            { token }, // ✅ send token in body
            { headers: { "Content-Type": "application/json" } } // ✅ headers
        )
            .then((res) => {
                if (res.data.valid) {
                    setUser(res.data.user); // ✅ backend decoded user
                } else {
                    sessionStorage.removeItem("token");
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
