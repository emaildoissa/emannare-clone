import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { cartService, CartItem, WooProduct } from "@/services/woocommerce";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: WooProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);

  const updateCartState = () => {
    setItems(cartService.getCart());
    setItemCount(cartService.getItemCount());
    setTotal(cartService.getTotal());
  };

  useEffect(() => {
    updateCartState();

    const handleCartUpdate = () => updateCartState();
    window.addEventListener("cart-updated", handleCartUpdate);

    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  const addToCart = (product: WooProduct, quantity = 1) => {
    cartService.addToCart(product, quantity);
  };

  const removeFromCart = (productId: number) => {
    cartService.removeFromCart(productId);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
  };

  const clearCart = () => {
    cartService.clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
