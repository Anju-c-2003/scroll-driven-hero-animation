'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, ShieldCheck, ArrowRight, Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CTASection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#05070a] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl border border-white/15 p-8 sm:p-14 bg-gradient-to-r from-slate-900 via-[#0a0f1c] to-[#120822] shadow-2xl relative overflow-hidden text-center space-y-8">
          {/* Ambient Radial Gradient Spotlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient opacity-80 pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>LIMITED PRE-SERIES ALLOCATION</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-[var(--font-display)] uppercase text-white tracking-wider max-w-4xl mx-auto leading-tight">
            Reserve Your <span className="text-gradient">ITZ FIZZ</span> Hypercar
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join an exclusive cohort of automotive visionaries. Secure early build slot priority and customized aerodynamic calibration.
          </p>

          {/* Interactive Email Form */}
          <div className="max-w-md mx-auto pt-4">
            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center space-x-3 text-sm font-medium animate-fadeIn">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Reservation Requested! Our telemetry team will contact you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your VIP email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/25"
                >
                  <span>Request Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Footer Features Trust Badges */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>FULL RACETRACK WARRANTY</span>
            </span>
            <span className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>CUSTOM CARBON LIVERY</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-cyan-400" />
              <span>GLOBAL HOMOLOGATION</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
