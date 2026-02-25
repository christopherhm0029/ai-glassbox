import type { NextConfig } from "next";

// Ensure Turbopack subprocesses (PostCSS) can find node
if (!process.env.PATH?.includes("/opt/homebrew/bin")) {
  process.env.PATH = `/opt/homebrew/bin:${process.env.PATH}`;
}

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* Static export only for production builds (GitHub Pages).
     In dev mode next dev needs a running server, not static files. */
  ...(isProd && { output: "export" }),

  /* basePath only in prod so GitHub Pages asset paths resolve correctly.
     In dev mode localhost:3000/ works without a prefix. */
  ...(isProd && { basePath: "/ai-glassbox" }),

  /* next/image optimization requires a server; disable for static export */
  images: { unoptimized: true },

  allowedDevOrigins: ["http://127.0.0.1", "http://localhost"],
};

export default nextConfig;
