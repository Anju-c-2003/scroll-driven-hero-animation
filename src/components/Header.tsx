'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070a]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
            aria-label="ITZ FIZZ Home Page"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 text-slate-950 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-[var(--font-display)] text-lg font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                ITZ FIZZ
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400/80 font-mono uppercase">
                Hyper Performance
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            <a
              href="#hero"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              Overview
            </a>
            <a
              href="#specs"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              Performance
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              Aerodynamics
            </a>
            <a
              href="#telemetry"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              Telemetry
            </a>
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM READY</span>
            </div>

            <a
              href="#cta"
              className="hidden sm:inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-xs uppercase tracking-wider hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95 transition-all"
            >
              <span>Order Pre-Series</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-400 transition-colors"
            >
              Overview
            </a>
            <a
              href="#specs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-400 transition-colors"
            >
              Performance
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-400 transition-colors"
            >
              Aerodynamics
            </a>
            <a
              href="#telemetry"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-400 transition-colors"
            >
              Telemetry
            </a>
            <a
              href="#cta"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 w-full py-3 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20"
            >
              Order Pre-Series
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
