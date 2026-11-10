import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useUser } from "@/lib/session";
import { supabase } from "@/integrations/supabase/client";

export function Header() {
  const { count } = useCart();
  const { user } = useUser();
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-6">
      <Link to="/" className="text-3xl font-bold text-primary">Moniteste 🍦</Link>
      <nav className="flex items-center gap-4">
        {user ? (
          <button onClick={() => supabase.auth.signOut()} className="text-sm text-muted-foreground hover:text-foreground">Sair</button>
        ) : (
          <Link to="/auth" className="text-sm font-semibold">Entrar</Link>
        )}
        <Link to="/carrinho" className="relative rounded-full bg-primary p-3 text-primary-foreground" aria-label="Carrinho">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-accent px-2 text-xs font-bold text-accent-foreground">{count}</span>}
        </Link>
      </nav>
    </header>
  );
}
