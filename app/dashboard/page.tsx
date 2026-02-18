"use client";

import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Wallet, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { isConnected, isConnecting, address, displayAddress, disconnect } = useWallet()
    const router = useRouter()

    // Redirect ke home jika tidak terkoneksi
    useEffect(() => {
        if (!isConnected && !isConnecting) {
            router.push('/')
        }
    }, [isConnected, isConnecting, router])

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">Redirecting...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="text-xl font-bold tracking-tight text-text">
                            Auno
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-medium text-emerald-700">Connected</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full gap-2"
                                onClick={() => disconnect()}
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                Disconnect
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-10">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-text">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Welcome to Auno Protocol
                        </p>
                    </div>

                    {/* Wallet Card */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm max-w-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                                <Wallet className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-text">Connected Wallet</div>
                                <div className="text-xs text-muted-foreground">MetaMask</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Address</div>
                            <div className="font-mono text-sm font-medium text-text bg-gray-50 rounded-lg px-3 py-2 break-all">
                                {address}
                            </div>
                        </div>
                        <a
                            href={`https://etherscan.io/address/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            View on Etherscan
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>

                    {/* Stats Placeholder */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Collateral Deposited", value: "—" },
                            { label: "USDC Borrowed", value: "—" },
                            { label: "Health Factor", value: "—" },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                                <div className="text-2xl font-bold text-text">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Coming Soon */}
                    <div className="rounded-2xl border border-dashed border-border bg-gray-50/50 p-12 text-center">
                        <div className="text-muted-foreground text-sm">
                            Full DApp interface coming soon
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
