import { NextResponse } from "next/server"

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface PriceEntry {
    price:  number
    change: number  // % change today
}

// CoinGecko IDs for crypto
const COINGECKO_IDS: Record<string, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    USDC: "usd-coin",
}

// Stock symbols
const STOCK_SYMBOLS = ["TSLA", "AMZN", "AMD", "NFLX", "PLTR"];

async function fetchCryptoPrices(): Promise<Record<string, PriceEntry>> {
    const prices: Record<string, PriceEntry> = {};
    
    try {
        const ids = Object.values(COINGECKO_IDS).join(",");
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
        
        const res = await fetch(url, {
            cache: "no-store",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`CoinGecko API error: ${res.status}`);
        }

        const data = await res.json();

        // Map CoinGecko response to our format - ONLY use real data
        for (const [symbol, coinId] of Object.entries(COINGECKO_IDS)) {
            const coinData = data[coinId];
            if (coinData && coinData.usd && typeof coinData.usd === 'number') {
                prices[symbol] = {
                    price: coinData.usd,
                    change: coinData.usd_24h_change || 0,
                };
            }
        }
    } catch (err) {
        console.error("[/api/prices] CoinGecko fetch failed:", err);
        // Don't return fallback - return empty object
    }

    return prices;
}

async function fetchStockPrices(): Promise<Record<string, PriceEntry>> {
    const prices: Record<string, PriceEntry> = {};
    
    // Fetch stocks from Yahoo Finance - REAL prices only
    for (const symbol of STOCK_SYMBOLS) {
        try {
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
            
            const res = await fetch(yahooUrl, {
                cache: "no-store",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Accept": "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                const result = data?.chart?.result?.[0];
                
                if (result) {
                    const currentPrice = result.meta?.regularMarketPrice;
                    const previousClose = result.meta?.previousClose;
                    
                    // ONLY use if we have valid real data
                    if (currentPrice && typeof currentPrice === 'number' && currentPrice > 0) {
                        const changePercent = previousClose 
                            ? ((currentPrice - previousClose) / previousClose) * 100 
                            : 0;
                        
                        prices[symbol] = {
                            price: currentPrice,
                            change: changePercent,
                        };
                    }
                }
            }
        } catch (err) {
            console.warn(`[/api/prices] Failed to fetch ${symbol} from Yahoo Finance:`, err);
            // Don't add fallback - skip this symbol
        }
    }
    
    return prices;
}

export async function GET(request: Request) {
    try {
        const timestamp = Date.now();
        const prices: Record<string, PriceEntry> = {};

        // Fetch crypto prices from CoinGecko (REAL-TIME ONLY)
        const cryptoPrices = await fetchCryptoPrices();
        Object.assign(prices, cryptoPrices);

        // Fetch stock prices from Yahoo Finance (REAL-TIME ONLY)
        const stockPrices = await fetchStockPrices();
        Object.assign(prices, stockPrices);

        // Log untuk debugging - show what we actually got
        console.log(`[API] REAL prices fetched at ${new Date(timestamp).toISOString()}`);
        console.log(`[API] Symbols received:`, Object.keys(prices));
        console.log(`[API] BTC: $${prices.BTC?.price}, ETH: $${prices.ETH?.price}, TSLA: $${prices.TSLA?.price}`);

        // Return ONLY real prices - no fallbacks, no fake data
        return NextResponse.json(prices, {
            headers: {
                "Cache-Control": "no-store, must-revalidate, max-age=0",
                "Pragma": "no-cache",
                "Expires": "0",
                "X-Data-Timestamp": timestamp.toString(),
            },
        });
    } catch (err) {
        console.error("[/api/prices] Error:", err);
        // Return empty object if everything fails - NO FAKE DATA
        return NextResponse.json({}, {
            status: 500,
            headers: {
                "Cache-Control": "no-store, must-revalidate, max-age=0",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });
    }
}