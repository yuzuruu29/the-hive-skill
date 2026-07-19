import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { Headline } from '../components/Typography';
import { TaskBoard } from '../components/TaskBoard';
import { CodeDiffPanel } from '../components/CodeDiffPanel';
import { GitHubPRCard } from '../components/GitHubPRCard';

const ProductionTimeline = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yOffset = interpolate(frame, [50, 80], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stages = [
    { label: 'Idea', start: 0, end: 60, color: '#8b949e' },
    { label: 'Plan', start: 60, end: 120, color: '#a08cff' },
    { label: 'Patch', start: 120, end: 200, color: '#00e6a8' },
    { label: 'Review', start: 200, end: 300, color: '#f85149' },
    { label: 'Test', start: 300, end: 400, color: '#56d364' },
    { label: 'Approve', start: 400, end: 460, color: '#a08cff' },
    { label: 'Push', start: 460, end: 500, color: '#58a6ff' },
    { label: 'PR', start: 500, end: 840, color: '#56d364' }
  ];

  const currentStageIndex = stages.findIndex(s => frame >= s.start && frame < s.end);
  const safeIndex = currentStageIndex === -1 ? stages.length - 1 : currentStageIndex;

  return (
    <div style={{
      position: 'absolute',
      bottom: 40,
      left: '50%',
      transform: `translateX(-50%) translateY(${yOffset}px)`,
      opacity,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 24px',
      backgroundColor: 'rgba(20, 20, 25, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '100px',
      backdropFilter: 'blur(20px)',
      fontFamily: 'SF Mono, monospace',
      fontSize: '12px'
    }}>
      {stages.map((stage, idx) => {
        const isPast = idx < safeIndex;
        const isCurrent = idx === safeIndex;
        
        // Motion state flash
        const flashOpacity = isCurrent ? Math.abs(Math.sin((frame - stage.start) / 10)) * 0.5 + 0.5 : 0;
        
        return (
          <React.Fragment key={stage.label}>
            <div style={{
              color: isPast ? 'rgba(255,255,255,0.6)' : isCurrent ? stage.color : 'rgba(255,255,255,0.3)',
              textShadow: isCurrent ? `0 0 10px ${stage.color}` : 'none',
              opacity: isCurrent ? flashOpacity : 1,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {isCurrent && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: stage.color, boxShadow: `0 0 10px ${stage.color}` }} />}
              {stage.label}
            </div>
            {idx < stages.length - 1 && (
              <div style={{
                width: '24px',
                height: '1px',
                backgroundColor: isPast ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const Scene5_Execution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const textFadeOut = interpolate(frame, [780, 810], [1, 0], { extrapolateRight: 'clamp' });
  const sceneFadeOut = interpolate(frame, [810, 840], [1, 0], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 840], [1.15, 1]);
  const xOffset = interpolate(frame, [0, 840], [100, -100]);

  // Code diff lines
  const codeLines: { type: 'add' | 'remove' | 'context'; content: string }[] = [
    { type: 'context', content: ' export class HiveOrchestrator {' },
    { type: 'remove', content: '   async processTask(task: Task) {' },
    { type: 'remove', content: '     const agent = this.router.getAgent();' },
    { type: 'add', content: '   async processTask(task: Task, context: Context) {' },
    { type: 'add', content: '     const agent = await this.router.selectBest(task);' },
    { type: 'add', content: '     await this.safety.validate(agent, task);' },
    { type: 'context', content: '     return agent.execute(task);' },
    { type: 'context', content: '   }' },
  ];

  // Task board status logic
  const getTasks = () => {
    return [
      { title: 'Idea: Safe Routing', status: 'done' as const },
      { title: 'Plan implementation', status: frame > 60 ? 'done' as const : 'in-progress' as const },
      { title: 'Write code patch', status: frame > 200 ? 'done' as const : frame > 60 ? 'in-progress' as const : 'todo' as const },
      { title: 'Run tests & lint', status: frame > 350 ? 'done' as const : frame > 200 ? 'in-progress' as const : 'todo' as const },
      { title: 'Create Pull Request', status: frame > 500 ? 'done' as const : frame > 350 ? 'in-progress' as const : 'todo' as const }
    ];
  };

  // Explicit approval check animation
  const checkEntrance = spring({ frame: frame - 400, fps, config: { damping: 14 } });
  const checkScale = interpolate(checkEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', opacity: sceneFadeOut }}>
      <OrchestrationCanvas />

      <AbsoluteFill style={{ transform: `scale(${scale}) translateX(${xOffset}px)` }}>
        <div style={{ position: 'absolute', top: 220, left: 150 }}>
          <TaskBoard tasks={getTasks()} delay={20} />
        </div>

        <div style={{ position: 'absolute', top: 200, left: 550, width: '600px' }}>
          <CodeDiffPanel lines={codeLines} delay={100} />
          
          {frame > 300 && (
            <div style={{
              marginTop: '24px', padding: '16px',
              backgroundColor: 'rgba(46, 160, 67, 0.1)',
              border: '1px solid rgba(46, 160, 67, 0.4)',
              borderRadius: '8px',
              color: '#56d364', fontFamily: 'Inter, sans-serif', fontSize: '14px',
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: interpolate(frame, [300, 330], [0, 1])
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#56d364', boxShadow: '0 0 10px #56d364' }} />
              Integration tests passed (24/24)
            </div>
          )}
          
          {frame > 400 && (
            <div style={{
              marginTop: '16px', padding: '16px',
              backgroundColor: 'rgba(160, 140, 255, 0.1)',
              border: '1px solid rgba(160, 140, 255, 0.4)',
              borderRadius: '8px',
              color: '#a08cff', fontFamily: 'Inter, sans-serif', fontSize: '14px',
              display: 'flex', alignItems: 'center', gap: '12px',
              transform: `scale(${checkScale})`,
              transformOrigin: 'left center'
            }}>
              <input type="checkbox" readOnly checked style={{ accentColor: '#a08cff', width: '16px', height: '16px' }} />
              Explicit human approval granted
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', top: 280, left: 1250 }}>
          {frame > 460 && (
            <GitHubPRCard 
              title="feat: implement safe agent routing"
              author="hive-builder-agent"
              filesChanged={3} additions={42} deletions={15}
              delay={460}
            />
          )}
        </div>
      </AbsoluteFill>

      <ProductionTimeline />

      <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: '80px', opacity: textFadeOut }}>
        <div style={{ textAlign: 'center' }}>
          <Headline style={{ fontSize: '72px', marginBottom: '16px' }}>
            From idea to production.
          </Headline>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px', fontFamily: 'Inter, sans-serif' }}>
            Plan, build, validate, and ship with explicit control.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
