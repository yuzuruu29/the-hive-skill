import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {AgentNode} from "../components/AgentNode";
import {HiveMark} from "./HiveReveal";
import {sceneOpacity, stagger} from "../styles/motion";
import {fonts, palette} from "../styles/theme";
import type {PromoVariant} from "../types";

const roles = [
  ["Scout", "Repository mapped"],
  ["Planner", "Scope confirmed"],
  ["Builders", "Changes isolated"],
  ["Validator", "Tests running"],
  ["Reviewer", "Review completed"],
  ["Fixer", "Evidence recorded"],
] as const;

export const EngineeringLoop = ({variant, duration}: {variant: PromoVariant; duration: number}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isVertical = variant === "vertical";
  const active = Math.min(roles.length - 1, Math.floor(frame / Math.max(1, duration / roles.length)));
  const centerX = width / 2;
  const centerY = isVertical ? height * .39 : height * .48;
  const radiusX = isVertical ? 330 : variant === "square" ? 340 : 590;
  const radiusY = isVertical ? 460 : variant === "square" ? 300 : 285;
  const camera = 1 + Math.sin(frame / 58) * .018;
  return (
    <AbsoluteFill style={{opacity: sceneOpacity(frame, duration), padding: isVertical ? "145px 50px 250px" : "105px 70px 125px"}}>
      <div style={{position: "absolute", left: isVertical ? 70 : 92, top: isVertical ? 145 : 105}}>
        <div style={{fontFamily: fonts.mono, color: palette.amber, fontSize: isVertical ? 24 : 21, letterSpacing: 2.3, textTransform: "uppercase"}}>Verified engineering loop</div>
        <div style={{fontSize: isVertical ? 54 : variant === "square" ? 48 : 58, marginTop: 11, fontWeight: 800}}>Inspect. Coordinate. Verify.</div>
      </div>
      <svg width={width} height={height} style={{position: "absolute", inset: 0, opacity: .72, transform: `scale(${camera})`}}>
        {roles.map((_, index) => {
          const angle = -Math.PI / 2 + index / roles.length * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radiusX;
          const y = centerY + Math.sin(angle) * radiusY;
          const packet = Math.max(0, Math.min(1, (frame - index * 10) / 34));
          const packetX = centerX + (x - centerX) * packet;
          const packetY = centerY + (y - centerY) * packet;
          return <g key={index}><line x1={centerX} y1={centerY} x2={x} y2={y} stroke={index <= active ? palette.violetBright : "rgba(167,172,184,.2)"} strokeWidth={index === active ? 4 : 2} strokeDasharray="10 12" strokeDashoffset={-frame * .75} /><circle cx={packetX} cy={packetY} r={index === active ? 8 : 5} fill={index <= active ? palette.gold : palette.violetBright} opacity={index <= active ? .95 : .3} /></g>;
        })}
      </svg>
      <div style={{position: "absolute", left: centerX, top: centerY, transform: "translate(-50%,-50%) scale(.62)"}}><HiveMark size={260} label={false} /></div>
      {roles.map(([role, detail], index) => {
        const angle = -Math.PI / 2 + index / roles.length * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY + Math.sin(angle) * radiusY;
        const reveal = stagger(frame, index, 6);
        return (
          <div key={role} style={{position: "absolute", left: x, top: y, opacity: reveal, transform: `translate(-50%,-50%) scale(${.9 + reveal * .1})`}}>
            <AgentNode label={role} detail={detail} active={index === active} size={variant === "master" ? "normal" : "compact"} />
          </div>
        );
      })}
      <div style={{position: "absolute", left: isVertical ? 74 : 92, right: isVertical ? 74 : 92, bottom: isVertical ? 285 : 145, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, fontFamily: fonts.mono, fontSize: isVertical ? 21 : 19, color: palette.muted}}>
        {roles.map(([role], index) => <span key={role} style={{color: index === active ? palette.gold : palette.muted}}>{index ? "→ " : ""}{role === "Builders" ? "Build" : role === "Validator" ? "Validate" : role === "Reviewer" ? "Review" : role === "Fixer" ? "Fix → Revalidate" : role === "Scout" ? "Inspect" : "Plan"}</span>)}
      </div>
    </AbsoluteFill>
  );
};
