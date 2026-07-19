import {readFileSync, writeFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const formatTime = (milliseconds, separator) => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor(milliseconds % 3600000 / 60000);
  const seconds = Math.floor(milliseconds % 60000 / 1000);
  const millis = milliseconds % 1000;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":") + separator + String(millis).padStart(3, "0");
};

for (const variant of ["master", "vertical", "square"]) {
  const captions = JSON.parse(readFileSync(join(root, "public", "captions", `${variant}.json`), "utf8"));
  const vtt = "WEBVTT\n\n" + captions.map((caption, index) => `${index + 1}\n${formatTime(caption.startMs, ".")} --> ${formatTime(caption.endMs, ".")}\n${caption.text.trim()}\n`).join("\n");
  writeFileSync(join(root, "public", "captions", `${variant}.vtt`), vtt);
  if (variant === "master") {
    writeFileSync(join(root, "captions", "hive-promo.vtt"), vtt);
    const srt = captions.map((caption, index) => `${index + 1}\n${formatTime(caption.startMs, ",")} --> ${formatTime(caption.endMs, ",")}\n${caption.text.trim()}\n`).join("\n");
    writeFileSync(join(root, "captions", "hive-promo.srt"), srt);
  }
}
