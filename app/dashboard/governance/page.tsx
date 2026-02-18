"use client"

import { Vote } from "lucide-react"

export default function GovernancePage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-2">
                <Vote className="w-5 h-5 text-gray-400" />
                <h1 className="text-xl font-bold text-gray-900">Governance</h1>
            </div>
            <p className="text-sm text-gray-500 mb-8">
                Protocol parameter votes &amp; proposals
            </p>

            <div className="bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm p-12 text-center">
                <Vote className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-900 mb-1">Coming Soon</p>
                <p className="text-xs text-gray-500">
                    On-chain governance is live on mainnet launch.
                    Token voting, proposal creation, and delegation will appear here.
                </p>
            </div>
        </div>
    )
}
