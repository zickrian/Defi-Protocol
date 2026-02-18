"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { useMarket, useUserStats } from "@/hooks/useProtocol"
import { HealthFactorBadge } from "@/components/ui/health-factor-badge"
import { HealthFactorModal } from "@/components/ui/health-factor-modal"
import { AssetIcon } from "@/components/ui/asset-icon"
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
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
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
        <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Supply
            </h3>

            <div className="space-y-1.5">
                <label className="text-xs text-gray-500">Amount</label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 focus-within:ring-1 focus-within:ring-indigo-300">
                    <input
                        type="number"
                        min="0"
                        step="any"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                    />
                    <span className="text-xs font-semibold text-gray-500">{symbol}</span>
                </div>
                {amount && Number(amount) > 0 && (
                    <p className="text-xs text-gray-500 pl-1">
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
                    className="w-4 h-4 rounded border-gray-300 accent-indigo-500"
                />
                <span className="text-sm text-gray-900">Use as collateral</span>
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
            <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Borrow
                </h3>

                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500">Amount</label>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 focus-within:ring-1 focus-within:ring-indigo-300">
                        <input
                            type="number"
                            min="0"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                        />
                        <span className="text-xs font-semibold text-gray-500">{symbol}</span>
                    </div>
                    {amount && Number(amount) > 0 && (
                        <p className="text-xs text-gray-500 pl-1">
                            ≈ {formatUsd(borrowUsd)}
                        </p>
                    )}
                </div>

                {/* HF preview */}
                {amount && Number(amount) > 0 && (
                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <span className="text-xs text-gray-500">HF after borrow:</span>
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
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-48 bg-gray-200 rounded" />
                </div>
            </div>
        )
    }

    if (!asset) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-8 space-y-4">
                <p className="text-sm text-gray-500">
                    Asset &quot;{assetSymbol}&quot; not found.
                </p>
                <Button variant="outline" onClick={() => router.push("/dashboard/markets")}>
                    Back to Markets
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
            {/* Breadcrumb */}
            <Link
                href="/dashboard/markets"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Markets
            </Link>

            {/* Header */}
            <div className="flex items-center gap-4">
                <AssetIcon symbol={asset.symbol} size={48} />
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{asset.symbol}</h1>
                    <p className="text-sm text-gray-500">{asset.name}</p>
                </div>
                <div className="ml-auto text-right">
                    <div className="text-2xl font-bold font-mono text-gray-900">
                        {formatUsd(asset.price)}
                    </div>
                    <div className="text-xs text-gray-400">Current Price</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stats */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
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
