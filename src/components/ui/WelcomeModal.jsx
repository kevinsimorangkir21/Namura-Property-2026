"use client";

import { useEffect, useState } from "react";

export default function WelcomeModal() {
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const shouldShow = sessionStorage.getItem("showWelcome");
        const user = localStorage.getItem("user");

        if (shouldShow === "true") {
            if (user) {
                try {
                    const parsed = JSON.parse(user);
                    setUserName(parsed.name || "Admin");
                } catch {
                    setUserName("Admin");
                }
            }
            setShow(true);
        }
    }, []);

    const handleClose = () => {
        sessionStorage.removeItem("showWelcome");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 border border-black/[0.06] text-center">
                {/* Emoji */}
                <div className="text-5xl mb-5">👋</div>

                <h2 className="text-xl font-bold text-gray-900">
                    Selamat Datang
                </h2>

                <p className="mt-2 text-gray-500 leading-relaxed">
                    Halo <span className="font-semibold text-gray-700">{userName}</span>,
                    selamat datang di Dashboard Namura Property.
                    <br />
                    Semoga harimu menyenangkan 🚀
                </p>

                <button
                    onClick={handleClose}
                    className="mt-7 w-full h-11 rounded-xl bg-[#0F6A6A] hover:bg-[#0C5A5A] text-white font-medium text-sm transition"
                >
                    Lanjutkan
                </button>
            </div>
        </div>
    );
}
