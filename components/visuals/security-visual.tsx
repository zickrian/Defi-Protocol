"use client";

import { ShieldCheck, Lock, Search, FileCheck } from "lucide-react";

export function SecurityVisual() {
    return (
        <div className="relative w-full h-[400px] bg-black rounded-3xl overflow-hidden flex items-center justify-center border border-zinc-800">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Central Shield */}
            <div className="relative z-10">
                <div
                    className="w-48 h-56 bg-zinc-900 border border-zinc-700 rounded-3xl flex items-center justify-center relative shadow-2xl"
                >
                    <ShieldCheck className="w-20 h-20 text-white" />


                </div>

                {/* Floating Badges (Static) */}
                <div
                    className="absolute -top-6 -right-12 bg-zinc-800 border border-zinc-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-white text-xs font-mono">AUDITED</span>
                </div>

                <div
                    className="absolute -bottom-6 -left-12 bg-zinc-800 border border-zinc-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                >
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span className="text-white text-xs font-mono">TIMELOCK</span>
                </div>
            </div>

            {/* Connected Nodes (Static) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Node 1 */}
                <div className="absolute top-1/4 left-1/4 opacity-30">
                    <FileCheck className="text-zinc-700 w-8 h-8" />
                </div>

                {/* Node 2 */}
                <div className="absolute bottom-1/3 right-1/4 opacity-30">
                    <Search className="text-zinc-700 w-8 h-8" />
                </div>
            </div>
        </div>
    );
}
