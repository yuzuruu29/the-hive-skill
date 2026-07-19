import {mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const audioDir = join(root, "public", "audio");
const publicCaptions = join(root, "public", "captions");
const captionsDir = join(root, "captions");
mkdirSync(audioDir, {recursive: true});
mkdirSync(publicCaptions, {recursive: true});
mkdirSync(captionsDir, {recursive: true});

const run = (command, args) => {
  const result = spawnSync(command, args, {cwd: root, stdio: "inherit", shell: false});
  if (result.status !== 0) throw new Error(`${command} failed with exit code ${result.status}`);
};

const parseTime = (value) => {
  const [hours, minutes, seconds] = value.replace(",", ".").split(":");
  return Math.round((Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)) * 1000);
};

const parseVtt = (contents) => {
  const blocks = contents.replace(/\r/g, "").split(/\n\n+/).filter((block) => block.includes("-->"));
  return blocks.map((block) => {
    const lines = block.split("\n").filter(Boolean);
    const timingIndex = lines.findIndex((line) => line.includes("-->"));
    const [start, end] = lines[timingIndex].split("-->").map((value) => value.trim().split(" ")[0]);
    const text = lines.slice(timingIndex + 1).join(" ").replace(/<[^>]+>/g, "");
    return {text: ` ${text}`, startMs: parseTime(start), endMs: parseTime(end), timestampMs: null, confidence: null};
  });
};

for (const {variant, rate} of [
  {variant: "master", rate: "+4%"},
  {variant: "vertical", rate: "+8%"},
  {variant: "square", rate: "+10%"},
]) {
  const input = join(root, "scripts", `voiceover-${variant === "vertical" ? "social" : variant}.txt`);
  const media = join(audioDir, `${variant}-voiceover.mp3`);
  const subtitleSource = join(audioDir, `${variant}-voiceover.srt`);
  run("edge-tts", ["--file", input, "--voice", "en-US-AndrewNeural", "--rate", rate, "--write-media", media, "--write-subtitles", subtitleSource]);
  const parsed = parseVtt(readFileSync(subtitleSource, "utf8"));
  writeFileSync(join(publicCaptions, `${variant}.json`), JSON.stringify(parsed, null, 2) + "\n");
}
run(process.execPath, ["scripts/normalize-subtitles.mjs"]);

run("ffmpeg", ["-y", "-f", "lavfi", "-i", "sine=frequency=52:sample_rate=48000:duration=70", "-f", "lavfi", "-i", "sine=frequency=104:sample_rate=48000:duration=70", "-f", "lavfi", "-i", "anoisesrc=color=white:amplitude=0.08:duration=70:sample_rate=48000", "-f", "lavfi", "-i", "anoisesrc=color=pink:amplitude=0.035:duration=70:sample_rate=48000", "-filter_complex", "[0:a]volume=0.19,tremolo=f=2:d=.72,lowpass=f=145[b0];[1:a]volume=.075,tremolo=f=4:d=.66,lowpass=f=520[b1];[2:a]highpass=f=5200,volume=.045,tremolo=f=8:d=.92[hat];[3:a]highpass=f=220,lowpass=f=1450,volume=.035[air];[b0][b1][hat][air]amix=inputs=4:duration=longest,acompressor=threshold=.16:ratio=3:attack=12:release=150,loudnorm=I=-16:TP=-2:LRA=4,aresample=48000,aformat=sample_rates=48000:channel_layouts=stereo[a]", "-map", "[a]", "-c:a", "pcm_s16le", join(audioDir, "hive-bed.wav")]);
run("ffmpeg", ["-y", "-f", "lavfi", "-i", "sine=frequency=180:sample_rate=48000:duration=1.4", "-filter:a", "volume=0.35,afade=t=in:st=0:d=0.08,afade=t=out:st=0.45:d=0.95,aformat=channel_layouts=stereo", "-c:a", "pcm_s16le", join(audioDir, "reveal.wav")]);
run("ffmpeg", ["-y", "-f", "lavfi", "-i", "sine=frequency=720:sample_rate=48000:duration=0.42", "-filter:a", "volume=0.18,afade=t=out:st=0.08:d=0.34,aformat=channel_layouts=stereo", "-c:a", "pcm_s16le", join(audioDir, "confirm.wav")]);
run("ffmpeg", ["-y", "-f", "lavfi", "-i", "anoisesrc=color=pink:amplitude=.16:duration=1.2:sample_rate=48000", "-filter:a", "highpass=f=240,lowpass=f=3200,afade=t=in:st=0:d=0.08,afade=t=out:st=0.18:d=1.02,aformat=channel_layouts=stereo", "-c:a", "pcm_s16le", join(audioDir, "whoosh.wav")]);
run("ffmpeg", ["-y", "-f", "lavfi", "-i", "sine=frequency=62:sample_rate=48000:duration=1.2", "-f", "lavfi", "-i", "anoisesrc=color=brown:amplitude=.12:duration=1.2:sample_rate=48000", "-filter_complex", "[0:a]volume=.5,afade=t=out:st=0.08:d=1.1[k];[1:a]lowpass=f=900,volume=.16,afade=t=out:st=0.04:d=0.7[n];[k][n]amix=inputs=2,acompressor=threshold=.2:ratio=4,aformat=channel_layouts=stereo[a]", "-map", "[a]", "-c:a", "pcm_s16le", join(audioDir, "impact.wav")]);
