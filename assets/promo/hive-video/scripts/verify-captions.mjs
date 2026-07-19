import {readFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const limits = {master: 66000, vertical: 42000, square: 30000};
for (const [variant, limit] of Object.entries(limits)) {
  const captions = JSON.parse(readFileSync(join(root, "public", "captions", `${variant}.json`), "utf8"));
  if (!captions.length) throw new Error(`${variant} captions are empty`);
  captions.forEach((caption, index) => {
    if (!caption.text.trim()) throw new Error(`${variant} caption ${index} is empty`);
    if (caption.startMs < 0 || caption.endMs <= caption.startMs) throw new Error(`${variant} caption ${index} has invalid timing`);
    if (index && caption.startMs < captions[index - 1].endMs) throw new Error(`${variant} caption ${index} overlaps the previous cue`);
  });
  if (captions.at(-1).endMs > limit) throw new Error(`${variant} captions exceed the composition duration`);
  console.log(`${variant}: ${captions.length} monotonic cues; final cue ${captions.at(-1).endMs} ms / ${limit} ms`);
}

const srt = readFileSync(join(root, "captions", "hive-promo.srt"), "utf8");
const vtt = readFileSync(join(root, "captions", "hive-promo.vtt"), "utf8");
if (!srt.includes(" --> ") || !vtt.startsWith("WEBVTT")) throw new Error("Master subtitle exports are malformed");
console.log("Master SRT and VTT structure validated.");
