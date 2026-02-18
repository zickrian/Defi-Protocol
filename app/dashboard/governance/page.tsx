"use client"

import { Vote } from "lucide-react"

export default function GovernancePage() {
    return (
        <div className="p-6 max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
                <Vote className="w-5 h-5 text-muted-foreground" />
                <h1 className="text-xl font-bold text-foreground">Governance</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
                Protocol parameter votes &amp; proposals
            </p>

            <div className="rounded-xl border border-dashed border-border bg-muted/10 p-12 text-center">
                <Vote className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">Coming Soon</p>
                <p className="text-xs text-muted-foreground">
                    On-chain governance is live on mainnet launch.
                    Token voting, proposal creation, and delegation will appear here.
                </p>
            </div>
        </div>
    )
}
