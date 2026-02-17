"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export function RiskEngine() {
    return (
        <section className="py-24 bg-surface/30">
            <Container>
                <div className="lg:text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Algorithmic Risk Engine
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Transparent, on-chain risk management ensuring protocol solvency.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Formula Card */}
                    <Card className="bg-text text-white border-none shadow-2xl">
                        <CardContent className="p-8 lg:p-12 flex flex-col justify-center h-full">
                            <div className="font-mono text-sm text-gray-400 mb-4">Risk Formula</div>
                            <div className="text-2xl sm:text-3xl font-bold mb-8 font-mono">
                                HF = (Collateral × LTV) / Debt
                            </div>
                            <div className="space-y-4 text-sm text-gray-300">
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span>HF &lt; 1.0</span>
                                    <span className="text-red-400 font-bold">LIQUIDATION</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span>HF &gt; 1.5</span>
                                    <span className="text-green-400 font-bold">HEALTHY</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Scenario Card */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-orange-100 p-2 rounded-lg">
                                        <AlertTriangle className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">Liquidation Mechanism</h3>
                                        <p className="text-gray-600 text-sm">
                                            Liquidations occur strictly on the Robinhood Chain where collateral is held.
                                            Arbitrum debt is covered by the insurance fund until collateral auction completes.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <ShieldCheck className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">LTV Parameters</h3>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex justify-between">
                                                <span>TSLA LTV</span>
                                                <span className="font-mono font-bold">75%</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Low Volatility LTV</span>
                                                <span className="font-mono font-bold">82%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </section>
    );
}
