import { COEFFICIENTS, LAYOUT_MULTIPLIERS } from "./coefficients";
import { SETTINGS } from "./setup-config";
import {
  CHARACTERISTICS,
  type CharacteristicKey,
  type LayoutId,
  type SettingKey,
} from "./setup-types";

export type SetupValues = Record<SettingKey, { baseline: number; current: number }>;

export function makeDefaultValues(): SetupValues {
  const out = {} as SetupValues;
  for (const s of SETTINGS) {
    out[s.key] = { baseline: s.defaultBaseline, current: s.defaultBaseline };
  }
  return out;
}

export type CharacteristicScores = Record<CharacteristicKey, { baseline: number; current: number; delta: number }>;

/** All characteristics start at a neutral 50 (baseline). Deltas push around that. */
const NEUTRAL = 50;

export function computeScores(values: SetupValues, layout: LayoutId): CharacteristicScores {
  const scores = {} as CharacteristicScores;
  for (const c of CHARACTERISTICS) {
    scores[c.key] = { baseline: NEUTRAL, current: NEUTRAL, delta: 0 };
  }
  const mult = LAYOUT_MULTIPLIERS[layout];

  for (const s of SETTINGS) {
    const v = values[s.key];
    if (!v) continue;
    const deltaUnits = (v.current - v.baseline) / s.unitStep;
    if (deltaUnits === 0) continue;
    const row = COEFFICIENTS[s.key];
    for (const key of Object.keys(row) as CharacteristicKey[]) {
      const coef = row[key] ?? 0;
      const layoutMult = mult[key] ?? 1;
      scores[key].current += deltaUnits * coef * layoutMult;
    }
  }

  for (const c of CHARACTERISTICS) {
    const s = scores[c.key];
    s.current = clamp(s.current, 0, 100);
    s.delta = s.current - s.baseline;
  }
  return scores;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export const CHARACTERISTIC_GROUPS: { title: string; items: { key: CharacteristicKey; label: string }[] }[] = [
  { title: "Corner Entry", items: [
    { key: "turnIn", label: "Turn In" },
    { key: "entryRotation", label: "Entry Rotation" },
    { key: "brakingStability", label: "Braking Stability" },
  ]},
  { title: "Mid Corner", items: [
    { key: "midCornerGrip", label: "Mid Corner Grip" },
    { key: "rotation", label: "Rotation" },
  ]},
  { title: "Corner Exit", items: [
    { key: "traction", label: "Traction" },
    { key: "highSpeedStability", label: "Exit Stability" }, // mapped per spec
  ]},
  { title: "Kerbs & Bumps", items: [
    { key: "kerbCompliance", label: "Kerb Compliance" },
    { key: "bumpCompliance", label: "Bump Compliance" },
  ]},
  { title: "Fast & Sweeping Corners", items: [
    { key: "highSpeedStability", label: "High Speed Stability" },
    { key: "brakingStability", label: "Confidence" },
  ]},
];

/** Generates a setup character summary paragraph from the deltas. */
export function generateSummary(scores: CharacteristicScores): string {
  const deltas = (Object.keys(scores) as CharacteristicKey[])
    .map((k) => ({ key: k, label: labelFor(k), d: scores[k].delta }))
    .filter((x) => Math.abs(x.d) >= 1.5)
    .sort((a, b) => Math.abs(b.d) - Math.abs(a.d));

  if (deltas.length === 0) {
    return "The current setup mirrors the baseline. No meaningful change in vehicle behavior is expected — use this as a reference point before making adjustments.";
  }

  const gains = deltas.filter((x) => x.d > 0).slice(0, 3);
  const losses = deltas.filter((x) => x.d < 0).slice(0, 3);

  const parts: string[] = [];
  if (gains.length) {
    parts.push(`This setup increases ${humanList(gains.map((g) => g.label.toLowerCase()))}`);
  }
  if (losses.length) {
    parts.push(`${parts.length ? " while reducing " : "This setup reduces "}${humanList(losses.map((l) => l.label.toLowerCase()))}`);
  }
  parts.push(".");

  // Character interpretation
  const topGain = gains[0];
  const topLoss = losses[0];
  let character = "";
  if (topGain && topLoss) {
    character = ` Expect a car that feels stronger in ${cornerPhaseFor(topGain.key)} but less forgiving in ${cornerPhaseFor(topLoss.key)}.`;
  } else if (topGain) {
    character = ` The car should feel notably stronger in ${cornerPhaseFor(topGain.key)}.`;
  } else if (topLoss) {
    character = ` The car should feel weaker in ${cornerPhaseFor(topLoss.key)} — keep that in mind when pushing.`;
  }
  return parts.join("") + character;
}

function labelFor(k: CharacteristicKey): string {
  return CHARACTERISTICS.find((c) => c.key === k)?.label ?? k;
}

function cornerPhaseFor(k: CharacteristicKey): string {
  switch (k) {
    case "turnIn":
    case "entryRotation":
    case "brakingStability":
      return "corner entry";
    case "midCornerGrip":
    case "rotation":
      return "the middle of the corner";
    case "traction":
      return "corner exit";
    case "highSpeedStability":
      return "fast sweeping corners";
    case "kerbCompliance":
    case "bumpCompliance":
      return "rough surfaces and kerbs";
    case "tyreWear":
      return "long-run tyre life";
  }
}

function humanList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
