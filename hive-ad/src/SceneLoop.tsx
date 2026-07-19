import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
const Step = ({ text, index, icon }: { text: string, index: number, icon: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const pop = spring({
    frame: frame - (index * 15 + 20),
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const opacity = interpolate(pop, [0, 1], [0, 1]);
  const x = interpolate(pop, [0, 1], [-50, 0]);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '30px',
      fontSize: '45px', fontWeight: '800', color: '#fff',
      opacity, transform: `translateX(${x}px)`,
      margin: '6px 0', padding: '15px 40px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)'
    }}>
      <span style={{ fontSize: '50px' }}>{icon}</span>
      {text}
    </div>
  );
}

export const SceneLoop = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEntrance = spring({ frame, fps, config: { damping: 15 } });
  const titleY = interpolate(titleEntrance, [0, 1], [-30, 0]);

  const fadeOut = interpolate(frame, [330, 360], [1, 0], { extrapolateRight: 'clamp' });

  const steps = [
    { text: "1. Understand (Queen)", icon: "👑" },
    { text: "2. Inspect (Scout)", icon: "🔭" },
    { text: "3. Plan (Architect)", icon: "📐" },
    { text: "4. Implement (Forger)", icon: "🔨" },
    { text: "5. Validate (Sentinel)", icon: "🛡️" },
    { text: "6. Fix (Sentinel Loop)", icon: "🔄" },
    { text: "7. Summarize (Scribe)", icon: "📝" }
  ];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: fadeOut }}>
      <div style={{ width: '1200px' }}>
        <h2 style={{ 
          fontSize: '60px', fontWeight: '600', color: '#00ccff', 
          marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '4px',
          opacity: titleEntrance, transform: `translateY(${titleY}px)`
        }}>
          Autonomous Loop
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {steps.map((step, index) => (
             <Step key={step.text} text={step.text} icon={step.icon} index={index} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
