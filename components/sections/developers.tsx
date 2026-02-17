"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Code2, Book, Github } from "lucide-react";

export function Developers() {
    return (
        <section className="py-24 bg-surface/50 border-b border-border" id="developers">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-6">
                            Built for Developers.
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Integrate Auno's liquidity and risk engine into your applications. Fully composable, EVM compatible, and open source.
                        </p>
                        <div className="flex gap-4">
                            <Button>
                                <Book className="mr-2 h-4 w-4" />
                                Documentation
                            </Button>
                            <Button variant="outline">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <Card className="hover:border-primary transition-colors cursor-pointer">
                                <CardContent className="p-6">
                                    <Terminal className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-bold mb-2">SDK & API</h3>
                                    <p className="text-sm text-gray-500">TypeScript SDK for easy integration.</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:border-primary transition-colors cursor-pointer">
                                <CardContent className="p-6">
                                    <Code2 className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="font-bold mb-2">Smart Contracts</h3>
                                    <p className="text-sm text-gray-500">Modular architecture on Arbitrum.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
