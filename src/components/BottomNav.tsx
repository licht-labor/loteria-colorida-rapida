import { Link } from "@tanstack/react-router";
import { Home, Sparkles, LayoutGrid, HelpCircle, ShoppingBag } from "lucide-react";

const items = [
  { to: "/" as const, label: "Inicio", Icon: Home },
  { to: "/catalogo" as const, label: "Modelos", Icon: LayoutGrid },
  { to: "/personalizar" as const, label: "Personalizar", Icon: Sparkles, primary: true },
  { to: "/checkout" as const, label: "Pedido", Icon: ShoppingBag },
  { to: "/faq" as const, label: "Ayuda", Icon: HelpCircle },
];

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-40 bg-background/95 backdrop-blur border-t border-border">
      <ul className="mx-auto max-w-md grid grid-cols-5 px-2 py-1.5">
        {items.map(({ to, label, Icon, primary }) => (
          <li key={to} className="flex">
            <Link
              to={to}
              className="flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[10px] font-semibold text-muted-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: to === "/" }}
            >
              <span
                className={
                  primary
                    ? "grid place-items-center w-11 h-11 -mt-5 rounded-2xl bg-primary text-primary-foreground shadow-fiesta"
                    : "grid place-items-center w-9 h-9"
                }
              >
                <Icon className={primary ? "w-5 h-5" : "w-5 h-5"} strokeWidth={2.2} />
              </span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
