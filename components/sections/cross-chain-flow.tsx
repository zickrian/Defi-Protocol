import { ProcessDiagram } from "@/components/visuals/process-diagram";
import { Container } from "@/components/ui/container";
import { Lock, Radio, ShieldAlert, Coins, CheckCircle2 } from "lucide-react";

export function CrossChainFlow() {
    return (
        <section className="py-24 bg-surface/30 border-y border-border">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Text Steps */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                            Cross-Chain Lending <br />
                            <span className="text-muted-foreground">Without Bridging Assets</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                            Our unique architecture allows you to keep custody of your assets on the source chain while unlocking liquidity on Arbitrum. No wrapping, no bridging risk.
                        </p>

                        <div className="space-y-8 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-4 bottom-4 w-px bg-border -z-10" />

                            <div className="relative flex gap-6 group">
                                <div className="flex-none h-12 w-12 rounded-full border border-border bg-white flex items-center justify-center shadow-sm group-hover:border-black transition-colors z-10">
                                    <Lock className="h-5 w-5 text-muted-foreground group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">1. Deposit & Lock</h3>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Your assets (TSLA, AMZN) are locked in a native vault on the Robinhood Chain. You retain full ownership rights.
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex gap-6 group">
                                <div className="flex-none h-12 w-12 rounded-full border border-border bg-white flex items-center justify-center shadow-sm group-hover:border-black transition-colors z-10">
                                    <Radio className="h-5 w-5 text-muted-foreground group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">2. Oracle Verification</h3>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Decentralized oracles verify the lock event and transmit price feeds securely to the Arbitrum network.
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex gap-6 group">
                                <div className="flex-none h-12 w-12 rounded-full border border-border bg-white flex items-center justify-center shadow-sm group-hover:border-black transition-colors z-10">
                                    <Coins className="h-5 w-5 text-muted-foreground group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">3. Mint Stablecoins</h3>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Mint USDC directly on Arbitrum against your collateral. Funds are instantly available for DeFi strategies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Diagram */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl blur-2xl -z-10" />
                        <ProcessDiagram />
                    </div>
                </div>
            </Container>
        </section>
    );
}
