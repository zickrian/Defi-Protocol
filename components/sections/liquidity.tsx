"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Percent } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export function Liquidity() {
    return (
        <section className="py-24 bg-background border-b border-border">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                    <FadeIn>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-6">
                                Arbitrum Liquidity Pools
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Deep liquidity for instant borrowing. Lenders earn yield on stablecoins and ETH while borrowers unlock equity value.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-gray-700 font-medium">No asset bridging for collateral</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-gray-700 font-medium">Instant execution on Arbitrum</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-gray-700 font-medium">Isolated risk markets</span>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Liquidity</CardTitle>
                                    <Droplet className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$42,391,000</div>
                                    <p className="text-xs text-gray-500 text-muted-foreground">
                                        +12.5% from last month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
                                    <Percent className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">78.4%</div>
                                    <p className="text-xs text-gray-500 text-muted-foreground">
                                        Optimal range
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="sm:col-span-2 bg-primary/5 border-primary/20">
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-sm font-medium text-primary">USDC APY</div>
                                            <div className="text-3xl font-bold text-primary">4.82%</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-primary">ETH APY</div>
                                            <div className="text-3xl font-bold text-primary">3.15%</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </FadeIn>
                </div>
            </Container>
        </section>
    );
}
