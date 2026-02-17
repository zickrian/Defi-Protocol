import { Navbar } from "@/components/sections/navbar";

import { Hero } from "@/components/sections/hero";
import { SupportedAssets } from "@/components/sections/supported-assets";
import { CrossChainFlow } from "@/components/sections/cross-chain-flow";
import { Liquidity } from "@/components/sections/liquidity";
import { RiskEngine } from "@/components/sections/risk-engine";
import { OracleInfra } from "@/components/sections/oracle-infra";
import { Security } from "@/components/sections/security";
import { CapitalEfficiency } from "@/components/sections/capital-efficiency";
import { Metrics } from "@/components/sections/metrics";
import { Developers } from "@/components/sections/developers";
import { FAQ } from "@/components/sections/faq";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-text antialiased selection:bg-primary/20">
      <Navbar />

      <Hero />
      <SupportedAssets />
      <CrossChainFlow />
      <Liquidity />
      <RiskEngine />
      <OracleInfra />
      <Security />
      <CapitalEfficiency />
      <Metrics />
      <Developers />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
