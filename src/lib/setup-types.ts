export const SIMULATORS = [
  { id: "ac", name: "Assetto Corsa" },
  { id: "acc", name: "Assetto Corsa Competizione" },
  { id: "iracing", name: "iRacing" },
  { id: "lmu", name: "Le Mans Ultimate" },
  { id: "rre", name: "RaceRoom" },
  { id: "pcars", name: "Project Cars" },
] as const;

export type SimulatorId = (typeof SIMULATORS)[number]["id"];

export const LAYOUTS = [
  { id: "fr_rwd", name: "Front Engine RWD" },
  { id: "mr_rwd", name: "Mid Engine RWD" },
  { id: "rr_rwd", name: "Rear Engine RWD" },
  { id: "fr_fwd", name: "Front Engine FWD" },
] as const;

export type LayoutId = (typeof LAYOUTS)[number]["id"];

export type CharacteristicKey =
  | "turnIn"
  | "entryRotation"
  | "midCornerGrip"
  | "rotation"
  | "traction"
  | "brakingStability"
  | "highSpeedStability"
  | "kerbCompliance"
  | "bumpCompliance"
  | "tyreWear";

export const CHARACTERISTICS: { key: CharacteristicKey; label: string }[] = [
  { key: "turnIn", label: "Turn In" },
  { key: "entryRotation", label: "Entry Rotation" },
  { key: "midCornerGrip", label: "Mid Corner Grip" },
  { key: "rotation", label: "Rotation" },
  { key: "traction", label: "Traction" },
  { key: "brakingStability", label: "Braking Stability" },
  { key: "highSpeedStability", label: "High Speed Stability" },
  { key: "kerbCompliance", label: "Kerb Compliance" },
  { key: "bumpCompliance", label: "Bump Compliance" },
  { key: "tyreWear", label: "Tyre Wear" },
];

export type Tier = 1 | 2 | 3;

export type SettingKey =
  | "front_wing"
  | "rear_wing"
  | "ride_height_front"
  | "ride_height_rear"
  | "front_spring"
  | "rear_spring"
  | "front_arb"
  | "rear_arb"
  | "differential"
  | "front_camber"
  | "rear_camber"
  | "front_toe"
  | "rear_toe"
  | "front_bump"
  | "rear_bump"
  | "front_rebound"
  | "rear_rebound"
  | "front_fast_bump"
  | "rear_fast_bump"
  | "front_fast_rebound"
  | "rear_fast_rebound"
  | "front_travel_range"
  | "rear_travel_range";

export interface SettingDef {
  key: SettingKey;
  label: string;
  tier: Tier;
  unit: string;
  /** Reasonable step magnitude — used to scale the user's delta into a "normalized click" before applying coefficients. */
  unitStep: number;
  defaultBaseline: number;
}
