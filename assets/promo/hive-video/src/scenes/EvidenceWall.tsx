import {AbsoluteFill, useCurrentFrame} from "remotion";
import {verifiedEvidence} from "../data/evidence";
import {sceneOpacity, stagger} from "../styles/motion";
import {fonts, palette} from "../styles/theme";
import type {PromoVariant} from "../types";

const rows = [
  {label: "Changed files", value: "Recorded per run"},
  {label: "Validation commands", value: "Captured with exit status"},
  {label: "Test results", value: `${verifiedEvidence.filter((item) => item.evidenceType === "test-output").length} current pass records`},
  {label: "Review findings", value: "Actionable risk retained"},
  {label: "Remaining risks", value: "Reported, never hidden"},
];

export const EvidenceWall = ({variant, duration}: {variant: PromoVariant; duration: number}) => {
  const frame = useCurrentFrame();
  const isVertical = variant === "vertical";
  return (
    <AbsoluteFill style={{opacity: sceneOpacity(frame, duration), padding: isVertical ? "180px 72px 280px" : variant === "square" ? "135px 70px 145px" : "115px 92px 130px"}}>
      <div style={{display: "grid", gridTemplateColumns: isVertical || variant === "square" ? "1fr" : ".8fr 1.2fr", gap: isVertical ? 38 : 70, alignItems: "center", height: "100%"}}>
        <div>
          <div style={{fontFamily: fonts.mono, color: palette.amber, fontSize: isVertical ? 24 : 21, letterSpacing: 2.2, textTransform: "uppercase"}}>Evidence, not theater</div>
          <div style={{fontSize: isVertical ? 64 : variant === "square" ? 56 : 72, lineHeight: 1.04, fontWeight: 850, marginTop: 16}}>Every result stays traceable.</div>
          <div style={{marginTop: 26, color: palette.muted, fontSize: isVertical ? 31 : 32, lineHeight: 1.42}}>Success is sourced.<br />Failures stay visible.<br />Limits are disclosed.</div>
        </div>
        <div style={{border: "1px solid rgba(167,139,250,.28)", borderRadius: 26, background: "rgba(18,20,27,.91)", padding: isVertical ? 26 : 30, boxShadow: "0 28px 90px rgba(0,0,0,.36)"}}>
          <div style={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 16, fontFamily: fonts.mono, color: palette.muted, fontSize: isVertical ? 22 : 21}}><span>HIVE FINAL REPORT</span><span style={{color: palette.amber}}>DISCLOSED</span></div>
          <div style={{display: "grid", marginTop: 6}}>
            {rows.slice(0, variant === "square" ? 4 : 5).map((row, index) => {
              const reveal = stagger(frame, index, 6);
              return (
                <div key={row.label} style={{opacity: reveal, display: "grid", gridTemplateColumns: "minmax(170px,.75fr) minmax(0,1.25fr)", gap: 18, padding: isVertical ? "18px 2px" : "16px 2px", borderBottom: "1px solid rgba(255,255,255,.065)", fontSize: isVertical ? 28 : 29}}>
                  <span style={{color: palette.muted}}>{row.label}</span>
                  <span style={{color: palette.white, fontWeight: 700}}>✓ {row.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
