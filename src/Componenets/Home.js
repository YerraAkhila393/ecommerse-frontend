import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setActiveComponent, cart, setCart } = useAppContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view products');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/AddProduct/products`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setActiveComponent]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, change) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity becomes 0
      return updatedCart;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-800">${product.price}</p>
                {cartItem ? (
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Home;