"use client";

import { Container } from "@/components/ui/container";

export function Metrics() {
    return (
        <section className="py-24 bg-primary text-white">
            <Container>
                <div className="grid gap-12 text-center sm:grid-cols-3">
                    <div>
                        <div className="text-4xl font-bold sm:text-5xl mb-2">$142M+</div>
                        <div className="text-primary-foreground/80 font-medium">Total Collateral Locked</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold sm:text-5xl mb-2">$84M+</div>
                        <div className="text-primary-foreground/80 font-medium">Total Borrowed</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold sm:text-5xl mb-2">1.82</div>
                        <div className="text-primary-foreground/80 font-medium">Average Health Factor</div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
