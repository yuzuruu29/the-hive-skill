import {useCurrentFrame, useVideoConfig} from "remotion";
import {palette} from "../styles/theme";
import type {PromoVariant} from "../types";

export const HoneycombGrid = ({variant, intensity = 1}: {variant: PromoVariant; intensity?: number}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const cell = variant === "vertical" ? 104 : variant === "square" ? 92 : 118;
  const columns = Math.ceil(width / (cell * 0.78)) + 1;
  const rows = Math.ceil(height / (cell * 0.68)) + 1;
  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", opacity: 0.38 * intensity}}>
      {Array.from({length: rows * columns}).map((_, index) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const pulse = 0.16 + 0.11 * Math.sin(frame / 48 + index * 0.71);
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: column * cell * 0.78 - cell * 0.2,
              top: row * cell * 0.68 + (column % 2 ? cell * 0.34 : 0) - cell * 0.2,
              width: cell,
              height: cell * 0.88,
              clipPath: "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0 50%)",
              background: `rgba(124, 58, 237, ${pulse})`,
              transform: "scale(0.96)",
            }}
          />
        );
      })}
    </div>
  );
};
