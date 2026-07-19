import {existsSync, readdirSync, readFileSync, statSync} from "node:fs";
import {extname, join, resolve} from "node:path";

const root = resolve(import.meta.dirname, "..");
const scanRoots = ["src", "scripts", "evidence", "analysis", "captions"];
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".txt", ".srt", ".vtt"]);
const files = [];

const collect = (path) => {
  if (!existsSync(path)) return;
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) collect(join(path, entry));
    return;
  }
  if (textExtensions.has(extname(path).toLowerCase())) files.push(path);
};

for (const directory of scanRoots) collect(join(root, directory));
for (const file of ["README.md", "ATTRIBUTION.md", "package.json"]) collect(join(root, file));

const secretPatterns = [
  /\bsk-[A-Za-z0-9_-]{16,}\b/g,
  /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g,
  /\bghp_[A-Za-z0-9]{20,}\b/g,
  /\b[A-Z0-9_]*(?:API_KEY|ACCESS_TOKEN|PRIVATE_KEY)\s*[:=]\s*["']?[^\s"']{8,}/g,
];

const findings = [];
for (const file of files) {
  const contents = readFileSync(file, "utf8");
  for (const pattern of secretPatterns) {
    const matches = contents.match(pattern) ?? [];
    for (const match of matches) findings.push(`${file}: ${match.slice(0, 24)}...`);
  }
}

if (findings.length) throw new Error(`Potential secrets found:\n${findings.join("\n")}`);
if (existsSync(join(root, "analysis", "reference-temp", "reference-source.mp4"))) throw new Error("Downloaded reference footage remains in the package.");
console.log(`Safety scan passed: ${files.length} text files, no credential pattern, no retained reference footage.`);
