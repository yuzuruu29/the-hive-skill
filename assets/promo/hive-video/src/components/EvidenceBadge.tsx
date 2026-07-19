import {fonts, palette} from "../styles/theme";

export const EvidenceBadge = ({text, compact = false, tone = "success"}: {text: string; compact?: boolean; tone?: "success" | "warning"}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: compact ? 8 : 11,
      border: `1px solid ${tone === "success" ? "rgba(34,197,94,.48)" : "rgba(245,185,66,.5)"}`,
      background: tone === "success" ? "rgba(34,197,94,.09)" : "rgba(245,185,66,.09)",
      color: palette.white,
      padding: compact ? "8px 11px" : "10px 15px",
      borderRadius: 999,
      fontFamily: fonts.mono,
      fontSize: compact ? 23 : 26,
      fontWeight: 700,
      whiteSpace: "nowrap",
    }}
  >
    <span style={{display: "grid", placeItems: "center", width: 24, height: 24, borderRadius: "50%", background: tone === "success" ? palette.success : palette.amber, color: palette.void, fontSize: 16}}>{tone === "success" ? "✓" : "!"}</span>
    {text}
  </div>
);
