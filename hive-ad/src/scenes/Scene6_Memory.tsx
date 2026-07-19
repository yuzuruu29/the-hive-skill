import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { Headline } from '../components/Typography';
import { ConnectionLine } from '../components/ConnectionLine';

const VaultItem = ({ title, active, delay, y }: { title: string, active: boolean, delay: number, y: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  return (
    <div style={{
      position: 'absolute', top: y, left: 0, width: '100%',
      padding: '12px 16px',
      backgroundColor: active ? 'rgba(160, 140, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
      borderLeft: `4px solid ${active ? '#a08cff' : 'transparent'}`,
      color: active ? '#fff' : 'rgba(255,255,255,0.5)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      transform: `translateX(${20 * (1 - entrance)}px)`,
      opacity: entrance
    }}>
      {title}
    </div>
  );
};

const ContextCard = ({ title, desc, delay, y }: { title: string, desc: string, delay: number, y: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  return (
    <div style={{
      position: 'absolute', top: y, right: 0, width: '100%',
      padding: '16px',
      backgroundColor: 'rgba(20, 20, 25, 0.8)',
      border: '1px solid rgba(160, 140, 255, 0.3)',
      borderRadius: '8px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      transform: `translateX(${20 * (1 - entrance)}px)`,
      opacity: entrance
    }}>
      <div style={{ color: '#a08cff', fontFamily: 'SF Mono, monospace', fontSize: '12px', marginBottom: '8px' }}>RETRIEVED CONTEXT</div>
      <div style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>{title}</div>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '13px', lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
};

const MemoryNode = ({ label, x, y, delay, highlight }: { label: string, x: number, y: number, delay: number, highlight: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%, -50%) scale(${entrance})`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
    }}>
      <div style={{
        width: '16px', height: '16px', borderRadius: '50%',
        backgroundColor: highlight ? '#a08cff' : '#222',
        border: `2px solid ${highlight ? '#fff' : '#444'}`,
        boxShadow: highlight ? '0 0 16px #a08cff' : 'none'
      }} />
      <div style={{
        color: highlight ? '#fff' : 'rgba(255,255,255,0.4)',
        fontFamily: 'Inter, sans-serif', fontSize: '12px',
        backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px'
      }}>
        {label}
      </div>
    </div>
  );
};

export const Scene6_Memory = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [840, 900], [1, 0], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 900], [1.1, 1]);
  const textFadeOut = interpolate(frame, [810, 840], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', opacity: fadeOut }}>
      <OrchestrationCanvas />

      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        
        {/* Left: Vault List */}
        <div style={{ position: 'absolute', left: 100, top: 250, width: '280px', height: '500px', backgroundColor: 'rgba(20, 20, 25, 0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Project Vaults</div>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <VaultItem title="Hive Orchestrator Core" active={true} delay={20} y={0} />
            <VaultItem title="CLI Tooling" active={false} delay={30} y={50} />
            <VaultItem title="GitHub Action Integration" active={false} delay={40} y={100} />
            <VaultItem title="Local Model Connectors" active={false} delay={50} y={150} />
            <VaultItem title="Web UI Dashboard" active={false} delay={60} y={200} />
          </div>
        </div>

        {/* Center: Knowledge Graph */}
        <div style={{ position: 'absolute', left: 450, top: 250, width: '900px', height: '500px', backgroundColor: 'rgba(10, 10, 12, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
          <ConnectionLine x1={200} y1={150} x2={450} y2={250} delay={60} active={false} />
          <ConnectionLine x1={200} y1={350} x2={450} y2={250} delay={70} active={false} />
          <ConnectionLine x1={450} y1={250} x2={700} y2={150} delay={80} active={true} />
          <ConnectionLine x1={450} y1={250} x2={700} y2={350} delay={90} active={true} />

          <MemoryNode label="Provider Config" x={200} y={150} delay={60} highlight={false} />
          <MemoryNode label="Local Runtime Setup" x={200} y={350} delay={70} highlight={false} />
          
          <MemoryNode label="Routing Logic v2" x={450} y={250} delay={100} highlight={true} />
          
          <MemoryNode label="Validation Rules" x={700} y={150} delay={150} highlight={true} />
          <MemoryNode label="Design Validation Rules" x={700} y={350} delay={160} highlight={true} />
          
          {/* New task node compressing in */}
          {frame > 200 && (
            <div style={{
              position: 'absolute', left: 450, top: 400,
              transform: `translate(-50%, -50%)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              opacity: interpolate(frame, [200, 240, 280, 300], [0, 1, 1, 0]),
              scale: interpolate(frame, [280, 300], [1, 0])
            }}>
              <div style={{ padding: '8px 16px', backgroundColor: '#00e6a8', color: '#000', borderRadius: '4px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600 }}>Task Completed: Auth Routing</div>
            </div>
          )}
        </div>

        {/* Right: Context Cards */}
        <div style={{ position: 'absolute', left: 1420, top: 250, width: '380px', height: '500px' }}>
          <ContextCard title="Routing Logic v2" desc="Use context-aware selection for routing to local models first." delay={120} y={0} />
          <ContextCard title="Validation Rules" desc="Ensure all output complies with strict deterministic rendering." delay={180} y={160} />
          <ContextCard title="Design Validation Rules" desc="Check for correct contrast, depth, and UI consistency." delay={200} y={320} />
        </div>

      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: '80px', opacity: textFadeOut }}>
        <div style={{ textAlign: 'center' }}>
          <Headline style={{ fontSize: '72px', marginBottom: '16px' }}>
            Memory that compounds.
          </Headline>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px', fontFamily: 'Inter, sans-serif' }}>
            Past decisions become reusable workflows.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
