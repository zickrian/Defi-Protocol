"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, CheckCircle } from "lucide-react";

export function CapitalEfficiency() {
    return (
        <section className="py-24 bg-background border-b border-border">
            <Container>
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Capital Efficiency
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Why Auno's native model is superior to traditional bridging.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Traditional Bridging */}
                    <Card className="border-red-100 bg-red-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-700">
                                <XCircle className="h-5 w-5" />
                                Traditional Bridging
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4 text-red-900/80">
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    <span>Wrapped assets introduce smart contract risk on destination chain.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    <span>Bridge hacks account for 70% of DeFi exploits.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    <span>Fragmented liquidity across multiple chains.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Auno Native Model */}
                    <Card className="border-green-100 bg-green-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-700">
                                <CheckCircle className="h-5 w-5" />
                                Auno Native Model
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4 text-green-900/80">
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    <span>Assets remain in native custody on Robinhood Chain.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    <span>Zero bridging of collateral assets.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    <span>Unified liquidity pool on Arbitrum.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
