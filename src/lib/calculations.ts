import {
  ATTRIBUTE_LABELS,
  calculateAttributeDeltas,
  type Attribute,
} from "./coefficients";
import type { ParameterDef, CarProfile } from "@/car_data/data";

export type CarParamValues = Record<string, { baseline: number; current: number }>;

export type AttributeScores = Record<
  Attribute,
  { baseline: number; current: number; delta: number }
>;

// Re-export so existing imports continue working
export { ATTRIBUTE_LABELS } from "./coefficients";
export type { Attribute } from "./coefficients";

export const CHARACTERISTICS: { key: Attribute; label: string }[] = [
  { key: "turn_in",               label: "Turn In" },
  { key: "entry_rotation",        label: "Entry Rotation" },
  { key: "mid_grip",              label: "Mid Corner Grip" },
  { key: "rotation",              label: "Rotation" },
  { key: "traction",              label: "Traction" },
  { key: "brake_stability",       label: "Braking Stability" },
  { key: "high_speed_cornering",  label: "High Speed Cornering" },
  { key: "fast_direction_change", label: "Fast Direction Change" },
  { key: "kerb_compliance",       label: "Kerb Compliance" },
  { key: "top_speed",             label: "Top Speed" },
  { key: "tyre_wear",             label: "Tyre Wear" },
];

const BASELINE = 50;
/** Display gain: each unit of summed (normalizedDelta * coefficient) moves the bar this many percent. */
const DISPLAY_SCALE = 12;

function emptyScores(): AttributeScores {
  const s = {} as AttributeScores;
  for (const c of CHARACTERISTICS) {
    s[c.key] = { baseline: BASELINE, current: BASELINE, delta: 0 };
  }
  return s;
}

/** Convert a car's free-form class label into the COEFFICIENTS key form. */
export function normalizeCarClass(cls: string): string {
  return cls.trim().toUpperCase().replace(/[\s-]+/g, "_");
}

export function computeCarScores(
  values: CarParamValues,
  params: ParameterDef[],
  car: CarProfile | null,
): AttributeScores {
  const scores = emptyScores();
  if (!car) return scores;

  const carClass = normalizeCarClass(car.class);
  const totals: Partial<Record<Attribute, number>> = {};

  for (const p of params) {
    const v = values[p.key];
    if (!v) continue;
    const range = p.max - p.min;
    if (range === 0) continue;
    const normDelta = (v.current - v.baseline) / range;
    if (normDelta === 0) continue;

    const contrib = calculateAttributeDeltas(
      p.key,
      normDelta,
      carClass,
      car.engineLayout,
      car.drive,
    );
    for (const [k, val] of Object.entries(contrib)) {
      totals[k as Attribute] = (totals[k as Attribute] ?? 0) + (val ?? 0);
    }
  }

  for (const c of CHARACTERISTICS) {
    const t = totals[c.key] ?? 0;
    const current = Math.max(0, Math.min(100, BASELINE + t * DISPLAY_SCALE));
    scores[c.key] = { baseline: BASELINE, current, delta: current - BASELINE };
  }
  return scores;
}

export const CHARACTERISTIC_GROUPS: {
  title: string;
  items: { key: Attribute; label: string }[];
}[] = [
  {
    title: "Corner Entry",
    items: [
      { key: "turn_in", label: "Turn In" },
      { key: "entry_rotation", label: "Entry Rotation" },
      { key: "brake_stability", label: "Braking Stability" },
    ],
  },
  {
    title: "Mid Corner",
    items: [
      { key: "mid_grip", label: "Mid Corner Grip" },
      { key: "rotation", label: "Rotation" },
    ],
  },
  {
    title: "Corner Exit",
    items: [{ key: "traction", label: "Traction" }],
  },
  {
    title: "Kerbs & Bumps",
    items: [{ key: "kerb_compliance", label: "Kerb Compliance" }],
  },
  {
    title: "Fast & Sweeping Corners",
    items: [
      { key: "high_speed_cornering", label: "High Speed Cornering" },
      { key: "fast_direction_change", label: "Fast Direction Change" },
    ],
  },
  {
    title: "Performance",
    items: [
      { key: "top_speed", label: "Top Speed" },
      { key: "tyre_wear", label: "Tyre Wear" },
    ],
  },
];

export function generateSummary(scores: AttributeScores): string {
  const deltas = (Object.keys(scores) as Attribute[])
    .map((k) => ({ key: k, label: ATTRIBUTE_LABELS[k], d: scores[k].delta }))
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
    parts.push(
      `${parts.length ? " while reducing " : "This setup reduces "}${humanList(losses.map((l) => l.label.toLowerCase()))}`,
    );
  }
  parts.push(".");

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

function cornerPhaseFor(k: Attribute): string {
  switch (k) {
    case "turn_in":
    case "entry_rotation":
    case "brake_stability":
      return "corner entry";
    case "mid_grip":
    case "rotation":
      return "the middle of the corner";
    case "traction":
      return "corner exit";
    case "high_speed_cornering":
      return "fast sweeping corners";
    case "fast_direction_change":
      return "quick direction changes and chicanes";
    case "kerb_compliance":
      return "rough surfaces and kerbs";
    case "top_speed":
      return "straight-line speed";
    case "tyre_wear":
      return "long-run tyre life";
  }
}

function humanList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** Pretty label for a ParamGroup used by the guide panel. */
export function paramGroupLabel(group: string): string {
  return group
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
