import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BXhHTqg_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SIMULATORS = [
	{
		id: "ac",
		name: "Assetto Corsa"
	},
	{
		id: "acc",
		name: "Assetto Corsa Competizione"
	},
	{
		id: "iracing",
		name: "iRacing"
	},
	{
		id: "lmu",
		name: "Le Mans Ultimate"
	},
	{
		id: "rre",
		name: "RaceRoom"
	},
	{
		id: "pcars",
		name: "Project Cars"
	}
];
var LAYOUTS = [
	{
		id: "fr_rwd",
		name: "Front Engine RWD"
	},
	{
		id: "mr_rwd",
		name: "Mid Engine RWD"
	},
	{
		id: "rr_rwd",
		name: "Rear Engine RWD"
	},
	{
		id: "fr_fwd",
		name: "Front Engine FWD"
	}
];
var CHARACTERISTICS = [
	{
		key: "turnIn",
		label: "Turn In"
	},
	{
		key: "entryRotation",
		label: "Entry Rotation"
	},
	{
		key: "midCornerGrip",
		label: "Mid Corner Grip"
	},
	{
		key: "rotation",
		label: "Rotation"
	},
	{
		key: "traction",
		label: "Traction"
	},
	{
		key: "brakingStability",
		label: "Braking Stability"
	},
	{
		key: "highSpeedStability",
		label: "High Speed Stability"
	},
	{
		key: "kerbCompliance",
		label: "Kerb Compliance"
	},
	{
		key: "bumpCompliance",
		label: "Bump Compliance"
	},
	{
		key: "tyreWear",
		label: "Tyre Wear"
	}
];
var SETTINGS = [
	{
		key: "front_wing",
		label: "Front Wing",
		tier: 1,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 4
	},
	{
		key: "rear_wing",
		label: "Rear Wing",
		tier: 1,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 6
	},
	{
		key: "ride_height_front",
		label: "Ride Height Front",
		tier: 1,
		unit: "mm",
		unitStep: 1,
		defaultBaseline: 55
	},
	{
		key: "ride_height_rear",
		label: "Ride Height Rear",
		tier: 1,
		unit: "mm",
		unitStep: 1,
		defaultBaseline: 65
	},
	{
		key: "front_spring",
		label: "Front Spring",
		tier: 1,
		unit: "N/mm",
		unitStep: 10,
		defaultBaseline: 160
	},
	{
		key: "rear_spring",
		label: "Rear Spring",
		tier: 1,
		unit: "N/mm",
		unitStep: 10,
		defaultBaseline: 150
	},
	{
		key: "front_arb",
		label: "Front ARB",
		tier: 1,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 4
	},
	{
		key: "rear_arb",
		label: "Rear ARB",
		tier: 1,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 4
	},
	{
		key: "differential",
		label: "Differential",
		tier: 1,
		unit: "%",
		unitStep: 5,
		defaultBaseline: 40
	},
	{
		key: "front_camber",
		label: "Front Camber",
		tier: 2,
		unit: "°",
		unitStep: .1,
		defaultBaseline: -3.5
	},
	{
		key: "rear_camber",
		label: "Rear Camber",
		tier: 2,
		unit: "°",
		unitStep: .1,
		defaultBaseline: -3
	},
	{
		key: "front_toe",
		label: "Front Toe",
		tier: 2,
		unit: "°",
		unitStep: .05,
		defaultBaseline: .05
	},
	{
		key: "rear_toe",
		label: "Rear Toe",
		tier: 2,
		unit: "°",
		unitStep: .05,
		defaultBaseline: .15
	},
	{
		key: "front_bump",
		label: "Front Bump",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 10
	},
	{
		key: "rear_bump",
		label: "Rear Bump",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 10
	},
	{
		key: "front_rebound",
		label: "Front Rebound",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 12
	},
	{
		key: "rear_rebound",
		label: "Rear Rebound",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 12
	},
	{
		key: "front_fast_bump",
		label: "Front Fast Bump",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 6
	},
	{
		key: "rear_fast_bump",
		label: "Rear Fast Bump",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 6
	},
	{
		key: "front_fast_rebound",
		label: "Front Fast Rebound",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 8
	},
	{
		key: "rear_fast_rebound",
		label: "Rear Fast Rebound",
		tier: 3,
		unit: "clicks",
		unitStep: 1,
		defaultBaseline: 8
	},
	{
		key: "front_travel_range",
		label: "Front Travel Range",
		tier: 3,
		unit: "mm",
		unitStep: 1,
		defaultBaseline: 50
	},
	{
		key: "rear_travel_range",
		label: "Rear Travel Range",
		tier: 3,
		unit: "mm",
		unitStep: 1,
		defaultBaseline: 55
	}
];
var TIER_LABELS = {
	1: "Tier 1 — Core Mechanical",
	2: "Tier 2 — Alignment",
	3: "Tier 3 — Damper Dynamics"
};
var COEFFICIENTS = {
	front_wing: {
		turnIn: .9,
		entryRotation: .3,
		midCornerGrip: .7,
		rotation: .5,
		traction: -.1,
		brakingStability: .4,
		highSpeedStability: .5,
		tyreWear: .2
	},
	rear_wing: {
		turnIn: -.3,
		entryRotation: -.5,
		midCornerGrip: .6,
		rotation: -.6,
		traction: .9,
		brakingStability: .8,
		highSpeedStability: 1,
		tyreWear: .2
	},
	ride_height_front: {
		turnIn: -.4,
		entryRotation: -.3,
		midCornerGrip: -.2,
		rotation: -.3,
		traction: .1,
		brakingStability: .1,
		highSpeedStability: .2,
		bumpCompliance: .3,
		kerbCompliance: .2
	},
	ride_height_rear: {
		turnIn: .3,
		entryRotation: .4,
		midCornerGrip: -.1,
		rotation: .5,
		traction: -.4,
		brakingStability: -.3,
		highSpeedStability: -.4,
		bumpCompliance: .3,
		kerbCompliance: .2
	},
	front_spring: {
		turnIn: .5,
		entryRotation: .3,
		midCornerGrip: -.2,
		rotation: .3,
		traction: 0,
		brakingStability: .2,
		highSpeedStability: .3,
		bumpCompliance: -.5,
		kerbCompliance: -.6,
		tyreWear: .1
	},
	rear_spring: {
		turnIn: -.2,
		entryRotation: -.3,
		midCornerGrip: -.2,
		rotation: -.4,
		traction: -.5,
		brakingStability: .2,
		highSpeedStability: .2,
		bumpCompliance: -.5,
		kerbCompliance: -.6,
		tyreWear: .1
	},
	front_arb: {
		turnIn: .4,
		entryRotation: .3,
		midCornerGrip: -.3,
		rotation: .4,
		traction: .1,
		brakingStability: .1,
		highSpeedStability: .2,
		kerbCompliance: -.3
	},
	rear_arb: {
		turnIn: -.2,
		entryRotation: -.3,
		midCornerGrip: -.3,
		rotation: -.5,
		traction: -.4,
		brakingStability: .2,
		highSpeedStability: .1,
		kerbCompliance: -.3
	},
	differential: {
		turnIn: -.3,
		entryRotation: -.4,
		midCornerGrip: .2,
		rotation: -.5,
		traction: .9,
		brakingStability: .3,
		highSpeedStability: .3,
		tyreWear: .3
	},
	front_camber: {
		turnIn: -.3,
		midCornerGrip: -.4,
		rotation: -.2,
		brakingStability: .3,
		tyreWear: .4
	},
	rear_camber: {
		midCornerGrip: -.3,
		rotation: .2,
		traction: -.3,
		tyreWear: .4
	},
	front_toe: {
		turnIn: -.6,
		entryRotation: -.4,
		highSpeedStability: .5,
		tyreWear: .3
	},
	rear_toe: {
		rotation: -.6,
		traction: .4,
		highSpeedStability: .5,
		tyreWear: .3
	},
	front_bump: {
		turnIn: .2,
		entryRotation: .1,
		bumpCompliance: -.4,
		kerbCompliance: -.3
	},
	rear_bump: {
		rotation: -.2,
		traction: -.2,
		bumpCompliance: -.4,
		kerbCompliance: -.3
	},
	front_rebound: {
		brakingStability: .2,
		midCornerGrip: -.1,
		bumpCompliance: -.3,
		kerbCompliance: -.3
	},
	rear_rebound: {
		traction: -.2,
		rotation: .1,
		bumpCompliance: -.3,
		kerbCompliance: -.3
	},
	front_fast_bump: {
		bumpCompliance: -.6,
		kerbCompliance: -.5,
		highSpeedStability: .2
	},
	rear_fast_bump: {
		bumpCompliance: -.6,
		kerbCompliance: -.5,
		traction: -.1
	},
	front_fast_rebound: {
		bumpCompliance: -.4,
		kerbCompliance: -.4,
		brakingStability: .1
	},
	rear_fast_rebound: {
		bumpCompliance: -.4,
		kerbCompliance: -.4,
		traction: -.1
	},
	front_travel_range: {
		bumpCompliance: .3,
		kerbCompliance: .2,
		highSpeedStability: -.1
	},
	rear_travel_range: {
		bumpCompliance: .3,
		kerbCompliance: .2,
		traction: .1,
		highSpeedStability: -.1
	}
};
/** Multipliers per layout — emphasizes traction/rotation traits per drivetrain. */
var LAYOUT_MULTIPLIERS = {
	fr_rwd: {
		traction: 1,
		rotation: 1,
		brakingStability: 1.1,
		entryRotation: .9
	},
	mr_rwd: {
		traction: 1.1,
		rotation: 1.15,
		brakingStability: 1,
		entryRotation: 1.1
	},
	rr_rwd: {
		traction: 1.25,
		rotation: 1.1,
		brakingStability: .85,
		entryRotation: 1.2
	},
	fr_fwd: {
		traction: .85,
		rotation: .85,
		brakingStability: 1,
		entryRotation: .8,
		turnIn: 1.1
	}
};
function makeDefaultValues() {
	const out = {};
	for (const s of SETTINGS) out[s.key] = {
		baseline: s.defaultBaseline,
		current: s.defaultBaseline
	};
	return out;
}
/** All characteristics start at a neutral 50 (baseline). Deltas push around that. */
var NEUTRAL = 50;
function computeScores(values, layout) {
	const scores = {};
	for (const c of CHARACTERISTICS) scores[c.key] = {
		baseline: NEUTRAL,
		current: NEUTRAL,
		delta: 0
	};
	const mult = LAYOUT_MULTIPLIERS[layout];
	for (const s of SETTINGS) {
		const v = values[s.key];
		if (!v) continue;
		const deltaUnits = (v.current - v.baseline) / s.unitStep;
		if (deltaUnits === 0) continue;
		const row = COEFFICIENTS[s.key];
		for (const key of Object.keys(row)) {
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
function clamp(n, lo, hi) {
	return Math.max(lo, Math.min(hi, n));
}
var CHARACTERISTIC_GROUPS = [
	{
		title: "Corner Entry",
		items: [
			{
				key: "turnIn",
				label: "Turn In"
			},
			{
				key: "entryRotation",
				label: "Entry Rotation"
			},
			{
				key: "brakingStability",
				label: "Braking Stability"
			}
		]
	},
	{
		title: "Mid Corner",
		items: [{
			key: "midCornerGrip",
			label: "Mid Corner Grip"
		}, {
			key: "rotation",
			label: "Rotation"
		}]
	},
	{
		title: "Corner Exit",
		items: [{
			key: "traction",
			label: "Traction"
		}, {
			key: "highSpeedStability",
			label: "Exit Stability"
		}]
	},
	{
		title: "Kerbs & Bumps",
		items: [{
			key: "kerbCompliance",
			label: "Kerb Compliance"
		}, {
			key: "bumpCompliance",
			label: "Bump Compliance"
		}]
	},
	{
		title: "Fast & Sweeping Corners",
		items: [{
			key: "highSpeedStability",
			label: "High Speed Stability"
		}, {
			key: "brakingStability",
			label: "Confidence"
		}]
	}
];
/** Generates a setup character summary paragraph from the deltas. */
function generateSummary(scores) {
	const deltas = Object.keys(scores).map((k) => ({
		key: k,
		label: labelFor(k),
		d: scores[k].delta
	})).filter((x) => Math.abs(x.d) >= 1.5).sort((a, b) => Math.abs(b.d) - Math.abs(a.d));
	if (deltas.length === 0) return "The current setup mirrors the baseline. No meaningful change in vehicle behavior is expected — use this as a reference point before making adjustments.";
	const gains = deltas.filter((x) => x.d > 0).slice(0, 3);
	const losses = deltas.filter((x) => x.d < 0).slice(0, 3);
	const parts = [];
	if (gains.length) parts.push(`This setup increases ${humanList(gains.map((g) => g.label.toLowerCase()))}`);
	if (losses.length) parts.push(`${parts.length ? " while reducing " : "This setup reduces "}${humanList(losses.map((l) => l.label.toLowerCase()))}`);
	parts.push(".");
	const topGain = gains[0];
	const topLoss = losses[0];
	let character = "";
	if (topGain && topLoss) character = ` Expect a car that feels stronger in ${cornerPhaseFor(topGain.key)} but less forgiving in ${cornerPhaseFor(topLoss.key)}.`;
	else if (topGain) character = ` The car should feel notably stronger in ${cornerPhaseFor(topGain.key)}.`;
	else if (topLoss) character = ` The car should feel weaker in ${cornerPhaseFor(topLoss.key)} — keep that in mind when pushing.`;
	return parts.join("") + character;
}
function labelFor(k) {
	return CHARACTERISTICS.find((c) => c.key === k)?.label ?? k;
}
function cornerPhaseFor(k) {
	switch (k) {
		case "turnIn":
		case "entryRotation":
		case "brakingStability": return "corner entry";
		case "midCornerGrip":
		case "rotation": return "the middle of the corner";
		case "traction": return "corner exit";
		case "highSpeedStability": return "fast sweeping corners";
		case "kerbCompliance":
		case "bumpCompliance": return "rough surfaces and kerbs";
		case "tyreWear": return "long-run tyre life";
	}
}
function humanList(items) {
	if (items.length === 0) return "";
	if (items.length === 1) return items[0];
	if (items.length === 2) return `${items[0]} and ${items[1]}`;
	return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
function SetupLab() {
	const [sim, setSim] = (0, import_react.useState)("acc");
	const [layout, setLayout] = (0, import_react.useState)("mr_rwd");
	const [values, setValues] = (0, import_react.useState)(makeDefaultValues);
	const scores = (0, import_react.useMemo)(() => computeScores(values, layout), [values, layout]);
	const summary = (0, import_react.useMemo)(() => generateSummary(scores), [scores]);
	const setVal = (key, which, n) => {
		setValues((v) => ({
			...v,
			[key]: {
				...v[key],
				[which]: n
			}
		}));
	};
	const resetCurrent = () => setValues((v) => {
		const out = { ...v };
		for (const s of SETTINGS) out[s.key] = {
			...out[s.key],
			current: out[s.key].baseline
		};
		return out;
	});
	const tier1 = SETTINGS.filter((s) => s.tier === 1);
	const tier2 = SETTINGS.filter((s) => s.tier === 2);
	const tier3 = SETTINGS.filter((s) => s.tier === 3);
	const simName = SIMULATORS.find((s) => s.id === sim)?.name ?? "";
	const layoutName = LAYOUTS.find((l) => l.id === layout)?.name ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground selection:bg-accent/30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-50 h-14 border-b border-border bg-background/70 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full items-center justify-between px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-5 items-center justify-center rounded-sm bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold text-accent-foreground",
								children: "SL"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium tracking-tight",
							children: "SetupLab"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 md:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground",
							children: "Telemetry"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Selector, {
							label: "Sim",
							value: sim,
							onChange: (v) => setSim(v),
							options: SIMULATORS.map((s) => ({
								id: s.id,
								name: s.name
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-6 w-px bg-border sm:block" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Selector, {
							label: "Layout",
							value: layout,
							onChange: (v) => setLayout(v),
							options: LAYOUTS.map((l) => ({
								id: l.id,
								name: l.name
							}))
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex h-[calc(100vh-3.5rem)] overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "w-[22rem] shrink-0 overflow-y-auto border-r border-border bg-background/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
							title: TIER_LABELS[1],
							accent: true,
							children: tier1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
								def: s,
								value: values[s.key],
								onChange: setVal
							}, s.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
							title: TIER_LABELS[2],
							children: tier2.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
								def: s,
								value: values[s.key],
								onChange: setVal
							}, s.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingSection, {
							title: TIER_LABELS[3],
							children: tier3.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
								def: s,
								value: values[s.key],
								onChange: setVal,
								compact: true
							}, s.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: resetCurrent,
							className: "w-full rounded border border-border bg-secondary px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground",
							children: "Reset Current → Baseline"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex-1 overflow-y-auto bg-background p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl space-y-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-medium text-foreground",
									children: "Vehicle Characteristics"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
									children: [
										simName,
										" · ",
										layoutName
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										swatchClass: "bg-muted",
										label: "Baseline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										swatchClass: "bg-accent",
										label: "Current"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-5",
								children: CHARACTERISTICS.map((c) => {
									const s = scores[c.key];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacteristicBar, {
										label: c.label,
										baseline: s.baseline,
										current: s.current,
										delta: s.delta
									}, c.key);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border ring-1 ring-white/5 sm:grid-cols-2 lg:grid-cols-3",
							children: CHARACTERISTIC_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 bg-background p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
									children: group.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: group.items.map((item) => {
										const d = scores[item.key].delta;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `size-1 rounded-full ${dotColor(d)}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-foreground/90",
													children: item.label
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `font-mono text-[10px] ${textColor(d)}`,
												children: fmtDelta(d)
											})]
										}, `${group.title}-${item.key}-${item.label}`);
									})
								})]
							}, group.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-lg border border-accent/10 bg-accent/5 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-0 top-0 p-3 opacity-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-4xl",
									children: "AI"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-mono text-xs uppercase tracking-widest text-accent",
									children: "Engineer's Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-[64ch] text-pretty text-sm leading-relaxed text-foreground/90",
									children: summary
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "flex items-end justify-between border-t border-border pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase text-muted-foreground",
									children: "Session"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-xs text-foreground/80",
									children: [
										"SL-",
										sim.toUpperCase(),
										"-",
										layout.toUpperCase()
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
								children: ["Coefficients editable in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "src/lib/coefficients.ts"
								})]
							})]
						})
					]
				})
			})]
		})]
	});
}
function Selector({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: [label, ":"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "rounded border border-border bg-secondary px-2 py-1 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-accent",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.id,
				children: o.name
			}, o.id))
		})]
	});
}
function SettingSection({ title, accent, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground",
			children: title
		}), accent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent" }) : null]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children
	})] });
}
function SettingRow({ def, value, onChange, compact }) {
	const delta = value.current - value.baseline;
	const changed = Math.abs(delta) > 1e-6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded border border-border/60 bg-surface/40 p-2 ${compact ? "" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1.5 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium text-foreground/90",
					children: def.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-muted-foreground",
					children: def.unit
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					"aria-label": `${def.label} baseline`,
					value: value.baseline,
					step: def.unitStep,
					onChange: (n) => onChange(def.key, "baseline", n),
					subdued: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
					"aria-label": `${def.label} current`,
					value: value.current,
					step: def.unitStep,
					onChange: (n) => onChange(def.key, "current", n),
					highlight: changed
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70",
					children: "Baseline · Current"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-mono text-[10px] ${changed ? textColor(delta) : "text-muted-foreground/70"}`,
					children: changed ? `${delta > 0 ? "+" : ""}${roundSmart(delta)}` : "—"
				})]
			})
		]
	});
}
function NumberInput({ value, onChange, step, subdued, highlight, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "number",
		step,
		value: Number.isFinite(value) ? value : 0,
		onChange: (e) => {
			const n = parseFloat(e.target.value);
			onChange(Number.isFinite(n) ? n : 0);
		},
		className: ["w-full rounded border px-2 py-1 font-mono text-sm outline-none transition-shadow focus:ring-1 focus:ring-accent/60", subdued ? "border-border/60 bg-background/60 text-muted-foreground" : highlight ? "border-accent/40 bg-surface text-accent" : "border-border bg-surface text-foreground"].join(" "),
		...rest
	});
}
function CharacteristicBar({ label, baseline, current, delta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-foreground/90",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `font-mono ${textColor(delta)}`,
				children: fmtDelta(delta)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-2 overflow-hidden rounded-full bg-secondary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 left-0 bg-muted opacity-70",
					style: { width: `${baseline}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `absolute inset-y-0 left-0 transition-all duration-300 ${delta >= 0 ? "bg-accent" : "bg-[var(--danger)]"}`,
					style: { width: `${current}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 w-px bg-foreground/30",
					style: { left: `${baseline}%` }
				})
			]
		})]
	});
}
function Legend({ swatchClass, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `size-2 rounded-sm ${swatchClass}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		})]
	});
}
function dotColor(d) {
	if (Math.abs(d) < 1) return "bg-muted-foreground/40";
	if (d > 3) return "bg-accent";
	if (d > 0) return "bg-accent/70";
	if (d < -3) return "bg-[var(--danger)]";
	return "bg-[var(--warning)]";
}
function textColor(d) {
	if (Math.abs(d) < 1) return "text-muted-foreground";
	if (d > 0) return "text-accent";
	return "text-[var(--danger)]";
}
function fmtDelta(d) {
	if (Math.abs(d) < .5) return "0%";
	return `${d > 0 ? "+" : ""}${d.toFixed(0)}%`;
}
function roundSmart(n) {
	if (Math.abs(n) >= 10) return n.toFixed(0);
	if (Math.abs(n) >= 1) return n.toFixed(1);
	return n.toFixed(2);
}
//#endregion
export { SetupLab as component };
