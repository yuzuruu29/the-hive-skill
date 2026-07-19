import { AbsoluteFill, useCurrentFrame, Sequence, spring, useVideoConfig, interpolate } from 'remotion';

const Role = ({ name, color }: { name: string, color: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  
  const drift = interpolate(frame, [0, 60], [1, 1.05]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <h2 style={{
        fontSize: '200px', fontWeight: '900', color,
        transform: `scale(${scale * drift})`,
        margin: 0, textTransform: 'uppercase', letterSpacing: '-4px',
        textShadow: `0px 0px 40px ${color}80`
      }}>
        {name}
      </h2>
    </AbsoluteFill>
  );
};

export const SceneRoles = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [340, 360], [1, 0], { extrapolateRight: 'clamp' });

  const roles = [
    { name: 'Queen', color: '#FF3366' },
    { name: 'Scout', color: '#FF9933' },
    { name: 'Architect', color: '#FFDD33' },
    { name: 'Forger', color: '#33FF66' },
    { name: 'Sentinel', color: '#33CCFF' },
    { name: 'Scribe', color: '#B833FF' },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {roles.map((role, index) => (
        <Sequence key={role.name} from={index * 60} durationInFrames={60}>
          <Role name={role.name} color={role.color} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
