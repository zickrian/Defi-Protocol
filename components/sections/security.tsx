import { Container } from "@/components/ui/container";
import { SecurityVisual } from "@/components/visuals/security-visual";
import { FileCheck, Shield, Lock, Eye } from "lucide-react";

export function Security() {
    return (
        <section className="py-24 bg-white relative">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Visual */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl -z-10" />
                        <SecurityVisual />
                    </div>

                    {/* Right Column: Content */}
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 mb-6">
                            <Shield className="mr-2 h-4 w-4" />
                            Bank-Grade Security
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                            Fortified Architecture <br />
                            <span className="text-muted-foreground">Audited & Verified</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                            We prioritize fund safety above all else. Our codebase undergoes rigorous audits and formally verified proofs.
                        </p>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="group p-6 rounded-2xl border border-border hover:border-black transition-colors bg-white hover:shadow-lg">
                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                                    <FileCheck className="h-5 w-5" />
                                </div>
                                <h3 className="font-bold text-foreground mb-2">Smart Contract Audits</h3>
                                <p className="text-sm text-muted-foreground">
                                    Audited by OpenZeppelin and Trail of Bits. Zero critical vulnerabilities found.
                                </p>
                            </div>

                            <div className="group p-6 rounded-2xl border border-border hover:border-black transition-colors bg-white hover:shadow-lg">
                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                                    <Eye className="h-5 w-5" />
                                </div>
                                <h3 className="font-bold text-foreground mb-2">Real-Time Monitoring</h3>
                                <p className="text-sm text-muted-foreground">
                                    24/7 on-chain monitoring for suspicious activity and flash loan attacks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
