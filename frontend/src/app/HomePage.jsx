import React from 'react';
import Header from "../components/HomePage/header";
import HeroSection from "../components/HomePage/hero-section";
import StatsSection from "../components/HomePage/stats-section";
import CTASection from "../components/HomePage/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
