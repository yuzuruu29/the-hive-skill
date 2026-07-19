import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { Headline } from '../components/Typography';
import { HiveLogo } from '../components/HiveLogo';

const Fragment = ({ children, delay, top, left, convergeProgress }: { children: React.ReactNode, delay: number, top: number, left: number, convergeProgress: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  // Interpolate towards center (50%, 50%) based on convergeProgress
  const currentTop = interpolate(convergeProgress, [0, 1], [top, 50]);
  const currentLeft = interpolate(convergeProgress, [0, 1], [left, 50]);
  const currentScale = interpolate(convergeProgress, [0, 1], [1, 0]);
  const currentOpacity = interpolate(convergeProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <div style={{
      position: 'absolute',
      top: `${currentTop}%`,
      left: `${currentLeft}%`,
      transform: `translate(-50%, -50%) scale(${entrance * currentScale})`,
      opacity: currentOpacity,
      padding: '16px 24px',
      backgroundColor: 'rgba(20, 20, 25, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '12px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.9)',
      boxShadow: '0 10px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      backdropFilter: 'blur(20px)',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      {children}
    </div>
  );
};

const UIConvergence = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Start converging at frame 160
  const convergeProgress = interpolate(frame, [160, 220], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  
  // Hive logo appears as fragments disappear
  const logoEntrance = spring({ frame: frame - 210, fps, config: { damping: 14 } });
  const logoScale = interpolate(logoEntrance, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <Fragment delay={20} top={25} left={20} convergeProgress={convergeProgress}>
        <div style={{ fontFamily: 'SF Mono, monospace', color: '#00e6a8' }}>~</div>
        <div style={{ fontFamily: 'SF Mono, monospace' }}>./hive run planner</div>
      </Fragment>
      <Fragment delay={40} top={75} left={25} convergeProgress={convergeProgress}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#a08cff', boxShadow: '0 0 10px #a08cff' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>AGENT NODE</span>
          <span style={{ fontWeight: 600 }}>Claude 3.5 Sonnet</span>
        </div>
      </Fragment>
      <Fragment delay={50} top={30} left={80} convergeProgress={convergeProgress}>
        <div style={{ padding: '4px 8px', backgroundColor: 'rgba(248, 81, 73, 0.1)', color: '#f85149', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>ERR</div>
        <div>Dependency resolution failed</div>
      </Fragment>
      <Fragment delay={70} top={80} left={75} convergeProgress={convergeProgress}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>MEMORY VAULT</span>
          <span style={{ fontFamily: 'SF Mono, monospace', fontSize: '13px' }}>Context loaded: 4.2MB</span>
        </div>
      </Fragment>
      <Fragment delay={90} top={50} left={15} convergeProgress={convergeProgress}>
        <div style={{ width: '12px', height: '12px', border: '2px solid #2ea043', borderRadius: '2px' }} />
        <div>Task Queue: 3 pending</div>
      </Fragment>
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity
        }}>
          <HiveLogo size={180} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Scene1_Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera pushes in slowly
  const scale = interpolate(frame, [0, 480], [1, 1.15]);

  const text1Entrance = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const text1Opacity = interpolate(text1Entrance, [0, 1], [0, 1]);
  const text1FadeOut = interpolate(frame, [220, 250], [1, 0], { extrapolateRight: 'clamp' });

  const text2Entrance = spring({ frame: frame - 280, fps, config: { damping: 14 } });
  const text2Y = interpolate(text2Entrance, [0, 1], [20, 0]);
  const text2Opacity = interpolate(text2Entrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', transform: `scale(${scale})` }}>
      <OrchestrationCanvas />
      
      <Sequence durationInFrames={360}>
        <UIConvergence />
      </Sequence>
      
      <Sequence durationInFrames={250}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: '120px' }}>
          <div style={{ opacity: text1Opacity * text1FadeOut }}>
            <Headline>
              The future isn't one AI.
            </Headline>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={250}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: '140px' }}>
          <div style={{ opacity: text2Opacity, transform: `translateY(${text2Y}px)` }}>
            <Headline>
              It's a council.
            </Headline>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
