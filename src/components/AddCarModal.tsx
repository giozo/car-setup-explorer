import { useState } from "react";
import { buildCarProfile } from "@/lib/parseSetup";
import type { CarProfile } from "@/car_data/data";

const CLASSES = ["MX5 Cup", "GT3", "GT4", "GT2", "TCR"];
const DRIVES: Array<"RWD" | "FWD"> = ["RWD", "FWD"];
const LAYOUTS: Array<"front" | "mid" | "rear"> = ["front", "mid", "rear"];

interface AddCarModalProps {
  onClose: () => void;
  onAdd: (car: CarProfile) => void;
}

export function AddCarModal({ onClose, onAdd }: AddCarModalProps) {
  const [name, setName] = useState("");
  const [cls, setCls] = useState(CLASSES[0]);
  const [drive, setDrive] = useState<"RWD" | "FWD">("RWD");
  const [engineLayout, setEngineLayout] = useState<"front" | "mid" | "rear">("front");
  const [minContent, setMinContent] = useState<string | null>(null);
  const [maxContent, setMaxContent] = useState<string | null>(null);
  const [minFileName, setMinFileName] = useState("");
  const [maxFileName, setMaxFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const readFile = (file: File, setContent: (s: string) => void, setFn: (n: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      setContent(String(reader.result ?? ""));
      setFn(file.name);
    };
    reader.readAsText(file);
  };

  const canSubmit = name.trim() && cls && drive && engineLayout && minContent && maxContent;

  const submit = () => {
    if (!canSubmit || !minContent || !maxContent) return;
    try {
      const car = buildCarProfile(minContent, maxContent, {
        name: name.trim(),
        class: cls,
        drive,
        engineLayout,
      });
      if (car.parameters.length === 0) {
        setError("No adjustable parameters found. Make sure MIN and MAX files differ.");
        return;
      }
      onAdd(car);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse setup files.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm font-medium uppercase tracking-widest text-foreground">Add a Car</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Step 1 */}
          <section className="space-y-3">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Step 1 — Car Info</h3>
            <Field label="Car Name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ferrari 488 GT3"
                className="w-full rounded border border-border bg-surface px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-accent"
              />
            </Field>
            <div className="grid grid-cols-3 gap-2">
              <Field label="Class">
                <Select value={cls} onChange={setCls} options={CLASSES} />
              </Field>
              <Field label="Drive">
                <Select value={drive} onChange={(v) => setDrive(v as "RWD" | "FWD")} options={DRIVES} />
              </Field>
              <Field label="Layout">
                <Select value={engineLayout} onChange={(v) => setEngineLayout(v as "front" | "mid" | "rear")} options={LAYOUTS} />
              </Field>
            </div>
          </section>

          {/* Step 2 */}
          <section className="space-y-3">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Step 2 — Setup Files</h3>
            <FileSlot
              label="Upload MIN Setup"
              fileName={minFileName}
              done={!!minContent}
              onFile={(f) => readFile(f, setMinContent, setMinFileName)}
            />
            <FileSlot
              label="Upload MAX Setup"
              fileName={maxFileName}
              done={!!maxContent}
              onFile={(f) => readFile(f, setMaxContent, setMaxFileName)}
            />
          </section>

          {error ? <div className="text-xs text-[var(--danger)]">{error}</div> : null}

          {/* Step 3 */}
          <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
            <button
              onClick={onClose}
              className="rounded border border-border bg-secondary px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={!canSubmit}
              className="rounded bg-accent px-4 py-2 text-xs font-medium uppercase tracking-widest text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-border bg-secondary px-2 py-1.5 text-sm capitalize outline-none focus:ring-1 focus:ring-accent"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function FileSlot({
  label,
  fileName,
  done,
  onFile,
}: {
  label: string;
  fileName: string;
  done: boolean;
  onFile: (f: File) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded border border-dashed border-border bg-surface/40 px-3 py-2.5 transition-colors hover:border-accent/60">
      <div className="flex items-center gap-3">
        <span className={`flex size-5 items-center justify-center rounded-full text-[10px] ${done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
          {done ? "✓" : "·"}
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">{label}</span>
          <span className="font-mono text-[10px] text-muted-foreground">{fileName || ".ini file"}</span>
        </div>
      </div>
      <span className="rounded border border-border bg-secondary px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">Browse</span>
      <input
        type="file"
        accept=".ini"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </label>
  );
}
