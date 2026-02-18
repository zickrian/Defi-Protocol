"use client"

import { cn } from "@/lib/utils"
import { getHfStatus, getHfColor } from "@/lib/mock-data"

interface HealthFactorBadgeProps {
    value: number
    className?: string
}

/**
 * Color-coded health factor badge.
 * green  → HF > 1.3  (safe)
 * yellow → HF 1.0–1.3 (warn)
 * red    → HF < 1.0  (danger)
 */
export function HealthFactorBadge({ value, className }: HealthFactorBadgeProps) {
    const status = getHfStatus(value)
    const colorClass = getHfColor(value)

    const dotColor =
        status === 'safe'
            ? 'bg-green-500'
            : status === 'warn'
                ? 'bg-yellow-400'
                : 'bg-red-500'

    const bgColor =
        status === 'safe'
            ? 'bg-green-50 border-green-200'
            : status === 'warn'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold",
                bgColor,
                colorClass,
                className,
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
            HF {value.toFixed(2)}
        </span>
    )
}
