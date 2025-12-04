import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { RepositoryFactory } from '@shared/infrastructure';
import {
  AddToCartUseCase,
  GetCartCountUseCase,
} from '@features/cart/application/use-cases';

interface CartContextValue {
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string, colorCode: number, storageCode: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Initialize use cases
  const cartRepository = RepositoryFactory.getCartRepository();
  const addToCartUseCase = new AddToCartUseCase(cartRepository);
  const getCartCountUseCase = new GetCartCountUseCase(cartRepository);

  // Load cart count on mount
  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const count = await getCartCountUseCase.execute();
        setCartCount(count);
      } catch (err) {
        console.error('Failed to load cart count:', err);
      }
    };

    void loadCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = async (
    productId: string,
    colorCode: number,
    storageCode: number
  ): Promise<void> => {
    try {
      setLoading(true);
      const newCount = await addToCartUseCase.execute(productId, colorCode, storageCode);
      setCartCount(newCount);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: CartContextValue = {
    cartCount,
    loading,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};