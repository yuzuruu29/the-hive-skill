import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence, random } from 'remotion';
import skillsData from './skillsData.json';

const Typewriter = ({ text }: { text: string }) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor(interpolate(frame, [0, 60], [0, text.length], { extrapolateRight: 'clamp' }));
  const cursorOpacity = Math.round(frame / 15) % 2 === 0 ? 1 : 0;
  
  return (
    <div style={{ fontFamily: 'monospace', fontSize: '50px', color: '#00ffcc' }}>
      <span style={{ color: '#fff' }}>&gt; </span>
      {text.substring(0, charsToShow)}
      <span style={{ opacity: cursorOpacity, marginLeft: '5px', color: '#00ffcc' }}>█</span>
    </div>
  );
};

const Cascade = () => {
  const frame = useCurrentFrame();
  
  const y = interpolate(frame, [0, 90], [0, -1500]);
  const blur = interpolate(frame, [0, 30, 60], [0, 10, 0]);
  const fadeOut = interpolate(frame, [70, 90], [1, 0], { extrapolateLeft: 'clamp' });
  
  const lines = Array.from({ length: 40 }).map((_, i) => (
    <div key={i} style={{ color: i % 2 === 0 ? '#888' : '#33ccff', opacity: 0.8, fontSize: '30px', fontFamily: 'monospace', margin: '10px 0' }}>
      [Log] Executing sequence {(random(`seed-${i}`) * 1000).toFixed(0)}... Validating dependencies... OK
    </div>
  ));

  return (
    <div style={{ transform: `translateY(${y}px)`, filter: `blur(${blur}px)`, opacity: fadeOut, width: '100%' }}>
      {lines}
    </div>
  );
};

const SkillMatrix = () => {
  const frame = useCurrentFrame();

  const matrixOpacity = interpolate(frame, [0, 30], [0, 0.4], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 150], [0.8, 1.2]);

  // Use a subset of skills to avoid blowing up the DOM, maybe 200 skills
  const displaySkills = skillsData.slice(0, 200);

  return (
    <AbsoluteFill style={{
      opacity: matrixOpacity,
      transform: `scale(${scale})`,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '50px'
    }}>
      {displaySkills.map((skill: string, index: number) => {
        const opacityOscillation = Math.sin((frame + index * 5) * 0.05) * 0.5 + 0.5;
        const color = index % 3 === 0 ? '#33ccff' : (index % 3 === 1 ? '#00ffcc' : '#444');
        return (
          <div key={index} style={{
            color,
            opacity: opacityOscillation,
            fontSize: '18px',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            textShadow: '0 0 10px rgba(0, 255, 204, 0.5)'
          }}>
            {skill}
          </div>
        )
      })}
    </AbsoluteFill>
  );
};

const Outcome = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const pop = spring({ frame: frame - 30, fps, config: { damping: 14 } }); // Delay the pop slightly for the matrix to reveal
  const scale = interpolate(pop, [0, 1], [0.5, 1], { extrapolateLeft: 'clamp' });
  const opacity = interpolate(pop, [0, 1], [0, 1], { extrapolateLeft: 'clamp' });
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <SkillMatrix />
      <div style={{
        transform: `scale(${scale})`,
        opacity,
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        border: '2px solid #00ffcc',
        borderRadius: '20px',
        padding: '40px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 0 100px rgba(0, 255, 204, 0.5)',
        backdropFilter: 'blur(20px)',
        zIndex: 10
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>✅</div>
        <div style={{ fontSize: '50px', fontWeight: 'bold', color: '#fff' }}>Deployment Successful</div>
        <div style={{ fontSize: '30px', color: '#00ffcc', marginTop: '10px' }}>Loaded 602 Obsidian Skills</div>
      </div>
    </AbsoluteFill>
  );
};

export const SceneDemo = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [330, 360], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#050505', opacity: fadeOut }}>
      <Sequence durationInFrames={120}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            backgroundColor: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #333',
            width: '1200px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <Typewriter text="/hive-mind-council build a remotion video ad" />
          </div>
        </AbsoluteFill>
      </Sequence>
      
      <Sequence from={120} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'flex-start', padding: '100px', overflow: 'hidden' }}>
          <Cascade />
        </AbsoluteFill>
      </Sequence>
      
      <Sequence from={210} durationInFrames={150}>
        <Outcome />
      </Sequence>
    </AbsoluteFill>
  );
};
