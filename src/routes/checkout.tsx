import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { FileDown, Lock, Mail, Phone, User, LogIn } from "lucide-react";
import {
  BARAJAS,
  FORMATOS,
  FRAME_COLORS,
  BG_COLORS,
  DEFAULT_CONFIG,
  pricePerCard,
  type ConfigState,
} from "@/lib/loteria";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — LoteríaMía" },
      { name: "description", content: "Completa tus datos y recibe tu lotería en PDF al instante." },
    ],
  }),
  component: Checkout,
});

function loadConfig(): ConfigState {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = sessionStorage.getItem("loteria.pendingConfig");
    if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_CONFIG;
}

function Checkout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [method, setMethod] = useState<"card" | "oxxo" | "transfer">("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  useEffect(() => {
    if (!user) return;
    setEmail(user.email ?? "");
    supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.full_name) setName(data.full_name);
        if (data?.phone) setPhone(data.phone);
        if (!data?.full_name) {
          const meta = user.user_metadata as { full_name?: string; name?: string };
          setName(meta?.full_name ?? meta?.name ?? "");
        }
      });
  }, [user]);

  const unit = pricePerCard(config.formato);
  const total = unit * config.quantity;
  const baraja = BARAJAS.find((b) => b.id === config.baraja);
  const formato = FORMATOS.find((f) => f.id === config.formato);
  const frame = FRAME_COLORS.find((c) => c.id === config.frame);
  const bg = BG_COLORS.find((c) => c.id === config.background);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate({ to: "/auth", search: { redirect: "/checkout" } });
      return;
    }
    setSubmitting(true);
    setError(null);

    // Save / update profile lightly
    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: name,
      phone,
      email: email || user.email,
    });

    const { data, error: insertError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        baraja: config.baraja,
        formato: config.formato,
        frame: config.frame,
        background: config.background,
        quantity: config.quantity,
        unit_price: unit,
        total,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        payment_method: method,
        status: "paid",
      })
      .select("id")
      .single();

    if (insertError || !data) {
      setError("No pudimos guardar tu pedido. Intenta de nuevo.");
      setSubmitting(false);
      return;
    }

    sessionStorage.removeItem("loteria.pendingConfig");
    navigate({ to: "/confirmacion", search: { id: data.id } });
  };

  return (
    <AppShell>
      <section className="px-5 pt-5 pb-3">
        <h1 className="font-display text-2xl font-extrabold">Finalizar pedido</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Producto digital · Recibes el PDF al confirmar el pago.
        </p>
      </section>

      {!loading && !user && (
        <section className="px-5 pb-2">
          <div className="rounded-2xl bg-secondary/40 border border-border p-4 flex items-start gap-3">
            <LogIn className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-bold">Inicia sesión para guardar tu pedido</div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Así puedes volver a descargar tu PDF cuando quieras.
              </p>
              <Link
                to="/auth"
                search={{ redirect: "/checkout" }}
                className="mt-2 inline-flex items-center justify-center h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold"
              >
                Entrar con Google
              </Link>
            </div>
          </div>
        </section>
      )}

      <form onSubmit={handleSubmit} className="px-5 space-y-5">
        {/* Order summary */}
        <section className="rounded-3xl bg-card border border-border p-5">
          <h2 className="font-display text-lg font-extrabold mb-3">Tu pedido</h2>
          <ul className="text-sm space-y-1.5">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Baraja {baraja?.name}</span>
              <span className="font-bold">×1</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Formato {formato?.name}</span>
              <span className="font-bold">${unit}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Cantidad</span>
              <span className="font-bold">{config.quantity} tablas</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Marco · {frame?.name}</span>
              <span className="font-bold">Incluido</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Fondo · {bg?.name}</span>
              <span className="font-bold">Incluido</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="font-display text-base font-extrabold">Total</span>
            <span className="font-display text-2xl font-extrabold text-primary">${total} MXN</span>
          </div>
        </section>

        {/* Customer */}
        <section className="rounded-3xl bg-card border border-border p-5 space-y-3">
          <h2 className="font-display text-lg font-extrabold">Tus datos</h2>
          <Field icon={User} label="Nombre completo" placeholder="María García" required
            value={name} onChange={(e) => setName(e.target.value)} />
          <Field icon={Mail} type="email" label="Correo electrónico" placeholder="maria@correo.com" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <Field icon={Phone} type="tel" label="WhatsApp" placeholder="+52 55 1234 5678" required
            value={phone} onChange={(e) => setPhone(e.target.value)} />
          <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
            <FileDown className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
            Enviaremos tu PDF a este correo y WhatsApp.
          </p>
        </section>

        {/* Payment */}
        <section className="rounded-3xl bg-card border border-border p-5">
          <h2 className="font-display text-lg font-extrabold mb-3">Pago</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "card", label: "Tarjeta" },
              { id: "oxxo", label: "OXXO" },
              { id: "transfer", label: "Transfer." },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id as typeof method)}
                className={`h-11 rounded-xl text-sm font-bold border-2 ${
                  method === m.id ? "chip-active" : "border-border bg-card"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-muted/50 border border-dashed border-border p-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            Aquí se conectará la pasarela de pago segura.
          </div>
        </section>

        {error && (
          <p className="text-center text-sm text-destructive font-semibold">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 h-13 py-3.5 px-5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta disabled:opacity-60"
        >
          {submitting ? "Procesando…" : `Pagar $${total} y recibir mi PDF`}
        </button>

        <p className="text-center text-[11px] text-muted-foreground pb-4">
          Al continuar aceptas los términos del producto digital.{" "}
          <Link to="/faq" className="underline">¿Dudas?</Link>
        </p>
      </form>
    </AppShell>
  );
}

function Field({
  icon: Icon,
  label,
  ...rest
}: { icon: React.ComponentType<{ className?: string }>; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <div className="mt-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="w-4 h-4" />
        </span>
        <input
          {...rest}
          className="w-full h-11 pl-9 pr-3 rounded-xl bg-background border-2 border-border focus:border-primary outline-none text-sm font-semibold"
        />
      </div>
    </label>
  );
}
