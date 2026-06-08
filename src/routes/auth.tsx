import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable/index";
import { ShieldCheck, LogIn } from "lucide-react";

type Search = { redirect?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Iniciar sesión — LoteríaMía" },
      { name: "description", content: "Inicia sesión para guardar y ver tus pedidos digitales." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: (search.redirect as never) ?? "/mis-pedidos", replace: true });
    }
  }, [user, loading, navigate, search.redirect]);

  const handleGoogle = async () => {
    setSigningIn(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + (search.redirect ?? "/mis-pedidos"),
    });
    if (result.error) {
      setError("No pudimos iniciar sesión. Intenta de nuevo.");
      setSigningIn(false);
    }
  };

  return (
    <AppShell>
      <section className="px-5 pt-8 pb-6 text-center bg-confetti">
        <div className="mx-auto grid place-items-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-fiesta">
          <LogIn className="w-8 h-8" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold">Bienvenida</h1>
        <p className="mt-2 text-sm text-muted-foreground px-2">
          Inicia sesión para guardar tus pedidos y volver a descargar tus PDFs cuando los necesites.
        </p>
      </section>

      <section className="px-5 pt-2 pb-8 space-y-4">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={signingIn}
          className="w-full inline-flex items-center justify-center gap-3 h-13 py-3.5 px-5 rounded-2xl bg-card border-2 border-foreground/15 font-bold shadow-sm disabled:opacity-60"
        >
          <GoogleIcon />
          {signingIn ? "Conectando…" : "Continuar con Google"}
        </button>

        {error && (
          <p className="text-center text-sm text-destructive font-semibold">{error}</p>
        )}

        <div className="rounded-2xl bg-secondary/40 p-4 text-xs text-muted-foreground flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <span>
            Usamos tu cuenta de Google solo para identificarte. Nunca publicamos nada en tu nombre.
          </span>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          ¿Solo quieres ver el producto?{" "}
          <Link to="/catalogo" className="font-bold text-primary underline">
            Ver catálogo
          </Link>
        </p>
      </section>
    </AppShell>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-7.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 43.5c5 0 9.6-1.9 13.1-5l-6-5.1c-2 1.4-4.5 2.2-7.1 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39.1 16.2 43.5 24 43.5z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6 5.1C40.3 35.7 43.5 30.3 43.5 24c0-1.2-.1-2.3.1-3.5z" />
    </svg>
  );
}
