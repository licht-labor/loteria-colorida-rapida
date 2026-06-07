import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import cardSol from "@/assets/card-sol.jpg";
import cardSirena from "@/assets/card-sirena.jpg";
import cardCorazon from "@/assets/card-corazon.jpg";
import cardGallo from "@/assets/card-gallo.jpg";
import cardRosa from "@/assets/card-rosa.jpg";
import cardLuna from "@/assets/card-luna.jpg";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Modelos y ejemplos — LoteríaMía" },
      { name: "description", content: "Explora ejemplos y temas de loterías personalizadas: clásica, infantil, moderna y más." },
    ],
  }),
  component: Catalogo,
});

const items = [
  { src: cardSol, name: "El Sol", cat: "Clásica", tag: "Popular" },
  { src: cardSirena, name: "La Sirena", cat: "Clásica" },
  { src: cardCorazon, name: "El Corazón", cat: "Moderna", tag: "Nuevo" },
  { src: cardGallo, name: "El Gallo", cat: "Clásica" },
  { src: cardRosa, name: "La Rosa", cat: "Moderna" },
  { src: cardLuna, name: "La Luna", cat: "Navideña" },
];

const cats = ["Todos", "Clásica", "Moderna", "Infantil", "Navideña"] as const;

function Catalogo() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const visible = items.filter((i) => cat === "Todos" || i.cat === cat);

  return (
    <AppShell>
      <section className="px-5 pt-5 pb-3">
        <h1 className="font-display text-2xl font-extrabold">Modelos y ejemplos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Inspírate con algunas de nuestras barajas.
        </p>
      </section>

      <section className="px-5 pb-3 -mx-1">
        <div className="flex gap-2 overflow-x-auto px-1 pb-2 no-scrollbar">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`shrink-0 px-3.5 h-9 rounded-full text-xs font-bold border-2 ${
                cat === c ? "chip-active" : "border-border bg-card"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {visible.map((it) => (
            <figure
              key={it.name}
              className="rounded-2xl overflow-hidden border-2 border-border bg-card relative"
            >
              {it.tag && (
                <span className="absolute top-2 left-2 z-10 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                  {it.tag}
                </span>
              )}
              <img
                src={it.src}
                alt={`Carta ${it.name}`}
                width={640}
                height={800}
                loading="lazy"
                className="w-full h-auto block"
              />
              <figcaption className="p-2.5">
                <div className="font-bold text-sm leading-tight">{it.name}</div>
                <div className="text-[11px] text-muted-foreground">{it.cat}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-5 pb-10">
        <Link
          to="/personalizar"
          className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta"
        >
          Personalizar con este estilo
        </Link>
      </section>
    </AppShell>
  );
}
