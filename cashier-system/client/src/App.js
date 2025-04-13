import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import ShoppingCart from './components/ShoppingCart';
import CheckoutForm from './components/CheckoutForm';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleCheckout = () => {
    alert('Checkout successful!');
    setCartItems([]);
  };

  return (
    <div className="app-container">
      <h1>Cashier System</h1>
      <div className="main-content">
        <div className="product-section">
          <AddProductForm onProductAdded={handleProductAdded} />
          <ProductList onAddToCart={handleAddToCart} />
        </div>
        <div className="cart-section">
          <ShoppingCart 
            cartItems={cartItems} 
            onRemoveFromCart={handleRemoveFromCart} 
            onCheckout={handleCheckout}
          />
          <CheckoutForm cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default App;
