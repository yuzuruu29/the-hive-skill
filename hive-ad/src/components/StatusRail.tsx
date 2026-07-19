import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const StatusRail = ({ 
  stages, delay = 0
}: { 
  stages: string[], delay?: number 
}) => {
  const frame = useCurrentFrame();
  const activeIndex = Math.floor(
    interpolate(frame - delay, [0, 120], [0, stages.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const entrance = interpolate(frame - delay, [0, 30], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      bottom: '60px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      transform: `translateY(${entrance}px)`,
      opacity
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: 'rgba(20, 20, 25, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 28px',
        borderRadius: '100px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        {stages.map((stage, i) => {
          const isActive = activeIndex === i;
          const isCompleted = i < activeIndex;
          
          let color = 'rgba(255, 255, 255, 0.2)'; // upcoming
          if (isActive) {
            color = 'rgba(255, 255, 255, 1)'; // active
          } else if (isCompleted) {
            color = 'rgba(255, 255, 255, 0.6)'; // completed
          }

          return (
            <React.Fragment key={stage}>
              <div style={{ 
                color: color,
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.02em',
                fontFamily: 'Inter, sans-serif'
              }}>
                {stage}
              </div>
              {i < stages.length - 1 && (
                <div style={{ color: '#333344', fontSize: '15px' }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
