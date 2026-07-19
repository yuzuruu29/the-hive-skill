import React from 'react';

export const Headline = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => {
  return (
    <h1 style={{
      fontSize: '120px',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      color: '#ffffff',
      margin: 0,
      textShadow: '0 10px 30px rgba(0,0,0,0.5)',
      ...style
    }}>
      {children}
    </h1>
  );
};

export const Subheadline = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => {
  return (
    <h2 style={{
      fontSize: '60px',
      fontWeight: 500,
      letterSpacing: '-0.02em',
      color: '#a0a0a5',
      margin: 0,
      ...style
    }}>
      {children}
    </h2>
  );
};

export const GradientText = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => {
  return (
    <span style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      ...style
    }}>
      {children}
    </span>
  );
}
