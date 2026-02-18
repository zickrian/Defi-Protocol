"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HealthFactorBadge } from "@/components/ui/health-factor-badge"
import { cn } from "@/lib/utils"
import { getHfStatus } from "@/lib/mock-data"

interface HealthFactorModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    healthFactorAfter: number
    borrowAmountUsd: number
    borrowSymbol: string
    isLoading?: boolean
}

/**
 * Hard warning modal shown before confirming a borrow that results
 * in a health factor below 1.3 (or below 1.0 which is immediately liquidatable).
 */
export function HealthFactorModal({
    isOpen,
    onClose,
    onConfirm,
    healthFactorAfter,
    borrowAmountUsd,
    borrowSymbol,
    isLoading = false,
}: HealthFactorModalProps) {
    if (!isOpen) return null

    const status = getHfStatus(healthFactorAfter)
    const isDanger = status === 'danger'

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Modal panel */}
            <div
                className={cn(
                    "relative w-full max-w-md mx-4 rounded-xl border bg-background p-6 shadow-xl",
                    isDanger ? "border-red-500/50" : "border-yellow-400/50",
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div
                    className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                        isDanger ? "bg-red-50 text-red-500" : "bg-yellow-50 text-yellow-500",
                    )}
                >
                    <AlertTriangle className="w-6 h-6" />
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-foreground mb-1">
                    {isDanger ? "Position at Risk of Liquidation" : "Health Factor Warning"}
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                    Borrowing{" "}
                    <span className="font-semibold text-foreground">
                        ${borrowAmountUsd.toLocaleString()} {borrowSymbol}
                    </span>{" "}
                    will bring your health factor to:
                </p>

                {/* HF display */}
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/30 mb-5">
                    <HealthFactorBadge value={healthFactorAfter} />
                    <span className="text-sm text-muted-foreground">
                        Health Factor After Borrow
                    </span>
                </div>

                {/* Warning text */}
                {isDanger && (
                    <div className="flex gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 mb-5">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 font-medium">
                            A health factor below 1.0 means your position can be liquidated
                            immediately. You will lose part of your collateral.
                        </p>
                    </div>
                )}

                {!isDanger && (
                    <div className="flex gap-2.5 p-3 rounded-lg bg-yellow-50 border border-yellow-200 mb-5">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-700 font-medium">
                            A health factor below 1.3 leaves very little buffer. Price drops
                            could push your position into liquidation.
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={isDanger ? "destructive" : "default"}
                        className="flex-1"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Proceed Anyway"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
