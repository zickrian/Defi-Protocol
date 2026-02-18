"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Loader2 } from "lucide-react";

const navLinks = [
    { name: "Protocol", href: "#protocol" },
    { name: "Architecture", href: "#architecture" },
    { name: "Security", href: "#security" },
    { name: "Developers", href: "#developers" },
    { name: "FAQ", href: "#faq" },
];

export function Navbar() {
    const { isConnected, isConnecting, displayAddress, handleConnect } = useWallet()

    const buttonLabel = isConnecting
        ? "Connecting..."
        : isConnected
            ? (displayAddress ?? "Connected")
            : "Connect Wallet"

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-xl font-bold tracking-tight text-text">
                            Auno
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="default"
                            className="rounded-full"
                            onClick={handleConnect}
                            disabled={isConnecting}
                        >
                            {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {buttonLabel}
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
}
