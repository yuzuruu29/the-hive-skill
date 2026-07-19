import "./index.css";
import { Composition } from "remotion";
import { HiveAd } from "./HiveAd";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HiveAd"
        component={HiveAd}
        durationInFrames={5400}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
