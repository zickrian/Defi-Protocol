import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { BentoGrid } from "@/components/sections/bento-grid";
import { Architecture } from "@/components/sections/architecture";
import { Security } from "@/components/sections/security";
import { Footer } from "@/components/sections/footer";

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased selection:bg-[#0066FF]/10">
      <Navbar />
      
      <Hero />
      <BentoGrid />
      <Architecture />
      <Security />
      <Footer />
    </main>
  );
}