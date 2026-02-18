"use client"

import Link from "next/link"
import { useUserSupplyPositions, useUserBorrowPositions, useUserStats, useHealthFactor } from "@/hooks/useProtocol"
import { HealthFactorBadge } from "@/components/ui/health-factor-badge"
import { RiskBar } from "@/components/ui/risk-bar"
import { formatUsd, type UserSupplyPosition, type UserBorrowPosition } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"

// ─── Leverage loop diagram (SVG) ──────────────────────────────────────────────

/**
 * Visual flow: TSLA → Borrow AMZN → Swap → TSLA → Deposit
 * Pure SVG so no extra dependencies.
 */
function LeverageFlowDiagram({ depth }: { depth: number }) {
    const steps = [
        { label: "Deposit TSLA", sub: "as collateral" },
        { label: "Borrow AMZN", sub: "against TSLA" },
        { label: "Swap AMZN", sub: "→ TSLA" },
        { label: "Deposit TSLA", sub: "back in pool" },
    ]

    const NODE_W = 120
    const NODE_H = 52
    const GAP = 60
    const TOTAL_W = steps.length * NODE_W + (steps.length - 1) * GAP
    const CY = NODE_H / 2 + 20

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                    Leverage Loop
                </span>
                <span className="px-2 py-0.5 rounded-full bg-foreground text-background text-xs font-bold">
                    {depth.toFixed(1)}x
                </span>
            </div>

            <div className="overflow-x-auto pb-2">
                <svg
                    viewBox={`0 0 ${TOTAL_W + 20} ${NODE_H + 40}`}
                    width={TOTAL_W + 20}
                    height={NODE_H + 40}
                    className="min-w-full"
                >
                    {steps.map((step, i) => {
                        const x = 10 + i * (NODE_W + GAP)

                        return (
                            <g key={i}>
                                {/* Arrow to next node */}
                                {i < steps.length - 1 && (
                                    <>
                                        <line
                                            x1={x + NODE_W}
                                            y1={CY}
                                            x2={x + NODE_W + GAP - 6}
                                            y2={CY}
                                            stroke="currentColor"
                                            strokeWidth="1"
                                            className="text-border"
                                        />
                                        {/* Arrowhead */}
                                        <polygon
                                            points={`
                                                ${x + NODE_W + GAP - 2},${CY}
                                                ${x + NODE_W + GAP - 8},${CY - 4}
                                                ${x + NODE_W + GAP - 8},${CY + 4}
                                            `}
                                            fill="currentColor"
                                            className="text-border"
                                        />
                                    </>
                                )}

                                {/* Node box */}
                                <rect
                                    x={x}
                                    y={20}
                                    width={NODE_W}
                                    height={NODE_H}
                                    rx="8"
                                    ry="8"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className={
                                        i === 0 || i === steps.length - 1
                                            ? "text-foreground"
                                            : "text-border"
                                    }
                                />

                                {/* Step number */}
                                <text
                                    x={x + 10}
                                    y={20 + 16}
                                    fontSize="9"
                                    fill="currentColor"
                                    className="text-muted-foreground"
                                    fontFamily="monospace"
                                >
                                    {`0${i + 1}`}
                                </text>

                                {/* Label */}
                                <text
                                    x={x + NODE_W / 2}
                                    y={20 + NODE_H / 2 + 2}
                                    fontSize="11"
                                    fontWeight="600"
                                    fill="currentColor"
                                    className="text-foreground"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {step.label}
                                </text>

                                {/* Sub label */}
                                <text
                                    x={x + NODE_W / 2}
                                    y={20 + NODE_H / 2 + 16}
                                    fontSize="9"
                                    fill="currentColor"
                                    className="text-muted-foreground"
                                    textAnchor="middle"
                                >
                                    {step.sub}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            </div>

            <p className="text-xs text-muted-foreground">
                Each loop increases your effective exposure. Higher depth = higher liquidation risk.
            </p>
        </div>
    )
}

// ─── Position rows ────────────────────────────────────────────────────────────

function SupplyRow({ pos }: { pos: UserSupplyPosition }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground w-12">{pos.symbol}</span>
                <span className="text-xs text-muted-foreground">{pos.amount} tokens</span>
                {pos.asCollateral && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-muted/50 text-muted-foreground uppercase tracking-wide">
                        Collateral
                    </span>
                )}
            </div>
            <div className="text-right">
                <div className="text-sm font-semibold text-foreground">{formatUsd(pos.valueUsd)}</div>
            </div>
        </div>
    )
}

function BorrowRow({ pos }: { pos: UserBorrowPosition }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground w-12">{pos.symbol}</span>
                <span className="text-xs text-muted-foreground">{pos.amount} tokens</span>
            </div>
            <div className="text-right">
                <div className="text-sm font-semibold text-foreground">{formatUsd(pos.valueUsd)}</div>
            </div>
        </div>
    )
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded bg-border/60 ${className}`} />
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
    const { data: supplyPositions, isLoading: supplyLoading } = useUserSupplyPositions()
    const { data: borrowPositions, isLoading: borrowLoading } = useUserBorrowPositions()
    const { data: userStats, isLoading: statsLoading } = useUserStats()
    const { healthFactor, isLoading: hfLoading } = useHealthFactor()

    const totalSupplied = supplyPositions.reduce((s, p) => s + p.valueUsd, 0)
    const totalBorrowed = borrowPositions.reduce((s, p) => s + p.valueUsd, 0)

    // Leverage depth: total exposure / net equity
    const leverageDepth = totalSupplied > 0
        ? totalSupplied / Math.max(1, totalSupplied - totalBorrowed)
        : 1

    return (
        <div className="p-6 space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Portfolio</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                    Your positions &amp; leverage depth
                </p>
            </div>

            {/* Summary bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Net Collateral", value: statsLoading ? null : formatUsd(userStats.collateralUsd) },
                    { label: "Total Debt", value: statsLoading ? null : formatUsd(userStats.debtUsd) },
                    { label: "Health Factor", value: null, badge: hfLoading ? null : healthFactor },
                    { label: "Leverage Depth", value: supplyLoading ? null : `${leverageDepth.toFixed(1)}x` },
                ].map(({ label, value, badge }) => (
                    <div key={label} className="rounded-xl border border-border bg-card p-4">
                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                            {label}
                        </div>
                        {badge !== undefined ? (
                            badge === null ? (
                                <Skeleton className="h-6 w-16" />
                            ) : (
                                <HealthFactorBadge value={badge as number} />
                            )
                        ) : value === null ? (
                            <Skeleton className="h-6 w-16" />
                        ) : (
                            <div className="text-lg font-bold text-foreground">{value}</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Supplied assets */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                            Supplied Assets
                        </h2>
                        <span className="text-sm font-semibold text-foreground">
                            {supplyLoading ? <Skeleton className="h-4 w-16 inline-block" /> : formatUsd(totalSupplied)}
                        </span>
                    </div>

                    {supplyLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                        </div>
                    ) : supplyPositions.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                            No positions.{" "}
                            <Link href="/dashboard/markets" className="underline">
                                Supply an asset
                            </Link>
                        </p>
                    ) : (
                        supplyPositions.map((pos) => (
                            <SupplyRow key={pos.symbol} pos={pos} />
                        ))
                    )}
                </div>

                {/* Borrowed assets */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                            Borrowed Assets
                        </h2>
                        <span className="text-sm font-semibold text-foreground">
                            {borrowLoading ? <Skeleton className="h-4 w-16 inline-block" /> : formatUsd(totalBorrowed)}
                        </span>
                    </div>

                    {borrowLoading ? (
                        <div className="space-y-3">
                            {[1, 2].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                        </div>
                    ) : borrowPositions.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                            No borrows.
                        </p>
                    ) : (
                        borrowPositions.map((pos) => (
                            <BorrowRow key={pos.symbol} pos={pos} />
                        ))
                    )}
                </div>
            </div>

            {/* Risk bar */}
            {!hfLoading && !statsLoading && (
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                    <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                        Risk Level
                    </h2>
                    <RiskBar
                        collateralUsd={userStats.collateralUsd}
                        debtUsd={userStats.debtUsd}
                        healthFactor={healthFactor}
                    />
                </div>
            )}

            {/* Leverage loop diagram */}
            <div className="rounded-xl border border-border bg-card p-5">
                <LeverageFlowDiagram depth={leverageDepth} />
            </div>
        </div>
    )
}
