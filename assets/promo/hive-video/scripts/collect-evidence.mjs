import {readFileSync, writeFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const definitions = [
  {id: "hive-tests-260", project: "HIVE", cwd: "C:\\HIVE", command: "npm", args: ["test"], claim: "HIVE automated tests", evidenceType: "test-output"},
  {id: "hive-typecheck", project: "HIVE", cwd: "C:\\HIVE", command: "npm", args: ["run", "lint"], claim: "HIVE TypeScript check", evidenceType: "build-output"},
  {id: "pledgr-tests-165", project: "Pledgr", cwd: "C:\\Pledgr", command: "npm", args: ["run", "test:run", "--", "--reporter=dot"], claim: "Pledgr automated tests", evidenceType: "test-output"},
  {id: "pledgr-typecheck", project: "Pledgr", cwd: "C:\\Pledgr", command: "npm", args: ["run", "typecheck"], claim: "Pledgr TypeScript check", evidenceType: "build-output"},
  ...[
    ["spot", "crypto_spot_bot"],
    ["futures", "crypto_futures_bot"],
    ["mt5", "exness_mt5_trader_bot"],
    ["polymarket", "polymarket_bot"],
  ].map(([id, folder]) => ({id: `traderbot-${id}`, project: "TraderBot", cwd: `C:\\TraderBot\\${folder}`, command: "python", args: ["-m", "pytest", "-q", "-p", "no:cacheprovider"], claim: `TraderBot ${id} tests`, evidenceType: "test-output"})),
];

const capturedAt = new Date().toISOString();
const commandResults = definitions.map((item) => {
  const result = spawnSync(item.command, item.args, {cwd: item.cwd, encoding: "utf8", timeout: 180000, shell: false});
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.replace(/[A-Za-z]:\\Users\\[^\\\s]+/g, "<USER_HOME>").trim();
  return {
    id: item.id,
    project: item.project,
    claim: item.claim,
    evidenceType: item.evidenceType,
    command: [item.command, ...item.args].join(" "),
    exitCode: result.status ?? -1,
    capturedAt,
    result: result.status === 0 ? "verified" : "unavailable",
    notes: output.slice(-700),
  };
});

const staticEvidence = JSON.parse(readFileSync(join(root, "evidence", "evidence.json"), "utf8")).filter((item) => !definitions.some((definition) => definition.id === item.id));
writeFileSync(join(root, "evidence", "evidence-latest.json"), JSON.stringify([...commandResults, ...staticEvidence], null, 2) + "\n");
console.log(`Wrote ${commandResults.length + staticEvidence.length} normalized records to evidence/evidence-latest.json`);
