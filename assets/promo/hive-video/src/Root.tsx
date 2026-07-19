import {Composition, Folder, Still} from "remotion";
import {HivePromo} from "./compositions/HivePromo";
import {Poster} from "./compositions/Poster";
import type {PromoProps} from "./types";

const base = {
  repositoryUrl: "github.com/yuzuruu29/the-hive-skill",
  narrationAvailable: true,
  captionVisibility: true,
  visualDensity: "cinematic",
  projectNames: ["HIVE", "Pledgr", "TraderBot"],
  evidenceIds: ["hive-typecheck", "pledgr-tests-165", "traderbot-tests-40"],
} as const;

export const RemotionRoot = () => (
  <>
    <Folder name="Promotional-Video">
      <Composition
        id="HivePromoMaster"
        component={HivePromo}
        durationInFrames={1980}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{...base, variant: "master", audioEnabled: true} satisfies PromoProps}
      />
      <Composition
        id="HivePromoVertical"
        component={HivePromo}
        durationInFrames={1260}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{...base, variant: "vertical", audioEnabled: true, visualDensity: "compact"} satisfies PromoProps}
      />
      <Composition
        id="HivePromoSquare"
        component={HivePromo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{...base, variant: "square", audioEnabled: true, visualDensity: "compact"} satisfies PromoProps}
      />
      <Composition
        id="HivePromoMasterMuted"
        component={HivePromo}
        durationInFrames={1980}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{...base, variant: "master", audioEnabled: false} satisfies PromoProps}
      />
      <Composition
        id="HivePromoVerticalMuted"
        component={HivePromo}
        durationInFrames={1260}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{...base, variant: "vertical", audioEnabled: false, visualDensity: "compact"} satisfies PromoProps}
      />
    </Folder>
    <Folder name="Stills">
      <Still id="HivePromoPoster" component={Poster} width={1920} height={1080} defaultProps={{compact: false}} />
      <Still id="HivePromoThumbnail" component={Poster} width={1280} height={720} defaultProps={{compact: true}} />
    </Folder>
  </>
);
