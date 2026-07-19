import {useCallback, useEffect, useState} from "react";
import type {Caption} from "@remotion/captions";
import {AbsoluteFill, staticFile, useCurrentFrame, useDelayRender, useVideoConfig} from "remotion";
import {palette} from "../styles/theme";
import type {PromoVariant} from "../types";

export const CaptionLayer = ({variant}: {variant: PromoVariant}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender(`Load ${variant} captions`));
  const [captions, setCaptions] = useState<Caption[]>([]);

  const load = useCallback(async () => {
    try {
      const response = await fetch(staticFile(`captions/${variant}.json`));
      if (!response.ok) throw new Error(`Caption load failed: ${response.status}`);
      setCaptions(await response.json() as Caption[]);
      continueRender(handle);
    } catch (error) {
      cancelRender(error);
    }
  }, [cancelRender, continueRender, handle, variant]);

  useEffect(() => { void load(); }, [load]);
  const timeMs = frame / fps * 1000;
  const active = captions.find((caption) => timeMs >= caption.startMs && timeMs < caption.endMs);
  if (!active) return null;

  return (
    <AbsoluteFill style={{pointerEvents: "none", justifyContent: "flex-end", alignItems: "center", paddingBottom: variant === "vertical" ? 220 : variant === "square" ? 40 : 66}}>
      <div
        style={{
          maxWidth: variant === "vertical" ? 900 : variant === "square" ? 900 : 1480,
          padding: variant === "vertical" ? "15px 24px" : "11px 20px",
          borderRadius: 14,
          background: "rgba(8,9,13,.82)",
          boxShadow: "0 12px 36px rgba(0,0,0,.38)",
          color: palette.white,
          fontSize: variant === "vertical" ? 38 : variant === "square" ? 32 : 32,
          lineHeight: 1.2,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {active.text.trim()}
      </div>
    </AbsoluteFill>
  );
};
