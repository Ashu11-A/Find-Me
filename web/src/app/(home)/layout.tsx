import React from "react";

export default function LayoutMain({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center p-10 h-screen w-screen">
            {children}
        </div>
    )
}