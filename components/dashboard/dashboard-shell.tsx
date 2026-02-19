"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWallet } from "@/hooks/useWallet"
import { cn } from "@/lib/utils"
import React, { useState, createContext, useContext, useRef, useEffect } from "react"
import { Copy, LogOut, ChevronDown, Check, ExternalLink } from "lucide-react"

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

// ─── Wallet Dropdown ──────────────────────────────────────────────────────────

function WalletDropdown({ address, displayAddress, onDisconnect }: {
    address: string
    displayAddress: string
    onDisconnect: () => void
}) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const explorerUrl = `https://explorer.testnet.chain.robinhood.com/address/${address}`

    return (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/80 overflow-hidden z-50">
            <div className="p-2 flex flex-col gap-1">
                {/* Address + copy */}
                <button
                    onClick={handleCopy}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] font-medium text-gray-700 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            <span className="text-green-600">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate">{displayAddress}</span>
                        </>
                    )}
                </button>

                {/* Explorer */}
                <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] font-medium text-gray-700 transition-colors"
                >
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    Explorer
                </a>

                <div className="h-px bg-gray-100 mx-1" />

                {/* Disconnect */}
                <button
                    onClick={onDisconnect}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-50 text-[13px] font-medium text-gray-500 hover:text-red-600 transition-colors group"
                >
                    <LogOut className="w-3.5 h-3.5 group-hover:text-red-500 transition-colors shrink-0" />
                    Disconnect wallet
                </button>
            </div>
        </div>
    )
}

// ─── Wallet Button ────────────────────────────────────────────────────────────

function WalletButton() {
    const { address, displayAddress, disconnect, handleConnect, isConnected, isConnecting } = useWallet()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [open])

    if (!isConnected) {
        return (
            <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="px-4 py-1.5 rounded-full bg-indigo-500 text-white text-[13px] font-medium hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-60"
            >
                {isConnecting ? "Connecting…" : "Connect Wallet"}
            </button>
        )
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className={cn(
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[13px] font-medium transition-all",
                    open
                        ? "bg-gray-100 border-gray-200 text-gray-800"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                )}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {displayAddress}
                <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform duration-200", open && "rotate-180")} />
            </button>

            {open && address && (
                <WalletDropdown
                    address={address}
                    displayAddress={displayAddress ?? address}
                    onDisconnect={() => {
                        disconnect()
                        setOpen(false)
                    }}
                />
            )}
        </div>
    )
}

// ─── Top Navigation Bar ───────────────────────────────────────────────────────

function TopNavBar() {
    const pathname = usePathname()

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
                    <WalletButton />
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
