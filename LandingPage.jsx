import React from "react";
import { Link } from "react-router-dom";
import welcomeImage from "../assets/welcome.jpg"; // Ensure this image exists in src/assets

const LandingPage = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${welcomeImage})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar (Fixed at Top with Proper Spacing) */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-800 to-purple-600 text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
          <h1 className="text-3xl font-extrabold tracking-wide">Task Management</h1>
          <div className="flex gap-x-20"> {/* More space between Home & About */}
            <Link to="/" className="text-lg font-semibold hover:text-yellow-300 transition duration-300">
              Home
            </Link>
            <Link to="/about" className="text-lg font-semibold hover:text-yellow-300 transition duration-300">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Content (Centered, Only Till Image) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-6">
        <h1 className="text-6xl font-extrabold drop-shadow-2xl">Welcome to Task Manager</h1>
        <p className="text-lg mt-6 max-w-2xl bg-black/60 px-6 py-3 rounded-lg">
          Organize your tasks efficiently with priorities, due dates, and seamless management.
        </p>
        <Link
          to="/login"
          className="mt-16 px-8 py-4 bg-yellow-500 text-white text-xl font-bold rounded-lg shadow-xl transition-transform transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

