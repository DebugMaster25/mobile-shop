import React from 'react';
import { useProducts } from '../context';
import { SearchBar } from '@shared/presentation/components';
import { ProductGrid } from '../components';
import './ProductListPage.css';

export const ProductListPage: React.FC = () => {
  const { filteredProducts, loading, error, searchQuery, setSearchQuery } = useProducts();

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by brand or model..."
        />
      </div>
      <ProductGrid products={filteredProducts} />
    </div>
  );
};