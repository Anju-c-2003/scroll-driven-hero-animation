'use client';

import React from 'react';
import { Zap, Github, Twitter, Linkedin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030407] border-t border-slate-800/80 text-slate-400 py-16 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="font-[var(--font-display)] text-lg font-black tracking-widest text-white">
                ITZ FIZZ
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scroll-driven aerodynamic electric hypercar engineering. Designed for peak velocity and futuristic performance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">
                  Overview Hero
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-cyan-400 transition-colors">
                  Telemetry Specs
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">
                  Drive Protocols
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-cyan-400 transition-colors">
                  Pre-Series Reservation
                </a>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Tech Stack
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>Next.js / App Router</li>
              <li>React & TypeScript</li>
              <li>Tailwind CSS</li>
              <li>GSAP & ScrollTrigger</li>
            </ul>
          </div>

          {/* Social & Back To Top */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                Connect
              </h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  aria-label="GitHub Repository"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter Profile"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group focus:outline-none"
            >
              <span>BACK TO TOP</span>
              <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} ITZ FIZZ Hypercar Corp. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Frontend Assessment Implementation</p>
        </div>
      </div>
    </footer>
  );
};
