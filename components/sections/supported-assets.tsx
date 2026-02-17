"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const assets = [
    { ticker: "TSLA", name: "Tesla Inc.", price: "$200.42", change: "+1.2%" },
    { ticker: "AMZN", name: "Amazon.com", price: "$145.20", change: "+0.8%" },
    { ticker: "PLTR", name: "Palantir Tech", price: "$24.50", change: "+3.5%" },
    { ticker: "NFLX", name: "Netflix Inc.", price: "$580.10", change: "-0.4%" },
    { ticker: "AMD", name: "Adv. Micro Dev", price: "$170.80", change: "+2.1%" },
];

export function SupportedAssets() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-4">
                        Supported Assets
                    </h2>
                    <p className="text-gray-600">
                        Tokenized equities available for collateral on Robinhood Chain.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {assets.map((asset) => (
                        <Card key={asset.ticker} className="group hover:border-primary/50 transition-colors cursor-default">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="font-bold text-xl text-text">{asset.ticker}</div>
                                    <Badge variant="secondary" className="text-[10px] px-1.5 h-5">Native</Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-semibold tracking-tight">{asset.price}</div>
                                    <div className={`text-sm font-medium ${asset.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                        {asset.change}
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-gray-400 group-hover:text-primary transition-colors">
                                    Real-time Oracle
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
