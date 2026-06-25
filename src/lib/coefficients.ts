import type { CharacteristicKey, LayoutId, SettingKey } from "./setup-types";

export type CoefficientRow = Partial<Record<CharacteristicKey, number>>;
export type CoefficientTable = Record<SettingKey, CoefficientRow>;

export const COEFFICIENTS: CoefficientTable = {
  // ── Tier 1 ────────────────────────────────────────────────────────────
  front_wing: {
    turnIn: 0.9, entryRotation: 0.3, midCornerGrip: 0.7,
    rotation: 0.5, traction: -0.1, brakingStability: 0.4,
    highSpeedCornering: 0.5, fastDirectionChange: 0.3, tyreWear: 0.2,
  },
  rear_wing: {
    turnIn: -0.3, entryRotation: -0.5, midCornerGrip: 0.6,
    rotation: -0.6, traction: 0.9, brakingStability: 0.8,
    highSpeedCornering: 1.0, fastDirectionChange: -0.2, tyreWear: 0.2,
  },
  ride_height_front: {
    turnIn: -0.4, entryRotation: -0.3, midCornerGrip: -0.2,
    rotation: -0.3, traction: 0.1, brakingStability: 0.1,
    highSpeedCornering: 0.2, fastDirectionChange: -0.1,
    bumpCompliance: 0.3, kerbCompliance: 0.2,
  },
  ride_height_rear: {
    turnIn: 0.3, entryRotation: 0.4, midCornerGrip: -0.1,
    rotation: 0.5, traction: -0.4, brakingStability: -0.3,
    highSpeedCornering: -0.4, fastDirectionChange: 0.1,
    bumpCompliance: 0.3, kerbCompliance: 0.2,
  },
  front_spring: {
    turnIn: 0.5, entryRotation: 0.3, midCornerGrip: -0.2,
    rotation: 0.3, traction: 0.0, brakingStability: 0.2,
    highSpeedCornering: 0.3, fastDirectionChange: 0.4,
    bumpCompliance: -0.5, kerbCompliance: -0.6, tyreWear: 0.1,
  },
  rear_spring: {
    turnIn: -0.2, entryRotation: -0.3, midCornerGrip: -0.2,
    rotation: -0.4, traction: -0.5, brakingStability: 0.2,
    highSpeedCornering: 0.2, fastDirectionChange: 0.3,
    bumpCompliance: -0.5, kerbCompliance: -0.6, tyreWear: 0.1,
  },
  front_arb: {
    turnIn: 0.4, entryRotation: 0.3, midCornerGrip: -0.3,
    rotation: 0.4, traction: 0.1, brakingStability: 0.1,
    highSpeedCornering: 0.2, fastDirectionChange: 0.5, kerbCompliance: -0.3,
  },
  rear_arb: {
    turnIn: -0.2, entryRotation: -0.3, midCornerGrip: -0.3,
    rotation: -0.5, traction: -0.4, brakingStability: 0.2,
    highSpeedCornering: 0.1, fastDirectionChange: 0.4, kerbCompliance: -0.3,
  },
  differential: {
    turnIn: -0.3, entryRotation: -0.4, midCornerGrip: 0.2,
    rotation: -0.5, traction: 0.9, brakingStability: 0.3,
    highSpeedCornering: 0.3, fastDirectionChange: -0.1, tyreWear: 0.3,
  },
  // ── Tier 2 ────────────────────────────────────────────────────────────
  front_camber: {
    turnIn: -0.3, midCornerGrip: -0.4, rotation: -0.2,
    brakingStability: 0.3, tyreWear: 0.4,
  },
  rear_camber: {
    midCornerGrip: -0.3, rotation: 0.2, traction: -0.3, tyreWear: 0.4,
  },
  front_toe: {
    turnIn: -0.6, entryRotation: -0.4,
    highSpeedCornering: 0.5, fastDirectionChange: -0.4, tyreWear: 0.3,
  },
  rear_toe: {
    rotation: -0.6, traction: 0.4,
    highSpeedCornering: 0.5, fastDirectionChange: -0.3, tyreWear: 0.3,
  },
  // ── Tier 3 ────────────────────────────────────────────────────────────
  front_bump: {
    turnIn: 0.2, entryRotation: 0.1, bumpCompliance: -0.4, kerbCompliance: -0.3,
  },
  rear_bump: {
    rotation: -0.2, traction: -0.2, bumpCompliance: -0.4, kerbCompliance: -0.3,
  },
  front_rebound: {
    brakingStability: 0.2, midCornerGrip: -0.1, bumpCompliance: -0.3, kerbCompliance: -0.3,
  },
  rear_rebound: {
    traction: -0.2, rotation: 0.1, bumpCompliance: -0.3, kerbCompliance: -0.3,
  },
  front_fast_bump: {
    bumpCompliance: -0.6, kerbCompliance: -0.5, highSpeedCornering: 0.2, fastDirectionChange: 0.2,
  },
  rear_fast_bump: {
    bumpCompliance: -0.6, kerbCompliance: -0.5, traction: -0.1, fastDirectionChange: 0.2,
  },
  front_fast_rebound: {
    bumpCompliance: -0.4, kerbCompliance: -0.4, brakingStability: 0.1,
  },
  rear_fast_rebound: {
    bumpCompliance: -0.4, kerbCompliance: -0.4, traction: -0.1,
  },
  front_travel_range: {
    bumpCompliance: 0.3, kerbCompliance: 0.2, highSpeedCornering: -0.1,
  },
  rear_travel_range: {
    bumpCompliance: 0.3, kerbCompliance: 0.2, traction: 0.1, highSpeedCornering: -0.1,
  },
};

export const LAYOUT_MULTIPLIERS: Record<LayoutId, Partial<Record<CharacteristicKey, number>>> = {
  fr_rwd: { traction: 1.0,  rotation: 1.0,  brakingStability: 1.1, entryRotation: 0.9 },
  mr_rwd: { traction: 1.1,  rotation: 1.15, brakingStability: 1.0, entryRotation: 1.1 },
  rr_rwd: { traction: 1.25, rotation: 1.1,  brakingStability: 0.85, entryRotation: 1.2 },
  fr_fwd: { traction: 0.85, rotation: 0.85, brakingStability: 1.0,  entryRotation: 0.8, turnIn: 1.1 },
};

/**
 * Maps a raw car parameter key (e.g. from a parsed .ini file) onto a
 * coefficient SettingKey so deltas applied in the UI affect the model.
 */
export const CAR_PARAM_TO_SETTING: Record<string, SettingKey> = {
  WING_1: "front_wing",
  WING_2: "rear_wing",
  ARB_FRONT: "front_arb",
  ARB_REAR: "rear_arb",
  SPRING_RATE_LF: "front_spring",
  SPRING_RATE_RF: "front_spring",
  SPRING_RATE_LR: "rear_spring",
  SPRING_RATE_RR: "rear_spring",
  ROD_LENGTH_LF: "ride_height_front",
  ROD_LENGTH_RF: "ride_height_front",
  ROD_LENGTH_LR: "ride_height_rear",
  ROD_LENGTH_RR: "ride_height_rear",
  PACKER_RANGE_LF: "front_travel_range",
  PACKER_RANGE_RF: "front_travel_range",
  PACKER_RANGE_LR: "rear_travel_range",
  PACKER_RANGE_RR: "rear_travel_range",
  CAMBER_LF: "front_camber",
  CAMBER_RF: "front_camber",
  CAMBER_LR: "rear_camber",
  CAMBER_RR: "rear_camber",
  TOE_OUT_LF: "front_toe",
  TOE_OUT_RF: "front_toe",
  TOE_OUT_LR: "rear_toe",
  TOE_OUT_RR: "rear_toe",
  DAMP_BUMP_LF: "front_bump",
  DAMP_BUMP_RF: "front_bump",
  DAMP_BUMP_LR: "rear_bump",
  DAMP_BUMP_RR: "rear_bump",
  DAMP_REBOUND_LF: "front_rebound",
  DAMP_REBOUND_RF: "front_rebound",
  DAMP_REBOUND_LR: "rear_rebound",
  DAMP_REBOUND_RR: "rear_rebound",
  DAMP_FAST_BUMP_LF: "front_fast_bump",
  DAMP_FAST_BUMP_RF: "front_fast_bump",
  DAMP_FAST_BUMP_LR: "rear_fast_bump",
  DAMP_FAST_BUMP_RR: "rear_fast_bump",
  DAMP_FAST_REBOUND_LF: "front_fast_rebound",
  DAMP_FAST_REBOUND_RF: "front_fast_rebound",
  DAMP_FAST_REBOUND_LR: "rear_fast_rebound",
  DAMP_FAST_REBOUND_RR: "rear_fast_rebound",
  DIFF_POWER: "differential",
  DIFF_COAST: "differential",
  DIFF_PRELOAD: "differential",
};
