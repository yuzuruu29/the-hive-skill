import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {HiveMark} from "./HiveReveal";
import {enter, sceneOpacity, stagger} from "../styles/motion";
import {fonts, palette} from "../styles/theme";
import type {PromoVariant} from "../types";

const satellites = [
  {name: "HIVE", proof: "TYPECHECK", angle: -2.45, color: palette.violetBright},
  {name: "PLEDGR", proof: "165 / 165", angle: -.55, color: "#3DD6B0"},
  {name: "TRADERBOT", proof: "40 / 40", angle: 1.5, color: palette.gold},
] as const;

export const SwarmClimax = ({variant, duration}: {variant: PromoVariant; duration: number}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const vertical = variant === "vertical";
  const compact = variant !== "master";
  const cx = width / 2;
  const cy = vertical ? height * .43 : height * .48;
  const rx = vertical ? 360 : compact ? 360 : 650;
  const ry = vertical ? 520 : compact ? 310 : 295;
  const pullback = interpolate(frame, [0, Math.max(1, duration - 24)], [1.22, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const pulse = 1 + Math.sin(frame / 7) * .025;

  return (
    <AbsoluteFill style={{opacity: sceneOpacity(frame, duration), overflow: "hidden"}}>
      <div style={{position: "absolute", left: vertical ? 70 : 92, top: vertical ? 145 : 96}}>
        <div style={{fontFamily: fonts.mono, color: palette.amber, fontSize: vertical ? 26 : 24, letterSpacing: 2.2}}>ONE QUEEN // COMPLETE TRACE</div>
        <div style={{fontSize: vertical ? 62 : compact ? 54 : 76, fontWeight: 850, marginTop: 12, letterSpacing: -2.2}}>The swarm converges on evidence.</div>
      </div>
      <div style={{position: "absolute", inset: 0, transform: `scale(${pullback})`}}>
        <svg width={width} height={height} style={{position: "absolute", inset: 0}}>
          {satellites.map((satellite, index) => {
            const x = cx + Math.cos(satellite.angle) * rx;
            const y = cy + Math.sin(satellite.angle) * ry;
            const path = stagger(frame, index, 7);
            return (
              <g key={satellite.name} opacity={path}>
                <line x1={x} y1={y} x2={cx} y2={cy} stroke={satellite.color} strokeWidth={index === 1 ? 4 : 2} strokeDasharray="12 14" strokeDashoffset={frame * -1.4} opacity={.62} />
                {Array.from({length: 3}).map((_, packet) => {
                  const progress = ((frame * .018 + packet / 3 + index * .17) % 1);
                  return <circle key={packet} cx={x + (cx-x) * progress} cy={y + (cy-y) * progress} r={index === 1 ? 7 : 5} fill={satellite.color} opacity={.9} />;
                })}
              </g>
            );
          })}
        </svg>
        <div style={{position: "absolute", left: cx, top: cy, transform: `translate(-50%,-50%) scale(${compact ? .62 : .76}) scale(${pulse})`, filter: "drop-shadow(0 0 45px rgba(124,58,237,.45))"}}>
          <HiveMark size={300} label={false} />
        </div>
        {satellites.map((satellite, index) => {
          const x = cx + Math.cos(satellite.angle) * rx;
          const y = cy + Math.sin(satellite.angle) * ry;
          const show = stagger(frame, index, 7);
          return (
            <div key={satellite.name} style={{position: "absolute", left: x, top: y, minWidth: vertical ? 250 : compact ? 220 : 290, transform: `translate(-50%,-50%) scale(${.9 + show * .1})`, opacity: show, padding: compact ? "17px 20px" : "22px 26px", borderRadius: 22, border: `1px solid ${satellite.color}77`, background: "rgba(8,9,13,.9)", boxShadow: `0 0 42px ${satellite.color}1f`}}>
              <div style={{fontFamily: fonts.mono, color: satellite.color, fontSize: vertical ? 23 : compact ? 21 : 24, letterSpacing: 1.8}}>{satellite.name}</div>
              <div style={{fontFamily: fonts.mono, color: palette.white, fontSize: vertical ? 31 : compact ? 27 : 34, fontWeight: 850, marginTop: 8}}>{satellite.proof}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", left: 0, right: 0, bottom: vertical ? 430 : variant === "square" ? 170 : 130, textAlign: "center", fontSize: vertical ? 36 : compact ? 31 : 39, color: palette.white, fontWeight: 750}}>
        Plan. Build. Test. Review. Fix. Revalidate. Report.
      </div>
    </AbsoluteFill>
  );
};
