import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { Headline } from '../components/Typography';
import { RuntimeStatusCard } from '../components/RuntimeStatusCard';
import { ConnectionLine } from '../components/ConnectionLine';
import { IconPlanner, IconBuilder, IconValidator, IconResearcher } from '../components/Icons';

const TaskOutput = ({ title, delay, y }: { title: string, delay: number, y: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div style={{
      position: 'absolute',
      left: 1300,
      top: y,
      transform: `scale(${scale}) translateY(${10 * (1 - entrance)}px)`,
      opacity,
      width: '260px',
      padding: '16px',
      backgroundColor: 'rgba(0, 230, 168, 0.05)',
      border: '1px solid rgba(0, 230, 168, 0.3)',
      borderRadius: '8px',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 8px 24px rgba(0, 230, 168, 0.1)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00e6a8', boxShadow: '0 0 10px #00e6a8' }} />
      <span style={{ fontSize: '14px', fontWeight: 500 }}>{title}</span>
    </div>
  );
};

const CapabilityMatchNode = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  return (
    <div style={{
      position: 'absolute',
      left: 780,
      top: 450,
      width: '180px',
      opacity,
      padding: '16px',
      backgroundColor: 'rgba(20, 20, 25, 0.8)',
      border: '1px solid rgba(160, 140, 255, 0.3)',
      borderRadius: '12px',
      boxShadow: '0 0 30px rgba(160, 140, 255, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{ color: '#a08cff', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>Router Node</div>
      <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Capability Match</div>
    </div>
  );
};

const RuntimeRail = () => {
  const frame = useCurrentFrame();
  const yOffset = interpolate(frame, [50, 80], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      bottom: 40,
      left: '50%',
      transform: `translateX(-50%) translateY(${yOffset}px)`,
      opacity,
      display: 'flex',
      gap: '32px',
      padding: '16px 32px',
      backgroundColor: 'rgba(20, 20, 25, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '100px',
      backdropFilter: 'blur(20px)',
      fontFamily: 'SF Mono, monospace',
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.6)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00e6a8' }} />
        Local First
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a08cff' }} />
        Cloud Providers
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f85149' }} />
        CLI Integrated
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        OpenAI Compatible
      </div>
    </div>
  );
};

const RouteChip = ({ icon, label, x, y, delay }: { icon: React.ReactNode, label: string, x: number, y: number, delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `scale(${scale})`,
      opacity,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      backgroundColor: 'rgba(40, 40, 45, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '100px',
      color: '#fff',
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export const Scene3_Orchestration = () => {
  const frame = useCurrentFrame();
  
  const textFadeOut = interpolate(frame, [780, 810], [1, 0], { extrapolateRight: 'clamp' });
  const sceneFadeOut = interpolate(frame, [810, 840], [1, 0], { extrapolateRight: 'clamp' });

  // Camera pan
  const xOffset = interpolate(frame, [0, 840], [100, -50]);
  const scale = interpolate(frame, [0, 840], [1.1, 1]);

  const showLines = frame > 80;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', opacity: sceneFadeOut }}>
      <OrchestrationCanvas />
      
      <AbsoluteFill style={{ transform: `scale(${scale}) translateX(${xOffset}px)` }}>
        {/* Left Column: Models */}
        <div style={{ position: 'absolute', left: 200, top: 250, display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <RuntimeStatusCard 
            modelName="Llama 3 8B Instruct" 
            provider="Ollama" 
            isLocal={true} 
            latency="12ms" 
            capabilities={['Routing', 'Validation']} 
            status={frame > 120 && frame < 400 ? 'routing' : 'done'}
            active={frame > 120 && frame < 400}
          />
          <RuntimeStatusCard 
            modelName="Claude 3.5 Sonnet" 
            provider="Anthropic" 
            isLocal={false} 
            latency="850ms" 
            capabilities={['Code Gen', 'Review']} 
            status={frame > 200 && frame < 600 ? 'processing' : 'idle'}
            active={frame > 200 && frame < 600}
          />
          <RuntimeStatusCard 
            modelName="DeepSeek Coder V2" 
            provider="Local Inference" 
            isLocal={true} 
            latency="180ms" 
            capabilities={['Architecture', 'Tests']} 
            status={frame > 400 && frame < 750 ? 'processing' : 'idle'}
            active={frame > 400 && frame < 750}
          />
        </div>

        <CapabilityMatchNode />

        {/* Center: Routing Lines */}
        {showLines && (
          <>
            <ConnectionLine x1={540} y1={300} x2={780} y2={480} delay={120} active={frame > 120 && frame < 400} />
            <ConnectionLine x1={540} y1={460} x2={780} y2={500} delay={200} active={frame > 200 && frame < 600} />
            <ConnectionLine x1={540} y1={620} x2={780} y2={520} delay={400} active={frame > 400 && frame < 750} />

            <ConnectionLine x1={960} y1={480} x2={1280} y2={350} delay={180} active={frame > 180 && frame < 450} />
            <ConnectionLine x1={960} y1={500} x2={1280} y2={500} delay={250} active={frame > 250 && frame < 650} />
            <ConnectionLine x1={960} y1={520} x2={1280} y2={650} delay={300} active={frame > 300 && frame < 700} />
            <ConnectionLine x1={960} y1={540} x2={1280} y2={800} delay={450} active={frame > 450 && frame < 800} />
          </>
        )}

        <RouteChip icon={<IconPlanner size={14} />} label="Planner" x={1080} y={390} delay={180} />
        <RouteChip icon={<IconBuilder size={14} />} label="Builder" x={1080} y={480} delay={250} />
        <RouteChip icon={<IconValidator size={14} />} label="Validator" x={1080} y={560} delay={300} />
        <RouteChip icon={<IconResearcher size={14} />} label="Researcher" x={1080} y={660} delay={450} />

        {/* Right Column: Outputs */}
        <TaskOutput title="Route plan finalized" delay={200} y={310} />
        <TaskOutput title="API module written" delay={300} y={460} />
        <TaskOutput title="Integration tests generated" delay={350} y={610} />
        <TaskOutput title="Architecture validated" delay={500} y={760} />
        
      </AbsoluteFill>

      <RuntimeRail />

      <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: '80px', opacity: textFadeOut }}>
        <div style={{ textAlign: 'center' }}>
          <Headline style={{ fontSize: '72px', marginBottom: '16px' }}>
            Coordinate every model.
          </Headline>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px', fontFamily: 'Inter, sans-serif' }}>
            Local, cloud, and custom agents in one orchestration layer.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
