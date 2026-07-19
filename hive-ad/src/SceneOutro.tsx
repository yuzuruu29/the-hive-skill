import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
export const SceneOutro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 12, mass: 1.5 } });
  const scale = interpolate(pop, [0, 1], [0.8, 1]);
  
  const subPop = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const subY = interpolate(subPop, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#0055ff' }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '200px', fontWeight: '900', color: '#fff', margin: 0,
          textTransform: 'uppercase', letterSpacing: '-6px', lineHeight: 0.9,
          textShadow: '0 30px 60px rgba(0,0,0,0.4)'
        }}>
          SHIP CODE<br/>SAFER.
        </h1>
        <h2 style={{
          fontSize: '60px', fontWeight: '700', color: '#00ccff',
          marginTop: '60px', opacity: subPop, transform: `translateY(${subY}px)`,
          backgroundColor: '#000', display: 'inline-block', padding: '15px 40px',
          borderRadius: '100px'
        }}>
          The Hive Skill
        </h2>
      </div>
    </AbsoluteFill>
  );
};
