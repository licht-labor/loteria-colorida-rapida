import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BARAJAS, FORMATOS, FRAME_COLORS, BG_COLORS } from "@/lib/loteria";
import { FileDown, Package, Sparkles, LogOut, User as UserIcon } from "lucide-react";

type Order = {
  id: string;
  baraja: string;
  formato: string;
  frame: string;
  background: string;
  quantity: number;
  total: number;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/mis-pedidos")({
  head: () => ({
    meta: [
      { title: "Mis pedidos — LoteríaMía" },
      { name: "description", content: "Consulta el historial de tus pedidos digitales de lotería." },
    ],
  }),
  component: MisPedidos,
});

function MisPedidos() {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    supabase
      .from("orders")
      .select("id, baraja, formato, frame, background, quantity, total, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
  }, []);

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    user?.email ??
    "Cliente";

  return (
    <AppShell>
      <section className="px-5 pt-5 pb-3">
        <div className="rounded-3xl bg-confetti border border-border p-5 flex items-center gap-3">
          <div className="grid place-items-center w-12 h-12 rounded-2xl bg-primary text-primary-foreground shadow-fiesta">
            <UserIcon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground font-semibold">Hola,</div>
            <div className="font-display text-lg font-extrabold truncate">{displayName}</div>
          </div>
          <button
            type="button"
            onClick={() => signOut()}
            className="grid place-items-center w-10 h-10 rounded-xl bg-card border border-border"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="px-5 pt-2 pb-3 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">Mis pedidos</h1>
        <Link
          to="/personalizar"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary"
        >
          <Sparkles className="w-3.5 h-3.5" /> Nuevo
        </Link>
      </section>

      <section className="px-5 pb-10 space-y-3">
        {orders === null ? (
          <div className="rounded-3xl bg-card border border-border p-6 text-center text-sm text-muted-foreground">
            Cargando tus pedidos…
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl bg-card border border-border p-6 text-center">
            <Package className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold">Todavía no tienes pedidos.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Personaliza tu primera lotería y aparecerá aquí.
            </p>
            <Link
              to="/personalizar"
              className="mt-4 inline-flex items-center justify-center h-11 px-5 rounded-2xl bg-primary text-primary-foreground font-bold"
            >
              Crear pedido
            </Link>
          </div>
        ) : (
          orders.map((o) => <OrderCard key={o.id} order={o} />)
        )}
      </section>
    </AppShell>
  );
}

function OrderCard({ order }: { order: Order }) {
  const baraja = BARAJAS.find((b) => b.id === order.baraja)?.name ?? order.baraja;
  const formato = FORMATOS.find((f) => f.id === order.formato)?.name ?? order.formato;
  const frame = FRAME_COLORS.find((c) => c.id === order.frame);
  const bg = BG_COLORS.find((c) => c.id === order.background);
  const date = new Date(order.created_at).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-3xl bg-card border border-border p-4">
      <header className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          #{order.id.slice(0, 8)}
        </span>
        <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
          {order.status === "paid" ? "Pagado" : order.status}
        </span>
      </header>

      <div className="mt-2 font-display text-lg font-extrabold">
        {order.quantity} tablas · {baraja} · {formato}
      </div>
      <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full border border-white"
            style={{ backgroundColor: frame?.hex }}
          />
          {frame?.name}
        </span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full border border-border"
            style={{ backgroundColor: bg?.hex }}
          />
          {bg?.name}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{date}</div>
        <div className="font-display text-lg font-extrabold text-primary">
          ${order.total} MXN
        </div>
      </div>

      <a
        href="#"
        className="mt-3 w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm"
      >
        <FileDown className="w-4 h-4" />
        Descargar PDF
      </a>
    </article>
  );
}
