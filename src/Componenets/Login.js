import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../AppContext';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between login and sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For sign-up
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {setActiveComponent } = useAppContext();

  // Clear error when user starts typing
  const clearError = () => setError('');

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e)
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/Auth/login`,
        { email, password }
      );
      const { token, firstName, lastName } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ firstName, lastName }));
      setActiveComponent("home"); // Close modal or reset component
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/Auth/register`,
        { username, email, password }
      );
      const { token, firstName, lastName } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ firstName, lastName }));
      setActiveComponent("home"); // Close modal or reset component
    } catch (err) {
      setError(err.response?.data?.message || 'Sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={isLoginMode ? handleLogin : handleSignUp} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearError();
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Username"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button
          className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mt-4"
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
        <button
          className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mt-2"
          onClick={() => setActiveComponent("home")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Login;