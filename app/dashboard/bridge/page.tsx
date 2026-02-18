"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MARKETS, formatUsd, type AssetSymbol } from "@/lib/mock-data"
import { ArrowLeftRight, Clock, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type TxStatus = "idle" | "pending" | "success" | "error"

interface BridgeState {
    asset: AssetSymbol
    amount: string
    destinationAddress: string
}

// ─── Status box ──────────────────────────────────────────────────────────────

interface TxStatusBoxProps {
    status: TxStatus
    direction: "toArbitrum" | "toRobinhood"
    asset: string
    amount: string
}

function TxStatusBox({ status, direction, asset, amount }: TxStatusBoxProps) {
    if (status === "idle") return null

    const label =
        direction === "toArbitrum" ? "Robinhood → Arbitrum Sepolia" : "Arbitrum Sepolia → Robinhood"

    return (
        <div
            className={cn(
                "rounded-xl border p-4 flex items-start gap-3",
                status === "pending" && "border-yellow-200 bg-yellow-50",
                status === "success" && "border-green-200 bg-green-50",
                status === "error" && "border-red-200 bg-red-50",
            )}
        >
            {status === "pending" && (
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0 animate-pulse" />
            )}
            {status === "success" && (
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
            )}
            {status === "error" && (
                <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            )}

            <div className="space-y-0.5">
                <p
                    className={cn(
                        "text-sm font-semibold",
                        status === "pending" && "text-yellow-700",
                        status === "success" && "text-green-700",
                        status === "error" && "text-red-700",
                    )}
                >
                    {status === "pending" && "Transaction Pending..."}
                    {status === "success" && "Bridge Confirmed"}
                    {status === "error" && "Transaction Failed"}
                </p>
                <p className="text-xs text-muted-foreground">
                    {amount} {asset} — {label}
                </p>
                {status === "pending" && (
                    <p className="text-xs text-muted-foreground">
                        Cross-chain messages typically take 2–5 minutes.
                    </p>
                )}
            </div>
        </div>
    )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

interface BridgePanelProps {
    title: string
    from: string
    to: string
    state: BridgeState
    onStateChange: (s: Partial<BridgeState>) => void
    onSubmit: () => void
    isLoading: boolean
    showDestination?: boolean
    buttonLabel: string
}

function BridgePanel({
    title,
    from,
    to,
    state,
    onStateChange,
    onSubmit,
    isLoading,
    showDestination = false,
    buttonLabel,
}: BridgePanelProps) {
    const selectedMarket = MARKETS.find((m) => m.symbol === state.asset)

    return (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <span className="text-xs text-muted-foreground">
                    {from} → {to}
                </span>
            </div>

            {/* Asset selector */}
            <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Asset</label>
                <select
                    value={state.asset}
                    onChange={(e) => onStateChange({ asset: e.target.value as AssetSymbol })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
                >
                    {MARKETS.map((m) => (
                        <option key={m.symbol} value={m.symbol}>
                            {m.symbol} — {m.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Amount</label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
                    <input
                        type="number"
                        min="0"
                        step="any"
                        value={state.amount}
                        onChange={(e) => onStateChange({ amount: e.target.value })}
                        placeholder="0.00"
                        className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">{state.asset}</span>
                </div>
                {state.amount && Number(state.amount) > 0 && selectedMarket && (
                    <p className="text-xs text-muted-foreground pl-1">
                        ≈ {formatUsd(Number(state.amount) * selectedMarket.price)}
                    </p>
                )}
            </div>

            {/* Optional destination address */}
            {showDestination && (
                <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">
                        Destination Address{" "}
                        <span className="text-muted-foreground/60">(optional — defaults to connected wallet)</span>
                    </label>
                    <input
                        type="text"
                        value={state.destinationAddress}
                        onChange={(e) => onStateChange({ destinationAddress: e.target.value })}
                        placeholder="0x..."
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                    />
                </div>
            )}

            <Button
                className="w-full"
                onClick={onSubmit}
                disabled={!state.amount || Number(state.amount) <= 0 || isLoading}
            >
                {isLoading ? "Bridging..." : buttonLabel}
            </Button>
        </div>
    )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BridgePage() {
    const [toArbitrumState, setToArbitrumState] = useState<BridgeState>({
        asset: "USDC",
        amount: "",
        destinationAddress: "",
    })
    const [toRobinhoodState, setToRobinhoodState] = useState<BridgeState>({
        asset: "USDC",
        amount: "",
        destinationAddress: "",
    })

    const [toArbitrumStatus, setToArbitrumStatus] = useState<TxStatus>("idle")
    const [toRobinhoodStatus, setToRobinhoodStatus] = useState<TxStatus>("idle")

    const handleBridgeToArbitrum = async () => {
        setToArbitrumStatus("pending")
        // TODO: call BridgeAdapter.bridgeToArbitrum(asset, amount, destination)
        await new Promise((r) => setTimeout(r, 3000))
        setToArbitrumStatus("success")
    }

    const handleReturnToRobinhood = async () => {
        setToRobinhoodStatus("pending")
        // TODO: call BridgeAdapter.bridgeToRobinhood(asset, amount)
        await new Promise((r) => setTimeout(r, 3000))
        setToRobinhoodStatus("success")
    }

    return (
        <div className="p-6 space-y-6 max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
                <div>
                    <h1 className="text-xl font-bold text-foreground">Bridge</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Move assets between Robinhood Chain and Arbitrum Sepolia
                    </p>
                </div>
            </div>

            {/* Info banner */}
            <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                    Bridge transactions use the Auno BridgeAdapter contract. Cross-chain messages are
                    secured by the canonical Arbitrum bridge and typically finalize in 2–5 minutes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <BridgePanel
                        title="To Arbitrum"
                        from="Robinhood Chain"
                        to="Arbitrum Sepolia"
                        state={toArbitrumState}
                        onStateChange={(s) =>
                            setToArbitrumState((prev) => ({ ...prev, ...s }))
                        }
                        onSubmit={handleBridgeToArbitrum}
                        isLoading={toArbitrumStatus === "pending"}
                        showDestination
                        buttonLabel="Bridge to Arbitrum"
                    />
                    <TxStatusBox
                        status={toArbitrumStatus}
                        direction="toArbitrum"
                        asset={toArbitrumState.asset}
                        amount={toArbitrumState.amount}
                    />
                </div>

                <div className="space-y-3">
                    <BridgePanel
                        title="To Robinhood"
                        from="Arbitrum Sepolia"
                        to="Robinhood Chain"
                        state={toRobinhoodState}
                        onStateChange={(s) =>
                            setToRobinhoodState((prev) => ({ ...prev, ...s }))
                        }
                        onSubmit={handleReturnToRobinhood}
                        isLoading={toRobinhoodStatus === "pending"}
                        buttonLabel="Return to Robinhood"
                    />
                    <TxStatusBox
                        status={toRobinhoodStatus}
                        direction="toRobinhood"
                        asset={toRobinhoodState.asset}
                        amount={toRobinhoodState.amount}
                    />
                </div>
            </div>
        </div>
    )
}
