import React, { useContext } from 'react';
import { CartContext } from '../Store1/CartContext';
import './Product.css';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.title} className="product-image" />
      <h4 className="product-title">{product.title}</h4>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
