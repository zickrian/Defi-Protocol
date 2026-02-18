"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"

/**
 * Shared layout for all /dashboard/* routes.
 * Users can access the dashboard UI before connecting a wallet.
 * Wallet connection is handled inside the dashboard shell/top bar.
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <DashboardShell>{children}</DashboardShell>
}
