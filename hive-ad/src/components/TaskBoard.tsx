import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const TaskBoard = ({
  tasks,
  delay = 0,
  style = {}
}: {
  tasks: { title: string; status: 'todo' | 'in-progress' | 'done' }[];
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '300px',
      ...style
    }}>
      {tasks.map((task, i) => {
        const appearProgress = interpolate(frame - delay - (i * 10), [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        
        let bgColor = 'rgba(20, 20, 25, 0.6)';
        let borderColor = 'rgba(255, 255, 255, 0.08)';
        let indicatorColor = 'rgba(255, 255, 255, 0.2)';

        if (task.status === 'in-progress') {
          bgColor = 'rgba(160, 140, 255, 0.1)';
          borderColor = 'rgba(160, 140, 255, 0.4)';
          indicatorColor = '#a08cff';
        } else if (task.status === 'done') {
          borderColor = 'rgba(0, 230, 168, 0.3)';
          indicatorColor = '#00e6a8';
        }

        return (
          <div key={i} style={{
            padding: '12px 16px',
            backgroundColor: bgColor,
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: appearProgress,
            transform: `translateX(${15 * (1 - appearProgress)}px)`
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: indicatorColor }} />
            <span style={{ 
              color: task.status === 'done' ? 'rgba(255,255,255,0.5)' : '#fff',
              textDecoration: task.status === 'done' ? 'line-through' : 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500
            }}>
              {task.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};
