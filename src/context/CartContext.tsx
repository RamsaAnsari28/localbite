import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { FoodItem } from "../types/food";
import type { CartItem } from "../types/cart";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (food: FoodItem) => void;
  decreaseQuantity: (foodId: string) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (food: FoodItem) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>item.food.id === food.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentItems,
        {
          food,
          quantity: 1,
        },
      ];
    });
  };
  const decreaseQuantity = (foodId: string) => {
  setCartItems((currentItems) =>
    currentItems
      .map((item) =>
        item.food.id === foodId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};
  const removeFromCart = (foodId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.food.id !== foodId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}