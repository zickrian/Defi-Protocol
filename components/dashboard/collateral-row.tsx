import { AssetIcon } from "@/components/ui/asset-icon"
import { Plus, Minus } from "lucide-react"
import type { AssetSymbol, MarketAsset } from "@/lib/mock-data"

interface CollateralRowProps {
    asset: MarketAsset
    balance?: number
}

export function CollateralRow({ asset, balance = 0 }: CollateralRowProps) {
    return (
        <div className="flex items-center gap-3.5 py-3.5 border-b border-gray-50 last:border-b-0">
            {/* Icon + name */}
            <AssetIcon symbol={asset.symbol} size={32} />
            <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-gray-900 leading-tight">{asset.name}</div>
                <div className="text-[11px] text-gray-400">{asset.symbol}</div>
            </div>

            {/* Protocol balance */}
            <div className="text-[13px] font-medium text-gray-900 tabular-nums w-20 text-right">
                {balance.toFixed(4)}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 ml-1">
                <button
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                    aria-label={`Supply ${asset.symbol}`}
                >
                    <Plus className="w-3 h-3" />
                </button>
                <button
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                    aria-label={`Withdraw ${asset.symbol}`}
                >
                    <Minus className="w-3 h-3" />
                </button>
            </div>
        </div>
    )
}
