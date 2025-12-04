import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, ProductColor, ProductStorage } from '@features/products/domain/models';
import { useProducts } from '../context';
import { useCart } from '@features/cart/presentation/context';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const { addToCart, loading: cartLoading } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<ProductStorage | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        
        if (!fetchedProduct) {
          setError('Product not found');
          return;
        }
        
        setProduct(fetchedProduct);
        setSelectedColor(fetchedProduct.getDefaultColor() ?? null);
        setSelectedStorage(fetchedProduct.getDefaultStorage() ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedColor || !selectedStorage) return;

    try {
      await addToCart(product.id, selectedColor.code, selectedStorage.code);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container">
        <div className="error">{error || 'Product not found'}</div>
        <Link to="/" className="back-link">Back to Products</Link>
      </div>
    );
  }

  const specs = product.specifications;

  return (
    <div className="page-container">
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
        </div>

        <div className="product-detail-info">
          <div className="product-description">
            <h2>{product.brand} {product.model}</h2>
            <p className="product-detail-price">{product.formattedPrice}</p>
            
            <div className="specs-list">
              <div className="spec-item">
                <span className="spec-label">CPU:</span>
                <span className="spec-value">{specs.cpu}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">RAM:</span>
                <span className="spec-value">{specs.ram}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">OS:</span>
                <span className="spec-value">{specs.os}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Display:</span>
                <span className="spec-value">{specs.displayResolution}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Battery:</span>
                <span className="spec-value">{specs.battery}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Camera:</span>
                <span className="spec-value">{specs.primaryCamera}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dimensions:</span>
                <span className="spec-value">{specs.dimentions}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Weight:</span>
                <span className="spec-value">{specs.weight}</span>
              </div>
            </div>
          </div>

          <div className="product-actions">
            <div className="option-group">
              <label>Color:</label>
              <div className="option-buttons">
                {product.options.colors.map((color) => (
                  <button
                    key={color.code}
                    className={`option-button ${selectedColor?.code === color.code ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Storage:</label>
              <div className="option-buttons">
                {product.options.storages.map((storage) => (
                  <button
                    key={storage.code}
                    className={`option-button ${selectedStorage?.code === storage.code ? 'selected' : ''}`}
                    onClick={() => setSelectedStorage(storage)}
                  >
                    {storage.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="add-to-cart-button"
              onClick={() => void handleAddToCart()}
              disabled={cartLoading || !selectedColor || !selectedStorage}
            >
              {cartLoading ? 'Adding...' : addedToCart ? 'Added! ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};