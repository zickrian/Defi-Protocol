"use client"

import { useProtocolStats, useUserStats, useHealthFactor } from "@/hooks/useProtocol"
import { useWallet } from "@/hooks/useWallet"
import { HealthFactorBadge } from "@/components/ui/health-factor-badge"
import { RiskBar } from "@/components/ui/risk-bar"
import { formatUsd, formatPercent } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

// ─── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded bg-border/60 ${className}`}
        />
    )
}

// ─── Protocol overview cards ─────────────────────────────────────────────────

interface StatCardProps {
    label: string
    value: string
    sub?: string
    icon: React.ReactNode
    isLoading?: boolean
}

function StatCard({ label, value, sub, icon, isLoading }: StatCardProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {label}
                </span>
                <span className="text-muted-foreground">{icon}</span>
            </div>
            {isLoading ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <div>
                    <div className="text-2xl font-bold text-foreground">{value}</div>
                    {sub && (
                        <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
                    )}
                </div>
            )}
        </div>
    )
}

// ─── User position card ───────────────────────────────────────────────────────

function UserPositionCard() {
    const { data: userStats, isLoading } = useUserStats()
    const { healthFactor, isLoading: hfLoading } = useHealthFactor()
    const { displayAddress } = useWallet()

    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                    Your Position
                </h2>
                {displayAddress && (
                    <span className="text-xs font-mono text-muted-foreground">
                        {displayAddress}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left — numbers */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Your Collateral</div>
                            {isLoading ? (
                                <Skeleton className="h-6 w-20" />
                            ) : (
                                <div className="text-xl font-bold text-foreground">
                                    {formatUsd(userStats.collateralUsd)}
                                </div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Your Debt</div>
                            {isLoading ? (
                                <Skeleton className="h-6 w-20" />
                            ) : (
                                <div className="text-xl font-bold text-foreground">
                                    {formatUsd(userStats.debtUsd)}
                                </div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Health Factor</div>
                            {hfLoading ? (
                                <Skeleton className="h-6 w-16" />
                            ) : (
                                <HealthFactorBadge value={healthFactor} className="mt-0.5" />
                            )}
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Max Borrow</div>
                            {isLoading ? (
                                <Skeleton className="h-6 w-16" />
                            ) : (
                                <div className="text-xl font-bold text-foreground">
                                    {formatUsd(userStats.maxBorrowUsd)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right — risk bar */}
                <div className="flex flex-col justify-center space-y-3">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                        Risk Level
                    </div>
                    {hfLoading ? (
                        <Skeleton className="h-4 w-full rounded-full" />
                    ) : (
                        <RiskBar
                            collateralUsd={userStats.collateralUsd}
                            debtUsd={userStats.debtUsd}
                            healthFactor={healthFactor}
                        />
                    )}
                    <p className="text-xs text-muted-foreground">
                        Keep HF above 1.3 to avoid liquidation risk.
                    </p>
                </div>
            </div>
        </div>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const { data: stats, isLoading } = useProtocolStats()

    return (
        <div className="p-6 space-y-6 max-w-5xl">
            {/* Page title */}
            <div>
                <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                    Protocol overview &amp; your position
                </p>
            </div>

            {/* Protocol overview — 4 cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Market Size"
                    value={formatUsd(stats.tvl)}
                    sub="Total Value Locked"
                    icon={<DollarSign className="w-4 h-4" />}
                    isLoading={isLoading}
                />
                <StatCard
                    label="Total Supplied"
                    value={formatUsd(stats.totalSupplied)}
                    icon={<TrendingUp className="w-4 h-4" />}
                    isLoading={isLoading}
                />
                <StatCard
                    label="Total Borrowed"
                    value={formatUsd(stats.totalBorrowed)}
                    icon={<TrendingDown className="w-4 h-4" />}
                    isLoading={isLoading}
                />
                <StatCard
                    label="Utilization"
                    value={formatPercent(stats.utilization)}
                    sub={`${formatUsd(stats.totalBorrowed)} / ${formatUsd(stats.totalSupplied)}`}
                    icon={<Activity className="w-4 h-4" />}
                    isLoading={isLoading}
                />
            </div>

            {/* User position */}
            <UserPositionCard />
        </div>
    )
}
