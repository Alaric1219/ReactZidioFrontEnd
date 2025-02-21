import React, { useState } from "react";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      setAlertMessage("✅ Registration successful! Please log in.");
      setTimeout(() => setAlertMessage(""), 3000);
      setIsRegistering(false);
      setEmail("");
      setPassword("");
    } else {
      setAlertMessage("⚠ Please fill in all fields.");
    }
  };

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      setAlertMessage("✅ Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      setAlertMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col">
      {/* Navbar */}
      <nav className="bg-black bg-opacity-80 py-5 px-10 shadow-lg w-full fixed top-0 left-0">
        <h1 className="text-3xl font-extrabold text-white tracking-widest text-center">
          Login to Add Task
        </h1>
      </nav>

      {/* Login/Register Form Container */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white text-black p-10 rounded-2xl shadow-2xl w-96 border-4 border-gray-300">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {isRegistering ? "Register" : "Login"}
          </h2>

          {/* Alert Message */}
          {alertMessage && (
            <div className="mt-4 text-center font-semibold p-3 rounded-lg text-white bg-green-500">
              {alertMessage}
            </div>
          )}

          {/* Email Field */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-400 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login/Register Button */}
          <button
            className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? "Register" : "Login"}
          </button>

          {/* Toggle between Login & Register */}
          <p
            className="text-center mt-4 text-white font-semibold cursor-pointer hover:underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Already have an account? Login" : "New user? Register"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
