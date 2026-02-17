"use client";

import { motion } from "framer-motion";

export function ProcessDiagram() {
    return (
        <div className="relative w-full h-[400px] bg-secondary/30 rounded-3xl border border-border overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-dot-pattern opacity-30" />

            {/* Central Flow Animation */}
            <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Path Background */}
                <path d="M100 200 H300 C350 200 350 300 400 300 S450 100 500 100 H700" stroke="currentColor" strokeWidth="2" className="text-border" strokeDasharray="8 8" />

                {/* Animated Path 1 (Asset Flow) */}
                <motion.path
                    d="M100 200 H300 C350 200 350 300 400 300 S450 100 500 100 H700"
                    stroke="black"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />

                {/* Node 1: Robinhood / Lock */}
                <g transform="translate(100, 200)">
                    <circle r="40" fill="white" stroke="currentColor" className="text-border" strokeWidth="2" />
                    <motion.circle r="40" stroke="black" strokeWidth="2" fill="none"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" className="text-foreground">LOCK</text>
                </g>

                {/* Node 2: Oracle / Verify */}
                <g transform="translate(400, 300)">
                    <rect x="-40" y="-30" width="80" height="60" rx="10" fill="white" stroke="currentColor" className="text-border" strokeWidth="2" />
                    <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" className="text-foreground">VERIFY</text>
                    <motion.rect x="-40" y="-30" width="80" height="60" rx="10" stroke="black" strokeWidth="2" fill="none"
                        animate={{ strokeDasharray: ["0 100", "100 0"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </g>

                {/* Node 3: Arbitrum / Mint */}
                <g transform="translate(700, 100)">
                    <circle r="40" fill="white" stroke="currentColor" className="text-border" strokeWidth="2" />
                    <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" className="text-foreground">MINT</text>
                    <motion.circle r="35" fill="none" stroke="black" strokeWidth="2" strokeDasharray="4 4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </g>
            </svg>

            {/* Floating Labels */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-white border border-border px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                Source Chain
            </div>
            <div className="absolute top-10 right-4 bg-white border border-border px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                Destination Chain
            </div>
        </div>
    );
}
