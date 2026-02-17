import { Container } from "@/components/ui/container";

export function Metrics() {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <Container>
                <div className="grid gap-12 text-center sm:grid-cols-3 relative z-10">
                    <div className="space-y-2">
                        <div className="text-5xl font-bold sm:text-7xl tracking-tighter">$142M+</div>
                        <div className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Total Value Locked</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-5xl font-bold sm:text-7xl tracking-tighter text-emerald-400">$84M+</div>
                        <div className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Total Borrowed</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-5xl font-bold sm:text-7xl tracking-tighter">1.82</div>
                        <div className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Avg. Health Factor</div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
