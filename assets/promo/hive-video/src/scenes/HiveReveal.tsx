import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {enter, sceneOpacity} from "../styles/motion";
import {fonts, palette} from "../styles/theme";
import type {PromoVariant} from "../types";

export const HiveMark = ({size = 250, label = true}: {size?: number; label?: boolean}) => {
  const frame = useCurrentFrame();
  const rotation = Math.sin(frame / 90) * 1.4;
  return (
    <div style={{display: "grid", placeItems: "center", gap: 20}}>
      <div style={{position: "relative", width: size, height: size * .88, transform: `rotate(${rotation}deg)`}}>
        <div style={{position: "absolute", inset: 0, clipPath: "polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%)", background: "linear-gradient(135deg,#7C3AED,#A78BFA 58%,#F5B942)", filter: "drop-shadow(0 0 36px rgba(124,58,237,.45))"}} />
        <div style={{position: "absolute", inset: size * .055, clipPath: "polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%)", background: palette.void}} />
        <div style={{position: "absolute", inset: size * .19, borderRadius: "50%", border: `3px solid ${palette.gold}`, display: "grid", placeItems: "center", fontFamily: fonts.mono, fontWeight: 900, fontSize: size * .25, color: palette.white, background: "radial-gradient(circle,rgba(124,58,237,.35),rgba(8,9,13,.96))"}}>Q</div>
      </div>
      {label ? <div style={{fontFamily: fonts.mono, color: palette.gold, fontWeight: 800, letterSpacing: 3}}>QUEEN COORDINATOR</div> : null}
    </div>
  );
};

export const HiveReveal = ({variant, duration}: {variant: PromoVariant; duration: number}) => {
  const frame = useCurrentFrame();
  const isVertical = variant === "vertical";
  const logo = enter(frame, 4, 32);
  const title = enter(frame, 25, 25);
  const ring = interpolate(frame, [0, duration], [0.8, 1.08]);
  return (
    <AbsoluteFill style={{opacity: sceneOpacity(frame, duration), alignItems: "center", justifyContent: "center", padding: isVertical ? "120px 68px 240px" : "90px 80px 120px"}}>
      <div style={{position: "absolute", width: isVertical ? 720 : 860, height: isVertical ? 720 : 860, borderRadius: "50%", border: "1px solid rgba(167,139,250,.17)", transform: `scale(${ring})`, boxShadow: "inset 0 0 110px rgba(124,58,237,.08)"}} />
      <div style={{display: "grid", placeItems: "center", opacity: logo, transform: `scale(${.82 + logo * .18})`}}>
        <HiveMark size={isVertical ? 290 : variant === "square" ? 230 : 270} />
        <div style={{marginTop: isVertical ? 42 : 28, fontSize: isVertical ? 154 : variant === "square" ? 124 : 148, lineHeight: .86, fontWeight: 900, letterSpacing: isVertical ? -8 : -10, background: "linear-gradient(90deg,#F7F7FA,#A78BFA 58%,#FFD166)", WebkitBackgroundClip: "text", color: "transparent"}}>HIVE</div>
        <div style={{opacity: title, marginTop: isVertical ? 28 : 20, maxWidth: isVertical ? 840 : 1100, textAlign: "center", fontSize: isVertical ? 37 : variant === "square" ? 30 : 35, color: palette.muted, lineHeight: 1.25}}>Hyper Intelligence for Verified Engineering</div>
        <div style={{opacity: title, marginTop: 24, fontSize: isVertical ? 32 : variant === "square" ? 27 : 31, fontWeight: 750, color: palette.white, textAlign: "center"}}>One Queen. Specialized agents. Verified engineering.</div>
      </div>
    </AbsoluteFill>
  );
};
