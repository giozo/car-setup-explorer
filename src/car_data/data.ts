// ============================================================
// SetupLab — Built-in Car Profiles
// Source of truth for cars shipped with the app.
// User-added cars live in localStorage under "setuplab_user_cars".
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
  "TYRES",
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
    class: "MX5_CUP",
    engineLayout: "front",
    drive: "RWD",
    isBuiltIn: true,
    parameters: [],
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
