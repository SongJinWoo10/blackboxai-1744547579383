import React, { useState } from 'react';

const CheckoutForm = ({ cartItems, onCompleteCheckout }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      customer: customerInfo,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price, 0)
    };
    
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    
    if (response.ok) {
      onCompleteCheckout();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={customerInfo.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={customerInfo.address}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Complete Order</button>
    </form>
  );
};

export default CheckoutForm;
