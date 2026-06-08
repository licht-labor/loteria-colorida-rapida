import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CardPreview } from "@/components/CardPreview";
import {
  BARAJAS,
  FORMATOS,
  FRAME_COLORS,
  BG_COLORS,
  DEFAULT_CONFIG,
  pricePerCard,
  type ConfigState,
} from "@/lib/loteria";
import { Minus, Plus, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/personalizar")({
  head: () => ({
    meta: [
      { title: "Personalizar pedido — LoteríaMía" },
      { name: "description", content: "Configura tu baraja, formato, colores y cantidad de tablas. Vista previa en tiempo real." },
    ],
  }),
  component: Personalizar,
});

function Personalizar() {
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);

  const set = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const unit = pricePerCard(config.formato);
  const subtotal = unit * config.quantity;
  const formatoName = FORMATOS.find((f) => f.id === config.formato)?.name;
  const barajaName = BARAJAS.find((b) => b.id === config.baraja)?.name;

  return (
    <AppShell>
      <section className="px-5 pt-5 pb-3">
        <h1 className="font-display text-2xl font-extrabold">Personaliza tu lotería</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ve los cambios al instante en la vista previa.
        </p>
      </section>

      {/* Live preview */}
      <section className="px-5 pb-5">
        <div className="rounded-3xl p-4 bg-confetti border border-border">
          <div className="max-w-[220px] mx-auto">
            <CardPreview config={config} />
          </div>
          <p className="mt-3 text-center text-xs font-bold text-muted-foreground">
            Vista previa · {formatoName} · {barajaName}
          </p>
        </div>
      </section>

      {/* Baraja */}
      <Section title="1. Tipo de baraja">
        <div className="grid grid-cols-2 gap-2.5">
          {BARAJAS.map((b) => {
            const active = config.baraja === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => set("baraja", b.id)}
                className={`text-left rounded-2xl p-3 border-2 transition ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden>{b.emoji}</span>
                  {active && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="mt-1.5 font-bold text-sm">{b.name}</div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {b.desc}
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Formato */}
      <Section title="2. Formato de tabla">
        <div className="flex flex-wrap gap-2">
          {FORMATOS.map((f) => {
            const active = config.formato === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => set("formato", f.id)}
                className={`px-3.5 h-10 rounded-full border-2 text-sm font-bold transition ${
                  active ? "chip-active" : "border-border bg-card text-foreground"
                }`}
              >
                {f.name}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {FORMATOS.find((f) => f.id === config.formato)?.desc}
        </p>
      </Section>

      {/* Frame color */}
      <Section title="3. Color del marco">
        <div className="flex flex-wrap gap-3">
          {FRAME_COLORS.map((c) => {
            const active = config.frame === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-label={c.name}
                onClick={() => set("frame", c.id)}
                className={`relative w-12 h-12 rounded-2xl border-4 transition ${
                  active ? "border-foreground scale-105" : "border-white"
                }`}
                style={{ backgroundColor: c.hex, boxShadow: "0 2px 8px rgba(0,0,0,.15)" }}
              >
                {active && (
                  <Check className="w-5 h-5 absolute inset-0 m-auto text-white drop-shadow" />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Seleccionado: {FRAME_COLORS.find((c) => c.id === config.frame)?.name}
        </p>
      </Section>

      {/* BG color */}
      <Section title="4. Color de fondo">
        <div className="flex flex-wrap gap-3">
          {BG_COLORS.map((c) => {
            const active = config.background === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-label={c.name}
                onClick={() => set("background", c.id)}
                className={`relative w-12 h-12 rounded-2xl border-4 transition ${
                  active ? "border-foreground scale-105" : "border-border"
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {active && (
                  <Check className="w-5 h-5 absolute inset-0 m-auto text-foreground" />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Seleccionado: {BG_COLORS.find((c) => c.id === config.background)?.name}
        </p>
      </Section>

      {/* Quantity */}
      <Section title="5. Cantidad de tablas">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => set("quantity", Math.max(4, config.quantity - 4))}
            className="grid place-items-center w-12 h-12 rounded-2xl border-2 border-border bg-card"
            aria-label="Disminuir"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <div className="font-display text-4xl font-extrabold">{config.quantity}</div>
            <div className="text-xs text-muted-foreground">tablas únicas</div>
          </div>
          <button
            type="button"
            onClick={() => set("quantity", Math.min(200, config.quantity + 4))}
            className="grid place-items-center w-12 h-12 rounded-2xl border-2 border-border bg-card"
            aria-label="Aumentar"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[10, 20, 30, 50, 100].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => set("quantity", n)}
              className={`px-3 h-9 rounded-full text-xs font-bold border-2 ${
                config.quantity === n ? "chip-active" : "border-border bg-card"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Section>

      {/* Summary panel */}
      <section className="px-5 pb-5">
        <div className="rounded-3xl bg-card border border-border p-5">
          <h2 className="font-display text-lg font-extrabold">Resumen de tu pedido</h2>
          <dl className="mt-3 text-sm space-y-2">
            <Row label="Baraja" value={barajaName ?? "—"} />
            <Row label="Formato" value={formatoName ?? "—"} />
            <Row label="Color de marco" value={FRAME_COLORS.find((c) => c.id === config.frame)?.name ?? "—"} />
            <Row label="Color de fondo" value={BG_COLORS.find((c) => c.id === config.background)?.name ?? "—"} />
            <Row label="Cantidad" value={`${config.quantity} tablas`} />
            <Row label="Precio por tabla" value={`$${unit} MXN`} />
          </dl>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="font-display text-base font-extrabold">Subtotal</span>
            <span className="font-display text-2xl font-extrabold text-primary">
              ${subtotal} MXN
            </span>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky bottom-[64px] z-30 px-5 pb-3 pt-3 bg-gradient-to-t from-background via-background to-transparent">
        <Link
          to="/checkout"
          onClick={() => {
            try {
              sessionStorage.setItem("loteria.pendingConfig", JSON.stringify(config));
            } catch {}
          }}
          className="w-full inline-flex items-center justify-center gap-2 h-13 px-5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta py-3.5"
        >
          Continuar pedido · ${subtotal} MXN <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 py-4 border-t border-border">
      <h2 className="font-display text-lg font-extrabold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-bold text-right">{value}</dd>
    </div>
  );
}
