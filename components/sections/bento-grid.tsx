"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Lock, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export function BentoGrid() {
    return (
        <section className="py-24 bg-white border-b border-[#e6e6e6]" id="protocol">
            <Container>
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-[32px] font-bold leading-tight text-black mb-6">
                        Flexible solutions for every DeFi strategy. <span className="text-[#425466]">Grow your portfolio with a comprehensive set of lending and borrowing tools.</span>
                    </h2>
                </div>

                {/* Grid Layout: 2 up top, 3 down bottom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Card 1: Large */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group relative overflow-hidden rounded-xl border border-[#e6e6e6] bg-white p-8 h-[480px] flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-black mb-2">Borrow against tokenized equities</h3>
                            <p className="text-[15px] leading-relaxed text-[#425466]">
                                Keep your stocks on Robinhood Chain. Borrow USDC on Arbitrum. Zero bridging risk. Auno handles billions in cross-chain collateral for DeFi protocols worldwide.
                            </p>
                        </div>
                        
                        {/* Mock UI Visual */}
                        <div className="mt-8 relative h-full w-full bg-[#f6f9fc] rounded-lg border border-[#e6e6e6] overflow-hidden p-6">
                            <div className="absolute top-10 left-10 right-10 bottom-0 bg-white rounded-t-xl shadow-sm border border-[#e6e6e6] p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-10 w-10 rounded-full bg-[#0066FF] flex items-center justify-center text-white font-bold">A</div>
                                    <div>
                                        <div className="h-2 w-24 bg-[#e6e6e6] rounded mb-1"></div>
                                        <div className="h-2 w-16 bg-[#e6e6e6] rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-8 w-full bg-[#f6f9fc] rounded border border-[#e6e6e6]"></div>
                                    <div className="h-8 w-full bg-[#0066FF] rounded flex items-center justify-center text-white text-sm font-semibold">Borrow 10,000 USDC</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="h-5 w-5 text-[#0066FF]" />
                        </div>
                    </motion.div>

                    {/* Card 2: Large */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group relative overflow-hidden rounded-xl border border-[#e6e6e6] bg-white p-8 h-[480px] flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-black mb-2">Flexible collateral models</h3>
                            <p className="text-[15px] leading-relaxed text-[#425466]">
                                Single collateral, multi-collateral, or isolated pools. Use our flexible lending API to set up custom borrowing limits and liquidation thresholds.
                            </p>
                        </div>

                        {/* Mock UI Visual */}
                        <div className="mt-8 relative h-full w-full bg-[#f6f9fc] rounded-lg border border-[#e6e6e6] overflow-hidden p-6 flex items-end justify-center">
                            <div className="w-full max-w-[280px] bg-white rounded-t-xl shadow-sm border border-[#e6e6e6] p-5 pb-0">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-8 w-8 rounded bg-[#e6e6e6]"></div>
                                    <div className="h-2 w-12 bg-[#e6e6e6] rounded"></div>
                                </div>
                                <div className="flex items-end gap-2 h-32">
                                    {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                                        <div key={i} className="flex-1 bg-[#0066FF] rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="h-5 w-5 text-[#0066FF]" />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 3 */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="group relative p-8 rounded-xl border border-[#e6e6e6] bg-white hover:shadow-sm transition-all"
                    >
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded bg-[#f6f9fc] text-[#0066FF]">
                            <Globe className="h-5 w-5" />
                        </div>
                        <h3 className="text-[17px] font-bold text-black mb-2">Global Scale</h3>
                        <p className="text-[15px] leading-relaxed text-[#425466] mb-4">
                            Designed for high-growth DeFi protocols. operate across multiple chains with unified liquidity.
                        </p>
                        <Link href="#" className="text-[#0066FF] font-semibold text-[15px] flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read the guide <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </motion.div>

                    {/* Feature 4 */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="group relative p-8 rounded-xl border border-[#e6e6e6] bg-white hover:shadow-sm transition-all"
                    >
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded bg-[#f6f9fc] text-[#0066FF]">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="text-[17px] font-bold text-black mb-2">Fraud Prevention</h3>
                        <p className="text-[15px] leading-relaxed text-[#425466] mb-4">
                            Real-time risk engine monitors every transaction. Prevent hacks before they happen with automated circuit breakers.
                        </p>
                        <Link href="#" className="text-[#0066FF] font-semibold text-[15px] flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read the guide <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </motion.div>

                    {/* Feature 5 */}
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="group relative p-8 rounded-xl border border-[#e6e6e6] bg-white hover:shadow-sm transition-all"
                    >
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded bg-[#f6f9fc] text-[#0066FF]">
                            <Zap className="h-5 w-5" />
                        </div>
                        <h3 className="text-[17px] font-bold text-black mb-2">Fast Integration</h3>
                        <p className="text-[15px] leading-relaxed text-[#425466] mb-4">
                            Launch your financial product in weeks, not months. Pre-built UI components and robust SDKs.
                        </p>
                        <Link href="#" className="text-[#0066FF] font-semibold text-[15px] flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read the guide <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}