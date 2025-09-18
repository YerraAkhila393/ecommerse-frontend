import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';

const Cart = () => {
  const { cart, setCart, setActiveComponent } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your cart');
        setLoading(false);
        setActiveComponent('login');
        return;
      }

      try {
        // 1. Get cart items
        const cartResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/Cart/get-cart`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const cartItems = cartResponse.data; // [{ productId, quantity }]

        // 2. Get product details
        const productResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/AddProduct/products`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const products = productResponse.data; // [{ id, productName, price, image, description }]

        // 3. Merge cart + product details
        const enrichedCart = cartItems
          .map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            if (!product) return null;
            return {
              id: product.id,
              productName: product.productName,
              price: product.price,
              image: product.image,
              description: product.description,
              quantity: cartItem.quantity,
            };
          })
          .filter((item) => item !== null);

        setCart(enrichedCart);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError(err.response?.data?.message || 'Failed to fetch cart');
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCart, setActiveComponent]);

  const updateQuantity = async (productId, change) => {
    const token = localStorage.getItem('token');
    try {
      if (change > 0) {
        // Call add-cart
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/Cart/add-cart`,
          { productId, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Call remove-cart
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/Cart/remove-cart/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Update local state
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + change }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    } catch (err) {
      console.error('Error updating cart:', err);
      setError(err.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/Cart/remove-cart/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } catch (err) {
      console.error('Error removing item:', err);
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
        <p className="text-gray-600 text-center">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
        <p className="text-red-500 text-center">{error}</p>
        <button
          className="mt-6 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setActiveComponent('home')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
        <p className="text-gray-600 text-center">Your cart is empty.</p>
        <button
          className="mt-6 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setActiveComponent('home')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center border rounded-lg p-4 shadow-md"
          >
            <img
              src={item.image || 'https://via.placeholder.com/100'}
              alt={item.productName}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.productName}</h3>
              <p className="text-gray-600">
                ${item.price} x {item.quantity}
              </p>
              <p className="text-gray-800 font-bold">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setActiveComponent('home')}
        >
          Back to Home
        </button>
        <div className="text-lg font-bold">
          Total: $
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
