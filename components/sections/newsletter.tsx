"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Newsletter() {
    return (
        <section className="py-24 bg-surface/30 border-t border-border">
            <Container>
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl mb-4">
                        Stay Updated
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Get the latest updates on protocol governance, new assets, and features.
                    </p>
                    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                </div>
            </Container>
        </section>
    );
}
