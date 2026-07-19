import {AbsoluteFill, interpolate, Sequence, staticFile, useVideoConfig} from "remotion";
import {Audio} from "@remotion/media";
import {CaptionLayer} from "../components/CaptionLayer";
import {FrameShell} from "../components/FrameShell";
import {ColdOpen} from "../scenes/ColdOpen";
import {HiveReveal} from "../scenes/HiveReveal";
import {EngineeringLoop} from "../scenes/EngineeringLoop";
import {ProjectProof} from "../scenes/ProjectProof";
import {EvidenceWall} from "../scenes/EvidenceWall";
import {EndCard} from "../scenes/EndCard";
import {SwarmClimax} from "../scenes/SwarmClimax";
import type {PromoProps, PromoVariant} from "../types";

const durations: Record<PromoVariant, number[]> = {
  master: [130, 150, 300, 490, 280, 285, 345],
  vertical: [72, 105, 230, 390, 90, 114, 259],
  square: [66, 84, 156, 232, 30, 43, 289],
};

const offsets = (items: number[]) => items.map((_, index) => items.slice(0, index).reduce((sum, value) => sum + value, 0));

export const HivePromo = (props: PromoProps) => {
  const {fps} = useVideoConfig();
  const sceneDurations = durations[props.variant];
  const starts = offsets(sceneDurations);
  const totalFrames = sceneDurations.reduce((sum, value) => sum + value, 0);
  const scenes = [
    <ColdOpen key="cold-open" variant={props.variant} duration={sceneDurations[0]} />,
    <HiveReveal key="reveal" variant={props.variant} duration={sceneDurations[1]} />,
    <EngineeringLoop key="loop" variant={props.variant} duration={sceneDurations[2]} />,
    <ProjectProof key="proof" variant={props.variant} duration={sceneDurations[3]} />,
    <EvidenceWall key="evidence" variant={props.variant} duration={sceneDurations[4]} />,
    <SwarmClimax key="climax" variant={props.variant} duration={sceneDurations[5]} />,
    <EndCard key="end" variant={props.variant} duration={sceneDurations[6]} repositoryUrl={props.repositoryUrl} />,
  ];

  return (
    <FrameShell variant={props.variant}>
      <AbsoluteFill>
        {scenes.map((scene, index) => (
          <Sequence key={index} from={starts[index]} durationInFrames={sceneDurations[index]} premountFor={fps}>
            {scene}
          </Sequence>
        ))}
      </AbsoluteFill>
      {props.audioEnabled ? (
        <>
          <Audio
            src={staticFile("audio/hive-bed.wav")}
            volume={(audioFrame) => interpolate(audioFrame, [0, 30, totalFrames - 66, totalFrames], [0, .23, .23, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}
          />
          {props.narrationAvailable ? <Audio src={staticFile(`audio/${props.variant}-voiceover.mp3`)} volume={1} /> : null}
          <Sequence from={sceneDurations[0]} durationInFrames={42} premountFor={fps}>
            <Audio src={staticFile("audio/reveal.wav")} volume={0.38} />
          </Sequence>
          <Sequence from={starts[4]} durationInFrames={30} premountFor={fps}>
            <Audio src={staticFile("audio/confirm.wav")} volume={0.3} />
          </Sequence>
          {[starts[2], starts[3], starts[5], starts[6]].map((start, index) => (
            <Sequence key={start} from={start} durationInFrames={36} premountFor={fps}>
              <Audio src={staticFile(index === 2 ? "audio/impact.wav" : "audio/whoosh.wav")} volume={index === 2 ? .48 : .26} />
            </Sequence>
          ))}
        </>
      ) : null}
      {props.captionVisibility ? <CaptionLayer variant={props.variant} /> : null}
    </FrameShell>
  );
};
