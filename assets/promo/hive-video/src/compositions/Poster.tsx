import {AbsoluteFill} from "remotion";
import {FrameShell} from "../components/FrameShell";
import {EvidenceBadge} from "../components/EvidenceBadge";
import {HiveMark} from "../scenes/HiveReveal";
import {fonts, palette} from "../styles/theme";

export const Poster = ({compact = false}: {compact?: boolean}) => (
  <FrameShell variant="master">
    <AbsoluteFill style={{padding: compact ? "120px 92px 120px" : "105px 105px 110px", display: "grid", gridTemplateColumns: "1fr .82fr", gap: 70, alignItems: "center"}}>
      <div>
        <div style={{fontFamily: fonts.mono, color: palette.amber, fontSize: 23, letterSpacing: 2.6, textTransform: "uppercase"}}>One Queen. Specialized agents.</div>
        <div style={{fontSize: compact ? 118 : 142, lineHeight: .9, fontWeight: 900, letterSpacing: -9, marginTop: 24}}>VERIFIED<br />ENGINEERING.</div>
        <div style={{fontSize: compact ? 31 : 36, color: palette.muted, lineHeight: 1.35, marginTop: 32, maxWidth: 860}}>HIVE coordinates planning, building, testing, reviewing, and fixing—then preserves the evidence.</div>
        <div style={{display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32}}>
          <EvidenceBadge text="HIVE TypeScript check passed" />
          <EvidenceBadge text="165 Pledgr tests passed" />
          <EvidenceBadge text="40 TraderBot tests passed" />
        </div>
      </div>
      <div style={{display: "grid", justifyItems: "center"}}>
        <HiveMark size={compact ? 300 : 355} />
        <div style={{fontSize: compact ? 112 : 134, lineHeight: .9, fontWeight: 900, letterSpacing: -8, marginTop: 24}}>HIVE</div>
        <div style={{fontFamily: fonts.mono, color: palette.gold, fontSize: compact ? 18 : 24, marginTop: 24, whiteSpace: "nowrap"}}>github.com/yuzuruu29/the-hive-skill</div>
      </div>
    </AbsoluteFill>
  </FrameShell>
);
