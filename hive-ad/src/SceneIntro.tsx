import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
export const SceneIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  
  const yOffset = interpolate(entrance, [0, 1], [80, 0]);
  const opacity = entrance;

  const fadeOut = interpolate(frame, [150, 180], [1, 0], { extrapolateRight: 'clamp' });

  const bgX = interpolate(frame, [0, 180], [-100, 100], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: fadeOut }}>
      <div style={{ transform: `translateY(${yOffset}px)`, opacity, textAlign: 'center' }}>
        <p style={{ fontSize: '60px', fontWeight: '500', color: '#888', margin: '0 0 20px 0', letterSpacing: '8px', textTransform: 'uppercase' }}>
          Introducing
        </p>
        <h1 style={{ 
          fontSize: '140px', fontWeight: '900', margin: 0, 
          background: `linear-gradient(90deg, #00ccff, #0055ff, #00ccff)`,
          backgroundSize: '200% auto',
          backgroundPosition: `${bgX}% center`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1
        }}>
          Hive Mind Council
        </h1>
      </div>
    </AbsoluteFill>
  );
};
