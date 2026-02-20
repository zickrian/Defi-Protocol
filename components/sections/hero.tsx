"use client";

import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AssetIcon } from "@/components/ui/asset-icon";
import { useLivePrices } from "@/hooks/usePrices";
import { useEffect, useState } from "react";
import { Globe } from "@/components/ui/globe";

const ASSET_LIST = [
    { ticker: "USDC", name: "USD Coin" },
    { ticker: "ETH",  name: "Ethereum" },
    { ticker: "BTC",  name: "Bitcoin" },
    { ticker: "AMZN", name: "Amazon" },
    { ticker: "AMD",  name: "AMD" },
    { ticker: "NFLX", name: "Netflix" },
    { ticker: "PLTR", name: "Palantir" },
    { ticker: "TSLA", name: "Tesla" },
];

function formatPrice(price: number): string {
    return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function Hero() {
    const { data: prices, isLoading, error, dataUpdatedAt, isFetching } = useLivePrices();
    const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});

    // Track price changes for animation - update whenever prices change
    useEffect(() => {
        if (prices) {
            setPrevPrices((prev) => {
                const newPrev: Record<string, number> = {};
                Object.entries(prices).forEach(([ticker, entry]) => {
                    newPrev[ticker] = entry.price;
                });
                return newPrev;
            });
        }
    }, [prices, dataUpdatedAt]);

    const assets = ASSET_LIST.map((a) => {
        const live = prices?.[a.ticker];
        const prevPrice = prevPrices[a.ticker];
        const priceChanged = live && prevPrice && Math.abs(live.price - prevPrice) > 0.01;
        
        return {
            ...a,
            price:  live?.price  ?? null,
            change: live?.change ?? null,
            priceChanged: priceChanged || false,
        };
    }).filter(asset => asset.price !== null && asset.price > 0); // Only show assets with valid prices

    return (
        <section className="relative overflow-hidden bg-white pt-20 pb-16 lg:pt-32 lg:pb-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left side - Content */}
                    <div className="text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-[clamp(2.45rem,4.9vw,4.55rem)] font-bold leading-[1.0] tracking-tight text-black"
                    >
                            Borrow without<br />moving your stocks.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="mt-8 text-[22px] leading-[1.4] text-black max-w-[800px]"
                    >
                        Keep your tokenized equities native on Robinhood Chain. Borrow USDC on Arbitrum.{" "}
                            <span className="font-bold">Zero bridging risk.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="mt-10 flex flex-wrap justify-start gap-4"
                    >
                        <Link
                            href="#protocol"
                            className="inline-flex items-center gap-2 rounded-md bg-[#0066FF] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                        >
                            Get started <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="#developers"
                            className="inline-flex items-center gap-2 rounded-md border border-[#e6e6e6] bg-white px-6 py-3 text-base font-semibold text-black transition-all hover:border-[#cccccc] active:scale-[0.98]"
                        >
                            Read Documentation <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                    </div>

                    {/* Right side - Globe */}
                    <div className="hidden lg:flex items-center justify-center relative h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="relative w-full h-full"
                        >
                            <Globe />
                        </motion.div>
                    </div>
                </div>
            </Container>

            {/* Price Marquee (Customer logos equivalent) - Stripe style separator */}
            <div className="mt-24 bg-white">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Content area */}
                    <div className="relative w-full overflow-hidden py-8">
                        {error ? (
                            <div className="text-center py-4 text-sm text-[#425466]">
                                Unable to load prices. Please refresh the page.
                            </div>
                        ) : (
                            <>
                                {isLoading && !prices ? (
                                    <div className="text-center py-4 text-sm text-[#425466]">
                                        Loading prices...
                                    </div>
                                ) : assets.length === 0 ? (
                                    <div className="text-center py-4 text-sm text-[#425466]">
                                        No prices available
                                    </div>
                                ) : (
                                    <div className="flex gap-16 animate-marquee whitespace-nowrap items-center" style={{ width: 'max-content' }}>
                                        {[...assets, ...assets, ...assets].map((asset, i) => {
                            return (
                                <div
                                    key={`${asset.ticker}-${i}`}
                                                    className="flex items-center gap-3 shrink-0 select-none opacity-60 hover:opacity-100 transition-opacity duration-300"
                                                    style={{ willChange: 'transform' }}
                                >
                                    <AssetIcon symbol={asset.ticker} size={32} />
                                                    <div className="flex flex-col justify-center">
                                        <span className="text-sm font-bold text-black">{asset.ticker}</span>
                                                        {asset.price !== null && asset.price > 0 ? (
                                                            <span className={`text-sm font-semibold tabular-nums transition-colors duration-300 ${
                                                                asset.priceChanged ? 'text-[#0066FF]' : 'text-black'
                                                            }`}>
                                                    ${formatPrice(asset.price)}
                                                </span>
                                        ) : (
                                                            <span className="h-4 w-16 rounded bg-[#e6e6e6] animate-pulse block mt-1" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
