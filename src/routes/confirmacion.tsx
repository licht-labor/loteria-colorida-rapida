import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Check, FileDown, MessageCircle, Mail, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BARAJAS, FORMATOS, FRAME_COLORS, BG_COLORS } from "@/lib/loteria";

type Search = { id?: string };

type Order = {
  id: string;
  baraja: string;
  formato: string;
  frame: string;
  background: string;
  quantity: number;
  total: number;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
};

export const Route = createFileRoute("/confirmacion")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "¡Pedido confirmado! — LoteríaMía" },
      { name: "description", content: "Tu lotería personalizada está lista para descargar." },
    ],
  }),
  component: Confirmacion,
});

function Confirmacion() {
  const { id } = Route.useSearch();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("orders")
      .select("id, baraja, formato, frame, background, quantity, total, customer_name, customer_email, customer_phone")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => setOrder(data));
  }, [id]);

  const baraja = order && (BARAJAS.find((b) => b.id === order.baraja)?.name ?? order.baraja);
  const formato = order && (FORMATOS.find((f) => f.id === order.formato)?.name ?? order.formato);
  const frame = order && FRAME_COLORS.find((c) => c.id === order.frame)?.name;
  const bg = order && BG_COLORS.find((c) => c.id === order.background)?.name;

  return (
    <AppShell>
      <section className="px-5 pt-8 pb-6 text-center bg-confetti">
        <div className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-fiesta">
          <Check className="w-10 h-10" strokeWidth={3} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold">¡Tu lotería está lista!</h1>
        <p className="mt-2 text-sm text-muted-foreground px-4">
          Gracias por tu pedido{order?.customer_name ? `, ${order.customer_name}` : ""}. Preparamos tu PDF con mucho cariño 🌸
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="rounded-3xl bg-card border border-border p-5 text-center">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Pedido #{order?.id.slice(0, 8) ?? "—"}
          </span>
          <div className="mt-2 font-display text-xl font-extrabold">
            {order ? `${order.quantity} tablas · ${baraja} · ${formato}` : "Cargando…"}
          </div>
          {order && (
            <div className="mt-1 text-sm text-muted-foreground">
              Marco {frame?.toLowerCase()} · Fondo {bg?.toLowerCase()}
            </div>
          )}

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

      {order && (
        <section className="px-5 pb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-secondary/40 p-4 flex flex-col items-start gap-1.5">
            <Mail className="w-5 h-5 text-primary" />
            <div className="text-xs font-bold">Por correo</div>
            <div className="text-[11px] text-muted-foreground truncate w-full">{order.customer_email}</div>
          </div>
          <div className="rounded-2xl bg-accent/30 p-4 flex flex-col items-start gap-1.5">
            <MessageCircle className="w-5 h-5 text-primary" />
            <div className="text-xs font-bold">Por WhatsApp</div>
            <div className="text-[11px] text-muted-foreground truncate w-full">{order.customer_phone}</div>
          </div>
        </section>
      )}

      <section className="px-5 pb-10 space-y-2.5">
        <Link
          to="/mis-pedidos"
          className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-card border-2 border-foreground/10 font-bold"
        >
          <Package className="w-4 h-4" /> Ver mis pedidos
        </Link>
        <Link
          to="/personalizar"
          className="w-full inline-flex items-center justify-center h-12 px-5 rounded-2xl text-sm font-bold text-muted-foreground"
        >
          Hacer otro pedido
        </Link>
      </section>
    </AppShell>
  );
}
