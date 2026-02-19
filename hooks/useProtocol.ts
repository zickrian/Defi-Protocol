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
import { useLivePrices } from '@/hooks/usePrices'

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
    const { data: prices, isLoading } = useLivePrices()

    const data = MARKETS.map((market) => {
        const live = prices?.[market.symbol]
        return live ? { ...market, price: live.price } : market
    })

    return { data, isLoading }
}

// ─── Single market ────────────────────────────────────────────────────────────

export function useMarket(symbol: string): { data: MarketAsset | undefined; isLoading: boolean } {
    const { data: prices, isLoading } = useLivePrices()

    const base = MARKETS.find((m) => m.symbol === symbol.toUpperCase())
    const live = prices?.[symbol.toUpperCase()]
    const data = base ? { ...base, ...(live ? { price: live.price } : {}) } : undefined

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
