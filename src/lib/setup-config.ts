import type { SettingDef } from "./setup-types";

export const SETTINGS: SettingDef[] = [
  // Tier 1
  { key: "front_wing",         label: "Front Wing",         tier: 1, unit: "clicks", unitStep: 1,   defaultBaseline: 4 },
  { key: "rear_wing",          label: "Rear Wing",          tier: 1, unit: "clicks", unitStep: 1,   defaultBaseline: 6 },
  { key: "ride_height_front",  label: "Ride Height Front",  tier: 1, unit: "mm",     unitStep: 1,   defaultBaseline: 55 },
  { key: "ride_height_rear",   label: "Ride Height Rear",   tier: 1, unit: "mm",     unitStep: 1,   defaultBaseline: 65 },
  { key: "front_spring",       label: "Front Spring",       tier: 1, unit: "N/mm",   unitStep: 10,  defaultBaseline: 160 },
  { key: "rear_spring",        label: "Rear Spring",        tier: 1, unit: "N/mm",   unitStep: 10,  defaultBaseline: 150 },
  { key: "front_arb",          label: "Front ARB",          tier: 1, unit: "clicks", unitStep: 1,   defaultBaseline: 4 },
  { key: "rear_arb",           label: "Rear ARB",           tier: 1, unit: "clicks", unitStep: 1,   defaultBaseline: 4 },
  { key: "differential",       label: "Differential",       tier: 1, unit: "%",      unitStep: 5,   defaultBaseline: 40 },
  // Tier 2
  { key: "front_camber",       label: "Front Camber",       tier: 2, unit: "°",      unitStep: 0.1, defaultBaseline: -3.5 },
  { key: "rear_camber",        label: "Rear Camber",        tier: 2, unit: "°",      unitStep: 0.1, defaultBaseline: -3.0 },
  { key: "front_toe",          label: "Front Toe",          tier: 2, unit: "°",      unitStep: 0.05, defaultBaseline: 0.05 },
  { key: "rear_toe",           label: "Rear Toe",           tier: 2, unit: "°",      unitStep: 0.05, defaultBaseline: 0.15 },
  // Tier 3
  { key: "front_bump",         label: "Front Bump",         tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 10 },
  { key: "rear_bump",          label: "Rear Bump",          tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 10 },
  { key: "front_rebound",      label: "Front Rebound",      tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 12 },
  { key: "rear_rebound",       label: "Rear Rebound",       tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 12 },
  { key: "front_fast_bump",    label: "Front Fast Bump",    tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 6 },
  { key: "rear_fast_bump",     label: "Rear Fast Bump",     tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 6 },
  { key: "front_fast_rebound", label: "Front Fast Rebound", tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 8 },
  { key: "rear_fast_rebound",  label: "Rear Fast Rebound",  tier: 3, unit: "clicks", unitStep: 1,   defaultBaseline: 8 },
  { key: "front_travel_range", label: "Front Travel Range", tier: 3, unit: "mm",     unitStep: 1,   defaultBaseline: 50 },
  { key: "rear_travel_range",  label: "Rear Travel Range",  tier: 3, unit: "mm",     unitStep: 1,   defaultBaseline: 55 },
];

export const TIER_LABELS: Record<1 | 2 | 3, string> = {
  1: "Tier 1 — Core Mechanical",
  2: "Tier 2 — Alignment",
  3: "Tier 3 — Damper Dynamics",
};
