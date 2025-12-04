import React, { ReactNode } from 'react';
import { ProductsProvider } from '@features/products/presentation/context';
import { CartProvider } from '@features/cart/presentation/context';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <CartProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </CartProvider>
  );
};