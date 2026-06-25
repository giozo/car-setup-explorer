// ============================================================
// SetupLab — Attribute Coefficient Database
// ============================================================
// Structure:
//   COEFFICIENTS[class][layout_drive][paramGroup][attribute]
//
// Layout/drive keys:
//   "front_RWD" | "front_FWD" | "mid_RWD" | "rear_RWD"
//
// Parameter groups (averaged where L/R pairs exist):
//   ARB_FRONT, ARB_REAR,
//   SPRING_FRONT, SPRING_REAR,
//   HEIGHT_FRONT, HEIGHT_REAR,
//   CAMBER_FRONT, CAMBER_REAR,
//   TOE_FRONT, TOE_REAR,
//   BUMP_FRONT, BUMP_REAR,
//   REBOUND_FRONT, REBOUND_REAR,
//   DIFF_POWER, DIFF_COAST, DIFF_PRELOAD,
//   WING_FRONT, WING_REAR,
//   PACKER_FRONT, PACKER_REAR,
//   FAST_BUMP_FRONT, FAST_BUMP_REAR,
//   FAST_REBOUND_FRONT, FAST_REBOUND_REAR,
//   ABS, TRACTION_CONTROL, BRAKE_POWER, BRAKE_BIAS
//
// Attributes:
//   turn_in, entry_rotation, mid_grip, rotation,
//   traction, brake_stability, high_speed_cornering,
//   kerb_compliance, fast_direction_change, top_speed, tyre_wear
//
// Scale: -1.0 (strongly negative) to +1.0 (strongly positive)
// 0.0 = no meaningful effect
// ============================================================

export type Attribute =
  | "turn_in"
  | "entry_rotation"
  | "mid_grip"
  | "rotation"
  | "traction"
  | "brake_stability"
  | "high_speed_cornering"
  | "kerb_compliance"
  | "fast_direction_change"
  | "top_speed"
  | "tyre_wear";

export const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  turn_in:               "Turn In",
  entry_rotation:        "Entry Rotation",
  mid_grip:              "Mid Corner Grip",
  rotation:              "Rotation",
  traction:              "Traction",
  brake_stability:       "Braking Stability",
  high_speed_cornering:  "High Speed Cornering",
  kerb_compliance:       "Kerb Compliance",
  fast_direction_change: "Fast Direction Change",
  top_speed:             "Top Speed",
  tyre_wear:             "Tyre Wear",
};

export type ParamGroup =
  | "ARB_FRONT" | "ARB_REAR"
  | "SPRING_FRONT" | "SPRING_REAR"
  | "HEIGHT_FRONT" | "HEIGHT_REAR"
  | "CAMBER_FRONT" | "CAMBER_REAR"
  | "TOE_FRONT" | "TOE_REAR"
  | "BUMP_FRONT" | "BUMP_REAR"
  | "REBOUND_FRONT" | "REBOUND_REAR"
  | "FAST_BUMP_FRONT" | "FAST_BUMP_REAR"
  | "FAST_REBOUND_FRONT" | "FAST_REBOUND_REAR"
  | "PACKER_FRONT" | "PACKER_REAR"
  | "DIFF_POWER" | "DIFF_COAST" | "DIFF_PRELOAD"
  | "WING_FRONT" | "WING_REAR"
  | "ABS" | "TRACTION_CONTROL" | "BRAKE_POWER" | "BRAKE_BIAS";

// Maps raw parameter keys from the car profile to their group
export const PARAM_KEY_TO_GROUP: Record<string, ParamGroup> = {
  ARB_FRONT:             "ARB_FRONT",
  ARB_REAR:              "ARB_REAR",
  SPRING_RATE_LF:        "SPRING_FRONT",
  SPRING_RATE_RF:        "SPRING_FRONT",
  SPRING_RATE_LR:        "SPRING_REAR",
  SPRING_RATE_RR:        "SPRING_REAR",
  ROD_LENGTH_LF:         "HEIGHT_FRONT",
  ROD_LENGTH_RF:         "HEIGHT_FRONT",
  ROD_LENGTH_LR:         "HEIGHT_REAR",
  ROD_LENGTH_RR:         "HEIGHT_REAR",
  CAMBER_LF:             "CAMBER_FRONT",
  CAMBER_RF:             "CAMBER_FRONT",
  CAMBER_LR:             "CAMBER_REAR",
  CAMBER_RR:             "CAMBER_REAR",
  TOE_OUT_LF:            "TOE_FRONT",
  TOE_OUT_RF:            "TOE_FRONT",
  TOE_OUT_LR:            "TOE_REAR",
  TOE_OUT_RR:            "TOE_REAR",
  DAMP_BUMP_LF:          "BUMP_FRONT",
  DAMP_BUMP_RF:          "BUMP_FRONT",
  DAMP_BUMP_LR:          "BUMP_REAR",
  DAMP_BUMP_RR:          "BUMP_REAR",
  DAMP_REBOUND_LF:       "REBOUND_FRONT",
  DAMP_REBOUND_RF:       "REBOUND_FRONT",
  DAMP_REBOUND_LR:       "REBOUND_REAR",
  DAMP_REBOUND_RR:       "REBOUND_REAR",
  DAMP_FAST_BUMP_LF:     "FAST_BUMP_FRONT",
  DAMP_FAST_BUMP_RF:     "FAST_BUMP_FRONT",
  DAMP_FAST_BUMP_LR:     "FAST_BUMP_REAR",
  DAMP_FAST_BUMP_RR:     "FAST_BUMP_REAR",
  DAMP_FAST_REBOUND_LF:  "FAST_REBOUND_FRONT",
  DAMP_FAST_REBOUND_RF:  "FAST_REBOUND_FRONT",
  DAMP_FAST_REBOUND_LR:  "FAST_REBOUND_REAR",
  DAMP_FAST_REBOUND_RR:  "FAST_REBOUND_REAR",
  PACKER_RANGE_LF:       "PACKER_FRONT",
  PACKER_RANGE_RF:       "PACKER_FRONT",
  PACKER_RANGE_LR:       "PACKER_REAR",
  PACKER_RANGE_RR:       "PACKER_REAR",
  DIFF_POWER:            "DIFF_POWER",
  DIFF_COAST:            "DIFF_COAST",
  DIFF_PRELOAD:          "DIFF_PRELOAD",
  WING_1:                "WING_FRONT",
  WING_2:                "WING_REAR",
  ABS:                   "ABS",
  TRACTION_CONTROL:      "TRACTION_CONTROL",
  BRAKE_POWER_MULT:      "BRAKE_POWER",
  FRONT_BIAS:            "BRAKE_BIAS",
};

type AttributeMap = Partial<Record<Attribute, number>>;
type GroupMap = Partial<Record<ParamGroup, AttributeMap>>;
type LayoutMap = Record<string, GroupMap>;
type ClassMap = Record<string, LayoutMap>;

// ── Coefficient Tables ────────────────────────────────────────

export const COEFFICIENTS: ClassMap = {

  // ════════════════════════════════════════════════════════════
  // MX5 CUP — Front Engine RWD
  // No aero, no diff, minimal electronics
  // Pure mechanical car — suspension and alignment dominate
  // ════════════════════════════════════════════════════════════
  MX5_CUP: {
    front_RWD: {

      ARB_FRONT: {
        turn_in:              +0.7,
        entry_rotation:       +0.5,
        mid_grip:             -0.4,
        rotation:             -0.3,
        kerb_compliance:      -0.6,
        tyre_wear:            +0.4,
      },

      ARB_REAR: {
        turn_in:              +0.4,
        entry_rotation:       +0.6,
        rotation:             +0.5,
        traction:             -0.5,
        brake_stability:      -0.4,
        tyre_wear:            +0.3,
      },

      SPRING_FRONT: {
        turn_in:              +0.5,
        entry_rotation:       +0.3,
        mid_grip:             -0.3,
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.7,
        tyre_wear:            +0.3,
      },

      SPRING_REAR: {
        traction:             -0.4,
        rotation:             -0.3,
        brake_stability:      +0.5,
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.5,
      },

      HEIGHT_FRONT: {
        turn_in:              +0.3,
        mid_grip:             +0.4,
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.5,
      },

      HEIGHT_REAR: {
        traction:             +0.3,
        brake_stability:      +0.3,
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.4,
      },

      CAMBER_FRONT: {
        turn_in:              +0.4,
        entry_rotation:       +0.3,
        mid_grip:             +0.7,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      CAMBER_REAR: {
        mid_grip:             +0.3,
        rotation:             +0.4,
        traction:             -0.3,
        tyre_wear:            +0.4,
      },

      TOE_FRONT: {
        turn_in:              +0.8,
        entry_rotation:       +0.5,
        brake_stability:      -0.5,
        top_speed:            -0.2,
        tyre_wear:            +0.6,
      },

      TOE_REAR: {
        brake_stability:      +0.6,
        high_speed_cornering: +0.7,
        fast_direction_change:+0.5,
        rotation:             -0.5,
        traction:             +0.3,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      BUMP_FRONT: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.6,
        brake_stability:      +0.3,
        fast_direction_change:+0.3,
      },

      BUMP_REAR: {
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.5,
        brake_stability:      +0.2,
        fast_direction_change:+0.3,
        traction:             +0.2,
      },

      REBOUND_FRONT: {
        kerb_compliance:      +0.5,
        high_speed_cornering: +0.3,
        fast_direction_change:+0.4,
        turn_in:              +0.2,
      },

      REBOUND_REAR: {
        kerb_compliance:      +0.5,
        high_speed_cornering: +0.3,
        fast_direction_change:+0.4,
        traction:             +0.3,
      },

      ABS: {
        brake_stability:      +0.8,
        entry_rotation:       -0.3,
      },

      TRACTION_CONTROL: {
        traction:             +0.7,
        tyre_wear:            -0.4,
        rotation:             -0.3,
      },

      BRAKE_POWER: {
        brake_stability:      -0.3,
        entry_rotation:       +0.2,
      },
    },
  },

  // ════════════════════════════════════════════════════════════
  // GT3 — Multiple layouts (front_RWD, mid_RWD, rear_RWD)
  // Has aero, diff, packers, fast dampers
  // Aero has major influence at GT3 speeds
  // ════════════════════════════════════════════════════════════
  GT3: {

    // ── Front Engine RWD (BMW Z4, Mercedes SLS, Nissan GTR) ──
    front_RWD: {

      WING_FRONT: {
        turn_in:              +0.6,
        entry_rotation:       +0.4,
        mid_grip:             +0.5,
        high_speed_cornering: +0.8,
        fast_direction_change:+0.5,
        top_speed:            -0.7,
        tyre_wear:            +0.2,
      },

      WING_REAR: {
        brake_stability:      +0.5,
        high_speed_cornering: +0.9,
        fast_direction_change:+0.6,
        traction:             +0.4,
        rotation:             -0.4,
        top_speed:            -0.8,
        tyre_wear:            +0.2,
      },

      ARB_FRONT: {
        turn_in:              +0.6,
        entry_rotation:       +0.4,
        mid_grip:             -0.3,
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.5,
        tyre_wear:            +0.3,
      },

      ARB_REAR: {
        turn_in:              +0.3,
        entry_rotation:       +0.5,
        rotation:             +0.4,
        traction:             -0.4,
        brake_stability:      -0.3,
        tyre_wear:            +0.3,
      },

      SPRING_FRONT: {
        turn_in:              +0.4,
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.6,
        mid_grip:             -0.2,
        tyre_wear:            +0.2,
      },

      SPRING_REAR: {
        brake_stability:      +0.4,
        high_speed_cornering: +0.5,
        traction:             -0.3,
        kerb_compliance:      -0.5,
        rotation:             -0.2,
      },

      HEIGHT_FRONT: {
        turn_in:              +0.3,
        mid_grip:             +0.3,
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.4,
        top_speed:            +0.2,
      },

      HEIGHT_REAR: {
        traction:             +0.2,
        brake_stability:      +0.3,
        high_speed_cornering: +0.4,
        top_speed:            +0.2,
      },

      CAMBER_FRONT: {
        turn_in:              +0.4,
        entry_rotation:       +0.3,
        mid_grip:             +0.7,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      CAMBER_REAR: {
        mid_grip:             +0.3,
        rotation:             +0.4,
        traction:             -0.2,
        tyre_wear:            +0.4,
      },

      TOE_FRONT: {
        turn_in:              +0.7,
        entry_rotation:       +0.4,
        brake_stability:      -0.4,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      TOE_REAR: {
        brake_stability:      +0.6,
        high_speed_cornering: +0.7,
        fast_direction_change:+0.5,
        rotation:             -0.5,
        traction:             +0.3,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      BUMP_FRONT: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.6,
        brake_stability:      +0.4,
        fast_direction_change:+0.4,
      },

      BUMP_REAR: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.5,
        traction:             +0.2,
        fast_direction_change:+0.3,
      },

      REBOUND_FRONT: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.4,
        high_speed_cornering: +0.3,
        turn_in:              +0.2,
      },

      REBOUND_REAR: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.4,
        traction:             +0.3,
        high_speed_cornering: +0.3,
      },

      FAST_BUMP_FRONT: {
        high_speed_cornering: +0.6,
        kerb_compliance:      -0.7,
        fast_direction_change:+0.3,
      },

      FAST_BUMP_REAR: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.6,
        traction:             +0.2,
      },

      FAST_REBOUND_FRONT: {
        kerb_compliance:      +0.6,
        fast_direction_change:+0.5,
        high_speed_cornering: +0.2,
      },

      FAST_REBOUND_REAR: {
        kerb_compliance:      +0.6,
        fast_direction_change:+0.4,
        traction:             +0.3,
      },

      PACKER_FRONT: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.8,
        brake_stability:      +0.3,
      },

      PACKER_REAR: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.7,
        traction:             +0.2,
      },

      DIFF_POWER: {
        traction:             +0.8,
        rotation:             -0.4,
        tyre_wear:            +0.4,
        fast_direction_change:-0.2,
      },

      DIFF_COAST: {
        entry_rotation:       +0.6,
        rotation:             +0.5,
        brake_stability:      -0.3,
        tyre_wear:            +0.3,
      },

      ABS: {
        brake_stability:      +0.7,
        entry_rotation:       -0.2,
      },

      TRACTION_CONTROL: {
        traction:             +0.7,
        tyre_wear:            -0.4,
        rotation:             -0.3,
      },

      BRAKE_POWER: {
        brake_stability:      -0.3,
        entry_rotation:       +0.2,
      },

      BRAKE_BIAS: {
        brake_stability:      +0.5,
        entry_rotation:       +0.3,
        rotation:             +0.2,
        traction:             -0.2,
      },
    },

    // ── Mid Engine RWD (Ferrari 488, McLaren 650S, Lamborghini) ──
    // Mid engine = more neutral balance, more rotation available
    // More sensitive to rear aero, diff more powerful
    mid_RWD: {

      WING_FRONT: {
        turn_in:              +0.7,  // mid engine front is lighter, aero matters more
        entry_rotation:       +0.5,
        mid_grip:             +0.6,
        high_speed_cornering: +0.8,
        fast_direction_change:+0.6,
        top_speed:            -0.7,
        tyre_wear:            +0.2,
      },

      WING_REAR: {
        brake_stability:      +0.4,  // rear already heavy, less stability gain from rear wing
        high_speed_cornering: +0.9,
        fast_direction_change:+0.7,
        traction:             +0.5,
        rotation:             -0.5,  // rear wing kills rotation more on mid engine
        top_speed:            -0.8,
        tyre_wear:            +0.2,
      },

      ARB_FRONT: {
        turn_in:              +0.7,  // mid engine front end more responsive to ARB
        entry_rotation:       +0.5,
        mid_grip:             -0.4,
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.5,
        tyre_wear:            +0.4,
      },

      ARB_REAR: {
        turn_in:              +0.4,
        entry_rotation:       +0.7,  // rear ARB more powerful on mid engine
        rotation:             +0.6,
        traction:             -0.5,
        brake_stability:      -0.4,
        tyre_wear:            +0.4,
      },

      SPRING_FRONT: {
        turn_in:              +0.5,
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.6,
        mid_grip:             -0.3,
        tyre_wear:            +0.2,
      },

      SPRING_REAR: {
        brake_stability:      +0.3,
        high_speed_cornering: +0.5,
        traction:             -0.4,  // mid engine rear more sensitive to rear spring
        kerb_compliance:      -0.5,
        rotation:             -0.3,
      },

      HEIGHT_FRONT: {
        turn_in:              +0.4,
        mid_grip:             +0.4,
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.4,
        top_speed:            +0.2,
      },

      HEIGHT_REAR: {
        traction:             +0.3,
        brake_stability:      +0.2,
        high_speed_cornering: +0.5,
        top_speed:            +0.2,
      },

      CAMBER_FRONT: {
        turn_in:              +0.5,
        entry_rotation:       +0.4,
        mid_grip:             +0.7,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      CAMBER_REAR: {
        mid_grip:             +0.4,
        rotation:             +0.5,  // mid engine rear camber more impactful
        traction:             -0.3,
        tyre_wear:            +0.4,
      },

      TOE_FRONT: {
        turn_in:              +0.8,
        entry_rotation:       +0.5,
        brake_stability:      -0.4,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      TOE_REAR: {
        brake_stability:      +0.5,
        high_speed_cornering: +0.6,
        fast_direction_change:+0.5,
        rotation:             -0.6,  // mid engine very sensitive to rear toe
        traction:             +0.3,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      BUMP_FRONT: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.6,
        brake_stability:      +0.3,
        fast_direction_change:+0.4,
      },

      BUMP_REAR: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.5,
        traction:             +0.3,
        fast_direction_change:+0.4,
      },

      REBOUND_FRONT: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.5,
        high_speed_cornering: +0.3,
        turn_in:              +0.2,
      },

      REBOUND_REAR: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.5,
        traction:             +0.4,
        high_speed_cornering: +0.3,
      },

      FAST_BUMP_FRONT: {
        high_speed_cornering: +0.6,
        kerb_compliance:      -0.7,
        fast_direction_change:+0.4,
      },

      FAST_BUMP_REAR: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.6,
        traction:             +0.3,
      },

      FAST_REBOUND_FRONT: {
        kerb_compliance:      +0.6,
        fast_direction_change:+0.6,
        high_speed_cornering: +0.3,
      },

      FAST_REBOUND_REAR: {
        kerb_compliance:      +0.6,
        fast_direction_change:+0.5,
        traction:             +0.4,
      },

      PACKER_FRONT: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.8,
        brake_stability:      +0.3,
      },

      PACKER_REAR: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.7,
        traction:             +0.3,
      },

      DIFF_POWER: {
        traction:             +0.7,
        rotation:             -0.5,  // mid engine diff power kills rotation more
        tyre_wear:            +0.5,
        fast_direction_change:-0.3,
      },

      DIFF_COAST: {
        entry_rotation:       +0.7,  // mid engine coast diff very powerful for rotation
        rotation:             +0.6,
        brake_stability:      -0.4,
        tyre_wear:            +0.3,
      },

      ABS: {
        brake_stability:      +0.7,
        entry_rotation:       -0.2,
      },

      TRACTION_CONTROL: {
        traction:             +0.7,
        tyre_wear:            -0.4,
        rotation:             -0.4,
      },

      BRAKE_POWER: {
        brake_stability:      -0.3,
        entry_rotation:       +0.2,
      },

      BRAKE_BIAS: {
        brake_stability:      +0.5,
        entry_rotation:       +0.3,
        rotation:             +0.2,
        traction:             -0.2,
      },
    },

    // ── Rear Engine RWD (Porsche 911 GT3 R) ──
    // Rear engine = naturally more oversteer tendency
    // Rear aero critical for stability, front wing less impactful
    // Rear ARB very powerful, diff less critical than mid engine
    rear_RWD: {

      WING_FRONT: {
        turn_in:              +0.8,  // front wing critical on rear engine — it's the only front downforce
        entry_rotation:       +0.6,
        mid_grip:             +0.7,
        high_speed_cornering: +0.7,
        fast_direction_change:+0.5,
        top_speed:            -0.6,
        tyre_wear:            +0.2,
      },

      WING_REAR: {
        brake_stability:      +0.7,  // rear stability is the priority for rear engine
        high_speed_cornering: +0.9,
        fast_direction_change:+0.5,
        traction:             +0.6,
        rotation:             -0.6,  // more rear wing = much less rotation on 911
        top_speed:            -0.8,
        tyre_wear:            +0.2,
      },

      ARB_FRONT: {
        turn_in:              +0.5,
        entry_rotation:       +0.3,
        mid_grip:             -0.2,
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.5,
        tyre_wear:            +0.3,
      },

      ARB_REAR: {
        turn_in:              +0.3,
        entry_rotation:       +0.5,
        rotation:             +0.7,  // rear ARB extremely powerful on rear engine
        traction:             -0.6,  // but kills traction significantly
        brake_stability:      -0.6,
        tyre_wear:            +0.5,
      },

      SPRING_FRONT: {
        turn_in:              +0.4,
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.5,
        mid_grip:             -0.2,
        tyre_wear:            +0.2,
      },

      SPRING_REAR: {
        brake_stability:      +0.5,  // rear spring critical for stability on 911
        high_speed_cornering: +0.6,
        traction:             -0.5,
        kerb_compliance:      -0.5,
        rotation:             -0.4,
      },

      HEIGHT_FRONT: {
        turn_in:              +0.3,
        mid_grip:             +0.3,
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.4,
        top_speed:            +0.2,
      },

      HEIGHT_REAR: {
        traction:             +0.4,  // rear height critical for rear engine aero platform
        brake_stability:      +0.4,
        high_speed_cornering: +0.5,
        top_speed:            +0.2,
      },

      CAMBER_FRONT: {
        turn_in:              +0.5,
        entry_rotation:       +0.4,
        mid_grip:             +0.7,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      CAMBER_REAR: {
        mid_grip:             +0.4,
        rotation:             +0.3,  // rear camber less rotation-sensitive on 911
        traction:             -0.2,
        brake_stability:      +0.2,
        tyre_wear:            +0.4,
      },

      TOE_FRONT: {
        turn_in:              +0.7,
        entry_rotation:       +0.4,
        brake_stability:      -0.5,  // toe-out front very nervous on rear engine
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      TOE_REAR: {
        brake_stability:      +0.7,  // rear toe-in critical for 911 stability
        high_speed_cornering: +0.8,
        fast_direction_change:+0.5,
        rotation:             -0.6,
        traction:             +0.4,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      BUMP_FRONT: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.5,
        brake_stability:      +0.3,
        fast_direction_change:+0.3,
      },

      BUMP_REAR: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.5,
        brake_stability:      +0.4,  // rear bump more impactful for stability on 911
        fast_direction_change:+0.3,
        traction:             +0.3,
      },

      REBOUND_FRONT: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.4,
        high_speed_cornering: +0.3,
        turn_in:              +0.2,
      },

      REBOUND_REAR: {
        kerb_compliance:      +0.4,
        fast_direction_change:+0.3,
        traction:             +0.4,
        brake_stability:      +0.3,
        high_speed_cornering: +0.3,
      },

      FAST_BUMP_FRONT: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.7,
        fast_direction_change:+0.3,
      },

      FAST_BUMP_REAR: {
        high_speed_cornering: +0.6,
        kerb_compliance:      -0.6,
        brake_stability:      +0.4,
        traction:             +0.2,
      },

      FAST_REBOUND_FRONT: {
        kerb_compliance:      +0.6,
        fast_direction_change:+0.5,
        high_speed_cornering: +0.3,
      },

      FAST_REBOUND_REAR: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.4,
        brake_stability:      +0.4,
        traction:             +0.3,
        high_speed_cornering: +0.3,
      },

      PACKER_FRONT: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.8,
        brake_stability:      +0.2,
      },

      PACKER_REAR: {
        high_speed_cornering: +0.5,
        kerb_compliance:      -0.7,
        brake_stability:      +0.4,
        traction:             +0.3,
      },

      DIFF_POWER: {
        traction:             +0.6,
        rotation:             -0.3,  // diff less critical on rear engine
        tyre_wear:            +0.3,
        fast_direction_change:-0.2,
      },

      DIFF_COAST: {
        entry_rotation:       +0.5,
        rotation:             +0.4,
        brake_stability:      -0.5,  // coast diff destabilises rear engine more
        tyre_wear:            +0.3,
      },

      ABS: {
        brake_stability:      +0.7,
        entry_rotation:       -0.2,
      },

      TRACTION_CONTROL: {
        traction:             +0.7,
        tyre_wear:            -0.4,
        rotation:             -0.3,
      },

      BRAKE_POWER: {
        brake_stability:      -0.4,  // rear engine more sensitive to brake power
        entry_rotation:       +0.2,
      },

      BRAKE_BIAS: {
        brake_stability:      +0.6,  // brake bias very important on rear engine
        entry_rotation:       +0.4,
        rotation:             +0.3,
        traction:             -0.2,
      },
    },
  },

  // ════════════════════════════════════════════════════════════
  // TCR — Front Engine FWD
  // No rear diff (open or LSD on front axle only)
  // Rear aero minimal or absent
  // Traction is everything — front axle does steering AND power
  // ════════════════════════════════════════════════════════════
  TCR: {
    front_FWD: {

      WING_FRONT: {
        turn_in:              +0.5,
        entry_rotation:       +0.3,
        mid_grip:             +0.6,
        high_speed_cornering: +0.7,
        fast_direction_change:+0.4,
        top_speed:            -0.6,
        tyre_wear:            +0.3,
      },

      WING_REAR: {
        brake_stability:      +0.6,
        high_speed_cornering: +0.8,
        fast_direction_change:+0.5,
        rotation:             -0.3,
        top_speed:            -0.7,
        tyre_wear:            +0.2,
      },

      ARB_FRONT: {
        turn_in:              +0.5,
        entry_rotation:       +0.3,
        mid_grip:             -0.5,  // FWD front ARB kills front grip significantly
        traction:             -0.6,  // stiffer front ARB kills FWD traction
        kerb_compliance:      -0.5,
        tyre_wear:            +0.5,
      },

      ARB_REAR: {
        turn_in:              +0.6,  // rear ARB is FWD driver's main rotation tool
        entry_rotation:       +0.8,
        rotation:             +0.7,
        traction:             +0.3,  // oddly helps traction by unloading inside rear
        brake_stability:      -0.3,
        tyre_wear:            +0.2,
      },

      SPRING_FRONT: {
        turn_in:              +0.3,
        high_speed_cornering: +0.4,
        mid_grip:             -0.4,
        traction:             -0.5,  // stiff front spring hurts FWD traction
        kerb_compliance:      -0.6,
        tyre_wear:            +0.4,
      },

      SPRING_REAR: {
        turn_in:              +0.4,  // stiffer rear helps rotation on FWD
        entry_rotation:       +0.3,
        brake_stability:      +0.4,
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.4,
      },

      HEIGHT_FRONT: {
        mid_grip:             +0.3,
        traction:             +0.3,
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.4,
      },

      HEIGHT_REAR: {
        turn_in:              +0.3,  // lower rear helps FWD rotation
        entry_rotation:       +0.2,
        brake_stability:      +0.2,
        high_speed_cornering: +0.3,
      },

      CAMBER_FRONT: {
        turn_in:              +0.4,
        mid_grip:             +0.7,
        traction:             +0.5,  // front camber critical for FWD traction
        entry_rotation:       +0.3,
        top_speed:            -0.2,
        tyre_wear:            +0.6,
      },

      CAMBER_REAR: {
        brake_stability:      +0.3,
        high_speed_cornering: +0.3,
        turn_in:              +0.2,
        tyre_wear:            +0.3,
      },

      TOE_FRONT: {
        turn_in:              +0.7,
        entry_rotation:       +0.5,
        traction:             -0.6,  // toe-out front kills FWD traction
        brake_stability:      -0.4,
        top_speed:            -0.3,
        tyre_wear:            +0.7,  // toe destroys front tyres on FWD
      },

      TOE_REAR: {
        brake_stability:      +0.5,
        high_speed_cornering: +0.6,
        fast_direction_change:+0.4,
        rotation:             -0.4,
        traction:             +0.2,
        top_speed:            -0.2,
        tyre_wear:            +0.4,
      },

      BUMP_FRONT: {
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.5,
        traction:             -0.2,
        fast_direction_change:+0.3,
      },

      BUMP_REAR: {
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.4,
        brake_stability:      +0.2,
        fast_direction_change:+0.3,
      },

      REBOUND_FRONT: {
        kerb_compliance:      +0.5,
        traction:             +0.4,  // front rebound critical for FWD traction recovery
        fast_direction_change:+0.3,
      },

      REBOUND_REAR: {
        kerb_compliance:      +0.4,
        fast_direction_change:+0.4,
        high_speed_cornering: +0.3,
        turn_in:              +0.2,
      },

      FAST_BUMP_FRONT: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.6,
        traction:             -0.2,
      },

      FAST_BUMP_REAR: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.5,
        brake_stability:      +0.2,
      },

      FAST_REBOUND_FRONT: {
        kerb_compliance:      +0.6,
        traction:             +0.4,
        fast_direction_change:+0.3,
      },

      FAST_REBOUND_REAR: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.4,
        high_speed_cornering: +0.2,
      },

      PACKER_FRONT: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.7,
        traction:             -0.2,
      },

      PACKER_REAR: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.6,
        brake_stability:      +0.3,
      },

      DIFF_POWER: {
        traction:             +0.9,  // power diff is everything on FWD
        rotation:             -0.5,  // locked diff = understeer under power
        tyre_wear:            +0.6,
        fast_direction_change:-0.3,
      },

      DIFF_COAST: {
        entry_rotation:       +0.5,
        rotation:             +0.4,
        traction:             +0.3,
        brake_stability:      -0.2,
        tyre_wear:            +0.3,
      },

      ABS: {
        brake_stability:      +0.7,
        entry_rotation:       -0.3,
      },

      TRACTION_CONTROL: {
        traction:             +0.8,  // TC even more critical on FWD
        tyre_wear:            -0.5,
        rotation:             -0.4,
      },

      BRAKE_POWER: {
        brake_stability:      -0.3,
        entry_rotation:       +0.2,
        traction:             -0.2,
      },

      BRAKE_BIAS: {
        brake_stability:      +0.4,
        entry_rotation:       +0.5,  // brake bias very impactful for FWD rotation
        rotation:             +0.4,
        traction:             -0.3,
      },
    },
  },

  // ════════════════════════════════════════════════════════════
  // GT4 — Front Engine RWD
  // Less powerful than GT3, less aero, simpler diff
  // More mechanical, closer to MX5 in character than GT3
  // ════════════════════════════════════════════════════════════
  GT4: {
    front_RWD: {

      WING_FRONT: {
        turn_in:              +0.5,
        entry_rotation:       +0.3,
        mid_grip:             +0.4,
        high_speed_cornering: +0.6,
        fast_direction_change:+0.4,
        top_speed:            -0.6,
        tyre_wear:            +0.2,
      },

      WING_REAR: {
        brake_stability:      +0.5,
        high_speed_cornering: +0.7,
        fast_direction_change:+0.5,
        traction:             +0.4,
        rotation:             -0.4,
        top_speed:            -0.7,
        tyre_wear:            +0.2,
      },

      ARB_FRONT: {
        turn_in:              +0.6,
        entry_rotation:       +0.4,
        mid_grip:             -0.3,
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.6,
        tyre_wear:            +0.3,
      },

      ARB_REAR: {
        turn_in:              +0.3,
        entry_rotation:       +0.5,
        rotation:             +0.5,
        traction:             -0.4,
        brake_stability:      -0.3,
        tyre_wear:            +0.3,
      },

      SPRING_FRONT: {
        turn_in:              +0.4,
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.6,
        mid_grip:             -0.2,
        tyre_wear:            +0.2,
      },

      SPRING_REAR: {
        brake_stability:      +0.4,
        high_speed_cornering: +0.4,
        traction:             -0.3,
        kerb_compliance:      -0.5,
        rotation:             -0.2,
      },

      HEIGHT_FRONT: {
        turn_in:              +0.3,
        mid_grip:             +0.3,
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.4,
        top_speed:            +0.1,
      },

      HEIGHT_REAR: {
        traction:             +0.2,
        brake_stability:      +0.3,
        high_speed_cornering: +0.3,
        top_speed:            +0.1,
      },

      CAMBER_FRONT: {
        turn_in:              +0.4,
        entry_rotation:       +0.3,
        mid_grip:             +0.7,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      CAMBER_REAR: {
        mid_grip:             +0.3,
        rotation:             +0.4,
        traction:             -0.2,
        tyre_wear:            +0.4,
      },

      TOE_FRONT: {
        turn_in:              +0.7,
        entry_rotation:       +0.4,
        brake_stability:      -0.4,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      TOE_REAR: {
        brake_stability:      +0.6,
        high_speed_cornering: +0.7,
        fast_direction_change:+0.5,
        rotation:             -0.5,
        traction:             +0.3,
        top_speed:            -0.2,
        tyre_wear:            +0.5,
      },

      BUMP_FRONT: {
        high_speed_cornering: +0.4,
        kerb_compliance:      -0.6,
        brake_stability:      +0.3,
        fast_direction_change:+0.3,
      },

      BUMP_REAR: {
        high_speed_cornering: +0.3,
        kerb_compliance:      -0.5,
        traction:             +0.2,
        fast_direction_change:+0.3,
      },

      REBOUND_FRONT: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.4,
        high_speed_cornering: +0.3,
        turn_in:              +0.2,
      },

      REBOUND_REAR: {
        kerb_compliance:      +0.5,
        fast_direction_change:+0.4,
        traction:             +0.3,
        high_speed_cornering: +0.3,
      },

      DIFF_POWER: {
        traction:             +0.7,
        rotation:             -0.4,
        tyre_wear:            +0.4,
        fast_direction_change:-0.2,
      },

      DIFF_COAST: {
        entry_rotation:       +0.5,
        rotation:             +0.4,
        brake_stability:      -0.3,
        tyre_wear:            +0.3,
      },

      ABS: {
        brake_stability:      +0.7,
        entry_rotation:       -0.2,
      },

      TRACTION_CONTROL: {
        traction:             +0.7,
        tyre_wear:            -0.4,
        rotation:             -0.3,
      },

      BRAKE_POWER: {
        brake_stability:      -0.3,
        entry_rotation:       +0.2,
      },

      BRAKE_BIAS: {
        brake_stability:      +0.5,
        entry_rotation:       +0.3,
        rotation:             +0.2,
        traction:             -0.2,
      },
    },
  },
};

// ── Lookup ────────────────────────────────────────────────────

export function getCoefficients(
  carClass: string,
  engineLayout: string,
  drive: string
): GroupMap {
  const layoutKey = `${engineLayout}_${drive}`;
  return COEFFICIENTS[carClass]?.[layoutKey] ?? {};
}

/**
 * Given a parameter key, a normalized delta (0-1), and the car's
 * class/layout/drive, returns a map of attribute changes.
 *
 * normalizedDelta = (currentValue - baselineValue) / (max - min)
 */
export function calculateAttributeDeltas(
  paramKey: string,
  normalizedDelta: number,
  carClass: string,
  engineLayout: string,
  drive: string
): Partial<Record<Attribute, number>> {
  const group = PARAM_KEY_TO_GROUP[paramKey];
  if (!group) return {};

  const coeffs = getCoefficients(carClass, engineLayout, drive);
  const groupCoeffs = coeffs[group];
  if (!groupCoeffs) return {};

  const result: Partial<Record<Attribute, number>> = {};
  for (const [attr, weight] of Object.entries(groupCoeffs)) {
    result[attr as Attribute] = normalizedDelta * weight;
  }
  return result;
}

/**
 * Returns tiers for a given attribute based on coefficient magnitude.
 * Used by the parameter guide feature.
 *
 * Tier 1: |coefficient| >= 0.6  (most impactful)
 * Tier 2: |coefficient| >= 0.3  (meaningful)
 * Tier 3: |coefficient| >= 0.1  (fine tuning)
 */
export function getAttributeGuide(
  attribute: Attribute,
  carClass: string,
  engineLayout: string,
  drive: string
): { tier: 1 | 2 | 3; group: ParamGroup; coefficient: number }[] {
  const coeffs = getCoefficients(carClass, engineLayout, drive);
  const results: { tier: 1 | 2 | 3; group: ParamGroup; coefficient: number }[] = [];

  for (const [group, attrMap] of Object.entries(coeffs)) {
    const coeff = (attrMap as AttributeMap)[attribute];
    if (coeff === undefined) continue;
    const abs = Math.abs(coeff);
    if (abs < 0.1) continue;

    const tier: 1 | 2 | 3 = abs >= 0.6 ? 1 : abs >= 0.3 ? 2 : 3;
    results.push({ tier, group: group as ParamGroup, coefficient: coeff });
  }

  return results.sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient));
}
