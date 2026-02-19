"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { AssetSymbol } from "@/lib/mock-data"
import { useState } from "react"

// Symbols served from /public/icons/ (crypto = SVG, stocks = PNG)
const CRYPTO_SYMBOLS = new Set<string>(["USDC", "ETH", "BTC"])
const STOCK_SYMBOLS = new Set<string>(["TSLA", "AMZN", "PLTR", "NFLX", "AMD"])

// Fallback background colours shown if local file is somehow missing
const SYMBOL_COLORS: Record<string, string> = {
    TSLA: "#DC2626",
    AMZN: "#F59E0B",
    PLTR: "#2563EB",
    NFLX: "#E11D48",
    AMD: "#059669",
}

interface AssetIconProps {
    symbol: AssetSymbol | string
    size?: number
    className?: string
}

// ─── Fallback letter icon ──────────────────────────────────────────────────────
function LetterIcon({
    symbol,
    size,
    className,
}: {
    symbol: string
    size: number
    className?: string
}) {
    const bg = SYMBOL_COLORS[symbol] ?? "#6B7280"
    const fontSize = size * 0.38

    return (
        <div
            className={cn(
                "rounded-full flex items-center justify-center shrink-0 font-bold text-white select-none",
                className,
            )}
            style={{
                width: size,
                height: size,
                backgroundColor: bg,
                fontSize,
                lineHeight: 1,
            }}
            aria-label={symbol}
        >
            {symbol[0]}
        </div>
    )
}

// ─── Stock logo with fallback ─────────────────────────────────────────────────
function StockLogo({
    symbol,
    size,
    className,
}: {
    symbol: string
    size: number
    className?: string
}) {
    const [failed, setFailed] = useState(false)

    if (failed) {
        return <LetterIcon symbol={symbol} size={size} className={className} />
    }

    const innerSize = Math.round(size * 0.7)

    return (
        <div
            className={cn(
                "rounded-full shrink-0 bg-black flex items-center justify-center",
                className,
            )}
            style={{ width: size, height: size }}
        >
            <Image
                src={`/icons/${symbol}.png`}
                alt={`${symbol} logo`}
                width={innerSize}
                height={innerSize}
                className="object-contain"
                onError={() => setFailed(true)}
            />
        </div>
    )
}

// ─── Main AssetIcon component ─────────────────────────────────────────────────
export function AssetIcon({ symbol, size = 32, className }: AssetIconProps) {
    // Crypto → local SVG
    if (CRYPTO_SYMBOLS.has(symbol)) {
        return (
            <Image
                src={`/icons/${symbol.toLowerCase()}.svg`}
                alt={symbol}
                width={size}
                height={size}
                className={cn("rounded-full", className)}
            />
        )
    }

    // Stock → real logo from GitHub repo
    return <StockLogo symbol={symbol} size={size} className={className} />
}
