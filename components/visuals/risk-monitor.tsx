"use client";

import { Activity, ShieldCheck, AlertTriangle, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RiskMonitor() {
    const collateralValue = 150000; // Initial Collateral
    const borrowedAmount = 80000;   // Initial Debt
    // tickerPrice is no longer dynamic, so it's removed as a state variable.

    // Health Factor = (Collateral * LTV) / Debt. Let's assume LTV of 80% for simplicity in this visual
    // Real formula: (CollateralValue * LiquidationThreshold) / TotalDebt
    const liquidationThreshold = 0.825; // 82.5%
    const healthFactor = (collateralValue * liquidationThreshold) / borrowedAmount;

    // Simulate price fluctuation - removed for static component

    const isHealthy = healthFactor > 1.1;
    const isCrictical = healthFactor < 1.05;

    return (
        <Card className="w-full max-w-md mx-auto bg-black text-white border-zinc-800 shadow-2xl overflow-hidden relative font-mono">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" /> {/* Removed animate-pulse */}
                    <span className="text-sm font-bold tracking-wider text-gray-400">RISK ENGINE v2.0</span>
                </div>
                <Badge variant="outline" className="border-white/20 text-white bg-white/5 font-mono text-xs">
                    LIVE
                </Badge>
            </div>

            {/* Main Health Display */}
            <div className="p-8 text-center relative z-10">
                <div className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Health Factor</div>
                <div // Changed from motion.div to div, removed animation props
                    className={`text-6xl font-black tracking-tighter transition-colors duration-500 ${isCrictical ? "text-red-500" : isHealthy ? "text-emerald-500" : "text-yellow-500"}`}
                >
                    {healthFactor.toFixed(2)}
                </div>

                {/* Status Badge */}
                <div className="mt-4 flex justify-center">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${isCrictical ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"}`}>
                        {isCrictical ? <AlertTriangle className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                        {isCrictical ? "LIQUIDATION RISK" : "SAFE & SECURE"}
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 border-t border-white/10 relative z-10">
                <div className="p-6 border-r border-white/10">
                    <div className="text-xs text-gray-500 mb-1">COLLATERAL (TSLA)</div>
                    <div className="text-lg font-bold">${collateralValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <div className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                        <RefreshCw className="h-3 w-3 animate-spin" /> Oracle Update
                    </div>
                </div>
                <div className="p-6">
                    <div className="text-xs text-gray-500 mb-1">TOTAL DEBT (USDC)</div>
                    <div className="text-lg font-bold">${borrowedAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-400 mt-1">
                        APB: 4.2%
                    </div>
                </div>
            </div>

            {/* Parameters */}
            <div className="bg-white/5 p-4 text-xs text-gray-400 flex justify-between border-t border-white/10 relative z-10">
                <span>LTV Limit: 82.5%</span>
                <span>Liq. Threshold: 85.0%</span>
            </div>
        </Card>
    );
}
