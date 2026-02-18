"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWallet } from "@/hooks/useWallet"
import { cn } from "@/lib/utils"
import React, { useState, createContext, useContext } from "react"

// ─── Selected asset context (shared across dashboard) ──────────────────────

interface AssetCtx {
    selectedAsset: string
    setSelectedAsset: (s: string) => void
}

const AssetContext = createContext<AssetCtx>({
    selectedAsset: "USDC",
    setSelectedAsset: () => {},
})

export function useSelectedAsset() {
    return useContext(AssetContext)
}

// ─── Navigation items ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Markets", href: "/dashboard/markets" },
    { label: "Governance", href: "/dashboard/governance" },
    { label: "Savings", href: "/dashboard/savings" },
    { label: "Staking", href: "/dashboard/staking" },
] as const

// ─── Top Navigation Bar ───────────────────────────────────────────────────────

function TopNavBar() {
    const pathname = usePathname()
    const { displayAddress, disconnect, handleConnect, isConnected, isConnecting } = useWallet()
    const { selectedAsset, setSelectedAsset } = useSelectedAsset()

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
            <div className="h-14 flex items-center px-6 gap-5 max-w-6xl mx-auto">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-base font-semibold tracking-tight text-gray-900 shrink-0"
                >
                    Auno
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-0.5 flex-1">
                    {NAV_ITEMS.map(({ label, href }) => {
                        const isActive =
                            href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname.startsWith(href)

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "relative px-3 py-1.5 text-[13px] font-medium transition-colors rounded-md",
                                    isActive
                                        ? "text-gray-900"
                                        : "text-gray-400 hover:text-gray-700",
                                )}
                            >
                                {label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-indigo-500 rounded-full translate-y-[calc(50%+12px)]" />
                                )}
                            </Link>
                        )
                    })}

                    {/* More — static label */}
                    <span className="px-3 py-1.5 text-[13px] font-medium text-gray-300 cursor-default select-none">
                        More
                    </span>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3 shrink-0">
                    {isConnected ? (
                        <button
                            onClick={() => disconnect()}
                            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {displayAddress}
                        </button>
                    ) : (
                        <button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className="px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[13px] font-medium hover:bg-indigo-600 transition-colors disabled:opacity-60"
                        >
                            {isConnecting ? "Connecting…" : "Connect Wallet"}
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

interface DashboardShellProps {
    children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    const [selectedAsset, setSelectedAsset] = useState("USDC")

    return (
        <AssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
                <TopNavBar />
                <main className="flex-1">{children}</main>
            </div>
        </AssetContext.Provider>
    )
}
