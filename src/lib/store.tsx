import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ShopState {
  cartCount: number;
  cartValue: number;
  favorites: string[];
  /** Slug-urile adăugate în coș în sesiunea curentă. */
  cartSlugs: string[];
  /** Ultimul produs adăugat — deschide drawer-ul post add-to-cart. */
  lastAdded: { slug: string; quantity: number } | null;
  addToCart: (product: { slug: string; price: number }, quantity?: number) => void;
  toggleFavorite: (slug: string) => void;
  closeAddedDrawer: () => void;
}

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<{ count: number; value: number }>({
    count: 0,
    value: 0,
  });
  const [cartSlugs, setCartSlugs] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastAdded, setLastAdded] = useState<ShopState["lastAdded"]>(null);

  const addToCart = useCallback(
    (product: { slug: string; price: number }, quantity = 1) => {
      setCart((c) => ({
        count: c.count + quantity,
        value: c.value + quantity * product.price,
      }));
      setCartSlugs((s) => (s.includes(product.slug) ? s : [...s, product.slug]));
      setLastAdded({ slug: product.slug, quantity });
    },
    [],
  );

  const closeAddedDrawer = useCallback(() => setLastAdded(null), []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((f) =>
      f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug],
    );
  }, []);

  const value = useMemo(
    () => ({
      cartCount: cart.count,
      cartValue: cart.value,
      favorites,
      cartSlugs,
      lastAdded,
      addToCart,
      toggleFavorite,
      closeAddedDrawer,
    }),
    [cart, favorites, cartSlugs, lastAdded, addToCart, toggleFavorite, closeAddedDrawer],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
