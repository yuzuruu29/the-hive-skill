export type EvidenceRecord = {
  id: string;
  project: string;
  claim: string;
  evidenceType:
    | "test-output"
    | "build-output"
    | "typecheck-output"
    | "lint-output"
    | "repository-file"
    | "git-history"
    | "application-screenshot"
    | "terminal-capture"
    | "documentation";
  sourcePath?: string;
  command?: string;
  exitCode?: number;
  capturedAt: string;
  result: "verified" | "partially-verified" | "unavailable";
  notes: string;
};

export const evidence: EvidenceRecord[] = [
  {
    id: "hive-tests-260",
    project: "HIVE",
    claim: "260 automated tests passed.",
    evidenceType: "test-output",
    sourcePath: "evidence/logs/hive-tests.txt",
    command: "npm test",
    exitCode: 0,
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "partially-verified",
    notes: "Dated 2026-07-14 pass. The 2026-07-15 rerun passed 258/260 and hit two Windows EPERM temporary-file rename failures, so this is not promoted as a current success.",
  },
  {
    id: "hive-tests-current-limit",
    project: "HIVE",
    claim: "Latest rerun passed 258 of 260 tests; two Windows temporary-file rename failures remain disclosed.",
    evidenceType: "test-output",
    sourcePath: "evidence/evidence-scout-report.md",
    command: "npm test",
    exitCode: 1,
    capturedAt: "2026-07-15T01:12:20.9774815+08:00",
    result: "partially-verified",
    notes: "Both failures were EPERM renames under temporary .hivemind thread paths. This limitation is intentionally not shown as a passing hero metric.",
  },
  {
    id: "hive-typecheck",
    project: "HIVE",
    claim: "TypeScript check passed.",
    evidenceType: "typecheck-output",
    sourcePath: "evidence/logs/hive-typecheck.txt",
    command: "npm run lint",
    exitCode: 0,
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "verified",
    notes: "The configured lint command is tsc --noEmit and exited 0.",
  },
  {
    id: "hive-runtime-description",
    project: "HIVE",
    claim: "Repository includes a Queen-led agent loop, provider routing, sessions, guarded changes, and reports.",
    evidenceType: "repository-file",
    sourcePath: "C:/HIVE/README.md",
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "verified",
    notes: "Current repository README and package scripts describe the runtime and desktop companion.",
  },
  {
    id: "hive-demo-capture",
    project: "The Hive Skill",
    claim: "HIVE orchestration workflow demonstrated in the repository promo asset.",
    evidenceType: "application-screenshot",
    sourcePath: "assets/demo/the-hive-skill-demo.mp4",
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "partially-verified",
    notes: "Repository documentation labels this as a representative demo, not historical task footage.",
  },
  {
    id: "pledgr-tests-165",
    project: "Pledgr",
    claim: "165 automated tests passed across 21 test files.",
    evidenceType: "test-output",
    sourcePath: "evidence/logs/pledgr-tests.txt",
    command: "npm run test:run -- --reporter=dot",
    exitCode: 0,
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "verified",
    notes: "Vitest reported 21 files and 165 tests passed.",
  },
  {
    id: "pledgr-typecheck",
    project: "Pledgr",
    claim: "TypeScript check passed.",
    evidenceType: "typecheck-output",
    sourcePath: "evidence/logs/pledgr-typecheck.txt",
    command: "npm run typecheck",
    exitCode: 0,
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "verified",
    notes: "tsc --noEmit exited 0.",
  },
  {
    id: "pledgr-stack",
    project: "Pledgr",
    claim: "Repository includes Expo, SQLite, Zustand, a local ledger, and weekly review workflows.",
    evidenceType: "repository-file",
    sourcePath: "C:/Pledgr/package.json",
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "verified",
    notes: "Package manifest and source routes support the description.",
  },
  {
    id: "traderbot-tests-40",
    project: "TraderBot",
    claim: "40 tests passed across spot, futures, MT5, and Polymarket modules.",
    evidenceType: "test-output",
    sourcePath: "evidence/logs/traderbot-tests.txt",
    command: "python -m pytest -q -p no:cacheprovider (in four module directories)",
    exitCode: 0,
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "verified",
    notes: "Module results were 4, 14, 18, and 4 passing tests.",
  },
  {
    id: "traderbot-safety",
    project: "TraderBot",
    claim: "Live trading is disabled by default.",
    evidenceType: "documentation",
    sourcePath: "C:/TraderBot/README.md",
    capturedAt: "2026-07-14T15:16:01.7965801+08:00",
    result: "verified",
    notes: "Repository README explicitly states this safety default.",
  },
];

export const verifiedEvidence = evidence.filter((item) => item.result === "verified");
