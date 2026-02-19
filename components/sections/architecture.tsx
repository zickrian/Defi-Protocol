"use client";

import { Container } from "@/components/ui/container";
import { ArrowRight, Box, Code2, Database, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Architecture() {
    return (
        <section className="bg-white py-24 border-b border-[#e6e6e6]" id="architecture">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="flex-1 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6f9fc] text-[#0066FF] text-sm font-semibold mb-6">
                            <Box className="h-4 w-4" />
                            Enterprise Grade Infrastructure
                        </div>
                        
                        <h2 className="text-[32px] md:text-[40px] font-bold leading-[1.1] text-black mb-6">
                            Transform your DeFi strategy with agile financial infrastructure.
                        </h2>
                        
                        <p className="text-lg leading-relaxed text-[#425466] mb-8">
                            50% of Fortune 100 protocols have integrated Auno to manage cross-chain collateral and optimize yield strategies without fragmentation.
                        </p>

                        <Link 
                            href="#" 
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066FF] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                        >
                            Start building <ArrowRight className="h-4 w-4" />
                        </Link>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#e6e6e6] pt-8">
                            <div>
                                <div className="text-2xl font-bold text-black mb-1">160+</div>
                                <div className="text-sm font-medium text-[#425466]">Supported Chains</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-black mb-1">99.99%</div>
                                <div className="text-sm font-medium text-[#425466]">Uptime SLA</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual (Stripe-style abstract UI) */}
                    <div className="flex-1 w-full">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#f6f9fc] border border-[#e6e6e6]"
                        >
                            {/* Abstract Geometric Shapes simulating a dashboard or network */}
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-50"></div>
                            
                            {/* Floating Card 1 */}
                            <div className="absolute top-[15%] left-[10%] w-[60%] bg-white rounded-lg shadow-lg border border-[#e6e6e6] p-6 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-10 w-10 bg-[#0066FF] rounded-lg flex items-center justify-center">
                                        <Database className="text-white h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="h-2 w-24 bg-[#f6f9fc] rounded mb-2"></div>
                                        <div className="h-2 w-16 bg-[#f6f9fc] rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-[#f6f9fc] rounded"></div>
                                    <div className="h-2 w-[80%] bg-[#f6f9fc] rounded"></div>
                                </div>
                            </div>

                            {/* Floating Card 2 */}
                            <div className="absolute bottom-[15%] right-[10%] w-[55%] bg-white rounded-lg shadow-lg border border-[#e6e6e6] p-6 z-20">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-2 w-20 bg-[#f6f9fc] rounded"></div>
                                    <div className="h-4 w-4 bg-[#0066FF] rounded-full"></div>
                                </div>
                                <div className="flex gap-2 items-end h-16">
                                    <div className="flex-1 bg-[#0066FF] opacity-20 h-[40%] rounded-t"></div>
                                    <div className="flex-1 bg-[#0066FF] opacity-40 h-[70%] rounded-t"></div>
                                    <div className="flex-1 bg-[#0066FF] opacity-60 h-[50%] rounded-t"></div>
                                    <div className="flex-1 bg-[#0066FF] h-[90%] rounded-t"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}