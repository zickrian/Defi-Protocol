"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Protocol", href: "#protocol" },
    { name: "Architecture", href: "#architecture" },
    { name: "Security", href: "#security" },
    { name: "FAQ", href: "#faq" },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e6e6e6]">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-[22px] font-bold tracking-tight text-black">
                            Auno
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-[15px] font-medium text-black transition-colors hover:text-[#0066FF]"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center rounded-md bg-[#0066FF] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                        >
                            DApp
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-black hover:text-[#0066FF] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden pb-6 pt-2 border-t border-[#e6e6e6]">
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-3 py-2.5 text-[15px] font-medium text-black rounded-md hover:bg-[#f6f9fc] hover:text-[#0066FF] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
}
