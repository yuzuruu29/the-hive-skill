import {AbsoluteFill, useCurrentFrame} from "remotion";
import {TerminalWindow} from "../components/TerminalWindow";
import {enter, sceneOpacity, stagger} from "../styles/motion";
import {palette} from "../styles/theme";
import type {PromoVariant} from "../types";

const panels = [
  {title: "planner", label: "PLAN", line: "Scope does not match repository", tone: "warning" as const},
  {title: "builder", label: "BUILD", line: "Implementation ready for review", tone: "neutral" as const},
  {title: "validator", label: "TEST", line: "Check failed: ownership conflict", tone: "warning" as const},
  {title: "reviewer", label: "RISK", line: "Next action is still unassigned", tone: "warning" as const},
];

export const ColdOpen = ({variant, duration}: {variant: PromoVariant; duration: number}) => {
  const frame = useCurrentFrame();
  const isVertical = variant === "vertical";
  const compact = variant !== "master";
  const focus = enter(frame, 20, 24);
  const camera = 1 + enter(frame, 0, duration) * .045;
  return (
    <AbsoluteFill style={{opacity: sceneOpacity(frame, duration), padding: isVertical ? "190px 76px 250px" : variant === "square" ? "135px 70px 150px" : "125px 92px 130px"}}>
      <div style={{display: "grid", gridTemplateColumns: isVertical ? "1fr" : "repeat(2, minmax(0,1fr))", gap: isVertical ? 18 : 24, transform: `perspective(1200px) translateY(${(1 - focus) * 28}px) scale(${camera}) rotateX(${(1-focus) * 4}deg)`}}>
        {panels.slice(0, isVertical ? 3 : 4).map((panel, index) => {
          const progress = stagger(frame, index, 5);
          const drift = Math.sin(frame / 34 + index) * (isVertical ? 4 : 8);
          return (
            <div key={panel.title} style={{opacity: progress, transform: `translate(${drift}px, ${(1 - progress) * 20}px) rotate(${(index % 2 ? 1 : -1) * (1 - focus) * 1.1}deg)`}}>
              <TerminalWindow compact={compact} title={`${panel.title}.log`} rows={[{prefix: panel.label, text: panel.line, tone: panel.tone}]} />
            </div>
          );
        })}
      </div>
      <div style={{position: "absolute", left: isVertical ? 76 : variant === "square" ? 70 : 92, right: isVertical ? 76 : variant === "square" ? 70 : 92, bottom: isVertical ? 310 : variant === "square" ? 165 : 154}}>
        <div style={{fontSize: isVertical ? 62 : variant === "square" ? 58 : 78, lineHeight: 1.02, fontWeight: 850, letterSpacing: -2.8}}>One request.</div>
        <div style={{marginTop: 12, fontSize: isVertical ? 46 : variant === "square" ? 41 : 52, color: palette.muted, fontWeight: 650}}>An entire engineering swarm.</div>
      </div>
    </AbsoluteFill>
  );
};
