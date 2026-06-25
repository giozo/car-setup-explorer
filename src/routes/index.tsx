import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SIMULATORS, type LayoutId, type SimulatorId } from "@/lib/setup-types";
import {
  CHARACTERISTICS,
  CHARACTERISTIC_GROUPS,
  computeCarScores,
  generateSummary,
  normalizeCarClass,
  paramGroupLabel,
  type CarParamValues,
  type Attribute,
} from "@/lib/calculations";
import {
  getAttributeGuide,
  ATTRIBUTE_LABELS,
  PARAM_KEY_TO_GROUP,
  type ParamGroup,
} from "@/lib/coefficients";
import {
  BUILT_IN_CARS,
  TAB_ORDER,
  loadUserCars,
  saveUserCars,
  type CarProfile,
  type ParameterDef,
} from "@/car_data/data";
import { AddCarModal } from "@/components/AddCarModal";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SetupLab — Sim Racing Setup Visualization" },
      { name: "description", content: "Compare baseline vs current setup values and visualize the impact on car behavior." },
      { property: "og:title", content: "SetupLab" },
      { property: "og:description", content: "Sim racing setup learning and visualization tool." },
    ],
  }),
  component: SetupLab,
});

function makeCarValues(car: CarProfile): CarParamValues {
  const out: CarParamValues = {};
  for (const p of car.parameters) {
    const mid = (p.min + p.max) / 2;
    out[p.key] = { baseline: mid, current: mid };
  }
  return out;
}

function layoutFromCar(car: CarProfile | null): LayoutId {
  if (!car) return "fr_rwd";
  if (car.drive === "FWD") return "fr_fwd";
  if (car.engineLayout === "mid") return "mr_rwd";
  if (car.engineLayout === "rear") return "rr_rwd";
  return "fr_rwd";
}

function layoutLabel(id: LayoutId): string {
  switch (id) {
    case "fr_rwd": return "Front Engine RWD";
    case "mr_rwd": return "Mid Engine RWD";
    case "rr_rwd": return "Rear Engine RWD";
    case "fr_fwd": return "Front Engine FWD";
  }
}

function SetupLab() {
  const [sim, setSim] = useState<SimulatorId>("acc");
  const [userCars, setUserCars] = useState<CarProfile[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string>("");
  const [showAddCar, setShowAddCar] = useState(false);
  const [carValues, setCarValues] = useState<CarParamValues>({});

  useEffect(() => {
    setUserCars(loadUserCars());
  }, []);

  const allCars = useMemo(() => [...BUILT_IN_CARS, ...userCars], [userCars]);
  const selectedCar = allCars.find((c) => c.id === selectedCarId) ?? null;
  const layout = layoutFromCar(selectedCar);

  useEffect(() => {
    if (selectedCar) setCarValues(makeCarValues(selectedCar));
    else setCarValues({});
  }, [selectedCarId]); // eslint-disable-line react-hooks/exhaustive-deps

  const scores = useMemo(() => {
    return computeCarScores(carValues, selectedCar?.parameters ?? [], selectedCar);
  }, [carValues, selectedCar]);

  const summary = useMemo(() => generateSummary(scores), [scores]);
  const simName = SIMULATORS.find((s) => s.id === sim)?.name ?? "";

  const [guideAttr, setGuideAttr] = useState<Attribute | null>(null);

  const handleAddCar = (car: CarProfile) => {
    const next = [...userCars, car];
    setUserCars(next);
    saveUserCars(next);
    setSelectedCarId(car.id);
    setShowAddCar(false);
  };

  const handleDeleteUserCar = (id: string) => {
    const next = userCars.filter((c) => c.id !== id);
    setUserCars(next);
    saveUserCars(next);
    if (selectedCarId === id) setSelectedCarId("");
  };

  const handleReset = () => {
    if (!selectedCar) return;
    setCarValues((prev) => {
      const next: CarParamValues = { ...prev };
      for (const p of selectedCar.parameters) {
        const mid = (p.min + p.max) / 2;
        next[p.key] = { baseline: mid, current: mid };
      }
      return next;
    });
  };

  const setCarVal = (def: ParameterDef, which: "baseline" | "current", n: number) => {
    const clamped = Math.max(def.min, Math.min(def.max, n));
    setCarValues((v) => ({
      ...v,
      [def.key]: { ...(v[def.key] ?? { baseline: clamped, current: clamped }), [which]: clamped },
    }));
  };


  const groupedParams = useMemo(() => {
    if (!selectedCar) return [];
    const map = new Map<string, ParameterDef[]>();
    for (const p of selectedCar.parameters) {
      if (p.tab === "TYRES") continue;
      const arr = map.get(p.tab) ?? [];
      arr.push(p);
      map.set(p.tab, arr);
    }
    const ordered: { tab: string; params: ParameterDef[] }[] = [];
    for (const tab of TAB_ORDER) {
      const params = map.get(tab);
      if (params && params.length > 0) ordered.push({ tab, params });
    }
    for (const [tab, params] of map.entries()) {
      if (!TAB_ORDER.includes(tab) && tab !== "TYRES") ordered.push({ tab, params });
    }
    return ordered;
  }, [selectedCar]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-sm bg-accent">
                <span className="text-[10px] font-semibold text-accent-foreground">SL</span>
              </div>
              <span className="text-sm font-medium tracking-tight">SetupLab</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Selector label="Sim" value={sim} onChange={(v) => setSim(v as SimulatorId)} options={SIMULATORS.map((s) => ({ id: s.id, name: s.name }))} />
            <div className="hidden h-6 w-px bg-border sm:block" />
            <CarSelector
              value={selectedCarId}
              builtIn={BUILT_IN_CARS}
              userCars={userCars}
              onSelect={(id) => {
                if (id === "__add__") setShowAddCar(true);
                else setSelectedCarId(id);
              }}
              onDeleteUserCar={handleDeleteUserCar}
            />

          </div>
        </div>
      </header>

      <main className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
        <aside className="w-[22rem] shrink-0 overflow-y-auto border-r border-border bg-background/40">
          {!selectedCar ? (
            <div className="flex h-full items-center justify-center p-6 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Select a car to begin
              </p>
            </div>
          ) : (
            <div className="space-y-8 p-6">
              <div className="space-y-1">
                <div className="text-sm font-medium text-foreground">{selectedCar.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {selectedCar.class} · {selectedCar.drive} · {selectedCar.engineLayout}
                </div>
              </div>

              {groupedParams.map(({ tab, params }) => (
                <section key={tab}>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{tab}</h2>
                  </div>
                  <div className="space-y-3">
                    {params.map((p) => (
                      <ParamRow
                        key={p.key}
                        def={p}
                        value={carValues[p.key] ?? { baseline: p.min, current: p.min }}
                        onChange={setCarVal}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </aside>

        <section className="flex-1 overflow-y-auto bg-background p-8">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-medium text-foreground">Vehicle Characteristics</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {simName} · {layoutLabel(layout)}
                    {selectedCar ? ` · ${selectedCar.name}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Legend swatchClass="bg-muted" label="Baseline" />
                  <Legend swatchClass="bg-accent" label="Current" />
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={!selectedCar}
                    className="rounded border border-border bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground hover:bg-accent/20 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {CHARACTERISTICS.map((c) => {
                  const s = scores[c.key];
                  return (
                    <CharacteristicBar
                      key={c.key}
                      label={c.label}
                      baseline={s.baseline}
                      current={s.current}
                      delta={s.delta}
                      onClick={() => setGuideAttr(c.key)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border ring-1 ring-white/5 sm:grid-cols-2 lg:grid-cols-3">
              {CHARACTERISTIC_GROUPS.map((group) => (
                <div key={group.title} className="space-y-4 bg-background p-4">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{group.title}</h4>
                  <div className="space-y-3">
                    {group.items.map((item) => {
                      const d = scores[item.key].delta;
                      return (
                        <div key={`${group.title}-${item.key}`} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`size-1 rounded-full ${dotColor(d)}`} />
                            <span className="text-xs text-foreground/90">{item.label}</span>
                          </div>
                          <span className={`font-mono text-[10px] ${textColor(d)}`}>{fmtDelta(d)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-lg border border-accent/10 bg-accent/5 p-6">
              <div className="relative z-10 space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Engineer's Summary</h3>
                <p className="max-w-[64ch] text-pretty text-sm leading-relaxed text-foreground/90">{summary}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showAddCar ? <AddCarModal onClose={() => setShowAddCar(false)} onAdd={handleAddCar} /> : null}
      {guideAttr ? (
        <GuidePanel
          attribute={guideAttr}
          car={selectedCar}
          onClose={() => setGuideAttr(null)}
        />
      ) : null}
    </div>
  );
}


function Selector({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; name: string }[];
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-border bg-secondary px-2 py-1 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-accent"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function CarSelector({
  value,
  builtIn,
  userCars,
  onSelect,
  onDeleteUserCar,
}: {
  value: string;
  builtIn: CarProfile[];
  userCars: CarProfile[];
  onSelect: (id: string) => void;
  onDeleteUserCar: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const all = [...builtIn, ...userCars];
  const selected = all.find((c) => c.id === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-car-selector]")) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div data-car-selector className="relative flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Choose Car:</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="min-w-[12rem] rounded border border-border bg-secondary px-2 py-1 text-left text-xs font-medium text-foreground outline-none hover:border-accent/40 focus:ring-1 focus:ring-accent"
      >
        {selected ? selected.name : <span className="text-muted-foreground">Select a car to begin</span>}
        <span className="float-right text-muted-foreground">▾</span>
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded border border-border bg-background shadow-xl">
          <div className="max-h-80 overflow-y-auto py-1">
            <div className="px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Built-in</div>
            {builtIn.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { onSelect(c.id); setOpen(false); }}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-accent/15 ${c.id === value ? "text-accent" : "text-foreground"}`}
              >
                <span>{c.name}</span>
              </button>
            ))}
            {userCars.length > 0 ? (
              <>
                <div className="mt-1 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Your Cars</div>
                {userCars.map((c) => (
                  <div
                    key={c.id}
                    className={`group flex items-center justify-between px-3 py-1.5 text-xs hover:bg-accent/15 ${c.id === value ? "text-accent" : "text-foreground"}`}
                  >
                    <button
                      type="button"
                      onClick={() => { onSelect(c.id); setOpen(false); }}
                      className="flex-1 text-left"
                    >
                      {c.name}
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${c.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete "${c.name}"?`)) onDeleteUserCar(c.id);
                      }}
                      className="ml-2 rounded p-1 text-muted-foreground opacity-60 hover:bg-[var(--danger)]/15 hover:text-[var(--danger)] hover:opacity-100"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12z"/></svg>
                    </button>
                  </div>
                ))}
              </>
            ) : null}
            <div className="mt-1 border-t border-border" />
            <button
              type="button"
              onClick={() => { onSelect("__add__"); setOpen(false); }}
              className="flex w-full items-center px-3 py-1.5 text-left text-xs font-medium text-accent hover:bg-accent/15"
            >
              + Add a Car
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}


function ParamRow({
  def,
  value,
  onChange,
}: {
  def: ParameterDef;
  value: { baseline: number; current: number };
  onChange: (def: ParameterDef, which: "baseline" | "current", n: number) => void;
}) {
  const delta = value.current - value.baseline;
  const changed = Math.abs(delta) > 1e-6;
  const step = def.clicks > 0 ? (def.max - def.min) / def.clicks : 1;
  return (
    <div className="rounded border border-border/60 bg-surface/40 p-2">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-medium text-foreground/90">{def.label}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{def.unit}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stepper def={def} value={value.baseline} step={step} subdued onChange={(n) => onChange(def, "baseline", n)} />
        <Stepper def={def} value={value.current} step={step} highlight={changed} onChange={(n) => onChange(def, "current", n)} />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
          Range {roundSmart(def.min)}–{roundSmart(def.max)}
        </span>
        <span className={`font-mono text-[10px] ${changed ? textColor(delta) : "text-muted-foreground/70"}`}>
          {changed ? `${delta > 0 ? "+" : ""}${roundSmart(delta)}` : "—"}
        </span>
      </div>
    </div>
  );
}

function Stepper({
  def,
  value,
  step,
  subdued,
  highlight,
  onChange,
}: {
  def: ParameterDef;
  value: number;
  step: number;
  subdued?: boolean;
  highlight?: boolean;
  onChange: (n: number) => void;
}) {
  const atMax = value >= def.max - 1e-9;
  const atMin = value <= def.min + 1e-9;
  const inputClass = [
    "w-full rounded border px-1 py-1 text-center font-mono text-xs outline-none transition-shadow focus:ring-1 focus:ring-accent/60",
    subdued
      ? "border-border/60 bg-background/60 text-muted-foreground"
      : highlight
        ? "border-accent/40 bg-surface text-accent"
        : "border-border bg-surface text-foreground",
  ].join(" ");
  const btnClass = (disabled: boolean) =>
    [
      "flex h-6 w-6 shrink-0 items-center justify-center rounded border font-mono text-xs leading-none",
      disabled
        ? "cursor-not-allowed border-border/40 bg-background/40 text-muted-foreground/40"
        : "border-border bg-secondary text-foreground hover:bg-accent/20 hover:text-accent",
    ].join(" ");
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={atMin}
        aria-label={`Decrease ${def.label}`}
        onClick={() => onChange(value - step)}
        className={btnClass(atMin)}
      >
        −
      </button>
      <input
        type="number"
        step={step}
        min={def.min}
        max={def.max}
        value={Number.isFinite(value) ? +value.toFixed(4) : 0}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          onChange(Number.isFinite(n) ? n : def.min);
        }}
        className={inputClass}
      />
      <button
        type="button"
        disabled={atMax}
        aria-label={`Increase ${def.label}`}
        onClick={() => onChange(value + step)}
        className={btnClass(atMax)}
      >
        +
      </button>
    </div>
  );
}

function CharacteristicBar({ label, baseline, current, delta }: { label: string; baseline: number; current: number; delta: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="font-medium text-foreground/90">{label}</span>
        <span className={`font-mono ${textColor(delta)}`}>{fmtDelta(delta)}</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
        <div className="absolute inset-y-0 left-0 bg-muted opacity-70" style={{ width: `${baseline}%` }} />
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-300 ${delta >= 0 ? "bg-accent" : "bg-[var(--danger)]"}`}
          style={{ width: `${current}%` }}
        />
        <div className="absolute inset-y-0 w-px bg-foreground/30" style={{ left: `${baseline}%` }} />
      </div>
    </div>
  );
}

function Legend({ swatchClass, label }: { swatchClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-2 rounded-sm ${swatchClass}`} />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

function dotColor(d: number) {
  if (Math.abs(d) < 1) return "bg-muted-foreground/40";
  if (d > 3) return "bg-accent";
  if (d > 0) return "bg-accent/70";
  if (d < -3) return "bg-[var(--danger)]";
  return "bg-[var(--warning)]";
}

function textColor(d: number) {
  if (Math.abs(d) < 1) return "text-muted-foreground";
  if (d > 0) return "text-accent";
  return "text-[var(--danger)]";
}

function fmtDelta(d: number): string {
  if (Math.abs(d) < 0.5) return "0%";
  const sign = d > 0 ? "+" : "";
  return `${sign}${d.toFixed(0)}%`;
}

function roundSmart(n: number): string {
  if (Math.abs(n) >= 10) return n.toFixed(0);
  if (Math.abs(n) >= 1) return n.toFixed(1);
  return n.toFixed(2);
}
