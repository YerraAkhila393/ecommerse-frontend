import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppContext } from "../AppContext";

function Products() {
 const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cart, setCart,setActiveComponent } = useAppContext();


  // ⚡ Replace with actual logged-in user id from context/token
  const userId = 1;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view products");
      setLoading(false);
      setActiveComponent("login");
      return;
    }

    const fetchProductsAndCart = async () => {
      try {
        // 1. Fetch products
        const productRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/AddProduct/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(productRes.data);

        // 2. Fetch cart for logged-in user
        const cartRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/Cart/get-cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(cartRes.data || []); // ✅ store cart from backend
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setActiveComponent("login");
      } else {
        setError(err.response?.data?.message || "Failed to load data");
      }
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProductsAndCart();
  }, [setCart]);

  // ✅ Add item to cart (API + Local State)
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/Cart/add-cart`,
        {
          userId,
          productId: product.id,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.productId === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, productId: product.id, quantity: 1 }];
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setActiveComponent("login");
      } else {
        setError(err.response?.data?.message || "Failed to load data");
      }
      console.error("Failed to add to cart", err);
    }
  };

  // ✅ Update cart qty or remove
  const updateQuantity = async (productId, change) => {
    const token = localStorage.getItem("token");
    try {
      const existingItem = cart.find((item) => item.productId === productId);
      if (!existingItem) return;

      const newQuantity = existingItem.quantity + change;

      if (newQuantity <= 0) {
        // Remove item
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Cart/remove-cart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
      } else {
        // Update qty
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/Cart/add-cart`,
          {
            userId,
            productId,
            quantity: change,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + change }
              : item
          )
        );
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setActiveComponent("login");
      } else {
        setError(err.response?.data?.message || "Failed to load data");
      }
      console.error("Failed to update cart", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
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
          const cartItem = cart.find((item) => item.productId === product.id);
          return (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
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
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-gray-800 text-white px-4 py-2 rounded"
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
export default Products;