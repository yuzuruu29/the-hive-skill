export type PromoVariant = "master" | "vertical" | "square";

export type PromoProps = {
  variant: PromoVariant;
  repositoryUrl: string;
  narrationAvailable: boolean;
  audioEnabled: boolean;
  captionVisibility: boolean;
  visualDensity: "cinematic" | "compact";
  projectNames: readonly string[];
  evidenceIds: readonly string[];
};
