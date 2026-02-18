/**
 * useProtocol — protocol-level stats hook
 *
 * Currently returns mock data.
 * To connect to real contracts, replace the return value with:
 *
 *   const { data } = useReadContract({
 *     address: LENDING_POOL_ADDRESS,
 *     abi: LENDING_POOL_ABI,
 *     functionName: 'getProtocolStats',
 *   })
 */
"use client"

import { useState, useEffect } from 'react'
import {
    PROTOCOL_STATS,
    USER_STATS,
    MARKETS,
    USER_SUPPLY_POSITIONS,
    USER_BORROW_POSITIONS,
    LIQUIDATABLE_POSITIONS,
    type ProtocolStats,
    type UserStats,
    type MarketAsset,
    type UserSupplyPosition,
    type UserBorrowPosition,
    type LiquidatablePosition,
} from '@/lib/mock-data'

// ─── Protocol stats ──────────────────────────────────────────────────────────

export function useProtocolStats(): { data: ProtocolStats; isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 400)
        return () => clearTimeout(timer)
    }, [])

    return { data: PROTOCOL_STATS, isLoading }
}

// ─── Markets ──────────────────────────────────────────────────────────────────

export function useMarkets(): { data: MarketAsset[]; isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    return { data: MARKETS, isLoading }
}

// ─── Single market ────────────────────────────────────────────────────────────

export function useMarket(symbol: string): { data: MarketAsset | undefined; isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300)
        return () => clearTimeout(timer)
    }, [])

    const data = MARKETS.find((m) => m.symbol === symbol.toUpperCase())
    return { data, isLoading }
}

// ─── User position ────────────────────────────────────────────────────────────

export function useUserStats(): { data: UserStats; isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600)
        return () => clearTimeout(timer)
    }, [])

    return { data: USER_STATS, isLoading }
}

export function useUserSupplyPositions(): { data: UserSupplyPosition[]; isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    return { data: USER_SUPPLY_POSITIONS, isLoading }
}

export function useUserBorrowPositions(): { data: UserBorrowPosition[]; isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    return { data: USER_BORROW_POSITIONS, isLoading }
}

// ─── Health factor (polled) ───────────────────────────────────────────────────

/**
 * Simulates live health factor polling.
 * In production, replace with useReadContract + refetchInterval.
 */
export function useHealthFactor(): { healthFactor: number; isLoading: boolean } {
    const [healthFactor, setHealthFactor] = useState(USER_STATS.healthFactor)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const init = setTimeout(() => setIsLoading(false), 600)

        // Tiny random drift to simulate live updates
        const poll = setInterval(() => {
            setHealthFactor((prev) => {
                const drift = (Math.random() - 0.5) * 0.01
                return Math.max(0.01, +(prev + drift).toFixed(3))
            })
        }, 3000)

        return () => {
            clearTimeout(init)
            clearInterval(poll)
        }
    }, [])

    return { healthFactor, isLoading }
}

// ─── Liquidations ─────────────────────────────────────────────────────────────

export function useLiquidatablePositions(): { data: LiquidatablePosition[]; isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600)
        return () => clearTimeout(timer)
    }, [])

    return { data: LIQUIDATABLE_POSITIONS, isLoading }
}
