"use client";

import { Container } from "@/components/ui/container";
import { ArrowRight, CheckCircle2, Lock, Smartphone, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function Security() {
    return (
        <section className="bg-[#0066FF] py-24 text-white overflow-hidden" id="security">
            <Container>
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left: Content */}
                    <div className="flex-1 max-w-xl pt-8">
                        <h2 className="text-[32px] md:text-[40px] font-bold leading-[1.1] mb-6 text-white">
                            The backbone for DeFi lending.
                        </h2>
                        <p className="text-lg leading-relaxed text-blue-100 mb-12">
                            For ambitious protocols around the world, Auno makes cross-chain lending as simple, borderless, and programmable as the rest of DeFi.
                        </p>

                        <div className="grid gap-10">
                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1">
                                    <Terminal className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Developer-centric</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Rapidly build production-ready lending integrations with modern tools, from React components to real-time on-chain events and webhooks.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1">
                                    <Lock className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Battle-tested reliability</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Our systems operate with 99.99%+ uptime and are highly scalable and redundant. Auno is certified to the highest compliance standards.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1">
                                    <Smartphone className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Intelligent risk management</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Our risk engine analyzes billions of on-chain data points to optimize collateral ratios, prevent liquidations, and maximize capital efficiency across all chains.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Code Visual (matches Stripe's dark terminal look) */}
                    <div className="flex-1 w-full lg:translate-x-12">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-[#0a2540] rounded-xl shadow-2xl overflow-hidden border border-[#ffffff]/10"
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#ffffff]/10 bg-[#0a2540]">
                                <div className="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
                                <div className="h-3 w-3 rounded-full bg-[#febc2e]"></div>
                                <div className="h-3 w-3 rounded-full bg-[#28c840]"></div>
                                <div className="ml-4 text-xs font-mono text-gray-400">bash — 80x24</div>
                            </div>
                            
                            {/* Code Content */}
                            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                                <div className="text-blue-300">import <span className="text-white">{'{'}</span> <span className="text-white">Auno</span> <span className="text-white">{'}'}</span> from <span className="text-green-300">'@auno/sdk'</span>;</div>
                                <div className="mt-4 text-gray-400">// Initialize the client</div>
                                <div className="text-white">const <span className="text-yellow-300">auno</span> = <span className="text-blue-300">new</span> Auno({'{'}</div>
                                <div className="pl-4 text-white">chainId: <span className="text-purple-300">42161</span>, <span className="text-gray-400">// Arbitrum</span></div>
                                <div className="text-white">{'}'});</div>
                                <div className="mt-4 text-gray-400">// Borrow USDC against tokenized equity</div>
                                <div className="text-white">const <span className="text-yellow-300">tx</span> = <span className="text-blue-300">await</span> auno.borrow({'{'}</div>
                                <div className="pl-4 text-white">collateral: <span className="text-green-300">'TSLA'</span>,</div>
                                <div className="pl-4 text-white">amount: <span className="text-green-300">'10000'</span>, <span className="text-gray-400">// USDC</span></div>
                                <div className="pl-4 text-white">chain: <span className="text-green-300">'arbitrum'</span>,</div>
                                <div className="text-white">{'}'});</div>
                                <div className="mt-4 text-green-400">➜  ~  Transaction confirmed on Arbitrum...</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}