import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from 'remotion';

export const ParticleBackground = ({ seed = 1 }: { seed?: number }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Create 40 subtle particles
  const particles = new Array(40).fill(0).map((_, i) => {
    const xBase = random(`${seed}-x-${i}`) * width;
    const yBase = random(`${seed}-y-${i}`) * height;
    const size = random(`${seed}-size-${i}`) * 4 + 2;
    const speedX = (random(`${seed}-sx-${i}`) - 0.5) * 2;
    const speedY = (random(`${seed}-sy-${i}`) - 0.5) * 2;
    
    // Slow drift
    const x = xBase + frame * speedX;
    const y = yBase + frame * speedY;
    
    // Subtle twinkling
    const opacityBase = random(`${seed}-op-${i}`) * 0.4 + 0.1;
    const twinkle = Math.sin(frame * 0.05 + random(`${seed}-twinkle-${i}`) * 10) * 0.2;
    const opacity = opacityBase + twinkle;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#fff',
          opacity,
          boxShadow: `0 0 ${size * 2}px #fff`,
          filter: 'blur(1px)'
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#050505',
      background: 'radial-gradient(circle at 50% 50%, #0a0a0d 0%, #030303 100%)',
      overflow: 'hidden'
    }}>
      {particles}
      
      {/* Soft ambient lighting */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '30%', width: '40%', height: '40%',
        background: 'radial-gradient(circle, rgba(138, 43, 226, 0.03) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(100px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '20%', width: '50%', height: '50%',
        background: 'radial-gradient(circle, rgba(0, 204, 255, 0.02) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(120px)',
      }} />
    </AbsoluteFill>
  );
};
