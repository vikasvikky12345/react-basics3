import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { state: { product } } = useLocation();

  return (
    <div className="product-page">
      <h2>{product.title}</h2>
      <div className="image-container">
        <h4>Images:</h4>
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index}`} />
        ))}
      </div>
      <div>
        <h4>Reviews:</h4>
        {product.reviews.map((review, index) => (
          <div key={index}>
            <p>{review}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;