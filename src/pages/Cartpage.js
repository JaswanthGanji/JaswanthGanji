import React from 'react';
import { useCart } from '../pages/Cartcontent';
import './Cartpage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.specialPrice || item.price) * item.quantity,
    0
  );

  // Handle "Proceed to Checkout" action
  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {/* If cart is empty */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Go back and add some products!</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.specialPrice || item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price and Checkout Button */}
          <div className="cart-summary">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
