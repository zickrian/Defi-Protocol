"use client";

import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Twitter, Github, Disc } from "lucide-react";

const footerLinks = {
    Protocol: [
        { name: "Market", href: "#" },
        { name: "Prices", href: "#" },
        { name: "Docs", href: "#" },
    ],
    Developers: [
        { name: "Documentation", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Audits", href: "#" },
    ],
    Security: [
        { name: "Bug Bounty", href: "#" },
        { name: "Risk Assessment", href: "#" },
    ],
    Legal: [
        { name: "Terms", href: "#" },
        { name: "Privacy", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight text-text">
                            Auno
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">
                            Native Collateral.<br />Cross-Chain Liquidity.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="text-gray-400 hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary">
                                <Disc className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-sm font-semibold text-text mb-4">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-gray-500 hover:text-primary transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Auno Protocol. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
