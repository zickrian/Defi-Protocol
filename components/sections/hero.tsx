"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/globe";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-12 pb-8 lg:pt-20 lg:pb-12 bg-background">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-dot-pattern opacity-50" />
            <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-transparent via-background/50 to-background" />

            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >

                            <h1 className="text-5xl font-extrabold tracking-tight text-text sm:text-7xl leading-[1.1]">
                                Borrow Without <br className="hidden sm:block" />
                                <span className="text-indigo-600">
                                    Moving Your Stocks
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-xl text-gray-600 leading-relaxed max-w-lg"
                        >
                            Keep your tokenized equities native on Robinhood Chain. Borrow USDC on Arbitrum. <span className="font-semibold text-text">Zero bridging risk.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-wrap gap-4"
                        >
                            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all">
                                Launch DApp
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base bg-white/50 backdrop-blur-sm hover:bg-white">
                                Read Documentation
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="pt-8 border-t border-border/50 flex gap-12"
                        >
                            <div>
                                <div className="text-3xl font-bold text-text tracking-tight">$142M+</div>
                                <div className="text-sm font-medium text-gray-500 mt-1">Total Value Locked</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-text tracking-tight">0%</div>
                                <div className="text-sm font-medium text-gray-500 mt-1">Bridge Hack Risk</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Visual (Globe) */}
                    <div className="relative h-[500px] w-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
                        <Globe className="w-full max-w-[600px] h-full" />

                        {/* Floating Card: TSLA on Robinhood */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="absolute bottom-10 left-0 md:left-10 bg-white/90 backdrop-blur-md shadow-xl border-white/50 p-4 rounded-xl ring-1 ring-black/5 z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <span className="font-bold text-indigo-600">TSLA</span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Tesla Inc.</div>
                                    <div className="text-xs text-green-600">+2.4% Native</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Card: Cross-Chain Liquidity */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="absolute top-10 right-0 md:right-10 bg-white/90 backdrop-blur-md shadow-xl border-white/50 p-4 rounded-xl ring-1 ring-black/5 z-20"
                        >
                            <div className="text-xs text-gray-500 mb-1">Borrow Capacity</div>
                            <div className="text-lg font-bold text-indigo-600">$140,000</div>
                            <div className="text-[10px] text-gray-400">USDC on Arbitrum</div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
