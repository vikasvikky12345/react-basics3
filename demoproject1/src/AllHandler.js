import React, { useState, useEffect } from 'react';
import FormList from './FormList';
import FormInput from './FormInput';

function ProductContainer() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    return storedProducts || [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    calculateTotalPrice(products);
  }, [products]);

  function calculateTotalPrice(products) {
    const totalPrice = products.reduce((sum, product) => sum + parseInt(product.price), 0);
    setTotalPrice(totalPrice);
  }

  function saveToLocalStorage(newProduct) {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  }

  function deleteProduct(productId,) {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  }

  return (
    <div>
      <h1>Product List</h1>
      <FormInput onSave={saveToLocalStorage} />
      <FormList products={products} onDelete={deleteProduct} />
      <div className="total-cost">Total Value Worth of Products: {totalPrice}</div>
    </div>
  );
}

export default ProductContainer;
