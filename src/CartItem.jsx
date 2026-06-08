import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      total += itemCost * item.quantity;
    });
    return total;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1));
    return itemCost * item.quantity;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="cart-items">
        {cart.map((item, index) => (
          <div className="cart-item" key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px' }} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Unit Price: {item.cost}</p>
              
              <div className="cart-item-quantity">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <p>Total: ${calculateTotalCost(item)}</p>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-actions" style={{ marginTop: '20px' }}>
        <button className="continue-shopping-btn" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <button className="checkout-btn" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
