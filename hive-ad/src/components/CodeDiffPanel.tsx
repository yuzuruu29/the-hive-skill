import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const CodeDiffPanel = ({
  lines,
  delay = 0,
  style = {}
}: {
  lines: { type: 'add' | 'remove' | 'context'; content: string }[];
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#0d0d0f',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: 'SF Mono, monospace',
      fontSize: '12px',
      lineHeight: '1.6',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      ...style
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        gap: '6px'
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <div style={{ marginLeft: '12px', color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>orchestrator.ts</div>
      </div>
      <div style={{ padding: '12px 0' }}>
        {lines.map((line, i) => {
          const appearProgress = interpolate(frame - delay - (i * 5), [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const isAdded = line.type === 'add';
          const isRemoved = line.type === 'remove';
          
          let bgColor = 'transparent';
          if (isAdded) bgColor = 'rgba(46, 160, 67, 0.15)';
          if (isRemoved) bgColor = 'rgba(248, 81, 73, 0.15)';

          let textColor = 'rgba(255, 255, 255, 0.7)';
          if (isAdded) textColor = '#56d364';
          if (isRemoved) textColor = '#f85149';

          const marker = isAdded ? '+' : isRemoved ? '-' : ' ';

          return (
            <div key={i} style={{
              display: 'flex',
              padding: '2px 16px',
              backgroundColor: bgColor,
              color: textColor,
              opacity: appearProgress,
              transform: `translateY(${10 * (1 - appearProgress)}px)`
            }}>
              <span style={{ width: '20px', userSelect: 'none', opacity: 0.5 }}>{marker}</span>
              <span style={{ whiteSpace: 'pre' }}>{line.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
