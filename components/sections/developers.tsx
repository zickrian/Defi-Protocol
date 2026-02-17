import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CodeWindow } from "@/components/visuals/code-window";
import { Terminal, Code2, Book, Github, ArrowRight } from "lucide-react";

export function Developers() {
    return (
        <section className="py-24 bg-zinc-50 border-b border-border" id="developers">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <div>
                        <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-medium text-zinc-800 mb-6">
                            <Terminal className="mr-2 h-3.5 w-3.5" />
                            Developer Experience
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                            Built for Developers <br />
                            <span className="text-muted-foreground">By Developers</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Integrate Auno's liquidity and risk engine into your applications. Fully composable, EVM compatible, and open source.
                        </p>

                        <div className="flex gap-4">
                            <Button className="rounded-full px-6 bg-black text-white hover:bg-zinc-800">
                                <Book className="mr-2 h-4 w-4" />
                                Read Documentation
                            </Button>
                            <Button variant="outline" className="rounded-full px-6 border-zinc-300 hover:bg-white">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-6">
                            <div className="border-l-2 border-zinc-200 pl-4 hover:border-black transition-colors">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Code2 className="h-4 w-4" /> SDK & API
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">TypeScript SDK for seamless integration.</p>
                            </div>
                            <div className="border-l-2 border-zinc-200 pl-4 hover:border-black transition-colors">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Terminal className="h-4 w-4" /> CLI Tools
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">Manage positions from your command line.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Code Window */}
                    <div className="relative">
                        <div className="absolute top-10 right-10 -left-10 bottom-10 bg-gradient-to-tr from-purple-500/5 to-cyan-500/5 rounded-3xl blur-2xl -z-10" />
                        <CodeWindow />
                    </div>

                </div>
            </Container>
        </section>
    );
}
