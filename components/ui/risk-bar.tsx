"use client"

import { cn } from "@/lib/utils"
import { getHfStatus } from "@/lib/mock-data"

interface RiskBarProps {
    /** Current collateral USD */
    collateralUsd: number
    /** Current debt USD */
    debtUsd: number
    /** Health factor (drives position of indicator) */
    healthFactor: number
    className?: string
}

/**
 * Visual risk bar: SAFE ----[indicator]---- DANGER
 * The indicator position is inversely proportional to health factor.
 * HF ≥ 2.0 → far left (safe). HF 1.0 → middle. HF → 0 → far right.
 */
export function RiskBar({ healthFactor, className }: RiskBarProps) {
    const status = getHfStatus(healthFactor)

    // Map HF to 0–100% position (100% = most dangerous)
    // We cap at HF 3.0 for the safe end
    const clampedHf = Math.max(0, Math.min(3.0, healthFactor))
    const dangerPercent = Math.round(((3.0 - clampedHf) / 3.0) * 100)

    const indicatorColor =
        status === 'safe' ? 'bg-green-500' : status === 'warn' ? 'bg-yellow-400' : 'bg-red-500'

    const fillColor =
        status === 'safe'
            ? 'from-green-100 to-green-300'
            : status === 'warn'
                ? 'from-yellow-100 to-yellow-300'
                : 'from-red-200 to-red-400'

    return (
        <div className={cn("space-y-1.5", className)}>
            <div className="flex justify-between text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                <span>SAFE</span>
                <span>DANGER</span>
            </div>

            <div className="relative h-2 w-full rounded-full bg-border overflow-visible">
                {/* Gradient fill from left to indicator */}
                <div
                    className={cn("absolute inset-y-0 left-0 rounded-full bg-gradient-to-r", fillColor)}
                    style={{ width: `${dangerPercent}%` }}
                />

                {/* Indicator dot */}
                <div
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm",
                        indicatorColor,
                    )}
                    style={{ left: `${dangerPercent}%` }}
                />
            </div>
        </div>
    )
}
