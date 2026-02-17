"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Radio, Server, Wifi } from "lucide-react";

export function OracleInfra() {
    return (
        <section className="py-24 bg-background border-b border-border">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <Card className="bg-surface/50">
                                <CardContent className="p-6">
                                    <Radio className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-bold mb-2">Redundant Feeds</h3>
                                    <p className="text-sm text-gray-500">Aggregated from multiple premium providers with median logic.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-surface/50">
                                <CardContent className="p-6">
                                    <Activity className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-bold mb-2">Heartbeat Checks</h3>
                                    <p className="text-sm text-gray-500">Prices update every 15s or on 0.05% deviation.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-surface/50">
                                <CardContent className="p-6">
                                    <Server className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-bold mb-2">Fallback Mechanisms</h3>
                                    <p className="text-sm text-gray-500">Circuit breakers pause markets on extreme volatility.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-surface/50 border-green-200 bg-green-50/50">
                                <CardContent className="p-6">
                                    <Wifi className="h-8 w-8 text-green-600 mb-4" />
                                    <h3 className="font-bold mb-2 text-green-700">99.99% Uptime</h3>
                                    <p className="text-sm text-green-600">Maintained across all market conditions.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-6">
                            Institutional-Grade Oracle Infrastructure
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Reliable price data is the backbone of Auno. We utilize a multi-layered aggregation system to ensure asset prices are always accurate and manipulation-resistant.
                        </p>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden w-full max-w-sm">
                            <div className="h-full bg-primary w-[98%]" />
                        </div>
                        <div className="mt-2 text-sm text-gray-500 flex justify-between max-w-sm">
                            <span>System Status</span>
                            <span className="text-green-600 font-bold">Operational</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
