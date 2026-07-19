import {Easing, interpolate} from "remotion";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const enter = (frame: number, start = 0, duration = 20) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const sceneOpacity = (frame: number, duration: number) => {
  // Keep cut points luminous. The reference uses hard, beat-led edits rather
  // than full dips to black, so scene edges only soften slightly.
  const fadeIn = interpolate(frame, [0, 8], [0.84, 1], clamp);
  const fadeOut = interpolate(frame, [duration - 8, duration], [1, 0.84], clamp);
  return Math.min(fadeIn, fadeOut);
};

export const stagger = (frame: number, index: number, gap = 6) => enter(frame, index * gap, 18);
