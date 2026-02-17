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
        <section className="pt-4 pb-24 bg-background">
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
                        <Card key={asset.ticker} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-border hover:border-primary/20 bg-background/50 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <CardContent className="p-6 relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="font-bold text-xl text-text group-hover:text-primary transition-colors">{asset.ticker}</div>
                                        <div className="text-xs text-muted-foreground">{asset.name}</div>
                                    </div>
                                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-medium bg-surface border border-border">Native</Badge>
                                </div>
                                <div className="space-y-1 mt-6">
                                    <div className="text-3xl font-bold tracking-tight">{asset.price}</div>
                                    <div className={`text-sm font-medium flex items-center gap-1 ${asset.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {asset.change.startsWith('+') ? '↑' : '↓'} {asset.change}
                                        <span className="text-muted-foreground font-normal ml-auto text-xs">24h</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
