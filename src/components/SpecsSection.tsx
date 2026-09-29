'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Cpu, BatteryCharging, Flame, Radio, Compass } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SpecsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
              },
            }
          );
        }

        if (gridRef.current) {
          const cards = gridRef.current.children;
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  const specs = [
    {
      icon: Cpu,
      title: 'Neural Torque Vectoring',
      value: '10,000 RPM',
      description: 'Real-time per-wheel torque distribution recalculated 1,000 times per second for apex traction.',
      tag: 'CONTROL SYSTEM',
    },
    {
      icon: BatteryCharging,
      title: 'Solid-State Battery Core',
      value: '120 kWh',
      description: '800V ultra-fast architecture capable of 10% to 80% charge replenishment in 12 minutes.',
      tag: 'ENERGY DENSITY',
    },
    {
      icon: Flame,
      title: 'Peak Output Torque',
      value: '2,360 Nm',
      description: 'Immediate mechanical thrust with active thermal cooling channels protecting cell integrity.',
      tag: 'PERFORMANCE',
    },
    {
      icon: Compass,
      title: 'Carbon Monocoque',
      value: '1,680 kg',
      description: 'Aerospace-grade autoclave carbon fiber chassis delivering unmatched torsional rigidity.',
      tag: 'STRUCTURE',
    },
    {
      icon: Radio,
      title: 'Telemetry Telematics',
      value: '5G Low-Latency',
      description: 'Direct satellite telemetry streaming over 120 live vehicle data sensors to driver HUD.',
      tag: 'CONNECTIVITY',
    },
    {
      icon: ShieldCheck,
      title: 'Active Aero Venturi',
      value: '1,200 kg @ 250km/h',
      description: 'Automated hydraulic rear wing and dynamic underbody diffusers maintaining ground effect.',
      tag: 'AERODYNAMICS',
    },
  ];

  return (
    <section
      id="specs"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#080b12] border-t border-slate-800/60 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1.5 rounded-full">
            ENGINEERING METRICS & TELEMETRY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-[var(--font-display)] uppercase text-white tracking-wider">
            Unrivaled <span className="text-gradient">Performance Matrix</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every curve and micro-component of ITZ FIZZ is precision calibrated for extreme aerodynamics and record-breaking track velocity.
          </p>
        </div>

        {/* Specs Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {specs.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <article
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-black font-[var(--font-display)] text-cyan-400 my-2">
                    {item.value}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>TELEMETRY VERIFIED</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
