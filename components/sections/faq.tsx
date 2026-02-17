"use client";

import { Container } from "@/components/ui/container";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How does cross-chain borrowing work?",
        answer:
            "Auno locks your tokenized equities (e.g., TSLA) on the Robinhood Chain in a non-custodial smart contract. The Oracle verifies the lock and price, signaling the Risk Engine on Arbitrum to mint borrowing power. You can then borrow USDC or ETH on Arbitrum against your remote collateral.",
    },
    {
        question: "Where is my collateral stored?",
        answer:
            "Your collateral remains on the Robinhood Chain in a secure, audited smart contract vault. It never leaves the native chain, eliminating bridging risks associated with wrapped assets.",
    },
    {
        question: "How do liquidations happen?",
        answer:
            "If your Health Factor drops below 1.0, liquidators on the Robinhood Chain can repay a portion of your debt on Arbitrum to claim your collateral at a discount. This ensures protocol solvency without moving assets across chains.",
    },
    {
        question: "Is the Oracle reliable?",
        answer:
            "Yes. We use a decentralized oracle network with redundant price feeds, heartbeat checks, and manipulation-resistant aggregation logic to ensure accurate real-time pricing.",
    },
];

export function FAQ() {
    return (
        <section className="py-24 bg-background" id="faq">
            <Container>
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <Disclosure key={faq.question} as="div" className="border-b border-border pb-4">
                                <Disclosure.Button className="group flex w-full items-center justify-between py-2 text-left text-lg font-medium text-text hover:text-primary focus:outline-none">
                                    <span>{faq.question}</span>
                                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-data-[open]:rotate-180" />
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="mt-2 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </Disclosure.Panel>
                                </Transition>
                            </Disclosure>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
