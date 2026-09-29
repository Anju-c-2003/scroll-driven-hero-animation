// @ts-check

/**
 * Detect whether the build is running in GitHub Actions CI.
 * In GitHub Actions, GITHUB_ACTIONS is always "true".
 * Locally it is undefined, so basePath and assetPrefix remain empty strings,
 * keeping http://localhost:3000 working without any changes.
 */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Static HTML Export ──────────────────────────────────────────────────
  // Generates the `out/` directory with pre-rendered HTML + static assets.
  // No Node.js server is required; compatible with GitHub Pages hosting.
  output: 'export',

  // ── Base Path ───────────────────────────────────────────────────────────
  // Set to the GitHub repository name in CI so all internal Next.js links
  // are correctly prefixed under /scroll-driven-hero-animation/.
  // Empty during local development so localhost:3000 works normally.
  basePath: isGitHubPages ? '/scroll-driven-hero-animation' : '',

  // ── Asset Prefix ────────────────────────────────────────────────────────
  // Prepended to every _next/static/… URL so JS, CSS and font chunks load
  // from the correct sub-path on GitHub Pages.
  assetPrefix: isGitHubPages ? '/scroll-driven-hero-animation/' : '',

  // ── Trailing Slash ──────────────────────────────────────────────────────
  // Writes pages as index.html files (e.g. /about/index.html) so GitHub
  // Pages can serve them at /about/ without a 404.
  trailingSlash: true,

  // ── Image Optimization ──────────────────────────────────────────────────
  // next/image's server-side optimization API is unavailable in static
  // exports. `unoptimized: true` passes images through as-is.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
