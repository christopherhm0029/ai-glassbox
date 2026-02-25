import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Ensure homebrew node is on PATH for Turbopack subprocesses
process.env.PATH = `/opt/homebrew/bin:${process.env.PATH}`;

const dir = dirname(fileURLToPath(import.meta.url));
const next = join(dir, "node_modules", ".bin", "next");

execFileSync(next, ["dev", dir], { stdio: "inherit", env: process.env });
