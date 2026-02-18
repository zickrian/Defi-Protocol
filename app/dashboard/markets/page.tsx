"use client"

import Link from "next/link"
import { useMarkets } from "@/hooks/useProtocol"
import { formatUsd, formatApy, type MarketAsset } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

// ─── Skeleton row ────────────────────────────────────────────────────────────

function SkeletonRow() {
    return (
        <tr className="border-b border-border">
            {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="px-4 py-4">
                    <div className="h-4 rounded bg-border/60 animate-pulse w-16" />
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
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden w-16">
                <div
                    className="h-full rounded-full bg-foreground"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
                {pct.toFixed(0)}%
            </span>
        </div>
    )
}

// ─── Table row ────────────────────────────────────────────────────────────────

function AssetRow({ asset }: { asset: MarketAsset }) {
    return (
        <tr className="border-b border-border hover:bg-muted/20 transition-colors group">
            {/* Asset */}
            <td className="px-4 py-3.5">
                <Link
                    href={`/dashboard/markets/${asset.symbol.toLowerCase()}`}
                    className="flex items-center gap-2.5 group-hover:text-foreground transition-colors"
                >
                    <span className="w-7 h-7 rounded-md bg-muted/50 flex items-center justify-center text-sm select-none">
                        {asset.icon}
                    </span>
                    <div>
                        <div className="text-sm font-semibold text-foreground">
                            {asset.symbol}
                        </div>
                        <div className="text-xs text-muted-foreground">{asset.name}</div>
                    </div>
                </Link>
            </td>

            {/* Price */}
            <td className="px-4 py-3.5 text-sm font-mono text-foreground tabular-nums">
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
                <span className="text-sm font-semibold text-foreground">
                    {formatApy(asset.borrowApy)}
                </span>
            </td>

            {/* Total Supplied */}
            <td className="px-4 py-3.5 text-sm text-foreground tabular-nums">
                {formatUsd(asset.totalSupplied)}
            </td>

            {/* Total Borrowed + util bar */}
            <td className="px-4 py-3.5">
                <div className="text-sm text-foreground tabular-nums mb-1">
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
        <div className="p-6 space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground">Markets</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Synthetic stocks &amp; crypto — supply or borrow
                    </p>
                </div>
                <span className="text-xs text-muted-foreground">
                    {markets.length} assets
                </span>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/20">
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
                                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest"
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
            <p className="text-xs text-muted-foreground">
                Prices sourced from Auno PriceOracle. APY rates update every block.
            </p>
        </div>
    )
}
