"use client"

import { useQuery } from "@tanstack/react-query"
import type { PriceEntry } from "@/app/api/prices/route"

export type LivePrices = Record<string, PriceEntry>

async function fetchPrices(): Promise<LivePrices> {
    const res = await fetch("/api/prices")
    if (!res.ok) throw new Error("Failed to fetch live prices")
    return res.json()
}

export function useLivePrices() {
    return useQuery<LivePrices>({
        queryKey: ["live-prices"],
        queryFn: fetchPrices,
        refetchInterval: 30_000,   // re-fetch every 30s
        staleTime:       25_000,   // treat data as fresh for 25s
        retry: 2,
    })
}
