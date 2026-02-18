"use client"

import { useState } from "react"
import { useLiquidatablePositions } from "@/hooks/useProtocol"
import { HealthFactorBadge } from "@/components/ui/health-factor-badge"
import { Button } from "@/components/ui/button"
import { formatUsd, type LiquidatablePosition } from "@/lib/mock-data"
import { Skull, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonRow() {
    return (
        <tr className="border-b border-border">
            {Array.from({ length: 5 }).map((_, i) => (
                <td key={i} className="px-4 py-4">
                    <div className="h-4 rounded bg-border/60 animate-pulse w-20" />
                </td>
            ))}
        </tr>
    )
}

// ─── Liquidate confirm modal ──────────────────────────────────────────────────

interface LiquidateModalProps {
    position: LiquidatablePosition | null
    onClose: () => void
    onConfirm: (pos: LiquidatablePosition) => void
    isLoading: boolean
}

function LiquidateModal({ position, onClose, onConfirm, isLoading }: LiquidateModalProps) {
    if (!position) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md mx-4 rounded-xl border border-border bg-background p-6 shadow-xl space-y-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                        <Skull className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-foreground">Liquidate Position</h2>
                        <p className="text-xs text-muted-foreground">{position.address}</p>
                    </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Health Factor</span>
                        <HealthFactorBadge value={position.healthFactor} />
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Debt to Repay</span>
                        <span className="font-semibold text-foreground">{formatUsd(position.debtUsd)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Collateral Received</span>
                        <span className="font-semibold text-foreground">
                            {position.collateralSymbol} ({formatUsd(position.collateralValueUsd)})
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Liquidation Bonus</span>
                        <span className="font-semibold text-green-600">+5%</span>
                    </div>
                </div>

                <div className="flex gap-2.5 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-700">
                        You will repay the debt and receive the collateral plus a 5% bonus.
                        Make sure you have sufficient funds.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => onConfirm(position)}
                        disabled={isLoading}
                    >
                        {isLoading ? "Liquidating..." : "Confirm Liquidation"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

// ─── Table row ────────────────────────────────────────────────────────────────

interface PositionRowProps {
    position: LiquidatablePosition
    onLiquidate: (pos: LiquidatablePosition) => void
    isLiquidated: boolean
}

function PositionRow({ position, onLiquidate, isLiquidated }: PositionRowProps) {
    return (
        <tr
            className={cn(
                "border-b border-border transition-colors",
                isLiquidated ? "opacity-40" : "hover:bg-muted/20",
            )}
        >
            <td className="px-4 py-3.5">
                <span className="text-sm font-mono text-muted-foreground">{position.address}</span>
            </td>
            <td className="px-4 py-3.5">
                <HealthFactorBadge value={position.healthFactor} />
            </td>
            <td className="px-4 py-3.5">
                <span className="text-sm font-semibold text-foreground tabular-nums">
                    {formatUsd(position.debtUsd)}
                </span>
            </td>
            <td className="px-4 py-3.5">
                <div>
                    <div className="text-sm font-semibold text-foreground">
                        {position.collateralSymbol}
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">
                        {formatUsd(position.collateralValueUsd)}
                    </div>
                </div>
            </td>
            <td className="px-4 py-3.5">
                {isLiquidated ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Liquidated
                    </span>
                ) : (
                    <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs px-3"
                        onClick={() => onLiquidate(position)}
                    >
                        Liquidate
                    </Button>
                )}
            </td>
        </tr>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LiquidationsPage() {
    const { data: positions, isLoading } = useLiquidatablePositions()
    const [selectedPosition, setSelectedPosition] = useState<LiquidatablePosition | null>(null)
    const [liquidatedAddresses, setLiquidatedAddresses] = useState<Set<string>>(new Set())
    const [isLiquidating, setIsLiquidating] = useState(false)

    const handleConfirmLiquidation = async (pos: LiquidatablePosition) => {
        setIsLiquidating(true)
        // TODO: call LendingPool.liquidationCall(collateral, debt, user, debtToCover, receiveAToken)
        await new Promise((r) => setTimeout(r, 2000))
        setLiquidatedAddresses((prev) => new Set(prev).add(pos.address))
        setIsLiquidating(false)
        setSelectedPosition(null)
    }

    const activePct =
        positions.length === 0
            ? 0
            : Math.round(
                ((positions.length - liquidatedAddresses.size) / positions.length) * 100,
            )

    return (
        <div className="p-6 space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Skull className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <h1 className="text-xl font-bold text-foreground">Liquidations</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Permissionless — earn a 5% bonus on each liquidation
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                        {positions.length - liquidatedAddresses.size}
                    </div>
                    <div className="text-xs text-muted-foreground">at-risk positions</div>
                </div>
            </div>

            {/* Info */}
            <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                    Any address can liquidate undercollateralised positions (HF &lt; 1.0).
                    The liquidator repays up to 50% of the debt and receives the equivalent
                    collateral value plus a 5% liquidation bonus.
                </p>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/20">
                            {["User", "Health Factor", "Debt", "Collateral", "Action"].map((col) => (
                                <th
                                    key={col}
                                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                            : positions.map((pos) => (
                                <PositionRow
                                    key={pos.address}
                                    position={pos}
                                    onLiquidate={setSelectedPosition}
                                    isLiquidated={liquidatedAddresses.has(pos.address)}
                                />
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Empty */}
            {!isLoading && positions.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                    No positions eligible for liquidation.
                </div>
            )}

            <LiquidateModal
                position={selectedPosition}
                onClose={() => setSelectedPosition(null)}
                onConfirm={handleConfirmLiquidation}
                isLoading={isLiquidating}
            />
        </div>
    )
}
