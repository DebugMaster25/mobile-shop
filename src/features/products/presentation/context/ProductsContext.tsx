import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@features/products/domain/models';
import { RepositoryFactory } from '@shared/infrastructure';
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  SearchProductsUseCase,
} from '@features/products/application/use-cases';

interface ProductsContextValue {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getProductById: (id: string) => Promise<Product | null>;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize use cases
  const productRepository = RepositoryFactory.getProductRepository();
  const getProductsUseCase = new GetProductsUseCase(productRepository);
  const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
  const searchProductsUseCase = new SearchProductsUseCase(productRepository);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await getProductsUseCase.execute();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    void fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      try {
        if (searchQuery.trim() === '') {
          setFilteredProducts(products);
        } else {
          const results = await searchProductsUseCase.execute(searchQuery);
          setFilteredProducts(results);
        }
      } catch (err) {
        console.error('Search failed:', err);
      }
    };

    void performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, products]);

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      return await getProductByIdUseCase.execute(id);
    } catch (err) {
      console.error('Failed to get product:', err);
      return null;
    }
  };

  const value: ProductsContextValue = {
    products,
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    getProductById,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextValue => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
};