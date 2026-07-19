import React from 'react';

export const GlassPanel = ({ 
  children, 
  style, 
  className = "" 
}: { 
  children: React.ReactNode, 
  style?: React.CSSProperties,
  className?: string
}) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'rgba(20, 20, 22, 0.6)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        padding: '40px',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
};
