"use client"

import { useWallet } from "@/hooks/useWallet"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

/**
 * Shared layout for all /dashboard/* routes.
 * Handles wallet auth guard — redirects to landing if not connected.
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isConnected, isConnecting } = useWallet()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected && !isConnecting) {
            router.push("/")
        }
    }, [isConnected, isConnecting, router])

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-muted-foreground">Connecting...</p>
                </div>
            </div>
        )
    }

    return <DashboardShell>{children}</DashboardShell>
}
