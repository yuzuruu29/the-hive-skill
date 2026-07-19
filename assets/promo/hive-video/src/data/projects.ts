export type ProjectProof = {
  name: string;
  eyebrow: string;
  description: string;
  proofs: string[];
  accent: string;
  capture?: string;
  captureLabel?: string;
};

export const projectProofs: ProjectProof[] = [
  {
    name: "HIVE",
    eyebrow: "Verified agent runtime",
    description: "Queen-led planning, building, validation, review, and bounded repair.",
    proofs: ["TypeScript check passed", "Latest test limit disclosed"],
    accent: "#A78BFA",
    capture: "captures/hive-desktop.png",
    captureLabel: "Representative local renderer capture",
  },
  {
    name: "Pledgr",
    eyebrow: "Mobile budget ledger",
    description: "Expo, SQLite, Zustand, local ledger workflows, and weekly review logic.",
    proofs: ["165 tests passed", "21 test files passed"],
    accent: "#3DD6B0",
    capture: "captures/pledgr-app.png",
    captureLabel: "Local Expo web export capture",
  },
  {
    name: "TraderBot",
    eyebrow: "Safety-gated trading tools",
    description: "Independent spot, futures, MT5, and Polymarket modules with explicit safety defaults.",
    proofs: ["40 tests passed", "Live trading disabled by default"],
    accent: "#F5B942",
  },
];
