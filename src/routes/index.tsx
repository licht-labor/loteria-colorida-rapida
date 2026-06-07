import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Sparkles, Download, LayoutGrid, Zap, ArrowRight } from "lucide-react";
import hero from "@/assets/hero-loteria.jpg";
import cardSol from "@/assets/card-sol.jpg";
import cardSirena from "@/assets/card-sirena.jpg";
import cardCorazon from "@/assets/card-corazon.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoteríaMía — Tablas de lotería personalizadas en PDF" },
      {
        name: "description",
        content:
          "Crea tus tablas de lotería mexicana personalizadas y recíbelas en PDF al instante. Elige baraja, colores y formato.",
      },
    ],
  }),
  component: Index,
});

const benefits = [
  { Icon: Sparkles, label: "Personalización fácil" },
  { Icon: Download, label: "Descarga digital" },
  { Icon: LayoutGrid, label: "Varios formatos" },
  { Icon: Zap, label: "Proceso rápido" },
];

function Index() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative bg-confetti">
        <div className="px-5 pt-6 pb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            <span aria-hidden>🎉</span> Hecho a tu medida
          </span>
          <h1 className="mt-3 font-display text-[34px] leading-[1.05] font-extrabold text-foreground">
            Tu lotería mexicana,{" "}
            <span className="text-primary">a tu estilo</span> y en PDF al instante.
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Elige tu baraja, formato y colores. Nosotros armamos tus tablas y te las
            enviamos listas para imprimir o compartir.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <Link
              to="/personalizar"
              className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta"
            >
              Personalizar pedido <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center px-5 h-12 rounded-2xl bg-card border-2 border-foreground/10 text-foreground font-bold"
            >
              Ver modelos
            </Link>
          </div>
        </div>

        <div className="px-5 pb-6">
          <div className="rounded-3xl overflow-hidden border-4 border-secondary shadow-fiesta">
            <img
              src={hero}
              alt="Cartas de lotería mexicana extendidas en abanico con papel picado"
              width={1280}
              height={1280}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-5 py-6">
        <ul className="grid grid-cols-2 gap-3">
          {benefits.map(({ Icon, label }) => (
            <li
              key={label}
              className="rounded-2xl bg-card border border-border p-4 flex flex-col gap-2"
            >
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-secondary text-secondary-foreground">
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-sm font-bold leading-tight">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works teaser */}
      <section className="px-5 pb-2">
        <div className="rounded-3xl bg-secondary/40 p-5">
          <h2 className="font-display text-2xl font-extrabold">¿Cómo funciona?</h2>
          <p className="text-sm text-muted-foreground mt-1">
            En 3 pasos tienes tu PDF listo.
          </p>
          <ol className="mt-4 space-y-3">
            {[
              "Elige tu baraja y formato",
              "Personaliza colores y cantidad",
              "Paga y recibe tu PDF",
            ].map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="grid place-items-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-extrabold text-sm">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold">{step}</span>
              </li>
            ))}
          </ol>
          <Link
            to="/como-funciona"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
          >
            Ver el proceso completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Card showcase */}
      <section className="px-5 py-6">
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-display text-2xl font-extrabold">Algunos modelos</h2>
          <Link to="/catalogo" className="text-sm font-bold text-primary">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { src: cardSol, name: "El Sol" },
            { src: cardSirena, name: "La Sirena" },
            { src: cardCorazon, name: "El Corazón" },
          ].map((c) => (
            <figure key={c.name} className="rounded-2xl overflow-hidden border-2 border-border">
              <img src={c.src} alt={c.name} loading="lazy" width={640} height={800} className="w-full h-auto block" />
              <figcaption className="px-2 py-1.5 text-[11px] font-bold text-center bg-card">
                {c.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-10">
        <div className="rounded-3xl p-6 bg-primary text-primary-foreground text-center shadow-fiesta">
          <h2 className="font-display text-2xl font-extrabold">
            ¿Lista para tu próxima fiesta?
          </h2>
          <p className="mt-2 text-sm opacity-90">
            Arma tu pedido en menos de 2 minutos.
          </p>
          <Link
            to="/personalizar"
            className="mt-4 inline-flex items-center justify-center gap-2 px-5 h-12 rounded-2xl bg-card text-foreground font-bold"
          >
            Empezar ahora <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
