/**
 * Mock data for the Auno Protocol DApp.
 *
 * All values here mirror what the smart contracts would return.
 * Swap the hook implementations in lib/hooks/ to use real contract
 * reads (wagmi `useReadContract`) once addresses are deployed.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type AssetSymbol = 'TSLA' | 'AMZN' | 'PLTR' | 'NFLX' | 'AMD' | 'USDC' | 'ETH'

export interface MarketAsset {
    symbol: AssetSymbol
    name: string
    price: number          // USD
    supplyApy: number      // e.g. 2.1 → "2.1%"
    borrowApy: number
    totalSupplied: number  // USD
    totalBorrowed: number  // USD
    collateralFactor: number  // 0–1, e.g. 0.75
    liquidationThreshold: number  // 0–1, e.g. 0.80
    icon: string           // emoji fallback
}

export interface UserSupplyPosition {
    symbol: AssetSymbol
    amount: number   // token units
    valueUsd: number
    asCollateral: boolean
}

export interface UserBorrowPosition {
    symbol: AssetSymbol
    amount: number
    valueUsd: number
}

export interface LiquidatablePosition {
    address: string
    healthFactor: number
    debtUsd: number
    collateralSymbol: AssetSymbol
    collateralValueUsd: number
}

export interface ProtocolStats {
    tvl: number
    totalSupplied: number
    totalBorrowed: number
    utilization: number  // 0–100
}

export interface UserStats {
    collateralUsd: number
    debtUsd: number
    healthFactor: number
    maxBorrowUsd: number
}

// ─── Protocol-level data ────────────────────────────────────────────────────

export const PROTOCOL_STATS: ProtocolStats = {
    tvl: 34_800_000,
    totalSupplied: 20_300_000,
    totalBorrowed: 13_200_000,
    utilization: 62,
}

// ─── Markets ────────────────────────────────────────────────────────────────

export const MARKETS: MarketAsset[] = [
    {
        symbol: 'TSLA',
        name: 'Synthetic Tesla',
        price: 243.10,
        supplyApy: 2.1,
        borrowApy: 4.3,
        totalSupplied: 3_200_000,
        totalBorrowed: 1_900_000,
        collateralFactor: 0.70,
        liquidationThreshold: 0.80,
        icon: '🚗',
    },
    {
        symbol: 'AMZN',
        name: 'Synthetic Amazon',
        price: 186.40,
        supplyApy: 1.8,
        borrowApy: 3.9,
        totalSupplied: 4_100_000,
        totalBorrowed: 2_400_000,
        collateralFactor: 0.72,
        liquidationThreshold: 0.82,
        icon: '📦',
    },
    {
        symbol: 'PLTR',
        name: 'Synthetic Palantir',
        price: 28.75,
        supplyApy: 3.2,
        borrowApy: 6.1,
        totalSupplied: 1_500_000,
        totalBorrowed: 980_000,
        collateralFactor: 0.60,
        liquidationThreshold: 0.72,
        icon: '🛰️',
    },
    {
        symbol: 'NFLX',
        name: 'Synthetic Netflix',
        price: 712.50,
        supplyApy: 1.5,
        borrowApy: 3.2,
        totalSupplied: 2_800_000,
        totalBorrowed: 1_600_000,
        collateralFactor: 0.68,
        liquidationThreshold: 0.78,
        icon: '🎬',
    },
    {
        symbol: 'AMD',
        name: 'Synthetic AMD',
        price: 134.20,
        supplyApy: 2.7,
        borrowApy: 5.4,
        totalSupplied: 2_100_000,
        totalBorrowed: 1_300_000,
        collateralFactor: 0.65,
        liquidationThreshold: 0.75,
        icon: '💻',
    },
    {
        symbol: 'USDC',
        name: 'USD Coin',
        price: 1.00,
        supplyApy: 4.8,
        borrowApy: 6.5,
        totalSupplied: 5_400_000,
        totalBorrowed: 3_900_000,
        collateralFactor: 0.85,
        liquidationThreshold: 0.90,
        icon: '💵',
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 3420.00,
        supplyApy: 1.9,
        borrowApy: 3.1,
        totalSupplied: 1_200_000,
        totalBorrowed: 1_020_000,
        collateralFactor: 0.80,
        liquidationThreshold: 0.85,
        icon: '⟠',
    },
]

// ─── User positions (mock "logged-in" user) ──────────────────────────────────

export const USER_SUPPLY_POSITIONS: UserSupplyPosition[] = [
    { symbol: 'TSLA', amount: 4.94, valueUsd: 1200, asCollateral: true },
    { symbol: 'AMZN', amount: 2.15, valueUsd: 400, asCollateral: true },
    { symbol: 'ETH', amount: 0.24, valueUsd: 830, asCollateral: false },
]

export const USER_BORROW_POSITIONS: UserBorrowPosition[] = [
    { symbol: 'USDC', amount: 800, valueUsd: 800 },
    { symbol: 'ETH', amount: 0.088, valueUsd: 300 },
]

export const USER_STATS: UserStats = {
    collateralUsd: 2430,
    debtUsd: 1520,
    healthFactor: 1.41,
    maxBorrowUsd: 181,
}

// ─── Liquidations ────────────────────────────────────────────────────────────

export const LIQUIDATABLE_POSITIONS: LiquidatablePosition[] = [
    {
        address: '0x81...4f2e',
        healthFactor: 0.92,
        debtUsd: 1200,
        collateralSymbol: 'TSLA',
        collateralValueUsd: 1400,
    },
    {
        address: '0xd4...8b3a',
        healthFactor: 0.87,
        debtUsd: 3400,
        collateralSymbol: 'AMZN',
        collateralValueUsd: 3800,
    },
    {
        address: '0x2f...c19d',
        healthFactor: 0.95,
        debtUsd: 540,
        collateralSymbol: 'PLTR',
        collateralValueUsd: 600,
    },
    {
        address: '0xa9...71bc',
        healthFactor: 0.99,
        debtUsd: 8700,
        collateralSymbol: 'ETH',
        collateralValueUsd: 9400,
    },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format USD number → "$1,200" */
export function formatUsd(value: number): string {
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`
    }
    if (value >= 1_000) {
        return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/** Format APY number → "2.1%" */
export function formatApy(value: number): string {
    return `${value.toFixed(1)}%`
}

/** Format utilization → "62%" */
export function formatPercent(value: number): string {
    return `${value.toFixed(1)}%`
}

/**
 * Returns the health factor status tier for colour coding.
 * safe   → HF > 1.3
 * warn   → 1.0 < HF ≤ 1.3
 * danger → HF ≤ 1.0
 */
export type HfStatus = 'safe' | 'warn' | 'danger'

export function getHfStatus(hf: number): HfStatus {
    if (hf > 1.3) return 'safe'
    if (hf > 1.0) return 'warn'
    return 'danger'
}

/** Returns the CSS colour class for a health factor value */
export function getHfColor(hf: number): string {
    const status = getHfStatus(hf)
    return status === 'safe' ? 'text-green-600' : status === 'warn' ? 'text-yellow-500' : 'text-red-500'
}

/** Returns dot background colour class for a health factor */
export function getHfDotColor(hf: number): string {
    const status = getHfStatus(hf)
    return status === 'safe' ? 'bg-green-500' : status === 'warn' ? 'bg-yellow-400' : 'bg-red-500'
}

/**
 * Calculate new health factor after a hypothetical borrow.
 * Simplified formula: HF = (totalCollateralUsd * liquidationThreshold) / (totalDebtUsd + borrowUsd)
 */
export function calculateHfAfterBorrow(
    currentCollateralUsd: number,
    currentDebtUsd: number,
    additionalBorrowUsd: number,
    weightedLiquidationThreshold = 0.80,
): number {
    if (currentDebtUsd + additionalBorrowUsd === 0) return 999
    return (currentCollateralUsd * weightedLiquidationThreshold) / (currentDebtUsd + additionalBorrowUsd)
}

/** Get market asset by symbol */
export function getMarket(symbol: AssetSymbol): MarketAsset | undefined {
    return MARKETS.find((m) => m.symbol === symbol)
}
