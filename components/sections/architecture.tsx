"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Database, ShieldCheck, Zap } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export function Architecture() {
    return (
        <section id="architecture" className="py-24 bg-surface/50 border-b border-border">
            <Container>
                <FadeIn>
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                            Native Collateral. Cross-Chain Liquidity.
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Seamlessly borrowing against your assets without bridging.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="relative grid gap-8 lg:grid-cols-3">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2 px-12 -z-10">
                            <svg className="w-full h-12 text-gray-300" preserveAspectRatio="none">
                                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                            </svg>
                        </div>

                        {/* Card 1: Robinhood Chain */}
                        <Card className="bg-background relative z-10 border-border shadow-md">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border">
                                    <Database className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Robinhood Chain</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        Tokenized Equities (TSLA, AMZN)
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        Native Custody
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        No Bridging Risk
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Card 2: Oracle & Risk Engine */}
                        <Card className="bg-background relative z-10 border-border shadow-md">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Oracle & Risk Engine</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        Real-time Price Feeds
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        Cross-Chain Messaging
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        Health Factor Monitoring
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Card 3: Arbitrum */}
                        <Card className="bg-background relative z-10 border-border shadow-md">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Arbitrum</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        USDC / ETH Liquidity
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        Instant Execution
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-primary">•</span>
                                        Low Gas Fees
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
