import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/Provider";
import { motion, scale } from "framer-motion";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLogged, setUser, setToken, token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/auth/signing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      let token = data.data;

      const userInfoResponse = await fetch(
        "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/users/@me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let userInfo = await userInfoResponse.json();

      localStorage.setItem("token", token);
      setIsLogged(true);

      const usernameAuth = userInfo.data.username;
      setUser(usernameAuth);
      setToken(token);

      let userRole = userInfo.data.role;
      localStorage.setItem("role", userRole);

      navigate(userRole === "ADMIN" ? "/dashboard" : "/");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-200 px-4">
     <motion.dev
         initial={{ opacity: 0, scale:0.5,y: 100 }}
        animate={{ opacity: 1, y: 0 ,scale:1}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        >
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">Login</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-indigo-600 hover:underline focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
      </motion.dev>
    </div>
  );
}

export default Login;
