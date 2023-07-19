import React, { useState, useContext } from 'react';
import { CartContext } from '../Store/CartContext';

const ProductForm = () => {
  const { addToCart } = useContext(CartContext);
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { item, description, price, quantity: 20 };
    setProducts([...products, newProduct]);
    setItem('');
    setDescription('');
    setPrice('');
  };

  const handleBuy = (index, increment, size) => {
    const product = products[index];
    const selectedProduct = {
      item: product.item,
      description: product.description,
      price: product.price,
      size: size
    };
    addToCart(selectedProduct);
    const updatedProducts = [...products];
    updatedProducts[index].quantity += increment;
    setProducts(updatedProducts);
  };
  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Item:
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.item} - {product.description} - {product.price}
              <button onClick={() => handleBuy(index, 10, 'Large')}>
                Buy Large
              </button>
              <button onClick={() => handleBuy(index, 5, 'Medium')}>
                Buy Medium
              </button>
              <button onClick={() => handleBuy(index, 1, 'Small')}>
                Buy Small
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductForm;