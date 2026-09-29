import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SpecsSection } from '@/components/SpecsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-sans">
      <Header />
      <main id="main-content">
        <HeroSection />
        <SpecsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
