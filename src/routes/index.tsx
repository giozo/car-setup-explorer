import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CHARACTERISTICS,
  LAYOUTS,
  SIMULATORS,
  type LayoutId,
  type SettingKey,
  type SimulatorId,
} from "@/lib/setup-types";
import { SETTINGS, TIER_LABELS } from "@/lib/setup-config";
import {
  CHARACTERISTIC_GROUPS,
  computeScores,
  generateSummary,
  makeDefaultValues,
} from "@/lib/calculations";

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

function SetupLab() {
  const [sim, setSim] = useState<SimulatorId>("acc");
  const [layout, setLayout] = useState<LayoutId>("mr_rwd");
  const [values, setValues] = useState(makeDefaultValues);

  const scores = useMemo(() => computeScores(values, layout), [values, layout]);
  const summary = useMemo(() => generateSummary(scores), [scores]);

  const setVal = (key: SettingKey, which: "baseline" | "current", n: number) => {
    setValues((v) => ({ ...v, [key]: { ...v[key], [which]: n } }));
  };

  const resetCurrent = () =>
    setValues((v) => {
      const out = { ...v };
      for (const s of SETTINGS) out[s.key] = { ...out[s.key], current: out[s.key].baseline };
      return out;
    });

  const tier1 = SETTINGS.filter((s) => s.tier === 1);
  const tier2 = SETTINGS.filter((s) => s.tier === 2);
  const tier3 = SETTINGS.filter((s) => s.tier === 3);

  const simName = SIMULATORS.find((s) => s.id === sim)?.name ?? "";
  const layoutName = LAYOUTS.find((l) => l.id === layout)?.name ?? "";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      {/* Header */}
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-sm bg-accent">
                <span className="text-[10px] font-semibold text-accent-foreground">SL</span>
              </div>
              <span className="text-sm font-medium tracking-tight">SetupLab</span>
            </div>
            <nav className="hidden items-center gap-1 md:flex">
              <span className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">Telemetry</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Selector
              label="Sim"
              value={sim}
              onChange={(v) => setSim(v as SimulatorId)}
              options={SIMULATORS.map((s) => ({ id: s.id, name: s.name }))}
            />
            <div className="hidden h-6 w-px bg-border sm:block" />
            <Selector
              label="Layout"
              value={layout}
              onChange={(v) => setLayout(v as LayoutId)}
              options={LAYOUTS.map((l) => ({ id: l.id, name: l.name }))}
            />
          </div>
        </div>
      </header>

      <main className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* Sidebar — Setup inputs */}
        <aside className="w-[22rem] shrink-0 overflow-y-auto border-r border-border bg-background/40">
          <div className="space-y-8 p-6">
            <SettingSection title={TIER_LABELS[1]} accent>
              {tier1.map((s) => (
                <SettingRow key={s.key} def={s} value={values[s.key]} onChange={setVal} />
              ))}
            </SettingSection>

            <SettingSection title={TIER_LABELS[2]}>
              {tier2.map((s) => (
                <SettingRow key={s.key} def={s} value={values[s.key]} onChange={setVal} />
              ))}
            </SettingSection>

            <SettingSection title={TIER_LABELS[3]}>
              {tier3.map((s) => (
                <SettingRow key={s.key} def={s} value={values[s.key]} onChange={setVal} compact />
              ))}
            </SettingSection>

            <button
              onClick={resetCurrent}
              className="w-full rounded border border-border bg-secondary px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Reset Current → Baseline
            </button>
          </div>
        </aside>

        {/* Canvas */}
        <section className="flex-1 overflow-y-auto bg-background p-8">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Characteristic bars */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground">Vehicle Characteristics</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {simName} · {layoutName}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Legend swatchClass="bg-muted" label="Baseline" />
                  <Legend swatchClass="bg-accent" label="Current" />
                </div>
              </div>

              <div className="space-y-5">
                {CHARACTERISTICS.map((c) => {
                  const s = scores[c.key];
                  return <CharacteristicBar key={c.key} label={c.label} baseline={s.baseline} current={s.current} delta={s.delta} />;
                })}
              </div>
            </div>

            {/* Grouped breakdowns */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border ring-1 ring-white/5 sm:grid-cols-2 lg:grid-cols-3">
              {CHARACTERISTIC_GROUPS.map((group) => (
                <div key={group.title} className="space-y-4 bg-background p-4">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {group.title}
                  </h4>
                  <div className="space-y-3">
                    {group.items.map((item) => {
                      const d = scores[item.key].delta;
                      return (
                        <div key={`${group.title}-${item.key}-${item.label}`} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`size-1 rounded-full ${dotColor(d)}`} />
                            <span className="text-xs text-foreground/90">{item.label}</span>
                          </div>
                          <span className={`font-mono text-[10px] ${textColor(d)}`}>
                            {fmtDelta(d)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="relative overflow-hidden rounded-lg border border-accent/10 bg-accent/5 p-6">
              <div className="absolute right-0 top-0 p-3 opacity-10">
                <span className="font-mono text-4xl">AI</span>
              </div>
              <div className="relative z-10 space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Engineer's Summary</h3>
                <p className="max-w-[64ch] text-pretty text-sm leading-relaxed text-foreground/90">
                  {summary}
                </p>
              </div>
            </div>

            <footer className="flex items-end justify-between border-t border-border pt-8">
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase text-muted-foreground">Session</div>
                <div className="font-mono text-xs text-foreground/80">SL-{sim.toUpperCase()}-{layout.toUpperCase()}</div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Coefficients editable in <span className="text-foreground/70">src/lib/coefficients.ts</span>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ───────────── helpers / subcomponents ───────────── */

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

function SettingSection({ title, accent, children }: { title: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
        {accent ? <span className="size-1.5 rounded-full bg-accent" /> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function SettingRow({
  def,
  value,
  onChange,
  compact,
}: {
  def: typeof SETTINGS[number];
  value: { baseline: number; current: number };
  onChange: (k: SettingKey, which: "baseline" | "current", n: number) => void;
  compact?: boolean;
}) {
  const delta = value.current - value.baseline;
  const changed = Math.abs(delta) > 1e-6;
  return (
    <div className={`rounded border border-border/60 bg-surface/40 p-2 ${compact ? "" : ""}`}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-medium text-foreground/90">{def.label}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{def.unit}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <NumberInput
          aria-label={`${def.label} baseline`}
          value={value.baseline}
          step={def.unitStep}
          onChange={(n) => onChange(def.key, "baseline", n)}
          subdued
        />
        <NumberInput
          aria-label={`${def.label} current`}
          value={value.current}
          step={def.unitStep}
          onChange={(n) => onChange(def.key, "current", n)}
          highlight={changed}
        />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">Baseline · Current</span>
        <span className={`font-mono text-[10px] ${changed ? textColor(delta) : "text-muted-foreground/70"}`}>
          {changed ? `${delta > 0 ? "+" : ""}${roundSmart(delta)}` : "—"}
        </span>
      </div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  step,
  subdued,
  highlight,
  ...rest
}: {
  value: number;
  onChange: (n: number) => void;
  step: number;
  subdued?: boolean;
  highlight?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      step={step}
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => {
        const n = parseFloat(e.target.value);
        onChange(Number.isFinite(n) ? n : 0);
      }}
      className={[
        "w-full rounded border px-2 py-1 font-mono text-sm outline-none transition-shadow focus:ring-1 focus:ring-accent/60",
        subdued
          ? "border-border/60 bg-background/60 text-muted-foreground"
          : highlight
            ? "border-accent/40 bg-surface text-accent"
            : "border-border bg-surface text-foreground",
      ].join(" ")}
      {...rest}
    />
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
        {/* baseline ghost */}
        <div className="absolute inset-y-0 left-0 bg-muted opacity-70" style={{ width: `${baseline}%` }} />
        {/* current */}
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-300 ${
            delta >= 0 ? "bg-accent" : "bg-[var(--danger)]"
          }`}
          style={{ width: `${current}%` }}
        />
        {/* baseline tick */}
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
