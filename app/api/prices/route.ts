import { NextResponse } from "next/server"

// Maps our app symbols → Yahoo Finance symbols
const YAHOO_SYMBOL_MAP: Record<string, string> = {
    BTC:  "BTC-USD",
    ETH:  "ETH-USD",
    USDC: "USDC-USD",
    TSLA: "TSLA",
    AMZN: "AMZN",
    PLTR: "PLTR",
    NFLX: "NFLX",
    AMD:  "AMD",
}

export interface PriceEntry {
    price:  number
    change: number  // % change today
}

export async function GET() {
    try {
        const yahooSymbols = Object.values(YAHOO_SYMBOL_MAP).join(",")
        const url =
            `https://query1.finance.yahoo.com/v8/finance/quote` +
            `?symbols=${yahooSymbols}` +
            `&fields=regularMarketPrice,regularMarketChangePercent`

        const res = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Accept: "application/json",
            },
            // Server-side cache: refresh every 30s
            next: { revalidate: 30 },
        })

        if (!res.ok) {
            throw new Error(`Yahoo Finance responded with HTTP ${res.status}`)
        }

        const json = await res.json()
        const quotes: Array<{ symbol: string; regularMarketPrice?: number; regularMarketChangePercent?: number }> = json?.quoteResponse?.result ?? []

        const prices: Record<string, PriceEntry> = {}

        for (const [appSymbol, yahooSymbol] of Object.entries(YAHOO_SYMBOL_MAP)) {
            const quote = quotes.find((q) => q.symbol === yahooSymbol)
            if (quote) {
                prices[appSymbol] = {
                    price:  quote.regularMarketPrice  ?? 0,
                    change: quote.regularMarketChangePercent ?? 0,
                }
            }
        }

        return NextResponse.json(prices, {
            headers: {
                "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
            },
        })
    } catch (err) {
        console.error("[/api/prices]", err)
        return NextResponse.json(
            { error: "Failed to fetch prices from Yahoo Finance" },
            { status: 500 },
        )
    }
}
