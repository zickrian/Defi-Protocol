"use client";

import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Globe, Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_SECTIONS = [
    {
        title: "Institutions",
        links: [
            { name: "Prime", href: "#" },
            { name: "Staking", href: "/dashboard/staking" },
            { name: "Exchange", href: "#" },
            { name: "Cross-Chain Bridge", href: "#" },
            { name: "Derivatives", href: "#" },
            { name: "Verified Pools", href: "#" },
    ],
    },
    {
        title: "Developers",
        links: [
            { name: "Developer Platform", href: "#" },
            { name: "Base", href: "#" },
            { name: "SDK", href: "#" },
            { name: "Smart Contracts", href: "#" },
            { name: "Onramp & Offramp", href: "#" },
            { name: "Trade API", href: "#" },
            { name: "Lending API", href: "#" },
            { name: "Data API", href: "#" },
            { name: "Verifications", href: "#" },
            { name: "Node", href: "#" },
            { name: "Staking", href: "#" },
            { name: "Faucet", href: "#" },
            { name: "Exchange API", href: "#" },
            { name: "Prime API", href: "#" },
            { name: "Derivatives API", href: "#" },
    ],
    },
    {
        title: "Support",
        links: [
            { name: "Help center", href: "#" },
            { name: "Contact us", href: "#" },
            { name: "Create account", href: "#" },
            { name: "ID verification", href: "#" },
            { name: "Account information", href: "#" },
            { name: "Payment methods", href: "#" },
            { name: "Account access", href: "#" },
            { name: "Supported crypto", href: "#" },
            { name: "Status", href: "#" },
        ],
    },
    {
        title: "Asset prices",
        links: [
            { name: "Bitcoin price", href: "#" },
            { name: "Ethereum price", href: "#" },
            { name: "USDC price", href: "#" },
            { name: "Solana price", href: "#" },
        ],
    },
    {
        title: "Stock prices",
        links: [
            { name: "Tesla price", href: "#" },
            { name: "Amazon price", href: "#" },
            { name: "AMD price", href: "#" },
            { name: "Netflix price", href: "#" },
    ],
    },
];

export function Footer() {
    return (
        <footer className="bg-[#f6f9fc] pt-12 pb-8 border-t border-[#e6e6e6]">
            <Container>
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
                    {/* Footer Links Columns */}
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-[15px] font-bold text-black mb-4">{section.title}</h3>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-[14px] font-medium text-[#425466] hover:text-black transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-[#e6e6e6] flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Social Media & Copyright */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Social Media Icons */}
                        <div className="flex items-center gap-4">
                            <Link 
                                href="#" 
                                className="text-[#425466] hover:text-black transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link 
                                href="#" 
                                className="text-[#425466] hover:text-black transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link 
                                href="#" 
                                className="text-[#425466] hover:text-black transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>

                        {/* Copyright */}
                        <div className="text-[14px] font-medium text-[#425466]">
                            © 2026 Auno • <Link href="#" className="hover:text-black transition-colors">Privacy</Link> • <Link href="#" className="hover:text-black transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>

                    {/* Language Selector */}
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#425466]" />
                        <span className="text-[14px] font-medium text-[#425466]">Global • English</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}