import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@features/products/domain/models';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      </div>
      <div className="product-card-content">
        <h3 className="product-brand">{product.brand}</h3>
        <p className="product-model">{product.model}</p>
        <p className="product-price">{product.formattedPrice}</p>
      </div>
    </Link>
  );
};