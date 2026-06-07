import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes — LoteríaMía" },
      { name: "description", content: "Resolvemos tus dudas sobre la entrega del PDF, colores, formatos e impresión." },
    ],
  }),
  component: Faq,
});

const faqs = [
  {
    q: "¿Cómo recibo mi PDF?",
    a: "Inmediatamente después de tu pago, te enviamos un enlace de descarga a tu correo y por WhatsApp. También puedes descargarlo desde la página de confirmación.",
  },
  {
    q: "¿Puedo elegir los colores?",
    a: "Sí. Puedes personalizar el color del marco y del fondo desde el configurador. Mostramos una vista previa en tiempo real para que veas cómo queda antes de pagar.",
  },
  {
    q: "¿Qué formatos hay disponibles?",
    a: "Ofrecemos tablas 4×4, 5×5, Favoritas (eliges tú las cartas), Dobles (con cartas repetidas) y Sencillas (sin repeticiones). Todos compatibles con barajas clásica, infantil, moderna y navideña.",
  },
  {
    q: "¿Sirve para imprimir?",
    a: "Sí. El PDF se entrega en alta resolución (300 dpi) listo para imprimir en casa o en cualquier papelería. Tamaño estándar carta y A4.",
  },
  {
    q: "¿Cuánto tarda la entrega?",
    a: "La entrega es inmediata. En cuanto confirmamos tu pago, recibes el archivo en menos de 2 minutos.",
  },
];

function Faq() {
  return (
    <AppShell>
      <section className="px-5 pt-5 pb-3">
        <h1 className="font-display text-2xl font-extrabold">Preguntas frecuentes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Lo que más nos preguntan nuestras clientas.
        </p>
      </section>

      <section className="px-5 pb-6">
        <Accordion type="single" collapsible className="space-y-2.5">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-4"
            >
              <AccordionTrigger className="text-left font-bold text-[15px] py-4 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="px-5 pb-10">
        <div className="rounded-3xl bg-secondary/40 p-5 text-center">
          <h2 className="font-display text-lg font-extrabold">¿Tienes otra duda?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Escríbenos por WhatsApp y te ayudamos al momento.
          </p>
          <Link
            to="/personalizar"
            className="mt-4 inline-flex items-center justify-center h-12 px-5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-fiesta"
          >
            Personalizar mi pedido
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
