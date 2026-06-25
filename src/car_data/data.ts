// ============================================================
// SetupLab — Built-in Car Profiles
// ============================================================

export interface ParameterDef {
  key: string;
  label: string;
  unit: string;
  tab: string;
  min: number;
  max: number;
  clicks: number;
}

export interface CarProfile {
  id: string;
  name: string;
  game: string;
  class: string;
  engineLayout: "front" | "mid" | "rear";
  drive: "RWD" | "FWD";
  parameters: ParameterDef[];
  isBuiltIn: boolean;
}

export const TAB_ORDER: string[] = [
  "AERO",
  "SUSPENSIONS",
  "ALIGNMENT",
  "DAMPERS",
  "DRIVETRAIN",
  "ELECTRONICS",
  "GEARS",
  "GENERIC",
  "OTHER",
];

export const BUILT_IN_CARS: CarProfile[] = [
  {
    id: "ks_mazda_mx5_cup",
    name: "Mazda MX-5 Cup",
    game: "ac",
    class: "MX5 Cup",
    engineLayout: "front",
    drive: "RWD",
    isBuiltIn: true,
    parameters: [
      { key: "ABS",              label: "ABS",              unit: "clicks", tab: "ELECTRONICS", min: 0,   max: 1,   clicks: 1  },
      { key: "TRACTION_CONTROL", label: "Traction Control", unit: "clicks", tab: "ELECTRONICS", min: 0,   max: 1,   clicks: 1  },
      { key: "BRAKE_POWER_MULT", label: "Brake Power",      unit: "%",      tab: "ELECTRONICS", min: 80,  max: 100, clicks: 20 },
      { key: "ARB_FRONT",        label: "ARB Front",        unit: "clicks", tab: "SUSPENSIONS", min: 0,   max: 4,   clicks: 4  },
      { key: "ARB_REAR",         label: "ARB Rear",         unit: "clicks", tab: "SUSPENSIONS", min: 0,   max: 1,   clicks: 1  },
      { key: "SPRING_RATE_LF",   label: "Spring Rate LF",   unit: "N/mm",   tab: "SUSPENSIONS", min: 37,  max: 58,  clicks: 21 },
      { key: "SPRING_RATE_RF",   label: "Spring Rate RF",   unit: "N/mm",   tab: "SUSPENSIONS", min: 37,  max: 58,  clicks: 21 },
      { key: "SPRING_RATE_LR",   label: "Spring Rate LR",   unit: "N/mm",   tab: "SUSPENSIONS", min: 62,  max: 107, clicks: 45 },
      { key: "SPRING_RATE_RR",   label: "Spring Rate RR",   unit: "N/mm",   tab: "SUSPENSIONS", min: 62,  max: 107, clicks: 45 },
      { key: "ROD_LENGTH_LF",    label: "Ride Height LF",   unit: "mm",     tab: "SUSPENSIONS", min: 0,   max: 25,  clicks: 25 },
      { key: "ROD_LENGTH_RF",    label: "Ride Height RF",   unit: "mm",     tab: "SUSPENSIONS", min: 0,   max: 25,  clicks: 25 },
      { key: "ROD_LENGTH_LR",    label: "Ride Height LR",   unit: "mm",     tab: "SUSPENSIONS", min: 0,   max: 30,  clicks: 30 },
      { key: "ROD_LENGTH_RR",    label: "Ride Height RR",   unit: "mm",     tab: "SUSPENSIONS", min: 0,   max: 30,  clicks: 30 },
      { key: "CAMBER_LF",        label: "Camber LF",        unit: "°",      tab: "ALIGNMENT",   min: -38, max: 8,   clicks: 46 },
      { key: "CAMBER_RF",        label: "Camber RF",        unit: "°",      tab: "ALIGNMENT",   min: -38, max: 8,   clicks: 46 },
      { key: "CAMBER_LR",        label: "Camber LR",        unit: "°",      tab: "ALIGNMENT",   min: -22, max: 15,  clicks: 37 },
      { key: "CAMBER_RR",        label: "Camber RR",        unit: "°",      tab: "ALIGNMENT",   min: -22, max: 15,  clicks: 37 },
      { key: "TOE_OUT_LF",       label: "Toe LF",           unit: "°",      tab: "ALIGNMENT",   min: 0,   max: 12,  clicks: 12 },
      { key: "TOE_OUT_RF",       label: "Toe RF",           unit: "°",      tab: "ALIGNMENT",   min: 0,   max: 12,  clicks: 12 },
      { key: "TOE_OUT_LR",       label: "Toe LR",           unit: "°",      tab: "ALIGNMENT",   min: 0,   max: 34,  clicks: 34 },
      { key: "TOE_OUT_RR",       label: "Toe RR",           unit: "°",      tab: "ALIGNMENT",   min: 0,   max: 34,  clicks: 34 },
      { key: "DAMP_BUMP_LF",     label: "Bump LF",          unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "DAMP_BUMP_RF",     label: "Bump RF",          unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "DAMP_BUMP_LR",     label: "Bump LR",          unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "DAMP_BUMP_RR",     label: "Bump RR",          unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "DAMP_REBOUND_LF",  label: "Rebound LF",       unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "DAMP_REBOUND_RF",  label: "Rebound RF",       unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "DAMP_REBOUND_LR",  label: "Rebound LR",       unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "DAMP_REBOUND_RR",  label: "Rebound RR",       unit: "clicks", tab: "DAMPERS",     min: 0,   max: 11,  clicks: 11 },
      { key: "FUEL",             label: "Fuel",             unit: "L",      tab: "GENERIC",     min: 0,   max: 45,  clicks: 45 },
    ],
  },
];

export const USER_CARS_STORAGE_KEY = "setuplab_user_cars";

export function loadUserCars(): CarProfile[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USER_CARS_STORAGE_KEY) ?? "[]") as CarProfile[];
  } catch {
    return [];
  }
}

export function saveUserCars(cars: CarProfile[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_CARS_STORAGE_KEY, JSON.stringify(cars));
}
