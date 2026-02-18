"use client"

import Link from "next/link"
import { useMarkets } from "@/hooks/useProtocol"
import { formatUsd, formatApy, type MarketAsset } from "@/lib/mock-data"
import { AssetIcon } from "@/components/ui/asset-icon"
import { Button } from "@/components/ui/button"

// ─── Skeleton row ────────────────────────────────────────────────────────────

function SkeletonRow() {
    return (
        <tr className="border-b border-gray-100">
            {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="px-4 py-4">
                    <div className="h-4 rounded bg-gray-200 animate-pulse w-16" />
                </td>
            ))}
        </tr>
    )
}

// ─── Utilization bar ─────────────────────────────────────────────────────────

function UtilBar({ utilized, total }: { utilized: number; total: number }) {
    const pct = total === 0 ? 0 : Math.min(100, (utilized / total) * 100)
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden w-16">
                <div
                    className="h-full rounded-full bg-gray-800"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className="text-xs text-gray-400 tabular-nums">
                {pct.toFixed(0)}%
            </span>
        </div>
    )
}

// ─── Table row ────────────────────────────────────────────────────────────────

function AssetRow({ asset }: { asset: MarketAsset }) {
    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors group">
            {/* Asset */}
            <td className="px-4 py-3.5">
                <Link
                    href={`/dashboard/markets/${asset.symbol.toLowerCase()}`}
                    className="flex items-center gap-2.5 group-hover:text-gray-900 transition-colors"
                >
                    <AssetIcon symbol={asset.symbol} size={28} />
                    <div>
                        <div className="text-sm font-semibold text-gray-900">
                            {asset.symbol}
                        </div>
                        <div className="text-xs text-gray-400">{asset.name}</div>
                    </div>
                </Link>
            </td>

            {/* Price */}
            <td className="px-4 py-3.5 text-sm font-mono text-gray-900 tabular-nums">
                {formatUsd(asset.price)}
            </td>

            {/* Supply APY */}
            <td className="px-4 py-3.5">
                <span className="text-sm font-semibold text-green-600">
                    {formatApy(asset.supplyApy)}
                </span>
            </td>

            {/* Borrow APY */}
            <td className="px-4 py-3.5">
                <span className="text-sm font-semibold text-gray-900">
                    {formatApy(asset.borrowApy)}
                </span>
            </td>

            {/* Total Supplied */}
            <td className="px-4 py-3.5 text-sm text-gray-900 tabular-nums">
                {formatUsd(asset.totalSupplied)}
            </td>

            {/* Total Borrowed + util bar */}
            <td className="px-4 py-3.5">
                <div className="text-sm text-gray-900 tabular-nums mb-1">
                    {formatUsd(asset.totalBorrowed)}
                </div>
                <UtilBar utilized={asset.totalBorrowed} total={asset.totalSupplied} />
            </td>

            {/* Actions */}
            <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                    <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs px-2.5"
                    >
                        <Link href={`/dashboard/markets/${asset.symbol.toLowerCase()}?action=supply`}>
                            Supply
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="sm"
                        className="h-7 text-xs px-2.5"
                    >
                        <Link href={`/dashboard/markets/${asset.symbol.toLowerCase()}?action=borrow`}>
                            Borrow
                        </Link>
                    </Button>
                </div>
            </td>
        </tr>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MarketsPage() {
    const { data: markets, isLoading } = useMarkets()

    return (
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Markets</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Synthetic stocks &amp; crypto — supply or borrow
                    </p>
                </div>
                <span className="text-xs text-gray-400">
                    {markets.length} assets
                </span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            {[
                                "Asset",
                                "Price",
                                "Supply APY",
                                "Borrow APY",
                                "Total Supplied",
                                "Total Borrowed",
                                "Actions",
                            ].map((col) => (
                                <th
                                    key={col}
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <SkeletonRow key={i} />
                            ))
                            : markets.map((asset) => (
                                <AssetRow key={asset.symbol} asset={asset} />
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Footnote */}
            <p className="text-xs text-gray-400">
                Prices sourced from Auno PriceOracle. APY rates update every block.
            </p>
        </div>
    )
}
