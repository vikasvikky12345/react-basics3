import React, { useState } from 'react';

function FormInput({ onSave }) {
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState('');

  function handleInput(event) {
    event.preventDefault();

    const newProduct = {
      id: productId,
      price: price,
      product: product
    };

    onSave(newProduct);
    setProductId('');
    setPrice('');
    setProduct('');
  }

  return (
    <form onSubmit={handleInput}>
      <label htmlFor="productId">Product ID:</label>
      <input type="text" id="productId" value={productId} onChange={e => setProductId(e.target.value)} required />

      <label htmlFor="sellingPrice">Selling Price:</label>
      <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required />

      <label htmlFor="productname">Product Name:</label>
      <input type="text" id="product" value={product} onChange={e => setProduct(e.target.value)} required />

      <input type="submit" value="Add Product" />
    </form>
  );
}

export default FormInput;
