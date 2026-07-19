import {fonts, palette} from "../styles/theme";

export const AgentNode = ({label, detail, active, size = "normal"}: {label: string; detail: string; active: boolean; size?: "normal" | "compact"}) => {
  const compact = size === "compact";
  return (
    <div
      style={{
        borderRadius: compact ? 18 : 22,
        border: `1px solid ${active ? "rgba(167,139,250,.82)" : "rgba(167,172,184,.24)"}`,
        background: active ? "linear-gradient(145deg, rgba(124,58,237,.27), rgba(18,20,27,.96))" : "rgba(18,20,27,.92)",
        boxShadow: active ? "0 0 34px rgba(124,58,237,.24)" : "none",
        padding: compact ? "14px 16px" : "18px 21px",
        minWidth: compact ? 156 : 210,
      }}
    >
      <div style={{fontFamily: fonts.mono, fontSize: compact ? 16 : 18, letterSpacing: 1.2, color: active ? palette.violetBright : palette.muted, textTransform: "uppercase"}}>{label}</div>
      <div style={{fontSize: compact ? 17 : 20, fontWeight: 700, marginTop: 7, color: palette.white}}>{detail}</div>
    </div>
  );
};
