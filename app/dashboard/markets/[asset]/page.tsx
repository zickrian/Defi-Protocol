"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { useMarket, useUserStats } from "@/hooks/useProtocol"
import { HealthFactorBadge } from "@/components/ui/health-factor-badge"
import { HealthFactorModal } from "@/components/ui/health-factor-modal"
import { Button } from "@/components/ui/button"
import {
    formatUsd,
    formatApy,
    formatPercent,
    calculateHfAfterBorrow,
    getHfStatus,
} from "@/lib/mock-data"
import { ArrowLeft, AlertTriangle } from "lucide-react"

// ─── Stat row ────────────────────────────────────────────────────────────────

function StatRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold text-foreground">{value}</span>
        </div>
    )
}

// ─── Supply panel ─────────────────────────────────────────────────────────────

interface SupplyPanelProps {
    symbol: string
    price: number
}

function SupplyPanel({ symbol, price }: SupplyPanelProps) {
    const [amount, setAmount] = useState("")
    const [asCollateral, setAsCollateral] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const valueUsd = Number(amount) * price

    const handleSupply = async () => {
        if (!amount || Number(amount) <= 0) return
        setIsSubmitting(true)
        // TODO: call LendingPool.deposit(asset, amount, onBehalfOf, referralCode)
        await new Promise((r) => setTimeout(r, 1500))
        setIsSubmitting(false)
        setAmount("")
    }

    return (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                Supply
            </h3>

            <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Amount</label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
                    <input
                        type="number"
                        min="0"
                        step="any"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">{symbol}</span>
                </div>
                {amount && Number(amount) > 0 && (
                    <p className="text-xs text-muted-foreground pl-1">
                        ≈ {formatUsd(valueUsd)}
                    </p>
                )}
            </div>

            {/* Collateral checkbox */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={asCollateral}
                    onChange={(e) => setAsCollateral(e.target.checked)}
                    className="w-4 h-4 rounded border-border accent-foreground"
                />
                <span className="text-sm text-foreground">Use as collateral</span>
            </label>

            <Button
                className="w-full"
                onClick={handleSupply}
                disabled={!amount || Number(amount) <= 0 || isSubmitting}
            >
                {isSubmitting ? "Supplying..." : `Supply ${symbol}`}
            </Button>
        </div>
    )
}

// ─── Borrow panel ─────────────────────────────────────────────────────────────

interface BorrowPanelProps {
    symbol: string
    price: number
}

function BorrowPanel({ symbol, price }: BorrowPanelProps) {
    const { data: userStats } = useUserStats()
    const [amount, setAmount] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const borrowUsd = Number(amount) * price

    const hfAfter = amount && Number(amount) > 0
        ? calculateHfAfterBorrow(
            userStats.collateralUsd,
            userStats.debtUsd,
            borrowUsd,
        )
        : userStats.healthFactor

    const isRisky = getHfStatus(hfAfter) !== 'safe'

    const handleBorrowClick = () => {
        if (!amount || Number(amount) <= 0) return
        if (isRisky) {
            setShowModal(true)
        } else {
            executeBorrow()
        }
    }

    const executeBorrow = async () => {
        setShowModal(false)
        setIsSubmitting(true)
        // TODO: call LendingPool.borrow(asset, amount, interestRateMode, referralCode, onBehalfOf)
        await new Promise((r) => setTimeout(r, 1500))
        setIsSubmitting(false)
        setAmount("")
    }

    return (
        <>
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                    Borrow
                </h3>

                <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Amount</label>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
                        <input
                            type="number"
                            min="0"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                        />
                        <span className="text-xs font-semibold text-muted-foreground">{symbol}</span>
                    </div>
                    {amount && Number(amount) > 0 && (
                        <p className="text-xs text-muted-foreground pl-1">
                            ≈ {formatUsd(borrowUsd)}
                        </p>
                    )}
                </div>

                {/* HF preview */}
                {amount && Number(amount) > 0 && (
                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/30 border border-border">
                        <span className="text-xs text-muted-foreground">HF after borrow:</span>
                        <HealthFactorBadge value={hfAfter} />
                        {isRisky && (
                            <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 ml-auto" />
                        )}
                    </div>
                )}

                <Button
                    className="w-full"
                    onClick={handleBorrowClick}
                    disabled={!amount || Number(amount) <= 0 || isSubmitting}
                >
                    {isSubmitting ? "Borrowing..." : `Borrow ${symbol}`}
                </Button>
            </div>

            <HealthFactorModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={executeBorrow}
                healthFactorAfter={hfAfter}
                borrowAmountUsd={borrowUsd}
                borrowSymbol={symbol}
                isLoading={isSubmitting}
            />
        </>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AssetDetailPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()

    const assetSymbol = typeof params.asset === "string"
        ? params.asset.toUpperCase()
        : ""

    const { data: asset, isLoading } = useMarket(assetSymbol)

    // Derive utilization
    const utilPct = asset
        ? (asset.totalBorrowed / asset.totalSupplied) * 100
        : 0

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-32 bg-border/60 rounded" />
                    <div className="h-4 w-48 bg-border/60 rounded" />
                </div>
            </div>
        )
    }

    if (!asset) {
        return (
            <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                    Asset &quot;{assetSymbol}&quot; not found.
                </p>
                <Button variant="outline" onClick={() => router.push("/dashboard/markets")}>
                    Back to Markets
                </Button>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6 max-w-4xl">
            {/* Breadcrumb */}
            <Link
                href="/dashboard/markets"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Markets
            </Link>

            {/* Header */}
            <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl">
                    {asset.icon}
                </span>
                <div>
                    <h1 className="text-xl font-bold text-foreground">{asset.symbol}</h1>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                </div>
                <div className="ml-auto text-right">
                    <div className="text-2xl font-bold font-mono text-foreground">
                        {formatUsd(asset.price)}
                    </div>
                    <div className="text-xs text-muted-foreground">Current Price</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stats */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-3">
                        Market Stats
                    </h3>
                    <StatRow label="Total Supplied" value={formatUsd(asset.totalSupplied)} />
                    <StatRow label="Total Borrowed" value={formatUsd(asset.totalBorrowed)} />
                    <StatRow label="Utilization" value={formatPercent(utilPct)} />
                    <StatRow label="Supply APY" value={formatApy(asset.supplyApy)} />
                    <StatRow label="Borrow APY" value={formatApy(asset.borrowApy)} />
                    <StatRow
                        label="Collateral Factor"
                        value={formatPercent(asset.collateralFactor * 100)}
                    />
                    <StatRow
                        label="Liquidation Threshold"
                        value={formatPercent(asset.liquidationThreshold * 100)}
                    />
                </div>

                {/* Action panels */}
                <div className="space-y-4">
                    <SupplyPanel symbol={asset.symbol} price={asset.price} />
                    <BorrowPanel symbol={asset.symbol} price={asset.price} />
                </div>
            </div>
        </div>
    )
}
