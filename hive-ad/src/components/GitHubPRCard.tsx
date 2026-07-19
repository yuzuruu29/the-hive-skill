import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const GitHubPRCard = ({
  title,
  author,
  filesChanged,
  additions,
  deletions,
  delay = 0,
  style = {}
}: {
  title: string;
  author: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div style={{
      width: '420px',
      padding: '24px',
      backgroundColor: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      transform: `scale(${scale}) translateY(${20 * (1 - entrance)}px)`,
      opacity,
      ...style
    }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ color: '#238636', marginTop: '2px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 019.75 0h4.5a.25.25 0 01.177.073l2.396 2.396A.25.25 0 0117 2.646V6h2a2 2 0 012 2v10a2 2 0 01-2 2h-1.646l-2.396 2.396a.25.25 0 01-.177.073h-4.5a.25.25 0 01-.177-.073L7.707 19.854A.25.25 0 017.53 19.677V18H5a2 2 0 01-2-2V8a2 2 0 012-2h2V2.646a.25.25 0 01.177-.177zM11.5 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#c9d1d9', fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>
            {title} <span style={{ color: '#8b949e', fontWeight: 400 }}>#143</span>
          </h3>
          <div style={{ color: '#8b949e', fontSize: '13px', marginTop: '8px' }}>
            <strong style={{ color: '#c9d1d9' }}>{author}</strong> wants to merge into <code style={{ backgroundColor: 'rgba(110,118,129,0.4)', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>main</code>
          </div>
        </div>
      </div>
      <div style={{ 
        marginTop: '20px', 
        paddingTop: '16px', 
        borderTop: '1px solid #30363d',
        display: 'flex',
        gap: '24px',
        color: '#8b949e',
        fontSize: '13px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#c9d1d9', fontWeight: 600 }}>{filesChanged}</span> files changed
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#2ea043', fontWeight: 600 }}>+{additions}</span> additions
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#f85149', fontWeight: 600 }}>-{deletions}</span> deletions
        </div>
      </div>
    </div>
  );
};
