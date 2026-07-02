# Export Instructions

This guide explains how to capture the HTML animation and export it as an MP4 or GIF.

## Prerequisites
- A screen recording tool (e.g., OBS Studio, ShareX, or a browser extension)
- `ffmpeg` (for GIF conversion)

## Step 1: Capture the Animation
1. Open `assets/demo/the-hive-skill-demo.html` in your web browser.
2. Set the browser zoom level to **100%**.
3. Set your screen recording tool to capture exactly the **1200x675** animation area (the dark terminal window).
4. Start recording right as the animation loops back to the start.
5. Stop recording after exactly 18 seconds (when the animation stops).
6. Save the recording as an MP4 file, for example: `the-hive-skill-demo.mp4`.
7. You may want to export the MP4 first if using browser recording.

## Step 2: Convert to GIF
If you have `ffmpeg` installed, use the following command to generate an optimized, high-quality GIF:

```bash
ffmpeg -i the-hive-skill-demo.mp4 -vf "fps=60,scale=1200:-1:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5" assets/demo/the-hive-skill-demo.gif
```

### Recommended GIF Settings
- **Length**: 18 seconds
- **Resolution**: 1200x675
- **FPS**: 60
- **Colors**: 256 (optimized palette via ffmpeg)

### Recommended MP4 Settings
- **Resolution**: 1200x675
- **FPS**: 60 (or match source capture)
- **Bitrate**: 1-2 Mbps (for social sharing)
