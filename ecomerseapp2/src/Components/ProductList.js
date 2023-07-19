import React from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import './ProductList.css';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <Link to={`/productPath/${index}`} key={index} state={{ product }}>
          <Product product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
