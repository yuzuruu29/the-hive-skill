import {existsSync, statSync, writeFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const expected = [
  {file: "hive-promo-master-16x9.mp4", width: 1920, height: 1080, duration: 66, audio: true},
  {file: "hive-promo-social-9x16.mp4", width: 1080, height: 1920, duration: 42, audio: true},
  {file: "hive-promo-square-1x1.mp4", width: 1080, height: 1080, duration: 30, audio: true},
  {file: "hive-promo-master-muted.mp4", width: 1920, height: 1080, duration: 66, audio: false},
  {file: "hive-promo-social-muted.mp4", width: 1080, height: 1920, duration: 42, audio: false},
  {file: "review/hive-promo-review-720p.mp4", width: 1280, height: 720, duration: 66, audio: true},
];

const report = [];
for (const item of expected) {
  const path = join(root, "dist", item.file);
  if (!existsSync(path)) throw new Error(`Missing output: ${item.file}`);
  const result = spawnSync("ffprobe", ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", path], {encoding: "utf8"});
  if (result.status !== 0) throw new Error(`ffprobe failed for ${item.file}: ${result.stderr}`);
  const metadata = JSON.parse(result.stdout);
  const video = metadata.streams.find((stream) => stream.codec_type === "video");
  const audio = metadata.streams.find((stream) => stream.codec_type === "audio");
  const duration = Number(metadata.format.duration);
  if (video.width !== item.width || video.height !== item.height) throw new Error(`Unexpected dimensions for ${item.file}: ${video.width}x${video.height}`);
  if (Math.abs(duration - item.duration) > 0.2) throw new Error(`Unexpected duration for ${item.file}: ${duration}`);
  if (Boolean(audio) !== item.audio) throw new Error(`Unexpected audio status for ${item.file}`);
  if (audio && audio.channels !== 2) throw new Error(`Audio is not stereo for ${item.file}: ${audio.channels} channels`);
  report.push({file: item.file, width: video.width, height: video.height, fps: video.avg_frame_rate, duration, sizeBytes: statSync(path).size, videoCodec: video.codec_name, audioCodec: audio?.codec_name ?? null, audio: Boolean(audio)});
}
for (const file of ["hive-promo-poster.png", "hive-promo-thumbnail.png", "hive-promo-preview.gif"]) {
  const path = join(root, "dist", file);
  if (!existsSync(path) || statSync(path).size === 0) throw new Error(`Missing or empty supporting asset: ${file}`);
  report.push({file, sizeBytes: statSync(path).size});
}
writeFileSync(join(root, "dist", "media-report.json"), JSON.stringify(report, null, 2) + "\n");

const master = join(root, "dist", "hive-promo-master-16x9.mp4");
const loudness = spawnSync("ffmpeg", ["-hide_banner", "-i", master, "-af", "loudnorm=I=-16:TP=-1.5:LRA=6:print_format=json", "-f", "null", "NUL"], {encoding: "utf8"});
if (loudness.status !== 0) throw new Error(`Loudness scan failed: ${loudness.stderr}`);
const integrated = Number(loudness.stderr.match(/"input_i"\s*:\s*"(-?[0-9.]+)"/)?.[1]);
const truePeak = Number(loudness.stderr.match(/"input_tp"\s*:\s*"(-?[0-9.]+)"/)?.[1]);
if (!Number.isFinite(integrated) || integrated < -24 || integrated > -10) throw new Error(`Master loudness is outside the review range: ${integrated} LUFS`);
if (!Number.isFinite(truePeak) || truePeak > -0.5) throw new Error(`Master true peak is unsafe: ${truePeak} dBFS`);

const black = spawnSync("ffmpeg", ["-hide_banner", "-i", master, "-vf", "blackdetect=d=0.25:pix_th=0.02", "-an", "-f", "null", "NUL"], {encoding: "utf8"});
if (black.status !== 0) throw new Error(`Black-frame scan failed: ${black.stderr}`);
if (/black_duration:([0-9.]+)/.test(black.stderr)) throw new Error(`Unexpected black segment detected in master render.`);

for (const asset of ["audio/hive-bed.wav", "audio/master-voiceover.mp3", "audio/whoosh.wav", "audio/impact.wav", "captures/hive-demo.mp4", "captures/pledgr-app.png", "captions/master.json"]) {
  if (!existsSync(join(root, "public", asset))) throw new Error(`Missing referenced public asset: ${asset}`);
}
console.log(`Master audio: ${integrated} LUFS integrated, ${truePeak} dBFS true peak; no black segment >= 0.25s.`);
console.log(JSON.stringify(report, null, 2));
