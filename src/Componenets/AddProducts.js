import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setActiveComponent } = useAppContext();

  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add a product');
      setLoading(false);
      setActiveComponent('login');
      return;
    }

    const productData = {
      ProductName: productName,
      Price: price,
      Image: image,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/AddProduct/add-product`,
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Product added successfully:', response.data);
      setProductName('');
      setPrice('');
      setImage('');
      setActiveComponent('products'); // Navigate to Products only on success
    } catch (err) {
      console.error('Error adding product:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Failed to add product');
      setLoading(false); // Ensure loading is reset
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleAddProduct} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="productName" className="block text-gray-700">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              setError(''); // Clear error on input change
            }}
            placeholder="Product Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700">
            Product Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setError('');
            }}
            placeholder="Product Price"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setError('');
            }}
            placeholder="Image URL"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;