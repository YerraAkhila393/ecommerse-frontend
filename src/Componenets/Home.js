import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../AppContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { setActiveComponent } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Welcome to <span className="text-indigo-600">Our Shop</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover the best deals on amazing products. Shop now and fill your
            cart with exclusive collections.
          </p>
          <button
            onClick={() => setActiveComponent("products")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-indigo-700 transition"
          >
            🛒 Shop Now
          </button>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80"
            alt="Shopping bags"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="Fast Delivery"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your products delivered quickly and safely to your doorstep.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
              alt="Best Quality"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
            <p className="text-gray-600">
              We provide only top-quality products you’ll absolutely love.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
              alt="Secure Payment"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Enjoy safe and secure checkout with multiple payment options.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-action Section */}
      <div className="bg-indigo-600 text-white text-center py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
        <p className="mb-6 text-lg">
          Browse our collection and add your favorites to the cart now!
        </p>
        <button
          onClick={() => setActiveComponent("products")}
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-100 transition"
        >
          Explore Products
        </button>
      </div>
    </div>
  );
};


export default Home;
