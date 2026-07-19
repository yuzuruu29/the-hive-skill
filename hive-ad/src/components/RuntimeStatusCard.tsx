import React from 'react';

export const RuntimeStatusCard = ({
  modelName,
  provider,
  isLocal,
  latency,
  capabilities,
  status = 'idle',
  active = false,
  style = {}
}: {
  modelName: string;
  provider: string;
  isLocal: boolean;
  latency: string;
  capabilities: string[];
  status?: 'idle' | 'routing' | 'processing' | 'done';
  active?: boolean;
  style?: React.CSSProperties;
}) => {
  const getStatusColor = () => {
    switch(status) {
      case 'processing': return '#00e6a8';
      case 'routing': return '#a08cff';
      case 'done': return '#ffffff';
      default: return 'rgba(255,255,255,0.2)';
    }
  };

  const statusColor = getStatusColor();

  return (
    <div style={{
      width: '320px',
      padding: '16px',
      backgroundColor: active ? 'rgba(30, 25, 40, 0.8)' : 'rgba(20, 20, 25, 0.5)',
      borderRadius: '12px',
      border: `1px solid ${active ? 'rgba(160, 140, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
      backdropFilter: 'blur(10px)',
      boxShadow: active ? '0 8px 32px rgba(160, 140, 255, 0.15)' : '0 4px 16px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transform: active ? 'translateY(-2px)' : 'none',
      ...style
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: statusColor,
            boxShadow: `0 0 8px ${statusColor}`
          }} />
          <span style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 600, 
            fontSize: '15px', 
            color: '#fff',
            letterSpacing: '-0.01em'
          }}>
            {modelName}
          </span>
        </div>
        <span style={{
          fontFamily: 'SF Pro Text, Inter, sans-serif',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {latency}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: isLocal ? 'rgba(0, 230, 168, 0.1)' : 'rgba(160, 140, 255, 0.1)',
            color: isLocal ? '#00e6a8' : '#a08cff',
            fontSize: '10px',
            fontFamily: 'SF Mono, monospace',
            fontWeight: 500
          }}>
            {isLocal ? 'LOCAL' : 'CLOUD'}
          </span>
          <span style={{
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif'
          }}>
            {provider}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
        {capabilities.map(cap => (
          <div key={cap} style={{
            padding: '4px 8px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Inter, sans-serif'
          }}>
            {cap}
          </div>
        ))}
      </div>
    </div>
  );
};
