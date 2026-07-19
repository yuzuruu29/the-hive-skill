import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const HiveLogo = ({ size = 200, style }: { size?: number, style?: React.CSSProperties }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, mass: 1.5 } });
  
  // Hexagon points
  const points = "50,5 95,25 95,75 50,95 5,75 5,25";
  
  const strokeDashoffset = interpolate(entrance, [0, 1], [300, 0]);
  const fillOpacity = interpolate(entrance, [0.5, 1], [0, 1], { extrapolateLeft: 'clamp' });
  const glowOpacity = interpolate(entrance, [0.8, 1], [0, 0.5], { extrapolateLeft: 'clamp' });

  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '10%', width: '80%', height: '80%',
        backgroundColor: '#00ccff',
        filter: 'blur(40px)',
        opacity: glowOpacity,
        borderRadius: '50%'
      }} />
      
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
        <polygon 
          points={points}
          fill="rgba(20, 20, 25, 0.8)"
          stroke="#00ccff"
          strokeWidth="2"
          strokeDasharray="300"
          strokeDashoffset={strokeDashoffset}
          style={{ opacity: fillOpacity }}
        />
        {/* Inner detail - perhaps a smaller hex or lines */}
        <polygon 
          points="50,25 75,40 75,60 50,75 25,60 25,40"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1.5"
          strokeDasharray="150"
          strokeDashoffset={interpolate(entrance, [0.2, 1], [150, 0], { extrapolateLeft: 'clamp' })}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ccff" />
            <stop offset="100%" stopColor="#a333ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
