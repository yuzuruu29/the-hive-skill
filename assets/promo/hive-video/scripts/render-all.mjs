import {existsSync, mkdirSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "dist", "qa"), {recursive: true});
mkdirSync(join(root, "dist", "review"), {recursive: true});
const npx = "npx";
const run = (command, args) => {
  const result = spawnSync(command, args, {cwd: root, stdio: "inherit", shell: process.platform === "win32" && command === npx});
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status ?? result.error?.message ?? "unknown"}`);
};

if (!existsSync(join(root, "public", "audio", "master-voiceover.mp3"))) run(process.execPath, ["scripts/generate-audio.mjs"]);
if (!existsSync(join(root, "public", "captures", "hive-desktop.png"))) run(process.execPath, ["scripts/capture-projects.mjs"]);
run(npx, ["tsc", "--noEmit"]);
run(process.execPath, ["scripts/verify-captions.mjs"]);
run(process.execPath, ["scripts/verify-safety.mjs"]);
run(npx, ["remotion", "compositions", "src/index.ts"]);

const stills = [
  ["HivePromoMaster", "60", "qa/master-opening.png"],
  ["HivePromoMaster", "180", "qa/master-reveal.png"],
  ["HivePromoMaster", "420", "qa/master-loop.png"],
  ["HivePromoMaster", "640", "qa/master-hive-proof.png"],
  ["HivePromoMaster", "780", "qa/master-pledgr-proof.png"],
  ["HivePromoMaster", "960", "qa/master-traderbot-proof.png"],
  ["HivePromoMaster", "1150", "qa/master-evidence.png"],
  ["HivePromoMaster", "1450", "qa/master-climax.png"],
  ["HivePromoMaster", "1740", "qa/master-end.png"],
  ["HivePromoVertical", "670", "qa/vertical-proof.png"],
  ["HivePromoVertical", "930", "qa/vertical-climax.png"],
  ["HivePromoSquare", "420", "qa/square-proof.png"],
  ["HivePromoSquare", "650", "qa/square-climax.png"],
];
for (const [composition, frame, output] of stills) run(npx, ["remotion", "still", "src/index.ts", composition, join("dist", output), "--frame", frame]);

run(npx, ["remotion", "render", "src/index.ts", "HivePromoMaster", "dist/qa/hive-promo-low-res.mp4", "--scale=0.25", "--codec=h264", "--crf=28", "--audio-codec=aac"]);
run(npx, ["remotion", "render", "src/index.ts", "HivePromoMaster", "dist/hive-promo-master-16x9.mp4", "--codec=h264", "--crf=18", "--audio-codec=aac"]);
run("ffmpeg", ["-y", "-i", "dist/hive-promo-master-16x9.mp4", "-vf", "scale=1280:720:flags=lanczos", "-c:v", "libx264", "-crf", "24", "-preset", "medium", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", "dist/review/hive-promo-review-720p.mp4"]);
run(npx, ["remotion", "render", "src/index.ts", "HivePromoVertical", "dist/hive-promo-social-9x16.mp4", "--codec=h264", "--crf=18", "--audio-codec=aac"]);
run(npx, ["remotion", "render", "src/index.ts", "HivePromoSquare", "dist/hive-promo-square-1x1.mp4", "--codec=h264", "--crf=18", "--audio-codec=aac"]);
run("ffmpeg", ["-y", "-i", "dist/hive-promo-master-16x9.mp4", "-map", "0:v:0", "-c:v", "copy", "-an", "-movflags", "+faststart", "dist/hive-promo-master-muted.mp4"]);
run("ffmpeg", ["-y", "-i", "dist/hive-promo-social-9x16.mp4", "-map", "0:v:0", "-c:v", "copy", "-an", "-movflags", "+faststart", "dist/hive-promo-social-muted.mp4"]);
run(npx, ["remotion", "still", "src/index.ts", "HivePromoPoster", "dist/hive-promo-poster.png"]);
run(npx, ["remotion", "still", "src/index.ts", "HivePromoThumbnail", "dist/hive-promo-thumbnail.png"]);
run("ffmpeg", ["-y", "-ss", "00:00:06", "-t", "8", "-i", "dist/hive-promo-master-16x9.mp4", "-vf", "fps=12,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4", "dist/hive-promo-preview.gif"]);
run(process.execPath, ["scripts/verify-media.mjs"]);
