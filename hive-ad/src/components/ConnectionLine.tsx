import { useCurrentFrame, interpolate } from 'remotion';

export const ConnectionLine = ({ 
  x1, y1, x2, y2, 
  delay = 0,
  active = false
}: { 
  x1: number, y1: number, x2: number, y2: number, 
  delay?: number,
  active?: boolean
}) => {
  const frame = useCurrentFrame();
  
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
  const drawProgress = interpolate(frame - delay, [0, 30], [length, 0], { 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp' 
  });
  
  const numPulses = 4;
  const pulseLoopDuration = 120;
  
  const getPointAtProgress = (prog: number) => {
    return {
      x: x1 + (x2 - x1) * prog,
      y: y1 + (y2 - y1) * prog,
    };
  };

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
      <line 
        x1={x1} y1={y1} x2={x2} y2={y2} 
        stroke={active ? "rgba(160, 140, 255, 0.4)" : "rgba(255, 255, 255, 0.08)"} 
        strokeWidth="2" 
        strokeDasharray={length}
        strokeDashoffset={drawProgress}
      />
      
      {active && Array.from({ length: numPulses }).map((_, i) => {
        const pulseOffset = i * (pulseLoopDuration / numPulses);
        const rawPulseFrame = (frame - delay - pulseOffset);
        const activePulseFrame = rawPulseFrame > 0 ? (rawPulseFrame % pulseLoopDuration) : -1;
        
        if (activePulseFrame < 0 || activePulseFrame > 45) return null;
        
        const currentPulseProgress = interpolate(activePulseFrame, [0, 45], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        });
        
        if (currentPulseProgress <= 0 || currentPulseProgress >= 1) return null;
        
        const pt = getPointAtProgress(currentPulseProgress);
        
        const pulseOpacity = interpolate(activePulseFrame, [0, 10, 35, 45], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
        });

        return (
          <circle 
            key={i}
            cx={pt.x} 
            cy={pt.y} 
            r="4" 
            fill="#00e6a8" 
            style={{ opacity: pulseOpacity, filter: 'drop-shadow(0 0 8px rgba(0,230,168,0.8))' }} 
          />
        );
      })}
    </svg>
  );
};
