"use client";

export function Sparkline({ color = "green" }: { color?: "green" | "red" }) {
    const isGreen = color === "green";
    const strokeColor = isGreen ? "#10b981" : "#ef4444"; // emerald-500 or red-500
    const fillColor = isGreen ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";

    // Simulated data for static visual
    const greenData = "M0 40 L10 35 L20 38 L30 30 L40 32 L50 25 L60 28 L70 20 L80 22 L90 15 L100 18 L110 10 L120 5";
    const redData = "M0 10 L10 15 L20 12 L30 20 L40 18 L50 25 L60 22 L70 30 L80 28 L90 35 L100 32 L110 40 L120 45";

    const pathData = isGreen ? greenData : redData;
    const areaData = `${pathData} L120 50 L0 50 Z`;

    return (
        <svg width="100%" height="50" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-hidden">
            <path d={areaData} fill={fillColor} />
            <path d={pathData} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
