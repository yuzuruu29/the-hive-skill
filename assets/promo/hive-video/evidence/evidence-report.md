# Evidence report

Promotional claims were refreshed on 2026-07-15. External repositories were inspected and tested without changing application code, dependencies, configuration, Git state, or generated deliverables. Current failures and dated historical results remain explicit.

| Claim | Result | Source or command |
|---|---|---|
| HIVE dated test run: 260/260 on 2026-07-14 | Historical only | Normalized `evidence/logs/hive-tests.txt`; not promoted as current |
| HIVE latest rerun: 258/260; two Windows EPERM temp-file rename failures | Partially verified, limitation disclosed | `npm test` in `C:\HIVE` on 2026-07-15, exit 1 |
| HIVE TypeScript check passed | Verified current | `npm run lint` in `C:\HIVE`; configured as `tsc --noEmit`, exit 0 |
| HIVE includes Queen-led orchestration, provider routing, sessions, guarded changes, and reports | Verified | `C:\HIVE\README.md` and `C:\HIVE\package.json` |
| Pledgr passed 165 tests across 21 files | Verified | `npm run test:run -- --reporter=dot` in `C:\Pledgr` |
| Pledgr TypeScript check passed | Verified | `npm run typecheck` in `C:\Pledgr` |
| Pledgr includes Expo, SQLite, Zustand, local ledger, and weekly review workflows | Verified | `C:\Pledgr\package.json` and repository source routes |
| TraderBot passed 40 tests across four modules | Verified | `python -m pytest -q -p no:cacheprovider` in each bot module |
| TraderBot disables live trading by default | Verified | `C:\TraderBot\README.md` |
| The Hive Skill repository includes an 18-second H.264 orchestration demo | Verified as an asset; workflow attribution is partial | `assets/demo/the-hive-skill-demo.mp4` and its README |

The HIVE desktop screenshot is a capture of the real local renderer build with a sanitized demo bridge, so it is labeled as a representative local capture rather than evidence of a historical run. Pledgr captures come from its existing local web/static output and contain demo data. No terminal secrets, `.env` values, personal emails, private URLs, or user records are included.
