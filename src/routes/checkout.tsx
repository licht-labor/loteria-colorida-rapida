import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { FileDown, Lock, Mail, Phone, User } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — LoteríaMía" },
      { name: "description", content: "Completa tus datos y recibe tu lotería en PDF al instante." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"card" | "oxxo" | "transfer">("card");

  return (
    <AppShell>
      <section className="px-5 pt-5 pb-3">
        <h1 className="font-display text-2xl font-extrabold">Finalizar pedido</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Producto digital · Recibes el PDF al confirmar el pago.
        </p>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/confirmacion" });
        }}
        className="px-5 space-y-5"
      >
        {/* Order summary */}
        <section className="rounded-3xl bg-card border border-border p-5">
          <h2 className="font-display text-lg font-extrabold mb-3">Tu pedido</h2>
          <ul className="text-sm space-y-1.5">
            <li className="flex justify-between"><span className="text-muted-foreground">Baraja Clásica</span><span className="font-bold">×1</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Formato 4 × 4</span><span className="font-bold">$8</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Cantidad</span><span className="font-bold">20 tablas</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Marco · Rosa fiesta</span><span className="font-bold">Incluido</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Fondo · Crema</span><span className="font-bold">Incluido</span></li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="font-display text-base font-extrabold">Total</span>
            <span className="font-display text-2xl font-extrabold text-primary">$160 MXN</span>
          </div>
        </section>

        {/* Customer */}
        <section className="rounded-3xl bg-card border border-border p-5 space-y-3">
          <h2 className="font-display text-lg font-extrabold">Tus datos</h2>
          <Field icon={User} label="Nombre completo" placeholder="María García" required />
          <Field icon={Mail} type="email" label="Correo electrónico" placeholder="maria@correo.com" required />
          <Field icon={Phone} type="tel" label="WhatsApp" placeholder="+52 55 1234 5678" required />
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

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 h-13 py-3.5 px-5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta"
        >
          Pagar y recibir mi PDF
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
