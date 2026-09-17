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
  addToCart: (product: { slug: string; price: number }, quantity?: number) => void;
  toggleFavorite: (slug: string) => void;
}

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<{ count: number; value: number }>({
    count: 0,
    value: 0,
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToCart = useCallback(
    (product: { slug: string; price: number }, quantity = 1) => {
      setCart((c) => ({
        count: c.count + quantity,
        value: c.value + quantity * product.price,
      }));
    },
    [],
  );

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
      addToCart,
      toggleFavorite,
    }),
    [cart, favorites, addToCart, toggleFavorite],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
