import { useCurrentFrame, interpolate } from 'remotion';

export const GraphEdge = ({ 
  x1, y1, x2, y2, 
  delay = 0,
  duration = 30
}: { 
  x1: number, y1: number, x2: number, y2: number,
  delay?: number,
  duration?: number
}) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(frame - delay, [0, duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  return (
    <div style={{
      position: 'absolute',
      left: x1,
      top: y1,
      width: length,
      height: 2,
      background: 'linear-gradient(90deg, rgba(0, 204, 255, 0.5), rgba(163, 51, 255, 0.5))',
      transformOrigin: '0 50%',
      transform: `rotate(${angle}deg) scaleX(${progress})`,
      opacity: progress,
      boxShadow: '0 0 10px rgba(0, 204, 255, 0.4)'
    }} />
  );
};
