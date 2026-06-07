import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-grid place-items-center w-8 h-8 rounded-xl bg-primary text-primary-foreground font-display font-bold"
          >
            L
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Lotería<span className="text-primary">Mía</span>
          </span>
        </Link>
        <Link
          to="/personalizar"
          className="text-xs font-bold px-3 py-2 rounded-full bg-secondary text-secondary-foreground"
        >
          Pedir
        </Link>
      </div>
    </header>
  );
}
