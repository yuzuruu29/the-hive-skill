import {Img, staticFile, useCurrentFrame} from "remotion";
import {EvidenceBadge} from "../components/EvidenceBadge";
import {TerminalWindow} from "../components/TerminalWindow";
import {projectProofs} from "../data/projects";
import {enter, sceneOpacity} from "../styles/motion";
import {fonts, palette} from "../styles/theme";
import type {PromoVariant} from "../types";

export const ProjectProof = ({variant, duration}: {variant: PromoVariant; duration: number}) => {
  const frame = useCurrentFrame();
  const isVertical = variant === "vertical";
  const thresholds = variant === "master" ? [0, 170, 300, duration] : variant === "vertical" ? [0, 132, 213, duration] : [0, 90, 150, duration];
  const index = frame < thresholds[1] ? 0 : frame < thresholds[2] ? 1 : 2;
  const project = projectProofs[index];
  const local = frame - thresholds[index];
  const segment = thresholds[index + 1] - thresholds[index];
  const reveal = enter(local, 0, 18);
  const exit = enter(local, segment - 14, 12);
  const cardOpacity = reveal * (1 - exit);
  const cameraPush = Math.min(1, local / Math.max(1, segment));
  const mediaHeight = isVertical ? 700 : variant === "square" ? 430 : 610;
  return (
    <div style={{position: "absolute", inset: 0, opacity: sceneOpacity(frame, duration), padding: isVertical ? "155px 72px 270px" : variant === "square" ? "125px 70px 145px" : "105px 92px 125px"}}>
      <div style={{fontFamily: fonts.mono, color: palette.amber, fontSize: isVertical ? 24 : 21, letterSpacing: 2.3, textTransform: "uppercase"}}>Applying the verified workflow to real project evidence</div>
      <div
        style={{
          marginTop: isVertical ? 32 : 24,
          display: "grid",
          gridTemplateColumns: isVertical || variant === "square" ? "1fr" : "minmax(0,1.15fr) minmax(440px,.85fr)",
          gap: isVertical ? 34 : 40,
          opacity: cardOpacity,
          transform: `translateY(${(1 - reveal) * 34 - exit * 16}px)`,
        }}
      >
        <div style={{height: mediaHeight, borderRadius: 28, overflow: "hidden", border: `1px solid ${project.accent}66`, background: "rgba(8,9,13,.92)", boxShadow: `0 30px 100px rgba(0,0,0,.38), 0 0 42px ${project.accent}18`, position: "relative", transform: `perspective(1400px) rotateY(${variant === "master" ? (1-cameraPush) * -2.5 : 0}deg)`}}>
          {project.capture ? (
            <Img src={staticFile(project.capture)} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", background: project.name === "Pledgr" ? "#ECF7F1" : palette.void, transform: `scale(${1 + cameraPush * .08})`}} />
          ) : (
            <div style={{padding: isVertical ? 28 : 42, height: "100%", display: "grid", alignContent: "center"}}>
              <TerminalWindow
                compact={variant !== "master"}
                title="C:\\TraderBot\\validation.log"
                rows={[
                  {prefix: "SPOT", text: "4 passed", tone: "success"},
                  {prefix: "FUT", text: "14 passed", tone: "success"},
                  {prefix: "MT5", text: "18 passed", tone: "success"},
                  {prefix: "POLY", text: "4 passed", tone: "success"},
                  {prefix: "SAFE", text: "live trading disabled by default", tone: "warning"},
                ]}
              />
            </div>
          )}
          <div style={{position: "absolute", left: 18, bottom: 16, padding: "8px 12px", borderRadius: 10, background: "rgba(8,9,13,.84)", color: palette.muted, fontFamily: fonts.mono, fontSize: isVertical ? 18 : 16}}>
            {project.captureLabel ?? "Repository validation output"}
          </div>
        </div>
        <div style={{alignSelf: "center"}}>
          <div style={{fontFamily: fonts.mono, color: project.accent, fontSize: isVertical ? 26 : variant === "square" ? 24 : 24, textTransform: "uppercase", letterSpacing: 2}}>{project.eyebrow}</div>
          <div style={{fontSize: isVertical ? 76 : variant === "square" ? 62 : 78, lineHeight: 1, fontWeight: 850, marginTop: 14}}>{project.name}</div>
          <div style={{fontSize: isVertical ? 34 : variant === "square" ? 29 : 34, lineHeight: 1.3, color: palette.muted, marginTop: 20}}>{project.description}</div>
          <div style={{display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28}}>{project.proofs.map((proof) => <EvidenceBadge key={proof} text={proof} compact={variant !== "master"} tone={proof.toLowerCase().includes("limit") ? "warning" : "success"} />)}</div>
          <div style={{marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10, color: palette.white, fontFamily: fonts.mono, fontSize: isVertical ? 20 : 18}}>
            <span style={{color: project.name === "HIVE" ? palette.amber : palette.success}}>●</span>
            {project.name === "HIVE" ? "Evidence verified; latest test limit disclosed" : "Verified from repository evidence"}
          </div>
        </div>
      </div>
      <div style={{position: "absolute", right: isVertical ? 72 : 92, bottom: isVertical ? 290 : 145, fontFamily: fonts.mono, color: palette.dim, fontSize: 18}}>0{index + 1} / 03</div>
    </div>
  );
};
