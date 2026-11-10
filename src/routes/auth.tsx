import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Entrar — Moniteste" }, { name: "description", content: "Entre ou crie sua conta para pedir online." }, { property: "og:title", content: "Entrar — Moniteste" }, { property: "og:description", content: "Entre para pedir online." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) { toast.error("E-mail ou senha incorretos"); return; }
      nav({ to: "/carrinho" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/carrinho" } });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Conta criada! Confirme pelo link enviado ao seu e-mail.");
    }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) { toast.error("Não foi possível entrar com Google"); return; }
    if (!r.redirected) nav({ to: "/carrinho" });
  }

  return (
    <section className="mx-auto max-w-md p-6">
      <div className="rounded-3xl bg-card p-8 shadow-lg">
        <h1 className="text-3xl font-bold">{mode === "in" ? "Entrar" : "Criar conta"}</h1>
        <p className="mt-1 text-muted-foreground">Para fazer pedidos online.</p>
        <button type="button" onClick={google} className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-background px-3 py-3 font-medium">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
          Continue with Google
        </button>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3" />
          <input type="password" required minLength={6} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3" />
          <button disabled={loading} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-60">{mode === "in" ? "Entrar" : "Criar conta"}</button>
        </form>
        <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-4 w-full text-sm text-muted-foreground">{mode === "in" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}</button>
      </div>
    </section>
  );
}
