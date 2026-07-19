import {fonts, palette} from "../styles/theme";

export type TerminalRow = {prefix: string; text: string; tone?: "success" | "warning" | "neutral"};

export const TerminalWindow = ({title, rows, compact = false}: {title: string; rows: TerminalRow[]; compact?: boolean}) => (
  <div
    style={{
      borderRadius: compact ? 18 : 24,
      border: "1px solid rgba(167,139,250,.32)",
      background: "rgba(8,9,13,.94)",
      boxShadow: "0 28px 90px rgba(0,0,0,.42), 0 0 40px rgba(124,58,237,.12)",
      overflow: "hidden",
    }}
  >
    <div style={{display: "flex", alignItems: "center", gap: 9, padding: compact ? "12px 16px" : "15px 20px", background: "rgba(255,255,255,.035)", borderBottom: "1px solid rgba(255,255,255,.08)"}}>
      {[palette.danger, palette.amber, palette.success].map((color) => <span key={color} style={{width: compact ? 10 : 12, height: compact ? 10 : 12, borderRadius: "50%", background: color, opacity: .86}} />)}
      <span style={{marginLeft: 8, fontFamily: fonts.mono, color: palette.muted, fontSize: compact ? 19 : 22}}>{title}</span>
    </div>
    <div style={{padding: compact ? 16 : 22, display: "grid", gap: compact ? 10 : 13, fontFamily: fonts.mono, fontSize: compact ? 24 : 27, lineHeight: 1.35}}>
      {rows.map((row, index) => (
        <div key={`${row.prefix}-${index}`} style={{display: "grid", gridTemplateColumns: compact ? "64px 1fr" : "86px 1fr", gap: 12}}>
          <span style={{color: row.tone === "success" ? palette.success : row.tone === "warning" ? palette.amber : palette.violetBright}}>{row.prefix}</span>
          <span style={{color: palette.white}}>{row.text}</span>
        </div>
      ))}
    </div>
  </div>
);
