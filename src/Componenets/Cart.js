import React from 'react';
import { useAppContext } from '../AppContext';

const Cart = () => {
  const { cart, setCart, setActiveComponent } = useAppContext();

  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  if (cart.length === 0) {
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
        {cart.length > 0 &&cart.map((item) => (
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
              <p className="text-gray-600">${item.price} x {item.quantity}</p>
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