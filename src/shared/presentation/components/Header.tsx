import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@features/cart/presentation/context';
import './Header.css';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return 'Products';
    }
    
    if (path.startsWith('/product/')) {
      return (
        <>
          <Link to="/">Products</Link>
          <span className="breadcrumb-separator"> / </span>
          <span>Product Details</span>
        </>
      );
    }
    
    return 'Products';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <h1>Mobile Shop</h1>
          </Link>
        </div>
        
        <div className="header-center">
          <nav className="breadcrumbs">
            {getBreadcrumbs()}
          </nav>
        </div>
        
        <div className="header-right">
          <div className="cart-icon">
            <span className="cart-icon-symbol">🛒</span>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};