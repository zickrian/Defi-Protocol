"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Activity, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold tracking-tight text-text sm:text-6xl">
                            Borrow Without Moving Your Stocks
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Tokenized equities remain native on Robinhood Chain while borrowing executes strictly on Arbitrum. Zero bridging of collateral.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="rounded-full px-8 text-base">
                                Launch DApp
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                                Read Documentation
                            </Button>
                        </div>

                        <div className="pt-8 border-t border-border flex gap-8">
                            <div>
                                <div className="text-2xl font-bold text-text">$142M+</div>
                                <div className="text-sm text-gray-500">Total Value Locked</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-text">0%</div>
                                <div className="text-sm text-gray-500">Bridge Risk</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual (Dashboard Cards) */}
                    <div className="relative max-w-[500px] mx-auto lg:mx-0">
                        {/* Card 1: Collateral */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <Card className="bg-white shadow-xl border-border p-4 mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <TrendingUp className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-500">Collateral Value</div>
                                            <div className="text-lg font-bold">1,240 TSLA</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold">$248,500</div>
                                        <div className="text-xs text-green-600">+2.4%</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Card 2: Borrow Capacity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative z-20 ml-8 -mt-8"
                        >
                            <Card className="bg-white shadow-xl border-border p-4 mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-purple-100 p-2 rounded-lg">
                                            <Wallet className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-500">Borrow Capacity</div>
                                            <div className="text-lg font-bold">140,000 USDC</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold">75% LTV</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Card 3: Health Factor */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative z-30 -mt-8 mr-8"
                        >
                            <Card className="bg-white shadow-xl border-border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <Activity className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-500">Health Factor</div>
                                            <div className="text-lg font-bold text-green-600">1.42</div>
                                        </div>
                                    </div>
                                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[70%]" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
