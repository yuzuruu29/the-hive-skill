import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";

import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_EveryAgent } from './scenes/Scene2_EveryAgent';
import { Scene3_Orchestration } from './scenes/Scene3_Orchestration';
import { Scene4_Panels } from './scenes/Scene4_Panels';
import { Scene5_Execution } from './scenes/Scene5_Execution';
import { Scene6_Memory } from './scenes/Scene6_Memory';
import { Scene7_Montage } from './scenes/Scene7_Montage';
import { Scene8_Outro } from './scenes/Scene8_Outro';

const { fontFamily } = loadFont();

export const HiveAd = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', color: '#ffffff', fontFamily }}>
      <Audio src={staticFile("ambient.mp3")} />
      
      {/* 0-8s */}
      <Sequence durationInFrames={480}>
        <Scene1_Intro />
      </Sequence>
      
      {/* 8-16s */}
      <Sequence from={480} durationInFrames={480}>
        <Scene2_EveryAgent />
      </Sequence>
      
      {/* 16-30s */}
      <Sequence from={960} durationInFrames={840}>
        <Scene3_Orchestration />
      </Sequence>
      
      {/* 30-44s */}
      <Sequence from={1800} durationInFrames={840}>
        <Scene4_Panels />
      </Sequence>
      
      {/* 44-58s */}
      <Sequence from={2640} durationInFrames={840}>
        <Scene5_Execution />
      </Sequence>
      
      {/* 58-73s */}
      <Sequence from={3480} durationInFrames={900}>
        <Scene6_Memory />
      </Sequence>
      
      {/* 73-84s */}
      <Sequence from={4380} durationInFrames={660}>
        <Scene7_Montage />
      </Sequence>
      
      {/* 84-90s */}
      <Sequence from={5040} durationInFrames={360}>
        <Scene8_Outro />
      </Sequence>

    </AbsoluteFill>
  );
};
