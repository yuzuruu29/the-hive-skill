import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const PremiumAgentCard = ({ 
  name, 
  role,
  status,
  icon, 
  delay = 0,
  style 
}: { 
  name: string, 
  role: string,
  status: string,
  icon: React.ReactNode, 
  delay?: number,
  style?: React.CSSProperties 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  const y = interpolate(entrance, [0, 1], [30, 0]);
  const opacity = interpolate(entrance, [0.5, 1], [0, 1], { extrapolateLeft: 'clamp' });
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);
  
  // Pulse animation for status dot
  const pulseOpacity = interpolate(
    Math.sin((frame - delay) / 10),
    [-1, 1],
    [0.3, 1]
  );

  return (
    <div style={{
      transform: `translateY(${y}px) scale(${scale})`,
      opacity,
      position: 'absolute',
      width: '240px',
      backgroundColor: 'rgba(22, 22, 26, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '14px',
      padding: '16px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      ...style
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '36px', height: '36px', 
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: '#d0d0e0'
        }}>
          {icon}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif' }}>{name}</div>
          <div style={{ color: '#8a8a9a', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{role}</div>
        </div>
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: '#00d2ff',
          opacity: pulseOpacity,
          boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)'
        }} />
        <div style={{ color: '#a0a0b0', fontSize: '12px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{status}</div>
      </div>
    </div>
  );
};
