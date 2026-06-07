import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Check, FileDown, MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/confirmacion")({
  head: () => ({
    meta: [
      { title: "¡Pedido confirmado! — LoteríaMía" },
      { name: "description", content: "Tu lotería personalizada está lista para descargar." },
    ],
  }),
  component: Confirmacion,
});

function Confirmacion() {
  return (
    <AppShell>
      <section className="px-5 pt-8 pb-6 text-center bg-confetti">
        <div className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-fiesta">
          <Check className="w-10 h-10" strokeWidth={3} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold">
          ¡Tu lotería está lista!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground px-4">
          Gracias por tu pedido, María. Preparamos tu PDF con mucho cariño 🌸
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="rounded-3xl bg-card border border-border p-5 text-center">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Pedido #LM-2026-0481
          </span>
          <div className="mt-2 font-display text-xl font-extrabold">
            20 tablas · Clásica · 4×4
          </div>
          <div className="mt-1 text-sm text-muted-foreground">Marco rosa · Fondo crema</div>

          <a
            href="#"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta"
          >
            <FileDown className="w-5 h-5" />
            Descargar PDF
          </a>

          <p className="mt-3 text-xs text-muted-foreground">
            También recibirás tu archivo por correo y WhatsApp.
          </p>
        </div>
      </section>

      <section className="px-5 pb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-secondary/40 p-4 flex flex-col items-start gap-1.5">
          <Mail className="w-5 h-5 text-primary" />
          <div className="text-xs font-bold">Por correo</div>
          <div className="text-[11px] text-muted-foreground">maria@correo.com</div>
        </div>
        <div className="rounded-2xl bg-accent/30 p-4 flex flex-col items-start gap-1.5">
          <MessageCircle className="w-5 h-5 text-primary" />
          <div className="text-xs font-bold">Por WhatsApp</div>
          <div className="text-[11px] text-muted-foreground">+52 55 1234 5678</div>
        </div>
      </section>

      <section className="px-5 pb-10 space-y-2.5">
        <Link
          to="/personalizar"
          className="w-full inline-flex items-center justify-center h-12 px-5 rounded-2xl bg-card border-2 border-foreground/10 font-bold"
        >
          Hacer otro pedido
        </Link>
        <Link
          to="/"
          className="w-full inline-flex items-center justify-center h-12 px-5 rounded-2xl text-sm font-bold text-muted-foreground"
        >
          Volver al inicio
        </Link>
      </section>
    </AppShell>
  );
}
