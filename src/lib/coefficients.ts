import type { CharacteristicKey, LayoutId, SettingKey } from "./setup-types";

/**
 * Coefficient database.
 *
 * Each value is the impact on a vehicle characteristic per ONE normalized unit
 * step of the setting (see `unitStep` in setup-config.ts). Positive numbers
 * raise the characteristic, negative numbers lower it.
 *
 * Treat this file as the editable "database" — moving it to a real DB table
 * later just means seeding rows with (setting_key, characteristic_key, value).
 */
export type CoefficientRow = Partial<Record<CharacteristicKey, number>>;
export type CoefficientTable = Record<SettingKey, CoefficientRow>;

export const COEFFICIENTS: CoefficientTable = {
  // ── Tier 1 ────────────────────────────────────────────────────────────
  front_wing: {
    turnIn: 0.9, entryRotation: 0.3, midCornerGrip: 0.7,
    rotation: 0.5, traction: -0.1, brakingStability: 0.4,
    highSpeedStability: 0.5, tyreWear: 0.2,
  },
  rear_wing: {
    turnIn: -0.3, entryRotation: -0.5, midCornerGrip: 0.6,
    rotation: -0.6, traction: 0.9, brakingStability: 0.8,
    highSpeedStability: 1.0, tyreWear: 0.2,
  },
  ride_height_front: {
    // Lower front = more front aero / sharper turn-in (so +1mm = less turn-in)
    turnIn: -0.4, entryRotation: -0.3, midCornerGrip: -0.2,
    rotation: -0.3, traction: 0.1, brakingStability: 0.1,
    highSpeedStability: 0.2, bumpCompliance: 0.3, kerbCompliance: 0.2,
  },
  ride_height_rear: {
    turnIn: 0.3, entryRotation: 0.4, midCornerGrip: -0.1,
    rotation: 0.5, traction: -0.4, brakingStability: -0.3,
    highSpeedStability: -0.4, bumpCompliance: 0.3, kerbCompliance: 0.2,
  },
  front_spring: {
    turnIn: 0.5, entryRotation: 0.3, midCornerGrip: -0.2,
    rotation: 0.3, traction: 0.0, brakingStability: 0.2,
    highSpeedStability: 0.3, bumpCompliance: -0.5, kerbCompliance: -0.6, tyreWear: 0.1,
  },
  rear_spring: {
    turnIn: -0.2, entryRotation: -0.3, midCornerGrip: -0.2,
    rotation: -0.4, traction: -0.5, brakingStability: 0.2,
    highSpeedStability: 0.2, bumpCompliance: -0.5, kerbCompliance: -0.6, tyreWear: 0.1,
  },
  front_arb: {
    turnIn: 0.4, entryRotation: 0.3, midCornerGrip: -0.3,
    rotation: 0.4, traction: 0.1, brakingStability: 0.1,
    highSpeedStability: 0.2, kerbCompliance: -0.3,
  },
  rear_arb: {
    turnIn: -0.2, entryRotation: -0.3, midCornerGrip: -0.3,
    rotation: -0.5, traction: -0.4, brakingStability: 0.2,
    highSpeedStability: 0.1, kerbCompliance: -0.3,
  },
  differential: {
    turnIn: -0.3, entryRotation: -0.4, midCornerGrip: 0.2,
    rotation: -0.5, traction: 0.9, brakingStability: 0.3,
    highSpeedStability: 0.3, tyreWear: 0.3,
  },
  // ── Tier 2 ────────────────────────────────────────────────────────────
  front_camber: {
    // more negative camber → more midcorner front grip, less braking grip
    turnIn: -0.3, midCornerGrip: -0.4, rotation: -0.2,
    brakingStability: 0.3, tyreWear: 0.4,
  },
  rear_camber: {
    midCornerGrip: -0.3, rotation: 0.2, traction: -0.3, tyreWear: 0.4,
  },
  front_toe: {
    // toe-out (negative) sharpens turn-in; toe-in (positive) calms it
    turnIn: -0.6, entryRotation: -0.4, highSpeedStability: 0.5, tyreWear: 0.3,
  },
  rear_toe: {
    rotation: -0.6, traction: 0.4, highSpeedStability: 0.5, tyreWear: 0.3,
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
    bumpCompliance: -0.6, kerbCompliance: -0.5, highSpeedStability: 0.2,
  },
  rear_fast_bump: {
    bumpCompliance: -0.6, kerbCompliance: -0.5, traction: -0.1,
  },
  front_fast_rebound: {
    bumpCompliance: -0.4, kerbCompliance: -0.4, brakingStability: 0.1,
  },
  rear_fast_rebound: {
    bumpCompliance: -0.4, kerbCompliance: -0.4, traction: -0.1,
  },
  front_travel_range: {
    bumpCompliance: 0.3, kerbCompliance: 0.2, highSpeedStability: -0.1,
  },
  rear_travel_range: {
    bumpCompliance: 0.3, kerbCompliance: 0.2, traction: 0.1, highSpeedStability: -0.1,
  },
};

/** Multipliers per layout — emphasizes traction/rotation traits per drivetrain. */
export const LAYOUT_MULTIPLIERS: Record<LayoutId, Partial<Record<CharacteristicKey, number>>> = {
  fr_rwd: { traction: 1.0,  rotation: 1.0,  brakingStability: 1.1, entryRotation: 0.9 },
  mr_rwd: { traction: 1.1,  rotation: 1.15, brakingStability: 1.0, entryRotation: 1.1 },
  rr_rwd: { traction: 1.25, rotation: 1.1,  brakingStability: 0.85, entryRotation: 1.2 },
  fr_fwd: { traction: 0.85, rotation: 0.85, brakingStability: 1.0,  entryRotation: 0.8, turnIn: 1.1 },
};
