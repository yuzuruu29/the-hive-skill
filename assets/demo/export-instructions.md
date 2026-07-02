# Export Instructions

This guide explains how to capture the HTML animation and export it as an MP4 or GIF.

## Prerequisites
- A screen recording tool (e.g., OBS Studio, ShareX, or a browser extension)
- `ffmpeg` (for GIF conversion)

## Step 1: Capture the Animation
1. Open `assets/demo/the-hive-skill-demo.html` in your web browser.
2. Set the browser zoom level to **100%**.
3. Set your screen recording tool to capture exactly the **960x540** animation area (the dark terminal window).
4. Start recording right as the animation loops back to the start (Scene 1).
5. Stop recording after exactly 15 seconds (when Scene 5 finishes).
6. Save the recording as an MP4 file, for example: `the-hive-skill-demo.mp4`.
7. You may want to export the MP4 first if using browser recording.

## Step 2: Convert to GIF
If you have `ffmpeg` installed, use the following command to generate an optimized, high-quality GIF under 8MB:

```bash
ffmpeg -i the-hive-skill-demo.mp4 -vf "fps=12,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" assets/demo/the-hive-skill-demo.gif
```

### Recommended GIF Settings
- **Length**: 15 seconds
- **Resolution**: 960x540
- **FPS**: 12
- **Colors**: 256 (optimized palette via ffmpeg)
- Keep GIF under 8MB if possible.

### Recommended MP4 Settings
- **Resolution**: 960x540
- **FPS**: 30 (or match source capture)
- **Bitrate**: 1-2 Mbps (for social sharing)
