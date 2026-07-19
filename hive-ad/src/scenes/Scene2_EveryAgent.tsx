import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { PremiumAgentCard } from '../components/PremiumAgentCard';
import { ConnectionLine } from '../components/ConnectionLine';
import { StatusRail } from '../components/StatusRail';

// SVG Icons
const Icons = {
  Planner: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  Builder: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  Critic: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Researcher: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  Validator: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  Memory: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75C20.25 20.653 16.556 22.5 12 22.5s-8.25-1.847-8.25-4.125v-3.75" /></svg>
};

export const Scene2_EveryAgent = () => {
  const frame = useCurrentFrame();

  // Timing: 0-480 (8 seconds)
  // Camera push
  const cameraZ = interpolate(frame, [0, 480], [0.95, 1.05], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [450, 480], [1, 0], { extrapolateRight: 'clamp' });

  // Center coordinate for the graph section
  const cx = 1150;
  const cy = 540;

  const layout = {
    Planner: { x: cx - 280, y: cy },
    Researcher: { x: cx - 280, y: cy + 180 },
    Builder: { x: cx, y: cy - 150 },
    Critic: { x: cx, y: cy + 150 },
    Validator: { x: cx + 280, y: cy },
    Memory: { x: cx + 520, y: cy }
  };

  const textOpacity = interpolate(frame, [252, 282], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0d0d0f' }}>
      <OrchestrationCanvas>
        
        <AbsoluteFill style={{ 
          transform: `scale(${cameraZ})`, 
          opacity: fadeOut,
          transformOrigin: `${cx}px ${cy}px`
        }}>
          
          {/* Connection Lines */}
          <ConnectionLine x1={layout.Researcher.x} y1={layout.Researcher.y} x2={layout.Planner.x} y2={layout.Planner.y} delay={100} active={frame > 156} />
          <ConnectionLine x1={layout.Planner.x} y1={layout.Planner.y} x2={layout.Builder.x} y2={layout.Builder.y} delay={156} active={frame > 180} />
          <ConnectionLine x1={layout.Planner.x} y1={layout.Planner.y} x2={layout.Critic.x} y2={layout.Critic.y} delay={166} active={frame > 190} />
          <ConnectionLine x1={layout.Builder.x} y1={layout.Builder.y} x2={layout.Validator.x} y2={layout.Validator.y} delay={176} active={frame > 200} />
          <ConnectionLine x1={layout.Critic.x} y1={layout.Critic.y} x2={layout.Validator.x} y2={layout.Validator.y} delay={186} active={frame > 210} />
          <ConnectionLine x1={layout.Validator.x} y1={layout.Validator.y} x2={layout.Memory.x} y2={layout.Memory.y} delay={196} active={frame > 220} />

          {/* Cards */}
          <PremiumAgentCard 
            name="Planner" role="Strategy" status="Thinking" 
            icon={Icons.Planner} delay={72}
            style={{ left: layout.Planner.x - 120, top: layout.Planner.y - 50 }} 
          />
          <PremiumAgentCard 
            name="Researcher" role="Evidence" status="Searching" 
            icon={Icons.Researcher} delay={82}
            style={{ left: layout.Researcher.x - 120, top: layout.Researcher.y - 50 }} 
          />
          <PremiumAgentCard 
            name="Builder" role="Implementation" status="Coding" 
            icon={Icons.Builder} delay={92}
            style={{ left: layout.Builder.x - 120, top: layout.Builder.y - 50 }} 
          />
          <PremiumAgentCard 
            name="Critic" role="Review" status="Challenging" 
            icon={Icons.Critic} delay={156}
            style={{ left: layout.Critic.x - 120, top: layout.Critic.y - 50 }} 
          />
          <PremiumAgentCard 
            name="Validator" role="QA" status="Testing" 
            icon={Icons.Validator} delay={166}
            style={{ left: layout.Validator.x - 120, top: layout.Validator.y - 50 }} 
          />
          <PremiumAgentCard 
            name="Memory" role="Knowledge" status="Saving" 
            icon={Icons.Memory} delay={176}
            style={{ left: layout.Memory.x - 120, top: layout.Memory.y - 50 }} 
          />

        </AbsoluteFill>

        {/* Cinematic Typography Layer */}
        <AbsoluteFill style={{ opacity: fadeOut }}>
          <div style={{
            position: 'absolute',
            left: '140px',
            top: '400px',
            width: '440px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            opacity: textOpacity
          }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: '84px', 
              fontWeight: 800, 
              lineHeight: 1, 
              letterSpacing: '-0.04em',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif'
            }}>
              Every agent.
            </h1>
            <p style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 500,
              color: '#8a8a9a',
              letterSpacing: '-0.01em',
              fontFamily: 'Inter, sans-serif'
            }}>
              Coordinated inside one workspace.
            </p>
            <p style={{
              marginTop: '40px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#555566',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif'
            }}>
              Planner / Builder / Researcher<br />Critic / Validator / Memory
            </p>
          </div>
        </AbsoluteFill>

        {/* Status Rail */}
        <StatusRail stages={["Planning", "Delegating", "Building", "Reviewing", "Validating", "Remembering"]} delay={348} />
      </OrchestrationCanvas>
    </AbsoluteFill>
  );
};
