import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/visuals/sparkline";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AssetIcon } from "@/components/ui/asset-icon";

const assets = [
    { ticker: "USDC", name: "USD Coin", price: "1.00", change: "+0.0%", color: "green" },
    { ticker: "ETH", name: "Ethereum", price: "3,420.00", change: "+2.1%", color: "green" },
    { ticker: "BTC", name: "Bitcoin", price: "97,350.00", change: "+1.4%", color: "green" },
    { ticker: "AMZN", name: "Synthetic Amazon", price: "186.40", change: "-0.8%", color: "red" },
    { ticker: "AMD", name: "Synthetic AMD", price: "134.20", change: "+2.7%", color: "green" },
    { ticker: "NFLX", name: "Synthetic Netflix", price: "712.50", change: "+1.5%", color: "green" },
    { ticker: "PLTR", name: "Synthetic Palantir", price: "28.75", change: "+3.2%", color: "green" },
    { ticker: "TSLA", name: "Synthetic Tesla", price: "243.10", change: "+4.2%", color: "green" },
];

export function SupportedAssets() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-4">
                            MARKET OPEN
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Institutional Grade Assets
                        </h2>
                        <p className="mt-2 text-muted-foreground text-lg">
                            Borrow against your favorite tech stocks 24/7.
                        </p>
                    </div>
                </div>
            </Container>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

                <div className="flex gap-6 animate-scroll whitespace-nowrap py-4 px-6 w-max">
                    {[...assets, ...assets].map((asset, i) => ( // Duplicate for infinite scroll
                        <div
                            key={`${asset.ticker}-${i}`}
                            className="bg-white rounded-2xl border border-zinc-200 p-6 w-[280px] shadow-sm hover:shadow-md transition-shadow shrink-0"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <AssetIcon symbol={asset.ticker} size={40} />
                                    <div>
                                        <div className="font-bold text-foreground">{asset.ticker}</div>
                                        <div className="text-xs text-muted-foreground">{asset.name}</div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 border-zinc-200 font-normal">
                                    RWA
                                </Badge>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-2xl font-bold text-foreground">${asset.price}</div>
                                    <div className={`text-sm font-medium flex items-center mt-1 ${asset.color === 'green' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {asset.color === 'green' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                        {asset.change}
                                    </div>
                                </div>
                                <div className="w-24 h-12">
                                    <Sparkline color={asset.color as "green" | "red"} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
