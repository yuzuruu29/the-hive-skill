import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { Headline } from '../components/Typography';
import { IconPlanner, IconBuilder, IconResearcher, IconCritic, IconValidator, IconMemory } from '../components/Icons';

interface ActionPanelProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  delay: number;
  x: string | number;
  y: string | number;
  width: string | number;
  height: string | number;
  activeColor?: string;
}

const ActionPanel = ({ title, icon, content, delay, x, y, width, height, activeColor = '#a08cff' }: ActionPanelProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const isActive = frame > delay + 30;

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y, width, height,
      transform: `scale(${scale}) translateY(${10 * (1 - entrance)}px)`,
      opacity
    }}>
      <div style={{ 
        width: '100%', height: '100%', 
        padding: '24px', 
        display: 'flex', flexDirection: 'column',
        backgroundColor: 'rgba(20, 20, 25, 0.7)',
        borderRadius: '16px',
        border: `1px solid rgba(255, 255, 255, 0.08)`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top Accent Line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
          backgroundColor: isActive ? activeColor : 'transparent',
          opacity: isActive ? 1 : 0,
          boxShadow: `0 0 10px ${activeColor}`
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeColor }}>{icon}</div>
          <div style={{ color: '#fff', fontSize: '16px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
            {title}
          </div>
        </div>
        <div style={{ 
          flex: 1, 
          fontFamily: 'SF Mono, monospace', 
          fontSize: '13px', 
          color: 'rgba(255,255,255,0.7)',
          overflow: 'hidden',
          lineHeight: 1.6
        }}>
          {content}
        </div>
      </div>
    </div>
  );
};

const PulseLine = ({ x, y, width, delay, activeColor }: { x: number, y: number, width: number, delay: number, activeColor: string }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 45], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const opacity = interpolate(frame - delay, [0, 10, 35, 45], [0, 1, 1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width, height: '2px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      overflow: 'hidden',
      opacity: frame > delay ? 1 : 0
    }}>
      <div style={{
        position: 'absolute', top: 0, left: `${progress * 100}%`,
        width: '40px', height: '100%',
        backgroundColor: activeColor,
        boxShadow: `0 0 10px ${activeColor}`,
        opacity
      }} />
    </div>
  );
};

export const Scene4_Panels = () => {
  const frame = useCurrentFrame();
  
  const textOpacity = interpolate(frame, [60, 90, 750, 780], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [780, 840], [1, 0], { extrapolateRight: 'clamp' });
  const containerScale = interpolate(frame, [0, 840], [1, 1.05]);

  const typingProgress = Math.max(0, Math.floor(interpolate(frame, [100, 300], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', opacity: fadeOut }}>
      <OrchestrationCanvas />

      <AbsoluteFill style={{ transform: `scale(${containerScale})`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '1600px', height: '800px', top: '80px' }}>
          {/* Pulses */}
          <PulseLine x={512} y={500} width={300} delay={180} activeColor="#f85149" /> {/* Critic -> Builder */}
          <PulseLine x={1248} y={350} width={200} delay={300} activeColor="#2ea043" /> {/* Builder -> Validator */}
          <PulseLine x={1248} y={600} width={200} delay={400} activeColor="#8b949e" /> {/* Validator -> Memory */}

          <ActionPanel 
            title="Planner" icon={<IconPlanner size={20} />} activeColor="#a08cff"
            content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ color: '#fff' }}>Define implementation path</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', paddingLeft: '12px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ color: '#a08cff' }}>1. Setup auth guard</div>
                  <div>2. Create API route</div>
                  <div>3. Bind to database</div>
                </div>
              </div>
            }
            delay={0} x="0%" y="0%" width="32%" height="48%"
          />
          <ActionPanel 
            title="Builder" icon={<IconBuilder size={20} />} activeColor="#00e6a8"
            content={
              <div>
                <div style={{ display: 'flex', gap: '8px', opacity: frame > 200 ? 1 : 0.5 }}>
                  <div style={{ width: '4px', height: '16px', backgroundColor: '#56d364', marginTop: '2px' }} />
                  <div>
                    <span style={{ color: '#56d364' }}>+ export const</span> authMiddleware = ...<br/>
                    <span style={{ color: '#56d364' }}>+ await</span> db.insert(...)
                  </div>
                </div>
                <br/>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>Generating patch{".".repeat((typingProgress / 10) % 4)}</span>
              </div>
            }
            delay={30} x="34%" y="0%" width="44%" height="60%"
          />
          <ActionPanel 
            title="Researcher" icon={<IconResearcher size={20} />} activeColor="#ffbd2e"
            content={
              <div>
                <div>Sources attached:</div>
                <div style={{ backgroundColor: 'rgba(88, 166, 255, 0.1)', padding: '6px', borderRadius: '4px', border: '1px solid rgba(88, 166, 255, 0.2)', color: '#58a6ff', marginTop: '8px' }}>[1] Next.js App Router Docs</div>
                <div style={{ backgroundColor: 'rgba(88, 166, 255, 0.1)', padding: '6px', borderRadius: '4px', border: '1px solid rgba(88, 166, 255, 0.2)', color: '#58a6ff', marginTop: '4px' }}>[2] Prisma Client Ref</div>
              </div>
            }
            delay={60} x="80%" y="0%" width="20%" height="48%"
          />
          <ActionPanel 
            title="Critic" icon={<IconCritic size={20} />} activeColor="#f85149"
            content={
              <div style={{ color: '#f85149' }}>
                <div style={{ padding: '8px', backgroundColor: 'rgba(248, 81, 73, 0.1)', border: '1px solid rgba(248, 81, 73, 0.3)', borderRadius: '4px' }}>
                  Risk: missing validation on input.<br/>
                  <span style={{ fontSize: '11px', opacity: 0.8 }}>Sending feedback to Builder...</span>
                </div>
              </div>
            }
            delay={90} x="0%" y="52%" width="32%" height="48%"
          />
          <ActionPanel 
            title="Validator" icon={<IconValidator size={20} />} activeColor="#2ea043"
            content={
              <div>
                <div>Tests running:</div>
                <div style={{ color: '#2ea043', marginTop: '8px' }}>✓ Auth routes (4/4)</div>
                <div style={{ color: '#2ea043', marginTop: '4px' }}>✓ DB Schema (12/12)</div>
                <div style={{ marginTop: '8px', fontWeight: 'bold' }}>All checks passed.</div>
              </div>
            }
            delay={120} x="34%" y="64%" width="44%" height="36%"
          />
          <ActionPanel 
            title="Memory" icon={<IconMemory size={20} />} activeColor="#8b949e"
            content={
              <div>
                <div>Workflow saved</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>Context indexed for future auth requests.</div>
              </div>
            }
            delay={150} x="80%" y="52%" width="20%" height="48%"
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: '80px', pointerEvents: 'none', zIndex: 10 }}>
        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <Headline style={{ fontSize: '72px', marginBottom: '16px' }}>Specialists working together.</Headline>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px', fontFamily: 'Inter, sans-serif' }}>
            Parallel thinking. Shared context. One decision.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

