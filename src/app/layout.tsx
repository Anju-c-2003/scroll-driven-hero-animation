import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'W E L C O M E   I T Z   F I Z Z | Next-Gen Electric Hypercar',
  description: 'Experience the scroll-driven aerodynamic precision of ITZ FIZZ. 1,850 HP quad-motor electric hypercar engineered for ultimate performance.',
  keywords: ['ITZ FIZZ', 'Electric Hypercar', 'GSAP Scroll Animation', 'Frontend Assessment', 'Aerodynamics'],
  authors: [{ name: 'ITZ FIZZ Engineering' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-[#05070a] text-slate-100 antialiased selection:bg-[#00f0ff] selection:text-[#05070a]">
        {children}
      </body>
    </html>
  );
}
