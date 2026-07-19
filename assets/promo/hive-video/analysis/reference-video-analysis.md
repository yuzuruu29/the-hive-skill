# Reference video analysis — Doks.AI short ad

Analysis date: 2026-07-15 (Asia/Manila)

## Source and access

- Canonical reference: https://www.youtube.com/watch?v=jX4dLxiso6A
- YouTube title: `Video Ad for AI / SaaS Product | Doks.AI`
- Publisher/uploader: Zelios - Animated Video Production
- Upload date reported by YouTube: 2024-06-20
- YouTube description identifies Zelios Agency as the production team, Doks.ai as the client, AI/ML as the industry, and the piece as a short ad.
- Producer commentary: https://zelios.agency/brand-awareness-video/ identifies the Doks.AI spot as a 20-second, fully animated 2D ad with techno music and no narration.
- Access result: the public video and metadata were reachable with `yt-dlp` on 2026-07-15. YouTube exposes no creator subtitles and no automatic captions for this video. A temporary local analysis copy was used only to derive metadata, timings, and the internal contact sheet; it is not a deliverable.

## Exact media properties of the analyzed YouTube rendition

| Property | Value |
| --- | --- |
| Container duration | 20.114 s |
| Active video duration | 20.067 s |
| Active audio duration | 20.114 s |
| Video frames | 602 |
| Frame rate | 30/1 fps, constant |
| Raster / aspect | 1920 × 1080, square pixels, 16:9 |
| Video encoding | AV1 Main, yuv420p, BT.709, about 618 kb/s |
| Audio encoding | Opus, 48 kHz, stereo, about 137 kb/s |
| Measured integrated loudness | -15.9 LUFS |
| Measured loudness range | 1.5 LU |
| Measured true peak | -3.8 dBFS |
| Closing silence | 18.758–20.114 s after the music tail fades below -40 dB |

These codec and bitrate values describe the analyzed YouTube delivery format, not necessarily the agency's original master.

## Narration and sound

There is no narration. The agency explicitly describes the spot as narration-free, and YouTube provides neither subtitles nor automatic speech captions. Communication is carried by very short on-screen copy, UI action, music, and sound accents.

The soundtrack is a compact electronic/techno bed with a nearly flat loudness profile. UI arrivals, card stacks, button focus, and transition peaks are rhythmically accented. The music remains active through the end-card arrival, then falls away at about 18.76 s so the final 1.36 s reads as a calm visual hold. For HIVE, preserve that functional rhythm—music establishes momentum, small SFX confirm state changes, and the logo hold is quieter—but use an original score and original effects.

## Visual grammar

- Dark navy/near-black field with a restrained neon-green and aqua palette. Large soft gradient arcs frame the opening and return on the end card, creating a visual loop.
- One focal idea at a time. The camera moves into a search control, then a chatbot interaction, then style variants, then source integrations, then a brand promise, then the CTA.
- Product UI is reconstructed as clean motion graphics rather than shown as a raw screen recording. Cards use rounded corners, thin luminous strokes, soft shadows, shallow perspective, and controlled parallax.
- Motion is continuous and eased: vertical card entrances, macro push-ins, track-like light trails, perspective rotations, scale transitions, and a small brand glyph that bridges the feature section into kinetic type.
- Type is a bold geometric sans for category/reveal moments and a smaller neutral sans for UI. Copy density is deliberately low; most frames use one headline or one product action.
- Editing alternates compact 1–2.5 second demonstrations with longer statement/brand holds. Detected high-contrast motion points occur near 1.20, 3.30, 4.57, 5.40, 7.40, 9.07, 11.53, and 17.67 seconds.

## Beat and shot analysis

The detailed machine-readable map is in `reference-shot-map.json`. The practical arc is:

1. **0.000–1.200 — Immediate category hook.** Small brand, large category statement, and a product surface rising from below. No setup or problem monologue.
2. **1.200–3.300 — Product universe.** Search control plus layered assistant cards establish variety and dimensionality.
3. **3.300–4.567 — Action macro.** A fast camera push isolates the primary AI action and gives it a tactile pulse.
4. **4.567–5.400 — Shape bridge.** A luminous panel expands and resolves into the next interaction rather than cutting to an unrelated layout.
5. **5.400–7.400 — Proof of work.** A concise developer question produces a structured response; UI action carries the explanation.
6. **7.400–9.067 — Presentation flexibility.** Angled interface cards compare two display modes in one brisk pass.
7. **9.067–12.500 — Connectivity proof.** An integration grid grows, zooms, and tilts to imply broad source support.
8. **12.500–13.300 — Brand-glyph bridge.** A green glass-like glyph contracts into the center and becomes part of the typography system.
9. **13.300–17.667 — Kinetic promise.** The closing proposition assembles in small phrases around the moving glyph, with a much quieter composition than the feature section.
10. **17.667–20.114 — End card.** Brand mark and a short action prompt sit over the returning gradient arcs; motion and music taper off.

## Clean-room transfer to HIVE

Reuse the reference's communication principles, not its proprietary expression:

- A closest-match cut would stay near 20–24 seconds. For this evidence-led launch master, expand the same visual grammar to the requested 60–75 second range while keeping individual beats compact.
- Open on the HIVE category and a real HIVE CLI surface inside the first second.
- Move from capability overview to one legible proof sequence: request, agent delegation, verification, result.
- Use an original HIVE honeycomb/network motif as the recurring bridge. It can connect UI cards to the closing promise without copying the Doks glyph, mascot, cards, or exact transition choreography.
- Match the reference's rhythm with original timing: a 1.2 s hook, two 2–3 s proof beats, a 3–4 s ecosystem beat, a 3–4 s brand statement, and a 2.4 s end-card hold.
- Make the piece understandable while muted. If HIVE keeps voiceover, it should be a separate accessible version; the closest structural match is music, SFX, and concise captions only.
- Use original HIVE colors, typography, UI captures, iconography, music, and SFX. Do not include the downloaded reference, its logo, its interface artwork, its integration icon arrangement, its glass glyph, or frame-for-frame recreations.

## Contact sheet and methodology

`reference-contact-sheet.jpg` is an internal analysis artifact made from 40 evenly spaced samples at 0.5-second intervals. Each tile carries its source timestamp. It is for timing and composition study only and must not be published with the HIVE campaign.

Metadata came from `yt-dlp` and `ffprobe`; scene candidates, loudness, and silence were measured with FFmpeg; shot descriptions were checked against the timestamped contact sheet. Scene-detection values are motion/contrast cues, so editorial boundaries were manually consolidated into the ten useful beats above.
