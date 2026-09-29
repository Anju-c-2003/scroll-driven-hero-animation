'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { StatCard } from './StatCard';
import { Zap, Gauge, Wind, ArrowDown } from 'lucide-react';

// Register plugin once at module level (safe: guarded by typeof window in Next.js)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection: React.FC = () => {
  // Refs for animated elements
  const sectionRef = useRef<HTMLElement>(null);   // Outermost scroll container
  const stickyRef = useRef<HTMLDivElement>(null); // Sticky pinned viewport
  const subtitleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const speedLineRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const car = carRef.current;
      const headline = headlineRef.current;
      const stats = statsRef.current;
      const glow = glowRef.current;
      const subtitle = subtitleRef.current;
      const scrollHint = scrollHintRef.current;

      if (!section || !car || !headline || !stats) return;

      // matchMedia for prefers-reduced-motion support
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ─────────────────────────────────────────────────────────
        // 1. INITIAL LOAD ANIMATION
        // ─────────────────────────────────────────────────────────
        const loadTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.1,
        });

        // Subtitle badge: drops down from slightly above
        if (subtitle) {
          loadTl.fromTo(
            subtitle,
            { autoAlpha: 0, y: -16 },
            { autoAlpha: 1, y: 0, duration: 0.7 }
          );
        }

        // Headline: staggered per-character upward fade
        // querySelectorAll scoped inside headlineRef
        const chars = headline.querySelectorAll<HTMLSpanElement>('.headline-char');
        if (chars.length > 0) {
          loadTl.fromTo(
            chars,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.035,
              ease: 'power4.out',
            },
            '-=0.4'
          );
        }

        // Car visual: scale up + fade in with a slight upward drift
        loadTl.fromTo(
          car,
          { autoAlpha: 0, scale: 0.88, y: 30 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=0.7'
        );

        // Stats cards: staggered upward reveal, one by one
        const cards = Array.from(stats.children) as HTMLElement[];
        if (cards.length > 0) {
          loadTl.fromTo(
            cards,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.14,
              ease: 'power3.out',
            },
            '-=0.6'
          );
        }

        // Scroll hint fades in last
        if (scrollHint) {
          loadTl.fromTo(
            scrollHint,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6 },
            '-=0.2'
          );
        }

        // ─────────────────────────────────────────────────────────
        // 2. SCROLL-DRIVEN ANIMATION (ScrollTrigger + scrub)
        //
        // The section is min-h-[300vh] so the sticky container
        // stays on screen for ~2x viewport heights of scroll.
        // scrub: 1 gives a slightly smoothed, premium feel.
        // ─────────────────────────────────────────────────────────
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1 (first half of scroll):
        //   • Car scales up and drifts left + up with slight CCW tilt
        //   • Headline drifts upward and fades out
        //   • Stats drift downward and soften
        //   • Glow expands
        scrollTl
          .to(car, {
            x: '-6%',
            y: '-4%',
            scale: 1.18,
            rotation: -3,
            ease: 'none',
            duration: 1,
          }, 0)
          .to(headline, {
            y: -70,
            opacity: 0.3,
            scale: 0.96,
            ease: 'none',
            duration: 1,
          }, 0)
          .to(stats, {
            y: 55,
            opacity: 0.55,
            ease: 'none',
            duration: 1,
          }, 0)
          .to(glow, {
            scale: 1.5,
            opacity: 0.85,
            ease: 'none',
            duration: 1,
          }, 0);

        // Phase 2 (second half of scroll):
        //   • Car continues gliding right + down, tilts back CW, scales further
        //   • Headline almost invisible, shifted opposite direction
        //   • Stats almost gone
        scrollTl
          .to(car, {
            x: '8%',
            y: '4%',
            scale: 1.32,
            rotation: 2.5,
            ease: 'none',
            duration: 1,
          }, 1)
          .to(headline, {
            y: -130,
            opacity: 0.08,
            scale: 0.92,
            ease: 'none',
            duration: 1,
          }, 1)
          .to(stats, {
            y: 105,
            opacity: 0.2,
            ease: 'none',
            duration: 1,
          }, 1);

        // Speed-circuit line draws in as user scrolls
        const line = speedLineRef.current;
        if (line) {
          try {
            const totalLength = line.getTotalLength();
            gsap.set(line, {
              strokeDasharray: totalLength,
              strokeDashoffset: totalLength,
            });
            scrollTl.to(line, {
              strokeDashoffset: 0,
              ease: 'none',
              duration: 2,
            }, 0);
          } catch {
            // getTotalLength may fail in SSR; silently ignore
          }
        }

        // Clean up on scope unmount (handled by useGSAP automatically,
        // but explicit revert ensures ScrollTrigger instances are killed)
        return () => {
          scrollTl.scrollTrigger?.kill();
        };
      });

      // ─── Reduced-motion fallback: simple fade only ───────────
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const elements = [subtitle, headline, car, stats, scrollHint].filter(Boolean);
        gsap.set(elements, { autoAlpha: 0 });
        gsap.to(elements, {
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  const headline = 'W E L C O M E  I T Z  F I Z Z';

  return (
    <section
      id="hero"
      ref={sectionRef}
      // 300vh gives a generous scroll distance so the animation
      // is comfortably visible before the next section appears
      className="relative min-h-[300vh] bg-[#05070a]"
      aria-label="ITZ FIZZ Hypercar Hero"
    >
      {/* ── Sticky Viewport (stays pinned while section scrolls) ── */}
      <div
        ref={stickyRef}
        className="hero-sticky pt-20 px-4 sm:px-6 lg:px-10 pb-4"
      >
        {/* ── Decorative Background Layers ── */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
        <div
          ref={glowRef}
          className="will-transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,240,255,0.18) 0%, rgba(121,40,202,0.10) 50%, transparent 75%)',
            filter: 'blur(80px)',
          }}
          aria-hidden="true"
        />

        {/* Ambient speed-circuit SVG line (drawn in during scroll) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-0"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#7928ca" />
              <stop offset="100%" stopColor="#ff0080" />
            </linearGradient>
          </defs>
          <path
            ref={speedLineRef}
            d="M -100 380 C 250 200, 600 520, 1200 320 C 1600 160, 2000 420, 2500 360"
            fill="none"
            stroke="url(#neon-gradient)"
            strokeWidth="2.5"
          />
        </svg>

        {/* ── ROW 1: Subtitle badge + Headline ── */}
        <div className="relative z-20 text-center w-full max-w-7xl mx-auto pt-1 sm:pt-2 flex flex-col items-center gap-3">
          {/* Subtitle badge */}
          <div
            ref={subtitleRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 backdrop-blur-md text-cyan-400 text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-lg"
            aria-hidden="true"
          >
            <Zap className="w-3 h-3 text-cyan-400 fill-current animate-pulse" />
            <span>Aerodynamic Electric Hypercar</span>
          </div>

          {/* Large letter-spaced headline */}
          <h1
            ref={headlineRef}
            className="will-transform text-[1.4rem] xs:text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[4.5rem] font-black uppercase leading-tight text-white drop-shadow-2xl flex flex-wrap justify-center w-full"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }}
            aria-label="Welcome ITZ FIZZ"
          >
            {headline.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4 last:mr-0">
                {word.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="headline-char inline-block hover:text-cyan-400 transition-colors duration-200"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* ── ROW 2: Central Car Visual ── */}
        <div
          ref={carRef}
          className="will-transform relative z-10 w-full max-w-4xl mx-auto flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {/* Ground shadow / neon floor glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[100%] pointer-events-none"
            style={{ background: 'rgba(0,240,255,0.18)', filter: 'blur(16px)' }}
          />
          <Image
            // NEXT_PUBLIC_BASE_PATH is '' locally and '/scroll-driven-hero-animation'
            // in GitHub Actions CI. Prefixing here ensures the image resolves
            // at the correct absolute path under the GitHub Pages sub-path.
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/itz-fizz-car.png`}
            alt="ITZ FIZZ Electric Hypercar — side profile of the quad-motor hypercar at rest"
            width={1200}
            height={600}
            priority
            className="w-full h-auto object-contain"
            style={{
              maxHeight: 'clamp(160px, 32vh, 340px)',
              filter: 'drop-shadow(0 16px 48px rgba(0,240,255,0.22))',
            }}
          />
        </div>

        {/* ── ROW 3: Impact stat cards + scroll hint ── */}
        <div className="relative z-30 w-full max-w-6xl mx-auto flex flex-col gap-3">
          {/* 3-column stat grid (collapses to single col on mobile) */}
          <div
            ref={statsRef}
            className="will-transform grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            role="region"
            aria-label="Key Performance Statistics"
          >
            <StatCard
              value="98.4%"
              label="Kinetic Power Efficiency"
              description="SiC inverter architecture with instant torque vectoring and near-zero thermal loss."
              icon={Zap}
              badgeText="AERO METRICS"
              trend="+14.2% VS BENCHMARK"
            />
            <StatCard
              value="1.74s"
              label="0–100 km/h Acceleration"
              description="Quad independent motors generating 1,850 HP with active dynamic downforce control."
              icon={Gauge}
              badgeText="POWERTRAIN"
              trend="1,850 HORSEPOWER"
            />
            <StatCard
              value="99.9%"
              label="Venturi Downforce Ratio"
              description="Active underbody tunnels generate 1,200 kg downforce for stability at top speed."
              icon={Wind}
              badgeText="AERODYNAMICS"
              trend="ACTIVE FLAPS"
            />
          </div>

          {/* Scroll hint */}
          <div
            ref={scrollHintRef}
            className="flex items-center justify-center gap-2 text-slate-400 text-[10px] font-mono uppercase tracking-widest"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-3 h-3 text-cyan-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
