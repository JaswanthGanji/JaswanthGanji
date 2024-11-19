import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Helper function to get the current user's email or ID (which uniquely identifies the user)
const getCurrentUserEmail = () => localStorage.getItem('userEmail');

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart items for the logged-in user
  const loadCartItems = () => {
    const userEmail = getCurrentUserEmail();
    if (userEmail) {
      // Get cart items from localStorage specific to the user's email
      const savedCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
      setCartItems(savedCart);
    }
  };

  // Save cart items for the current user
  const saveCartItems = (items) => {
    const userEmail = getCurrentUserEmail();
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(items));
    }
  };

  // Calculate the total cart count whenever cartItems changes
  useEffect(() => {
    const totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    setCartCount(totalCount);

    // Save the cart data to localStorage when cartItems change
    saveCartItems(cartItems);
  }, [cartItems]);

  // Add product to cart with quantity management
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Decrease product quantity or remove if it reaches 0
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // Clear the cart for the current user
  const clearCart = () => {
    setCartItems([]);
    const userEmail = getCurrentUserEmail();
    if (userEmail) {
      localStorage.removeItem(`cart_${userEmail}`);
    }
  };

  // Load cart items when the component mounts
  useEffect(() => {
    loadCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
