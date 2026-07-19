import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Headline } from '../components/Typography';
import { OrchestrationCanvas } from '../components/OrchestrationCanvas';
import { CodeDiffPanel } from '../components/CodeDiffPanel';
import { TaskBoard } from '../components/TaskBoard';
import { GitHubPRCard } from '../components/GitHubPRCard';
import { RuntimeStatusCard } from '../components/RuntimeStatusCard';

const FlashText = ({ text, delay, duration }: { text: string, delay: number, duration: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(frame, [delay, delay + 15, delay + duration - 15, delay + duration], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity, zIndex: 20 }}>
      <div style={{ backgroundColor: 'rgba(5, 5, 5, 0.8)', padding: '40px 80px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(30px)', transform: `scale(${scale})` }}>
        <Headline style={{ fontSize: '100px', margin: 0 }}>{text}</Headline>
      </div>
    </AbsoluteFill>
  );
};

export const Scene7_Montage = () => {
  const frame = useCurrentFrame();
  
  const fadeOut = interpolate(frame, [600, 660], [1, 0], { extrapolateRight: 'clamp' });

  // 11 seconds = 660 frames
  // 8 shots = ~82 frames per shot

  const isActive = (start: number, end: number) => frame >= start && frame < end;
  
  const getScale = (start: number, end: number, from: number, to: number) => {
    return interpolate(frame, [start, end], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', opacity: fadeOut }}>
      <OrchestrationCanvas />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', transform: 'scale(1.15)' }}>
        
        {/* 1. Coding + Diff */}
        {isActive(0, 80) && (
          <CodeDiffPanel 
            lines={[
              { type: 'remove', content: 'const agent = new Agent();' },
              { type: 'add', content: 'const council = new HiveCouncil();' },
              { type: 'add', content: 'await council.debate(task);' }
            ]}
            delay={0}
            style={{ width: '800px', transform: `scale(${getScale(0, 80, 1, 1.05)})` }}
          />
        )}

        {/* 2. Research + Citations */}
        {isActive(80, 160) && (
          <div style={{ padding: '32px', backgroundColor: 'rgba(20, 20, 25, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', width: '700px', transform: `scale(${getScale(80, 160, 1.05, 1)})` }}>
            <div style={{ color: '#ffbd2e', fontWeight: 'bold', marginBottom: '16px', fontSize: '18px', fontFamily: 'SF Mono, monospace' }}>SEARCH RESULTS</div>
            <div style={{ backgroundColor: 'rgba(88, 166, 255, 0.1)', borderLeft: '4px solid #58a6ff', padding: '16px', marginBottom: '16px', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
              "The latest Remotion docs recommend using useVideoConfig for dynamic layouts..."
              <div style={{ marginTop: '8px', color: '#58a6ff', fontSize: '12px' }}>Citation: Remotion Official Docs (2026)</div>
            </div>
            <div style={{ backgroundColor: 'rgba(88, 166, 255, 0.1)', borderLeft: '4px solid #58a6ff', padding: '16px', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
              "Avoid generic particles; use product UI fragments."
              <div style={{ marginTop: '8px', color: '#58a6ff', fontSize: '12px' }}>Citation: Internal Design Guidelines</div>
            </div>
          </div>
        )}

        {/* 3. Council Transcript */}
        {isActive(160, 240) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '800px', transform: `scale(${getScale(160, 240, 1, 1.05)})` }}>
            <div style={{ padding: '24px', backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid rgba(160, 140, 255, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '20px', fontFamily: 'Inter, sans-serif', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#a08cff', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>RESEARCHER</div>
              I found 3 edge cases in the current routing logic.
            </div>
            <div style={{ padding: '24px', backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid rgba(0, 230, 168, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '20px', fontFamily: 'Inter, sans-serif', alignSelf: 'flex-end', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#00e6a8', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>BUILDER</div>
              Updating the patch to cover those cases now.
            </div>
          </div>
        )}

        {/* 4. Runtime Monitor */}
        {isActive(240, 320) && (
          <div style={{ display: 'flex', gap: '24px', transform: `scale(${getScale(240, 320, 1.05, 1)})` }}>
            <RuntimeStatusCard modelName="Llama 3 Local" provider="Ollama" isLocal={true} latency="15ms" capabilities={['Fast Exec']} status="processing" active={true} />
            <RuntimeStatusCard modelName="Mistral 7B" provider="Ollama" isLocal={true} latency="12ms" capabilities={['Review']} status="processing" active={true} />
            <RuntimeStatusCard modelName="Claude 3.5" provider="Anthropic" isLocal={false} latency="850ms" capabilities={['Reasoning']} status="processing" active={true} />
          </div>
        )}

        {/* 5. Task Board */}
        {isActive(320, 400) && (
          <div style={{ transform: `scale(${getScale(320, 400, 1, 1.05)})` }}>
            <TaskBoard 
              tasks={[
                { title: 'Analyze market data', status: 'done' },
                { title: 'Compile research report', status: 'in-progress' },
                { title: 'Format citations', status: 'todo' },
                { title: 'Final review', status: 'todo' }
              ]}
              delay={320}
              style={{ width: '600px' }}
            />
          </div>
        )}

        {/* 6. Memory Retrieval */}
        {isActive(400, 480) && (
          <div style={{ padding: '32px', backgroundColor: 'rgba(20, 20, 25, 0.9)', border: '1px solid rgba(160, 140, 255, 0.4)', borderRadius: '16px', width: '700px', transform: `scale(${getScale(400, 480, 1.05, 1)})` }}>
            <div style={{ color: '#a08cff', fontWeight: 'bold', marginBottom: '16px', fontSize: '18px', fontFamily: 'SF Mono, monospace' }}>MEMORY RETRIEVAL</div>
            <div style={{ color: '#fff', fontSize: '20px', fontFamily: 'Inter, sans-serif', marginBottom: '12px' }}>Matched Context: "Authentication Routing v2"</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
              Previous successful workflow applied. Skipped 4 redundant steps by reusing validated logic.
            </div>
          </div>
        )}

        {/* 7. Validation Checks */}
        {isActive(480, 560) && (
          <div style={{ padding: '32px', backgroundColor: 'rgba(20, 20, 25, 0.9)', border: '1px solid rgba(46, 160, 67, 0.4)', borderRadius: '16px', width: '600px', transform: `scale(${getScale(480, 560, 1, 1.05)})` }}>
            <div style={{ color: '#56d364', fontWeight: 'bold', marginBottom: '24px', fontSize: '18px', fontFamily: 'SF Mono, monospace', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#56d364', borderRadius: '50%', boxShadow: '0 0 10px #56d364' }} />
              VALIDATION SUITE
            </div>
            <div style={{ color: '#fff', fontSize: '16px', fontFamily: 'SF Mono, monospace', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>✓ Routing tests</span><span style={{ color: '#56d364' }}>PASS</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>✓ Memory indexing</span><span style={{ color: '#56d364' }}>PASS</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>✓ Agent consensus</span><span style={{ color: '#56d364' }}>PASS</span></div>
            </div>
          </div>
        )}

        {/* 8. PR Card */}
        {isActive(560, 660) && (
          <div style={{ transform: `scale(${getScale(560, 660, 1.05, 1.15)})` }}>
            <GitHubPRCard 
              title="chore: update API schemas and tests"
              author="hive-council"
              filesChanged={8} additions={124} deletions={42}
              delay={560}
            />
          </div>
        )}

      </AbsoluteFill>

      {/* Rhythmic Typography */}
      <FlashText text="Build faster." delay={40} duration={140} />
      <FlashText text="Think together." delay={240} duration={140} />
      <FlashText text="Ship confidently." delay={480} duration={180} />

    </AbsoluteFill>
  );
};
