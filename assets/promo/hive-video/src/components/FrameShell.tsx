import type {ReactNode} from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {HoneycombGrid} from "./HoneycombGrid";
import {fonts, palette, safePadding} from "../styles/theme";
import type {PromoVariant} from "../types";

export const FrameShell = ({variant, children}: {variant: PromoVariant; children: ReactNode}) => {
  const frame = useCurrentFrame();
  const glowX = 50 + Math.sin(frame / 120) * 6;
  const orbitShift = Math.sin(frame / 88) * 24;
  const sweep = ((frame % 210) / 210) * 140 - 20;
  const padding = safePadding[variant];
  return (
    <AbsoluteFill
      style={{
        background: palette.void,
        color: palette.white,
        fontFamily: fonts.sans,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${glowX}% 42%, rgba(124,58,237,.19), transparent 36%), radial-gradient(circle at 78% 82%, rgba(245,185,66,.08), transparent 28%), linear-gradient(145deg, #08090D 0%, #11131B 55%, #08090D 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: variant === "vertical" ? 1320 : 1780,
          height: variant === "vertical" ? 1320 : 980,
          left: variant === "vertical" ? -120 : "50%",
          top: variant === "vertical" ? -560 + orbitShift : -660 + orbitShift,
          transform: variant === "vertical" ? "rotate(-10deg)" : "translateX(-50%) rotate(-7deg)",
          borderRadius: "50%",
          border: "2px solid rgba(167,139,250,.16)",
          boxShadow: "0 0 100px rgba(124,58,237,.12), inset 0 -40px 120px rgba(124,58,237,.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: variant === "vertical" ? 1040 : 1420,
          height: variant === "vertical" ? 1040 : 760,
          right: variant === "vertical" ? -420 : -260,
          bottom: variant === "vertical" ? -520 - orbitShift : -500 - orbitShift,
          borderRadius: "50%",
          border: "1px solid rgba(245,185,66,.13)",
          boxShadow: "0 0 90px rgba(245,185,66,.08)",
        }}
      />
      <HoneycombGrid variant={variant} intensity={0.54} />
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          transform: `translateX(${sweep}%) rotate(-14deg)`,
          width: "16%",
          background: "linear-gradient(90deg, transparent, rgba(167,139,250,.045), transparent)",
          filter: "blur(18px)",
        }}
      />
      <AbsoluteFill style={{background: "radial-gradient(circle at center, transparent 48%, rgba(0,0,0,.42) 100%)"}} />
      <div
        style={{
          position: "absolute",
          top: variant === "vertical" ? 54 : 38,
          left: padding,
          right: padding,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: palette.muted,
          fontFamily: fonts.mono,
          fontSize: variant === "vertical" ? 22 : 18,
          letterSpacing: 1.6,
          textTransform: "uppercase",
        }}
      >
        <span>HIVE // VERIFIED ENGINEERING</span>
        {variant !== "vertical" ? <span>OPEN SOURCE</span> : null}
      </div>
      {children}
      <div
        style={{
          position: "absolute",
          left: padding,
          right: padding,
          bottom: variant === "vertical" ? 54 : 34,
          height: 2,
          background: "linear-gradient(90deg, transparent, #7C3AED, #F5B942, transparent)",
          opacity: 0.55,
        }}
      />
    </AbsoluteFill>
  );
};
