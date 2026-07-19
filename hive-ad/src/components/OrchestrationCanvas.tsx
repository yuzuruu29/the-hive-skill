import React from 'react';
import { AbsoluteFill } from 'remotion';

export const OrchestrationCanvas = ({ children }: { children?: React.ReactNode }) => {
  return (
    <AbsoluteFill style={{
      backgroundColor: '#0d0d0f',
      background: 'radial-gradient(circle at center, #1a1525 0%, #0d0d0f 100%)',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
        opacity: 0.4
      }} />
      {children}
    </AbsoluteFill>
  );
};
