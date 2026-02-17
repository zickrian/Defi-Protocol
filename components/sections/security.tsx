"use client";

import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Shield, Lock, Eye } from "lucide-react";

const features = [
    {
        name: "Smart Contract Audits",
        description: "Codebase audited by top-tier firms including OpenZeppelin and Trail of Bits.",
        icon: FileCheck,
    },
    {
        name: "Oracle Verification",
        description: "Cryptographic proof of price data origin and integrity on every update.",
        icon: Shield,
    },
    {
        name: "Cross-Chain Integrity",
        description: "Atomic transactions ensuring collateral is never unlocked without debt repayment.",
        icon: Lock,
    },
    {
        name: "Liquidation Safeguards",
        description: "Incentivized liquidation network to maintain protocol solvency.",
        icon: Eye,
    },
];

export function Security() {
    return (
        <section className="py-24 bg-surface/30">
            <Container>
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Security First Architecture
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Built to withstand market volatility and adversarial conditions.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.name} className="border-border shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{feature.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
}
