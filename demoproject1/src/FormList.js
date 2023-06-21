import React from 'react';

function FormList({ products, onDelete }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <span>{product.product} - </span>
          <span>{product.price} - </span>
          <button onClick={() => onDelete(product.id, product.price)}>Delete Product</button>
        </li>
      ))}
    </ul>
  );
}

export default FormList;
