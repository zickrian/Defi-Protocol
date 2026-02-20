import { AssetIcon } from "@/components/ui/asset-icon"
import type { MarketAsset } from "@/lib/mock-data"

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
            <div className="text-[13px] font-medium text-gray-900 tabular-nums w-24 text-right">
                {balance.toFixed(4)}
            </div>
        </div>
    )
}
