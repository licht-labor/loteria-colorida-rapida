import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Palette, CreditCard, Sparkles, ArrowRight, FileDown } from "lucide-react";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Cómo funciona — LoteríaMía" },
      { name: "description", content: "En 3 pasos sencillos: elige, personaliza y recibe tu lotería en PDF." },
    ],
  }),
  component: ComoFunciona,
});

const steps = [
  {
    Icon: Sparkles,
    title: "Elige tu baraja y formato",
    desc: "Clásica, infantil, moderna o navideña. Después escoge 4×4, 5×5, favoritas, dobles o sencillas.",
    color: "bg-fiesta-pink",
  },
  {
    Icon: Palette,
    title: "Personaliza colores y cantidad",
    desc: "Decide el color del marco, el fondo y cuántas tablas únicas necesitas para tu fiesta.",
    color: "bg-fiesta-yellow",
  },
  {
    Icon: CreditCard,
    title: "Paga y recibe tu PDF",
    desc: "Paga seguro y recibe tu archivo PDF al instante en tu correo o WhatsApp. Listo para imprimir.",
    color: "bg-fiesta-teal",
  },
];

function ComoFunciona() {
  return (
    <AppShell>
      <section className="px-5 pt-6 pb-4">
        <h1 className="font-display text-3xl font-extrabold">
          Tu lotería en <span className="text-primary">3 pasos</span>
        </h1>
        <p className="mt-2 text-muted-foreground text-[15px]">
          Sin esperas, sin imprenta y sin complicaciones.
        </p>
      </section>

      <section className="px-5 pb-6 space-y-4">
        {steps.map(({ Icon, title, desc, color }, i) => (
          <article
            key={title}
            className="relative rounded-3xl bg-card border border-border p-5"
          >
            <span className="absolute -top-3 left-5 text-xs font-extrabold px-2.5 py-1 rounded-full bg-foreground text-background">
              Paso {i + 1}
            </span>
            <div className="flex items-start gap-4">
              <span
                className={`grid place-items-center w-14 h-14 rounded-2xl ${color} text-foreground shrink-0`}
                style={{ color: "#1a1a1a" }}
              >
                <Icon className="w-7 h-7" strokeWidth={2.2} />
              </span>
              <div>
                <h2 className="font-display text-xl font-extrabold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="px-5 pb-8">
        <div className="rounded-3xl bg-secondary/40 p-5 flex items-start gap-4">
          <span className="grid place-items-center w-12 h-12 rounded-2xl bg-card">
            <FileDown className="w-6 h-6 text-primary" />
          </span>
          <div>
            <h3 className="font-display text-lg font-extrabold">Entrega 100% digital</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Recibes un PDF de alta calidad listo para imprimir en casa o en
              cualquier papelería.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10">
        <Link
          to="/personalizar"
          className="w-full inline-flex items-center justify-center gap-2 px-5 h-12 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta"
        >
          Personalizar mi pedido <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </AppShell>
  );
}
