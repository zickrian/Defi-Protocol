"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ArrowUpDown } from "lucide-react"
import { useMarkets, useUserStats } from "@/hooks/useProtocol"
import { useSelectedAsset } from "@/components/dashboard/dashboard-shell"
import { AssetIcon } from "@/components/ui/asset-icon"
import { CollateralRow } from "@/components/dashboard/collateral-row"
import { formatUsd, formatApy, getMarket, MARKETS, USER_SUPPLY_POSITIONS } from "@/lib/mock-data"
import type { AssetSymbol } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

// ─── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
}

// ─── Asset List for Selector ──────────────────────────────────────────────────

const ASSET_LIST = [
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "TSLA", name: "Synthetic Tesla" },
    { symbol: "AMZN", name: "Synthetic Amazon" },
    { symbol: "PLTR", name: "Synthetic Palantir" },
    { symbol: "NFLX", name: "Synthetic Netflix" },
    { symbol: "AMD", name: "Synthetic AMD" },
] as const

// ─── Balance Header ──────────────────────────────────────────────────────────

function BalanceHeader({ symbol }: { symbol: string }) {
    const { setSelectedAsset } = useSelectedAsset()
    const market = getMarket(symbol as AssetSymbol)
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const current = ASSET_LIST.find((a) => a.symbol === symbol) ?? ASSET_LIST[0]

    return (
        <div className="flex items-center justify-between">
            <div className="relative" ref={ref}>
                <p className="text-xs font-medium text-indigo-500 mb-1.5">Balance</p>
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                    <AssetIcon symbol={symbol} size={36} />
                    <div className="text-left">
                        <div className="text-3xl font-semibold text-gray-900 tabular-nums tracking-tight">0.0000</div>
                        <div className="text-xs text-gray-400 mt-0.5">$0.00</div>
                    </div>
                    <ChevronDown className={cn(
                        "w-5 h-5 text-gray-400 transition-transform",
                        open && "rotate-180"
                    )} />
                </button>

                {open && (
                    <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden py-1">
                        {ASSET_LIST.map((asset) => (
                            <button
                                key={asset.symbol}
                                onClick={() => {
                                    setSelectedAsset(asset.symbol)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors",
                                    asset.symbol === symbol && "bg-gray-50 font-semibold",
                                )}
                            >
                                <AssetIcon symbol={asset.symbol} size={24} />
                                <div className="flex-1">
                                    <div className="text-gray-800 font-medium">{asset.symbol}</div>
                                    <div className="text-gray-400 text-xs">{asset.name}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[12px] text-gray-500">+</span>
                    Supply {symbol}
                </button>
                <button className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[12px] text-gray-500">–</span>
                    Borrow {symbol}
                </button>
            </div>
        </div>
    )
}

// ─── Collateral Assets Card ──────────────────────────────────────────────────

function CollateralAssetsCard() {
    const { data: markets, isLoading } = useMarkets()

    // Define display order
    const displayOrder: AssetSymbol[] = ["USDC", "ETH", "BTC", "TSLA", "AMZN", "PLTR", "NFLX", "AMD"]

    // Map user supply positions to balances
    const balanceMap = new Map(
        USER_SUPPLY_POSITIONS.map((p) => [p.symbol, p.amount])
    )

    const orderedMarkets = displayOrder
        .map((sym) => markets.find((m) => m.symbol === sym))
        .filter(Boolean) as typeof markets

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="space-y-6">
                    <Skeleton className="h-5 w-40" />
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            {/* Header row */}
            <div className="flex items-center justify-between pb-3 mb-1">
                <span className="text-[11px] font-medium text-gray-400 tracking-wide">Collateral Asset</span>
                <span className="text-[11px] font-medium text-gray-400 tracking-wide w-24 text-right">Protocol Balance</span>
            </div>

            {/* Asset rows */}
            <div>
                {orderedMarkets.map((market) => (
                    <CollateralRow
                        key={market.symbol}
                        asset={market}
                        balance={balanceMap.get(market.symbol) ?? 0}
                    />
                ))}
            </div>
        </div>
    )
}

// ─── Wallet Balance Card ─────────────────────────────────────────────────────

function WalletBalanceCard({ symbol }: { symbol: string }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-[11px] font-medium text-gray-400 tracking-wide mb-3">
                {symbol} Wallet Balance
            </h3>
            <div className="flex items-center gap-2.5">
                <AssetIcon symbol={symbol} size={28} />
                <span className="text-xl font-semibold text-gray-900 tabular-nums">0.0000</span>
            </div>
        </div>
    )
}

// ─── APR Card ────────────────────────────────────────────────────────────────

function AprCard({ symbol }: { symbol: string }) {
    const market = getMarket(symbol as AssetSymbol)

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-[11px] font-medium text-gray-400 tracking-wide mb-2">
                        Net Borrow APR
                    </h3>
                    <span className="text-lg font-semibold text-gray-900 tabular-nums border-b border-dashed border-gray-300 pb-0.5">
                        {market ? formatApy(market.borrowApy) : "—"}
                    </span>
                </div>
                <div className="text-right">
                    <h3 className="text-[11px] font-medium text-gray-400 tracking-wide mb-2">
                        Net Supply APR
                    </h3>
                    <span className="text-lg font-semibold text-gray-900 tabular-nums border-b border-dashed border-gray-300 pb-0.5">
                        {market ? formatApy(market.supplyApy) : "—"}
                    </span>
                </div>
            </div>
        </div>
    )
}

// ─── Position Summary Card ───────────────────────────────────────────────────

function PositionSummaryCard({ symbol }: { symbol: string }) {
    const { data: userStats, isLoading } = useUserStats()

    const rows = [
        { label: "Collateral Value", value: isLoading ? null : `${userStats.collateralUsd.toFixed(4)} ${symbol}` },
        { label: "Liquidation Point", value: isLoading ? null : `0.0000 ${symbol}` },
        { label: "Borrow Capacity", value: isLoading ? null : `${userStats.maxBorrowUsd.toFixed(4)} ${symbol}` },
        { label: "Available to Borrow", value: isLoading ? null : `${userStats.maxBorrowUsd.toFixed(4)} ${symbol}` },
    ]

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-[11px] font-medium text-gray-400 tracking-wide mb-4">
                Position Summary
            </h3>
            <div className="space-y-0">
                {rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0">
                        <span className="text-[13px] font-medium text-gray-600">{row.label}</span>
                        {row.value ? (
                            <span className="text-[13px] font-medium text-gray-900 tabular-nums">{row.value}</span>
                        ) : (
                            <Skeleton className="h-4 w-24" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const { selectedAsset } = useSelectedAsset()

    return (
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">
            {/* Balance header */}
            <BalanceHeader symbol={selectedAsset} />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.85fr_1fr] gap-6">
                {/* Left — Collateral assets */}
                <CollateralAssetsCard />

                {/* Right — Stacked info cards */}
                <div className="space-y-4">
                    <WalletBalanceCard symbol={selectedAsset} />
                    <AprCard symbol={selectedAsset} />
                    <PositionSummaryCard symbol={selectedAsset} />
                </div>
            </div>
        </div>
    )
}
