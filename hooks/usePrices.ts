"use client"

import { useState, useEffect } from "react"
import type { PriceEntry } from "@/app/api/prices/route"

export type LivePrices = Record<string, PriceEntry>

async function fetchPrices(): Promise<LivePrices> {
    // Add timestamp to prevent caching
    const timestamp = Date.now();
    const res = await fetch(`/api/prices?t=${timestamp}`, {
        cache: "no-store",
        headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
        },
    })
    if (!res.ok) throw new Error("Failed to fetch live prices")
    const data = await res.json()
    return data
}

export function useLivePrices() {
    const [data, setData] = useState<LivePrices | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [dataUpdatedAt, setDataUpdatedAt] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let isMounted = true;

        const loadPrices = async () => {
            setIsFetching(true);
            try {
                const prices = await fetchPrices();
                console.log("[Hook] Prices loaded:", Object.keys(prices).length, "symbols");
                if (isMounted) {
                    // Only update if we got valid data
                    if (prices && Object.keys(prices).length > 0) {
                        setData(prices);
                        setDataUpdatedAt(Date.now());
                        setError(null);
                    }
                    setIsLoading(false);
                    setIsFetching(false);
                }
            } catch (err) {
                console.error("[Hook] Error fetching prices:", err);
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error("Failed to fetch prices"));
                    setIsLoading(false);
                    setIsFetching(false);
                    // Don't clear data on error, keep showing last known prices
                }
            }
        };

        // Initial load
        loadPrices();

        // Set up interval to refetch every 3 seconds
        intervalId = setInterval(() => {
            loadPrices();
        }, 3000);

        return () => {
            isMounted = false;
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return {
        data,
        isLoading,
        error,
        dataUpdatedAt,
        isFetching,
    };
}