'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Shield, Zap, Sparkles, Sliders, CheckCircle2, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FeaturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const features = [
    {
      id: 'hyper-launch',
      title: 'Hyper Launch Mode',
      subtitle: 'Instantaneous 1,850 HP Unlocked',
      description:
        'Engages active dynamic launch protocol, lowering ground clearance by 15mm while priming active carbon aero flaps for maximum traction off the line.',
      highlights: [
        '0-100 km/h in 1.74 seconds',
        'Active launch torque vectoring',
        'Overboost battery pre-conditioning',
      ],
      icon: Zap,
      stat: '1.74s',
      statLabel: 'Launch Acceleration',
    },
    {
      id: 'active-venturi',
      title: 'Venturi Aerodynamics',
      subtitle: 'Adaptive Underbody Ground Effect',
      description:
        'Automated underfloor venturi tunnels generate 1,200 kg of negative lift, keeping ITZ FIZZ glued to the tarmac through high-speed turns.',
      highlights: [
        'Variable geometry rear diffuser',
        'Cd 0.20 ultra-low drag coefficient',
        'Brake cooling air curtain channels',
      ],
      icon: Shield,
      stat: '1,200 kg',
      statLabel: 'Max Downforce',
    },
    {
      id: 'neural-cockpit',
      title: 'Quantum Telemetry HUD',
      subtitle: 'Real-Time Neural Drive Assist',
      description:
        'Augmented reality windshield projection displays apex entry points, tire thermal maps, and battery energy optimization curves.',
      highlights: [
        'Biometric driver feedback tracking',
        'Zero-latency optic projection',
        'Automated lap telemetry recording',
      ],
      icon: Sparkles,
      stat: '1,000 Hz',
      statLabel: 'Refresh Rate',
    },
  ];

  const currentFeature = features[activeTab];

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#05070a] border-t border-slate-800/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1.5 rounded-full">
            INTELLIGENT DYNAMICS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-[var(--font-display)] uppercase text-white tracking-wider">
            Revolutionary <span className="text-gradient">Drive Protocols</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Switch seamlessly between track-focused performance modes tuned for ultimate aerodynamic control.
          </p>
        </div>

        {/* Feature Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeTab === index;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
                aria-selected={isActive}
                role="tab"
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Feature Display Box */}
        <div
          ref={contentRef}
          className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-12 bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#070b14] shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
              <Sliders className="w-3.5 h-3.5" />
              <span>ACTIVE PROTOCOL {activeTab + 1} OF 3</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-[var(--font-display)] text-white">
              {currentFeature.title}
            </h3>

            <p className="text-base text-cyan-300/90 font-medium">
              {currentFeature.subtitle}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentFeature.description}
            </p>

            {/* Bullet points */}
            <ul className="space-y-3 pt-2">
              {currentFeature.highlights.map((point, pIdx) => (
                <li key={pIdx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Stat Visual Widget */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center relative group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/25 mb-4 group-hover:scale-110 transition-transform">
              {React.createElement(currentFeature.icon, { className: 'w-10 h-10 text-slate-950' })}
            </div>
            <div className="text-4xl sm:text-5xl font-black font-[var(--font-display)] text-white text-gradient">
              {currentFeature.stat}
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mt-2">
              {currentFeature.statLabel}
            </div>
            <div className="mt-6 w-full pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-cyan-400">
              <span>STATUS: ENGAGED</span>
              <span>100% READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
