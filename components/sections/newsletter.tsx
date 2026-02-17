import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
    return (
        <section className="py-32 bg-white border-y border-border relative overflow-hidden">
            <Container>
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-8">
                        Ready to Unlock <br />
                        Global Liquidity?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Join thousands of users leveraging their real-world assets on-chain. Zero friction, instant borrowing, bank-grade security.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-black text-white hover:bg-zinc-800 w-full sm:w-auto">
                            Launch App
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-zinc-200 hover:bg-zinc-50 w-full sm:w-auto">
                            Read Documentation
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
