import Image from "next/image"
import { cn } from "@/lib/utils"
import type { AssetSymbol } from "@/lib/mock-data"

// Deterministic background colours for stock-ticker letter icons
const STOCK_COLORS: Record<string, string> = {
    T: "#DC2626", // TSLA — red
    A: "#F59E0B", // AMZN / AMD — amber
    P: "#2563EB", // PLTR — blue
    N: "#E11D48", // NFLX — rose
    M: "#059669", // AMD fallback — emerald
}

// Which symbols have SVG files in /icons/
const CRYPTO_SYMBOLS = new Set<string>(["USDC", "ETH", "BTC"])

// Map symbols to specific colours to avoid letter collisions
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

export function AssetIcon({ symbol, size = 32, className }: AssetIconProps) {
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

    // Stock ticker — letter-based circular icon
    const bg = SYMBOL_COLORS[symbol] ?? STOCK_COLORS[symbol[0]] ?? "#6B7280"
    const fontSize = size * 0.45

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
