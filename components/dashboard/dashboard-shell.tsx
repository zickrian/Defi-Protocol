"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWallet } from "@/hooks/useWallet"
import { useHealthFactor } from "@/hooks/useProtocol"
import { useChainId, useSwitchChain } from "wagmi"
import { HealthFactorBadge } from "@/components/ui/health-factor-badge"
import { cn } from "@/lib/utils"
import { PROTOCOL_STATS, formatUsd, formatPercent } from "@/lib/mock-data"
import { CHAIN_IDS, robinhoodChain } from "@/lib/config"
import { arbitrumSepolia } from "wagmi/chains"
import {
    LayoutDashboard,
    BarChart3,
    Wallet,
    ArrowLeftRight,
    Skull,
    Vote,
    ChevronDown,
    Settings,
} from "lucide-react"
import React, { useState } from "react"

// ─── Sidebar nav items ───────────────────────────────────────────────────────

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Markets", href: "/dashboard/markets", icon: BarChart3 },
    { label: "Portfolio", href: "/dashboard/portfolio", icon: Wallet },
    { label: "Bridge", href: "/dashboard/bridge", icon: ArrowLeftRight },
    { label: "Liquidations", href: "/dashboard/liquidations", icon: Skull },
    { label: "Governance", href: "/dashboard/governance", icon: Vote },
] as const

// ─── Network selector ─────────────────────────────────────────────────────────

const CHAINS = [
    { id: CHAIN_IDS.robinhoodChain, label: "Robinhood Chain" },
    { id: CHAIN_IDS.arbitrumSepolia, label: "Arbitrum Sepolia" },
]

function NetworkSelector() {
    const chainId = useChainId()
    const { switchChain, isPending } = useSwitchChain()
    const [open, setOpen] = useState(false)

    const current = CHAINS.find((c) => c.id === chainId) ?? CHAINS[0]

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium",
                    "bg-background hover:bg-muted/50 transition-colors",
                    isPending && "opacity-60 pointer-events-none",
                )}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {current.label}
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-1 w-44 rounded-lg border border-border bg-background shadow-lg z-50 overflow-hidden">
                    {CHAINS.map((chain) => (
                        <button
                            key={chain.id}
                            onClick={() => {
                                switchChain({ chainId: chain.id })
                                setOpen(false)
                            }}
                            className={cn(
                                "w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-muted/50 transition-colors",
                                chain.id === chainId && "font-semibold bg-muted/30",
                            )}
                        >
                            <span
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    chain.id === chainId ? "bg-green-500" : "bg-border",
                                )}
                            />
                            {chain.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar() {
    const { displayAddress, disconnect } = useWallet()
    const { healthFactor, isLoading: hfLoading } = useHealthFactor()

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background h-14 flex items-center px-4 gap-4">
            {/* Logo */}
            <Link
                href="/"
                className="text-base font-bold tracking-tight text-foreground shrink-0 w-48"
            >
                Auno
            </Link>

            {/* Network selector */}
            <NetworkSelector />

            {/* Protocol stats — center */}
            <div className="flex-1 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span>
                    TVL:{" "}
                    <span className="font-semibold text-foreground">
                        {formatUsd(PROTOCOL_STATS.tvl)}
                    </span>
                </span>
                <span className="w-px h-3 bg-border" />
                <span>
                    Utilization:{" "}
                    <span className="font-semibold text-foreground">
                        {formatPercent(PROTOCOL_STATS.utilization)}
                    </span>
                </span>
            </div>

            {/* Right — wallet + HF + settings */}
            <div className="flex items-center gap-3 shrink-0">
                {!hfLoading && <HealthFactorBadge value={healthFactor} />}

                {displayAddress && (
                    <span className="text-xs font-mono text-muted-foreground">
                        {displayAddress}
                    </span>
                )}

                <button
                    onClick={() => disconnect()}
                    className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                    title="Settings / Disconnect"
                >
                    <Settings className="w-4 h-4" />
                </button>
            </div>
        </header>
    )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-48 shrink-0 border-r border-border bg-background h-[calc(100vh-56px)] sticky top-14 flex flex-col">
            <nav className="flex flex-col gap-0.5 p-3 flex-1">
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const isActive =
                        href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(href)

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                                isActive
                                    ? "bg-muted text-foreground font-bold"
                                    : "text-muted-foreground font-medium hover:text-foreground hover:bg-muted/50",
                            )}
                        >
                            <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-foreground" : "")} />
                            {label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

interface DashboardShellProps {
    children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopBar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    )
}
