import type { CarProfile, ParameterDef } from "@/car_data/data";

export function parseACSetup(content: string): Record<string, number> {
  const values: Record<string, number> = {};
  let currentSection = "";
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("[") && line.endsWith("]")) {
      currentSection = line.slice(1, -1);
    } else if (line.startsWith("VALUE=") && currentSection) {
      const val = parseFloat(line.split("=")[1]);
      if (!isNaN(val)) values[currentSection] = val;
    }
  }
  return values;
}

// Keys to ignore — not setup parameters
const SKIP_KEYS = new Set([
  "CAR",
  "TYRES",
  "__EXT_PATCH",
  "PRESSURE_LF",
  "PRESSURE_RF",
  "PRESSURE_LR",
  "PRESSURE_RR",
]);

// Human-readable metadata for known parameter keys
const PARAM_META: Record<string, { label: string; unit: string; tab: string }> = {
  WING_1:               { label: "Front Splitter",    unit: "clicks", tab: "AERO" },
  WING_2:               { label: "Rear Wing",         unit: "clicks", tab: "AERO" },
  PRESSURE_LF:          { label: "Pressure LF",       unit: "psi",    tab: "TYRES" },
  PRESSURE_RF:          { label: "Pressure RF",       unit: "psi",    tab: "TYRES" },
  PRESSURE_LR:          { label: "Pressure LR",       unit: "psi",    tab: "TYRES" },
  PRESSURE_RR:          { label: "Pressure RR",       unit: "psi",    tab: "TYRES" },
  ARB_FRONT:            { label: "ARB Front",         unit: "clicks", tab: "SUSPENSIONS" },
  ARB_REAR:             { label: "ARB Rear",          unit: "clicks", tab: "SUSPENSIONS" },
  SPRING_RATE_LF:       { label: "Spring Rate LF",    unit: "N/mm",   tab: "SUSPENSIONS" },
  SPRING_RATE_RF:       { label: "Spring Rate RF",    unit: "N/mm",   tab: "SUSPENSIONS" },
  SPRING_RATE_LR:       { label: "Spring Rate LR",    unit: "N/mm",   tab: "SUSPENSIONS" },
  SPRING_RATE_RR:       { label: "Spring Rate RR",    unit: "N/mm",   tab: "SUSPENSIONS" },
  ROD_LENGTH_LF:        { label: "Ride Height LF",    unit: "mm",     tab: "SUSPENSIONS" },
  ROD_LENGTH_RF:        { label: "Ride Height RF",    unit: "mm",     tab: "SUSPENSIONS" },
  ROD_LENGTH_LR:        { label: "Ride Height LR",    unit: "mm",     tab: "SUSPENSIONS" },
  ROD_LENGTH_RR:        { label: "Ride Height RR",    unit: "mm",     tab: "SUSPENSIONS" },
  PACKER_RANGE_LF:      { label: "Packer LF",         unit: "mm",     tab: "SUSPENSIONS" },
  PACKER_RANGE_RF:      { label: "Packer RF",         unit: "mm",     tab: "SUSPENSIONS" },
  PACKER_RANGE_LR:      { label: "Packer LR",         unit: "mm",     tab: "SUSPENSIONS" },
  PACKER_RANGE_RR:      { label: "Packer RR",         unit: "mm",     tab: "SUSPENSIONS" },
  CAMBER_LF:            { label: "Camber LF",         unit: "°",      tab: "ALIGNMENT" },
  CAMBER_RF:            { label: "Camber RF",         unit: "°",      tab: "ALIGNMENT" },
  CAMBER_LR:            { label: "Camber LR",         unit: "°",      tab: "ALIGNMENT" },
  CAMBER_RR:            { label: "Camber RR",         unit: "°",      tab: "ALIGNMENT" },
  TOE_OUT_LF:           { label: "Toe LF",            unit: "°",      tab: "ALIGNMENT" },
  TOE_OUT_RF:           { label: "Toe RF",            unit: "°",      tab: "ALIGNMENT" },
  TOE_OUT_LR:           { label: "Toe LR",            unit: "°",      tab: "ALIGNMENT" },
  TOE_OUT_RR:           { label: "Toe RR",            unit: "°",      tab: "ALIGNMENT" },
  DAMP_BUMP_LF:         { label: "Bump LF",           unit: "clicks", tab: "DAMPERS" },
  DAMP_BUMP_RF:         { label: "Bump RF",           unit: "clicks", tab: "DAMPERS" },
  DAMP_BUMP_LR:         { label: "Bump LR",           unit: "clicks", tab: "DAMPERS" },
  DAMP_BUMP_RR:         { label: "Bump RR",           unit: "clicks", tab: "DAMPERS" },
  DAMP_REBOUND_LF:      { label: "Rebound LF",        unit: "clicks", tab: "DAMPERS" },
  DAMP_REBOUND_RF:      { label: "Rebound RF",        unit: "clicks", tab: "DAMPERS" },
  DAMP_REBOUND_LR:      { label: "Rebound LR",        unit: "clicks", tab: "DAMPERS" },
  DAMP_REBOUND_RR:      { label: "Rebound RR",        unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_BUMP_LF:    { label: "Fast Bump LF",      unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_BUMP_RF:    { label: "Fast Bump RF",      unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_BUMP_LR:    { label: "Fast Bump LR",      unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_BUMP_RR:    { label: "Fast Bump RR",      unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_REBOUND_LF: { label: "Fast Rebound LF",   unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_REBOUND_RF: { label: "Fast Rebound RF",   unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_REBOUND_LR: { label: "Fast Rebound LR",   unit: "clicks", tab: "DAMPERS" },
  DAMP_FAST_REBOUND_RR: { label: "Fast Rebound RR",   unit: "clicks", tab: "DAMPERS" },
  DIFF_POWER:           { label: "Diff Power",        unit: "%",      tab: "DRIVETRAIN" },
  DIFF_COAST:           { label: "Diff Coast",        unit: "%",      tab: "DRIVETRAIN" },
  DIFF_PRELOAD:         { label: "Diff Preload",      unit: "Nm",     tab: "DRIVETRAIN" },
  ABS:                  { label: "ABS",               unit: "clicks", tab: "ELECTRONICS" },
  TRACTION_CONTROL:     { label: "Traction Control",  unit: "clicks", tab: "ELECTRONICS" },
  FRONT_BIAS:           { label: "Brake Bias",        unit: "%",      tab: "ELECTRONICS" },
  BRAKE_POWER_MULT:     { label: "Brake Power",       unit: "%",      tab: "ELECTRONICS" },
  ENGINE_LIMITER:       { label: "Engine Limiter",    unit: "%",      tab: "ELECTRONICS" },
  FUEL:                 { label: "Fuel",              unit: "L",      tab: "GENERIC" },
  INTERNAL_GEAR_2:      { label: "2nd Gear",          unit: "clicks", tab: "GEARS" },
  INTERNAL_GEAR_3:      { label: "3rd Gear",          unit: "clicks", tab: "GEARS" },
  INTERNAL_GEAR_4:      { label: "4th Gear",          unit: "clicks", tab: "GEARS" },
  INTERNAL_GEAR_5:      { label: "5th Gear",          unit: "clicks", tab: "GEARS" },
  INTERNAL_GEAR_6:      { label: "6th Gear",          unit: "clicks", tab: "GEARS" },
  INTERNAL_GEAR_7:      { label: "7th Gear",          unit: "clicks", tab: "GEARS" },
  FINAL_RATIO:          { label: "Final Ratio",       unit: "clicks", tab: "GEARS" },
};

export function buildCarProfile(
  minContent: string,
  maxContent: string,
  meta: {
    name: string;
    class: string;
    drive: "RWD" | "FWD";
    engineLayout: "front" | "mid" | "rear";
  },
): CarProfile {
  const minVals = parseACSetup(minContent);
  const maxVals = parseACSetup(maxContent);

  const parameters: ParameterDef[] = [];

  for (const key of Object.keys(minVals)) {
    if (SKIP_KEYS.has(key)) continue;
    if (!(key in maxVals)) continue;

    const mn = minVals[key];
    const mx = maxVals[key];
    if (mn === mx) continue;

    const paramMeta = PARAM_META[key] ?? { label: key, unit: "value", tab: "OTHER" };

    parameters.push({
      key,
      label: paramMeta.label,
      unit: paramMeta.unit,
      tab: paramMeta.tab,
      min: mn,
      max: mx,
      clicks: Math.round(mx - mn),
    });
  }

  return {
    id: `user_${Date.now()}`,
    name: meta.name,
    game: "ac",
    class: meta.class,
    engineLayout: meta.engineLayout,
    drive: meta.drive,
    isBuiltIn: false,
    parameters,
  };
}
