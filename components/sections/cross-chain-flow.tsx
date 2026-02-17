"use client";

import { Container } from "@/components/ui/container";
import { ArrowRight, Lock, Radio, ShieldAlert, Coins } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Deposit",
        description: "Lock TSLA on Robinhood Chain",
        icon: Lock,
    },
    {
        id: 2,
        title: "Oracle",
        description: "Price feeds & proof verification",
        icon: Radio,
    },
    {
        id: 3,
        title: "Risk Engine",
        description: "Calculate Borrow Power",
        icon: ShieldAlert,
    },
    {
        id: 4,
        title: "Borrow",
        description: "Mint USDC on Arbitrum",
        icon: Coins,
    },
];

export function CrossChainFlow() {
    return (
        <section className="py-24 bg-surface/30 border-y border-border">
            <Container>
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-4">
                        How It Works
                    </h2>
                    <p className="text-gray-600">
                        The lifecycle of a cross-chain loan in 4 steps.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10" />

                    <div className="grid gap-8 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative group">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white border-2 border-border shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-300">
                                        <step.icon className="h-10 w-10 text-gray-400 group-hover:text-primary transition-colors" />
                                        <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border text-sm font-bold text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">
                                            {step.id}
                                        </div>
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-text">{step.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 px-4">{step.description}</p>
                                </div>

                                {/* Arrow for mobile/tablet */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden flex justify-center py-4">
                                        <ArrowRight className="text-gray-300 transform rotate-90" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
