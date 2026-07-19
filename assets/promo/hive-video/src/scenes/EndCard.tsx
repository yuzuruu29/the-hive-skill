import {AbsoluteFill, useCurrentFrame} from "remotion";
import {HiveMark} from "./HiveReveal";
import {enter, sceneOpacity} from "../styles/motion";
import {fonts, palette} from "../styles/theme";
import type {PromoVariant} from "../types";

export const EndCard = ({variant, duration, repositoryUrl}: {variant: PromoVariant; duration: number; repositoryUrl: string}) => {
  const frame = useCurrentFrame();
  const isVertical = variant === "vertical";
  const reveal = enter(frame, 0, 22);
  return (
    <AbsoluteFill style={{opacity: sceneOpacity(frame, duration), alignItems: "center", justifyContent: "center", padding: isVertical ? "120px 68px 250px" : "90px 80px 125px"}}>
      <div style={{display: "grid", justifyItems: "center", opacity: reveal, transform: `translateY(${(1 - reveal) * 30}px)`}}>
        <div style={{transform: `scale(${isVertical ? .9 : variant === "square" ? .64 : .72})`}}><HiveMark size={250} label={false} /></div>
        <div style={{fontSize: isVertical ? 128 : variant === "square" ? 100 : 126, lineHeight: .9, fontWeight: 900, letterSpacing: -7, marginTop: isVertical ? 48 : 24}}>HIVE</div>
        <div style={{fontSize: isVertical ? 35 : variant === "square" ? 28 : 33, color: palette.muted, marginTop: 18, textAlign: "center"}}>Hyper Intelligence for Verified Engineering</div>
        <div style={{fontSize: isVertical ? 37 : variant === "square" ? 30 : 38, fontWeight: 800, marginTop: 34, color: palette.white, textAlign: "center"}}>Plan. Build. Test. Review. Ship.</div>
        <div style={{marginTop: 32, padding: isVertical ? "20px 24px" : "17px 26px", borderRadius: 14, border: "1px solid rgba(245,185,66,.55)", background: "rgba(245,185,66,.08)", fontFamily: fonts.mono, fontSize: isVertical ? 28 : variant === "square" ? 22 : 29, color: palette.gold, textAlign: "center"}}>{repositoryUrl}</div>
        <div style={{fontFamily: fonts.mono, fontSize: isVertical ? 20 : 18, color: palette.muted, marginTop: 26, textTransform: "uppercase", letterSpacing: 1.7, textAlign: "center"}}>Open source · BYO providers · Verified workflow</div>
      </div>
    </AbsoluteFill>
  );
};
