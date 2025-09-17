import React,{useState} from "react";
import Products from "./Products";
import Login from "./Login";
import Home from "./Home";
import { useAppContext } from "../AppContext";
import AddProducts from "./AddProducts";
import Cart from "./Cart";

const Navbar = () => {
    const {activeComponent, setActiveComponent} = useAppContext();
    const {cart, setCart} = useAppContext();
    console.log(activeComponent)
  return (
   <div>
          <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-2xl font-bold">
                <a href="/">E-Shop</a>
              </div>
              <div className="space-x-4">
                <button
                
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setActiveComponent('home')}
                >
                  Home
                </button>
                <button
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setActiveComponent('products')}
                >
                  Products
                </button>
                <button
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setActiveComponent('add-products')}
                >
                  Add New Product
                </button>
                <button
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setActiveComponent('login')}
                >
                  Login
                </button>
                <button
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative"
              onClick={() => setActiveComponent('cart')}
            >Cart
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length > 0 &&cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
              </div>
            </div>
          </nav>
          {activeComponent === 'home' && <Home />}
          {activeComponent === 'products' && <Products />}
          {activeComponent === 'login' && <Login />}
          {activeComponent === 'add-products' && <AddProducts />}
          {activeComponent === 'cart' && <Cart />}
        </div>
  );
};

export default Navbar;
