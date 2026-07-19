# HIVE promotional video

This isolated Remotion package renders the evidence-backed launch video for **HIVE — Hyper Intelligence for Verified Engineering**. It produces intentional 16:9, 9:16, and 1:1 compositions, narrated and muted exports, separate captions, poster art, a social thumbnail, and a GitHub-ready preview GIF.

## Requirements

- Node.js 22.12 or newer
- npm
- FFmpeg and FFprobe
- `edge-tts` for the included neutral synthetic narration
- Playwright Chromium for fresh local interface captures
- Local evidence repositories at `C:\HIVE`, `C:\Pledgr`, and `C:\TraderBot` when refreshing evidence

## Install and preview

```powershell
cd C:\the-hive-skill\assets\promo\hive-video
npm install
npm run audio
npm run capture
npm run studio
```

Cross-platform:

```bash
cd assets/promo/hive-video
npm install
npm run audio
npm run capture
npm run studio
```

## Evidence collection

The evidence package records the dated 2026-07-14 run and the refreshed 2026-07-15 checks. The latest HIVE test limitation is disclosed; Pledgr and TraderBot pass claims were reproduced. To rerun the non-writing checks and generate `evidence/evidence-latest.json`:

```powershell
npm run evidence
```

The script runs test and typecheck commands only. It disables the pytest cache and does not build, migrate, trade, publish, or alter source files in the external repositories.

## Rendering

```powershell
npm run render:master
npm run render:social
npm run render:square
npm run render:muted
npm run render:stills
npm run render:all
```

`npm run render:all` also renders key-frame QA stills, a low-resolution preview, the GIF, a 1280×720 review copy, and `dist/media-report.json`.

Reference-film pacing and clean-room transfer guidance live in `analysis/reference-video-analysis.md` and `analysis/reference-shot-map.json`. The downloaded source film is never retained or shipped.

Windows wrapper:

```powershell
.\scripts\render.ps1
```

Cross-platform wrapper:

```bash
./scripts/render.sh
```

## Optional 4K master

The 4K render is optional and is intentionally excluded from the required outputs:

```powershell
npx remotion render src/index.ts HivePromoMaster dist/hive-promo-master-4k.mp4 --scale=2 --codec=h264 --crf=18 --audio-codec=aac
```

## Updating narration

Edit `scripts/voiceover-master.txt`, `scripts/voiceover-social.txt`, and `scripts/voiceover-square.txt`, then run:

```powershell
npm run audio
```

That command regenerates the MP3 narration, JSON caption data, master SRT/VTT files, and original synthesized music/SFX bed. To use a recorded voice instead, replace the three files in `public/audio/` while preserving their names, then update the matching captions.

## Updating project examples

1. Add or revise normalized claims in `src/data/evidence.ts` and `evidence/evidence.json`.
2. Change the visible project cards in `src/data/projects.ts`.
3. Put sanitized captures under `public/captures/`.
4. Keep partially verified items neutral and never promote them to definitive on-screen claims.
5. Rerun typecheck, key-frame stills, full renders, and media verification.

## Directory structure

```text
src/                Remotion compositions, scenes, components, data, and theme
scripts/            Evidence, capture, narration, render, and verification tools
public/audio/       Generated narration, music bed, and UI tones
public/captures/    Sanitized local interface and repository assets
public/captions/    Caption JSON used by Remotion
captions/           Separate master SRT and VTT files
evidence/           Normalized claims, reports, and sanitized command summaries
dist/               Final media plus QA stills and metadata
```

## Troubleshooting

- If Chromium is missing, run `npx playwright install chromium`, then rerun `npm run capture`.
- If `edge-tts` is unavailable, preserve the narration scripts, set `narrationAvailable` to `false` in `src/Root.tsx`, and render the music/caption version.
- If a capture repository is elsewhere, set `HIVE_RENDERER_DIR`, `PLEDGR_DIST_DIR`, or `PLEDGR_SITE_DIR` before running the capture script.
- If an external project check fails, record the failure as unavailable and remove the claim from on-screen copy. Do not estimate a replacement metric.
- Remotion source uses frame-driven interpolation only; do not add CSS transitions or keyframe animations.

## Licensing and limitations

See `ATTRIBUTION.md`. The HIVE desktop screenshot uses the real local renderer build with a sanitized demo bridge and is labeled as a local interface capture. The repository demo is representative workflow footage, not proof of a historical HIVE contribution. Pledgr captures contain demo state. TraderBot footage does not execute trades.
