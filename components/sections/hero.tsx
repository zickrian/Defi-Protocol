"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Activity, Wallet, ShieldCheck } from "lucide-react";
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

                    {/* Right Visual (Dashboard Cards) */}
                    <div className="relative max-w-[600px] mx-auto lg:mx-0 w-full perspective-1000">
                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[100px] rounded-full -z-10" />

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            {/* Main Dashboard Card */}
                            <Card className="bg-white/80 backdrop-blur-xl border-white/40 shadow-2xl p-6 rounded-2xl ring-1 ring-black/5">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <span className="font-bold text-indigo-600">TSLA</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Tesla Inc. Strategy</div>
                                            <div className="text-xs text-gray-500">Robinhood Chain • Native</div>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-bold border border-green-100">
                                        Active
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="text-xs text-gray-500 mb-1">Collateral Value</div>
                                        <div className="text-xl font-bold text-text">$248,500</div>
                                        <div className="text-[10px] text-green-600 mt-1 flex items-center">
                                            <TrendingUp className="h-3 w-3 mr-1" /> +2.4% (24h)
                                        </div>
                                    </div>
                                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <div className="text-xs text-indigo-600 mb-1">Borrow Capacity</div>
                                        <div className="text-xl font-bold text-indigo-900">$140,000</div>
                                        <div className="text-[10px] text-indigo-600 mt-1">
                                            USDC on Arbitrum
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 7, delay: 1, ease: "easeInOut" }}
                                className="absolute -right-8 -top-12 z-20 w-48"
                            >
                                <Card className="bg-white/90 backdrop-blur-md shadow-xl border-white/50 p-4 rounded-xl ring-1 ring-black/5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Activity className="h-5 w-5 text-green-500" />
                                        <div className="font-bold text-sm">Health Factor</div>
                                    </div>
                                    <div className="text-2xl font-bold text-green-600">1.42</div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-green-500 w-[70%] h-full" />
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ repeat: Infinity, duration: 8, delay: 0.5, ease: "easeInOut" }}
                                className="absolute -left-8 -bottom-8 z-30 w-56"
                            >
                                <Card className="bg-white/90 backdrop-blur-md shadow-xl border-white/50 p-4 rounded-xl ring-1 ring-black/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-medium text-gray-500">Net APY</div>
                                        <div className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">Stable</div>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-text">4.8%</span>
                                        <span className="text-xs text-gray-400">Fixed</span>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
