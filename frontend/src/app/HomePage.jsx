import React from 'react';
import Header from "../components/HomePage/header";
import HeroSection from "../components/HomePage/hero-section";
import StatsSection from "../components/HomePage/stats-section";
import CTASection from "../components/HomePage/cta-section";
import Web3AuthStatus from "../components/Web3AuthStatus";

export default function HomePage() {
  return (
    <main className="min-h-screen ">
      <div className="fixed top-4 right-4 z-50">
        <Web3AuthStatus />
      </div>
      <Header />
      <HeroSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
