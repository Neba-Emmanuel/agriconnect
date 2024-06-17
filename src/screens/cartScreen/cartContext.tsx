// cartContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import storage from '../../utils/storage';

interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  cartItemCount: number;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    // Store cart items in local storage whenever the cart changes
    const storeCart = async () => {
      try {
        await storage.storeInfo('@cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to store cart in storage', error);
      }
    };

    storeCart();
  }, [cart]);

  useEffect(() => {
    // Load cart items from local storage when the app starts
    const loadCart = async () => {
      try {
        const storedCart = await storage.load('@cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
      }
    };

    loadCart();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      } else {
        return [...prevCart, {...product, quantity: 1}];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const cartItemCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cartItemCount,
        increaseQuantity,
        decreaseQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
