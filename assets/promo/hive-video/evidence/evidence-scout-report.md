# HIVE promo evidence scout report

Scouted on 2026-07-15 (Asia/Manila). External repositories were treated as read-only: no source, configuration, dependency, database, or Git mutations were performed. Safe test/typecheck commands were used only where they do not target production systems.

## Recommended project set

1. **Pledgr — strongest complete proof package.** Use `public/captures/pledgr-app.png` (645x1350) or `pledgr-site-phone.png` (419x600), labeled as demo/local UI. Current verification passed 21/21 files and 165/165 tests, plus TypeScript. Architecture is directly documented in `C:\Pledgr\docs\ARCHITECTURE.md` (weekly-first local ledger, Expo, Zustand, SQLite, Vitest).
2. **HIVE — strongest product-identity visual, but remove or date-qualify the 260/260 claim.** Use `public/captures/hive-desktop.png` (1440x900) and/or `public/captures/hive-demo.mp4` (2400x1350, H.264, 60 fps, 18 s, video-only). The current TypeScript check passes and the README supports Queen-led orchestration, worktree isolation, provider routing, sessions, guarded approval, and reports. The screenshot is generated with the sanitized in-memory demo bridge in `scripts/capture-projects.mjs`; it is representative UI, not a historical run.
3. **TraderBot — strongest safety/test proof, weakest visual.** Use a designed terminal proof based on current sanitized output rather than invented application footage. Current module runs total 40/40 tests. `C:\TraderBot\README.md:8` and all four `.env.example` files set/document dry-run behavior; futures and MT5 source also default `dry_run` to true.
4. **Optional: Techquarters Management Hub.** `C:\TQ Financial Manager\README.md` strongly documents a financial dashboard, ledger, department/category reporting, staged CSV import, validation/deduplication, and human-approved AI suggestions. However, no sanitized product screenshot was found in the inspected proof set, so it should replace TraderBot only after a real local capture and fresh `npm test`/`npm run typecheck` evidence are collected. Do not use the unrelated Neuralyn landing-page hero as proof of the financial manager.

Do **not** use `C:\HiveMind\artifacts\hivemind-desktop.png` as-is. It contains surrounding desktop/task UI and user-identifying context. A tightly cropped or freshly sanitized app-only capture is required. Do not promote its documented test count without a fresh non-conflicting verification pass.

## Current verification results

| Project | Command / source | Result on 2026-07-15 | Promo status |
|---|---|---|---|
| HIVE | `npm test` in `C:\HIVE` | **Exit 1:** 260 total, 258 passed, 2 failed. Both failures were Windows `EPERM` renames in temporary `.hivemind/threads/.../thread.json` paths. | The undated claim **“260 tests passed” is not current/reproducible**. The existing `evidence/logs/hive-tests.txt` records a 260/260 run on 2026-07-14, so use only as explicitly dated historical evidence or remove the number. |
| HIVE | `npm run lint` in `C:\HIVE` | **Exit 0:** configured as `tsc --noEmit`. | “TypeScript check passed” is current and supported. |
| HIVE | `C:\HIVE\README.md:3,90-91,137-168`; `C:\HIVE\package.json` | Documents shared CLI/desktop core, Queen-led coding, role-based agents, scoped worktrees, provider routing, sessions, guarded change approval, and deterministic reports. | Capability wording is supported. Do not imply the representative demo is an actual historical agent run. |
| Pledgr | `npm run test:run -- --reporter=dot` in `C:\Pledgr` | **Exit 0:** 21 test files passed; 165 tests passed; Vitest duration 3.89 s. | “165 tests passed” and “21 test files passed” are current and supported. |
| Pledgr | `npm run typecheck` in `C:\Pledgr` | **Exit 0:** `tsc --noEmit`. | “TypeScript check passed” is current and supported. |
| Pledgr | `C:\Pledgr\package.json`; `C:\Pledgr\docs\ARCHITECTURE.md:7-15,23-45` | Documents Expo/React Native, Zustand, Expo SQLite, Vitest, a deterministic weekly calculation engine, and local-first ledger behavior. | Stack and product wording are supported. Captures contain demo state and must not be described as user data. |
| TraderBot spot | `python -m pytest -q -p no:cacheprovider` in `C:\TraderBot\crypto_spot_bot` | **Exit 0:** 4 passed in 0.17 s. | Supported. |
| TraderBot futures | Same command in `C:\TraderBot\crypto_futures_bot` | **Exit 0:** 14 passed in 6.98 s. | Supported. |
| TraderBot MT5 | Same command in `C:\TraderBot\exness_mt5_trader_bot` | **Exit 0:** 18 passed in 1.34 s. | Supported. |
| TraderBot Polymarket | Same command in `C:\TraderBot\polymarket_bot` | **Exit 0:** 4 passed in 0.05 s. | Supported. |
| TraderBot safety | `C:\TraderBot\README.md:8`; module `.env.example` files; `crypto_futures_bot\src\config.py:53`; `exness_mt5_trader_bot\src\config.py:124` | README says live trading is disabled by default; every module example sets `DRY_RUN=true`; futures/MT5 code defaults dry-run true. | “Live trading disabled by default” is supported. Do not show or run live mode. |

## Existing dated evidence

The following ignored log summaries do exist under `assets/promo/hive-video/evidence/logs/`:

- `hive-tests.txt`: 260/260, exit 0, captured 2026-07-14.
- `hive-typecheck.txt`: exit 0, captured 2026-07-14.
- `pledgr-tests.txt`: 165/165 across 21 files, exit 0, captured 2026-07-14.
- `pledgr-typecheck.txt`: exit 0, captured 2026-07-14.
- `traderbot-tests.txt`: 40 total across four modules, exit 0, captured 2026-07-14.

These are normalized summaries, not full raw runner transcripts. Pledgr and TraderBot were reproduced successfully on 2026-07-15. HIVE's 260/260 result was not reproduced, so it must not be presented as an unqualified current result.

## Unsupported or misleading existing promo copy

High priority:

- Replace or date-qualify **“260 HIVE tests passed” / “260 tests passed” / “260 passing HIVE tests”** in `src/data/projects.ts`, `src/compositions/Poster.tsx`, `scripts/on-screen-copy.md`, every voiceover text/Markdown file, and generated captions/audio. Safe current replacement: **“TypeScript check passed”**. If the dated result is retained: **“Jul 14 verification: 260/260 tests passed”**, accompanied by the newer rerun limitation in the evidence report.
- `src/data/evidence.ts` and `evidence/evidence.json` mark `hive-tests-260` simply `verified`. That is only accurate as a dated 2026-07-14 record; it is stale for a current-results wall.
- `src/scenes/EvidenceWall.tsx` says **“No hidden failures”** and labels the final report **“VERIFIED”** while the latest HIVE run has two failures. This is currently misleading. Use wording such as **“Results and limitations disclosed”** and compute status from the latest evidence set.
- The evidence-wall test-record count includes the stale HIVE success record. Recalculate after the HIVE record is downgraded or time-scoped.

Keep with labeling:

- `hive-desktop.png` is a real renderer capture driven by a synthetic sanitized bridge. Label **“Representative local renderer capture”**, not “historical HIVE run,” “real agent activity,” or “HIVE built this project.”
- `hive-demo.mp4` is an existing representative repository demo. Its asset properties are verified, but it is not evidence that HIVE historically performed a depicted project contribution.
- Pledgr screenshots are demo/local output. They prove an implemented interface exists, not deployment, adoption, revenue, or real user data.
- TraderBot has no project capture in the current promo package. The designed terminal scene is acceptable only because every shown line (4/14/18/4 passed and dry-run default) was reproduced.

## Claim-safe wording

- HIVE: **“Queen-led orchestration, guarded worktrees, provider routing, sessions, and evidence-backed reports.”**
- Cross-project bridge: **“Applying the HIVE verified engineering workflow to real project evidence.”**
- Pledgr: **“165 tests passed across 21 files; TypeScript check passed.”**
- TraderBot: **“40 tests passed across four safety-gated modules; live trading is disabled by default.”**
- HIVE test limitation: **“TypeScript check passed. Latest test rerun: 258/260 passed; two Windows temp-file rename failures remain disclosed.”** Use in documentation/evidence, not necessarily as hero copy.

## Traceability notes

- The current evidence schema should record `exitCode`; existing records omit it despite the requested schema.
- `evidenceType: "build-output"` is inaccurate for the HIVE/Pledgr TypeScript checks; use `typecheck-output` once the union is expanded to the requested schema.
- Preserve `capturedAt` in all on-screen-number provenance. A dated pass should never silently override a newer failed rerun.
- No secrets or `.env` contents were read. Only `.env.example` safety defaults were inspected.
