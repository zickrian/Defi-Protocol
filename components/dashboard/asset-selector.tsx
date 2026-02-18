"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { AssetIcon } from "@/components/ui/asset-icon"
import { cn } from "@/lib/utils"

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

interface AssetSelectorProps {
    selectedAsset: string
    onSelect: (symbol: string) => void
}

export function AssetSelector({ selectedAsset, onSelect }: AssetSelectorProps) {
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

    const current = ASSET_LIST.find((a) => a.symbol === selectedAsset) ?? ASSET_LIST[0]

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200",
                    "bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700",
                )}
            >
                <AssetIcon symbol={current.symbol} size={20} />
                <span>{current.symbol}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-1.5 w-52 rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden py-1">
                    {ASSET_LIST.map((asset) => (
                        <button
                            key={asset.symbol}
                            onClick={() => {
                                onSelect(asset.symbol)
                                setOpen(false)
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors",
                                asset.symbol === selectedAsset && "bg-gray-50 font-semibold",
                            )}
                        >
                            <AssetIcon symbol={asset.symbol} size={24} />
                            <span className="text-gray-800">{asset.symbol}</span>
                            <span className="text-gray-400 text-xs ml-auto">{asset.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
