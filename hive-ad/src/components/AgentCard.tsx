import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { GlassPanel } from './GlassPanel';

export const AgentCard = ({ 
  name, 
  icon, 
  delay = 0,
  style 
}: { 
  name: string, 
  icon: React.ReactNode, 
  delay?: number,
  style?: React.CSSProperties 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  const y = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0.5, 1], [0, 1], { extrapolateLeft: 'clamp' });
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);

  return (
    <div style={{
      transform: `translateY(${y}px) scale(${scale})`,
      opacity,
      position: 'absolute',
      ...style
    }}>
      <GlassPanel style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', minWidth: '180px' }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%', 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontSize: '30px', color: '#00ccff',
          boxShadow: '0 0 20px rgba(0, 204, 255, 0.2)'
        }}>
          {icon}
        </div>
        <div style={{ color: '#fff', fontSize: '24px', fontWeight: 600, letterSpacing: '-0.02em' }}>
          {name}
        </div>
      </GlassPanel>
    </div>
  );
};
