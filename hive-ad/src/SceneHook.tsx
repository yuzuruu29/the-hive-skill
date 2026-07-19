import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
export const SceneHook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance1 = spring({ frame, fps, config: { damping: 15, mass: 0.5 } });
  const entrance2 = spring({ frame: frame - 20, fps, config: { damping: 15, mass: 0.5 } });

  const y1 = interpolate(entrance1, [0, 1], [50, 0]);
  const y2 = interpolate(entrance2, [0, 1], [50, 0]);
  const blur1 = interpolate(entrance1, [0, 1], [20, 0]);
  const blur2 = interpolate(entrance2, [0, 1], [20, 0]);

  const fadeOut = interpolate(frame, [160, 180], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const scale = interpolate(frame, [0, 180], [1, 1.05], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: fadeOut }}>
      <div style={{ transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h1 style={{ 
          fontSize: '120px', fontWeight: '900', margin: 0, 
          transform: `translateY(${y1}px)`, opacity: entrance1, filter: `blur(${blur1}px)`,
          background: 'linear-gradient(90deg, #ff4d4d, #ff8080)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          lineHeight: 1.1
        }}>
          Stop babysitting
        </h1>
        <h1 style={{ 
          fontSize: '120px', fontWeight: '800', margin: 0, color: '#e0e0e0',
          transform: `translateY(${y2}px)`, opacity: entrance2, filter: `blur(${blur2}px)`,
          lineHeight: 1.1
        }}>
          your AI agents.
        </h1>
      </div>
    </AbsoluteFill>
  );
};
