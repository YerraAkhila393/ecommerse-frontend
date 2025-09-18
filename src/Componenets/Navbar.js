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
    const [username, setUsername] = useState("");
    const {user, setUser} = useAppContext();
    console.log(activeComponent)
    getUser=()=>{
      
    }

  return (
   <div>
          <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-2xl font-bold">
                <a href="/">Our Shop</a>
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
                {username ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 px-3 py-2 text-sm font-medium">
                  Hello, {username}
                </span>
                <button
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
              ) : (
              <button
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setActiveComponent('login')}
              >
                Login / Sign Up
              </button>
            )}
                <button
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setActiveComponent('login')}
                >
                  LogOut
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
