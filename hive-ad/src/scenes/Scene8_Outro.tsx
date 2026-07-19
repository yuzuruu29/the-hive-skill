import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { HiveLogo } from '../components/HiveLogo';
import { Headline, Subheadline, GradientText } from '../components/Typography';
import { CodeDiffPanel } from '../components/CodeDiffPanel';
import { TaskBoard } from '../components/TaskBoard';

const BlurredBackgroundUI = () => {
  const frame = useCurrentFrame();
  const yOffset = interpolate(frame, [0, 420], [0, -100]);
  
  return (
    <AbsoluteFill style={{ filter: 'blur(16px)', opacity: 0.15, transform: `scale(1.2) translateY(${yOffset}px)`, pointerEvents: 'none', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', transform: 'scale(0.8)' }}>
        <CodeDiffPanel lines={[{ type: 'add', content: 'const router = new TaskRouter();' }, { type: 'add', content: 'await router.dispatch();' }]} delay={0} />
      </div>
      <div style={{ position: 'absolute', top: '40%', right: '5%', transform: 'scale(0.9)' }}>
        <TaskBoard tasks={[{ title: 'Initialize engine', status: 'done' }, { title: 'Load context', status: 'done' }]} delay={0} />
      </div>
      <div style={{ position: 'absolute', bottom: '10%', left: '30%', transform: 'scale(1)' }}>
        <div style={{ padding: '32px', backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid rgba(160, 140, 255, 0.4)', borderRadius: '16px' }}>
          <div style={{ color: '#a08cff', fontWeight: 'bold' }}>MEMORY VAULT LOADED</div>
          <div style={{ color: '#fff', fontSize: '24px' }}>System Ready</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene8_Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  
  const logoY = interpolate(entrance, [0, 1], [-20, -80]);
  const textY = interpolate(entrance, [0, 1], [60, 20]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  
  // Subtle continuous scale for premium feel over the long hold
  const continuousScale = interpolate(frame, [0, 420], [1, 1.05]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', justifyContent: 'center', alignItems: 'center' }}>
      <OrchestrationCanvas />
      <BlurredBackgroundUI />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', transform: `scale(${continuousScale})`, zIndex: 10 }}>
        <div style={{ transform: `translateY(${logoY}px)`, opacity }}>
          <HiveLogo size={280} />
        </div>

        <div style={{ transform: `translateY(${textY}px)`, opacity, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Headline style={{ fontSize: '110px' }}>The Hive Skill</Headline>
          <Subheadline style={{ marginTop: '24px', fontSize: '56px' }}>
            Where <GradientText>AI minds</GradientText> work as one.
          </Subheadline>

          {/* CTA Tags */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '80px' }}>
            {['Open Source', 'Local First', 'Agent Orchestration', 'GitHub'].map((tag, i) => (
              <div key={i} style={{
                padding: '16px 32px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '22px',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                transform: `translateY(${interpolate(spring({ frame: frame - 20 - i * 10, fps, config: { damping: 14 } }), [0, 1], [20, 0])}px)`,
                opacity: interpolate(spring({ frame: frame - 20 - i * 10, fps, config: { damping: 14 } }), [0, 1], [0, 1])
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
