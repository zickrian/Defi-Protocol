import { Container } from "@/components/ui/container";
import { RiskMonitor } from "@/components/visuals/risk-monitor";
import { ShieldCheck, BarChart3, Zap } from "lucide-react";

export function RiskEngine() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 -z-10" />

            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <div>
                        <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-800 mb-6">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Security First Architecture
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                            Algorithmic Solvency <br />
                            <span className="text-muted-foreground">Real-Time Risk Engine</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                            Our protocol utilizes a dual-layer risk verification system. Collateral positions are monitored every block, ensuring system stability even during extreme market volatility.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="flex-none h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">High LTV Parameters</h3>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Leverage up to 75% on volatile assets (TSLA) and 82% on stable collateral, thanks to our efficient liquidation engine.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-none h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">Instant Liquidations</h3>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Liquidations are processed atomically on the source chain, preventing bad debt accumulation and protecting lenders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-2xl -z-10" />
                        <RiskMonitor />
                    </div>

                </div>
            </Container>
        </section>
    );
}
